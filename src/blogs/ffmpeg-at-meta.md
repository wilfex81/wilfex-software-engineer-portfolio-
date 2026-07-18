---
title: "FFmpeg at Meta: What Running ffmpeg 10 Billion Times a Day Actually Looks Like"
description: "A look into how Meta solved the open source fork tax with FFmpeg by upstreaming threaded multi-lane encoding and real-time quality metrics."
date: "2026-03-09"
author: "Wilfex Kipchirchir"
tags: ["FFmpeg", "Meta", "Engineering", "Open Source", "Video Processing"]
---

# FFmpeg at Meta: What Running ffmpeg 10 Billion Times a Day Actually Looks Like

You use Instagram. You upload a reel. It plays instantly on your friend's phone — in the right resolution, for their network speed, switching seamlessly between quality levels as they move from WiFi to 4G.

Behind that experience, FFmpeg ran. Multiple times. On your single upload.

Now multiply that by over 1 billion uploads a day.

That's Meta's problem — and their recent engineering post is a quiet but fascinating look at how they solved it.

---

## The Problem With Forking Open Source

Here's something most companies don't talk about publicly: they fork open source tools and then slowly drown in the maintenance.

Meta did exactly this with FFmpeg. For years they ran their own internal fork that added two critical features the upstream version didn't have — **threaded multi-lane encoding** and **real-time quality metrics**. Both genuinely necessary at their scale.

The fork worked. Until it didn't.

New FFmpeg versions upstream kept shipping — new codec support, reliability fixes, better ingestion for weird video formats users keep uploading. But Meta's fork kept falling behind. Now they were maintaining two things: their internal version and the official one. The gap widened every quarter. Rebasing became dangerous — one bad merge and a billion video uploads break.

This is the classic open source fork tax. You diverge because you needed something. You stay diverged because merging back is terrifying.

Meta's answer wasn't to keep maintaining the fork. It was to fix the upstream.

---

## What They Actually Built

**Problem 1: Multi-lane encoding was wasteful.**

When you upload a video, Meta doesn't store one version. They generate multiple encodings — different resolutions, codecs, framerates — so that the video player can switch between them dynamically based on your network (that's DASH playback). 

The naive way to do this: run separate FFmpeg commands for each output. Simple, but catastrophically inefficient — every process decodes the source video from scratch. You're doing the same expensive decoding work N times.

The better way: decode once, pipe frames to all encoders simultaneously. FFmpeg already supported this. But here's the catch — even in that setup, the encoders ran *serially*. Frame comes in, encoder 1 processes it, *then* encoder 2, *then* encoder 3. You've fixed the decoding duplication but you're still bottlenecked on encoding throughput.

Meta's internal fork parallelized the encoders. All encoder instances run simultaneously for a given frame. Actual concurrency, not just deduplication.

This is the change they pushed upstream, and it landed in FFmpeg 6.0 — described by the FFmpeg team themselves as the most complex refactoring of the codebase in decades. FFmpeg 8.0 finished the job.

**Problem 2: Quality metrics only worked after the fact.**

FFmpeg can compute visual quality metrics — PSNR, SSIM, VMAF — but only by comparing two existing encodings after they've been created. For VOD content, fine. For livestreaming, useless.

Live video can't wait. If an encoding is degrading quality in real time, you need to know now — while the stream is happening.

The solution: insert a decoder *after* each encoder in the pipeline. You encode a frame, immediately decode it back, compare the decoded version against the original pre-compression frame, and get your quality score in real time. Same pipeline, no post-processing step needed.

This is called "in-loop" decoding and it shipped in FFmpeg 7.0, again with contributions from Meta along with FFlabs and VideoLAN.

---

## The Part That Doesn't Go Upstream

There's a pattern in how Meta thinks about this: upstream if it generalizes, keep internal if it doesn't.

Multi-lane threading and real-time quality metrics — every media company can use these. Upstream makes sense.

But Meta also built FFmpeg support for their own custom silicon — the Meta Scalable Video Processor (MSVP), a custom ASIC they built specifically for video transcoding. FFmpeg has a standardized hardware API layer (for NVIDIA, AMD, Intel), so Meta plugged MSVP into that same abstraction. Works seamlessly alongside software pipelines.

Upstreaming that patch would be pointless — no one outside Meta can test it, no one outside Meta has the hardware. So they maintain it internally, rebasing onto new FFmpeg versions as they ship.

This is the right call. Open source contribution is most valuable when it generalizes. Infrastructure-specific patches that only work in your datacenter just create noise for maintainers.

---

## What The Takeaway Actually Is

A few things hit me reading this:

**Scale changes the math on everything.** "Run ffmpeg twice instead of once" sounds trivial. At 1 billion daily uploads requiring multiple executions each, that's meaningful compute cost. The entire value of multi-lane parallel encoding is that it attacks CPU usage at the per-process level — not by buying more servers, but by doing less redundant work on each one.

**Forking has a debt ceiling.** It works for years, then the interest compounds. Meta's internal fork diverged enough that the maintenance cost exceeded the cost of just fixing the upstream. That calculation takes time to flip, but it always does eventually.

**Real-time feedback loops matter in media.** Quality metrics that only work offline tell you something went wrong after the damage is done. In-loop real-time metrics mean you can potentially detect degradation mid-stream and take action. That's the kind of infrastructure that separates "we have monitoring" from "we have control."

**Custom hardware needs standard abstractions.** The fact that MSVP plugs into the same FFmpeg hardware API as NVIDIA and Intel is not a coincidence. It's deliberate design. You want your custom silicon to behave like a drop-in. Otherwise every tool, every pipeline, every integration has to handle your hardware as a special case.

---

## The Bottom Line

Ten billion FFmpeg executions a day. A fork that was slowly becoming a liability. Two core features that needed to exist in the open source version for the fork to be worth dropping.

Meta spent the time to build it properly — working with the FFmpeg community, FFlabs, and VideoLAN to get threaded multi-lane encoding and in-loop quality metrics shipped upstream. Two major FFmpeg releases to get it fully across the line.

The result: internal fork deprecated. One codebase to maintain. Full access to upstream improvements without the rebase terror.

That's the unsexy version of engineering at scale. Not the AI model or the new product launch. Just: we had a fork, we fixed the upstream, we cleaned up the mess.

Most teams never get there. They keep the fork forever and slowly hate it more each quarter.
