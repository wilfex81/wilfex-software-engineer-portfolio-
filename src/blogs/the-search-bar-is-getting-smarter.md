---
title: "The Search Bar Is Getting Smarter — And It's About Time"
description: "Users don't think in keywords. They think in their own language. Here's how LLMs are finally closing that gap — and what you need to know before you build it."
date: "2025-02-20"
author: "Wilfex Kipchirchir"
tags: ["AI", "LLM", "Search", "PostgreSQL", "Embeddings", "Backend"]
---

# The Search Bar Is Getting Smarter — And It's About Time

A user lands on your platform. They want to find something. They go to the search bar.

And they type — not a keyword, not a filter combination — they type the way they think. In their own language. In their own words. Sometimes in Hindi. Sometimes in a broken mix of two languages. Sometimes in a sentence that perfectly describes what they want but contains zero words that match your database.

The old search bar returns nothing.

They think the product is broken.

They're not wrong.

---

## The Real Problem With Traditional Search

For decades, search meant one thing: match what the user typed against what's stored. Exact match. Fuzzy match at best. You type "red shoes size 9" and the engine looks for documents containing those exact tokens.

It works. Until it doesn't.

The moment a user types "joote laal wale size 9" — red shoes in Hindi — the whole thing falls apart. Same intent. Different language. Zero results.

Traditional search wasn't built for how humans think. It was built for how databases store. And for a long time, we just accepted that users had to adapt to our systems.

LLMs are flipping that entirely.

## What AI-Powered Search Actually Does

Here's the shift: instead of matching words, AI search matches **meaning**.

When a user types a query — in any language, in any phrasing — an LLM converts it into a vector. A dense numerical representation of what that query *means*. Your database entries are also stored as vectors. Search becomes a question of: which entries are closest in meaning to this query?

That's called **semantic search**, and it's the core of every modern AI search bar.

The pipeline looks like this:

```
User Query (any language)
    ↓
Embedding Model (e.g. OpenAI text-embedding-3-small, Cohere multilingual-v3)
    ↓
Query Vector [0.23, -0.87, 0.41, ...]
    ↓
Vector Similarity Search (cosine similarity or dot product)
    ↓
Top-K Matching Results from DB
    ↓
Optional: Reranking with LLM
    ↓
Results shown to user
```

The user typed in Hindi. The embedding model understood it. The results came back in whatever language your DB stores. No translation step. No keyword parsing. Just meaning, matched to meaning.

## The Architecture That Makes It Work

Let's get concrete. Here's what a production-ready AI search setup looks like.

**Step 1: Embed your data at write time**

Every time a new record enters your DB, generate an embedding for it immediately. Don't do this at query time — it's expensive and slow.

```python
import openai

def embed_text(text: str) -> list[float]:
    response = openai.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return response.data[0].embedding
```

Store this vector alongside your regular data. In PostgreSQL, use the `pgvector` extension:

```sql
CREATE EXTENSION vector;

ALTER TABLE products
ADD COLUMN embedding vector(1536);
```

**Step 2: Embed the query at search time**

When a user searches, embed their query using the exact same model. Consistency here is non-negotiable — different models produce different vector spaces. Mix them and your results are garbage.

```python
query_vector = embed_text(user_query)
```

**Step 3: Search by vector similarity**

