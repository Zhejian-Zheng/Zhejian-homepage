# Bilingual agent articles implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a beginner Agent development guide and an engineering comparison of AgentScope 2.0 and LangChain, with English and Chinese in each MDX file.

**Architecture:** Follow the blog's existing single-file bilingual pattern. Each article owns its metadata and both language sections. Register both MDX components in the existing static `blogPosts` list so the list page and dynamic route can discover them.

**Tech Stack:** MDX, Next.js 14 blog content, existing `article-language-en` and `article-language-zh` containers

## Global constraints

- Create exactly two MDX files under `content/blog`.
- Modify only `app/blog/posts.ts` to register the new posts.
- Put English before Chinese in each file.
- Write the development guide for developers new to Agent applications.
- Write the framework comparison for engineers who have built LLM applications and need to choose a framework.
- Use only official AgentScope and LangChain sources for current framework claims.
- Add no dependency, route, component, or styling change.
- Apply the Humanizer pass without changing metadata, code blocks, API names, or link targets.
- Use no em dash or en dash in final prose.

---

### Task 1: Agent development guide

**Files:**
- Create: `content/blog/agent-development-guide.mdx`

**Interfaces:**
- Consumes: the repository's metadata export and language container convention
- Produces: one discoverable bilingual blog post with framework-neutral Agent development guidance

- [ ] **Step 1: Write metadata and the English article**

Use the title `Agent Development Without the Mystery` and cover the execution loop, task boundaries, tool contracts, state versus memory, workflow control, failure handling, approval, tracing, evaluation, and a small framework-neutral pseudocode example.

- [ ] **Step 2: Write the Chinese article**

Carry over every claim and example in natural technical Chinese. Keep API and engineering terms in English where translation would make the sentence harder to read.

- [ ] **Step 3: Run the content checks**

Run:

```bash
rg -n "—|–| -- |TBD|TODO" content/blog/agent-development-guide.mdx
```

Expected: no matches.

Check the two language containers:

```bash
rg -n "article-language-(en|zh)|</div>" content/blog/agent-development-guide.mdx
```

Expected: one English container, one Chinese container, and two closing `div` tags.

### Task 2: AgentScope 2.0 and LangChain comparison

**Files:**
- Create: `content/blog/agentscope-2-vs-langchain.mdx`

**Interfaces:**
- Consumes: official AgentScope 2.0 and LangChain documentation available on 2026-08-14
- Produces: one discoverable bilingual framework selection guide

- [ ] **Step 1: Build a source-backed comparison matrix**

Use these official source families:

- `https://doc.agentscope.io/`
- `https://github.com/agentscope-ai/agentscope/releases`
- `https://docs.langchain.com/oss/python/langchain/agents`
- `https://docs.langchain.com/oss/python/langchain/middleware/overview`
- `https://docs.langchain.com/oss/python/langchain/multi-agent`
- `https://docs.langchain.com/oss/python/langgraph/overview`

Compare the same research-assistant scenario across execution model, tools, state, memory, structured output, workflow control, multi-agent patterns, human approval, extension points, tracing, evaluation, deployment, ecosystem, and maintenance cost.

- [ ] **Step 2: Write the English article**

Explain trade-offs before recommendations. Distinguish LangChain's `create_agent` abstraction from the LangGraph runtime underneath it. Do not rank either framework as universally better.

- [ ] **Step 3: Write the Chinese article**

Preserve the comparison criteria and recommendations. Write it as an engineering article, not as a literal translation or product brochure.

- [ ] **Step 4: Run the content checks**

Run:

```bash
rg -n "—|–| -- |TBD|TODO" content/blog/agentscope-2-vs-langchain.mdx
```

Expected: no matches.

Check the language containers and official links:

```bash
rg -n "article-language-(en|zh)|</div>|doc.agentscope.io|docs.langchain.com|github.com/agentscope-ai" content/blog/agentscope-2-vs-langchain.mdx
```

Expected: one container per language, two closing `div` tags, and only official framework source domains.

### Task 3: Humanize and verify the finished posts

**Files:**
- Modify: `content/blog/agent-development-guide.mdx`
- Modify: `content/blog/agentscope-2-vs-langchain.mdx`
- Modify: `app/blog/posts.ts`

**Interfaces:**
- Consumes: the two complete bilingual drafts
- Produces: natural final prose that compiles with the existing site

- [ ] **Step 1: Run the Humanizer draft, audit, and final loop internally**

Remove inflated claims, promotional language, vague attribution, filler openings, repetitive three-part phrasing, title-case headings, curly quotation marks, and generic conclusions. Verify that the revision adds no unsupported facts.

- [ ] **Step 2: Check MDX structure and whitespace**

Import both MDX components and metadata objects in `app/blog/posts.ts`, then add their slugs at the beginning of `blogPosts`.

Run:

```bash
git diff --check
```

Expected: exit code 0.

- [ ] **Step 3: Build the site**

Run:

```bash
npm run build
```

Expected: exit code 0 and successful static page generation.

- [ ] **Step 4: Review the final diff**

Run:

```bash
git diff -- content/blog/agent-development-guide.mdx content/blog/agentscope-2-vs-langchain.mdx
```

Expected: only the two requested bilingual posts, with matched English and Chinese coverage.
