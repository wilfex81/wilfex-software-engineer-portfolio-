---
title: "I Built an AI Chatbot for Kids — Here's Why"
description: "The internet wasn't built to answer an 11-year-old's questions. So I built CurioBot — an AI chatbot that talks to kids like a friendly older friend, not a textbook."
date: "2025-02-15"
author: "Wilfex Kipchirchir"
tags: ["AI", "FastAPI", "React", "OpenAI", "Open Source"]
---

# I Built an AI Chatbot for Kids — Here's Why

A few weeks ago, I watched my younger cousin try to Google "why do stars explode." The first result was a dense Wikipedia article about stellar nucleosynthesis. He read two lines, got confused, closed the tab, and went back to watching YouTube shorts.

That moment stuck with me.

He had a genuine question. The curiosity was there. But the internet just wasn't built to answer an 11-year-old the way an 11-year-old needs to be answered.

That's why I built **CurioBot**.

---

## The Problem Nobody Talks About

We live in the age of information, but most of it is written for adults. When a kid wants to know how volcanoes work or what happens inside a black hole, they get hit with jargon, paywalls, or worse — they end up on platforms designed to keep them scrolling, not learning.

Parents try their best. Teachers do too. But neither can be available 24/7 the moment a child's curiosity sparks. And that spark? It doesn't wait. If it's not caught in the moment, it fades.

I wanted to build something that catches it.

## What CurioBot Actually Does

CurioBot is a web app where kids aged 8-14 can chat with an AI about anything they want to learn. Space, dinosaurs, how electricity works, why the ocean is salty — anything.

But here's the thing: it's not just ChatGPT with a colorful UI. The AI is specifically instructed to talk like a friendly older friend, not a textbook. It uses stories, analogies, and examples that kids actually relate to. It asks follow-up questions to keep them thinking. And if a kid sends a lazy "idk" or "ok," it doesn't just repeat itself — it drops a surprising fact to pull them back in.

Every message is designed to teach something new. No filler, no fluff.

There are also built-in limits. Each session gives you 5 chats, and each chat has a message cap depending on the AI provider. This is intentional. Kids engage better when there's a boundary. It makes them think about what they actually want to ask instead of mindlessly typing.

## The Tech Behind It

The backend is **FastAPI** with **PostgreSQL** for storage. I chose FastAPI because async-first was non-negotiable — LLM API calls are slow, and I didn't want the server blocking on every request. PostgreSQL handles users, sessions, and full chat histories with proper relational structure.

For the AI layer, I integrated two providers: **OpenAI** (GPT-4o Mini) and **Google Gemini** (2.5 Flash). Kids get to choose which one they want to chat with. Both are wrapped behind an abstract base class with a factory pattern, so adding a new provider someday is just one file.

The frontend is **React** with **Tailwind CSS**, **Framer Motion** for animations, and **Lucide** for icons. It's designed to feel playful and approachable — big rounded corners, warm colors, friendly typography. Not your typical SaaS dashboard.

The whole thing is open source: [github.com/Wilfex Kipchirchirdashsharma/CurioBot](https://github.com/Wilfex Kipchirchirdashsharma/CurioBot)

## What I Learned Building This

**System prompts matter more than you think.** The difference between a generic AI response and one that actually engages a child is entirely in the prompt engineering. I spent more time refining the system prompt than writing most of the backend code. Handling vague inputs, staying on topic, keeping energy high — all of that lives in the prompt.

**Limits are a feature, not a bug.** My first instinct was unlimited messages. But when I tested it, conversations got lazy fast. Adding a message cap per chat made every exchange feel more intentional — both for the kid and the AI.

**File structure is your future self's gift.** I went with a clean separation: routers, services, models, LLM providers all in their own modules. When I needed to swap the storage layer from file-based JSON to PostgreSQL midway through, it took minutes instead of a rewrite. That modular structure paid for itself immediately.

## Why Open Source

I'm not building a startup here. I'm building something I wish existed when I was a kid. If even one teacher uses this in a classroom, or one parent sets it up for their child over the weekend, it was worth it.

Fork it. Break it. Make it better.

[Check out CurioBot on GitHub](https://github.com/Wilfex Kipchirchirdashsharma/CurioBot)