```sql
SELECT id, name, description,
       1 - (embedding <=> $1::vector) AS similarity
FROM products
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

The `<=>` operator in pgvector computes cosine distance. `1 - distance = similarity`. Higher is better.

**Step 4: Optional — Hybrid Search**

Pure semantic search sometimes misses exact matches that traditional keyword search would catch. A user searching for a specific product ID or a brand name might get semantically close results that aren't actually correct.

The fix is hybrid search: combine vector similarity with full-text search and merge the scores.

```python
# BM25 (keyword) score + embedding (semantic) score
# Weighted combination
final_score = 0.4 * keyword_score + 0.6 * semantic_score
```

PostgreSQL's `tsvector` handles the keyword side. pgvector handles the semantic side. You combine them at the application layer.

This is what production search looks like when you care about precision *and* recall.

## Why Native Language Support Is a Superpower

Most embedding models — especially multilingual ones like `multilingual-e5-large` or Cohere's `embed-multilingual-v3` — encode semantic meaning across languages into the same vector space.

What that means in practice: a query in Hindi and a query in English that mean the same thing will produce vectors that are close to each other. Even if your entire database is in English.

```
"red shoes" → [0.21, -0.44, ...]
"laal joote" → [0.19, -0.46, ...]  # Very close in vector space
```

You don't need to translate. You don't need language detection. You don't need separate indices per language. The model handles the semantic bridge.

This is why users typing in their native language suddenly get results. The intent crosses the language barrier at the embedding level — before it ever touches your data.

## What This Gets Right

**No more keyword guessing.** Users shouldn't have to think about how your database is structured. They shouldn't have to know that the product is tagged "scarlet" not "red." Semantic search handles the vocabulary gap automatically.

**Multi-language without multi-infrastructure.** One embedding model, one vector index, one search pipeline. Works for 50 languages. You don't spin up separate search infrastructure per region.

**Context-aware results.** "Best laptop for college student with tight budget" — a traditional search would key in on "laptop" and "budget." A semantic search understands the full context. Durability, portability, price. The results actually reflect what was asked.

**Graceful degradation.** Even when users make typos, use informal terms, or switch mid-sentence between languages — embedding models are robust to all of that. They've been trained on the messy reality of how humans actually write.

## What This Gets Wrong

Here's what nobody tells you upfront.

**It's expensive at scale.** Embedding every document at write time costs money. For a catalog of 10 million products, that's real embedding API cost. And vector search on a 10M-row index without proper indexing (HNSW or IVFFlat in pgvector) is slow. You need to think about your indexing strategy early.

```sql
-- Create HNSW index for fast approximate search
CREATE INDEX ON products
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

**Semantic search can be too loose.** If a user searches for "iPhone 15 Pro Max 256GB" they probably want exactly that. Semantic search might return iPhone 14, Galaxy S24, "Pro Max alternatives" — all semantically close, none of them correct. This is why hybrid search exists. Pure vectors aren't always right.

**Hallucination risk in reranking.** If you add an LLM reranking step — where the model reads results and re-orders them — you're introducing a model that can make mistakes. It might confidently surface a wrong result because it misunderstood context. Always evaluate reranking with real user queries before shipping it.

**Embeddings go stale.** If you update a product description and forget to re-embed it, your vector is now out of sync with your actual data. You need an embedding refresh pipeline — triggered on every update, not just on insert. Most teams forget this until it causes a subtle production bug.

**It doesn't solve bad data.** If your database entries are poorly written, inconsistently described, or full of noise — semantic search will faithfully surface that garbage. Garbage in, garbage out. The model won't clean up your data problems. It'll just understand them better and still surface them.

## The Stack Worth Knowing

If you're building this today:

- **Embeddings:** OpenAI `text-embedding-3-small` (great English), Cohere `embed-multilingual-v3` (if you need native language support)
- **Vector DB:** pgvector if you're already on PostgreSQL. Pinecone or Weaviate if you need managed scale.
- **Reranking:** Cohere Rerank or a local cross-encoder model
- **Hybrid Search:** BM25 (keyword) + cosine similarity, merged with RRF (Reciprocal Rank Fusion)
- **Framework:** LangChain or LlamaIndex handle a lot of this plumbing if you don't want to wire it yourself

## The Bottom Line

The search bar was always a translation layer — taking what users want and mapping it to what you have. Traditional search made users do that translation. AI search does it for them.

And for users typing in their native language? That translation layer was always broken. LLMs finally fix it — not by learning every language explicitly, but by understanding meaning across all of them at once.

Build it right — with proper indexing, hybrid scoring, and an embedding refresh pipeline — and it's genuinely transformative.

Build it wrong — as a pure semantic search with no guardrails — and you'll get confident, fluent, semantically beautiful wrong answers.

The technology is ready. The architecture is clear. The only question is whether you take the time to do it properly.

I'm guessing you will.