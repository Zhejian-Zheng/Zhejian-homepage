# Agent development articles design

## Goal

Add two bilingual MDX posts to the existing blog:

- An Agent development guide for developers who are new to Agent applications.
- A detailed AgentScope 2.0 and LangChain comparison for engineers choosing a framework after building LLM applications.

Each post follows the current repository convention: shared metadata, English first, then Chinese, using the existing `article-language-en` and `article-language-zh` containers.

## Files

- `content/blog/agent-development-guide.mdx`
- `content/blog/agentscope-2-vs-langchain.mdx`

No new components, packages, routes, or styling are needed.

## Agent development guide

The guide starts with the smallest useful definition of an Agent: a model running in a loop that can choose and call tools while carrying task state. It then follows the order in which a beginner would build one:

1. Define the task boundary and success condition.
2. Build the model, instruction, tool, observation, and stop loop.
3. Design small tools with explicit input and output contracts.
4. Separate current task state from persistent memory.
5. Add deterministic workflow steps only where the product needs them.
6. Handle tool failures, timeouts, permissions, and human approval.
7. Trace runs and evaluate complete task outcomes before deployment.

The code example will use framework-neutral Python-like pseudocode so the article teaches the execution model without tying beginners to one library.

## AgentScope 2.0 and LangChain comparison

The comparison uses the same reference problem for both frameworks: a research assistant that searches sources, keeps task state, asks for approval before a consequential action, and returns structured output.

The article compares:

- Core abstractions and execution model
- Model and tool integration
- State, short-term memory, and long-term memory
- Structured output
- Workflow control and multi-agent patterns
- Human-in-the-loop controls
- Middleware and extension points
- Tracing, evaluation, serving, and deployment
- Learning curve, ecosystem size, and maintenance cost

The conclusion will be conditional rather than a universal ranking. AgentScope 2.0 is considered where a Python team wants an integrated Agent framework with explicit Agent objects and built-in Agent-oriented modules. LangChain is considered where a team values its integration ecosystem or needs LangGraph's explicit state graph and production tooling. Claims about current APIs and capabilities must be grounded in official documentation.

## Writing and translation

The English and Chinese sections carry the same claims and examples, but the Chinese version is written as natural technical Chinese rather than a sentence-by-sentence translation. Technical names remain in English where translating them would reduce clarity.

The Humanizer editing pass removes promotional language, vague authority claims, filler, repetitive conclusions, forced three-item phrasing, title case headings, curly quotes, and em or en dashes. It must not alter code blocks, metadata, API names, or link targets.

## Verification

- Confirm both files use valid metadata and balanced language containers.
- Check that every framework claim has an official source.
- Scan prose for em and en dashes outside code where applicable.
- Run the repository's existing lint and build checks.
- Review both language versions for matching meaning and usable headings.

