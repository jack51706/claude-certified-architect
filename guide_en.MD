# Claude Certified Architect — Foundations Certification

## Study Guide (Based on the Official Exam Guide)

---

## Introduction

The **Claude Certified Architect — Foundations** certification confirms that a specialist can make sound trade-off decisions when implementing real-world Claude-based solutions. The exam assesses foundational knowledge of Claude Code, the Claude Agent SDK, the Claude API, and the Model Context Protocol (MCP)—the core technologies for building production applications with Claude.

The exam questions are based on realistic industry scenarios: building agentic systems for customer support, designing multi-agent research pipelines, integrating Claude Code into CI/CD, creating developer productivity tools, and extracting structured data from unstructured documents.

---

## Target Candidate

The ideal candidate is a **solution architect** who designs and ships production applications with Claude. You should have at least 6 months of hands-on experience with:

- **Claude Agent SDK** — multi-agent orchestration, delegating to subagents, tool integration, lifecycle hooks
- **Claude Code** — CLAUDE.md, MCP servers, Agent Skills, planning mode
- **Model Context Protocol (MCP)** — tools and resources for backend integration
- **Prompt engineering** — JSON schemas, few-shot examples, data extraction templates
- **Context windows** — working with long documents, multi-agent context passing
- **CI/CD pipelines** — automated code review, test generation
- **Escalation and reliability** — error handling, human-in-the-loop

---

## Exam Format

| Parameter | Value |
|---|---|
| Question type | Multiple choice (1 correct out of 4) |
| Scoring | 100–1000 scale, passing score **720** |
| Guessing penalty | None (answer every question!) |
| Scenarios | 4 out of 8 possible (randomly selected) |

---

## Exam Content: 5 Domains

| Domain | Weight |
|---|---|
| 1. Agent architecture and orchestration | **27%** |
| 2. Tool design and MCP integration | **18%** |
| 3. Claude Code configuration and workflows | **20%** |
| 4. Prompt engineering and structured output | **20%** |
| 5. Context management and reliability | **15%** |

---

## Exam Scenarios

### Scenario 1: Customer Support Agent
You build an agent to handle returns, billing disputes, and account issues using the Claude Agent SDK. The agent uses MCP tools (`get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`). The target is 80%+ first-contact resolution with appropriate escalation.

### Scenario 2: Code Generation with Claude Code
You use Claude Code to accelerate development: code generation, refactoring, debugging, documentation. You need to integrate it with custom slash commands and CLAUDE.md configuration, and understand when to use planning mode.

### Scenario 3: Multi-Agent Research System
A coordinator agent delegates tasks to specialized subagents: web research, document analysis, synthesis, and report generation. The system must produce complete reports with citations.

### Scenario 4: Developer Productivity Tools
The agent helps engineers explore unfamiliar codebases, generate boilerplate code, and automate routine tasks. Built-in tools (Read, Write, Bash, Grep, Glob) and MCP servers are used.

### Scenario 5: Claude Code for Continuous Integration
Integrate Claude Code into a CI/CD pipeline for automated code reviews, test generation, and pull request feedback. Prompts must be designed to minimize false positives.

### Scenario 6: Structured Data Extraction
The system extracts information from unstructured documents, validates output with JSON schemas, and maintains high accuracy. It must correctly handle edge cases.

### Scenario 7: Conversational AI Architecture Patterns
You design multi-turn conversational systems covering context window management, instruction persistence across turns, memory strategies, tool design for safe execution, and handling ambiguous or conflicting user inputs.

### Scenario 8: Agentic AI Tools
You design and govern the tools an autonomous agent relies on to act in the real world. The work spans tool design (when to expose a dedicated tool versus a general `bash` capability), writing tool descriptions and JSON schemas that disambiguate similar actions, controlling execution with `tool_choice` and parallel tool calls, and adding safety controls (idempotency, confirmation, and permission gating) for destructive or irreversible operations. You drive the agent loop via `stop_reason`, propagate tool errors with enough structure for the model to recover, and keep accumulated tool results from overwhelming the context window. The goal is an agent that selects the right tool, fails safely, and stays reliable across long multi-step tasks.

---

# Official Documentation

| Resource | URL |
|---|---|
| **Claude API — Messages** | https://platform.claude.com/docs/en/api/messages |
| **Claude API — Tool Use** | https://platform.claude.com/docs/en/build-with-claude/tool-use |
| **Claude API — Message Batches** | https://platform.claude.com/docs/en/build-with-claude/message-batches |
| **Claude Agent SDK — Overview** | https://platform.claude.com/docs/en/agent-sdk/overview |
| **Claude Agent SDK — Hooks** | https://platform.claude.com/docs/en/agent-sdk/hooks |
| **Claude Agent SDK — Subagents** | https://platform.claude.com/docs/en/agent-sdk/subagents |
| **Claude Agent SDK — Sessions** | https://platform.claude.com/docs/en/agent-sdk/sessions |
| **Model Context Protocol (MCP)** | https://modelcontextprotocol.io/ |
| **MCP — Tools** | https://modelcontextprotocol.io/docs/concepts/tools |
| **MCP — Resources** | https://modelcontextprotocol.io/docs/concepts/resources |
| **MCP — Servers** | https://modelcontextprotocol.io/docs/concepts/servers |
| **Claude Code — Documentation** | https://code.claude.com/docs/en/overview |
| **Claude Code — CLAUDE.md and Memory** | https://code.claude.com/docs/en/memory |
| **Claude Code — Skills (incl. slash commands)** | https://code.claude.com/docs/en/skills |
| **Claude Code — Hooks** | https://code.claude.com/docs/en/hooks |
| **Claude Code — Sub-agents** | https://code.claude.com/docs/en/sub-agents |
| **Claude Code — MCP Integration** | https://code.claude.com/docs/en/mcp |
| **Claude Code — GitHub Actions CI/CD** | https://code.claude.com/docs/en/github-actions |
| **Claude Code — GitLab CI/CD** | https://code.claude.com/docs/en/gitlab-ci-cd |
| **Claude Code — Headless (non-interactive mode)** | https://code.claude.com/docs/en/headless |
| **Prompt Engineering Guide** | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview |
| **Extended Thinking** | https://platform.claude.com/docs/en/build-with-claude/extended-thinking |
| **Anthropic Cookbook (code examples)** | https://github.com/anthropics/anthropic-cookbook |

---

# PART I: THEORY FOUNDATIONS

This part covers all the theory you need to pass the exam successfully. The material is organized by technologies and concepts rather than by exam domains—this helps you build a deeper understanding of each topic.

---

# Chapter 1: Claude API — Fundamentals of Model Interaction

> Documentation: [Messages API](https://platform.claude.com/docs/en/api/messages) | [Prompt Engineering](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)

Every Claude system — a single classification call, a Claude Code session, or a 20-agent research swarm — is ultimately a sequence of HTTP requests to one endpoint: `POST /v1/messages`. The Messages API is the substrate the rest of this guide builds on. Tool use (Chapter 2), the Agent SDK (Chapter 3), and MCP (Chapter 4) are all *features of this one endpoint or wrappers around it*. If you misunderstand how a request is shaped, what `stop_reason` means, or why the API is stateless, those mistakes propagate into every higher layer.

This chapter underpins three exam domains at once: **Domain 1 — Agent Architecture and Orchestration (27%)** (the agent loop is driven entirely by `stop_reason`), **Domain 4 — Prompt Engineering and Structured Output (20%)** (the `system` field and message construction), and **Domain 5 — Context Management and Reliability (15%)** (the context window and the consequences of a stateless API). By the end you should be able to reason about:

- **The request/response contract** (§1.1) — what every call carries, and which fields are load-bearing.
- **Message roles and statelessness** (§1.2) — why you resend the whole conversation every time.
- **`stop_reason`** (§1.3) — the single field that controls agent loops and error handling.
- **The system prompt** (§1.4) — how behavior is set, and how its wording leaks into tool selection.
- **The context window** (§1.5) — the finite budget all of the above share.
- **Streaming, tokens, and cost** (§1.6) — the operational realities of running the API in production.

§1.7 then builds a complete multi-turn support-chat backend end-to-end, and §1.8 distills what the exam tests.

## 1.1 API Request Structure

The Claude API follows a request–response model. Each request to the Claude Messages API includes:

```json
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 1024,
  "system": "You are a helpful assistant.",
  "messages": [
    {"role": "user", "content": "Hi!"},
    {"role": "assistant", "content": "Hello!"},
    {"role": "user", "content": "How are you?"}
  ],
  "tools": [...],
  "tool_choice": {"type": "auto"}
}
```

**Key fields:**
- `model` — model selection (`claude-opus-4-8`, `claude-sonnet-4-6`, `claude-haiku-4-5`)
- `max_tokens` — maximum number of tokens in the response
- `system` — the system prompt (defines model behavior)
- `messages` — conversation history (**you must send the full history** to maintain coherence)
- `tools` — definitions of available tools
- `tool_choice` — tool selection strategy

**Why each field is the way it is — and the common mistakes:**

- **`model`** is an exact ID string, not a fuzzy alias you can decorate. `claude-opus-4-8` is the most capable tier; `claude-sonnet-4-6` balances cost and intelligence; `claude-haiku-4-5` is fastest and cheapest. A typo (`claude-sonnet-4.6`) or an invented date suffix (`claude-sonnet-4-6-20251114`) returns **404 `not_found_error`** — the exam likes to test that you do not construct IDs.
- **`max_tokens`** caps only the *output*, and the model does not know about it. Set it too low and the response is silently cut off mid-sentence with `stop_reason == "max_tokens"`. Set a generous value for open-ended generation (16K for non-streaming; up to 64K–128K when streaming), and a tiny one (e.g. 256) for classification. Underestimating `max_tokens` is the single most common cause of "the model stopped halfway."
- **`system`** is a *separate top-level field*, not the first element of `messages`. New developers often try to prepend a `{"role": "system", ...}` entry to the array — historically that returns an error, and even where mid-conversation system messages are now supported, the *initial* instructions belong in the top-level `system` field. (More in §1.4.)
- **`messages`** must be non-empty, must start with a `user` turn, and the first message can never be `assistant` — a `400` otherwise. Roles are combined across consecutive same-role entries, but the array as a whole is the entire memory the model has (see §1.2).
- **`tools` / `tool_choice`** are optional. With no tools, the model can only produce text. `tool_choice` defaults to `{"type": "auto"}` (model decides). These are the seam into Chapter 2; for now, note only that their *presence* costs context-window tokens because every tool's JSON schema is sent on every request.

**Exam angle:** questions phrase this as "what is the minimum required to make a valid call?" — the answer is `model`, `max_tokens`, and a `messages` array starting with a `user` turn. Everything else is optional.

## 1.2 Message Roles

The `messages` array uses three roles:
- `user` — user messages
- `assistant` — model responses (included when sending history)
- `tool` — tool call results (the role is not explicitly set; this appears as a `tool_result` content block)

**Critically important:** on every API request you must send the **full conversation history**. The model does not persist state between requests—each call is independent.

**Why this matters more than it looks.** "Stateless" is not a minor implementation detail; it is the defining property of the API, and it dictates the design of every multi-turn system above it:

```mermaid
flowchart TD
    A[Turn 1<br/>send: user msg 1] --> B[Claude replies<br/>assistant msg 1]
    B --> C[Your app stores both<br/>in the messages array]
    C --> D[Turn 2<br/>send: user1 + assistant1 + user2]
    D --> E[Claude replies<br/>assistant msg 2]
    E --> F[Append again<br/>history keeps growing]
    F -.->|every turn resends everything| D
```

- **The server keeps nothing.** There is no session you can "continue" with just the latest user message. If you send only message N, the model has amnesia about messages 1..N-1. The full transcript *is* the conversation.
- **`tool` results are content blocks, not a literal role.** When the model calls a tool, you append the result as a `tool_result` content block inside a `user`-role message — the role label is not set to `"tool"`. This trips up developers who expect a symmetric "tool" role; the exam expects you to know the result rides back in a user turn keyed by `tool_use_id`.
- **Consecutive same-role messages are allowed** (the API merges them into one turn), but the array must still begin with `user`.

**Common mistakes:**
- Sending only the latest user turn and wondering why context is "lost" — the context was never stored server-side.
- Letting the array grow unbounded until it overflows the context window (§1.5) — statelessness means *you* own history management, including trimming and summarization.
- Hand-rolling a `{"role": "tool", ...}` message instead of a `tool_result` block.

## 1.3 The `stop_reason` Field in the Response

The Claude API response includes `stop_reason`, which indicates why the model stopped generating:

| Value | Description | Action |
|---|---|---|
| `"end_turn"` | The model finished its response | Show the result to the user |
| `"tool_use"` | The model wants to call a tool | Execute the tool and return the result |
| `"max_tokens"` | Token limit reached | The response is truncated; you may need to increase the limit |
| `"stop_sequence"` | A stop sequence was encountered | Handle based on your application logic |
| `"pause_turn"` | A long-running turn was paused (e.g. during server-side tool use) and can be resumed | Send the response back so the model continues where it left off |
| `"refusal"` | The model declined to continue for safety reasons (Claude 4+) | Stop the loop and handle gracefully—do not blindly retry the same request |

For agentic systems, `"tool_use"` and `"end_turn"` are the most important—they control the agent loop.

**`stop_reason` is the control plane of every agent.** This single field is *the* exam-critical concept in Chapter 1, because the entire agentic loop (Chapter 3, §3.1) branches on it:

```mermaid
flowchart TD
    A[Read response.stop_reason] --> B{which value?}
    B -->|tool_use| C[Execute tool<br/>append tool_result<br/>loop again]
    B -->|end_turn| D[Done — return text to user]
    B -->|max_tokens| E[Truncated — raise max_tokens<br/>or stream, then retry]
    B -->|pause_turn| F[Resend response<br/>so the server resumes]
    B -->|refusal| G[Stop — handle gracefully<br/>do NOT blind-retry]
```

- **Branch on `stop_reason`, never on text.** The only reliable signal that a task is complete is `stop_reason == "end_turn"`. Parsing the assistant's prose for "done" or "task completed" is the canonical anti-pattern the exam wants you to reject — it is brittle, language-dependent, and easily spoofed by the model's own wording.
- **`max_tokens` means truncated, not finished.** Treat it as an error condition: the output is incomplete. Either raise `max_tokens` and re-request, or switch to streaming (which lets you use a higher ceiling without hitting HTTP timeouts).
- **`pause_turn` is for server-side tools.** When the model uses an Anthropic-hosted tool (web search, code execution) and the server-side loop hits its iteration limit, you get `pause_turn`. Resume by sending the assistant response straight back — **do not** add a `"Continue."` user message; the API detects the trailing server-tool block and resumes automatically.
- **`refusal` must not be blind-retried.** On Claude 4+, a safety decline returns a successful HTTP 200 with `stop_reason == "refusal"`. Re-sending the identical request just burns tokens for the same outcome. Read `stop_reason` *before* touching `response.content` — on a pre-output refusal the content array can be empty, and code that does `response.content[0].text` unconditionally will crash.

**Guard `stop_details` before reading it.** `response.stop_details` is populated *only* when `stop_reason == "refusal"`; for `end_turn`, `max_tokens`, `tool_use`, etc. it is `null`. Reading `.category` without a guard is a runtime error.

## 1.4 System Prompt

The system prompt is a special instruction that defines context and behavioral rules. It:
- Is not part of the `messages` array; it is passed separately in the `system` field
- Has priority over user messages
- Is loaded once and applies throughout the conversation
- Is used to define role, constraints, and output format

**Important for the exam:** system prompt wording can create unintended tool associations. For example, an instruction like "always verify the customer" can cause the model to overuse `get_customer`, even when it is unnecessary.

**Why the system prompt is more than "the instructions."** It is the highest-authority text in the request and it sits at the *front* of the prompt prefix, which has two consequences the exam probes:

```mermaid
flowchart TD
    SP[System prompt<br/>highest authority<br/>front of the prefix] --> A[Defines role and constraints]
    SP --> B[Sets output format]
    SP --> C[Influences tool selection]
    C -.->|over-strong wording| D[Tool overtriggering<br/>e.g. always-verify -> overuse get_customer]
    SP --> E[First bytes of the cacheable prefix<br/>see 1.6 prompt caching]
```

- **Wording leaks into behavior.** Because the model follows the system prompt closely, imperative phrasing meant to *overcome* reluctance now *over*-triggers. "Always verify the customer" makes the model call `get_customer` even when the request never needed it; "CRITICAL: you MUST use the search tool" makes it search when reasoning would do. The fix is almost always to soften the language ("verify the customer when the request involves account changes"), not to add more guardrails. This is the exam's favorite Chapter 1 nuance, and it ties directly into Domain 4 (prompt design) and Domain 1 (tool-selection behavior).
- **Soft preferences belong here; hard rules do not.** The system prompt yields *probabilistic* compliance — the model usually obeys, but not 100% of the time. Anything that must be guaranteed (a refund ceiling, an identity check before a financial action) belongs in deterministic code or a hook (Chapter 3, §3.5), never in prompt text alone. Putting a money rule in the system prompt is a classic wrong answer.
- **It is set once, applies throughout, and overrides user messages.** A user cannot talk the model out of a constraint that lives in the system prompt as easily as one buried in conversation — which is exactly why operator instructions belong there rather than in a user turn.
- **It is the front of the cacheable prefix.** Because the system prompt is stable and sits first, it is the natural place to anchor prompt caching (§1.6). Interpolating volatile content into it — a timestamp, the user's name, a request ID — invalidates the cache for everything after it. Keep it frozen.

## 1.5 Context Window

The context window is the total amount of text (in tokens) the model can process at once. It includes:
- The system prompt
- The full message history
- Tool definitions
- Tool results

**Key context-window problems:**

1. **Lost-in-the-middle effect:** models reliably process information at the start and end of a long input but can miss details in the middle. Mitigation: place key information near the beginning or end.

2. **Accumulation of tool results:** every tool call adds output to the context. If a tool returns 40+ fields but only 5 matter, then most of the context is wasted.

3. **Progressive summarization:** when compressing history, numeric values, percentages, and dates often get lost and become vague ("about", "roughly", "a few").

**Why the context window is a *budget*, not just a *limit*.** Everything in §1.1–§1.4 competes for the same finite token pool, and because the API is stateless (§1.2), that pool fills up turn after turn as you resend a growing transcript:

```mermaid
flowchart TD
    CW[Context window<br/>one shared token budget] --> S[System prompt]
    CW --> H[Full message history<br/>grows every turn]
    CW --> T[Tool definitions<br/>every schema, every request]
    CW --> R[Tool results<br/>accumulate fast]
    H -.->|unbounded growth| X[Overflow risk and<br/>lost-in-the-middle]
    R -.->|40+ fields when 5 matter| X
```

- **Lost-in-the-middle is a placement problem.** Models attend most reliably to the *start* and *end* of a long input and can miss findings buried in the middle. So order matters: put the key instruction or the critical finding near the top or the bottom, not at token 40,000 of 60,000. When aggregating data from multiple sources, lead with the most important section under an explicit heading.
- **Tool-result bloat is the silent budget killer.** A tool that returns 40 fields when the model needs 5 wastes the other 35 on every subsequent turn (because history is resent). Trim verbose tool outputs down to the relevant fields *before* they enter the transcript — this is a Domain 5 skill and a recurring exam scenario.
- **Summarization loses exactly the data you cared about.** Progressive summarization tends to compress precise values — numbers, percentages, dates, IDs — into vague language ("about a few", "roughly last quarter"). The mitigation is to extract transactional facts into a persistent, *un*-summarized "case facts" block rather than trusting a rolling summary to preserve them.
- **Modern long-context features exist, but the principles stand.** Even with 200K–1M-token windows, server-side compaction, and context editing, the same failure modes apply — a bigger budget delays the problem, it doesn't repeal it. The exam tests the *principles* (placement, trimming, fact preservation), not the raw window size.

## 1.6 Streaming, Tokens, and Cost

The previous sections describe the *shape* of a call; this section covers the *operational* realities of running it in production — the parts the exam frames as "which approach should you use" trade-offs.

### Streaming

A non-streaming request blocks until the entire response is generated, then returns it all at once. For long outputs this risks an HTTP timeout — the SDKs refuse non-streaming requests that they estimate will take too long, and large `max_tokens` (above ~16K) effectively *requires* streaming. Streaming sends the response incrementally as a series of Server-Sent Events:

```mermaid
sequenceDiagram
    actor App as Your app
    participant API as Messages API
    App->>API: messages.stream(...)
    API-->>App: message_start (metadata)
    API-->>App: content_block_start
    API-->>App: content_block_delta (token)
    API-->>App: content_block_delta (token)
    API-->>App: content_block_stop
    API-->>App: message_delta (stop_reason, usage)
    API-->>App: message_stop
    App->>App: get_final_message() to assemble the whole reply
```

- **`message_delta` carries the payload you actually need to branch on:** it contains `stop_reason` and the running token `usage`. Even when streaming for UX, call the SDK helper (`get_final_message()` / `.finalMessage()`) to reassemble the complete message — you get the streamed UX *and* timeout protection without having to handle every event by hand.
- **Default to streaming for anything with long input or high `max_tokens`.** It is the standard production posture; non-streaming is fine only for short, fast calls (classification, extraction).

### Tokens and cost

Pricing is per-token, billed separately for input and output, and varies by model:

| Model | Input $/1M | Output $/1M | Context |
|---|---|---|---|
| `claude-opus-4-8` | $5.00 | $25.00 | 1M |
| `claude-sonnet-4-6` | $3.00 | $15.00 | 1M |
| `claude-haiku-4-5` | $1.00 | $5.00 | 200K |

- **Output is far more expensive than input** (5× on every model above). A response that rambles costs more than the prompt that asked for it — another reason a well-scoped `max_tokens` and a concise system prompt matter.
- **Count tokens with the API, not a guess.** To estimate cost or check whether a prompt fits the window, use `POST /v1/messages/count_tokens` (`client.messages.count_tokens(...)`). Do **not** use `tiktoken` or other OpenAI tokenizers — they are calibrated for a different model and undercount Claude tokens, badly on code and non-English text. Token counts are model-specific; pass the same `model` you will use for inference.
- **`usage` reports the real numbers.** Each response carries `usage` with `input_tokens`, `output_tokens`, and the cache fields below. `input_tokens` is the *uncached remainder only* — total prompt size is `input_tokens + cache_creation_input_tokens + cache_read_input_tokens`.

### Prompt caching (basics)

Prompt caching is a **prefix match**: the API caches the rendered prompt up to a `cache_control` breakpoint, and any byte change anywhere in that prefix invalidates everything after it. Render order is `tools` → `system` → `messages`.

- **Keep the stable content first, volatile content last.** A frozen system prompt and a deterministic tool list are ideal cache anchors; a timestamp or per-request ID interpolated into the system prompt silently breaks caching for the whole request.
- **Cache reads cost ~0.1× of base input price**, writes ~1.25× — so a large reused preamble (instructions, few-shot examples, a long document) pays for itself within a couple of requests.
- **Verify with `usage.cache_read_input_tokens`.** If it stays zero across requests that *should* share a prefix, a silent invalidator is at work (commonly `datetime.now()` in the system prompt, an unsorted JSON dump, or a tool set that varies per request).

**Exam angle:** caching, streaming, and token counting are the Chapter 1 building blocks behind Domain 5's cost/reliability scenarios — the questions test *when* to stream, *why* not to use `tiktoken`, and *what* invalidates a cache, not the exact pricing numbers.

## 1.7 End-to-End Case Study: A Multi-Turn Support-Chat Backend

The fields above only matter when they fit together. Here is a complete, realistic backend that ties the chapter into one system — a stateless web service that powers a multi-turn customer-support chat. It uses *only* Chapter 1 concepts: messages, the system prompt, statelessness, streaming, `stop_reason`, token/cost accounting, and prompt caching. (No tools yet — that is Chapter 2.)

### Requirements

- Power a back-and-forth support chat: the user types, the assistant replies, repeat.
- The service is a stateless HTTP backend (multiple instances behind a load balancer) — **it cannot rely on in-process memory** between requests.
- Stream replies token-by-token so the UI shows text as it is generated.
- A fixed support persona and policy text apply to every conversation and must be cached, not re-billed every turn.
- Track token usage per conversation for cost reporting.
- Handle truncated (`max_tokens`) and refused (`refusal`) responses correctly — never show a half-message as if it were complete, never blind-retry a refusal.
- Keep conversations from overflowing the context window.

### Architecture

```mermaid
flowchart TD
    User([User browser]) -->|POST message + conversation_id| Svc[Stateless chat backend]
    Svc --> Store[(Conversation store<br/>full messages array)]
    Store --> Build[Build request<br/>cached system + full history + new turn]
    Build -->|messages.stream| API[Claude Messages API]
    API -->|token deltas| Svc
    Svc -->|SSE| User
    API -->|message_delta: stop_reason + usage| Check{stop_reason?}
    Check -->|end_turn| Save[Append assistant reply<br/>record usage]
    Check -->|max_tokens| Retry[Mark truncated<br/>raise max_tokens]
    Check -->|refusal| Safe[Return safe fallback<br/>no blind retry]
    Save --> Store
```

Because the backend is stateless, **the conversation store is the only memory** — every turn rebuilds the full request from it. The system prompt is the cache anchor; the growing `messages` array is the conversation.

### Implementation

A conversation manager that resends full history, caches the persona, and streams:

```python
import anthropic

client = anthropic.Anthropic()

SUPPORT_SYSTEM = (
    "You are Acme's support assistant. Be concise and friendly. "
    "Help with orders and returns. If a request needs an account change, "
    "ask the user to confirm their order number first."
)  # Frozen — no timestamps or per-user data, so it caches cleanly.

def handle_turn(conversation_id: str, user_text: str) -> dict:
    history = store.load(conversation_id)          # full messages array (statelessness)
    history.append({"role": "user", "content": user_text})

    with client.messages.stream(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        cache_control={"type": "ephemeral"},       # cache the stable system prefix
        system=SUPPORT_SYSTEM,
        messages=history,
    ) as stream:
        for text in stream.text_stream:
            push_sse(conversation_id, text)        # stream tokens to the UI
        final = stream.get_final_message()         # reassemble + get stop_reason/usage

    if final.stop_reason == "refusal":
        return {"status": "refused"}               # do NOT re-send the same request
    if final.stop_reason == "max_tokens":
        return {"status": "truncated"}             # incomplete — raise max_tokens & retry

    assistant_text = next(b.text for b in final.content if b.type == "text")
    history.append({"role": "assistant", "content": assistant_text})
    store.save(conversation_id, history)           # persist the growing transcript
    record_usage(conversation_id, final.usage)     # input/output/cache tokens for cost
    return {"status": "ok"}
```

Guard the context window by trimming history when it grows too large, preserving the most recent turns:

```python
def trim(history: list, keep_recent: int = 20) -> list:
    # Statelessness means WE own history management. Keep recent turns;
    # for long sessions, summarize older turns into a persistent facts block
    # rather than dropping precise order numbers and dates (1.5).
    return history if len(history) <= keep_recent else history[-keep_recent:]
```

### Execution trace

```mermaid
sequenceDiagram
    actor U as User
    participant B as Chat backend
    participant DB as Conversation store
    participant C as Claude API
    U->>B: "Where is order #5512?"
    B->>DB: load history (turns 1..n)
    DB-->>B: full messages array
    B->>C: stream(system=cached, messages=history + new turn)
    C-->>B: token deltas (streamed to U)
    C-->>B: message_delta: stop_reason=end_turn, usage
    B->>DB: append assistant reply, save
    U->>B: "Cancel it." (next turn, same conversation_id)
    B->>DB: load history (now includes the order #5512 exchange)
    B->>C: stream(system=cached prefix → cache hit, full history)
    C-->>B: reply (knows about #5512 only because history was resent)
```

Notice that turn 2 only "remembers" order #5512 because the backend **resent the entire transcript** — the API stored nothing. The second request also gets a **cache hit** on the system prefix, so the persona text is billed at ~0.1× instead of full price.

### Validation

- **Statelessness test:** restart the backend (drop all in-process state) mid-conversation; the next turn must still have full context, proving memory lives in the store, not the process.
- **Cache test:** assert `usage.cache_read_input_tokens > 0` on the second and later turns. If it is zero, a silent invalidator slipped into the system prompt (a timestamp, a per-user string).
- **Truncation test:** force `max_tokens=16` on a long answer and assert the backend reports `truncated` rather than saving a half-sentence as a complete reply.
- **Refusal test:** assert a `refusal` response returns the safe fallback and does *not* fire a second identical request.
- **Context-budget test:** run a long conversation and confirm `trim()` keeps the window bounded without dropping the latest user intent.

### Common pitfalls

- Storing history in process memory and losing the conversation when the load balancer routes the next turn to a different instance (the API is stateless — §1.2).
- Interpolating `datetime.now()` or the user's name into `SUPPORT_SYSTEM`, silently killing the cache (§1.4, §1.6).
- Treating `max_tokens` as success and showing a truncated message as final (§1.3).
- Blind-retrying a `refusal` and burning tokens for the same outcome (§1.3).
- Letting the `messages` array grow unbounded until it overflows the context window (§1.5).
- Estimating cost with `tiktoken` instead of `count_tokens`, undercounting Claude tokens (§1.6).

## 1.8 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Request structure | Minimum valid call is `model` + `max_tokens` + a `messages` array starting with `user`; `system` is a separate field, not a message (§1.1). |
| Statelessness | The server stores nothing — you resend the full history every turn; you own trimming and summarization (§1.2). |
| `stop_reason` | Branch on `stop_reason`, never on parsed text; `end_turn` = done, `max_tokens` = truncated, `refusal` = stop and don't blind-retry (§1.3). |
| System prompt | Highest authority and front of the prefix; over-strong wording overtriggers tools; hard rules belong in code, not prompts (§1.4). |
| Context window | One shared token budget; mitigate lost-in-the-middle by placement, trim bloated tool results, preserve precise facts (§1.5). |
| Streaming & cost | Stream for long output / high `max_tokens`; read `usage`; count tokens with `count_tokens`, never `tiktoken`; cache the stable prefix (§1.6). |

> **Maps to Domains 1, 4, and 5.** Chapter 1 is the foundation the rest of the guide stands on: `stop_reason` drives the agent loops of Domain 1, the system prompt and message construction drive Domain 4, and statelessness plus the context window drive Domain 5. Master the support-chat backend above — messages, system prompt, streaming, `stop_reason`, cost, caching — and the higher layers become far easier to reason about.

# Chapter 2: Tools and `tool_use`

> Documentation: [Tool Use](https://platform.claude.com/docs/en/build-with-claude/tool-use)

Tools are how Claude stops being a text generator and starts being a system that *acts* — looking up an order, running a query, calling an API. This chapter is the backbone of **Domain 2 — Tool Design and MCP Integration (18% of the exam)**. Where Chapter 3 covers how an agent *orchestrates* tools, this chapter covers the contract underneath every one of those calls: how you *define* a tool, how Claude *requests* it, how you *return* its result (including failures), and how you *steer* selection. By the end you should be able to:

- Explain the **`tool_use` / `tool_result` round trip** (§2.1) — the message exchange every tool call rides on.
- Write a **tool definition** whose `description` actually drives correct selection (§2.2).
- Steer selection with **`tool_choice`** (§2.3) and reason about **parallel tool calls** (§2.4).
- Use **JSON Schema** as the most reliable path to structured output (§2.5), and tell **syntax from semantic** errors (§2.6).
- Return **structured error results** so the model can recover correctly (§2.7).

§2.8 then builds a complete invoice-extraction service end-to-end, and §2.9 distills what the exam tests.

## 2.1 What is `tool_use`

`tool_use` is the mechanism that lets Claude call external functions. The model **does not run code** — it emits a structured *request* to call a tool; **your code executes it** and feeds the result back. Claude is the planner; your runtime is the hands.

Mechanically, a tool call is a four-message round trip carried entirely inside the normal `messages` array:

```mermaid
flowchart TD
    A[Your code sends user message<br/>plus tools array] --> B[Claude replies<br/>stop_reason is tool_use]
    B --> C[Response holds a tool_use block<br/>id, name, input]
    C --> D[Your code runs the real function]
    D --> E[Append a user message with<br/>a tool_result block, same id]
    E --> F[Claude reads the result<br/>and continues]
    F --> G{stop_reason?}
    G -->|tool_use| D
    G -->|end_turn| H[Final text answer to user]
```

The wire format matters because the exam tests whether you understand it:

```json
// 1) Claude's response — stop_reason: "tool_use"
{
  "role": "assistant",
  "content": [
    {"type": "text", "text": "Let me look that up."},
    {"type": "tool_use", "id": "toolu_01A...", "name": "get_customer",
     "input": {"email": "ada@example.com"}}
  ]
}

// 2) Your reply — the result goes back as a USER message
{
  "role": "user",
  "content": [
    {"type": "tool_result", "tool_use_id": "toolu_01A...",
     "content": "{\"name\":\"Ada\",\"status\":\"active\"}"}
  ]
}
```

**Why this matters / common mistakes:**
- The `tool_result` block goes back in a message with **`role: "user"`**, not `assistant` — a frequent point of confusion. The `tool_use_id` must match the `id` Claude generated, or the API rejects the turn.
- You must **echo the assistant's `tool_use` turn back** in the next request. The API is stateless; if you drop the assistant turn that contained the `tool_use` block and only send the `tool_result`, the conversation is malformed.
- Claude often emits a `text` block ("Let me look that up.") *alongside* the `tool_use` block. Don't treat that text as the final answer — `stop_reason == "tool_use"` means the turn is not done.

> **Exam angle:** know the role/id pairing (`tool_use.id` ↔ `tool_result.tool_use_id`) and that `tool_result` rides on a `user` message. This is the literal protocol Chapter 3's agentic loop drives.

## 2.2 Tool Definition

Each tool is defined with a JSON schema. The `description` is the single most important field you will write:

```json
{
  "name": "get_customer",
  "description": "Finds a customer by email or ID. Returns the customer profile, including name, email, order history, and account status. Use this tool BEFORE lookup_order to verify the customer's identity. Accepts an email (format: user@domain.com) or a numeric customer_id.",
  "input_schema": {
    "type": "object",
    "properties": {
      "email": {"type": "string", "description": "Customer email"},
      "customer_id": {"type": "integer", "description": "Numeric customer ID"}
    },
    "required": []
  }
}
```

**Critically important aspects of a tool description:**

1. **The description is the primary selection mechanism.** Claude chooses tools almost entirely from their descriptions and schemas — it has no other view of what the tool does. Minimal descriptions ("Retrieves customer information") cause wrong-tool selection the moment two tools overlap.

2. **Include in the description:**
   - What the tool does and what it returns
   - Input formats and example values
   - Edge cases and constraints
   - When to use this tool vs similar alternatives

3. **Avoid** identical or overlapping descriptions across tools. If `analyze_content` and `analyze_document` read almost the same, the model will confuse them. The fix is often to **rename for specificity** (`analyze_content` → `extract_web_results`) and to **split a general tool into focused ones** with distinct input/output contracts — exactly the Domain 2 skill of eliminating functional overlap.

4. **Built-in tools vs MCP tools:** agents tend to prefer built-in tools (Read, Grep) over MCP tools with similar functionality. To counter this, strengthen the MCP tool's description — name the concrete advantage, the unique data, or the context a built-in tool cannot provide.

5. **Mind the system prompt.** Wording in the system prompt can create unintended associations ("you are a *search* assistant" biases the model toward anything named `search_*`). Tool routing is the product of *both* the descriptions and the surrounding prompt.

**Why this matters / common mistakes:** treating descriptions as human documentation rather than the model's routing table. A vague or duplicated description is not a cosmetic issue — it is a correctness bug that surfaces as the agent calling the wrong tool.

> **Exam angle:** given two confusable tools, the right answer is usually to *rewrite/rename the descriptions to disambiguate* (and split overly general tools), not to add more prompt instructions.

## 2.3 The `tool_choice` Parameter

`tool_choice` controls *how* the model selects tools:

| Value | Behavior | When to use |
|---|---|---|
| `{"type": "auto"}` | The model decides whether to call a tool or answer in text | Default for most cases |
| `{"type": "any"}` | The model **must** call some tool (never plain text) | When you need guaranteed structured output |
| `{"type": "tool", "name": "extract_metadata"}` | The model **must** call that specific tool | When you need a forced first step / execution order |
| `{"type": "none"}` | The model **may not** call any tool this turn | Temporarily disable tools without removing them |

**Important scenarios:**
- `tool_choice: "any"` + several extraction tools → the model still picks the best one, but you are guaranteed a tool call rather than a prose answer.
- Forced selection (`type: "tool"`) → when you must guarantee a specific first action (e.g., `extract_metadata` before any enrichment step).

**Why this matters / common mistakes:**
- With `auto`, Claude may legitimately answer in text. If your code unconditionally parses a `tool_use` block, it crashes on the text-only turn. Use `any` when downstream code *requires* structured output.
- **Forcing a tool disables extended thinking** for that turn, and `any`/`tool` mean the model will *always* call something — so a forced tool must be one it is safe to call unconditionally. Don't force a side-effectful tool (e.g., `send_email`) just to get structure; force an extraction/formatting tool instead.

> **Exam angle:** "guarantee structured output, model picks the tool" → `any`. "Guarantee a specific tool runs first" → `{"type":"tool","name":...}`. "Model may answer or call" → `auto`.

## 2.4 Parallel Tool Calls

When a turn needs several independent lookups, Claude can emit **multiple `tool_use` blocks in a single response**. Your code runs them (ideally concurrently) and returns **all** the `tool_result` blocks in **one** following `user` message.

```mermaid
flowchart TD
    A[Claude one response<br/>three tool_use blocks] --> B[get_weather<br/>id 1]
    A --> C[get_traffic<br/>id 2]
    A --> D[get_events<br/>id 3]
    B --> E[Run concurrently in your code]
    C --> E
    D --> E
    E --> F[One user message<br/>three tool_result blocks<br/>ids 1, 2, 3]
    F --> G[Claude continues with all results]
```

**Why this matters / common mistakes:**
- All `tool_result` blocks for a parallel batch must come back in **one** user message, each matched to its `tool_use_id`. Splitting them across multiple messages, or omitting one id, malforms the turn.
- Parallelism is an optimization for **independent** calls. If tool B needs tool A's output, those are *sequential* round trips, not a parallel batch — the model will request A, see the result, then request B.
- You can nudge or suppress parallelism: prompting (e.g., asking the model to gather all needed data at once) encourages it; `disable_parallel_tool_use: true` in `tool_choice` forces at most one call per turn when your backend can't handle concurrency safely.

> **Exam angle:** parallel tool calls = lower latency for independent work; the giveaway in a question is "fetch X, Y, and Z" with no dependency between them. Dependent steps are not parallelizable.

## 2.5 JSON Schemas for Structured Output

Using `tool_use` with a JSON schema is the **most reliable** way to get structured output from Claude. It:
- **Guarantees syntactically valid JSON** (no missing braces, no trailing commas)
- **Enforces the required structure** (required fields are present, enums are respected)
- Does **not** guarantee semantic correctness (the values can still be wrong)

The classic pattern is a single "extractor" tool whose `input_schema` *is* the shape you want back; call it with `tool_choice: {"type":"tool","name":"..."}` and read the `input` of the resulting `tool_use` block.

**Schema design — key principles:**

```json
{
  "type": "object",
  "properties": {
    "category": {
      "type": "string",
      "enum": ["bug", "feature", "docs", "unclear", "other"]
    },
    "category_detail": {
      "type": ["string", "null"],
      "description": "Details if category = 'other' or 'unclear'"
    },
    "severity": {
      "type": "string",
      "enum": ["critical", "high", "medium", "low"]
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "optional_field": {
      "type": ["string", "null"],
      "description": "Null if the information was not found in the source"
    }
  },
  "required": ["category", "severity"]
}
```

**Schema design rules:**
1. **Required vs optional:** mark a field `required` only if the information is *always* available. Required fields push the model to **fabricate** a value when the data is missing.
2. **Nullable fields:** use `"type": ["string", "null"]` for information that may be absent, so the model can return `null` instead of hallucinating.
3. **Enums with `"other"`:** add `"other"` + a detail string so data outside your predefined categories isn't silently lost.
4. **Enum `"unclear"`:** for cases where the model can't confidently choose — an honest `"unclear"` beats a confident wrong category.
5. **Describe each field.** The per-field `description` is part of the prompt; "Null if not found in source" measurably reduces hallucination.

**Why this matters / common mistakes:** over-requiring fields and omitting null are the two most common schema bugs, and both manufacture hallucinations. The schema constrains *shape*, never *truth* — which is why §2.6 exists.

> **Exam angle:** "How do I guarantee valid, well-structured output?" → a tool/JSON-schema, not prompt-and-parse. "How do I let the model say *I don't know*?" → nullable types and an `unclear`/`other` enum.

## 2.6 Syntax vs Semantic Errors

A JSON schema closes the door on one whole class of error and not the other. Keeping them separate tells you which mitigation applies.

| Error type | Example | Mitigation |
|---|---|---|
| **Syntax** | Invalid JSON, wrong field type, missing required key | `tool_use` with a JSON schema (**eliminates** this class) |
| **Semantic** | Totals don't add up, value placed in the wrong field, fabricated value | Validation checks, retry with feedback, self-correction |

**Why this matters / common mistakes:** assuming that because the JSON parsed, it is *correct*. A schema guarantees `line_items` is an array of the right shape; it cannot guarantee the line items sum to `total`. Semantic correctness is *your* job — validate after extraction, and on failure re-prompt with the specific discrepancy (e.g., "line items sum to 90.00 but total is 95.00; recompute") so the model self-corrects.

> **Exam angle:** if a question's failure is "malformed JSON / missing field," the fix is the schema. If it's "numbers are wrong / value mis-slotted," the fix is validation + retry — the schema won't help.

## 2.7 Structured Error Results

Tools fail — timeouts, bad input, policy violations, missing permissions. **How you report the failure back to Claude determines whether it recovers correctly.** A tool result is not limited to success payloads; you mark a failed result with **`is_error: true`** (the `isError` flag in MCP), and — critically — you make the *content* machine-actionable:

```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_01B...",
  "is_error": true,
  "content": "{\"errorCategory\":\"transient\",\"isRetryable\":true,\"message\":\"Upstream timeout after 5s\"}"
}
```

Distinguish the error *categories*, because each implies a different recovery:

| Category | Example | Retryable? | What Claude should do |
|---|---|---|---|
| **Transient** | Upstream timeout, 503 | Yes | Retry, ideally with backoff |
| **Validation** | Malformed email, missing field | No | Fix the input and call again |
| **Business** | Refund exceeds policy limit | No | Explain to the user / escalate |
| **Permission/Access** | Token lacks scope | No | Stop and surface, don't loop |

**Why this matters / common mistakes:**
- A generic `"Operation failed"` strips the model of the information it needs to decide *retry vs fix vs stop*. The classic failure mode is the agent **retrying a non-retryable validation or business error forever**.
- Return `isRetryable: false` for business-rule violations *with a clear user-facing `message`*, so the agent explains rather than loops.
- **Distinguish an access failure from a valid empty result.** `search` returning zero rows is a *success* with empty data — not an error. Marking "no matches" as `is_error` makes the model think the tool broke and retry pointlessly.
- **Recover locally where you can.** For transient failures, a subagent should retry internally and only propagate errors it genuinely cannot resolve — don't burden the coordinator with every blip.

> **Exam angle:** the right answer to "the agent keeps retrying a doomed call" is *structured error metadata* (`errorCategory`, `isRetryable`, human-readable `message`), not a longer prompt. And "no results found" is not an error.

## 2.8 End-to-End Case Study: An Invoice-Extraction Service

The pieces above only matter assembled. Here is a complete, realistic build that exercises every concept in this chapter — definitions, `tool_choice`, the round trip, parallel calls, structured errors, and the syntax/semantic split. The job: turn a messy uploaded invoice (PDF text + a vendor ID) into validated structured data, enriched with live tax and vendor info.

### Requirements

- Input: raw invoice text plus a `vendor_id`. Output: a **strictly structured** invoice record (line items, subtotal, tax, total).
- The extraction must be **guaranteed structured** — downstream accounting code cannot parse prose.
- Enrichment needs **two independent lookups** — current `tax_rate` for the region and the canonical `vendor` record — which should run **in parallel** to cut latency.
- Lookups can **fail**; the system must tell retryable timeouts apart from a vendor that simply doesn't exist.
- A correct-shaped invoice can still be **wrong** (line items not summing to the total); that must be caught.

### Architecture

```mermaid
flowchart TD
    In([Invoice text plus vendor_id]) --> Ext[Forced tool<br/>extract_invoice<br/>tool_choice type tool]
    Ext --> Par[Claude requests two tools<br/>in one turn]
    Par --> Tax[get_tax_rate]
    Par --> Ven[get_vendor]
    Tax --> Batch[One user message<br/>two tool_result blocks]
    Ven --> Batch
    Batch --> Val{Validation<br/>line items sum to total?}
    Val -->|no| Retry[Re-prompt with the discrepancy]
    Retry --> Ext
    Val -->|yes| Done[Validated invoice record]
```

`extract_invoice` is **forced** so structure is guaranteed; the two enrichment lookups are **independent**, so Claude is allowed to request them **in parallel**; **structured errors** drive recovery; and a **semantic** check (the sum) sits outside the schema because a schema can't enforce arithmetic.

### Implementation

Define the extractor — its `input_schema` *is* the output shape — plus two enrichment tools:

```python
extract_invoice = {
    "name": "extract_invoice",
    "description": "Extract a structured invoice from raw text. Returns line items, "
                   "subtotal, tax, and total. Use vendor_currency for all amounts.",
    "input_schema": {
        "type": "object",
        "properties": {
            "line_items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "desc": {"type": "string"},
                        "amount": {"type": "number"}
                    },
                    "required": ["desc", "amount"]
                }
            },
            "subtotal": {"type": "number"},
            "currency": {"type": "string"},
            "vendor_tax_id": {
                "type": ["string", "null"],
                "description": "Null if no tax id appears in the source"
            }
        },
        "required": ["line_items", "subtotal", "currency"]
    }
}

get_tax_rate = {
    "name": "get_tax_rate",
    "description": "Returns the current tax rate (0..1) for a region code. Read-only.",
    "input_schema": {"type": "object",
        "properties": {"region": {"type": "string"}}, "required": ["region"]}
}

get_vendor = {
    "name": "get_vendor",
    "description": "Returns the canonical vendor record (legal name, region) for a vendor_id. Read-only.",
    "input_schema": {"type": "object",
        "properties": {"vendor_id": {"type": "string"}}, "required": ["vendor_id"]}
}
```

Force the extractor on the first turn so you never get prose back:

```python
resp = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=[extract_invoice, get_tax_rate, get_vendor],
    tool_choice={"type": "tool", "name": "extract_invoice"},   # guaranteed structure
    messages=[{"role": "user", "content": invoice_text}],
)
invoice = next(b.input for b in resp.content if b.type == "tool_use")
```

Run the two independent lookups concurrently and return **both** results in **one** user message:

```python
def run_tool(call):
    try:
        if call.name == "get_vendor":
            return {"is_error": False, "content": json.dumps(lookup_vendor(call.input["vendor_id"]))}
        if call.name == "get_tax_rate":
            return {"is_error": False, "content": json.dumps(get_rate(call.input["region"]))}
    except TimeoutError:
        return {"is_error": True,
                "content": json.dumps({"errorCategory": "transient", "isRetryable": True,
                                       "message": "Upstream timeout"})}
    except VendorNotFound:
        return {"is_error": True,
                "content": json.dumps({"errorCategory": "validation", "isRetryable": False,
                                       "message": "No vendor with that id"})}

# Claude emitted get_tax_rate and get_vendor in ONE response -> run in parallel
results = parallel_map(run_tool, tool_use_blocks)   # concurrent
tool_results = [
    {"type": "tool_result", "tool_use_id": b.id, **r}
    for b, r in zip(tool_use_blocks, results)
]
messages.append({"role": "user", "content": tool_results})   # all in one message
```

Validate **semantics** the schema can't — and on failure, re-prompt with the exact discrepancy:

```python
computed = round(sum(li["amount"] for li in invoice["line_items"]), 2)
if computed != invoice["subtotal"]:
    feedback = (f"line_items sum to {computed} but subtotal is "
                f"{invoice['subtotal']}. Recompute and call extract_invoice again.")
    # send `feedback` back as a user turn -> the model self-corrects (§2.6)
```

### Execution trace

```mermaid
sequenceDiagram
    actor Sys as Caller
    participant Cl as Claude
    participant Tax as get_tax_rate
    participant Ven as get_vendor
    Sys->>Cl: invoice_text, tool_choice forces extract_invoice
    Cl-->>Sys: tool_use extract_invoice with structured input
    Cl-->>Sys: two tool_use blocks, get_tax_rate and get_vendor
    Sys->>Tax: region US-CA
    Sys->>Ven: vendor_id V-77
    Ven-->>Sys: is_error true, validation, no such vendor
    Tax-->>Sys: rate 0.0725
    Sys->>Cl: one user message, both tool_result blocks
    Cl-->>Sys: end_turn, explains vendor V-77 not found, returns invoice with tax
```

Two things to notice. The **forced** `extract_invoice` removed any chance of a prose answer. And the **structured** `get_vendor` error (`validation`, `isRetryable: false`) let Claude *explain* the missing vendor instead of retrying a call that can never succeed — exactly the §2.7 behavior the exam rewards.

### Validation

- **Structure test:** assert the first turn is always a `tool_use` for `extract_invoice` (forcing works) and that its `input` validates against the schema.
- **Parallelism test:** feed an invoice that needs both lookups; assert Claude emits both `tool_use` blocks in **one** response and that you return both `tool_result`s in **one** message.
- **Error-routing test:** make `get_vendor` raise `VendorNotFound`; assert the agent *explains* rather than retries (non-retryable), and that a `TimeoutError` *is* retried.
- **Semantic test:** feed an invoice whose line items don't sum to subtotal; assert the validator catches it and re-prompts. A schema-only design passes this bad invoice silently.

### Common pitfalls

- Returning the `tool_result` on an **`assistant`** message, or with a mismatched `tool_use_id` (§2.1) — the API rejects the turn.
- Using `tool_choice: "auto"` and then unconditionally reading a `tool_use` block, which crashes on a text-only turn (§2.3).
- Splitting parallel `tool_result`s across multiple user messages instead of one (§2.4).
- Marking "vendor not found" as a generic error with no category, so the agent retries forever; or marking an empty search result as an error at all (§2.7).
- Trusting parsed JSON as correct and skipping the sum check (§2.6).

## 2.9 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| `tool_use` round trip | `tool_result` rides on a **`user`** message; `tool_use.id` ↔ `tool_result.tool_use_id`; echo the assistant turn back (§2.1). |
| Tool descriptions | The description is the model's routing table; fix confusable tools by **rewriting/renaming/splitting**, not more prompt (§2.2). |
| `tool_choice` | `any` = some tool guaranteed; `{"type":"tool",...}` = a specific tool; `auto` = model may answer in text (§2.3). |
| Parallel tool calls | Multiple `tool_use` in one turn for **independent** work; return all `tool_result`s in **one** message; dependent steps stay sequential (§2.4). |
| JSON-schema output | Most reliable structured output; nullable types + `unclear`/`other` let the model avoid fabricating (§2.5). |
| Syntax vs semantic | Schema **eliminates** syntax errors but not wrong values; semantics need validation + retry (§2.6). |
| Structured errors | `errorCategory` / `isRetryable` / `message` drive retry-vs-fix-vs-stop; an empty result is **not** an error (§2.7). |

> **Maps to Domain 2 (18%).** If you can build and defend the invoice-extraction service above — definitions, forcing, the round trip, parallel calls, structured errors, and the syntax/semantic split — you have the core of the Tool Design and MCP Integration domain.

# Chapter 3: Claude Agent SDK — Building Agentic Systems

> Documentation: [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) | [Hooks](https://platform.claude.com/docs/en/agent-sdk/hooks) | [Subagents](https://platform.claude.com/docs/en/agent-sdk/subagents) | [Sessions](https://platform.claude.com/docs/en/agent-sdk/sessions)

The Claude Agent SDK turns a single model call into an **autonomous system** that can plan, call tools, delegate to subagents, and enforce guardrails. This chapter is the backbone of **Domain 1 — Agent Architecture and Orchestration (27% of the exam)**, the most heavily weighted domain. By the end you should be able to reason about four building blocks and assemble them into a production agent:

- **The agentic loop** (§3.1) — how an agent decides what to do next.
- **Hub-and-spoke orchestration** (§3.3) — a coordinator delegating to isolated subagents.
- **Explicit context passing** (§3.4) — why subagents are blind unless you tell them everything.
- **Deterministic hooks** (§3.5) — enforcing business rules with 100% reliability.

§3.6 then builds a complete customer-support refund agent end-to-end, and §3.7 distills what the exam tests.

## 3.1 What is an Agentic Loop

The agentic loop is the core pattern for autonomous task execution. The model doesn't just answer—it performs a sequence of actions:

```mermaid
flowchart TD
    A[Send request to Claude<br/>tools + full history] --> B[Claude responds]
    B --> C{stop_reason?}
    C -->|tool_use| D[Execute the requested tool]
    D --> E[Append tool_result<br/>to the message history]
    E --> A
    C -->|end_turn| F[Task complete —<br/>return result to the user]
```

In code the loop is just a `while` that branches on `stop_reason`:

```
1. Send a request to Claude with tools
2. Receive a response
3. Check stop_reason:
   - "tool_use"  -> execute the tool, append the result to history, go to step 1
   - "end_turn"  -> the task is complete, show the result to the user
4. Repeat until completion
```

**This is a model-driven approach:** Claude decides which tool to call next based on context and prior tool results. This differs from hard-coded decision trees where the action sequence is fixed.

**Anti-patterns (avoid):**
- Parsing assistant text to detect completion (“Task completed”)
- Using an arbitrary iteration limit (e.g., `max_iterations=5`) as the primary stop condition
- Checking whether the assistant produced textual content as a completion signal

**Correct approach:** the only reliable completion signal is `stop_reason == "end_turn"`.

## 3.2 `AgentDefinition` Configuration

`AgentDefinition` is the agent configuration object in the Claude Agent SDK:

```python
agent = AgentDefinition(
    name="customer_support",
    description="Handles customer requests for returns and order issues",
    system_prompt="You are a customer support agent...",
    allowed_tools=["get_customer", "lookup_order", "process_refund", "escalate_to_human"],
    # For a coordinator:
    # allowed_tools=["Task", "get_customer", ...]
)
```

**Key parameters:**
- `name` / `description` — identification and description of the agent
- `system_prompt` — system prompt with instructions
- `allowed_tools` — list of allowed tools (principle of least privilege)

## 3.3 Hub-and-Spoke: Coordinator and Subagents

A multi-agent architecture is typically built as a hub-and-spoke topology:

```mermaid
flowchart TD
    U[User request] --> C[Coordinator]
    C -->|Task: search| S1[Subagent 1<br/>search]
    C -->|Task: analyze| S2[Subagent 2<br/>analysis]
    C -->|Task: synthesize| S3[Subagent 3<br/>synthesis]
    S1 -. result only .-> C
    S2 -. result only .-> C
    S3 -. result only .-> C
    C --> R[Aggregated and validated result]
```

**The coordinator is responsible for:**
- Decomposing the task into subtasks
- Deciding which subagents are needed (dynamic selection)
- Delegating work to subagents
- Aggregating and validating results
- Handling errors and retries
- Communicating results to the user

**Critical principle: subagents have isolated context.**
- Subagents do **not** automatically inherit the coordinator's conversation history
- All required context must be **explicitly passed** in the subagent prompt
- Subagents do not share memory across calls
- All communication flows through the coordinator (for observability and error control)

## 3.4 The `Task` Tool for Spawning Subagents

Subagents are spawned via the `Task` tool:

```python
# The coordinator's allowedTools must include "Task"
coordinator_agent = AgentDefinition(
    allowed_tools=["Task", "get_customer"]
)
```

**Explicit context passing is mandatory:**

```
# Bad: the subagent has no context
Task: "Analyze the document"

# Good: full context in the prompt
Task: "Analyze the following document.
Document: [full document text]
Prior search results: [web search results]
Output format requirements: [schema]"
```

**Parallel spawning:** a coordinator can call multiple `Task`s in one response—subagents run in parallel:

```
# One coordinator response contains:
Task 1: "Search for articles about X"
Task 2: "Analyze document Y"
Task 3: "Search for articles about Z"
# All three run concurrently
```

## 3.5 Hooks in the Agent SDK

Hooks allow interception and transformation at specific points in the agent lifecycle.

**PostToolUse** intercepts a tool result before it is provided to the model:

```python
# Example: normalize date formats from different MCP tools
@hook("PostToolUse")
def normalize_dates(tool_result):
    # Convert Unix timestamp -> ISO 8601
    # Convert "Mar 5, 2025" -> "2025-03-05"
    return normalized_result
```

**Outgoing-call interception hook** blocks actions that violate policy:

```python
# Example: block refunds above $500
@hook("PreToolUse")
def enforce_refund_limit(tool_call):
    if tool_call.name == "process_refund" and tool_call.args.amount > 500:
        return redirect_to_escalation(tool_call)
```

**Key difference: hooks vs prompt instructions**

| Attribute | Hooks | Prompt instructions |
|---|---|---|
| Guarantee | **Deterministic** (100%) | **Probabilistic** (>90%, not 100%) |
| When to use | Critical business rules, financial operations, compliance | General preferences, recommendations, formatting |
| Example | Block refunds > $500 | “Try to solve before escalating” |

**Rule:** when failure has financial, legal, or safety consequences—use hooks, not prompts.

## 3.6 End-to-End Case Study: A Customer-Support Refund Agent

The pieces above only matter when they fit together. Here is a complete, realistic agent that ties the chapter into one system — the kind of design the exam's **Customer Support Agent** scenario asks you to reason about.

### Requirements

- Handle customer refund/return requests in natural language.
- Look up the customer and their order (read-only tools).
- Check the refund against company policy.
- **Hard rule:** any refund **over $500 must be approved by a human** — no exceptions, no model discretion.
- Order data arrives from several tools with inconsistent date formats; normalize them before the model reasons about them.

### Architecture

```mermaid
flowchart TD
    User([Customer]) --> Coord[Coordinator Agent]
    Coord -->|Task| Lookup[Subagent: order lookup<br/>get_customer, lookup_order]
    Coord -->|Task| Policy[Subagent: policy search<br/>search_policy]
    Lookup --> Post{{PostToolUse hook<br/>normalize dates}}
    Post --> Coord
    Policy --> Coord
    Coord --> Refund[process_refund]
    Refund --> Pre{{PreToolUse hook<br/>amount over $500?}}
    Pre -->|yes| Esc[escalate_to_human]
    Pre -->|no| Exec[Execute refund]
    Esc --> Human([Human approver])
```

The coordinator owns orchestration; subagents do narrow, least-privilege work; **hooks — not prompt text — enforce the money rule and the date normalization**, because both must be deterministic.

### Implementation

Define the coordinator and a least-privilege subagent:

```python
coordinator = AgentDefinition(
    name="support_coordinator",
    description="Resolves refund and return requests; escalates when required.",
    system_prompt=(
        "You help customers with refunds. Look up the order, check policy, "
        "then call process_refund. Never promise an outcome you have not executed."
    ),
    allowed_tools=["Task", "process_refund", "escalate_to_human"],
)

order_lookup = AgentDefinition(
    name="order_lookup",
    description="Reads customer and order records. Read-only.",
    system_prompt="Return the customer's order details as structured data.",
    allowed_tools=["get_customer", "lookup_order"],   # least privilege: no refund power
)
```

Enforce the $500 rule deterministically with a `PreToolUse` hook — this is the line the exam wants you to get right:

```python
@hook("PreToolUse")
def enforce_refund_limit(tool_call):
    if tool_call.name == "process_refund" and tool_call.args["amount"] > 500:
        # The model cannot bypass this; it is code, not a suggestion.
        return redirect(to="escalate_to_human", reason="refund_over_limit")
    return allow(tool_call)
```

Normalize dates from every tool with a `PostToolUse` hook, so the model never sees three date formats:

```python
@hook("PostToolUse")
def normalize_dates(tool_result):
    tool_result["order_date"] = to_iso8601(tool_result.get("order_date"))
    return tool_result
```

### Execution trace

```mermaid
sequenceDiagram
    actor Cust as Customer
    participant Co as Coordinator
    participant L as Lookup subagent
    participant Pre as PreToolUse hook
    participant Hu as Human approver
    Cust->>Co: "Refund my order #1234"
    Co->>L: Task(context: order #1234 + customer id)
    L-->>Co: order total $720, within return window
    Co->>Pre: process_refund(amount=720)
    Pre->>Pre: 720 > 500, block and redirect
    Pre->>Hu: escalate_to_human(case #1234)
    Hu-->>Cust: "A specialist will approve your $720 refund."
```

Notice the coordinator *intended* to refund directly; the **hook overrode it deterministically**. With only a prompt instruction ("escalate refunds over $500"), the model would comply ~90% of the time — not good enough for money.

### Validation

- **Determinism test:** fire 100 refunds of $501 and assert 100 escalations. A prompt-only design will leak; the hook design must be 100%.
- **Context-isolation test:** confirm the lookup subagent receives the order id *in its Task prompt* — remove it and the subagent should fail, proving context isn't shared automatically.
- **Least-privilege test:** assert the `order_lookup` subagent cannot call `process_refund`.

### Common pitfalls

- Putting the $500 rule in the system prompt instead of a hook (probabilistic, not guaranteed).
- Forgetting to pass the order id into the subagent's prompt (isolated context — see §3.3).
- Treating assistant text like "Refund processed" as the completion signal instead of `stop_reason == "end_turn"` (§3.1).

## 3.7 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Agentic loop | The only reliable stop signal is `stop_reason == "end_turn"` — never parsed text or an iteration cap (§3.1). |
| Hub-and-spoke | Coordinator decomposes, delegates, and aggregates; subagents are isolated (§3.3). |
| Explicit context | Subagents inherit nothing — all context must be passed in the `Task` prompt (§3.4). |
| Hooks vs prompts | Deterministic business/financial/compliance rules → hooks; soft preferences → prompts (§3.5). |
| Least privilege | Each agent's `allowed_tools` is the minimum it needs (§3.2). |

> **Maps to Domain 1 (27%).** If you can build and defend the refund agent above — loop, delegation, context, hooks, least privilege — you have the core of the most heavily weighted exam domain.

# Chapter 4: Model Context Protocol (MCP)

> Documentation: [MCP](https://modelcontextprotocol.io/) | [Tools](https://modelcontextprotocol.io/docs/concepts/tools) | [Resources](https://modelcontextprotocol.io/docs/concepts/resources) | [Servers](https://modelcontextprotocol.io/docs/concepts/servers)

If Chapter 3 was about the *brain* of an agent — the loop, delegation, and hooks — this chapter is about its *hands and eyes*: how an agent reaches the outside world. The Model Context Protocol (MCP) is the open standard that lets Claude talk to your databases, APIs, and internal services without bespoke glue code for each one. This chapter is the backbone of **Domain 2 — Tool Design and MCP Integration (18% of the exam)**, and it directly supports **Domain 1** (an agent is only as capable as the tools you wire into it) and **Domain 5** (structured MCP errors are how multi-agent systems stay reliable).

By the end you should be able to reason about five things and assemble them into a working integration:

- **The protocol and its primitives** (§4.1) — Tools, Resources, Prompts, and the client/server split.
- **Servers and transports** (§4.2) — what a server is, and stdio vs Streamable HTTP.
- **Configuration and scope** (§4.3) — `.mcp.json` (project) vs `~/.claude.json` (user), and secret handling.
- **Structured errors** (§4.4) — the `isError` flag and why generic errors break recovery.
- **Resources** (§4.5) — read-only "maps" that eliminate exploratory tool calls.

§4.6 then builds a complete internal **Deployments MCP server** end-to-end — server, tools, resources, transport, and a permission guard — and §4.7 distills what the exam tests.

## 4.1 What is MCP

The Model Context Protocol (MCP) is an open standard for connecting external systems to Claude. The official analogy is **"USB-C for AI"**: instead of writing a custom adapter for every model–tool pairing, you implement the protocol once and any MCP-compatible client (Claude Code, the Agent SDK, the Claude apps) can use your server. Under the hood MCP is **JSON-RPC 2.0** over a transport — a small, well-specified message format, not a Claude-only API.

MCP defines three primary primitives:

1. **Tools** — functions the agent can *call to perform actions* (CRUD operations, API calls, command execution). Model-invoked: Claude decides when to use them.
2. **Resources** — data the agent can *read for context* (documentation, database schemas, content catalogs). Read-only: they inform, they don't act.
3. **Prompts** — predefined prompt templates for common tasks, surfaced to the user (e.g., as slash commands).

**The mental model is client/server.** The *host* application (Claude Code, the SDK) runs an MCP *client*; each integration is an MCP *server* — a separate process you control. The two communicate over a transport (§4.2).

```mermaid
flowchart TD
    subgraph Host[Host application e.g. Claude Code]
        Model[Claude model]
        C1[MCP client 1]
        C2[MCP client 2]
    end
    Model --> C1
    Model --> C2
    C1 -->|JSON-RPC over transport| S1[MCP server<br/>GitHub]
    C2 -->|JSON-RPC over transport| S2[MCP server<br/>internal service]
    S1 --> EXT1[GitHub API]
    S2 --> DB[(Internal DB)]
```

**Why this separation matters (and what the exam probes):** because each server is its own process behind a standard protocol, you get isolation (a crashing server doesn't take down the host), independent auth per server, and reuse across hosts. The exam frames MCP as the *integration layer* — the way you give an agent new capabilities without modifying the agent itself.

**Tools vs Resources is a recurring distinction.** A common mistake is exposing read-only data as a tool. If the agent only needs to *know* something (the list of services, a schema), that is a **Resource**. If it needs to *do* something with side effects (trigger a deploy, write a row), that is a **Tool**. Getting this wrong inflates the tool count — which, per Domain 2, directly hurts tool-selection reliability.

## 4.2 MCP Servers and Transports

An **MCP server** is a process that implements the MCP protocol and exposes tools, resources, and/or prompts. When a client connects to a server:

- All tools are **discovered automatically** at connection time (the client calls `tools/list`).
- Tools from **all connected servers are available at once** to the model.
- **Tool descriptions determine how the model will use them** — the description is the primary selection signal (Domain 2.1). A vague description means unreliable selection.

To avoid name collisions across servers, hosts namespace tools. In Claude Code a tool from a server appears as `mcp__<server>__<tool>` — e.g., the `query_status` tool on a server named `deployments` is `mcp__deployments__query_status`. You reference that exact name when allow-listing tools or forcing `tool_choice`.

### stdio vs Streamable HTTP

MCP defines **two standard transports**, and choosing between them is an architecture decision the exam expects you to make:

| | **stdio** | **Streamable HTTP** |
|---|---|---|
| Topology | Local subprocess (host launches it) | Remote service (POST request + SSE stream) |
| Best for | Local tools, dev, single-user, filesystem/CLI access | Shared team servers, hosted SaaS integrations |
| Auth | Environment-based credentials (env vars) | OAuth 2.0 |
| Lifecycle | Host spawns/kills the process | Long-running service you deploy and operate |

```mermaid
flowchart TD
    H[Host: Claude Code or SDK] --> D{Where does the<br/>server run?}
    D -->|same machine, per-user| STDIO[stdio transport<br/>spawn local subprocess<br/>env-var credentials]
    D -->|shared, remote service| HTTP[Streamable HTTP<br/>POST plus SSE<br/>OAuth 2.0]
    STDIO --> R[Tools and resources<br/>exposed to the model]
    HTTP --> R
```

**Pitfalls and exam angles:**

- **The old SSE-only transport is deprecated.** If a question offers "SSE transport" as the modern remote option, the current answer is **Streamable HTTP** (POST + SSE). Don't pick legacy SSE.
- **Match the transport to the auth model.** A shared team server holding privileged credentials should be **Streamable HTTP with OAuth**, not a stdio server where each user pastes a token. Conversely, a personal local filesystem tool is **stdio with env vars** — standing up an OAuth service for it is over-engineering.
- **A server is not "Claude code."** It's a generic process. The same `deployments` server can serve Claude Code, the Agent SDK, and the Claude desktop app simultaneously — that reuse is the point of the standard.

For *remote* servers there is also the **MCP connector** in the Messages API: Claude can call a remote MCP server directly, server-side, with no local client — you pass an `mcp_servers` entry plus a matching `mcp_toolset` in `tools`. That is the API-level counterpart to a Claude Code HTTP server; the transport story (HTTP + OAuth) is the same.

## 4.3 Configuring MCP Servers

Where you register a server determines **who can use it** — this scope decision is squarely tested in Domain 2.4.

**Project configuration (`.mcp.json`)** — for team usage:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "jira": {
      "command": "npx",
      "args": ["-y", "mcp-server-jira"],
      "env": {
        "JIRA_TOKEN": "${JIRA_TOKEN}"
      }
    }
  }
}
```

**Key points:**
- `.mcp.json` is stored at the **project root and managed in version control**, so every contributor gets the same servers on checkout.
- **Environment variables (`${GITHUB_TOKEN}`) are used for secrets** — the variable *reference* is committed, the token itself is not. This is the central secret-management pattern: never hard-code a token into `.mcp.json`.
- Available to all project contributors.

**User configuration (`~/.claude.json`)** — for personal/experimental servers:
- Stored in the user's home directory.
- **Not shared via version control.**
- Suitable for personal experiments and testing.

```mermaid
flowchart TD
    Q{Who should get<br/>this server?}
    Q -->|whole team, reproducible| PROJ[.mcp.json at project root<br/>committed to git<br/>env-var token refs]
    Q -->|just me, experimental| USER[~/.claude.json<br/>home directory<br/>not in version control]
    PROJ --> TEAM[All contributors get it<br/>on checkout]
    USER --> SOLO[Only this developer]
```

**Adding servers from the CLI.** In Claude Code you don't have to hand-edit JSON: `claude mcp add` / `claude mcp list` / `claude mcp remove` manage servers, and `--scope user` vs `--scope project` selects which file is written. For HTTP servers needing OAuth, run `/mcp` in-session to authorize. This is the exam-correct answer to "how does each developer get the same server without each editing config by hand": put it in **project `.mcp.json`**, committed once.

**Choosing servers:**
- For **standard integrations (Jira, GitHub, Slack), prefer existing community MCP servers** — they're maintained and battle-tested.
- **Build your own server only for unique, team-specific workflows** that no community server covers (this is exactly the §4.6 case study).

**Context cost — MCP tool search.** Every connected server's tools are loaded into context, and a dozen servers can flood the model with hundreds of tools — bloating context and *degrading* selection (Domain 2.3: too many tools reduces reliability). Claude Code's **MCP tool search** mitigates this by lazily loading tools on demand instead of front-loading all of them, and organizations can ship an org-wide `managed-mcp.json`. The takeaway: connecting a server is not free; tool count is a budget.

## 4.4 The `isError` Flag in MCP

When an MCP tool encounters an error, it sets **`isError: true`** in the response. This signals to the agent that the call failed — but *signaling failure is not enough*. The agent's next move (retry? change the query? escalate? give up?) depends entirely on **what kind** of failure it was. This is the heart of Domain 2.2 and a reliability concern for Domain 5.

**Structured error (good):**

```json
{
  "isError": true,
  "content": {
    "errorCategory": "transient",
    "isRetryable": true,
    "message": "The service is temporarily unavailable. Timeout while calling the orders API.",
    "attempted_query": "order_id=12345",
    "partial_results": null
  }
}
```

**Generic error (anti-pattern):**

```json
{
  "isError": true,
  "content": "Operation failed"
}
```

A generic error gives the agent no information for decision-making — should it retry, change the query, or escalate? The structured version tells it precisely.

**Error categories the exam expects you to distinguish:**

| Category | Meaning | Retryable? | Right agent response |
|---|---|---|---|
| `transient` | Timeout, service briefly down | **Yes** | Retry (ideally with backoff) |
| `validation` | Bad input (malformed id, missing field) | No | Fix the arguments, then retry |
| `business` | Policy/rule violation (e.g., over a limit) | **No** | Stop and explain to the user; do not retry the same call |
| `permission` | Caller lacks access | No | Escalate / request access — distinct from "no results" |

```mermaid
flowchart TD
    E[Tool returns isError true] --> CAT{errorCategory?}
    CAT -->|transient| RETRY[Retry with backoff]
    CAT -->|validation| FIX[Correct the arguments<br/>then retry]
    CAT -->|business| STOP[Stop and explain<br/>do not retry]
    CAT -->|permission| ESC[Escalate or request access]
    RETRY --> OK[Resolve locally if possible]
    FIX --> OK
```

**Pitfalls and exam angles:**

- **Use `isRetryable: false` for business-rule violations** with a clear, user-facing explanation. Marking a policy failure retryable sends the agent into a pointless retry loop.
- **An empty result is not an error.** A search that legitimately found nothing should return `isError: false` with an empty result set — *not* `isError: true`. Conflating "no matches" with "access failed" makes the agent escalate when it should simply report "none found" (Domain 2.2).
- **Recover locally, propagate selectively.** A subagent should resolve transient failures itself (retry) and only propagate errors it genuinely can't resolve up to the coordinator — this keeps error noise out of the hub-and-spoke system (Domain 5.3).

## 4.5 MCP Resources

**Resources** are data an agent can request to gain context **without taking action**. Where a tool *does*, a resource *informs*:

- Content catalogs (e.g., a list of all project tasks, hierarchical navigation).
- Database schemas (understanding data structure before querying).
- Documentation (API references, internal guides).
- Issue/task summaries.

**Resource advantage:** the agent does **not** need exploratory tool calls to discover what data exists. A resource provides an immediate **"map."** Without it, an agent might burn three or four tool calls (and the tokens and latency they cost) just to learn the shape of the system before doing any real work.

```mermaid
flowchart TD
    subgraph Without[Without a resource]
        A1[Agent guesses] --> A2[Tool call: list X]
        A2 --> A3[Tool call: describe X]
        A3 --> A4[Tool call: find Y]
        A4 --> A5[Finally act]
    end
    subgraph With[With a catalog resource]
        B1[Read resource: the map] --> B2[Act directly]
    end
```

**Pitfalls and exam angles:**

- **Don't model read-only context as a tool.** If the agent only needs to *read* the service catalog, expose it as a **Resource**, not a `list_services` tool. This keeps the tool count down (helping selection) and signals intent correctly.
- **Resources cut exploratory tool calls**, which is the phrasing the exam uses — they trade many round-trips for one up-front read. That is both a context-management win (Domain 5) and a tool-design win (Domain 2).
- Resources are **read-only by definition** — they never have side effects. If you find yourself wanting a resource to "also update" something, you actually want a tool.

## 4.6 End-to-End Case Study: An Internal "Deployments" MCP Server

The pieces above only matter when they fit together. Here is a complete, realistic MCP server — the kind of *unique, team-specific* integration §4.3 says you should build yourself, and exactly the design the exam's MCP-integration scenarios probe.

### Requirements

A platform team wants Claude Code to help during incident response. The agent must be able to:

- **See the service catalog** — every service, its owner, and its current version — without exploratory calls.
- **Query a service's deployment status** (read-only).
- **Trigger a rollback** of a service to its previous version (an *action* with real consequences).
- **Hard rule:** a rollback of a **production** service must be **denied at the protocol level** unless the caller holds an explicit `prod-rollback` grant — never left to model discretion.
- Return **structured errors** so the agent recovers correctly (retry a flaky status check, but never retry a denied prod rollback).
- Run locally over **stdio** for an on-call engineer, and the same server runs as a shared **Streamable HTTP** service (OAuth) for the team.

### Architecture

```mermaid
flowchart TD
    User([On-call engineer]) --> CC[Claude Code host]
    CC -->|JSON-RPC over stdio or HTTP| Srv[Deployments MCP server]
    Srv --> Res[[Resource: service-catalog<br/>read-only map]]
    Srv --> T1[Tool: query_status<br/>read-only]
    Srv --> T2[Tool: trigger_rollback<br/>action]
    T2 --> Guard{prod and no grant?}
    Guard -->|yes| Deny[Return isError<br/>permission, not retryable]
    Guard -->|no| Exec[Execute rollback]
    T1 --> DEP[(Deployment system)]
    Exec --> DEP
```

The **catalog is a Resource** (read-only context, no exploratory calls); **status and rollback are Tools** (status reads, rollback acts); the **production guard lives in the server**, not in a prompt — so it holds regardless of which host or model connects.

### Implementation

A minimal server using the Python MCP SDK. The catalog is a resource; status and rollback are tools; the prod guard returns a **structured permission error**.

```python
from mcp.server import Server
from mcp.types import Tool, Resource, TextContent
import mcp.server.stdio

app = Server("deployments")

# --- Resource: the service catalog (read-only "map") ---
@app.list_resources()
async def list_resources() -> list[Resource]:
    return [Resource(
        uri="catalog://services",
        name="Service catalog",
        description="All services, owners, and current versions.",
        mimeType="application/json",
    )]

@app.read_resource()
async def read_resource(uri: str) -> str:
    # Returns the catalog JSON: [{service, owner, env, version}, ...]
    return get_service_catalog_json()

# --- Tools ---
@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(name="query_status",
             description="Read the current deployment status of one service. Read-only.",
             inputSchema={"type": "object",
                          "properties": {"service": {"type": "string"}},
                          "required": ["service"]}),
        Tool(name="trigger_rollback",
             description="Roll a service back to its previous version. Mutating action.",
             inputSchema={"type": "object",
                          "properties": {"service": {"type": "string"}},
                          "required": ["service"]}),
    ]

@app.call_tool()
async def call_tool(name: str, args: dict) -> list[TextContent]:
    if name == "query_status":
        try:
            status = deployment_api.status(args["service"])
        except TimeoutError:
            return error("transient", retryable=True,
                         message="Deployment API timed out; safe to retry.")
        return ok(status)

    if name == "trigger_rollback":
        svc = catalog.get(args["service"])
        # The production guard — code, not a prompt. The model cannot bypass it.
        if svc.env == "production" and not caller_has_grant("prod-rollback"):
            return error("permission", retryable=False,
                         message="Production rollback denied: 'prod-rollback' grant required.")
        result = deployment_api.rollback(args["service"])
        return ok(result)
```

The structured-error helpers keep every failure machine-readable (§4.4):

```python
def error(category, retryable, message):
    payload = {"errorCategory": category, "isRetryable": retryable, "message": message}
    return [TextContent(type="text", text=json.dumps(payload))]  # isError set on the response
```

Run it over **stdio** locally:

```python
async def main():
    async with mcp.server.stdio.stdio_server() as (read, write):
        await app.run(read, write, app.create_initialization_options())
```

Register it as a **project** server so the whole team gets it on checkout (§4.3) — stdio for local use, with a shared HTTP+OAuth deployment for the team:

```json
{
  "mcpServers": {
    "deployments": {
      "command": "python",
      "args": ["-m", "deployments_server"],
      "env": { "DEPLOY_API_TOKEN": "${DEPLOY_API_TOKEN}" }
    }
  }
}
```

In Claude Code the tools now appear as `mcp__deployments__query_status` and `mcp__deployments__trigger_rollback`, and the catalog as a readable resource.

### Execution trace

An on-call engineer asks Claude Code to roll back a production service they're not authorized for:

```mermaid
sequenceDiagram
    actor Eng as On-call engineer
    participant CC as Claude Code
    participant S as Deployments server
    participant G as Prod guard
    Eng->>CC: "Roll back checkout-api, it's erroring"
    CC->>S: read resource catalog://services
    S-->>CC: checkout-api is env production
    CC->>S: call trigger_rollback(checkout-api)
    S->>G: production and no prod-rollback grant?
    G-->>S: deny
    S-->>CC: isError permission, not retryable
    CC-->>Eng: "Blocked: production rollback needs the prod-rollback grant. Escalating."
```

Notice Claude *intended* to roll back directly; the **server's guard denied it deterministically**, and because the error was categorized `permission` / not-retryable, the agent escalated instead of looping. A prompt instruction ("don't roll back prod without approval") would comply only ~90% of the time — not good enough for production.

### Validation

- **Permission test:** call `trigger_rollback` on a production service without the grant 100 times; assert 100 structured `permission` errors and zero rollbacks. The guard must be 100%, like the §3.5 money rule.
- **Error-category test:** simulate a `query_status` timeout and assert `transient` / `retryable: true`; simulate a denied prod rollback and assert `permission` / `retryable: false`. The agent should retry the first and never retry the second.
- **Resource-vs-tool test:** confirm the catalog is reachable via `read_resource` (no tool call) — proving the agent gets its "map" without exploratory calls (§4.5).
- **Empty-vs-error test:** querying a non-existent service should be a clean "not found" result, not `isError: true` (§4.4).

### Common pitfalls

- Putting the production-rollback rule in the system prompt instead of the **server guard** (probabilistic, not guaranteed — see §3.5 and §4.4).
- Exposing the catalog as a `list_services` **tool** instead of a **Resource**, inflating the tool count and forcing exploratory calls (§4.5).
- Returning `"Operation failed"` instead of a categorized error, so the agent can't tell a retryable timeout from a hard denial (§4.4).
- Hard-coding `DEPLOY_API_TOKEN` into `.mcp.json` instead of using a `${...}` env reference (§4.3).
- Choosing legacy **SSE** for the shared remote deployment instead of **Streamable HTTP** (§4.2).

## 4.7 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Primitives | Tools *act*, Resources *inform* (read-only), Prompts are templates; MCP is an open JSON-RPC standard, "USB-C for AI" (§4.1). |
| Client/server | The host runs a client; each integration is a separate server process — isolation and reuse across hosts (§4.1). |
| Transports | **stdio** (local subprocess, env-var auth) vs **Streamable HTTP** (remote, OAuth); legacy SSE-only is deprecated (§4.2). |
| Scope & secrets | `.mcp.json` (project, committed, team) vs `~/.claude.json` (user); `${VAR}` for tokens — never commit the secret (§4.3). |
| Tool count | All connected servers' tools load at once; too many degrades selection — MCP tool search loads lazily (§4.2–4.3). |
| Structured errors | `isError` + `errorCategory`/`isRetryable`; transient→retry, business/permission→stop; empty ≠ error (§4.4). |
| Resources | Read-only "maps" that eliminate exploratory tool calls; don't model read-only context as a tool (§4.5). |

> **Maps to Domain 2 (18%)**, with direct support for Domain 1 (tools are an agent's capabilities) and Domain 5 (structured errors keep multi-agent systems reliable). If you can build and defend the Deployments server above — primitives, transport, scope, the server-side guard, and categorized errors — you have the core of the MCP-integration domain.

# Chapter 5: Claude Code — Configuration and Workflows

> Documentation: [Claude Code](https://code.claude.com/docs/en/overview) | [Memory / CLAUDE.md](https://code.claude.com/docs/en/memory) | [Skills](https://code.claude.com/docs/en/skills) | [MCP](https://code.claude.com/docs/en/mcp) | [Hooks](https://code.claude.com/docs/en/hooks) | [Sub-agents](https://code.claude.com/docs/en/sub-agents) | [Settings](https://code.claude.com/docs/en/settings) | [GitHub Actions](https://code.claude.com/docs/en/github-actions) | [Headless](https://code.claude.com/docs/en/headless)

Chapters 3 and 4 built agents *programmatically* — the loop, subagents, hooks, and MCP as code you write. **Claude Code is the same machinery delivered as a tool you configure**, not a library you call. The skill the exam tests here is **configuration**: putting the right instruction in the right file, scoping rules so they load only when relevant, gating dangerous tools deterministically, and wiring Claude Code into a team's CI. This chapter is the backbone of **Domain 3 — Claude Code Configuration and Workflows (20% of the exam)** — the second-largest domain after agent orchestration.

By the end you should be able to reason about six pillars and assemble them into a team-ready setup:

- **The CLAUDE.md hierarchy** (§5.1–5.3) — where instructions live, how `@path` imports modularize them, and how `.claude/rules/` loads conventions *conditionally*.
- **Reusable workflows** (§5.4–5.5) — custom slash commands and Skills, including `context: fork` isolation and `allowed-tools` restriction.
- **Settings, permissions, and hooks** (§5.6) — `settings.json` precedence, per-tool allow/ask/deny, and lifecycle hooks for deterministic enforcement.
- **Planning vs direct execution** (§5.7) — when to investigate-then-approve and when to just do it.
- **Context and session management** (§5.8, §5.10) — `/compact`, `/memory`, `--resume`, and `fork_session`.
- **CI/CD integration** (§5.9) — headless `-p`, structured JSON output, and review-session isolation.

§5.11 then assembles a complete **team-onboarding configuration** end-to-end — hierarchy, rules, a skill, an MCP server, a permission hook, and CI — and §5.12 distills what the exam tests.

## 5.1 The CLAUDE.md Hierarchy

CLAUDE.md is the instruction file(s) Claude Code loads automatically at startup and injects as context for every turn. There is a three-level hierarchy, and **all applicable levels are merged**, not overridden:

```
1. User-level: ~/.claude/CLAUDE.md
   - Applies only to that user, on that machine
   - NOT shared via VCS
   - Personal preferences and working style (e.g., "explain in Chinese")

2. Project-level: .claude/CLAUDE.md or a root CLAUDE.md
   - Applies to all project contributors
   - Managed via VCS (committed, reviewed, shared)
   - Coding standards, testing standards, architectural decisions

3. Directory-level: CLAUDE.md in subdirectories
   - Applies when working with files in that directory (loaded on demand)
   - Conventions specific to that part of the codebase
```

**Why a hierarchy at all.** The three levels separate three audiences with three lifecycles: *you* (personal, never shared), *the team* (versioned, reviewed like code), and *a subtree* (local conventions that would be noise everywhere else). Putting an instruction at the wrong level is the single most common Claude Code misconfiguration the exam probes.

```mermaid
flowchart TD
    Start[Claude Code starts a turn] --> U[Load user CLAUDE.md<br/>personal preferences]
    U --> P[Load project CLAUDE.md<br/>team standards]
    P --> Q{Editing a file in<br/>a subdirectory?}
    Q -->|yes| D[Also load that<br/>directory CLAUDE.md]
    Q -->|no| Skip[Skip directory level]
    D --> Merge[Merge all levels<br/>into the context]
    Skip --> Merge
    Merge --> Run[Claude acts with<br/>combined instructions]
```

**Common mistake (exam-favorite):** a new team member does not receive the project's standards because someone placed them in `~/.claude/CLAUDE.md` (user-level, never committed) instead of `.claude/CLAUDE.md` (project-level, in VCS). The diagnostic question to memorize: *"would a fresh `git clone` on a teammate's laptop see this instruction?"* If it must, it belongs at the **project** level. If it's a personal habit that shouldn't be imposed on others, it belongs at the **user** level.

**Exam angle:** distinguish *who* each level serves. Personal style → user. Team contract → project (committed). Subtree-only convention that would be noise elsewhere → directory.

## 5.2 `@path` Syntax (File Imports)

A large CLAUDE.md becomes hard to review and duplicates content across packages. CLAUDE.md can reference external files using `@path`, making configuration modular:

```markdown
# Project CLAUDE.md

Coding standards are described in @./standards/coding-style.md
Test requirements are in @./standards/testing-requirements.md
Project overview is in @README.md and dependencies are in @package.json
```

**Rules for `@path`:**
- Use `@` immediately before the file path (no space).
- Relative and absolute paths are supported.
- Relative paths are resolved relative to the file that contains the import.
- Maximum import nesting depth is 5 (an imported file may itself import, up to five levels).

**Why this matters.** Imports give you one canonical source per standard. A monorepo can keep `standards/testing.md` once and have each package's CLAUDE.md pull in only the standards it actually needs — the `web/` package imports the React rules, the `api/` package imports the service rules, neither carries the other's noise. It also lets you reuse existing project files as context (`@README.md`, `@package.json`) instead of paraphrasing them into CLAUDE.md, where the paraphrase drifts out of date.

**Pitfalls:** a space after `@` breaks the import (it becomes literal text); a relative path is resolved from the *importing file's* directory, not the repo root, so moving a CLAUDE.md can silently break its imports; and the depth-5 limit means deeply chained imports can be cut off without an obvious error.

**Exam angle:** when a question asks how to avoid duplicating the same testing standard across ten packages, the answer is `@path` imports to a single shared file — not copy-paste, and not one giant root CLAUDE.md.

## 5.3 The `.claude/rules/` Directory

`.claude/rules/` is an alternative to a monolithic CLAUDE.md, used to organize rules by topic:

```
.claude/rules/
  testing.md          -- testing conventions
  api-conventions.md  -- API conventions
  deployment.md       -- deployment rules
  react-patterns.md   -- React patterns
```

**Key feature: YAML frontmatter with `paths` for conditional loading:**

```yaml
---
paths: ["src/api/**/*"]
---

For API files, use async/await with explicit error handling.
Each endpoint must return a standard response wrapper.
```

```yaml
---
paths: ["**/*.test.tsx", "**/*.test.ts"]
---

Tests must use describe/it blocks.
Use data factories instead of hardcoding.
Do not mock the database—use a test database.
```

**How it works:**
- A rule is loaded **only** when Claude Code touches a file matching the `paths` glob.
- This saves context and tokens — irrelevant rules are never loaded, so the model's window stays focused on what it's editing.
- Glob patterns let you apply conventions by *file type* regardless of *location* (ideal for tests scattered across the codebase).

**Why conditional loading beats one big file.** Every line of CLAUDE.md is paid for on *every* turn, whether or not it's relevant. A 600-line monolith spends context describing Terraform conventions while you're editing CSS. Path-scoped rules invert this: the Terraform rule is invisible until you open a `.tf` file, then it appears exactly when it can help. This is the same "load only what's relevant" principle behind MCP resources (Chapter 4) and tool-search — context is a budget, and rules let you spend it on demand.

**When to use `.claude/rules/` with `paths` vs directory-level CLAUDE.md:**
- `.claude/rules/` with `paths` — when conventions apply to files **spread across many directories** (tests, migrations, `*.tf`). A glob like `**/*.test.ts` catches them all regardless of where they live.
- Directory-level CLAUDE.md — when conventions are **tied to one specific directory** and not needed elsewhere.

**Pitfall:** writing a directory-level CLAUDE.md for tests when test files live in dozens of folders — you'd have to copy it into each. The glob rule is the maintainable choice. Conversely, a glob rule for something that only ever applies to one folder is over-engineering; a directory CLAUDE.md is simpler.

**Exam angle:** "conventions span many directories by file type" → path-scoped rule with a glob. "Convention belongs to one folder" → directory CLAUDE.md.

## 5.4 Custom Slash Commands and Skills

> **Note:** in the current Claude Code version, custom commands (`.claude/commands/`) are unified with skills (`.claude/skills/`). Both formats create `/name` commands. The exam guide references `.claude/commands/` — that format is still supported.

Slash commands are **reusable prompt templates** invoked via `/name`. Instead of re-typing "review this diff for security issues, check the OWASP top 10, and report inline," you save it once and invoke `/review`.

**`.claude/commands/` format (legacy, supported):**

```
.claude/commands/
  review.md        -- /review -- standard code review
  test-gen.md      -- /test-gen -- test generation
```

**`.claude/skills/` format (current):**

```
.claude/skills/
  review/SKILL.md  -- /review -- with frontmatter configuration
  test-gen/SKILL.md
```

**Project commands** (`.claude/commands/` or `.claude/skills/`):
- Stored in VCS and available to everyone when they clone the repo.
- Ensure **consistent workflows** across the team — every developer's `/review` does the same thing.

**User commands** (`~/.claude/commands/` or `~/.claude/skills/`):
- Personal commands not shared via VCS.
- For individual workflows you don't want to impose on teammates.

**Why this is a configuration concern, not just convenience.** A slash command turns an *ad-hoc instruction* into a *versioned artifact*. Once `/review` lives in the repo, the review prompt is reviewed like any other code, improves over time, and can't drift between engineers. That is exactly the team-consistency property the exam rewards.

**Exam angle:** "everyone on the team should run the same review/test workflow" → project command in `.claude/` (committed). "My personal shortcut" → user command in `~/.claude/`.

## 5.5 Skills — `.claude/skills/`

Skills are advanced commands configured via SKILL.md frontmatter — the upgrade path from a plain prompt template to a *governed* one:

```yaml
---
context: fork
allowed-tools: ["Read", "Grep", "Glob"]
argument-hint: "Path to the directory to analyze"
---

Analyze the code structure in the specified directory.
Output a report on dependencies and architectural patterns.
```

**Frontmatter parameters:**

| Parameter | Description |
|---|---|
| `context: fork` | Runs the skill in an **isolated subagent**. Its verbose output does not pollute the main session — only the final result returns (the same isolation as the Agent SDK's `Task`, §3.4). |
| `allowed-tools` | Restricts which tools are available. Security boundary: a read-only analysis skill given only `["Read","Grep","Glob"]` *cannot* write or delete files even if the prompt is manipulated. |
| `argument-hint` | Hint shown when the command is invoked without parameters, prompting the user for the required argument. |

**Why `context: fork` is the headline feature.** An analysis skill might read 40 files and print pages of output. In the main session that buries your working context; forked, the noise is contained and you get back a one-paragraph summary. This is the Skill-level equivalent of the Explore subagent (§5.7) — context isolation as a first-class, declarative setting.

**Why `allowed-tools` is a real security control.** It is the least-privilege principle (§3.2) applied to a workflow: the *capabilities* are fixed in the frontmatter, in code, not negotiated in the prompt. A skill that can only read is safe to run on untrusted input because no prompt can grant it write access it was never given.

**When to use a skill vs CLAUDE.md:**
- **Skill** — *on-demand* invocation for a specific task (review, analysis, generation). You run it when you want it.
- **CLAUDE.md** — *always-loaded* general standards and conventions. It applies to every turn whether you ask or not.

**Personal skills (`~/.claude/skills/`):** create personal variants under different names so you don't affect teammates.

**Pitfall:** putting a heavyweight, occasional task (a full architecture audit) into CLAUDE.md so it's "always available" — that wastes context on every turn. The audit belongs in a `context: fork` skill you invoke when needed.

**Exam angle:** "isolate a verbose skill's output from the main session" → `context: fork`. "Stop a skill from deleting files" → `allowed-tools`. "Run a task only when asked" → skill, not CLAUDE.md.

## 5.6 Settings, Permissions, and Hooks

Instructions tell the model what to *do*; **`settings.json` and permissions control what it is *allowed* to do**, and **hooks make some rules deterministic**. This is where Claude Code stops being a polite assistant and becomes a governed tool — the exam treats it as the safety layer.

**`settings.json` precedence.** Settings come from three files, applied in increasing priority:

```
1. User settings:    ~/.claude/settings.json        (your machine, all projects)
2. Project settings: .claude/settings.json          (committed, shared with the team)
3. Local overrides:  .claude/settings.local.json     (per-developer, git-ignored)
```

A higher-priority file overrides the same key in a lower one. The pattern to remember: **commit `.claude/settings.json` for the team contract; keep personal tweaks in `.claude/settings.local.json` (git-ignored) so they don't leak into the shared config.**

**Permissions: per-tool allow / ask / deny.** Permissions live in `settings.json` and gate individual tools and even tool arguments:

```json
{
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Bash(npm test:*)"],
    "ask":   ["Edit", "Write"],
    "deny":  ["Bash(rm -rf:*)", "Bash(git push:*)"]
  }
}
```

- **allow** — runs without prompting (safe, frequent operations, e.g. running tests).
- **ask** — prompts for confirmation before each use (human-in-the-loop for edits).
- **deny** — blocked outright; the model cannot run it regardless of what it decides.

`deny` wins over `allow`. A `deny` on `git push` means *no* prompt can talk Claude Code into pushing — it's not a strong suggestion, it's a wall.

**Hooks: deterministic lifecycle enforcement.** Hooks are shell commands the harness runs at lifecycle events — `PreToolUse`, `PostToolUse`, session start/end, and compaction. The same hooks you wrote in the Agent SDK (§3.5) exist in Claude Code, configured in `settings.json`. A `PreToolUse` hook can inspect a tool call and **block** it (non-zero exit) before it runs:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/block-secrets.sh" }
        ]
      }
    ]
  }
}
```

The script receives the tool call on stdin; if it detects, say, a command that would read `.env` or push to `main`, it exits non-zero and the action is refused — **deterministically, in code, not at the model's discretion.**

**Hooks/permissions vs prompt instructions (the recurring exam theme).**

| Mechanism | Guarantee | Use for |
|---|---|---|
| **`deny` permission / `PreToolUse` hook** | **Deterministic (100%)** | "never push to main", "never delete the database", "block secret exfiltration" |
| **CLAUDE.md instruction** | **Probabilistic (>90%, not 100%)** | "prefer small commits", "explain reasoning", "ask before large refactors" |

**Rule (identical to §3.5):** when a violation has financial, legal, security, or safety consequences, enforce it with a `deny` permission or a hook — *not* a sentence in CLAUDE.md. A model following a prompt is right most of the time; a `deny` rule is right every time.

**Pitfall:** writing "Claude must never run `git push --force`" in CLAUDE.md and believing it's enforced. It isn't — it's a strong nudge. The guarantee lives in `permissions.deny` or a `PreToolUse` hook.

**Exam angle:** any "guarantee this dangerous action can't happen" → permissions/hook (deterministic). Any "encourage this good habit" → CLAUDE.md (probabilistic). Personal vs shared settings → `settings.local.json` (git-ignored) vs committed `settings.json`.

## 5.7 Planning Mode vs Direct Execution

**Planning mode:**
- The model only investigates and plans; it does **not** make changes.
- Uses Read, Grep, Glob to explore the codebase.
- Produces an implementation plan that the user approves before any edit.
- Safe exploration with **no side effects**.

**When to use planning mode:**
- Large changes (dozens of files).
- Multiple plausible approaches (microservices: how to define boundaries?).
- Architectural decisions (which framework? what structure?).
- An unfamiliar codebase (you must understand before changing).
- Library migrations affecting 45+ files.

**When to use direct execution:**
- Single-file fixes with a clear stack trace.
- Adding one validation check.
- Well-understood, unambiguous changes.

```mermaid
flowchart TD
    Task[Incoming task] --> Q1{Many files or<br/>architectural impact?}
    Q1 -->|yes| Plan[Planning mode<br/>investigate, no edits]
    Q1 -->|no| Q2{Clear, single-file,<br/>unambiguous fix?}
    Q2 -->|yes| Direct[Direct execution<br/>make the change now]
    Q2 -->|no| Plan
    Plan --> Approve{User approves<br/>the plan?}
    Approve -->|yes| Direct
    Approve -->|no| Plan
    Direct --> Done[Change applied]
```

**Why the distinction matters.** Direct execution on a sprawling, ambiguous change risks dozens of edits in the wrong direction that are expensive to unwind. Planning mode front-loads the cost into a *cheap, reversible* artifact — a written plan you can correct in one sentence before a single file is touched. Conversely, forcing a plan-and-approve cycle onto a one-line typo fix is pure overhead.

**Combined approach (the exam-preferred answer):**
1. Planning mode for investigation and design.
2. User approves the plan.
3. Direct execution to implement the approved plan.

**Explore subagent** — a specialized subagent for exploring the codebase:
- Isolates verbose discovery output from the main context.
- Returns only a summary.
- Prevents context-window exhaustion in multi-phase tasks (the same context-isolation idea as `context: fork`, §5.5).

**Pitfall:** running a 45-file migration in direct execution and discovering halfway that the approach was wrong. Plan first, approve, then execute.

**Exam angle:** large/ambiguous/architectural → planning mode; small/clear/single-file → direct execution; "explore a big codebase without blowing the context window" → Explore subagent.

## 5.8 The `/compact` and `/memory` Commands

These two built-ins manage context *within* and *across* sessions.

**`/compact` — compress the current context.**
- Summarizes prior history to free up the context window.
- Used in long investigation sessions when the window fills with verbose tool output.
- **Risk:** exact numeric values, dates, and specific details can be lost during summarization. If you'll need the precise figure later, record it (in `/memory` or a note) *before* compacting.

**`/memory` — persist context across sessions.**
- Opens the `CLAUDE.md` file for editing, letting you save notes, preferences, and context.
- Information persists across sessions and is automatically loaded on startup.
- Useful for storing project conventions, user preferences, frequently used commands, and current work context.
- An alternative to re-explaining the same instructions in every session.

**Why both exist.** `/compact` fights the *single-session* limit — the window is finite, and verbose tool output eats it. `/memory` fights the *cross-session* limit — a new session starts blank, so anything worth keeping must be written to CLAUDE.md. One reclaims space now; the other carries knowledge forward.

**Pitfall:** compacting away a value you still need. Compaction is lossy by design — treat anything not in CLAUDE.md or written down as potentially gone after `/compact`.

**Exam angle:** "context window is full mid-investigation" → `/compact` (and beware lost specifics). "Stop re-explaining conventions every session" → `/memory` → CLAUDE.md.

## 5.9 Claude Code CLI for CI/CD

**The `-p` (or `--print`) flag:**

```bash
claude -p "Analyze this pull request for security issues"
```

- Non-interactive (headless) mode: processes the prompt, prints to stdout, exits.
- Does **not** wait for user input — so it never hangs a pipeline.
- The only correct way to run Claude Code in CI/CD.

**Structured output for CI:**

```bash
claude -p "Review this PR" --output-format json --json-schema '{"type":"object",...}'
```

- `--output-format json` — emit JSON instead of prose.
- `--json-schema` — validate the output against a schema, so downstream steps get a predictable shape.
- The result can be parsed by the pipeline to automatically post inline PR comments.

**Why headless mode is non-negotiable in CI.** Interactive Claude Code waits for a human; a CI runner has none, so an interactive invocation blocks until it times out. `-p` runs once and exits with the result on stdout — the contract a build step needs. Pair it with CLAUDE.md committed in the repo so the CI run inherits the team's testing standards and review criteria automatically.

**Session context isolation (subtle but tested).** The same Claude session that *generated* code is less effective at *reviewing* it — it retains its own reasoning and is less likely to challenge its own decisions. **Use an independent instance for review**, not the one that wrote the code. (This mirrors §5.10: a fresh perspective beats a primed one.)

**Preventing duplicate comments.** When re-reviewing after new commits, include the prior review results in context and instruct Claude to report only **new or unresolved** issues — otherwise every run re-posts the same findings.

**Exam angle:** "run Claude in a pipeline" → `-p` (never interactive). "Machine-parseable result for auto-commenting" → `--output-format json` + `--json-schema`. "Why not reuse the generating session to review?" → it won't challenge its own work; use a fresh instance.

## 5.10 `fork_session` and Session Management

**`--resume <session-name>`** resumes a named session:

```bash
claude --resume investigation-auth-bug
```

- Continues a prior conversation with its saved context.
- Useful for long investigations spanning multiple sessions.
- **Risk:** if files changed since the prior session, cached tool results may be stale — Claude reasons over an outdated snapshot.

**`fork_session`** creates an independent branch from shared context:

```mermaid
flowchart TD
    Base[Codebase investigation<br/>shared context] --> Fork[fork_session]
    Fork --> A[Approach A<br/>Redux]
    Fork --> B[Approach B<br/>Context API]
    A --> CompareA[Evaluate trade-offs A]
    B --> CompareB[Evaluate trade-offs B]
    CompareA --> Pick[Compare and choose]
    CompareB --> Pick
```

- Both forks inherit context up to the branch point, then diverge independently.
- Useful for comparing approaches or testing strategies without one polluting the other.

**Why forking beats one linear session for comparisons.** If you explore Redux then Context API in the *same* thread, the Redux discussion biases the Context API analysis — the model has already committed to a frame. Forking gives each approach the *same starting context but a clean slate after it*, so the comparison is fair. It's the session-level version of the "independent reviewer" principle in §5.9.

**When to start a new session instead of resuming:**
- Tool results are stale (files changed since last time).
- A lot of time has passed and the context has degraded.
- It is often better to restart with "Here is a short summary of what we found: ..." than to resume a session full of outdated tool data.

**Pitfall:** `--resume`-ing a week-old session after a big refactor and trusting its cached file reads. Those reads describe the old code. Prefer a fresh session seeded with a summary.

**Exam angle:** "compare two approaches fairly" → `fork_session`. "continue a long investigation" → `--resume` (watch for staleness). "files changed a lot since" → start fresh with a summary, don't resume.

## 5.11 End-to-End Case Study: Onboarding a Team onto Claude Code

The features above only matter assembled. Here is a complete, realistic Claude Code configuration for a team — the kind of setup the exam's **"configure Claude Code for team development"** scenario asks you to reason about (and Practical Exercise 2 asks you to build).

### Requirements

A 6-developer team wants every member to get **identical, governed** Claude Code behavior the moment they `git clone`:

- **Universal standards** (commit style, language) applied on every turn.
- **API and test conventions** that load **only** when editing API or test files — no context wasted otherwise.
- A shared **`/audit` workflow** that analyzes architecture but must run read-only and isolated, so its verbose output doesn't bury the main session.
- A shared **GitHub MCP server** for PR search — same tooling for everyone, **no committed credentials** (each dev's token is personal).
- A **hard guarantee**: Claude Code may **never** run `git push --force` or read secret files, regardless of prompt.
- **CI** that runs Claude Code headless to review PRs and post inline comments.

### Architecture

```mermaid
flowchart TD
    Clone[Developer git clones repo] --> Proj[Project .claude committed]
    Proj --> CM[CLAUDE.md<br/>universal standards]
    Proj --> Rules[.claude/rules<br/>path-scoped api and test rules]
    Proj --> Skill[.claude/skills/audit<br/>context fork, read-only tools]
    Proj --> MCP[.mcp.json<br/>GitHub server, token from env]
    Proj --> Settings[.claude/settings.json<br/>deny force-push and secrets]
    Settings --> Hook{{PreToolUse hook<br/>block dangerous Bash}}
    MCP --> Local[.claude.json user override<br/>personal GitHub token]
    Proj --> CI[CI runs claude -p<br/>review PR, post comments]
```

Project `.claude/` is the **team contract** (committed); each developer adds only their **personal token** in a git-ignored override; `settings.json` + the hook make the dangerous-command rule **deterministic**, not a prompt.

### Implementation

**Project standards** — `CLAUDE.md` (always loaded), with a modular import:

```markdown
# Project CLAUDE.md
Use Conventional Commits (feat/fix/chore). Keep commits small.
Detailed test policy: @./standards/testing.md
```

**Path-scoped conventions** — load only on matching files:

```yaml
# .claude/rules/api.md
---
paths: ["src/api/**/*"]
---
Use async/await with explicit error handling; return the standard response wrapper.
```

```yaml
# .claude/rules/tests.md
---
paths: ["**/*.test.ts", "**/*.test.tsx"]
---
Use describe/it blocks and data factories. Do not mock the database; use a test DB.
```

**Isolated, read-only audit skill** — verbose output stays out of the main session:

```yaml
# .claude/skills/audit/SKILL.md
---
context: fork
allowed-tools: ["Read", "Grep", "Glob"]
argument-hint: "Path to the package to audit"
---
Audit the package's dependency graph and architectural patterns. Output a short report.
```

**Shared MCP server, no committed secret** — token comes from the environment:

```json
// .mcp.json  (committed)
{
  "mcpServers": {
    "github": {
      "command": "github-mcp-server",
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    }
  }
}
```

Each developer sets `GITHUB_TOKEN` in their own environment (or a personal `~/.claude.json` override) — the repo stays credential-free.

**Deterministic guardrail** — `settings.json` denies the dangerous commands outright, and a `PreToolUse` hook adds a programmatic check:

```json
// .claude/settings.json  (committed)
{
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Bash(npm test:*)"],
    "ask":   ["Edit", "Write"],
    "deny":  ["Bash(git push --force:*)", "Read(.env)", "Read(**/secrets/**)"]
  },
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{ "type": "command", "command": ".claude/hooks/guard.sh" }] }
    ]
  }
}
```

**CI review (headless)** — runs a *fresh* instance, not the one that wrote the code:

```bash
claude -p "Review this PR. Report only new or unresolved issues." \
  --output-format json --json-schema "$SCHEMA" > review.json
# pipeline parses review.json and posts inline PR comments
```

### Execution trace

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant CC as Claude Code
    participant R as Path rules
    participant Pre as PreToolUse hook
    participant GH as GitHub MCP server
    Dev->>CC: open src/api/orders.ts, "add an endpoint"
    CC->>R: file matches src/api/**
    R-->>CC: load api.md rule only
    CC->>GH: search related PRs (token from env)
    GH-->>CC: matching PRs
    CC->>Pre: Bash(git push --force)
    Pre-->>CC: non-zero exit, blocked
    CC-->>Dev: refused force-push; standards applied
```

The api rule loaded **only** because the file matched its glob; the force-push was blocked by the **hook/permission deterministically**, not by hoping the model read CLAUDE.md.

### Validation

- **Hierarchy test:** a teammate clones the repo and immediately gets the commit-style and API rules — proving they're at the **project** level, not someone's `~/.claude/`.
- **Conditional-load test:** confirm `api.md` loads when editing `src/api/x.ts` and is **absent** when editing `web/Button.css` — proving the `paths` glob scopes it.
- **Determinism test:** attempt `git push --force` 100 times; assert 100 blocks. A CLAUDE.md sentence would leak; the `deny`/hook must be 100%.
- **No-secret test:** grep the repo for tokens — `.mcp.json` must contain `${GITHUB_TOKEN}`, never a real key.
- **Isolation test:** run `/audit`; confirm its file-by-file output does **not** appear in the main transcript and that it cannot write files.

### Common pitfalls

- Putting team standards in `~/.claude/CLAUDE.md` so a fresh clone never sees them (§5.1).
- A monolithic CLAUDE.md that always loads Terraform/API/test rules, wasting context — use path-scoped `.claude/rules/` (§5.3).
- Writing "never force-push" in CLAUDE.md and assuming it's enforced — it's probabilistic; use `permissions.deny`/a hook (§5.6).
- Committing the GitHub token into `.mcp.json` instead of `${GITHUB_TOKEN}` + a git-ignored personal override (§5.6, Chapter 4).
- Reviewing a PR with the **same** session that generated it, or in interactive mode inside CI — use a fresh `claude -p` instance (§5.9).

## 5.12 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| CLAUDE.md hierarchy | Team standards → project (committed); personal style → user (`~/.claude/`); subtree-only → directory. "Would a fresh clone see it?" (§5.1). |
| `@path` imports | Avoid duplicating a standard across packages by importing one shared file (no space after `@`, depth ≤ 5) (§5.2). |
| Path-scoped rules | Conventions spanning many directories by file type → `.claude/rules/` with a `paths` glob; one-folder convention → directory CLAUDE.md (§5.3). |
| Slash commands / Skills | Shared workflow → project command (committed); `context: fork` isolates verbose output; `allowed-tools` enforces least privilege (§5.4–5.5). |
| Settings, permissions, hooks | Deterministic guarantees ("never push to main", "block secrets") → `permissions.deny`/`PreToolUse` hook, **not** CLAUDE.md; `settings.local.json` for personal, git-ignored tweaks (§5.6). |
| Planning vs direct execution | Large/ambiguous/architectural → planning mode then approve; small/clear/single-file → direct execution; big codebase → Explore subagent (§5.7). |
| Context & sessions | `/compact` reclaims a full window (lossy); `/memory` persists across sessions; `fork_session` compares approaches fairly; beware stale `--resume` (§5.8, §5.10). |
| CI/CD | Headless `-p` (never interactive); `--output-format json` + `--json-schema` for auto-comments; review with a **fresh** instance (§5.9). |

> **Maps to Domain 3 (20%).** If you can stand up the team configuration above — hierarchy, path-scoped rules, an isolated least-privilege skill, a credential-free MCP server, deterministic permission/hook guardrails, and a headless CI review — you have the core of the second-most-weighted exam domain.

# Chapter 6: Prompt Engineering — Advanced Techniques

> Documentation: [Prompt Engineering](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook)

Prompt engineering is the discipline of shaping a model's behavior **without changing its weights** — using only the words, structure, and examples you put into the request. This chapter is the backbone of **Domain 4 — Prompt Engineering and Structured Output (20% of the exam)**, the joint-second-heaviest domain. The exam does not test clever phrasing; it tests whether you reach for the *right technique* for a given failure mode and whether you know each technique's guarantees and limits. By the end you should be able to choose and combine these tools:

- **Few-shot prompting** (§6.1) — demonstrate the behavior instead of describing it.
- **Explicit criteria** (§6.2) — replace vague adjectives with categorical rules.
- **XML tags and role prompting** (§6.3) — separate instructions from data, and set the model's persona.
- **Chain-of-thought and extended thinking** (§6.4) — let the model reason before it answers.
- **Prefilling the assistant turn** (§6.5) — constrain the *start* of the response to force a shape.
- **Structured output with `tool_use`** (§6.6) — guarantee schema-valid JSON, not just plausible JSON.
- **Prompt chaining and the interview pattern** (§6.7) — decompose a task across focused calls.
- **Validation and retry-with-feedback** (§6.8) — close the loop when extraction fails.
- **Self-correction** (§6.9) — make the model surface its own contradictions.

§6.10 then builds a complete **contract-extraction service** end-to-end, combining most of these techniques, and §6.11 distills what the exam tests.

A useful mental model is to match each technique to the failure it fixes:

```mermaid
flowchart TD
    Start[Output is wrong or inconsistent] --> Q1{What kind of failure?}
    Q1 -->|Inconsistent format or<br/>handles edge cases badly| FS[Add few-shot examples<br/>section 6.1]
    Q1 -->|Too many false positives,<br/>vague judgement| EC[Write explicit criteria<br/>section 6.2]
    Q1 -->|Model confuses instructions<br/>with input data| XML[Wrap data in XML tags<br/>section 6.3]
    Q1 -->|Skips reasoning on<br/>hard multi-step tasks| COT[Chain-of-thought or<br/>extended thinking 6.4]
    Q1 -->|Adds preamble or<br/>wrong opening shape| PF[Prefill the assistant turn<br/>section 6.5]
    Q1 -->|Malformed or<br/>non-schema JSON| TU[Use tool_use schema<br/>section 6.6]
    Q1 -->|Schema-valid but<br/>values are wrong| VR[Validate and retry<br/>section 6.8]
```

The exam angle on the whole chapter: know that prompt techniques are **probabilistic** (they raise the odds of correct behavior), whereas `tool_use` schemas and downstream validation are the **deterministic** layers. Syntax can be guaranteed; semantics must be checked.

## 6.1 Few-shot Prompting

Few-shot prompting is the inclusion of 2–4 input/output examples in a prompt to demonstrate the expected behavior. It is, per Domain 4, *the single most effective method* for producing consistently formatted, actionable output.

**Why few-shot is more effective than textual descriptions:**
- A vague instruction like "be more precise" can be interpreted in many ways.
- An example unambiguously shows the expected format and decision logic.
- The model generalizes the pattern to new cases (it does not just repeat the examples).
- Examples *reduce hallucination* in extraction tasks, because they anchor the model to a concrete shape rather than letting it invent fields.

**Why it works (mechanism):** an example simultaneously encodes the output *schema*, the *tone*, and the *decision boundary* in one artifact. A prose rule encodes only what you remembered to write down; an example also encodes everything you left implicit (key ordering, null handling, how to phrase a fix). This is why one good example often beats three paragraphs of instructions.

**Types of few-shot examples and when to use them:**

1. **Examples for ambiguous scenarios** — show the *decision*, not just the format:

```
Request: "My order is broken"
Action: Call get_customer -> lookup_order -> check status.
Rationale: "broken" may mean a damaged item; you need order details.

Request: "Get me a manager"
Action: Immediately call escalate_to_human.
Rationale: The customer explicitly requests a human. Do not attempt to solve autonomously.
```

2. **Examples for output formatting:**

```
Finding example:
{
  "location": "src/auth/login.ts:42",
  "issue": "SQL injection in the username parameter",
  "severity": "critical",
  "suggested_fix": "Use a parameterized query"
}
```

3. **Examples to separate acceptable vs problematic code** — teach the *boundary* between a true issue and a false positive:

```
// Acceptable (do not flag):
const items = data.filter(x => x.active);

// Problem (flag):
const items = data.filter(x => x.active == true); // Use strict equality ===
```

4. **Examples for extraction from different document formats** — one example per structure you expect to see:

```
Document with inline citations:
"As shown in the study (Smith, 2023), the rate is 42%."
-> {"value": "42%", "source": "Smith, 2023", "type": "inline_citation"}

Document with bibliography references:
"The rate is 42%. [1]"
-> {"value": "42%", "source": "reference_1", "type": "bibliography"}
```

5. **Examples for informal measurements** — where rules cannot enumerate every phrasing:

```
Text: "about two handfuls of rice"
-> {"amount": "~100g", "original_text": "two handfuls", "precision": "approximate"}

Text: "a pinch of salt"
-> {"amount": "~1g", "original_text": "a pinch", "precision": "approximate"}
```

Few-shot is especially effective for extracting informal and non-standard measurement units that are too diverse for purely rule-based instructions.

**Format normalization rules in prompts:** when using strict JSON schemas for structured output, add normalization rules in the prompt so the *values* (not just the syntax) are consistent:

```
Normalization:
- Dates: always ISO 8601 (YYYY-MM-DD); "yesterday" -> compute an absolute date
- Currency: numeric amount + currency code; "five bucks" -> {"amount": 5, "currency": "USD"}
- Percentages: decimal fraction; "half" -> 0.5
```

This prevents semantic errors where the JSON is syntactically valid but values are inconsistent — exactly the gap `tool_use` cannot close on its own (§6.6).

**Pitfalls:**
- **Biased example set.** If all your examples are the "flag it" case, the model over-flags. Always include *negative* examples (what *not* to do) when teaching a boundary.
- **Examples that contradict your instructions.** When prose and examples disagree, the model tends to follow the examples — so the example is the real spec. Keep them aligned.
- **Overfitting the wording.** If every example phrases a fix as "Use a parameterized query," the model may echo that exact phrase. Vary surface form when you want generalization, not mimicry.

**Exam angle:** if a question describes *inconsistent formatting* or *poor handling of ambiguous/edge cases*, the intended answer is almost always "add 2–4 targeted few-shot examples with rationale" — not "write a longer instruction."

## 6.2 Explicit Criteria vs Vague Instructions

The single highest-leverage fix for a *judgement* task (review, triage, classification) is to replace adjectives with enumerated, falsifiable rules.

**Bad (vague):**

```
Check code comments for accuracy.
Be conservative—report only high-confidence findings.
```

"Conservative" and "high-confidence" are not operational; two runs will draw the line differently, and you cannot debug "the model wasn't conservative enough."

**Good (explicit criteria)** — list both what to flag *and* what to ignore:

```
Flag a comment as problematic ONLY if:
1. The comment describes behavior that CONTRADICTS the actual code behavior
2. The comment references a non-existent function or variable
3. A TODO/FIXME comment refers to a bug that has already been fixed in code

Do NOT flag:
- Comments that are merely stylistically outdated
- Comments with minor wording inaccuracies
- Missing comments (that is a separate category)
```

**Define severity criteria with examples** — pair each level with a concrete case so the model calibrates, not guesses:

```
CRITICAL: Runtime failure for users
  Example: NullPointerException while processing a payment

HIGH: Security vulnerability
  Example: SQL injection, XSS, missing authorization checks

MEDIUM: Logic bug without immediate impact
  Example: Wrong sorting, off-by-one error

LOW: Code quality
  Example: Duplication, suboptimal algorithm for small data
```

**Why this matters — the false-positive trust problem:** a high false-positive rate in *one* category undermines developer trust in *every* category. If the "style" checks cry wolf, engineers start ignoring the "security" checks too. The remedy is not "be more conservative" (vague) but to (a) write categorical criteria and (b) *temporarily disable* a category whose false-positive rate is too high, rather than degrading the whole reviewer.

**Pitfalls:**
- Stacking soft hedges ("be careful," "use judgement") — they add tokens, not precision.
- Defining what to flag but never what to ignore — the model fills the silence by over-reporting.
- Severity levels with no examples — the labels drift run-to-run.

**Exam angle:** when a scenario reports *too many false positives* or *eroded trust*, the correct lever is explicit categorical criteria (and disabling noisy categories), **not** a generic "be more conservative" instruction. This distinction is called out verbatim in Domain 4.

## 6.3 XML Tags and Role Prompting

These two structural techniques are about *where* information sits and *who* the model is being.

### Delimiting with XML tags

Claude is specifically tuned to respect XML-style tags. Wrapping each part of a prompt in named tags lets the model tell instructions apart from data, and lets you reference parts by name.

```
You are reviewing a contract. The contract text is in <contract>.
Your task instructions are in <instructions>. Output only the <result>.

<instructions>
Extract the parties, effective date, and termination clause.
</instructions>

<contract>
{{ untrusted_document_text }}
</contract>
```

**Why it works:**
- **Instruction/data separation.** Without delimiters, a document that itself contains the words "ignore the above and summarize" can hijack the task. Tags make the boundary explicit and are a *first-line mitigation for prompt injection* (the data lives in `<contract>`, the authority lives in `<instructions>`).
- **Referability.** You can write "quote the relevant sentence from `<contract>` in your `<result>`," which improves grounding and makes outputs auditable.
- **Composability.** Tagged sections are easy to template, cache (a stable `<instructions>` block caches well; see Chapter 18), and recombine.

### Role prompting (system prompt persona)

Assigning a role in the **system prompt** sets the model's perspective, vocabulary, and default standards.

```python
response = client.messages.create(
    model="claude-...",
    system="You are a senior contracts attorney. You are precise, "
           "cite the exact clause you rely on, and you never guess "
           "at a value that is not present in the document.",
    messages=[{"role": "user", "content": prompt}],
)
```

**Why it works:** a persona is a compact way to pull in a whole bundle of expectations (a "contracts attorney" implies precision, clause citation, and caution about absent data) without listing each rule. It also shifts *defaults* — the same question answered "as an attorney" vs "as a friendly assistant" differs in rigor and hedging.

**System vs user content (exam-relevant):** put *durable* role, rules, and output contract in `system`; put the *specific* task and data in the `user` turn. This separation is what makes prompt caching effective and keeps the contract stable across requests.

**Pitfalls:**
- Treating a role as a *guarantee*. "You are a strict validator" makes the model *act* stricter; it does not enforce anything. Real enforcement is `tool_use` schemas (§6.6) and code-side validation (§6.8) — the same probabilistic-vs-deterministic line as hooks-vs-prompts in Chapter 3.
- Over-specifying a persona until it crowds out the task. The role should be a few sentences, not a biography.

**Exam angle:** XML tags = "separate instructions from untrusted data + reduce injection risk"; role prompting = "set expertise and standards in the *system* prompt." Both are probabilistic quality levers, not security boundaries.

## 6.4 Chain-of-Thought and Extended Thinking

For multi-step reasoning (math, multi-clause logic, reconciling figures), letting the model *think before it answers* materially improves accuracy.

**Two ways to get reasoning:**

1. **Prompted chain-of-thought (CoT)** — instruct the model to reason step by step, ideally into a *named scratchpad* so you can separate thinking from the answer:

```
Think step by step inside <scratchpad>...</scratchpad>.
Then give only the final JSON inside <answer>...</answer>.
```

2. **Extended thinking** — a model capability (enabled with a `thinking` budget) where the model produces internal reasoning before its final response. You allocate a token budget for thinking; the model uses it for harder problems and the visible answer follows.

**Why it helps:** reasoning tokens give the model "room to work." A model forced to emit the answer immediately must compute multi-step results in a single forward pass; a model allowed to lay out intermediate steps can catch its own arithmetic and logic errors before committing to an answer. This is the same reason §6.9 self-correction works.

**Choosing between them:**

| | Prompted CoT (`<scratchpad>`) | Extended thinking |
|---|---|---|
| Control | You shape the steps in the prompt | Model manages its own reasoning within a budget |
| Output hygiene | You must strip the scratchpad before using the answer | Thinking is delivered as a separate block, not mixed into the answer |
| Best for | Light reasoning, when you want to *steer* the steps | Hard, open-ended reasoning where depth matters |

**Pitfalls:**
- **Leaking the scratchpad into output.** If you ask for both reasoning and JSON in one blob and then `json.loads` the whole thing, it breaks. Put reasoning in `<scratchpad>` / a thinking block and the result in `<answer>`, and parse only the answer.
- **Forcing CoT where it is pure overhead.** Trivial extraction does not need a scratchpad; you pay latency and tokens for nothing.
- **Pairing thinking with prefill incorrectly.** Prefilling the assistant turn (§6.5) constrains the start of the *response*; do not use it to try to suppress or fake the thinking block.

**Exam angle:** know that reasoning (prompted CoT *or* extended thinking) is the lever for *accuracy on hard multi-step tasks*, and that the reasoning trace must be **separated** from the machine-consumed output.

## 6.5 Prefilling the Assistant Turn

You can seed the **beginning** of Claude's response by supplying an `assistant` message in the request. The model continues *from* your prefill, which constrains the shape of what follows.

```python
messages = [
    {"role": "user", "content": "Extract the invoice as JSON."},
    {"role": "assistant", "content": "{"},   # <- prefill forces JSON, skips preamble
]
```

**What prefilling buys you:**
- **Skip the preamble.** Without it the model may open with "Sure! Here is the JSON:"; prefilling `{` forces it straight into the object.
- **Lock the format.** Prefill `[` to force a JSON array, or prefill an opening tag like `<result>` to force tagged output.
- **Steer persona/decision.** Prefilling "As an attorney, my assessment is" nudges tone and stance for the continuation.

**Why it works:** the model only ever predicts the *next* token given everything so far — including the assistant text you provided. By writing the first token(s) of the answer, you remove the model's freedom to choose a different opening, which is often where format drift starts.

**Pitfalls:**
- **The prefill is not echoed back.** The API response continues *after* your prefill, so reconstruct the full value as `prefill + response` (e.g. `"{" + completion`) before parsing.
- **Trailing whitespace.** A prefill that ends in a space or newline can degrade output; end it on a meaningful token (e.g. `{` not `{ `).
- **Prefill is a shaping tool, not a schema guarantee.** It biases the opening; it does not validate the rest. For hard guarantees, combine with `tool_use` (§6.6) and validation (§6.8).

**Exam angle:** prefilling = "constrain the response by writing its first tokens" — classic uses are *forcing JSON/array output* and *removing conversational preamble*. Remember to prepend the prefill when reading the result.

## 6.6 Structured Output with `tool_use` and JSON Schemas

When you need machine-readable output, the most reliable mechanism is **`tool_use` with a JSON Schema** — not "ask for JSON and hope."

**Why `tool_use` beats free-text JSON:** the tool's `input_schema` constrains generation so the model emits arguments that conform to the schema. This **eliminates JSON syntax errors** (unbalanced braces, trailing commas, smart quotes) and guarantees the *shape* — the field names, types, and required keys you declared.

```python
extract_invoice = {
    "name": "extract_invoice",
    "description": "Return structured fields from an invoice.",
    "input_schema": {
        "type": "object",
        "properties": {
            "vendor": {"type": "string"},
            "total":  {"type": "number"},
            "currency": {"type": "string", "enum": ["USD", "EUR", "GBP"]},
            "line_items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name":  {"type": "string"},
                        "price": {"type": "number"}
                    },
                    "required": ["name", "price"]
                }
            },
            "confidence": {"type": "string", "enum": ["high", "medium", "unclear"]}
        },
        "required": ["vendor", "total", "currency", "line_items"]
    }
}
```

**Controlling whether a tool is called — `tool_choice`:**

| `tool_choice` | Behavior | Use when |
|---|---|---|
| `"auto"` (default) | Model may answer in text *or* call a tool | Conversational agents that sometimes just reply |
| `"any"` | Model **must** call *some* tool | You always want structured output and have several schemas |
| `{"type": "tool", "name": "extract_invoice"}` | Force *this* tool | You want exactly one schema every time (extraction) |

```mermaid
flowchart TD
    Req[Send request with input_schema] --> Choice{tool_choice?}
    Choice -->|auto| MayText[Model may return text<br/>or call a tool]
    Choice -->|any| MustTool[Model must call some tool]
    Choice -->|forced name| OneTool[Model must call the named tool]
    MustTool --> Parse[Read tool_use.input as the object]
    OneTool --> Parse
    Parse --> Valid{Passes code-side<br/>validation?}
    Valid -->|yes| Done[Use the data]
    Valid -->|no| Retry[Retry with the error<br/>section 6.8]
```

**Schema design that the exam rewards:**
- **`required` vs optional.** Make a field optional/nullable when the source *may not contain* it — otherwise the model fabricates a value to satisfy the schema. "Don't make me invent data" is a recurring exam theme.
- **Enums with an escape hatch.** Use a closed enum for known categories, plus an `"other"` / `"unclear"` value **and** a free-text detail field, so new cases are captured rather than mis-bucketed (extensible categorization).
- **Single source of truth.** Generating the schema from a model (e.g. Pydantic → JSON Schema, §6.8) keeps the tool definition and your validator in sync.

**The hard limit — `tool_use` guarantees syntax, not semantics.** A schema cannot know that `total` should equal `sum(line_items)`, or that `currency` matches the symbol in the document. *Syntactically valid, semantically wrong* output is the failure mode §6.8 and §6.9 exist to catch.

**Pitfalls:**
- Assuming schema-valid means correct. It only means *well-shaped*.
- Over-constraining with `required` so the model invents values for missing fields.
- Using `tool_choice: "auto"` when you *always* need structure (the model may answer in prose). Use `"any"` or a forced name.

**Exam angle:** "guarantee schema-conformant output / eliminate JSON syntax errors" → **`tool_use` + JSON Schema**. "Always structured, multiple schemas" → `tool_choice: "any"`. "Exactly one extraction schema" → forced tool. "Don't fabricate missing data" → optional/nullable fields. "Catch wrong totals" → that is validation, not the schema.

## 6.7 Prompt Chaining and the Interview Pattern

### Prompt chaining

Prompt chaining breaks a complex task into a sequence of focused steps, each consuming the previous step's output:

```
Step 1: Analyze auth.ts (local issues only)
       -> Output: list of issues in auth.ts

Step 2: Analyze database.ts (local issues only)
       -> Output: list of issues in database.ts

Step 3: Integration pass (cross-file dependencies)
       -> Output: issues at module boundaries
```

**Why this matters:**
- Avoids **attention dilution** — when the model receives too many files at once, it may miss bugs in some files while giving shallow commentary on others.
- Ensures consistent analysis quality per file.
- Allows separate analysis of cross-file interactions in a dedicated integration pass.

**Chaining vs dynamic decomposition:**
- **Prompt chaining** — predictable, repeatable tasks with a *known* shape (code review, file migrations). You design the steps up front.
- **Dynamic decomposition** — open-ended investigations where the subtasks become clear only *during* execution; here a coordinator agent decides steps at runtime (Chapter 3).

### The "interview" pattern

Before implementing a solution, Claude asks clarifying questions instead of guessing at requirements:

```
Claude: "Before implementing caching for the API, a few questions:
1. Which cache invalidation strategy do you prefer—TTL or event-based?
2. Is stale data acceptable when the cache is unavailable?
3. Should caching be per-user or global?
4. What is the expected data volume to cache?"
```

**When this is useful:**
- Unfamiliar domain (fintech, healthcare, legal systems).
- Tasks with non-obvious implications (cache strategies, failure modes).
- Multiple viable approaches where the best choice depends on context.

**Pitfalls:** chaining adds latency and cost (N calls instead of one) — use it when attention dilution or per-step quality justifies it, not reflexively. The interview pattern is wrong for high-volume autonomous extraction (you cannot stop to ask 10,000 times); reserve it for design-time and ambiguous one-offs.

**Exam angle:** "model misses bugs across many files / shallow per-file output" → chaining with a per-file pass plus an integration pass. "Predictable pipeline" → chaining; "subtasks emerge at runtime" → dynamic decomposition.

## 6.8 Validation and Retry-with-Feedback

`tool_use` removes syntax errors; **validation** is how you catch the *semantic* ones, and **retry-with-feedback** is how you recover.

When extracted data fails validation, retry with the error spelled out:

```
Step 1: Extract data from the document
Step 2: Validate (Pydantic, JSON Schema, business rules)
Step 3: If there's an error—retry with context:
  - The original document
  - The previous (incorrect) extraction
  - The specific error: "Field 'total' = 150, but sum(line_items) = 145. Re-check values."
```

The retry prompt must carry **all three**: the source, the bad output, and the *concrete* error. A vague "that was wrong, try again" gives the model nothing to correct.

**When retry will be effective:**
- Format errors (date in the wrong format).
- Structural errors (a field placed in the wrong location).
- Arithmetic inconsistencies (the model can re-check its own sums).

**When retry will NOT help:**
- The information is simply **absent** from the source document — re-prompting cannot conjure data that isn't there.
- The required context is **external** (the value lives in another document you didn't provide). Retrying just burns calls; the fix is to supply the missing source or mark the field unknown.

**Pydantic as a validation tool** (the exam's canonical example):
- **Structural validation:** types, requiredness, enum constraints, checked in code *after* receiving JSON from Claude.
- **Semantic validation:** custom validators enforce business logic (`sum(line_items) == total`; `start_date < end_date`).
- **Validate–retry loops:** on a validation failure, construct an error message and re-prompt Claude with that error context.
- **JSON Schema generation:** Pydantic models can emit JSON Schema for `tool_use`, giving a **single source of truth** for both the tool definition and the validator.

**Pitfalls:**
- Retrying when the data is absent/external (infinite-loop trap). Bound retries (e.g. max 2) and then route to a human or a null result.
- Omitting the specific error from the retry prompt (no signal to fix).
- Treating Pydantic success as full correctness — it only checks the rules you wrote.

**Exam angle:** "JSON is valid but the totals don't reconcile" → semantic validation + retry-with-error. "Retry isn't fixing it" → the info is absent or external; stop retrying. "Single source of truth for schema + validation" → Pydantic generating the JSON Schema.

## 6.9 Self-correction

Self-correction makes the model **surface its own contradictions** by extracting *both* a stated value and an independently computed value, then flagging any mismatch:

```json
{
  "stated_total": "$150.00",
  "calculated_total": "$145.00",
  "conflict_detected": true,
  "line_items": [
    {"name": "Widget A", "price": 75.00},
    {"name": "Widget B", "price": 70.00}
  ]
}
```

The model extracts the value *as written* (`stated_total`) and the value it *computes* from the parts (`calculated_total`); when they differ, `conflict_detected` lets downstream code route the discrepancy to review instead of silently trusting a wrong figure.

**Why it works:** it converts an invisible reasoning step into an *observable field*. Instead of hoping the model noticed the document's own arithmetic error, you ask it to write down both numbers, and the disagreement becomes data you can act on. It pairs naturally with chain-of-thought (§6.4) — the model reasons out the calculated value before emitting it.

**Self-correction vs independent review (link to Domain 4.6):** a model is poor at challenging its *own* conclusions because it retains its generation context. Self-correction (one instance, two values) catches *internal* arithmetic/consistency errors cheaply; for *subtle* issues, a **second independent Claude instance** reviewing without the generation context is stronger. Use self-correction for in-line consistency checks and an independent reviewer for deeper audits.

**Pitfalls:**
- Trusting `stated_total` alone — that is the number you most want to verify.
- Asking one instance to "double-check your work" and expecting rigor; without a fresh context it tends to ratify itself. Use the two-value pattern or a separate instance.

**Exam angle:** "detect that the document's stated total doesn't match its line items" → extract `stated` *and* `calculated` + a `conflict_detected` flag. "Find subtle issues the author missed" → an independent review instance, not self-review.

## 6.10 End-to-End Case Study: A Contract-Extraction Service

The techniques above only matter when they combine. Here is a complete, realistic service that turns messy uploaded contracts into validated structured data — the kind of design Domain 4 asks you to reason about. It exercises **role prompting, XML tags, few-shot, chain-of-thought, `tool_use` schemas, prefilling, validation/retry, and self-correction** in one pipeline.

### Requirements

- Accept heterogeneous contract documents (different vendors, layouts, citation styles).
- Extract a fixed structure: `parties`, `effective_date`, `total_value`, `currency`, `line_items`, `termination_notice_days`.
- **Never fabricate** a value that is not in the document — missing fields must come back as `null`, not invented.
- Output must be **schema-valid JSON** suitable for direct insertion into a database (no syntax errors, no preamble).
- Catch the common real-world defect where the document's *stated* total disagrees with the **sum of its line items**, and route those to human review instead of trusting them.
- High volume and unattended — no interview/clarification loop at runtime.

### Architecture

Two layers: a **probabilistic** extraction layer (prompt techniques) and a **deterministic** validation layer (code), with a bounded retry between them.

```mermaid
flowchart TD
    Doc([Uploaded contract]) --> Build[Build prompt<br/>role + XML tags + few-shot]
    Build --> Call[Call Claude<br/>thinking on + forced extract tool]
    Call --> Pre[Prefill assistant turn<br/>open brace]
    Pre --> Json[tool_use.input<br/>structured JSON]
    Json --> Schema{Schema valid?<br/>Pydantic structure}
    Schema -->|no| RetryA[Retry with error]
    Schema -->|yes| Sem{Semantics OK?<br/>stated equals sum}
    Sem -->|conflict| Review([Human review queue])
    Sem -->|absent or external| RetryB[Retry once then null]
    Sem -->|ok| Store([Write to database])
    RetryA -. bounded retry .-> Call
    RetryB -. bounded retry .-> Call
```

The model owns extraction; **code — not prompt text — owns the guarantees** (schema conformance, the stated-vs-sum check, the retry bound). This is the same probabilistic-vs-deterministic split the exam tests in Chapter 3, applied to structured output.

### Implementation

**1) Role + XML tags + few-shot in the prompt**, with normalization rules so values are consistent:

```python
SYSTEM = (
    "You are a senior contracts attorney. You are precise, you cite only "
    "values present in the document, and you NEVER guess a value that is "
    "absent — you return null for it."
)

FEWSHOT = """
<example>
<contract>Term: 90 days written notice. Fee: USD 12,000.</contract>
<result>{"termination_notice_days": 90, "total_value": 12000, "currency": "USD"}</result>
</example>
<example>
<contract>This agreement may be ended by either party.</contract>
<result>{"termination_notice_days": null, "total_value": null, "currency": null}</result>
</example>
"""

NORMALIZE = """
Normalization: dates as ISO 8601 (YYYY-MM-DD); currency as amount + ISO code;
notice periods as an integer number of days. If a field is not stated, use null.
"""

def build_prompt(doc_text: str) -> str:
    return (
        f"{NORMALIZE}\n"
        f"Examples:\n{FEWSHOT}\n"
        "Think step by step inside <scratchpad>, reconcile the stated total "
        "against the sum of line items, then call extract_contract.\n"
        f"<contract>\n{doc_text}\n</contract>"
    )
```

Note the **negative example** (a contract with no notice period → `null` fields): it teaches the model *not to fabricate*, which the requirements demand.

**2) Force the extraction schema with `tool_use`** (syntax guarantee) and let the model reason first:

```python
extract_contract = {
    "name": "extract_contract",
    "input_schema": {
        "type": "object",
        "properties": {
            "parties": {"type": "array", "items": {"type": "string"}},
            "effective_date": {"type": ["string", "null"]},
            "stated_total": {"type": ["number", "null"]},
            "calculated_total": {"type": ["number", "null"]},
            "currency": {"type": ["string", "null"], "enum": ["USD", "EUR", "GBP", None]},
            "line_items": {
                "type": "array",
                "items": {"type": "object",
                          "properties": {"name": {"type": "string"},
                                         "price": {"type": "number"}},
                          "required": ["name", "price"]}
            },
            "termination_notice_days": {"type": ["integer", "null"]},
            "conflict_detected": {"type": "boolean"}
        },
        "required": ["parties", "line_items", "conflict_detected"]
    }
}

resp = client.messages.create(
    model="claude-...",
    system=SYSTEM,
    thinking={"type": "enabled", "budget_tokens": 1024},   # CoT for reconciliation
    tools=[extract_contract],
    tool_choice={"type": "tool", "name": "extract_contract"},  # forced -> always structured
    messages=[{"role": "user", "content": build_prompt(doc_text)}],
)
data = next(b.input for b in resp.content if b.type == "tool_use")
```

The schema makes nullable fields explicit (`["number", "null"]`) so absent data returns `null` instead of a fabricated number, and it captures **both** `stated_total` and `calculated_total` for self-correction (§6.9).

> When extracting *free-text* JSON instead of a tool (e.g. a quick non-tool path), prefill the assistant turn with `{` to force the object and drop any "Here is the JSON" preamble — then parse `"{" + completion`.

**3) Deterministic validation + bounded retry-with-feedback** (the guarantees live here, not in the prompt):

```python
from pydantic import BaseModel, model_validator

class Contract(BaseModel):
    stated_total: float | None
    calculated_total: float | None
    conflict_detected: bool
    # ... other fields ...

    @model_validator(mode="after")
    def totals_must_reconcile(self):
        s, c = self.stated_total, self.calculated_total
        if s is not None and c is not None and abs(s - c) > 0.01:
            # semantic error tool_use cannot catch
            object.__setattr__(self, "conflict_detected", True)
        return self

def extract(doc_text, max_retries=2):
    err = None
    for _ in range(max_retries + 1):
        data = call_claude(doc_text, prior_error=err)   # passes the error into the prompt
        try:
            c = Contract(**data)
        except ValidationError as e:
            err = str(e)                                 # structural error -> retry with it
            continue
        if c.conflict_detected:
            route_to_human_review(c); return c           # stated != sum -> review, don't trust
        return c                                          # clean -> store
    return None                                           # give up after bound (absent/external)
```

### Execution trace

A contract whose stated total ($150) disagrees with its line items ($145):

```mermaid
sequenceDiagram
    actor Up as Uploader
    participant Svc as Extraction service
    participant Cl as Claude
    participant Val as Pydantic validator
    participant Hu as Review queue
    Up->>Svc: contract.pdf text
    Svc->>Cl: prompt (role + XML + few-shot, forced tool, thinking on)
    Cl->>Cl: scratchpad: sum line items = 145, stated = 150
    Cl-->>Svc: tool_use {stated 150, calculated 145, conflict_detected true}
    Svc->>Val: validate structure and semantics
    Val-->>Svc: schema OK, conflict_detected stays true
    Svc->>Hu: route case for human review
    Hu-->>Up: "Total mismatch flagged for confirmation"
```

The model did the arithmetic *in the scratchpad* (chain-of-thought), wrote down both totals (self-correction), the schema guaranteed the JSON parsed (`tool_use`), and **code** — not a prompt instruction — made the route-to-human decision. No single technique would have caught this alone.

### Validation

- **No-fabrication test:** feed a contract missing the notice period; assert `termination_notice_days is None` (the negative few-shot example + nullable schema must hold).
- **Syntax test:** run 1,000 documents through the forced tool; assert *zero* `json` parse failures (this is what `tool_use` guarantees).
- **Semantic test:** feed a contract where stated ≠ sum; assert it lands in the **review queue**, not the database.
- **Retry-bound test:** feed a contract missing data that is only in an external annex; assert it stops after `max_retries` and returns `null` rather than looping forever.

### Common pitfalls

- Trusting `tool_use` to catch the total mismatch — it guarantees *syntax*, not *semantics*; the reconciliation must be code (§6.6, §6.8).
- Making every field `required`, so the model fabricates a notice period or currency to satisfy the schema (§6.6).
- Retrying forever when the data is absent or in an unprovided annex — bound the retries (§6.8).
- Putting the "stated must equal sum" rule only in the prompt and hoping — it is a deterministic check, so it belongs in a validator (§6.8), mirroring hooks-vs-prompts from Chapter 3.
- Mixing the `<scratchpad>` reasoning into the JSON you parse — keep reasoning (thinking block / scratchpad) separate from the machine-read output (§6.4).

## 6.11 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Few-shot prompting | Most effective fix for inconsistent format / ambiguous edge cases; 2–4 examples with rationale, include negative examples (§6.1). |
| Explicit criteria | Replace "be conservative" with enumerated flag/ignore rules + severity examples; disable noisy categories rather than degrading the whole reviewer (§6.2). |
| XML tags / role | Tags separate instructions from untrusted data (injection mitigation); role lives in the *system* prompt — both probabilistic (§6.3). |
| CoT / extended thinking | The lever for accuracy on hard multi-step tasks; keep the reasoning trace separate from the parsed output (§6.4). |
| Prefilling | Constrain the response by writing its first tokens (force JSON/array, drop preamble); prepend the prefill when reading the result (§6.5). |
| `tool_use` + JSON Schema | Guarantees schema-valid syntax, **not** semantics; `tool_choice` `auto` vs `any` vs forced; nullable fields prevent fabrication; enum + "other" for extensibility (§6.6). |
| Chaining / interview | Per-file + integration passes beat one giant prompt (attention dilution); chaining for predictable pipelines, dynamic decomposition for emergent subtasks (§6.7). |
| Validation + retry | Retry with the *concrete* error works for format/structure/arithmetic; useless when data is absent/external — bound the retries (§6.8). |
| Self-correction | Extract `stated` *and* `calculated` + `conflict_detected`; for subtle issues prefer an independent review instance over self-review (§6.9). |

> **Maps to Domain 4 (20%).** The throughline: prompt techniques raise the *probability* of correct behavior, while `tool_use` schemas guarantee *syntax* and code-side validation guarantees *semantics*. If you can build and defend the contract-extraction service above — choosing the right technique per failure mode and knowing where the deterministic line sits — you have the core of this domain.

# Chapter 7: Message Batches API

> Documentation: [Message Batches](https://platform.claude.com/docs/en/build-with-claude/message-batches)

The Message Batches API trades **latency for cost and scale**: you hand Anthropic a large bag of independent requests, walk away, and collect the answers later at **half price**. This chapter sits in **Domain 5 — Context Management and Reliability (15% of the exam)**, the domain that asks you to keep large systems correct and economical under load — and it is the canonical answer whenever an exam scenario says "offline", "overnight", "tens of thousands of documents", or "cut the inference bill". By the end you should be able to decide *when* to batch, drive the *async lifecycle* correctly, and design a *resilient* large job:

- **What the Batches API is** (§7.1) — the async model, the 50% discount, the 24-hour window, and what it does *not* do.
- **Batch vs. real-time** (§7.2) — the decision rule the exam tests, framed around who is waiting for the result.
- **`custom_id` correlation** (§7.3) — why results come back unordered and how you re-attach them to inputs.
- **The submit → poll → retrieve lifecycle** (§7.4) — the three calls and the states in between.
- **Failure handling and SLA planning** (§7.5–§7.6) — partial failures, selective resubmission, and backing out a deadline.

§7.7 then builds a complete offline document-classification pipeline end-to-end, and §7.8 distills what the exam tests.

## 7.1 Overview: What the Batches API Is

The Message Batches API lets you submit a collection of independent Messages API requests for **asynchronous** processing. You do not hold a connection open; you submit, you receive a batch ID, and you poll until the batch finishes — at which point you stream the results.

| Attribute | Value |
|---|---|
| Cost | **50% discount** on input *and* output tokens vs. synchronous calls |
| Processing window | Most batches finish within **1 hour**; the hard ceiling is **24 hours** (no per-request latency SLA) |
| Batch size | Up to **100,000 requests** or **256 MB**, whichever comes first |
| Result retention | Results are available for **29 days** after the batch is created |
| Correlation | Each request carries a `custom_id`; results are keyed by it and arrive **in any order** |
| Feature parity | **All** Messages API features work inside a batch — tools, vision, system prompts, **prompt caching**, structured outputs |
| Multi-turn tool calling | **Not supported** — one request produces one response; there is no agentic loop inside a batch |

**Why it exists — the economics.** Half-price tokens are the headline. For a job that processes 50,000 invoices or re-classifies a year of support tickets, the 50% discount is often the difference between "we run this nightly" and "we don't run this at all." The cost applies to the *whole* batch's token usage, so the larger and more repetitive the job, the more you save — and because prompt caching also works inside a batch, a shared system prompt across thousands of requests can stack a further ~90% discount on the cached prefix on top of the 50%.

**The catch — no latency guarantee.** "Up to 24 hours" is a ceiling, not a target. Most batches finish far sooner, but you cannot *promise* a finish time, so the API is unusable for anything a human is actively waiting on. This single property is what every exam question about batching turns on.

**Pitfall — treating a batch like a chat.** A batch request is one-shot: the model receives the messages and returns one response. If you put tools in a batch request and the model emits a `tool_use`, there is nothing to execute it and feed the result back — the batch does not loop. Batches are for *stateless, single-turn* work (classify, extract, summarize, score, enrich), not for multi-step agents. If your task needs an agentic loop, it belongs in the synchronous Messages API (Chapter 3), not here.

**Exam angle.** Expect a table-stakes question that hands you a property — "50% cheaper", "results in any order", "no SLA", "one request one response" — and asks which API it describes. The distractor is almost always the synchronous Messages API. Anchor on *asynchronous + discounted + no latency guarantee*.

## 7.2 When to Use the Batch API vs. the Synchronous API

The decision rule is a single question: **is something — a human or a downstream synchronous system — blocked waiting for this result?** If yes, use the synchronous Messages API. If the result is only needed *eventually* (by morning, by the weekly report, whenever the job finishes), batch it and take the discount.

```mermaid
flowchart TD
    A[New inference workload] --> B{Is anyone blocked<br/>waiting on the result?}
    B -->|yes, a user or live system| C[Synchronous Messages API<br/>full price, immediate]
    B -->|no, needed eventually| D{Independent single-turn<br/>requests?}
    D -->|no, needs an agentic loop| C
    D -->|yes| E{Large volume or<br/>cost-sensitive?}
    E -->|yes| F[Batch API<br/>50 percent off, up to 24h]
    E -->|borderline| G[Either works —<br/>batch if volume grows]
```

| Task | API | Why |
|---|---|---|
| Pre-merge PR check | **Synchronous** | The developer is waiting; 24 hours is unacceptable |
| Interactive code review | **Synchronous** | Immediate response required in the editor |
| Live customer-support chat | **Synchronous** | A user is reading the reply in real time |
| Overnight tech-debt report | **Batch** | Result is needed by morning; 50% savings |
| Weekly security audit | **Batch** | Not urgent; runs on a schedule; 50% savings |
| Classifying 10,000 documents | **Batch** | Bulk, offline, no one waiting; savings are significant |
| Nightly enrichment of a CRM table | **Batch** | Scheduled, large, latency-tolerant |

**Why "who is waiting" is the right axis.** Volume alone does not decide it — you *can* run 10,000 synchronous calls, and you *can* batch a single request. What makes batching correct is the combination of (a) tolerance for latency and (b) independence of the requests. A live chat with one user fails (a); a multi-turn agent fails (b). Everything that passes both is a batch candidate, and at that point the 50% discount makes batching the default, not the exception.

**Pitfall — batching latency-sensitive work to save money.** The discount tempts teams to batch things users are waiting on. A batch that *usually* finishes in 10 minutes will *eventually* take 20 hours when the queue is deep, and that one bad day is a production incident. Never put a human-facing path on the batch API, no matter how fast it normally returns.

**Pitfall — going synchronous for a huge offline job "to keep it simple".** The mirror-image mistake. Running 50,000 documents through synchronous calls pays double and hammers your rate limits; the batch API is *built* for this shape and the discount is free money you are declining.

**Exam angle.** These questions are almost always a sorting task: a list of workloads, each tagged Batch or Synchronous. Decide each one on the "who is waiting / is it a loop" test. The deliberately tricky rows are (1) a high-volume task that is nonetheless interactive — stays synchronous — and (2) a low-volume task that is purely offline — batch is still fine, the discount applies even to small jobs.

## 7.3 Correlating Requests and Results with `custom_id`

Every request in a batch carries a `custom_id` you assign. It is the *only* link between an input and its result, because **batch results come back in arbitrary order** — the API makes no promise that result #1 corresponds to request #1.

```json
{
  "custom_id": "doc-invoice-2024-001",
  "params": {
    "model": "claude-haiku-4-5",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Extract data from: ..."}]
  }
}
```

`custom_id` lets you:

- **Re-attach each result to its source** document, record, or row — by key, never by position.
- **Resubmit only the failures** — identify the failed `custom_id`s and build a new, smaller batch from just those.
- **Avoid reprocessing successes** — already-succeeded `custom_id`s are done; you never pay for them twice.
- **Make the job idempotent** — a stable, deterministic `custom_id` (e.g. derived from the document's primary key) means a re-run produces the same keys, so you can dedupe and safely retry.

**Why ordering is not guaranteed.** A batch of 100,000 requests is processed in parallel across Anthropic's fleet; requests finish when they finish. Building your result-handling around array index is the single most common batch bug — it silently mislabels every record the moment one request reorders or fails.

**Pitfall — non-unique or positional `custom_id`s.** `custom_id` must be unique within a batch. Reusing one (or using a bare loop index like `"0"`, `"1"` that you then match positionally against your input list) destroys the only reliable correlation you have. Derive it from something meaningful and unique in your domain: `invoice-2024-001`, `ticket-558823`, `user-4471-enrich`.

**Exam angle.** A scenario describes results coming back mismatched, or asks "how do you know which answer belongs to which document?" The answer is always: key on `custom_id`; never rely on order.

## 7.4 The Batch Lifecycle: Submit → Poll → Retrieve

A batch moves through three operations and a small set of states. You **create** it, you **poll** its `processing_status` until it reaches `ended`, then you **stream the results**.

```mermaid
flowchart TD
    A[Build requests<br/>each with a unique custom_id] --> B[batches.create<br/>returns batch id + status in_progress]
    B --> C[batches.retrieve id<br/>read processing_status]
    C --> D{processing_status?}
    D -->|in_progress| E[wait, then poll again]
    E --> C
    D -->|ended| F[batches.results id<br/>stream each result]
    F --> G{result.type per item?}
    G -->|succeeded| H[read result.message.content<br/>store by custom_id]
    G -->|errored / expired / canceled| I[record custom_id<br/>for resubmission]
```

**The three calls (Python SDK).** `build_practical_test_html.py` is not involved here — this is the live API:

```python
import anthropic
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

client = anthropic.Anthropic()

#-- Step 1 - create: wrap each request as Request(custom_id, params)
batch = client.messages.batches.create(
    requests=[
        Request(
            custom_id="doc-invoice-2024-001",
            params=MessageCreateParamsNonStreaming(
                model="claude-haiku-4-5",
                max_tokens=1024,
                messages=[{"role": "user", "content": "Extract data from: ..."}],
            ),
        ),
        # ... up to 100,000 of them
    ]
)
```

```python
import time

#-- Step 2 - poll: retrieve the batch and check processing_status until "ended"
while True:
    batch = client.messages.batches.retrieve(batch.id)
    if batch.processing_status == "ended":
        break
    # request_counts tracks live progress: processing / succeeded / errored
    time.sleep(60)
```

```python
#-- Step 3 - retrieve: stream results; they arrive in ANY order, so key by custom_id
results = {}
for result in client.messages.batches.results(batch.id):
    if result.result.type == "succeeded":
        msg = result.result.message
        results[result.custom_id] = next(
            (b.text for b in msg.content if b.type == "text"), ""
        )
    else:
        results[result.custom_id] = None  # errored / expired / canceled
```

**The states that matter:**

- **`processing_status`** on the batch object is `in_progress` while work is running and `ended` when every request has reached a terminal result. `ended` does **not** mean "all succeeded" — it means "no more work to do". A cancel request moves it through `canceling`.
- **`request_counts`** (`processing`, `succeeded`, `errored`, …) is your live progress meter while polling — useful for logging and dashboards.
- **`result.result.type`** per item is one of `succeeded`, `errored`, `canceled`, or `expired`. Only `succeeded` carries a `result.message`; the others carry error/status detail.

**Why poll instead of stream the whole thing.** There is no open connection holding your batch — it runs server-side for minutes to hours. You poll `retrieve` on a sane interval (every 30–60s is plenty; a tight loop just wastes calls), and only when `processing_status == "ended"` do you pull results. Results live for **29 days**, so there is no rush to fetch them the instant the batch ends.

**Pitfall — fetching results before `ended`, or reading a non-`succeeded` item's message.** Don't call `results()` until the batch has ended, and always branch on `result.type` before reaching for `result.message` — an `errored` or `expired` item has no message, and unconditionally reading `result.message.content` will throw.

**Exam angle.** Expect to identify the correct ordering of the lifecycle (create → poll status → retrieve results), to know that `ended` ≠ "all succeeded", and to know that results are durable for 29 days (so you don't have to handle them synchronously the moment the batch completes).

## 7.5 Handling Failures Within a Batch

Inside one batch, individual requests can fail independently. The whole batch does **not** fail because a few requests did — it reaches `ended`, and each result tells you its own fate. The recovery pattern is **identify by `custom_id`, fix the cause, resubmit only the failures.**

```mermaid
flowchart TD
    A[Submit batch of 100 documents] --> B[Batch ends<br/>95 succeeded, 5 errored]
    B --> C[Stream results,<br/>collect failed custom_ids]
    C --> D{Why did they fail?}
    D -->|context limit exceeded| E[Chunk long docs,<br/>then resubmit those 5]
    D -->|transient server error| F[Resubmit the 5 as-is]
    E --> G[New small batch<br/>of just the failures]
    F --> G
    G --> H[Merge new results<br/>with the 95 successes]
```

A concrete walk-through:

1. Submit a batch of 100 documents.
2. The batch ends: 95 succeed, 5 fail (say, each exceeded the context window).
3. Stream results and collect the 5 failed `custom_id`s (the ones whose `result.type != "succeeded"`).
4. Change strategy for those 5 — e.g. split each long document into chunks, or trim it.
5. Resubmit **only** those 5 as a new batch, then merge their results back with the original 95.

**Distinguish the failure types — they need different fixes.** An `errored` result carries an error type. A **validation/`invalid_request` error** (a malformed request, a document over the context limit) will fail again identically if you resubmit unchanged — you must *fix the request* first. A **transient server error** is safe to resubmit as-is. An **`expired`** result means the batch hit the 24-hour ceiling before that request was processed — resubmit it (and consider smaller batches so the window isn't a factor). Blindly retrying a validation failure just burns another batch; blindly *not* retrying a transient one drops good work.

**Why partial failure is a feature, not a bug.** Because successes are billed and delivered regardless of the failures, you never redo 95 good documents to recover 5 bad ones. The `custom_id` keying makes the "merge the retry back in" step trivial: the 5 new results slot into the same dictionary under the same keys.

**Pitfall — re-running the entire batch on any failure.** This pays for the 95 successes a second time and is the exact waste `custom_id`-based selective resubmission exists to prevent. Resubmit the failures only.

**Pitfall — ignoring the error subtype.** Treating every failure as "retry" loops forever on the validation errors; treating every failure as "give up" loses the recoverable ones. Read the error type and route accordingly.

**Exam angle.** The model scenario is "100 submitted, some fail" — the expected answer is *identify failures by `custom_id`, address the root cause, resubmit only those*, and the supporting detail is *distinguish validation failures (fix first) from transient ones (retry as-is)*. This is the Domain 5 error-propagation idea (structured, per-item failure context) applied to batch jobs.

## 7.6 SLA Planning: Backing Out a Deadline

Because the batch window is "up to 24 hours", any real deadline must be planned backward from it. The rule: **your submission deadline = your result deadline − 24 hours.**

If you need a result in **30 hours** and a batch can take up to **24**:

- Submission window: 30 − 24 = **6 hours**. You must submit no later than 6 hours from now.
- Equivalently, a batch must be submitted **at least 24 hours before** the moment you need its output.
- For work that arrives continuously, don't accumulate it into one giant end-of-day batch — slice it into smaller batches on a cadence (e.g. every 4 hours) so no single item is ever waiting on a full 24-hour window, and so a late-arriving item still clears the deadline.

**Why size and cadence interact with the window.** A 100,000-request batch and a 500-request batch share the same 24-hour ceiling, but the small one almost always finishes far sooner. Splitting a huge job into several smaller batches both smooths your progress visibility (each ends independently) and reduces the blast radius if one batch expires — you re-run a slice, not the whole day.

**Pitfall — planning against the *typical* finish time.** "It usually takes 20 minutes" is not a deadline you can commit to. SLA math uses the **24-hour ceiling**, every time. Provision the buffer for the worst case, not the average.

**Pitfall — one daily mega-batch for streaming inputs.** If you collect a day's documents and submit at 11pm for an 8am deadline, you have only 9 hours of buffer and every document waited all day. Frequent smaller batches keep each item's clock short and keep you inside the SLA.

**Exam angle.** A timing question gives you a result deadline and asks for the latest safe submission time, or the right batching cadence. Compute against 24 hours: *latest submission = deadline − 24h*; for continuous inputs, *split into fixed windows* so nothing rides the full ceiling.

## 7.7 End-to-End Case Study: An Offline Document-Classification Pipeline

The pieces above only matter assembled into a real job. Here is a complete, latency-tolerant pipeline of exactly the shape Domain 5 asks you to reason about — a nightly classification-and-enrichment run over a large document set, built for cost and resilience.

### Requirements

- Each night, **classify and tag 50,000 support tickets** from the day's queue (category, priority, product area) and write the tags back to the warehouse.
- Results are needed by the **8:00 AM** analytics refresh — **no human is waiting** overnight.
- **Cost matters**: 50,000 tickets is a large, repetitive job; the team wants the inference bill minimized.
- The work is **single-turn and independent** — each ticket is classified on its own; there is no conversation and no tool loop.
- The pipeline must be **resilient**: a handful of oversized or transiently-failed tickets must not sink the run or force a full re-process.

### Architecture

```mermaid
flowchart TD
    Q[Nightly ticket queue<br/>50,000 tickets] --> R[Build requests<br/>custom_id = ticket id<br/>shared cached system prompt]
    R --> S[batches.create]
    S --> P[Poll processing_status<br/>every 60s until ended]
    P --> G[Stream results<br/>key every result by custom_id]
    G --> OK[succeeded<br/>write tags to warehouse]
    G --> BAD[errored or expired<br/>collect failed ids]
    BAD --> FIX[Chunk oversized tickets;<br/>resubmit failures only]
    FIX --> S
    OK --> DONE[Warehouse ready<br/>before 8 AM refresh]
```

The job is **submitted once and polled**, not held open; the model is **Haiku 4.5** because classification is simple and cheap; a **shared, cached system prompt** rides every request; and failures are **re-attached and resubmitted by `custom_id`** rather than re-running the whole batch.

### Implementation

Build the batch with a stable `custom_id` per ticket and a *shared* system prompt marked for prompt caching — the cached prefix is paid once and read at ~0.1× for all 50,000 requests, stacking on top of the batch's 50% discount:

```python
import anthropic
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

client = anthropic.Anthropic()

#-- Shared, cacheable instructions - identical across every request in the batch
TAGGING_SYSTEM = [
    {"type": "text", "text": "You are a support-ticket classifier. Return JSON only."},
    {
        "type": "text",
        "text": TAXONOMY_AND_FEWSHOTS,            # large, stable, reused by all
        "cache_control": {"type": "ephemeral"},   # cached prefix, ~0.1x on reads
    },
]

requests = [
    Request(
        custom_id=f"ticket-{t['id']}",            # stable key, derived from the PK
        params=MessageCreateParamsNonStreaming(
            model="claude-haiku-4-5",             # cheap + fast: right tier for classification
            max_tokens=256,                        # tags are short; small cap controls cost
            system=TAGGING_SYSTEM,
            messages=[{"role": "user", "content": t["body"]}],
        ),
    )
    for t in nightly_tickets                       # up to 100,000 per batch
]

batch = client.messages.batches.create(requests=requests)
```

Poll on a calm interval, then stream results and split succeeded from failed — keyed entirely by `custom_id`:

```python
import time

while True:
    batch = client.messages.batches.retrieve(batch.id)
    if batch.processing_status == "ended":        # ended != all-succeeded
        break
    time.sleep(60)

tags, failed_ids = {}, []
for result in client.messages.batches.results(batch.id):
    if result.result.type == "succeeded":
        msg = result.result.message
        tags[result.custom_id] = next((b.text for b in msg.content if b.type == "text"), "")
    else:
        failed_ids.append(result.custom_id)       # errored / expired / canceled

write_tags_to_warehouse(tags)                      # 49,990 good rows land immediately
```

Resubmit only the failures, after fixing their cause — never the whole batch:

```python
if failed_ids:
    retry_requests = [
        Request(
            custom_id=fid,
            params=MessageCreateParamsNonStreaming(
                model="claude-haiku-4-5",
                max_tokens=256,
                system=TAGGING_SYSTEM,
                messages=[{"role": "user", "content": chunk_if_oversized(ticket_body(fid))}],
            ),
        )
        for fid in failed_ids
    ]
    retry_batch = client.messages.batches.create(requests=retry_requests)
    # poll + merge retry_batch results back into `tags` under the same custom_ids
```

### Execution trace

```mermaid
sequenceDiagram
    actor Cron as Nightly job
    participant API as Batches API
    participant DW as Warehouse
    Cron->>API: batches.create(50,000 requests)
    API-->>Cron: batch id, processing_status in_progress
    loop every 60s
        Cron->>API: batches.retrieve(id)
        API-->>Cron: in_progress (succeeded 41,200 / processing 8,800)
    end
    API-->>Cron: processing_status ended (49,990 ok / 10 errored)
    Cron->>API: batches.results(id)
    API-->>Cron: results keyed by custom_id, unordered
    Cron->>DW: write 49,990 tags
    Cron->>API: batches.create(10 failures, chunked)
    API-->>Cron: ended, 10 ok
    Cron->>DW: merge final 10 tags before 8 AM
```

Notice the run *never blocks* on a connection, *never re-pays* for the 49,990 successes, and clears the deadline with hours to spare — the 24-hour ceiling was never close, because the job was sized and scheduled with buffer.

### Validation

- **Cost check:** confirm the batch line items bill at ~50% of synchronous, and that `usage.cache_read_input_tokens` is non-zero on the bulk of requests — proving the shared system prompt cached. If cache reads are zero, a per-request difference (a timestamp, an unsorted field) is invalidating the prefix.
- **Correlation check:** assert every warehouse row was keyed by `custom_id`, not by result position — reorder the results stream in a test and confirm tags still land on the right tickets.
- **Resilience check:** inject an oversized ticket; confirm the batch still reaches `ended`, the bad ticket surfaces as a failed `custom_id`, and only it (not the other 49,999) is resubmitted.
- **SLA check:** confirm submission happens ≥ 24 hours before the 8 AM dependency, or that the cadence keeps every item inside the window.

### Common pitfalls

- Putting this on the synchronous API "to keep it simple" — pays double and stresses rate limits for a job no one is waiting on (§7.2).
- Matching results to tickets by array index instead of `custom_id` — silently mislabels tickets the moment one reorders or fails (§7.3).
- Re-running all 50,000 when 10 fail, instead of resubmitting the 10 by `custom_id` (§7.5).
- Reading `result.message` without checking `result.type` first — throws on the errored items (§7.4).
- Planning the 8 AM deadline against the *typical* finish time instead of the 24-hour ceiling (§7.6).

## 7.8 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| What batching is | Asynchronous, **50% cheaper**, up to **24h** (no latency SLA), one request → one response, results retained **29 days** (§7.1). |
| Batch vs. synchronous | Decide on **who is waiting** and **is it a loop**: live/interactive/agentic → synchronous; offline + independent + high-volume → batch (§7.2). |
| `custom_id` | Results arrive **unordered**; correlate by `custom_id`, never by position — also enables selective retry and idempotency (§7.3). |
| Lifecycle | **create → poll `processing_status` until `ended` → stream `results`**; `ended` ≠ all-succeeded; branch on `result.type` (§7.4). |
| Failure handling | Identify failures by `custom_id`, **fix the cause, resubmit only those**; distinguish validation (fix first) from transient (retry as-is) (§7.5). |
| SLA planning | Latest submission = **deadline − 24h**; split continuous inputs into fixed windows so nothing rides the full ceiling (§7.6). |

> **Maps to Domain 5 (15%).** If you can build and defend the nightly classification pipeline above — batch-vs-real-time judgment, the submit/poll/retrieve lifecycle, `custom_id` correlation, selective failure recovery, and 24-hour SLA math — you have the cost-and-reliability core this domain tests, plus the platform fact that Batches is first-party (and Claude Platform on AWS) only, not Amazon Bedrock or Vertex AI.

# Chapter 8: Task Decomposition Strategies

> Documentation: [Subagents](https://platform.claude.com/docs/en/agent-sdk/subagents) | [Sessions](https://platform.claude.com/docs/en/agent-sdk/sessions)

Decomposition is the skill of turning *one* complex request into the *right* set of subtasks — and knowing when to leave it as one task. It is the orchestration counterpart to Chapter 3's agent mechanics: Chapter 3 built the coordinator and the `Task` tool; this chapter decides *what* the coordinator should hand to those subagents and *in what order*. It maps to **Domain 1 — Agent Architecture and Orchestration (27% of the exam)**, specifically objective **1.6 Task Decomposition Strategies for Complex Workflows**, and it leans on the multi-agent and context-passing skills from 1.2–1.3.

The exam tests decomposition as a series of *judgement calls*, not a single algorithm. By the end of this chapter you should be able to pick the right strategy on sight:

- **Fixed pipelines / prompt chaining** (§8.1) — predictable, known-in-advance steps.
- **Dynamic adaptive decomposition** (§8.2) — subtasks generated from what you discover.
- **Sequential vs parallel** (§8.3) — when subtasks may run concurrently and when a dependency forbids it.
- **Multi-pass review (fan-out then integrate)** (§8.4) — splitting a large artifact per-unit, then a cross-unit pass.
- **When *not* to decompose** (§8.5) — the over-decomposition failure mode the exam loves to probe.

§8.6 ties it together with an end-to-end **multi-agent research system**, and §8.7 distills the exam angle.

## 8.1 Fixed Pipelines (Prompt Chaining)

A fixed pipeline (a.k.a. *prompt chaining*) hard-codes the sequence of steps in advance. The output of each stage becomes the input to the next:

```mermaid
flowchart TD
    Doc[Raw document] --> Meta[Extract metadata]
    Meta --> Data[Extract structured data]
    Data --> Val{Validation passes?}
    Val -->|no| Fix[Repair or reject]
    Val -->|yes| Enrich[Enrich from reference data]
    Enrich --> Out[Final structured output]
    Fix --> Out
```

Each box is a separate, focused model call (or a deterministic step). Because the structure never changes, you can test each stage in isolation, cache intermediate results, and reason about cost up front.

**Why split a chain instead of doing it in one prompt?** Each step gets the model's full attention and a narrow instruction, so accuracy on each sub-step rises. You also gain a natural checkpoint after every stage — validation can reject bad output *before* it contaminates enrichment.

**When to use:**
- The task structure is predictable (e.g., invoice or review parsing always follows the same template).
- All steps are known up front and the order never depends on the data.
- You need stability, reproducibility, and per-stage observability.

**Pitfalls:**
- **Brittleness when reality varies.** If some documents need an extra step, a *fixed* pipeline can't add one — that's the signal to move to §8.2.
- **Error propagation.** Without a validation gate, a bad extraction silently flows downstream. Always put a check between stages that feed each other.
- **Over-chaining trivial work.** Three stages that each do one tiny thing add three round-trips of latency; collapse them (see §8.5).

**Exam angle:** "predictable, same template every time" → fixed pipeline / prompt chaining. The distractor will usually be dynamic decomposition (wrong because the scope is fully known in advance).

## 8.2 Dynamic Adaptive Decomposition

In a dynamic plan the subtasks are **generated from intermediate results** — you cannot enumerate them before you start because the next step depends on what the last step found:

```mermaid
flowchart TD
    Goal[Goal: add tests to a legacy codebase] --> Map[Map structure<br/>Glob and Grep]
    Map --> Found[Found: 3 modules untested,<br/>2 partially covered]
    Found --> Prio[Prioritize: payments module first<br/>highest risk]
    Prio --> Work[Begin writing tests]
    Work --> Disc{Hidden dependency<br/>discovered?}
    Disc -->|yes| Adapt[Insert new subtask:<br/>mock the external API]
    Disc -->|no| Next[Continue to next module]
    Adapt --> Next
```

The plan is a living thing: the agent maps the terrain first, forms a prioritized plan, then **revises that plan** when it discovers something it could not have known up front (here, an external-API dependency that forces a new "add a mock" subtask).

**Why this is harder — and more powerful.** A fixed pipeline assumes omniscience about the steps. Open-ended work doesn't grant that: you must let the agent expand the plan as evidence arrives. The discipline is to *map before you commit* — explore structure first, then prioritize by risk, rather than diving into the first file you see.

**When to use:**
- Open-ended, investigative tasks (debugging, auditing, "figure out why X is slow").
- The full scope is unknown at the start.
- Each step's *output* determines the next step's *existence*.

**Pitfalls:**
- **No exit condition.** A plan that keeps spawning subtasks never finishes. Anchor it with a goal and quality bar ("stop when every module has ≥1 test").
- **Adapting too eagerly.** Replanning on every minor surprise thrashes. Replan when a discovery *changes the structure of the work*, not for cosmetic findings.
- **Losing the thread across steps.** Because later subtasks depend on earlier findings, those findings must be carried forward explicitly (the context-passing rule from Chapter 3 §3.4).

**Exam angle:** "scope unknown up front / each step depends on the last" → dynamic adaptive decomposition. Watch for "map the structure first, then build a prioritized plan" — that phrasing is the tell.

## 8.3 Sequential vs Parallel Decomposition

Once you have subtasks, the next decision is *ordering*: can they run concurrently, or does a dependency force a sequence? This is where decomposition meets the parallel-spawning capability from Chapter 3 §3.4 (multiple `Task` calls in one coordinator turn run at once).

```mermaid
flowchart TD
    Start[Subtasks identified] --> Q{Does task B need<br/>task A output?}
    Q -->|no, independent| Par[Spawn in parallel<br/>multiple Task calls, one turn]
    Q -->|yes, B depends on A| Seq[Run sequentially<br/>pass A result into B]
    Par --> Agg[Aggregate results]
    Seq --> Agg
    Agg --> Done[Validated result]
```

**The rule is dependency-driven, not preference-driven.** Independent subtasks (search topic X, search topic Y, search topic Z) should fan out in parallel — it is faster and the results don't interact. Dependent subtasks (extract a schema, *then* validate data against it) must be sequenced, because running them at once would feed the validator nothing.

**Why parallel is not free.** Parallel subagents each consume tokens and an isolated context window; spawning ten when three would do wastes budget and makes aggregation noisier. Parallelize for *independent coverage*, not as a default.

**Common dependency shapes:**
- **Fan-out / fan-in (map-reduce):** N independent subtasks in parallel, then one aggregation step (this is §8.4's review pattern and §8.6's research pattern).
- **Linear chain:** A → B → C, each consuming the prior result (this is §8.1).
- **Diamond:** A → {B, C in parallel} → D — split after a shared setup step, then rejoin.

**Pitfalls:**
- **Parallelizing a true dependency** produces a subagent that runs with missing input and fails or hallucinates.
- **Sequencing independent work** leaves performance on the table — three serial searches where one parallel turn would do.
- **Forgetting aggregation must wait.** The fan-in step depends on *all* fan-out subtasks; the coordinator must collect every result before synthesizing.

**Exam angle:** the question often hides a dependency in prose. Ask "does B need A's output?" If yes → sequential; if no → parallel. "Split research coverage to minimize duplication" is a parallel-fan-out cue.

## 8.4 Multi-pass Review (Fan-out, then Integrate)

A large artifact — a pull request touching 14 files — is the canonical fan-out-then-integrate case. Pass 1 analyzes each unit in isolation (parallelizable); Pass 2 reasons across units, which *cannot* be parallelized because it needs every Pass 1 result:

```mermaid
flowchart TD
    PR[Pull request: 14 files] --> P1a[Pass 1: analyze auth.ts<br/>local issues]
    PR --> P1b[Pass 1: analyze database.ts<br/>local issues]
    PR --> P1c[Pass 1: analyze routes.ts<br/>local issues]
    P1a --> P2[Pass 2: integration pass<br/>cross-file reasoning]
    P1b --> P2
    P1c --> P2
    P2 --> Cross[Cross-file issues:<br/>inconsistent types, circular deps]
```

**Why a single pass over 14 files is bad:**
- **Attention dilution:** the model analyzes some files deeply and others shallowly when forced to hold all 14 at once.
- **Inconsistent comments:** a pattern is flagged in one file but approved in another, because the model never sees them side by side under one rubric.
- **Missed bugs:** obvious errors get skipped under cognitive overload.

**Why two passes fix it.** Pass 1 gives each file the model's full attention under an identical rubric (consistency). Pass 2 exists *only* to catch what per-file analysis structurally cannot: inconsistent types across modules, circular dependencies, a function deleted in one file but still called in another. The integration pass is a dependent (sequential) step — it consumes all Pass 1 outputs, so it is the fan-in of §8.3.

**Pitfalls:**
- **Skipping Pass 2.** Per-file review *never* finds cross-file bugs; without integration you ship the circular dependency.
- **Letting Pass 1 reason across files.** That re-introduces attention dilution; keep each Pass 1 subagent scoped to one file.
- **Unbounded fan-out.** 200 files at once is its own overload; batch them and aggregate batch summaries.

**Exam angle:** "PR with 10+ files," "deep but consistent review" → per-file passes plus a *separate* cross-file integration pass. The wrong answer is "review all files in one prompt."

## 8.5 When NOT to Decompose

Decomposition has a cost: every subagent is an isolated context window that must be briefed explicitly (Chapter 3 §3.4), plus a round-trip and an aggregation step. **Over-decomposition** — splitting work that didn't need splitting — is a failure mode the exam deliberately tests.

```mermaid
flowchart TD
    Task[Incoming task] --> Q1{Multiple independent<br/>aspects or large artifact?}
    Q1 -->|no| Single[Do it in one focused agent<br/>no decomposition]
    Q1 -->|yes| Q2{Subtasks need separate<br/>context or tools?}
    Q2 -->|no| Single
    Q2 -->|yes| Decomp[Decompose into subagents]
```

**Do NOT decompose when:**
- The task is **small or single-aspect** — a one-file review or a single lookup. A coordinator + subagent here just adds latency and a briefing burden for no gain.
- **Subtasks are tightly coupled** and constantly need each other's intermediate state. Splitting them forces you to shuttle context back and forth through the coordinator, which is slower and lossier than keeping them in one context.
- **The overhead exceeds the benefit** — three trivial steps that a single prompt handles accurately.

**Why the exam cares.** Objective 1.2 explicitly names "**risk of overly narrow decomposition by the coordinator**." A coordinator that shatters a cohesive task into micro-subtasks loses the shared context that made the task tractable, and aggregation becomes the hard part. The skill being tested is restraint: decompose for *independent coverage* or *attention isolation*, not reflexively.

**Pitfalls:**
- **Decomposing to look sophisticated.** The right answer is sometimes "one agent, one prompt."
- **Fragmenting shared context.** If every subtask needs the same large document, you pay to re-brief each subagent — keep it in one context instead.

**Exam angle:** when a question describes a *small or tightly-coupled* task and offers an elaborate multi-agent split, the elaborate option is usually the trap. Prefer the simplest design that meets the requirement.

## 8.6 End-to-End Case Study: A Multi-Agent Research System

The strategies above only matter when combined under real constraints. Here is a complete research assistant — the kind of system the exam's **Multi-Agent Research System** scenario asks you to reason about. It exercises *every* decision in this chapter: fixed vs dynamic, parallel vs sequential, fan-out/fan-in, and the restraint of §8.5.

### Requirements

- Answer a broad research question (e.g., *"Compare the security posture of three managed Kubernetes offerings"*) with a cited, synthesized report.
- **Split coverage** across subtopics so two subagents never research the same thing (minimize duplication — objective 1.2).
- Independent subtopics should be researched **in parallel**; synthesis must wait for **all** of them (a dependency).
- If synthesis reveals a **gap** (a subtopic with thin or conflicting evidence), the coordinator must **adaptively** spawn one more targeted search — not blindly re-run everything.
- Do **not** over-decompose: a single, simple factual question should be answered directly without the whole machine.

### Architecture

```mermaid
flowchart TD
    User([User question]) --> Coord[Coordinator]
    Coord --> Plan{Simple single-fact<br/>question?}
    Plan -->|yes| Direct[Answer directly<br/>no decomposition]
    Plan -->|no| Split[Decompose into<br/>independent subtopics]
    Split --> R1[Research subagent A<br/>subtopic 1]
    Split --> R2[Research subagent B<br/>subtopic 2]
    Split --> R3[Research subagent C<br/>subtopic 3]
    R1 -. findings only .-> Synth[Synthesis step<br/>fan-in: needs all results]
    R2 -. findings only .-> Synth
    R3 -. findings only .-> Synth
    Synth --> Gap{Coverage gap or<br/>conflict found?}
    Gap -->|yes| Extra[Adaptive: spawn one<br/>targeted follow-up search]
    Gap -->|no| Report[Cited final report]
    Extra --> Synth
```

The coordinator first applies §8.5 (don't decompose trivial questions). For real questions it **fans out** independent subtopics in parallel (§8.3), then runs a **dependent** synthesis (§8.4 fan-in), and only **adapts** (§8.2) when synthesis exposes a gap — a bounded refinement loop, not an open-ended one.

### Implementation

Define the coordinator and a least-privilege research subagent (reusing the Chapter 3 mechanics):

```python
coordinator = AgentDefinition(
    name="research_coordinator",
    description="Splits a research question into non-overlapping subtopics, "
                "runs them in parallel, synthesizes, and fills gaps.",
    system_prompt=(
        "Decompose the question into independent subtopics that do not overlap. "
        "If the question is a single simple fact, answer it directly without subagents. "
        "Spawn one Task per subtopic in a single turn so they run in parallel. "
        "After synthesis, if a subtopic has thin or conflicting evidence, spawn ONE "
        "targeted follow-up search; otherwise produce the cited report. "
        "Judge by coverage and citation quality, not by number of subagents."
    ),
    allowed_tools=["Task"],   # the coordinator only orchestrates
)

researcher = AgentDefinition(
    name="researcher",
    description="Researches exactly one subtopic and returns cited findings.",
    system_prompt="Research the assigned subtopic only. Return findings with sources.",
    allowed_tools=["web_search", "fetch_url"],   # least privilege: no Task, can't re-decompose
)
```

Fan out independent subtopics **in one coordinator turn** so they run concurrently — and pass each subagent its full context explicitly, because subagents inherit nothing (Chapter 3 §3.4):

```python
# One coordinator turn emits three parallel Tasks, each fully briefed:
Task(researcher, prompt="Subtopic: EKS security posture.\n"
                        "Cover: IAM integration, network policy, CVE response.\n"
                        "Return: bullet findings, each with a source URL.")
Task(researcher, prompt="Subtopic: GKE security posture.\n...")
Task(researcher, prompt="Subtopic: AKS security posture.\n...")
# All three execute concurrently; none can see the others' context.
```

The synthesis + gap check is a **sequential, dependent** step — it must collect *every* researcher result first:

```python
def synthesize(findings: list) -> Report:
    report = merge_and_cite(findings)
    gap = find_thin_or_conflicting_subtopic(report)   # bounded adaptive trigger
    if gap:
        more = Task(researcher, prompt=f"Targeted follow-up on: {gap}. ...")
        report = merge_and_cite(findings + [more])
    return report
```

### Execution trace

```mermaid
sequenceDiagram
    actor U as User
    participant Co as Coordinator
    participant A as Researcher A (EKS)
    participant B as Researcher B (GKE)
    participant C as Researcher C (AKS)
    U->>Co: Compare security of EKS, GKE, AKS
    Co->>Co: Not a single fact, decompose into 3 subtopics
    par Parallel fan-out
        Co->>A: Task(subtopic: EKS, full brief)
        Co->>B: Task(subtopic: GKE, full brief)
        Co->>C: Task(subtopic: AKS, full brief)
    end
    A-->>Co: EKS findings + sources
    B-->>Co: GKE findings + sources
    C-->>Co: AKS findings + sources
    Co->>Co: Synthesize - AKS evidence is thin
    Co->>C: Task(targeted follow-up: AKS network policy)
    C-->>Co: Additional AKS findings
    Co-->>U: Cited comparative report
```

Notice three chapter ideas at once: the **parallel `par` block** is §8.3 fan-out; **synthesis waits for all three** results (fan-in dependency); and the single **targeted follow-up** is bounded §8.2 adaptation — not a blind re-run of all subtopics.

### Validation

- **No-duplication test:** inspect the three Task prompts and assert their subtopics are disjoint — proves the coordinator split coverage (objective 1.2) rather than overlapping.
- **Parallelism test:** assert all three research Tasks are emitted in a *single* coordinator turn (concurrent), not three serial turns.
- **Dependency test:** assert synthesis runs only after all three results return — remove one and synthesis must block, proving the fan-in dependency.
- **Restraint test:** feed a single simple fact ("What is the latest EKS version?") and assert the coordinator answers directly with **zero** subagents (§8.5).
- **Bounded-adaptation test:** simulate a thin subtopic and assert exactly **one** follow-up Task fires — not a full re-run.

### Common pitfalls

- **Overlapping subtopics** so two subagents research the same thing — wasted tokens and contradictory findings (violates "minimize duplication").
- **Serial searches** where a single parallel turn would do — leaving latency on the table (§8.3).
- **Synthesizing before all results return** — the report omits whichever subagent hadn't finished (broken fan-in).
- **Re-running every subtopic** on a single gap instead of one targeted follow-up — unbounded, expensive adaptation (§8.2).
- **Decomposing a trivial question** through the full pipeline — over-decomposition (§8.5).
- **Forgetting to brief each subagent** — isolated context means an unbriefed researcher produces nothing useful (Chapter 3 §3.4).

## 8.7 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Fixed pipeline (prompt chaining) | Predictable, same-template, all-steps-known-up-front work → chain fixed stages with validation gates (§8.1). |
| Dynamic adaptive decomposition | Open-ended/unknown scope where each step depends on the last → map structure first, then build and revise a prioritized plan (§8.2). |
| Sequential vs parallel | Decide by dependency: "does B need A's output?" No → parallel fan-out; yes → sequential (§8.3). |
| Fan-out / fan-in | Independent subtasks in parallel, then one aggregation that depends on all of them (§8.3, §8.4). |
| Multi-pass review | 10+ file PR → per-file passes for consistency, plus a *separate* cross-file integration pass for circular deps/type mismatches (§8.4). |
| When NOT to decompose | Small, single-aspect, or tightly-coupled work → one focused agent; over-decomposition loses shared context (§8.5). |
| Split coverage | Coordinator must partition subtopics to minimize duplication; subagents inherit no context and must be briefed (§8.6). |

> **Maps to Domain 1 (27%), objective 1.6.** If you can choose fixed vs dynamic, parallel vs sequential, and — crucially — *when not to decompose*, and defend the research system above, you own the decomposition half of the most heavily weighted exam domain.

# Chapter 9: Escalation and Human-in-the-Loop

> Documentation: [Agent SDK Hooks](https://platform.claude.com/docs/en/agent-sdk/hooks) | [Subagents](https://platform.claude.com/docs/en/agent-sdk/subagents) | [Sessions](https://platform.claude.com/docs/en/agent-sdk/sessions)

An autonomous agent is only safe if it knows the edge of its own competence and hands off cleanly when it gets there. Escalation — pausing autonomy and routing a decision to a human — is the control that keeps an agent inside policy when the situation exceeds what it should decide alone. This chapter maps primarily to **Domain 1 — Agent Architecture and Orchestration (27% of the exam)**, specifically *1.4 multi-step workflows with enforcement and handoff patterns*, and to **Domain 5 — Context Management and Reliability (15%)**, specifically *5.2 escalation patterns* and *5.5 human oversight and confidence calibration*. The exam tests judgment here, not trivia: it gives you a borderline case and asks whether the agent should solve, ask, or escalate — and *how* the escalation is enforced.

By the end you should be able to reason about five things and assemble them into a production human-in-the-loop system:

- **Escalation triggers** (§9.1) — the reliable signals that say "stop and hand off," and the seductive-but-wrong ones.
- **Escalation patterns** (§9.2) — immediate vs. attempt-first vs. nuanced (acknowledge → resolve → escalate).
- **Structured handoff** (§9.3) — the self-contained packet a human needs, because they never see the transcript.
- **Confidence calibration and human oversight** (§9.4) — routing low-confidence work to review, and auditing the high-confidence remainder.
- **Deterministic enforcement** (§9.5) — making the escalation happen with a hook, not a hope.

§9.6 then builds a complete **high-value payment-approval agent** end-to-end — triggers, an approval gate enforced by a hook, a structured handoff, and resuming after the human decides — and §9.7 distills what the exam tests.

## 9.1 When to Escalate to a Human

Escalation is a routing decision: *who* should make this call, the agent or a person? The skill the exam rewards is recognizing the trigger from a short scenario and acting on it **immediately and correctly**, without over-investigating or guessing.

**Escalation triggers (clear, reliable rules):**

| Situation | Action | Why this is the right call |
|---|---|---|
| The customer explicitly asks "get me a manager" | Escalate immediately; do not attempt to solve | An explicit human request is a hard signal. Continuing to "help" overrides the customer's stated choice and erodes trust. |
| Policy does not cover the request | Escalate (e.g., competitor price matching when policy is silent) | The agent has no authority to invent policy. A silent/ambiguous policy is a decision a human must own. |
| The agent cannot make progress | Escalate after a *reasonable* number of attempts | Looping forever burns tokens and frustrates the user; a bounded number of real attempts then handoff is the contract. |
| Financial/irreversible operation above a threshold | Escalate (enforce via a **hook**, not a prompt) | Money and irreversible actions need a *guarantee*, not a >90% tendency. See §9.5. |
| Multiple matches when searching for a customer | Ask for additional identifiers; do not guess | Acting on the wrong record is a data-integrity and privacy incident. Disambiguate first. |

**Pitfall — the over-eager solver.** The most common wrong answer treats an explicit "I want a manager" as something to *talk the customer out of*. On the exam, an explicit request for a human is an **immediate** escalation with no further investigation. (See *5.2 skills*: "Execute explicit requests for a human immediately without additional investigation.")

**What is NOT a reliable trigger:**

| Unreliable method | Why it fails | What to do instead |
|---|---|---|
| Sentiment analysis | Customer mood does not correlate with case complexity; a calm customer can have an out-of-policy case and an angry one can have a trivial one | Trigger on *facts* (explicit request, policy gap, threshold), not tone |
| Model self-rated confidence (1–10) | The model can be **confidently wrong**; verbalized confidence is poorly calibrated and easily gamed by phrasing | Use calibrated, *measured* field-level scores against labeled data (§9.4), not a number the model invents |
| An automatic classifier (bolted on) | Overengineering; needs training data you may not have, and adds a failure mode | Start with explicit rules + few-shot examples; add ML only when rules demonstrably can't express the policy |

> **Exam angle.** A frequent distractor is "use sentiment analysis to decide when to escalate." It is wrong for a *principled* reason — emotion is not complexity. Anchor escalation in concrete, checkable conditions.

## 9.2 Escalation Patterns

Knowing *that* to escalate is half the answer; the exam also tests the *shape* of the interaction. There are three patterns, and choosing the wrong one is a graded mistake.

```mermaid
flowchart TD
    In[Customer message] --> Q1{Explicit request<br/>for a human?}
    Q1 -->|yes| Esc[Escalate immediately<br/>no further attempts]
    Q1 -->|no| Q2{Inside agent scope<br/>and policy?}
    Q2 -->|no, policy gap| Esc
    Q2 -->|yes| Try[Attempt resolution<br/>offer concrete option]
    Try --> Q3{Customer satisfied<br/>or reiterates human?}
    Q3 -->|reiterates human| Esc
    Q3 -->|satisfied| Done[Resolve and close]
```

**Immediate escalation** — an explicit request short-circuits everything:

```
Customer: "I want to speak to a manager"
Agent: [immediately calls escalate_to_human]
NOT: "I can help with your issue, let me..."
```

**Escalation after an attempt to resolve** — the request is in scope, so try first, then hand off if the offer doesn't land:

```
Customer: "My refrigerator broke two days after purchase"
Agent: [checks the order, offers a warranty replacement]
If the customer is not satisfied -> escalate
```

**Nuanced escalation (acknowledge → resolve → escalate on reiteration)** — this is the pattern most often tested, because the naive answer escalates too early:

```
Customer: "This is outrageous, I'm very unhappy with the quality!"
Agent: [acknowledges frustration] "I understand your frustration."
       [offers resolution] "I can offer a replacement or a refund."
Customer: "No, I want to talk to someone!"
Agent: [customer insists again -> immediate escalation]
```

**Key principle:** acknowledge the emotion first, then propose a *concrete* solution, and only escalate if the customer reiterates the desire for a human. Do not escalate on the first expression of dissatisfaction — venting is not the same as requesting a manager. Escalating too early throws away first-contact resolution (the Customer Support scenario targets 80%+); escalating too late, after an explicit human request, overrides the customer.

**Escalation for a policy gap** — the agent must not improvise authority it doesn't have:

```
Customer: "Competitor X has this item 30% cheaper—give me a discount"
Policy: covers price adjustments only on your own site
Agent: [escalates — policy does not cover competitor price matching]
```

> **Pitfall.** Treating a policy *gap* as a policy *denial*. The agent shouldn't say "no, we don't do that" (it has no authority to decide) **or** invent a discount (out of policy). The correct move is to escalate the exception to someone who can own it.

## 9.3 Structured Handoff Protocols

The human who picks up an escalation **does not see the conversation transcript** — they see whatever the agent hands them. So the handoff packet must be *complete, self-contained, and structured*. This is the same discipline as passing context to a subagent (Chapter 3, §3.4): the receiver inherits nothing you don't explicitly include.

On escalation, the agent should pass a structured summary to a human:

```json
{
  "customer_id": "CUST-12345",
  "customer_name": "Ivan Petrov",
  "issue_summary": "Refund request for a damaged item",
  "order_id": "ORD-67890",
  "root_cause": "Item arrived damaged; photos attached",
  "actions_taken": [
    "Verified customer via get_customer",
    "Confirmed order via lookup_order",
    "Offered a standard replacement — customer insists on a refund"
  ],
  "refund_amount": "$89.99",
  "recommended_action": "Approve a full refund",
  "escalation_reason": "Customer requested to speak with a manager"
}
```

The human operator does not have access to the full conversation transcript — they only see this summary. Therefore it must be complete and self-contained.

**What makes a handoff good (and what the exam checks):**

- **Identifiers** (`customer_id`, `order_id`) so the human can act without re-asking.
- **Root cause and actions_taken** so the human doesn't repeat work the agent already did — this is what protects first-contact resolution even across a handoff.
- **A recommended_action** — the agent did the legwork; surface its proposal so the human can confirm rather than re-investigate.
- **An explicit escalation_reason** — this also becomes the audit record for *why* autonomy stopped.

> **Pitfall — the lossy handoff.** A summary like "customer is unhappy, please help" forces the human to start from zero, defeating the point of the agent. Preserve the **transactional facts** — IDs, amounts, dates — verbatim; these are exactly the values progressive summarization tends to blur (Domain 5, *5.1*). Keep them in a structured packet, not buried in prose.

## 9.4 Confidence Calibration and Human Oversight

Not every human-in-the-loop decision is a live chat handoff. In high-volume pipelines (the **Structured Data Extraction** scenario), the loop is *statistical*: most items auto-process, and a calibrated minority routes to human review. The exam tests two ideas here — **calibrated field-level confidence** and **stratified auditing** — and warns against trusting a single aggregate number.

For data extraction systems:

1. **Field-level confidence scores:** the model outputs a confidence score *per extracted field*, not one score for the whole document — a date can be certain while a hand-written total is not.
2. **Calibration:** use labeled validation sets to tune thresholds, so "0.9 confidence" actually corresponds to ~90% observed accuracy (this is what *calibration* means — and why the model's self-rated 1–10 from §9.1 is not it).
3. **Routing:**
   - High confidence + stable accuracy -> automated processing
   - Low confidence or ambiguous sources -> human review

```mermaid
flowchart TD
    Doc[Extracted field<br/>plus confidence] --> T{Confidence above<br/>calibrated threshold?}
    T -->|yes| Auto[Auto-process]
    T -->|no| Review[Route to human review]
    Auto --> Sample{{Stratified random<br/>sample}}
    Sample -. audit a slice .-> QA[Per-type and per-field<br/>accuracy check]
    Review --> QA
    QA -. found drift .-> Recal[Recalibrate thresholds]
```

**Stratified random sampling:**

- Even for high-confidence extractions, regularly audit a sample — confidence is an estimate, not a guarantee, and new document layouts cause silent drift.
- An aggregate 97% accuracy can hide 40% errors for a particular document type — the good majority masks a broken minority.
- Analyze accuracy **by document type and by field**, not only overall; that segmentation is what surfaces the hidden 40%.

> **Exam angle.** When a question reports a single headline accuracy ("our extractor is 97% accurate, ship it"), the expected critique is that an *aggregate* can mask a failing segment. The fix is stratified sampling and per-segment analysis *before* trusting automation — not raising the global threshold blindly.

## 9.5 Deterministic Escalation: Hooks vs. Prompt Instructions

Escalation triggers can live in two very different places, and the distinction is the single most testable point in this chapter. You can *ask* the model to escalate (a prompt instruction), or you can *force* the escalation in code (a hook). They are not interchangeable.

A **prompt instruction** ("if the amount is over $10,000, escalate to a human") is **probabilistic**: the model will comply most of the time, but "most of the time" is not a control you can put in front of an auditor. A **hook** (`PreToolUse`) intercepts the tool call before it executes and **deterministically** redirects it — the model cannot bypass code.

```python
# Probabilistic: a guideline the model usually follows
# (fine for soft preferences; NOT for money/irreversible actions)
system_prompt = "If a transfer is over $10,000, escalate to a human for approval."

# Deterministic: a hook the model cannot bypass
@hook("PreToolUse")
def require_approval_over_limit(tool_call):
    if tool_call.name == "execute_transfer" and tool_call.args["amount"] > 10_000:
        # Code, not a suggestion: redirect to the approval gate.
        return redirect(to="request_human_approval", reason="amount_over_limit")
    return allow(tool_call)
```

| Attribute | Hooks | Prompt instructions |
|---|---|---|
| Guarantee | **Deterministic** (100%) | **Probabilistic** (>90%, not 100%) |
| Enforced by | Code in the agent runtime | The model's adherence |
| When to use | Critical business rules, financial/irreversible operations, compliance gates | General preferences, tone, recommendations, formatting |
| Example | Block/route any transfer > $10,000 | "Try to resolve before escalating" |
| Failure mode | None for the rule itself (it always fires) | Silent leakage on edge phrasings, long contexts, adversarial input |

**Rule:** when failure has financial, legal, or safety consequences, the escalation must be a **hook**, not a prompt. Prompts are for the soft, recoverable preferences around it ("be empathetic," "offer an alternative first"). This mirrors Chapter 3's hooks-vs-prompts principle; here the *thing being enforced* is the human-approval gate itself.

> **Exam angle.** A classic question: "policy says transfers over $10k need manager approval — where do you put that rule?" The graded answer is a hook/precondition, justified by *determinism*. "Put it in the system prompt" is the distractor that sounds reasonable and fails in production.

## 9.6 End-to-End Case Study: A High-Value Payment-Approval Agent

The pieces above only matter when they fit together. Here is a complete, realistic human-in-the-loop system — a payments assistant that can move money but **must** get a human to approve anything large, with the approval gate enforced deterministically and the workflow able to *resume* after the human decides. This is a different problem from Chapter 3's refund agent: there the hook *blocked* an over-limit action; here the hook *opens an approval gate and the agent pauses, waits for a human verdict, then continues* — true human-in-the-loop, not just a stop.

### Requirements

- Let an internal operator request outbound payments in natural language ("pay invoice INV-4471, $14,200 to Acme Ltd").
- Look up the payee and the invoice (read-only tools).
- **Hard rule:** any transfer **at or above $10,000** requires **explicit human approval** before execution — no exceptions, no model discretion.
- The approval must be a real pause: the agent emits a structured approval request, **waits**, and only executes on an approved verdict; on rejection it cancels and explains.
- Sub-threshold transfers (< $10,000) that are otherwise valid may execute automatically.
- Escalate (don't guess) when the payee lookup returns multiple matches.

### Architecture

```mermaid
flowchart TD
    Op([Operator]) --> Coord[Payments coordinator]
    Coord -->|Task| Lookup[Subagent payee and invoice<br/>get_payee, lookup_invoice]
    Lookup --> Multi{Multiple payee<br/>matches?}
    Multi -->|yes| Disamb[Ask operator<br/>for identifier]
    Multi -->|no| Coord
    Coord --> Transfer[execute_transfer]
    Transfer --> Gate{{PreToolUse hook<br/>amount at or above 10000?}}
    Gate -->|yes| Approve[request_human_approval<br/>pause and wait]
    Gate -->|no| Exec[Execute transfer]
    Approve --> Human([Approver])
    Human -->|approved| Exec
    Human -->|rejected| Cancel[Cancel and explain]
```

The coordinator owns orchestration; the lookup subagent is least-privilege (it can read payees and invoices but **cannot move money**); the **hook — not prompt text — enforces the approval gate**, because a missed gate is an unrecoverable financial event.

### Implementation

Define the coordinator and a least-privilege lookup subagent:

```python
coordinator = AgentDefinition(
    name="payments_coordinator",
    description="Prepares and submits outbound payments; routes large transfers for human approval.",
    system_prompt=(
        "You help an operator pay invoices. Look up the payee and invoice, "
        "confirm the amount, then call execute_transfer. "
        "Be empathetic and explain delays, but never promise a payment you have not executed."
    ),
    allowed_tools=["Task", "execute_transfer", "request_human_approval"],
)

payee_lookup = AgentDefinition(
    name="payee_lookup",
    description="Reads payee and invoice records. Read-only.",
    system_prompt="Return the payee and invoice details as structured data. If multiple payees match, return all candidates.",
    allowed_tools=["get_payee", "lookup_invoice"],   # least privilege: cannot move money
)
```

Enforce the $10,000 approval gate deterministically with a `PreToolUse` hook — this is the line the exam wants you to get right. Note it does not *block* the workflow; it *redirects* into a human-approval step:

```python
APPROVAL_LIMIT = 10_000

@hook("PreToolUse")
def require_approval_over_limit(tool_call):
    if tool_call.name == "execute_transfer" and tool_call.args["amount"] >= APPROVAL_LIMIT:
        # The model cannot bypass this; it is code, not a suggestion.
        return redirect(
            to="request_human_approval",
            reason="amount_over_limit",
            payload=build_handoff(tool_call.args),   # structured, self-contained
        )
    return allow(tool_call)
```

Build the structured handoff packet the approver sees (they never see the transcript — §9.3):

```python
def build_handoff(args):
    return {
        "payee_id": args["payee_id"],
        "payee_name": args["payee_name"],
        "invoice_id": args["invoice_id"],
        "amount": args["amount"],
        "actions_taken": [
            "Verified payee via get_payee",
            "Matched invoice via lookup_invoice",
        ],
        "recommended_action": "Approve transfer",
        "escalation_reason": "Transfer at or above the $10,000 approval limit",
    }
```

Resume after the human decides. The agent paused at the gate; the verdict re-enters the loop and decides the next tool call:

```python
def on_approval_verdict(verdict, case):
    if verdict.approved:
        # Resume the named session and let the loop continue to execution.
        resume_session(case.session_id, message=f"Approval granted by {verdict.approver}; proceed.")
    else:
        cancel_transfer(case)  # do NOT execute; explain to the operator
```

### Execution trace

```mermaid
sequenceDiagram
    actor Op as Operator
    participant Co as Coordinator
    participant L as Lookup subagent
    participant Gate as PreToolUse hook
    participant Hu as Approver
    Op->>Co: "Pay invoice INV-4471, 14200 to Acme"
    Co->>L: Task(context: invoice INV-4471 + payee)
    L-->>Co: payee Acme, invoice valid, amount 14200
    Co->>Gate: execute_transfer(amount=14200)
    Gate->>Gate: 14200 >= 10000, redirect to approval
    Gate->>Hu: request_human_approval(handoff packet)
    Note over Co,Hu: Agent pauses — waits for a verdict
    Hu-->>Co: approved by manager
    Co->>Co: resume session, proceed to execute
    Co-->>Op: "Transfer of 14200 to Acme executed after approval."
```

Notice the coordinator *intended* to transfer directly; the **hook redirected it deterministically** into a human gate, the agent **paused**, and execution only continued on an approved verdict. With only a prompt instruction ("escalate transfers over $10k"), the model would comply ~90% of the time — and the 1-in-10 miss is an un-recallable wire transfer.

### Validation

- **Determinism test:** fire 100 transfers of $10,000 and assert 100 approval requests and **zero** auto-executions. A prompt-only design will leak; the hook design must be 100%.
- **Boundary test:** assert `$9,999.99` auto-executes and `$10,000.00` routes to approval — get the `>=` vs `>` boundary right (off-by-one here is a compliance hole).
- **Resume test:** approve a paused case and assert exactly one `execute_transfer`; reject another and assert **no** transfer and a clear operator explanation.
- **Handoff-completeness test:** assert the approval payload contains payee, invoice, amount, and reason with no reference to "see the conversation" (the approver has no transcript — §9.3).
- **Least-privilege test:** assert the `payee_lookup` subagent cannot call `execute_transfer`.
- **Disambiguation test:** when `get_payee` returns two matches, assert the agent asks for an identifier instead of paying either (§9.1).

### Common pitfalls

- Putting the $10,000 rule in the system prompt instead of a hook — probabilistic, not guaranteed (§9.5).
- Treating the gate as a hard *stop* instead of a *pause-and-resume*: a real human-in-the-loop must continue after approval, not dead-end (§9.6 resume step).
- A lossy handoff ("large payment, please approve") that forces the approver to re-investigate, since they cannot see the transcript (§9.3).
- Escalating on operator *frustration* about a delay instead of on the *amount* — tone is not a trigger (§9.1).
- Guessing a payee when the lookup is ambiguous instead of asking for an identifier (§9.1).
- Treating assistant text like "Payment sent" as the completion signal instead of `stop_reason == "end_turn"` (Chapter 3, §3.1).

## 9.7 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Reliable triggers | Escalate on *facts* — explicit human request, policy gap, can't-progress, over-threshold, ambiguous match — not on sentiment or self-rated confidence (§9.1). |
| Immediate vs. nuanced | An explicit "get me a human" escalates **immediately**; in-scope complaints follow acknowledge → resolve → escalate-on-reiteration (§9.2). |
| Policy gaps | A silent/ambiguous policy is escalated, not denied and not improvised (§9.1–9.2). |
| Structured handoff | The human sees only the packet, not the transcript — make it complete, with IDs, actions taken, recommendation, and reason (§9.3). |
| Confidence calibration | Use calibrated *field-level* scores against labeled data; an aggregate accuracy can mask a failing segment — audit with stratified sampling (§9.4). |
| Hooks vs. prompts | Financial/irreversible escalation gates must be **deterministic hooks**, not prompt instructions (§9.5). |
| Human-in-the-loop, not just stop | A true approval gate **pauses, waits for a verdict, and resumes** — it doesn't dead-end the workflow (§9.6). |

> **Maps to Domain 1 (27%) and Domain 5 (15%).** If you can build and defend the payment-approval agent above — correct triggers, the right escalation pattern, a self-contained handoff, calibrated routing, and a deterministic approval gate that pauses and resumes — you have the human-in-the-loop core that these two domains test.

# Chapter 10: Error Handling in Multi-agent Systems

> Documentation: [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) | [Subagents](https://platform.claude.com/docs/en/agent-sdk/subagents) | [Streaming & errors](https://platform.claude.com/docs/en/api/errors) | [Tool results](https://platform.claude.com/docs/en/build-with-claude/tool-use)

In a single-agent system a failure is usually visible — the loop stops, an exception surfaces, the user sees an error. In a **multi-agent** system failures hide. A subagent times out, returns an empty list, or silently degrades, and the coordinator — which never saw the failure, only the (missing) result — synthesizes a confident final answer over a hole in the data. This chapter is the reliability backbone of **Domain 5 — Context Management and Reliability (15% of the exam)** (specifically §5.3, error propagation), and it is where **Domain 1 — Agent Architecture and Orchestration (27%)** is stress-tested: orchestration that looks correct on the happy path falls apart the first time a spoke fails.

The governing principle of the whole chapter: **a subagent's job on failure is not to recover silently, but to report enough structured context that the *coordinator* can decide what to do.** Recovery is a coordinator-level concern because only the coordinator sees the whole task.

By the end you should be able to reason about six things and assemble them into a resilient orchestrator:

- **Error taxonomy** (§10.1) — classify a failure so the *right* action is even possible.
- **Anti-patterns** (§10.2) — the four ways multi-agent error handling silently goes wrong.
- **Structured error reporting** (§10.3) — the subagent → coordinator contract.
- **Resilience patterns** (§10.4) — retries with backoff, timeouts, circuit breakers, idempotency, graceful degradation.
- **Error aggregation & coverage annotation** (§10.5) — how the coordinator reports partial success honestly.
- **A complete resilient travel-booking orchestrator** (§10.6) — end-to-end.

§10.7 distills what the exam tests.

## 10.1 Error Categories

Before you can handle an error you must **classify** it, because the correct action is different for each class. The single most common multi-agent bug is applying the wrong action to a class — retrying a validation error forever, or escalating a transient blip that a single retry would have fixed.

| Category | Examples | Retryable? | Correct agent action |
|---|---|---|---|
| **Transient** | Timeout, HTTP 503, rate-limit (429), network reset | **Yes** | Retry with exponential backoff + jitter; cap attempts |
| **Validation** | Invalid input format, missing required field, schema mismatch | **No** (retrying won't help) | Fix the input, then retry once with corrected request |
| **Business** | Policy violation, threshold exceeded, no availability | **No** | Explain to the user; propose an alternative; do not retry |
| **Permission** | Access denied, expired credential, scope error | **No** | Escalate to a human / re-auth; never silently swallow |

**Why the classification gate matters (exam angle).** Retryability is a *property of the error class*, not of the situation. A `429 Too Many Requests` is transient — back off and retry. A `400 missing field "destination"` is a validation error — retrying the identical request just burns latency and tokens; you must *change* the request first. The exam frequently presents a failure and asks for the correct response; the trap answer applies a transient strategy (retry) to a non-retryable class (business/validation/permission).

**Pitfall — collapsing classes into one generic "error".** If a subagent reports only "failed", the coordinator cannot pick an action. The whole point of §10.3 is to preserve the *class* (and more) so the coordinator's decision is informed rather than a guess.

**Pitfall — treating "no results" as an error (or vice-versa).** An empty result set from a search that *ran successfully* is a **valid business outcome** ("nothing matched"), not a transient failure. Retrying it is pointless. Conversely, a timeout that *returns nothing* is an access failure that may succeed on retry. Distinguishing these two — which look identical if you only inspect the (empty) payload — is explicitly tested in Domain 5.3 and is the subject of §10.2.

## 10.2 Error-handling Anti-patterns

These four anti-patterns are the recurring "wrong answers" in multi-agent reliability questions. Each one destroys information the coordinator needs.

| Anti-pattern | Why it breaks the system | Correct approach |
|---|---|---|
| **Generic status** ("search unavailable") | The coordinator can't tell transient from permanent, so it can't choose retry vs. degrade | Return error *type*, the query attempted, partial results, and alternatives (§10.3) |
| **Silent suppression** (empty result treated as success) | Coordinator believes there were genuinely no matches when the search actually *failed* — a hole in the data presented as fact | Distinguish "no results" (business) from "search failure" (transient); never return `[]` for a crash |
| **Abort-the-world** (one subagent fails → kill the whole workflow) | You discard the 80% that succeeded; one flaky spoke takes down a multi-hour job | Continue with partial results; annotate the gap (§10.5) |
| **Infinite in-subagent retries** | Latency and cost balloon; the coordinator is blind to the stall; a circuit never opens | **Local** recovery only (1–2 bounded retries), then propagate a structured error to the coordinator |

```mermaid
flowchart TD
    Sub[Subagent hits a failure] --> Cls{Classify the error}
    Cls -->|transient| Loc[Local recovery<br/>1 to 2 bounded retries<br/>with backoff]
    Cls -->|validation| Fix[Correct the request<br/>retry once]
    Cls -->|business or permission| Prop[Propagate immediately<br/>no retry]
    Loc -->|still failing| Prop
    Fix -->|still failing| Prop
    Prop --> Struct[Return STRUCTURED error<br/>type, query, partial, alternatives]
    Struct --> Coord[Coordinator decides<br/>retry, degrade, reroute, or escalate]
```

**The division of labor (the exam's core mental model).** The *subagent* does **bounded local recovery** for transient errors and then **reports up** with structure. The *coordinator* owns the **strategic** decision — retry with a different query, route to a backup subagent, drop the section and annotate, or escalate. An anti-pattern is any design where the subagent either (a) retries forever (never reporting up) or (b) reports up with no structure (the coordinator can't decide). Resilience lives in the *interaction*, not in either agent alone.

## 10.3 The Subagent → Coordinator Contract: A Structured Error

A subagent that cannot complete its task should not raise a bare exception or return an empty result. It should return a **structured error object** that gives the coordinator everything it needs to choose a recovery path:

```json
{
  "status": "partial_failure",
  "failure_type": "timeout",
  "attempted_query": "AI impact on music industry 2024",
  "partial_results": [
    {"title": "AI Music Generation Report", "url": "...", "relevance": 0.8}
  ],
  "alternative_approaches": [
    "Try a narrower query: 'AI music composition tools'",
    "Use an alternative data source"
  ],
  "coverage_impact": "Not covered: AI impact on music production"
}
```

Each field exists to answer a specific coordinator question:

- **`status`** — `success` | `partial_failure` | `failure`. Lets the coordinator branch without parsing prose. (Distinct from "empty success" — see §10.2.)
- **`failure_type`** — the §10.1 class (`timeout`, `validation`, `business`, `permission`). Drives the *retry-vs-not* decision.
- **`attempted_query`** — what was tried, so the coordinator can retry *differently* rather than identically.
- **`partial_results`** — anything that *did* succeed, so partial work is never thrown away (defeats abort-the-world).
- **`alternative_approaches`** — subagent-suggested next moves; the subagent has the most local context about *why* it failed.
- **`coverage_impact`** — the precise gap, so the final synthesis can be annotated honestly (§10.5).

With this object the coordinator can decide, deterministically and from data rather than guesswork:

- **Retry with a modified query?** (transient + a narrower alternative)
- **Use the partial results as-is?** (good-enough coverage)
- **Delegate to a different subagent / data source?** (the primary is down)
- **Continue without this section and annotate the gap?** (degrade gracefully)

**Exam angle.** Questions contrast a "thin" error (`{"error": "search failed"}`) against this "thick" structured error and ask which enables better recovery. The structured object wins because it preserves *class*, *partial work*, and *alternatives* — exactly the inputs a recovery decision needs. The thin error forces the coordinator to guess, which usually means abort-the-world or a blind retry.

## 10.4 Resilience Patterns

The structured contract (§10.3) is *what* a subagent reports. The patterns below are *how* it recovers locally before reporting, and how the coordinator stays healthy under repeated failure. These are the named patterns the exam expects you to recognize and place correctly.

### 10.4.1 Retry with Exponential Backoff and Jitter

For **transient** errors only, retry — but not immediately and not forever. Each retry waits longer (exponential), with random **jitter** so that many agents retrying after a shared outage don't synchronize into a "thundering herd" that hammers the recovering service at the same instants.

```python
import random, time

def call_with_backoff(fn, *, max_attempts=3, base=0.5, cap=8.0):
    for attempt in range(max_attempts):
        try:
            return fn()
        except TransientError:
            if attempt == max_attempts - 1:
                raise                      # bounded: give up, let caller propagate
            delay = min(cap, base * (2 ** attempt))   # 0.5s, 1s, 2s ...
            time.sleep(delay + random.uniform(0, delay))  # full jitter
```

**Pitfalls:** retrying *non-transient* errors (a 400 will fail identically every time); unbounded attempts (latency/cost blow-up — see §10.2); no jitter (synchronized retries amplify the outage). Retries belong **inside** the subagent as bounded *local* recovery; the *coordinator* does not micro-manage them.

### 10.4.2 Timeouts

Every external call and every `Task` delegation needs a **deadline**. Without one, a single hung dependency stalls the whole orchestration indefinitely — the worst failure mode because nothing reports up. A timeout converts an invisible hang into a *visible, classifiable* `timeout` error that flows through §10.3.

```python
result = await asyncio.wait_for(subagent.run(task), timeout=20.0)  # else TimeoutError
```

Budget timeouts hierarchically: the coordinator's overall deadline must exceed the sum (or max, if parallel) of the subagent deadlines plus retry time, or the coordinator will kill subagents that were about to succeed.

### 10.4.3 Circuit Breaker

If a downstream dependency (e.g., the hotel API) is *already* failing, sending it more retrying traffic makes the outage worse and burns your latency budget on calls that will fail. A **circuit breaker** tracks recent failures and, once a threshold is crossed, **opens** — short-circuiting calls to that dependency for a cool-down window and failing fast instead. After the cool-down it goes **half-open**, lets one probe through, and **closes** again on success.

```mermaid
flowchart TD
    Closed[CLOSED<br/>calls pass through] -->|failures over threshold| Open[OPEN<br/>fail fast, skip the call]
    Open -->|cool-down elapsed| Half[HALF-OPEN<br/>allow one probe]
    Half -->|probe succeeds| Closed
    Half -->|probe fails| Open
```

**Exam angle.** The breaker is the antidote to "retry storms": retries (§10.4.1) help an *individual* call ride out a *blip*; the breaker protects the *system* from a *sustained* outage by stopping the retries entirely. Recognize them as complementary, not alternatives — backoff for the transient, breaker for the persistent.

### 10.4.4 Idempotency

When you retry an action with side effects (charge a card, book a seat, send an email), the first attempt **may have succeeded** even though you got a timeout. Retrying naively **double-books**. The fix is an **idempotency key**: the caller generates a unique key per logical operation and sends it on every retry; the downstream service records the key and returns the *original* result for any repeat, performing the side effect **exactly once**.

```python
key = idempotency_key(booking_id, leg="flight")   # stable across retries
book_flight(flight_id, idempotency_key=key)        # safe to retry: at-most-once effect
```

**Rule:** retries (§10.4.1) and idempotency (§10.4.4) are a **pair**. Retrying a non-idempotent side effect is itself an anti-pattern — never enable one without the other.

### 10.4.5 Graceful Degradation & Fallbacks

When a non-critical capability fails permanently, the system should **continue with reduced scope** rather than abort. Define, per capability, what "degraded" looks like: a fallback data source, a cached value, or simply *omitting* an optional section and annotating it (§10.5). Critical capabilities (the ones the task is *for*) may instead require escalation — degradation is for the *optional* parts.

## 10.5 Error Aggregation and Coverage Annotation

When subagents run in parallel, the coordinator receives a **mix** of successes and structured errors. Its job is to **aggregate** them into one honest result — never to hide the failures. The deliverable must make explicit *what is well-supported* versus *where the gaps are*, so a human reading it is not misled into trusting an incomplete section.

```markdown
## Report: AI Impact on Creative Industries

### Visual Art (FULL COVERAGE)
[research results]

### Music (PARTIAL COVERAGE — search agent timeout)
[partial results]
⚠️ Note: coverage for this section is limited due to a timeout in the search agent.

### Literature (FULL COVERAGE)
[research results]
```

**Why annotation, not omission.** Silently dropping the Music section would be a §10.2 *silent-suppression* failure at the coordinator level: the reader would assume the report is complete. The annotation converts a hidden hole into a *declared* limitation — the reader can decide whether the gap matters and whether to re-run. This is the coordinator-side mirror of the subagent's `coverage_impact` field.

**Exam angle.** A correct multi-agent design **propagates partial success with provenance**: full vs. partial coverage is labeled per section, and the *cause* (which agent, which failure type) is named. Designs that either abort on first failure or present partial data as complete are both wrong.

## 10.6 End-to-End Case Study: A Resilient Travel-Booking Orchestrator

The patterns above only matter when they hold together under real failure. Here is a complete orchestrator that exercises every one of them — distinct from the refund agent of Chapter 3 because the hard part here is not a business rule but **surviving partial failure of independent, side-effecting subagents**.

### Requirements

- Book a trip from one natural-language request: a **flight**, a **hotel**, and (optionally) a **rental car**, each via a separate downstream API behind its own subagent.
- The three bookings run **in parallel** (they're independent).
- **Transient** failures (timeout, 503) of any leg must be **retried with backoff**, but bounded.
- A leg's API that is *persistently* down must **trip a circuit breaker** so the orchestrator fails fast instead of stalling the trip.
- Bookings have side effects — **a retry must never double-book** (idempotency).
- The **car is optional**: if it can't be booked, the trip still completes with the car **gracefully degraded** (annotated, not aborted).
- The **flight and hotel are critical**: if either ultimately fails, the orchestrator must **roll back** any completed legs and escalate — never leave the customer with a half-booked trip.

### Architecture

```mermaid
flowchart TD
    User([Traveler]) --> Coord[Booking Coordinator]
    Coord -->|Task, parallel| F[Flight subagent<br/>retry plus breaker]
    Coord -->|Task, parallel| H[Hotel subagent<br/>retry plus breaker]
    Coord -->|Task, parallel| C[Car subagent<br/>optional]
    F -. structured result .-> Coord
    H -. structured result .-> Coord
    C -. structured result .-> Coord
    Coord --> Agg{Aggregate results}
    Agg -->|flight and hotel ok| Done[Confirm trip<br/>annotate car if degraded]
    Agg -->|critical leg failed| Rb[Roll back booked legs<br/>idempotent cancel] --> Esc[Escalate to human]
```

The coordinator owns aggregation and the critical-vs-optional policy; each subagent owns **bounded local recovery** (backoff) and a **breaker** on its own API; **idempotency keys** make both booking and rollback safe to retry.

### Implementation

Define the coordinator and three least-privilege subagents. Each booking subagent gets only its own booking + cancel tools:

```python
coordinator = AgentDefinition(
    name="booking_coordinator",
    description="Books flight + hotel (critical) and car (optional); degrades or rolls back on failure.",
    system_prompt=(
        "Book the trip by delegating each leg in parallel. Flight and hotel are required; "
        "the car is optional. If a critical leg cannot be booked, roll back booked legs and escalate. "
        "Report coverage honestly — never present a half-booked trip as complete."
    ),
    allowed_tools=["Task", "cancel_booking", "escalate_to_human"],
)

flight_agent = AgentDefinition(
    name="flight_agent",
    description="Books one flight. Bounded retries; reports structured errors.",
    system_prompt="Book the requested flight. On transient error retry up to 2x with backoff, then report.",
    allowed_tools=["book_flight", "cancel_flight"],   # least privilege: only its own API
)
# hotel_agent, car_agent defined analogously
```

Each subagent's local recovery combines **backoff** (transient only), a **circuit breaker** (per-API), **idempotency** (safe retry), and a **timeout** — then returns the §10.3 structured object:

```python
def book_leg(book_fn, args, *, breaker, idem_key):
    if breaker.is_open():                       # §10.4.3 fail fast — API known-down
        return structured_error("breaker_open", args, partial=None,
                                alt=["retry after cool-down", "try backup provider"])
    try:
        # §10.4.4 idempotency + §10.4.2 timeout + §10.4.1 bounded backoff
        result = call_with_backoff(
            lambda: with_timeout(book_fn, **args, idempotency_key=idem_key, timeout=20.0)
        )
        breaker.record_success()
        return {"status": "success", "booking": result}
    except TransientError as e:                 # exhausted bounded retries
        breaker.record_failure()
        return structured_error("timeout", args, partial=None,
                                alt=["try backup provider"])
    except ValidationError as e:                # §10.1 non-retryable
        return structured_error("validation", args, partial=None,
                                alt=["correct dates/passenger info"])
```

The coordinator aggregates the three results and applies the **critical-vs-optional** policy:

```python
def aggregate(flight, hotel, car):
    booked = [r["booking"] for r in (flight, hotel, car) if r["status"] == "success"]
    if flight["status"] != "success" or hotel["status"] != "success":
        for b in booked:                        # §10.4.4 idempotent rollback
            cancel_booking(b["id"], idempotency_key=cancel_key(b["id"]))
        return escalate_to_human(reason="critical_leg_failed", context=[flight, hotel])
    if car["status"] != "success":              # §10.4.5 + §10.5 degrade + annotate
        return confirm_trip(flight, hotel, car_note="⚠️ Car unavailable — booked flight + hotel only.")
    return confirm_trip(flight, hotel, car)
```

### Execution trace

A run where the hotel API has a transient blip (recovers on retry) and the car API is hard-down (breaker open) — the trip still completes, gracefully degraded:

```mermaid
sequenceDiagram
    actor T as Traveler
    participant Co as Coordinator
    participant F as Flight agent
    participant H as Hotel agent
    participant C as Car agent
    T->>Co: "Book me LON to TYO, hotel, and a car"
    par Parallel delegation
        Co->>F: Task book_flight (idem key F)
        Co->>H: Task book_hotel (idem key H)
        Co->>C: Task book_car (idem key C)
    end
    F-->>Co: success booking FL-91
    H->>H: 503, backoff 1s, retry succeeds
    H-->>Co: success booking HT-44
    C->>C: breaker OPEN, fail fast
    C-->>Co: partial_failure breaker_open, alt backup provider
    Co->>Co: flight + hotel ok, car optional
    Co-->>T: "Trip confirmed (flight + hotel). Car unavailable — annotated."
```

Notice three chapter concepts firing at once: the hotel leg **retried with backoff** and recovered (§10.4.1); the car leg's **breaker was already open** and failed fast instead of stalling (§10.4.3); and the coordinator **degraded gracefully** on the optional leg while still confirming the critical ones (§10.4.5 + §10.5) — rather than aborting the whole trip.

### Validation

- **Backoff bound test:** force a leg to 503 forever; assert it retries *exactly* the cap (e.g., 3) then returns a structured `timeout` error — never hangs, never loops infinitely (§10.4.1, §10.2).
- **Idempotency test:** fire the same booking twice with the same key (simulating a retry after a timeout that actually succeeded); assert **one** booking exists, not two (§10.4.4).
- **Breaker test:** drive the car API past the failure threshold; assert the next calls fail fast (no API hit) until the cool-down, then a half-open probe closes it (§10.4.3).
- **Degradation test:** fail only the car; assert the trip is **confirmed** with the annotation, and the flight/hotel bookings are **not** rolled back (§10.4.5, §10.5).
- **Rollback test:** fail the hotel (critical); assert any successful flight booking is **cancelled idempotently** and the case is **escalated** — no half-booked trip survives.

### Common pitfalls

- Retrying the `validation` failure (bad passenger info) with backoff — it will fail identically; you must *correct the input*, not retry (§10.1).
- Booking with retries but **no idempotency key** → a timed-out-but-successful first attempt double-books (§10.4.4).
- Letting one failed leg **abort the whole trip** instead of degrading the optional car / rolling back only on a *critical* failure (§10.2, §10.4.5).
- Subagents that **retry forever** internally, so the coordinator never learns the car API is down and the breaker never opens (§10.2, §10.4.3).
- Returning `[]` (empty) for the car when it actually crashed, so the coordinator reports "no car needed" instead of "car unavailable" (§10.2 silent suppression).

## 10.7 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Error taxonomy | Retryability is a property of the *class*: retry transient; fix-then-retry validation; explain business; escalate permission (§10.1). |
| No-results vs. failure | A successful-but-empty result is a business outcome; a timeout returning nothing is transient — never conflate them (§10.1–10.2). |
| Structured error contract | Subagents return `failure_type` + `attempted_query` + `partial_results` + `alternatives` so the coordinator can decide, not guess (§10.3). |
| Local vs. strategic recovery | Subagent does **bounded** local retries then **propagates**; the coordinator owns retry/degrade/reroute/escalate (§10.2–10.3). |
| Backoff + jitter | Exponential backoff with jitter for transient errors; bounded attempts; no thundering herd (§10.4.1). |
| Circuit breaker | Opens after sustained failure to fail fast and protect the system; complements (not replaces) retries (§10.4.3). |
| Idempotency | Retrying a side-effecting action requires an idempotency key — retries and idempotency are a pair (§10.4.4). |
| Graceful degradation | Continue with reduced scope on optional-capability failure; annotate the gap rather than abort (§10.4.5, §10.5). |
| Coverage annotation | Aggregate honestly: label full vs. partial coverage and name the cause; never present partial data as complete (§10.5). |

> **Maps to Domain 5 (15%, error propagation §5.3) and Domain 1 (27%, orchestration).** If you can build and defend the travel-booking orchestrator above — classify, retry with backoff, break the circuit, stay idempotent, degrade the optional and roll back the critical, and annotate coverage — you have the reliability core these two domains test.

# Chapter 11: Context Management in Production Systems

> Documentation: [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) | [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing)

The context window is the only memory a model has. Everything the agent "knows" at any instant — the system prompt, the tool definitions, every prior tool result, the whole conversation — has to fit inside a finite token budget, and the moment that budget fills or fragments, the agent starts forgetting facts, hedging with "typical patterns," and contradicting itself. **Context management is the discipline of keeping the *right* tokens in the window and the wrong ones out — turn after turn, across compaction, across whole sessions.** This chapter is the backbone of **Domain 5 — Context Management and Reliability (15% of the exam)**, and it underpins every long-running agent in Domains 1–4.

By the end you should be able to reason about a budget and seven techniques, then assemble them into an agent that survives a multi-day investigation:

- **The context budget and its failure modes** (§11.1) — what fills the window and how recall degrades (lost-in-the-middle, context rot).
- **Fact extraction into a durable block** (§11.2) — surviving summarization without losing numbers and IDs.
- **Trimming tool results** (§11.3) — keeping 5 fields out of 40, deterministically.
- **Position-aware assembly** (§11.4) — putting high-signal tokens where the model actually reads them.
- **Sliding window vs. summarization vs. compaction** (§11.5) — three ways to shed history, and when each is right.
- **Just-in-time retrieval and scratchpad/memory** (§11.6) — references over payloads, and persistence across context resets.
- **Subagent isolation and prompt caching** (§11.7) — protecting the main window and paying for stable prefixes only once.

§11.8 then builds a complete **long-horizon codebase security-audit agent** end-to-end, §11.9 ties this to the modern *context engineering* vocabulary, and §11.10 distills what the exam tests.

## 11.1 The Context Budget and How It Fails

Treat the window as a budget you actively allocate, not a bucket you fill. Every request renders in a fixed order — **`tools` → `system` → `messages`** — and the running total of those segments is what you are managing:

```mermaid
flowchart TD
    Budget[Context window budget<br/>finite tokens] --> Sys[System prompt<br/>stable, set once]
    Budget --> Tools[Tool definitions<br/>stable, set once]
    Budget --> Hist[Message history<br/>grows every turn]
    Hist --> Results[Tool results<br/>often the largest, noisiest part]
    Results --> Rot{Approaching<br/>the limit?}
    Rot -->|no| Continue[Keep running normally]
    Rot -->|yes| Shed[Shed history<br/>trim, summarize, or compact]
    Shed --> Continue
```

**Why this matters — context is a finite resource, and bigger windows do not repeal the problem.** Even with 200K–1M-token windows, recall degrades as the token count grows, a phenomenon Anthropic calls **context rot**: attention has to relate every token pair, an n² cost that stretches thin over long inputs, so signal-to-noise — not raw capacity — is what governs quality. A bigger budget *delays* the failure; it does not prevent it.

**The four failure modes the exam expects you to name:**
- **Progressive summarization loss** — each time history is summarized, precise values (amounts, percentages, dates, IDs) get compressed into vague prose ("the customer wanted a refund") and are gone for good.
- **Lost-in-the-middle** — models reliably attend to the *start* and *end* of a long input but reliably miss material buried in the *middle*. A critical finding placed in the center of a 60-file dump may simply not be used.
- **Tool-result bloat** — tool outputs accumulate in the window disproportionately to their relevance; a `lookup_order` that returns 40 fields when 5 are needed spends 8× the tokens it should, on every turn it stays in history.
- **Context degradation in long sessions** — past a threshold the model produces unstable answers and starts referring to "typical patterns" or generic class names instead of the specific symbols it read earlier.

**Exam angle:** questions rarely ask "how big is the window." They give you a *symptom* — the agent forgot the order amount after a long chat, or missed a vulnerability that was clearly in the results — and ask you to name the mechanism and the mitigation. Map symptom → cause → fix (§11.2–§11.7).

## 11.2 Extract Facts into a Durable Block

Conversation history is the *wrong* place to store load-bearing facts, because history is exactly what gets summarized and lost. Instead, lift the transactional facts into a structured block that you re-inject verbatim on **every** prompt, independent of how the rest of the history is compacted:

```
=== CASE FACTS (updated whenever a new fact appears) ===
Customer ID: CUST-12345
Order ID: ORD-67890
Order Date: 2025-01-15
Order Amount: $89.99
Issue: Damaged item on delivery
Customer Request: Full refund
Status: Pending manager approval
===
```

Include this block in every prompt, regardless of how history is summarized.

**Why it works:** the facts block is *append-controlled state* that lives outside the summarizable transcript. When compaction collapses 30 turns into a paragraph, the paragraph can be lossy — but the facts block is copied through untouched, so `$89.99` and `ORD-67890` never blur into "the order."

**Pitfalls:**
- Letting the block grow unbounded — it then becomes part of the bloat problem. Keep it to *durable identifiers and decisions*, not running narration.
- Storing facts only in prose history and *trusting* the summarizer to preserve numbers — it will not, reliably.
- Forgetting to update the block when a fact changes (e.g., `Status` moves to `Approved`), leaving the model reasoning from stale state.

**Exam angle:** the classic stem is "after a long conversation the agent quoted the wrong refund amount." The right answer is a persistent facts block injected every turn — *not* "use a bigger model" or "increase the context window."

## 11.3 Trimming Tool Results

A tool result is raw data, and most of it is noise for the current step. Trim it deterministically with a `PostToolUse` hook so the model never even sees the 35 fields it does not need:

```python
# PostToolUse hook: keep only relevant fields
@hook("PostToolUse", tool="lookup_order")
def trim_order_fields(result):
    return {
        "order_id": result["order_id"],
        "status": result["status"],
        "total": result["total"],
        "items": result["items"],
        "return_eligible": result["return_eligible"]
    }
```

This conserves context and reduces noise.

**Why a hook and not a prompt:** "please ignore irrelevant fields" is probabilistic — the tokens are still in the window costing budget and inviting distraction even if the model nominally ignores them. A `PostToolUse` hook removes them *before* they reach the model, so the saving is deterministic and compounds on every turn the result would otherwise linger in history.

**Pitfalls:**
- Over-trimming: dropping a field you later need (e.g., `customer_id` for a downstream call) forces a re-fetch — costing more than you saved. Trim to the task, and widen deliberately.
- Trimming *display* but not *context*: showing the user 5 fields while still feeding all 40 to the model defeats the purpose.
- Trimming away provenance (source URL, record id) that a later synthesis step needs to attribute a claim (see Chapter 12).

**Exam angle:** "a tool returns 40+ fields but the task needs 5" is a direct Domain 5.1 skill — the answer is a `PostToolUse` trim hook, framed as token-budget hygiene, not cosmetic cleanup.

## 11.4 Position-Aware Assembly

Because of lost-in-the-middle, *where* you place information changes whether it gets used. When you assemble aggregated data for the model, put the high-signal material at the **top and bottom** and bury bulk detail in the middle:

```
[KEY FINDINGS — at the top]
Found 3 critical vulnerabilities...

[DETAILED RESULTS — middle]
=== File auth.ts ===
...
=== File database.ts ===
...

[ACTION ITEMS — at the end]
Priority: fix auth.ts vulnerabilities before merge.
```

**Why it works:** the top anchors the model's interpretation of everything that follows; the bottom is the most recently read and most heavily attended position, ideal for the directive you most want obeyed. The voluminous, scannable detail goes in the middle precisely because it tolerates weaker attention — the model can retrieve from it on demand without needing to hold all of it.

**Pitfalls:**
- Leading with raw dumps and trailing with nothing actionable — the one instruction you cared about lands in the dead zone.
- Relabeling sections without reordering them: headings help, but *position* is the stronger lever.
- Assuming a 1M-token model is immune — the effect shrinks but does not vanish; place deliberately regardless of window size.

**Exam angle:** given "the agent missed a finding that was clearly in the results," recognize lost-in-the-middle and prescribe summary-at-top + explicit section headings, not "the model is broken."

## 11.5 Sliding Window vs. Summarization vs. Compaction

When history outgrows the budget you have three ways to shed it — and the exam wants you to pick the right one for the situation:

```mermaid
flowchart TD
    Over[History exceeds budget] --> Q{What must survive?}
    Q -->|recent turns only| SW[Sliding window<br/>drop oldest verbatim turns]
    Q -->|decisions and facts<br/>across the whole run| Sum[Summarization<br/>condense old turns to a recap]
    Q -->|near the limit, server-side| Comp[Compaction<br/>API summarizes history, continue from it]
    SW -.- Risk1[Risk — silently drops<br/>early facts, pair with a facts block]
    Sum -.- Risk2[Risk — lossy on numbers<br/>and provenance]
    Comp -.- Risk3[Risk — must append the<br/>compaction block back next request]
```

- **Sliding window** keeps the last *N* turns verbatim and drops the oldest. Cheap and lossless for what it keeps, but it amputates early context — fine for chit-chat, dangerous for an investigation whose key fact was established on turn 2. **Always pair a sliding window with a §11.2 facts block** so the amputated facts survive.
- **Summarization (progressive)** condenses old turns into a running recap, preserving decisions across the whole run at the cost of precision — this is the technique whose loss §11.1 warns about, so explicitly instruct it to *preserve key decisions, numbers, and provenance* and verify it did.
- **Compaction** is the server-side version: when nearing the limit, the API summarizes the history and you continue from the summary. **Critical operational detail:** you must append the entire `response.content` (including the compaction block) back on the next request, or the compacted state is lost. The `/compact` command and the Agent SDK do this automatically.

**Why the distinction matters:** they fail differently. Sliding window loses *old* content silently; summarization loses *precision* everywhere; compaction loses *nothing* if you replay the block but loses *everything compacted* if you forget to. Choosing is a function of "what must survive."

**Exam angle:** a long investigation that must remember a specific class signature → summarization that explicitly preserves it, or a facts block — *not* a naive sliding window that would drop it. "Use `/compact` to reduce context during a long investigation" is the expected Domain 5.4 skill.

## 11.6 Just-in-Time Retrieval, Scratchpad, and Memory

The cheapest token is the one you never load. Instead of pre-loading entire files or datasets, keep **lightweight references** — file paths, URLs, record IDs — and fetch the actual content with a tool only when you need it.

**Scratchpad files** are the in-session form of this. During a long investigation the agent writes key findings to a file and reads them back later instead of re-deriving them:

```
# investigation-scratchpad.md
## Key findings
- PaymentProcessor in src/payments/processor.ts inherits from BaseProcessor
- refund() is called from 3 places: OrderController, AdminPanel, CronJob
- External PaymentGateway API has a rate limit of 100 req/min
- Migration #47 added refund_reason (NOT NULL) — 2024-12-01
```

When context degrades (or in a new session), the agent consults the scratchpad instead of re-running discovery.

**Memory (cross-session)** generalizes the scratchpad past the boundary of a single run: findings persisted to an external store survive context resets and whole sessions, giving a long-horizon agent coherence it could never hold in-window. The Agent SDK's memory tool and managed memory stores are the mechanism.

**Why references beat payloads:** a path is ~10 tokens; the file it points to may be 10,000. Holding the path costs almost nothing and lets the model *choose* to spend the 10,000 only when the task demands it — the n² attention cost is paid on a small working set, not the entire corpus.

**Pitfalls:**
- Writing to a scratchpad but never reading it back (it has to be in the prompt or fetched to matter).
- Stale memory: persisting a finding that later changes and never invalidating it.
- Over-retrieval: re-loading the same large file every turn instead of summarizing it once into the facts block or scratchpad.

**Exam angle:** "the agent re-reads the same 15 files every time context degrades" → scratchpad/memory + just-in-time retrieval. "It loses all findings when the session restarts" → cross-session memory, not a bigger window.

## 11.7 Subagent Isolation and Prompt Caching

Two structural techniques protect and pay for the window rather than merely pruning it.

**Subagent isolation** delegates verbose, exploratory work to a subagent with its *own* clean context window; the subagent does the messy reading and returns a condensed result, so the main agent's window holds one line instead of fifteen files:

```
Main agent: "Investigate dependencies of the payments module"
  -> Subagent (Explore): reads 15 files, traces imports
  -> Returns: "Payments depends on AuthService, OrderModel, and the external PaymentGateway API"

Main agent: keeps one line in context instead of 15 files
```

**Separate context layer:** in multi-agent systems each subagent operates within a limited context budget — it receives only the information required for its task. The coordinator acts as a separate context layer: it aggregates subagent outputs, stores global state, and allocates context. This prevents "context leakage," where one agent consumes the window with information irrelevant to others.

**Constrained context budgets for subagents:**
- Send minimal context: a specific task + necessary data (subagents inherit nothing automatically — see Chapter 3).
- Instruct the subagent to return *structured* results, not raw data dumps.
- Use `allowedTools` to limit the subagent's toolset — fewer tools means fewer distractions and lower context cost.

**Prompt caching** addresses the *cost* of a large stable prefix. The API caches the rendered prompt up to a `cache_control` breakpoint; on later requests the cached prefix reads at **~0.1×** instead of being re-billed at full price (writes cost 1.25× for the 5-minute TTL, 2× for 1-hour; max **4** breakpoints):

```python
system=[
    {"type": "text", "text": LARGE_AUDIT_RUBRIC,            # stable across every file
     "cache_control": {"type": "ephemeral"}},               # cache the prefix up to here
]
```

**Why the breakpoint placement is the whole game:** caching is a *prefix match* in render order `tools → system → messages`, so any byte change before the breakpoint invalidates everything after it. Put the breakpoint after the stable rubric/tool defs and *before* the volatile per-file content — and never interpolate a timestamp, request id, or username into the system prefix, or you defeat the cache on every call.

**Pitfalls:**
- Caching a prefix that contains volatile content → cache reads stay zero and you pay the write premium for nothing.
- Returning raw dumps from subagents → you moved the bloat, you did not remove it.
- Giving a subagent broad `allowedTools` → it wanders, inflating its own context and its summary.

**Exam angle:** "a stable 20K-token rubric is re-sent on thousands of file checks" → prompt caching with the breakpoint after the rubric. "Discovery output is drowning the main agent" → delegate to a subagent that returns a structured summary.

## 11.8 End-to-End Case Study: A Long-Horizon Codebase Security-Audit Agent

The techniques above only matter when they fit together under real pressure. Here is a complete, realistic agent of the kind Domain 5.4 asks you to reason about — an audit that is far too large for one context window and must survive across sessions.

### Requirements

- Audit a **2,400-file monorepo** against a fixed **20K-token security rubric** for injection, auth-bypass, and secret-handling defects.
- The full codebase vastly exceeds any single context window, so the agent must investigate **incrementally** and may run for **days across multiple sessions**.
- **Precise facts must survive** summarization: exact file paths, line numbers, CVE-style finding ids, and severities — never blurred into "some auth issues."
- The run **must be resumable** after a crash or a deliberate stop, picking up where it left off without re-auditing finished modules.
- Cost matters: the rubric is identical on every file check and must **not** be re-billed at full price thousands of times.

### Architecture

```mermaid
flowchart TD
    Coord[Audit coordinator<br/>holds rubric plus findings block] --> Cache{{Prompt cache<br/>rubric prefix, ~0.1x reads}}
    Coord -->|Task scan module| Sub[Scan subagent<br/>clean window, read_file and grep only]
    Sub --> Trim{{PostToolUse hook<br/>trim file reads to hits}}
    Trim --> Sub
    Sub -. structured findings only .-> Coord
    Coord --> Facts[FINDINGS block<br/>path, line, id, severity]
    Coord --> State[agent-state JSON<br/>per-module status]
    Coord --> Near{Near context<br/>limit?}
    Near -->|yes| Compact[Compaction or summary<br/>preserve FINDINGS verbatim]
    Near -->|no| Next[Dispatch next module]
    Compact --> Next
    Next --> Coord
```

The coordinator owns orchestration and the durable FINDINGS block; each module is scanned by an isolated subagent with a clean window and least-privilege read-only tools; **the rubric is cached once, file reads are trimmed deterministically, findings are persisted as facts and state, and compaction sheds only the disposable narration** — every Ch11 technique doing one job.

### Implementation

Cache the stable rubric and give the scan subagent a clean, least-privilege window (it inherits nothing — Chapter 3):

```python
coordinator = AgentDefinition(
    name="audit_coordinator",
    description="Audits a large repo module-by-module; preserves findings and resumes.",
    system_prompt=AUDIT_COORDINATOR_PROMPT,
    allowed_tools=["Task", "write_state", "read_state"],
)

scan_subagent = AgentDefinition(
    name="module_scanner",
    description="Scans one module against the rubric. Read-only.",
    system_prompt="Apply the security rubric to the given files. Return findings as JSON.",
    allowed_tools=["read_file", "grep"],          # least privilege: cannot write or fix
)

# The 20K rubric is identical on every file check — cache it so reads bill at ~0.1x.
system = [
    {"type": "text", "text": AUDIT_RUBRIC,
     "cache_control": {"type": "ephemeral"}},     # breakpoint AFTER the stable rubric
]
```

Trim every file read to the matched region so a 1,200-line file does not sit in the window whole:

```python
@hook("PostToolUse", tool="read_file")
def keep_only_hits(result):
    # Return just the matched spans plus a few lines of context, not the entire file.
    return {"path": result["path"], "spans": extract_match_spans(result["content"])}
```

Persist findings as durable facts *and* as resumable per-module state:

```python
# agent-state/manifest.json — drives resume
{ "payments": "completed", "auth": "in_progress", "billing": "not_started" }

# The FINDINGS block, re-injected verbatim every turn (survives summarization):
# === FINDINGS (id, path:line, severity) ===
# SEC-001  src/auth/session.ts:88   HIGH   missing signature check
# SEC-002  src/payments/refund.ts:42 MED    unparameterized SQL
# ===
```

When the window nears the limit, compact — but the FINDINGS block and the state files are *outside* the summarizable history, so nothing precise is lost.

### Execution trace

```mermaid
sequenceDiagram
    actor Op as Operator
    participant Co as Coordinator
    participant Ca as Prompt cache
    participant Su as Scan subagent
    participant St as State store
    Op->>Co: Audit the monorepo
    Co->>St: load manifest (auth in_progress)
    Co->>Ca: send rubric prefix (cache write, 1.25x)
    Co->>Su: Task(scan src/auth, rubric cached)
    Ca-->>Su: rubric prefix (cache read, ~0.1x)
    Su-->>Co: findings JSON (SEC-001 HIGH at session.ts:88)
    Co->>Co: append SEC-001 to FINDINGS block
    Co->>St: mark auth completed, billing in_progress
    Note over Co: window near limit -> compact history,<br/>FINDINGS + state survive verbatim
    Op->>Co: (next day) resume
    Co->>St: load manifest -> skip auth, start billing
```

Notice three Ch11 moves in one trace: the rubric is **paid once** (write) then **read at ~0.1×** on every subsequent module; the subagent returns a **structured summary**, not the files it read; and the FINDINGS block plus state store let the agent **compact freely and resume next day** without losing a single precise finding.

### Validation

- **Fact-survival test:** force a compaction mid-run, then ask the agent for `SEC-002`'s exact `path:line` and severity. It must answer precisely — proving the FINDINGS block survived summarization, not the transcript.
- **Resume test:** kill the process after `auth` completes, restart, and assert it skips `auth` and begins `billing` from the manifest — no module re-audited.
- **Cache test:** assert `usage.cache_read_input_tokens` is non-zero on the bulk of file checks. Zero means a volatile byte (a timestamp, an unsorted field) is invalidating the rubric prefix.
- **Isolation test:** confirm the scan subagent receives the target paths *in its Task prompt* and cannot call any write tool (least privilege).

### Common pitfalls

- Storing findings in the conversation narrative instead of a durable block, then losing exact line numbers to compaction (§11.2, §11.5).
- Feeding whole files into the window instead of trimming to matched spans (§11.3) — the audit runs out of budget at module 30.
- Interpolating a per-file timestamp into the cached system prefix, so `cache_read_input_tokens` stays zero and the rubric is re-billed every call (§11.7).
- Re-auditing completed modules on resume because state was held only in-context, not in a state file (§11.6).
- Letting subagents return raw file dumps — the bloat moves to the coordinator instead of being removed (§11.7).

## 11.9 Context Engineering (Modern Framing)

> Background: this is the current Anthropic framing for the techniques in this chapter. The exam tests the underlying ideas; this vocabulary helps you connect them. Source: [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

**Context engineering** is the discipline of curating and maintaining the *optimal set of tokens* during inference — the whole information environment (system prompt, tools, external data, message history), not just the prompt. It is broader than prompt engineering: prompt engineering crafts the instructions; context engineering manages everything that lands in the window, dynamically, as the agent runs over many turns.

**Context is a finite resource.** As the token count grows, recall degrades — a phenomenon called **context rot** (attention must relate every token pair, an n² cost that stretches thin over long inputs). The goal is the *smallest set of high-signal tokens* that still does the job — not "stuff everything in."

**Core techniques (each maps to a section above):**
- **Just-in-time retrieval** — keep lightweight identifiers (file paths, URLs, IDs) and load the actual content at runtime via tools, instead of pre-loading everything (§11.6).
- **Compaction** — when nearing the limit, summarize the history, preserving key decisions and discarding redundant tool output, then continue from the summary; `/compact` and the Agent SDK do this automatically (§11.5).
- **Structured note-taking (memory)** — persist findings to external memory outside the window and retrieve them when needed, giving long-horizon coherence across context resets (§11.6).
- **Sub-agent architectures** — hand focused work to subagents with clean context windows; they return condensed summaries to the coordinator, separating detailed work from high-level synthesis (§11.7).

These are the same mitigations this chapter covers (lost-in-the-middle, progressive summarization, scratchpad files, subagent isolation) — *context engineering* is the umbrella term for doing them deliberately.

## 11.10 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Context budget & failure modes | Name the mechanism from a symptom — context rot, lost-in-the-middle, summarization loss, tool-result bloat; a bigger window delays, never repeals, the problem (§11.1). |
| Durable facts block | Persist exact amounts/dates/IDs outside the summarizable history and re-inject every turn — the fix for "agent quoted the wrong number after a long chat" (§11.2). |
| Trimming tool results | A `PostToolUse` hook keeps the 5 needed fields out of 40 — deterministic token hygiene, not cosmetics (§11.3). |
| Position-aware assembly | Summary at top, bulk in the middle, action items at the end — counter lost-in-the-middle by placement, not by hope (§11.4). |
| Sliding window vs summary vs compaction | Pick by "what must survive"; pair sliding window with a facts block; replay the compaction block or lose the state (§11.5). |
| Just-in-time retrieval & memory | References over payloads; scratchpad within a session, memory across sessions (§11.6). |
| Subagent isolation & prompt caching | Delegate verbose discovery to a clean window; cache the stable prefix (reads ~0.1×) with the breakpoint before volatile content (§11.7). |

> **Maps to Domain 5 (15%).** If you can build and defend the audit agent above — budget, facts block, trimming, placement, compaction, retrieval/memory, isolation, caching — you have the core of the reliability domain, and the context discipline every long-running agent in Domains 1–4 depends on.

# Chapter 12: Preserving Provenance

> Documentation: [Citations](https://platform.claude.com/docs/en/build-with-claude/citations) | [Search results](https://platform.claude.com/docs/en/build-with-claude/search-results) | [Tool use](https://platform.claude.com/docs/en/build-with-claude/tool-use/overview)

Provenance is the chain of evidence that ties every claim in a synthesized answer back to a specific, verifiable source. In a single-call summarizer this is merely good hygiene; in a multi-agent system it is the difference between a trustworthy report and confident fiction. This chapter is the deep dive for **Domain 5 — Context Management and Reliability (15% of the exam)**, specifically objective **5.6 (preserving provenance and handling uncertainty in multi-source synthesis)**, and it leans on the context-preservation skills from objective 5.1. The recurring exam theme is blunt: **when a subagent discovers a fact, the source must survive every hop — through trimming, summarization, conflict resolution, and final rendering — or the coordinator will emit a fabricated citation.**

By the end you should be able to reason about five things and assemble them into a report that auditors trust:

- **The attribution-loss problem** (§12.1) — how the claim → source link is severed during summarization, and the schema that prevents it.
- **Carrying source IDs through synthesis** (§12.2) — keeping provenance intact across subagent hops and context trimming.
- **Handling conflicting data** (§12.3) — annotating disagreements with attribution instead of silently picking a winner.
- **Dates and temporal interpretation** (§12.4) — why an undated number is a future contradiction.
- **Rendering by content type and refusing fabrication** (§12.5) — formatting per content type, and never inventing a citation Claude cannot point to.

§12.6 then builds a complete cited compliance-research generator end-to-end, and §12.7 distills what the exam tests.

## 12.1 The Attribution-Loss Problem

When an agent summarizes results from multiple sources, the **claim → source** link is the first casualty. The model is optimizing for a fluent paragraph, and a citation is friction; unless the data structure forces the source to travel *with* the claim, summarization strips it.

```
Bad: "The AI music market is estimated at $3.2B." (No source, no year — unverifiable.)

Good:
{
  "claim": "The AI music market is estimated at $3.2B.",
  "source_id": "src_07",
  "source_url": "https://example.com/report",
  "source_name": "Global AI Music Report 2024",
  "publication_date": "2024-06-15",
  "supporting_quote": "...the AI-assisted music segment reached USD 3.2 billion in 2024...",
  "confidence": 0.9
}
```

**Why this is hard, not just sloppy.** The failure is structural, and three forces from Domain 5.1 push against you:

- **Progressive summarization condenses specifics into vagueness.** Each time history is compressed, "$3.2B per the Global AI Music Report 2024" tends to degrade to "a few billion dollars" and the citation evaporates.
- **Lost-in-the-middle.** A source URL buried in the middle of a long tool result is exactly where the model is least reliable at retrieving it. Sources must be promoted to a structured field, not left inline in prose.
- **Verbose tool outputs dilute relevance.** A search tool returning 40 fields makes the 3 that matter (id, url, date) easy to drop during trimming.

**The fix is a contract, not a request.** Require every subagent to return a list of objects carrying `source_id`, `source_url`, `publication_date`, and a verbatim `supporting_quote`. The `supporting_quote` is the load-bearing field: it lets a downstream validator confirm the claim is actually backed by the source, and it is the single strongest defense against fabricated citations (§12.5). When the platform supports it, prefer the native **Citations** feature or **search-result content blocks**, which make Claude emit `cited_text` with character-level spans into the source — provenance the model cannot silently drop.

**Exam angle.** A stem describing "the final report says the market is $3.2B but no one can tell which source that came from" is testing 5.6. The correct answer is *require subagents to emit structured claim → source mappings (URL, document name, quote)*, **not** "add 'please cite sources' to the prompt" — a soft instruction is probabilistic and degrades under summarization.

## 12.2 Carrying Source IDs Through Multi-Agent Synthesis

Attribution rarely breaks at the search step; it breaks at the **hops** — every time a payload moves between agents or gets trimmed. Each hop is an opportunity for the source to be dropped, so provenance must be a first-class field that survives all of them.

```mermaid
flowchart TD
    Q[Research question] --> Co[Coordinator]
    Co -->|Task with full context| W1[Worker A<br/>retrieve sources]
    Co -->|Task with full context| W2[Worker B<br/>retrieve sources]
    W1 -. claims plus source_id .-> Co
    W2 -. claims plus source_id .-> Co
    Co --> Reg[(Source registry<br/>id maps to url, date, quote)]
    Co --> Syn[Synthesis<br/>cite by source_id]
    Syn --> Val{Every claim<br/>has a valid id?}
    Val -->|no| Drop[Drop or flag claim]
    Val -->|yes| Rep[Cited report plus<br/>references section]
```

**The two-table discipline.** Keep claims and sources in separate but linked structures. Workers return *claims* that reference a `source_id`; the coordinator maintains a *source registry* mapping each `source_id` to its URL, name, date, and quote. The synthesis prompt then cites by `source_id` only — it never needs to carry full URLs through the model's reasoning, which is exactly where lost-in-the-middle would corrupt them.

**Why this survives trimming.** This is the provenance-preserving application of the "case facts" pattern from objective 5.1: the source registry lives **outside** the summarized conversation history, in durable state. You can aggressively `/compact` or trim the worker transcripts, and every `source_id` in the final draft still resolves, because the registry is never summarized.

**Pitfalls the exam probes:**

- **Renumbering sources mid-pipeline.** If Worker A's "source 1" and Worker B's "source 1" collide when merged, citations silently point to the wrong document. Use globally unique IDs (`src_07`, a hash, or a UUID) assigned once at ingestion — never per-worker ordinals.
- **Passing only the prose summary upward.** If a worker returns "the market is large" without the registry, the coordinator has nothing to cite and will either omit the source or invent one. Workers must return *structured* claims, not paragraphs (this is the 5.1 skill: subagents include metadata in structured outputs).
- **Letting the coordinator paraphrase away the IDs.** The synthesis instruction must be "every sentence ends with its `[source_id]`," enforced by a post-synthesis validator (§12.6), not left to the model's goodwill.

## 12.3 Handling Conflicting Data

Real sources disagree. When two credible sources report different values, the wrong move — and a frequent exam distractor — is to **silently pick one**, average them, or report only the "latest." That discards information the user needs to judge reliability. The right move is to **preserve every value with full attribution and surface the conflict**, then let the coordinator (or a human) reconcile.

```json
{
  "claim": "Share of AI-generated music on streaming platforms",
  "values": [
    {
      "value": "12%",
      "source_id": "src_11",
      "source": "Spotify Annual Report 2024",
      "date": "2024-03",
      "methodology": "Automated classification"
    },
    {
      "value": "8%",
      "source_id": "src_19",
      "source": "Music Industry Association Survey",
      "date": "2024-07",
      "methodology": "Survey of 500 labels"
    }
  ],
  "conflict_detected": true,
  "possible_explanation": "Difference in methodology and time period"
}
```

Do not arbitrarily choose one value. Preserve both with attribution and let the coordinator decide.

**Why annotate instead of resolve.** The disagreement is frequently *not* an error — it is signal. Here the gap is explained by **methodology** (algorithmic detection vs. a 500-label survey) and **time period** (March vs. July). A subagent that "resolves" the conflict to a single 10% destroys the very metadata (methodology, date) that explains it. Provenance includes *how* a number was produced, not only *where* it came from.

**Structure the report to match.** Separate **stable findings** (sources agree) from **disputed findings** (sources conflict), so a reader instantly sees which conclusions are robust and which are contested. Annotate coverage explicitly — what is well-supported vs. where the evidence is thin or split — which is the synthesis skill from objective 5.3.

**Exam angle.** "Two subagents return different market-size figures — what should the coordinator do?" The credit-earning answer is *preserve both values with their sources and methodologies and flag the conflict for reconciliation*, **never** "trust the more recent one" or "average them." A single number with no disagreement visible is a provenance failure even if it happens to be correct.

## 12.4 Include Dates for Correct Temporal Interpretation

An undated number is a latent contradiction. Without a date, the model (or a reader) cannot tell whether two values conflict or simply describe **different points in time**, and a normal year-over-year change gets reported as an error.

```
Bad:  "Source A says 10%, source B says 15%. Contradiction."
Good: "Source A (2023) says 10%, source B (2024) says 15%. Likely +5% growth over a year."
```

**Why dates are part of provenance, not a nice-to-have.** Provenance answers *where* **and** *when*. The same source can publish different figures across editions; "the 2024 report" and "the 2023 report" are different evidence. Carry a `publication_date` (or `collection_date` for primary data) on every claim, and prefer ISO-8601 (`2024-06-15`) so dates sort and compare unambiguously across locales and tools.

**Pitfall — the "latest wins" reflex.** Dropping the older value because a newer one exists is a different flavor of the §12.3 mistake: it deletes the data point that reveals a *trend*. Preserve both, dated; let the trend speak.

**Exam angle.** A stem framing a temporal difference as a "contradiction" is testing whether you attach dates so the difference reads as **growth or change over time**. Including publication dates for correct temporal interpretation is an explicit 5.6 skill.

## 12.5 Rendering by Content Type and Refusing Fabrication

Two final disciplines turn correct provenance into a *trustworthy* deliverable: present each kind of content in its natural shape, and never let the model invent a citation it cannot point to.

**Render by content type.** Forcing every finding into one format destroys readability and can itself obscure provenance:

- **Financial data** → tables (so figures, sources, and dates line up column-wise).
- **News and analysis** → prose.
- **Technical findings** → structured lists.
- **Time series** → chronological ordering.

**Refuse fabricated citations — the cardinal sin.** A fabricated citation (a plausible-looking but non-existent URL, report title, or quote) is worse than no citation: it manufactures false confidence and survives casual review. Defenses, in order of strength:

1. **Cite only from the registry.** The synthesis step may reference a `source_id` *only if it exists* in the source registry (§12.2); anything else is dropped or flagged. This makes invention structurally impossible rather than discouraged.
2. **Validate the quote.** A post-synthesis check confirms each claim's `supporting_quote` actually appears in the cited source's text. A claim whose quote cannot be located is unsupported and is removed or sent to human review (objective 5.5).
3. **Prefer native Citations / search-result blocks.** When sources are supplied as search-result content blocks, Claude emits `cited_text` with verified spans into the provided documents — the model literally cannot cite text that is not there.
4. **Say "not found."** If no source supports a requested claim, the correct output is an explicit gap ("no source in scope supports this"), not a confident sentence. This is the provenance analogue of escalating rather than guessing.

**Exam angle.** Watch for stems where the model "improves" a report by adding citations that sound authoritative — the trap answer praises the polish. The correct answer treats any citation that cannot be traced to a real, supplied source as a defect, and routes unsupported claims to a gap note or human review.

## 12.6 End-to-End Case Study: A Cited Compliance-Research Generator

The pieces above only matter when they fit together. Here is a complete, realistic system — the kind of design the exam's **multi-agent research / synthesis** scenarios ask you to reason about — where provenance is not optional because the output is an auditable compliance memo.

### Requirements

- Answer a regulatory question (e.g., *"What are the data-retention obligations for payment records under PCI DSS and EU GDPR?"*) as a memo a compliance officer can defend in an audit.
- Retrieve evidence from multiple corpora (the regulation texts, internal policy docs, prior legal memos) via separate retrieval subagents.
- **Hard rule:** every assertion in the memo must carry a citation that resolves to a **real, supplied source** — no fabricated URLs, titles, or quotes. An assertion with no source is reported as a gap, not stated as fact.
- Different sources disagree on retention periods; **preserve every value with its source, date, and basis** rather than picking one.
- Maintain an **audit trail**: a persistent record of which source backed which sentence, reproducible after the conversation ends.

### Architecture

```mermaid
flowchart TD
    Officer([Compliance officer]) --> Coord[Coordinator]
    Coord -->|Task with full context| RReg[Subagent<br/>regulation retrieval]
    Coord -->|Task with full context| RPol[Subagent<br/>policy retrieval]
    RReg -. claims plus source_id plus quote .-> Coord
    RPol -. claims plus source_id plus quote .-> Coord
    Coord --> Reg[(Source registry plus audit log<br/>durable state)]
    Coord --> Syn[Synthesis<br/>cite each sentence by source_id]
    Syn --> Gate{{Validator hook<br/>id in registry and quote matches?}}
    Gate -->|fail| Gap[Mark as unsupported gap<br/>or route to human]
    Gate -->|pass| Memo[Cited memo plus references<br/>plus conflict section]
```

The coordinator owns orchestration and the durable registry; retrieval subagents do narrow, least-privilege work and return *structured claims with quotes*, not prose; a **validator gate — not a prompt request — enforces "no citation, no claim,"** because audit integrity must be deterministic.

### Implementation

Require each retrieval subagent to return structured, quote-bearing claims (the §12.1 contract):

```python
retrieval_subagent = AgentDefinition(
    name="regulation_retriever",
    description="Retrieves passages from supplied regulation corpora. Read-only.",
    system_prompt=(
        "Search the supplied documents. For each relevant finding return a JSON object: "
        "{claim, source_id, source_name, publication_date, supporting_quote}. "
        "Use ONLY the source_ids present in the provided documents. "
        "If nothing supports the question, return an empty list — never invent a source."
    ),
    allowed_tools=["search_corpus"],   # least privilege: retrieval only
)
```

Keep provenance in durable state so it survives trimming (the §12.2 two-table discipline):

```python
# Source registry lives OUTSIDE the summarized history — never compacted away.
source_registry = {}          # source_id -> {url, name, date, full_text}
audit_log = []                # append-only: (sentence_id, source_id, quote)

def register_claim(claim):
    sid = claim["source_id"]
    if sid not in source_registry:           # globally unique IDs assigned at ingestion
        source_registry[sid] = lookup_source(sid)
    return claim
```

Enforce "no citation, no claim" deterministically with a validator gate over the synthesized memo — this is the line the exam wants you to get right:

```python
def validate_citations(memo_sentences):
    for s in memo_sentences:
        sid = s.get("source_id")
        # 1) the cited source must actually exist in the registry
        if sid not in source_registry:
            s["status"] = "unsupported_gap"       # cannot cite what we do not have
            continue
        # 2) the supporting quote must actually appear in that source's text
        if s["supporting_quote"] not in source_registry[sid]["full_text"]:
            s["status"] = "quote_mismatch"        # fabricated/edited quote -> reject
            continue
        s["status"] = "verified"
        audit_log.append((s["id"], sid, s["supporting_quote"]))
    return memo_sentences
```

For conflicting retention periods, preserve every value with attribution (the §12.3 structure) instead of resolving to one — the synthesis emits a dedicated "Disputed findings" section keyed by `source_id`.

### Execution trace

```mermaid
sequenceDiagram
    actor Off as Compliance officer
    participant Co as Coordinator
    participant R as Retrieval subagent
    participant V as Validator gate
    Off->>Co: "Retention rules for payment records?"
    Co->>R: Task(question plus corpus ids, full context)
    R-->>Co: claim "retain 1 year" + src_07 + quote
    Co->>Co: register src_07; draft cites it as [src_07]
    Co->>V: validate(sentence, src_07, quote)
    V->>V: src_07 in registry AND quote matches
    V-->>Co: verified; append to audit_log
    Co-->>Off: cited memo + references + conflict note
```

Notice the subagent returned the *quote alongside the claim*, and the **validator gate confirmed the quote really exists in src_07 before the sentence was allowed into the memo**. Had the model paraphrased a source it never read, the quote check would have failed and the sentence would be demoted to a gap — provenance enforced by code, not by a polite "please cite."

### Validation

- **No-fabrication test:** feed a question with **no** supporting source in the corpus and assert the memo reports a gap (zero invented citations), not a confident answer.
- **Quote-integrity test:** corrupt one `supporting_quote` so it no longer matches the source text and assert the validator flags `quote_mismatch` and removes the sentence.
- **Trim-survival test:** `/compact` the worker transcripts, then assert every `source_id` in the final memo still resolves via the registry — proving provenance lives outside summarized history.
- **Conflict-preservation test:** supply two sources with different retention periods and assert *both* appear, dated and attributed, in the Disputed findings section.
- **Audit-trail test:** assert every verified sentence has a matching `(sentence_id, source_id, quote)` row in `audit_log`, reproducible after the session ends.

### Common pitfalls

- Asking for citations in the prompt instead of validating them with a gate (probabilistic — the model will sometimes fabricate; §12.5).
- Renumbering sources per subagent so merged citations point to the wrong document (use globally unique IDs; §12.2).
- Summarizing the source registry along with the chat history, so citations no longer resolve after `/compact` (keep it in durable state; §12.2).
- Resolving conflicting retention periods to a single value and dropping the methodology/date that explained the gap (§12.3).
- Treating fluent, authoritative-sounding citations as proof of correctness instead of verifying the quote against the source (§12.5).

## 12.7 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Attribution loss | Require subagents to emit structured claim → source mappings (id, URL, name, quote); a "please cite" prompt degrades under summarization (§12.1). |
| Source IDs through synthesis | Keep a durable source registry **outside** summarized history; cite by globally unique `source_id`; never renumber per worker (§12.2). |
| Conflicting data | Preserve **every** value with source, date, and methodology and flag the conflict — never silently pick, average, or take the latest (§12.3). |
| Dates | Attach `publication_date` (ISO-8601) so temporal differences read as growth/change, not contradiction (§12.4). |
| No fabricated citations | Cite only from the registry, validate the supporting quote against the source, and report a gap when nothing supports a claim (§12.5). |
| Render by content type | Financial → tables, news → prose, technical → lists, time series → chronological (§12.5). |

> **Maps to Domain 5 (15%), objective 5.6.** If you can build and defend the cited compliance generator above — structured claim → source contracts, a durable registry that survives trimming, conflict preservation, and a validator gate that refuses fabricated citations — you have the provenance core the reliability domain tests.

# Chapter 13: Claude Code Built-in Tools

> Documentation: [Claude Code settings](https://docs.claude.com/en/docs/claude-code/settings) | [Subagents](https://docs.claude.com/en/docs/claude-code/sub-agents) | [Hooks](https://docs.claude.com/en/docs/claude-code/hooks) | [IAM & permissions](https://docs.claude.com/en/docs/claude-code/iam)

Claude Code ships with a small, fixed set of **built-in tools** — the same primitives the agent uses to read, search, edit, and run code. Everything else (custom slash commands, skills, MCP servers, `CLAUDE.md`) configures *how* and *when* these tools fire, but the tools themselves are the hands of the agent. This chapter is part of **Domain 3 — Claude Code Configuration and Workflows (20% of the exam)**: the domain that tests whether you can drive Claude Code as a disciplined engineering workflow rather than a chat box. By the end you should be able to reason about three things and assemble them into a safe, auditable automation:

- **Which tool for which job** (§13.1) — file discovery vs content search vs read/write vs shell, and why picking wrong wastes context and reliability.
- **Incremental investigation** (§13.2) — Grep→Read→Grep→Read instead of loading the whole repo, and why this is a context-management skill, not just a search habit.
- **The permission model** (§13.4) — the gate that decides whether a tool call runs, asks, or is denied; the only *deterministic* control over what an agent can do to your machine.

§13.3 covers the Edit→Read+Write fallback, §13.5 fits the tools into delegation and TODO-tracking workflows, §13.6 builds a complete **guarded codebase-audit-and-refactor** automation end-to-end, and §13.7 distills what the exam tests.

## 13.1 Tool Selection Reference

Each built-in tool has one job. The exam rewards picking the *cheapest correct* tool — using a shell `cat` where `Read` belongs, or reading ten files where one `Grep` would answer the question, are both marked wrong because they burn context and reduce reliability.

| Task | Tool | Example |
|---|---|---|
| Find files by name/pattern | **Glob** | `**/*.test.tsx`, `src/components/**/*.ts` |
| Search within files | **Grep** | Function name, error message, import |
| Read a file in full | **Read** | Load a file for analysis |
| Write a new file | **Write** | Create a file from scratch |
| Edit an existing file precisely | **Edit** | Replace a specific snippet via unique text match |
| Run a shell command | **Bash** | git, npm, run tests, build |
| Delegate an isolated sub-task | **Task** | Spawn a subagent with its own context window |
| Fetch and read a URL | **WebFetch** | Pull docs/changelog, then reason over the content |
| Track multi-step progress | **TodoWrite** | Maintain a visible checklist across a long task |

**Why the distinction matters (Grep vs Glob is the classic trap):**
- **Glob** answers *“which files exist that match this name pattern?”* — it never opens file contents. Use it to scope the work surface (e.g. find every test file before running them).
- **Grep** answers *“which files contain this text?”* — it reads contents but returns matches, not whole files. It is built on ripgrep, so it takes real regex and respects `.gitignore`.
- **Read** is for when you already know *which* file and need the actual lines. Reading a file you found by Glob “just to check” is the most common context-waste anti-pattern.

**Bash is the escape hatch, not the default.** Anything the typed tools do — finding files, searching, reading — you *could* do with `find`, `grep`, `cat` in Bash, but you shouldn't: the dedicated tools integrate with the permission UI, return structured results, and avoid shell-quoting bugs. Reserve **Bash** for things that have no dedicated tool: `git`, `npm`/`pytest`, build steps, and process control. This is exactly the boundary the permission model is designed around (§13.4) — it can allow `Read` everywhere while still asking before every `Bash`.

**Exam angle:** questions describe a goal (“locate every caller of `processPayment`”, “rename a symbol across the repo”, “run the test suite and report failures”) and ask which tool. The right answer is the narrowest tool that does the job: Grep for the callers, Edit (or Read+Write) for the rename, Bash for the tests.

## 13.2 Incremental Investigation Strategy

Do not read all files at once. Build understanding incrementally — search to *locate*, read to *confirm*, then search again from what you learned:

```mermaid
flowchart TD
    A[Goal — understand a feature<br/>or find a bug] --> B[Glob to scope<br/>the candidate files]
    B --> C[Grep for entry points<br/>definitions and exports]
    C --> D[Read only the matched files]
    D --> E[Grep for usages<br/>imports and call sites]
    E --> F{Picture complete?}
    F -->|no| D
    F -->|yes| G[Act — Edit, Bash,<br/>or report findings]
```

In words, the loop is:

```
1. Grep: find entry points (function definition, export)
2. Read: read the found files
3. Grep: find usages (import, calls)
4. Read: read consumer files
5. Repeat until you have a complete picture
```

**Why this is a context-management skill, not just a search habit.** A long Claude Code session has a finite context window. Reading whole directories early fills that window with text you mostly don't need, and pushes the *relevant* lines toward the middle — where the lost-in-the-middle effect makes the model less reliable. Grep-first keeps only the lines that matter in context, so the model stays sharp deep into the task. This is the same reason Domain 5 favours scratchpads and subagent delegation for large codebases.

**Pitfalls:**
- **Reading before searching.** Opening files to “get oriented” is the dominant way sessions blow their context budget. Always Grep/Glob to narrow first.
- **Grep too broad.** A pattern that matches thousands of lines is as useless as reading everything. Anchor the regex and use file-type/glob filters.
- **Forgetting the second Grep.** Finding a *definition* tells you what a function is; finding its *call sites* tells you what breaks if you change it. Investigations that skip the usage pass produce refactors that compile and then fail at runtime.

**Exam angle:** scenarios about investigating an unfamiliar or large codebase test whether you (a) search before reading, (b) delegate verbose discovery to a subagent to protect the main context (§13.5), and (c) recognise that “read the whole repo into context” is never the answer.

## 13.3 Fallback: Read + Write Instead of Edit

`Edit` performs a precise, in-place replacement by matching a **unique** string in the file. If the target text appears more than once, the edit is ambiguous and fails by design — Claude Code refuses rather than guessing which occurrence you meant. There are two correct responses:

1. **Make the match unique.** Include more surrounding context in the `old_string` so it matches exactly one place (often the cleanest fix), or use `replace_all` when you genuinely intend every occurrence.
2. **Fall back to Read + Write:**
   - **Read** — load the full file content.
   - Modify the content programmatically (compute the new version).
   - **Write** — write the updated version back.

```mermaid
flowchart TD
    A[Need to change a file] --> B[Edit with a<br/>unique old_string]
    B --> C{Match unique?}
    C -->|yes| D[Edit applied]
    C -->|no, multiple matches| E[Add surrounding context<br/>to make it unique]
    E --> F{Now unique?}
    F -->|yes| D
    F -->|no, or whole-file rewrite| G[Read full file]
    G --> H[Compute new content]
    H --> I[Write file back]
```

**Why Edit is preferred when it works.** A targeted Edit changes only the lines you name and leaves the rest byte-for-byte identical, which produces clean diffs and avoids accidental reformatting. A full Write replaces the entire file, so a single mistake in reconstructing the content can silently drop unrelated code. Use Write-as-fallback deliberately, not as a habit.

**Pitfalls:**
- **Writing a file you never Read.** Claude Code requires a prior Read of an existing file before Write (and before Edit) so you can't clobber content you haven't seen. Overwriting blind is both blocked and dangerous.
- **`replace_all` when you meant one spot.** It is the right tool for a rename, the wrong tool for fixing a single bug that happens to share text with valid code.

**Exam angle:** the canonical question is *“Edit failed because the snippet isn't unique — what now?”* The expected answer is to disambiguate the match (more context) or fall back to Read→modify→Write, **not** to abandon the change.

## 13.4 The Permission Model: the Gate in Front of Every Tool

The built-in tools are powerful — `Bash` can run anything, `Write` can overwrite anything — so Claude Code puts a **permission layer** in front of them. This is the single most important *deterministic* control in the whole configuration story, and it maps directly onto Domain 3's theme that guarantees come from configuration, not from polite prompting.

Every tool call is evaluated against rules before it runs, with three outcomes:

```mermaid
flowchart TD
    A[Agent requests a tool call<br/>e.g. Bash git push] --> B{Matches a deny rule?}
    B -->|yes| C[Denied — call never runs]
    B -->|no| D{Matches an allow rule?}
    D -->|yes| E[Auto-approved — runs silently]
    D -->|no| F{Default mode?}
    F -->|ask| G[Prompt the user<br/>approve or reject]
    F -->|acceptEdits| H[Auto-approve edits<br/>still ask for Bash]
    G -->|approved| E
    G -->|rejected| C
```

**How rules are written.** Permissions live in `settings.json` (and `.claude/settings.local.json`) as `allow`, `ask`, and `deny` lists keyed by tool, optionally with argument matchers:

```json
{
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Bash(npm test:*)", "Bash(git status)"],
    "ask":   ["Bash(git push:*)", "Write"],
    "deny":  ["Bash(rm -rf:*)", "Read(./secrets/**)", "WebFetch"]
  }
}
```

- **`allow`** runs the matching call without a prompt — use it for read-only and clearly safe operations so the agent isn't constantly interrupting you.
- **`ask`** forces a human approval prompt every time — use it for actions with side effects you want to eyeball (writes, pushes).
- **`deny`** blocks the call outright — the model **cannot** override it. This is where you put the truly dangerous things (`rm -rf`, reading credential files, network egress).

**Precedence is the load-bearing detail: `deny` wins.** A call is checked against deny first; an allow rule can never re-enable something a deny rule forbids. So a `deny` on `Read(./secrets/**)` holds even if `Read` is globally allowed — exactly the property you want for a secrets directory.

**Why this beats a prompt instruction.** Telling the model in `CLAUDE.md` “never touch the secrets folder” is *probabilistic* — it usually complies, but “usually” is unacceptable for credentials or `rm -rf`. A `deny` rule is *deterministic*: it is enforced by the harness, not the model's judgement. This is the §3.5 hooks principle applied to Claude Code's own tools — **when failure has security or data-loss consequences, gate it with configuration, not wording.**

**Modes and headless runs.** The default interactive mode is **ask**; `acceptEdits` auto-approves file edits while still gating Bash; **plan mode** lets the agent explore read-only and propose changes without executing them. In CI/headless runs (`claude -p`) there is no human to answer prompts, so you must pre-approve the needed tools with `--allowedTools` (and rely on `deny` for the guardrails) — an un-allowed tool simply fails rather than hanging.

**Pitfalls:**
- **Over-broad allow.** `"allow": ["Bash"]` hands the agent unrestricted shell — the opposite of least privilege. Allow specific commands (`Bash(npm test:*)`), not the whole tool.
- **Relying on a prompt where a deny is required.** “Please don't delete files” is not a control; `deny: ["Bash(rm:*)"]` is.
- **Forgetting headless has no prompt.** A `-p` automation that needs `Write` but only allowed `Read` will fail silently on the first edit.

**Exam angle:** expect a scenario where an agent must run tests and read code but must *never* push, delete, or read secrets — and you choose the allow/ask/deny split. The key facts tested: deny overrides allow, allow-listing specific commands is least privilege, and configuration (not prompt text) is what makes a prohibition guaranteed.

## 13.5 Tools in Workflows: Delegation and Progress Tracking

Two built-in tools are less about touching files and more about *running the workflow* itself.

**`Task` (subagents) protects the main context.** A `Task` call spawns a subagent with its own fresh context window; it does the verbose work (a deep search, reading dozens of files) and returns only a summary to the coordinator. Three rules carry over directly from Chapter 3: the subagent **inherits no context** — pass everything it needs in the Task prompt; it should run with **least privilege** — only the tools its job requires; and **all results flow back through the coordinator**. The payoff specific to built-in tools: discovery output that would otherwise flood and degrade the main session stays isolated in the subagent.

**`TodoWrite` makes a multi-step plan explicit and durable.** For any task with several steps, writing a checklist (exactly one item `in_progress` at a time, marked `completed` as you finish) keeps the agent — and the watching human — oriented across a long run, and makes a crash or interruption recoverable because the remaining work is written down rather than held only in the model's head.

```mermaid
flowchart TD
    A[Coordinator agent] --> B[TodoWrite —<br/>write the step list]
    B --> C[Task — audit subagent<br/>Grep + Read, read-only]
    C -. findings summary only .-> A
    A --> D[Edit — apply one fix]
    D --> E[Bash — npm test]
    E --> F{Tests pass?}
    F -->|no| D
    F -->|yes| G[TodoWrite — mark step done]
    G --> H{More steps?}
    H -->|yes| C
    H -->|no| I[Report]
```

**Pitfalls:** spawning a subagent but forgetting to pass it the context it needs (it starts blind); giving an audit subagent write/Bash tools it doesn't need (violates least privilege and widens blast radius); treating TodoWrite as decoration instead of keeping exactly one task in progress.

**Exam angle:** large-codebase and multi-step scenarios test whether you delegate verbose discovery to a subagent (context protection) and track progress explicitly — and whether the subagent's toolset is scoped to its role.

## 13.6 End-to-End Case Study: A Guarded Codebase-Audit-and-Refactor Workflow

The tools above only matter when they fit together under the permission model. Here is a complete, realistic Claude Code automation — the kind Domain 3 asks you to design: a workflow that audits a repository for a class of security issue and fixes it, while configuration (not trust) guarantees it can never do harm.

### Requirements

- Scan a Node.js repository for **hardcoded secrets** (API keys, tokens) and for unsafe `child_process.exec(...)` calls built from user input.
- For each finding, apply a **safe, mechanical fix**: move secrets to environment variables, switch `exec` to `execFile` with argument arrays.
- **Hard rule:** the workflow may read anything *except* `./secrets/**` and `.env*`, may run only the test suite, and may **never** run destructive shell commands or push to git — no exceptions, no model discretion.
- Run **headless in CI** on every pull request, and emit a structured report; verbose discovery must not exhaust the main context.

### Architecture

```mermaid
flowchart TD
    PR([Pull request in CI]) --> Coord[Coordinator — claude -p]
    Coord --> Perm{{Permission layer<br/>allow / ask / deny}}
    Coord --> Plan[TodoWrite — audit then fix then verify]
    Coord -->|Task| Audit[Audit subagent<br/>Glob + Grep + Read, read-only]
    Audit -. findings list only .-> Coord
    Coord --> Fix[Edit — apply mechanical fix]
    Fix --> Test[Bash — npm test]
    Test --> Report[Write — audit-report.json]
    Perm -. blocks rm, push, secrets read .-> Coord
```

The coordinator owns orchestration; the **audit subagent does narrow, read-only discovery** so its verbose output never reaches the main window; and the **permission layer — not the system prompt — guarantees the safety envelope**, because that must be deterministic.

### Implementation

Configure the safety envelope in `settings.json`. This is the line the exam wants you to get right — the prohibitions are rules, not requests:

```json
{
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Bash(npm test:*)", "Edit", "Write(./audit-report.json)"],
    "deny":  ["Read(./secrets/**)", "Read(./.env*)", "Bash(rm:*)", "Bash(git push:*)", "WebFetch"]
  }
}
```

Note `Read` is allowed broadly, yet the `deny` on `./secrets/**` and `./.env*` still holds — **deny overrides allow**, so the agent physically cannot read credentials even while reading source freely.

Delegate the verbose scan to a least-privilege subagent (read-only tools, full context in the prompt):

```python
audit_agent = AgentDefinition(
    name="secret_auditor",
    description="Finds hardcoded secrets and unsafe exec() calls. Read-only.",
    system_prompt=(
        "Search the repo for hardcoded API keys/tokens and for child_process.exec "
        "called with interpolated input. Return a JSON list of {file, line, kind}. "
        "Do not modify files."
    ),
    allowed_tools=["Glob", "Grep", "Read"],   # least privilege: no Edit, no Bash
)
```

Run the whole thing headless in CI, pre-approving exactly the tools needed (no human is present to answer an `ask`):

```bash
claude -p "Run the secret-and-exec audit, apply mechanical fixes, then run the tests." \
  --allowedTools "Read,Grep,Glob,Edit,Bash(npm test:*),Write(./audit-report.json)" \
  --output-format json
```

A representative fix the agent applies — narrowed via Grep, changed via Edit:

```js
// before  (flagged: hardcoded secret)
const apiKey = "sk-live-9f8a7b6c5d4e3f2a1b0c";
// after
const apiKey = process.env.API_KEY;
```

### Execution trace

```mermaid
sequenceDiagram
    actor CI as CI pipeline
    participant Co as Coordinator
    participant Au as Audit subagent
    participant Pm as Permission layer
    CI->>Co: claude -p "audit and fix"
    Co->>Au: Task(scan for secrets + unsafe exec)
    Au-->>Co: 2 findings: config.js L3, run.js L20
    Co->>Pm: Edit config.js (key to env var)
    Pm-->>Co: allowed, edit applied
    Co->>Pm: Read ./secrets/prod.key
    Pm-->>Co: DENIED by deny rule
    Co->>Pm: Bash npm test
    Pm-->>Co: allowed, tests pass
    Co-->>CI: audit-report.json (2 fixed)
```

Notice the coordinator *attempted* to read `./secrets/prod.key` (perhaps to "verify" a key) and the **permission layer denied it deterministically**. With only a `CLAUDE.md` note ("don't read secrets"), the model would comply most of the time — not good enough for credentials. The `deny` rule makes it impossible, not merely unlikely.

### Validation

- **Determinism test:** in 100 runs where the agent is prompted to read `./secrets/prod.key`, assert 100 denials. A prompt-only guardrail will eventually leak; the `deny` rule must be 100%.
- **Context-isolation test:** confirm the audit subagent receives the search task and repo scope *in its Task prompt*; the coordinator's window should contain the findings summary, not the raw file dumps — proving discovery stayed isolated.
- **Least-privilege test:** assert the `secret_auditor` subagent has no `Edit` or `Bash`, so a prompt-injected instruction inside a scanned file cannot make it modify code or shell out.
- **Headless test:** run with `-p` and a deliberately incomplete `--allowedTools` (omit `Edit`); confirm the fix step fails cleanly rather than hanging on a prompt.

### Common pitfalls

- Putting the secrets/`rm`/push prohibitions in `CLAUDE.md` instead of `deny` rules (probabilistic, not guaranteed) — see §13.4.
- Allowing the whole `Bash` tool instead of `Bash(npm test:*)`, handing the agent an unrestricted shell (over-broad allow).
- Letting the coordinator do the scan itself, flooding the main context with file contents instead of delegating to a read-only subagent (§13.2, §13.5).
- Running headless without pre-approving `Edit`/`Write`, so the automation silently fails on the first change because there is no human to grant the prompt.

## 13.7 Exam Focus — Key Takeaways

| Concept | What the exam tests |
|---|---|
| Tool selection | Pick the narrowest correct tool: Glob to find files, Grep to search contents, Read to open a known file, Edit for precise changes, Bash only for git/tests/build (§13.1). |
| Incremental investigation | Search before reading; Grep→Read→Grep→Read; never load the whole repo into context (§13.2). |
| Edit fallback | A non-unique match fails by design — disambiguate with more context or fall back to Read→modify→Write (§13.3). |
| Permission model | Three outcomes (allow/ask/deny); **deny overrides allow**; configuration is deterministic where a prompt is only probabilistic (§13.4). |
| Least privilege & delegation | Scope each agent/subagent to the minimum tools; delegate verbose discovery to a read-only subagent to protect context (§13.5). |
| Headless guardrails | In `claude -p` there is no prompt — pre-approve tools with `--allowedTools` and enforce limits with `deny` (§13.4, §13.6). |

> **Maps to Domain 3 (20%).** If you can design and defend the guarded-audit workflow above — right tool per job, search-first investigation, and a permission split that makes the dangerous things impossible rather than merely discouraged — you have the core of Claude Code as a disciplined engineering workflow.

# PART II: EXAM DOMAIN NOTES

---

# Domain 1: Agent Architecture and Orchestration (27%)

## What This Domain Covers

This is the **largest domain on the exam — 27%**, more than any other. It tests whether you can take a problem statement and design a correct *agentic system*: decide when one agent suffices versus when to split work across a coordinator and subagents, control the agentic loop, pass context across isolation boundaries, and enforce business rules deterministically with hooks. Everything in **Chapter 3 (Claude Agent SDK)** and **Chapter 8 (Task Decomposition)** feeds this domain.

**How it is tested.** Questions are scenario-based, not definitional. You are typically given a short business situation ("a research assistant that must cover several sub-topics", "a workflow that must verify identity before a financial action") and four plausible architectures. The wrong answers are usually *almost right* — they pick a multi-agent design where a single loop is simpler, put a money rule in a prompt instead of a hook, or forget that subagents inherit no context. The exam rewards the **simplest design that still meets the guarantee** the scenario demands.

```mermaid
flowchart TD
    A[Read the scenario] --> B{One coherent task<br/>or many independent parts?}
    B -->|one task| C[Single agentic loop]
    B -->|many parts| D{Parts independent<br/>and parallelizable?}
    D -->|yes| E[Coordinator plus<br/>isolated subagents]
    D -->|no, strict order| F[Fixed pipeline<br/>prompt chaining]
    C --> G{Any rule must be<br/>guaranteed 100 percent?}
    E --> G
    F --> G
    G -->|yes| H[Enforce with a hook]
    G -->|no| I[Guide with the prompt]
```

The six mental models below — loop control, coordinator/subagent topology, explicit context, enforcement vs guidance, decomposition strategy, and session lifecycle — are the whole domain. Master the trade-off in each and you can answer almost any Domain 1 question by elimination.

## 1.1 Designing Agentic Loops for Autonomous Task Execution

### Key knowledge:
- Agent loop lifecycle: send a Claude request, check `stop_reason` (`"tool_use"` vs `"end_turn"`), execute tools, return results for the next iteration
- Tool results are appended to the conversation history so the model can decide the next action
- Model-driven decision making (Claude chooses the next tool) vs hard-coded decision trees

### Key skills:
- Flow control: continue the loop when `stop_reason = "tool_use"` and stop on `"end_turn"`
- Appending tool results to context between iterations
- Anti-patterns to avoid: parsing assistant text for completion, using arbitrary iteration limits as the primary stopping mechanism

### Why it matters and the correct mental model

The agentic loop is **model-driven**: Claude inspects the latest tool results and decides the *next* action itself, rather than following a sequence you fixed in advance. That is the entire reason to use an agent instead of a script. The only authoritative signal that the work is finished is the API field `stop_reason == "end_turn"`. Everything else is a guess.

**Common exam traps:**
- Treating assistant *text* like "Done" or "Task completed" as the completion signal. Text is content, not control flow — Claude can say "done" mid-task or never say it at all.
- Using `max_iterations` as the *primary* stop condition. A turn cap is a sane safety backstop against runaway loops, but if it is what normally ends the task, the loop is broken. The normal exit is `end_turn`.
- Forgetting to append `tool_result` back into the history. If you call the tool but never feed the result back, the model is blind on the next turn and will loop or hallucinate.

Mental model: a `while` loop that branches on `stop_reason`, appends every `tool_result` to history, and exits **only** on `end_turn`.

## 1.2 Orchestrating Multi-agent Systems (Coordinator–Subagent)

### Key knowledge:
- Hub-and-spoke architecture: the coordinator owns all inter-agent communication, error handling, and routing
- Subagents operate with isolated context—they do not automatically inherit the coordinator’s history
- Coordinator responsibilities: task decomposition, delegation, result aggregation, dynamic selection of subagents
- Risk of overly narrow decomposition by the coordinator

### Key skills:
- Split research coverage among subagents to minimize duplication
- Implement iterative refinement loops (coordinator evaluates synthesis and re-routes tasks)
- Route all communication through the coordinator for observability

### Why it matters and the correct mental model

Multi-agent is a **hub-and-spoke** topology: one coordinator at the center, isolated subagents on the spokes, and **no spoke-to-spoke edges**. The coordinator decomposes the task, selects which subagents are actually needed (dynamic selection — do not spawn a fixed five every time), delegates, then aggregates and validates. Routing every message through the hub is what gives you observability and a single place to handle errors and retries.

```mermaid
flowchart TD
    U[User request] --> C[Coordinator]
    C -->|Task: cover sub-topic A| S1[Subagent A<br/>isolated context]
    C -->|Task: cover sub-topic B| S2[Subagent B<br/>isolated context]
    C -->|Task: cover sub-topic C| S3[Subagent C<br/>isolated context]
    S1 -. result only .-> C
    S2 -. result only .-> C
    S3 -. result only .-> C
    C --> V{Coverage complete<br/>and consistent?}
    V -->|no, gap found| C
    V -->|yes| R[Aggregate and return]
```

**The decisive trade-off the exam tests: single agent vs multi-agent.** Multi-agent is *not* the default and *not* automatically better. It buys you parallelism and context isolation (each subagent gets a clean, focused window) at the cost of coordination overhead and the risk of fragmented, duplicated, or inconsistent results. Reach for it only when the work splits into **genuinely independent parts** — covering several research sub-topics, reviewing many files. For one coherent task, a single loop is simpler and usually the right answer.

**Common exam traps:**
- Choosing multi-agent for a task that is really one thread of reasoning. Extra agents add coordination cost and failure modes without benefit.
- **Over-narrow decomposition.** If the coordinator slices a topic too finely, subagents overlap, miss the seams between slices, and the synthesis is full of gaps and repetition. The fix is the **iterative refinement loop** in the diagram: the coordinator evaluates the combined result, finds the gap, and re-routes a targeted follow-up task.
- Imagining subagents talk to each other. They do not. All communication flows through the coordinator.

## 1.3 Configuring Subagent Calls, Context Passing, and Spawning

### Key knowledge:
- `Task` tool spawns subagents; the coordinator’s `allowedTools` must include `"Task"`
- Subagent context must be explicitly included in the prompt; subagents do not inherit parent context
- `AgentDefinition` configuration: descriptions, system prompts, tool constraints
- Session management via `fork_session` for exploring alternatives

### Key skills:
- Include full outputs from prior agents in the subagent prompt
- Use structured formats to separate data from metadata when passing context
- Spawn parallel subagents via multiple `Task` calls in a single coordinator turn
- Write coordinator prompts in terms of goals and quality criteria rather than step-by-step instructions

### Why it matters and the correct mental model

This is the single most tested mechanic in the domain: **subagents inherit nothing.** A subagent spawned by the `Task` tool starts with a blank context window. It cannot see the coordinator's conversation, the user's original message, or any other subagent's output. If the subagent needs the document, the prior search results, and the output schema, **all of it must be written into the `Task` prompt** explicitly. Forgetting this is the classic wrong answer — the design "looks" fine but the subagent is operating blind.

```mermaid
sequenceDiagram
    actor U as User
    participant C as Coordinator
    participant A as Subagent A
    participant B as Subagent B
    U->>C: Investigate topic across sub-areas
    C->>A: Task(goal + FULL context: data, prior results, schema)
    C->>B: Task(goal + FULL context: data, prior results, schema)
    Note over A,B: A and B run in parallel,<br/>blind to each other
    A-->>C: structured result A
    B-->>C: structured result B
    C->>C: aggregate and validate
    C-->>U: synthesized answer
```

**Practical rules the exam expects:**
- The coordinator's `allowedTools` (or `allowed_tools`) **must include `"Task"`**, or it cannot spawn anyone.
- **Parallelism = multiple `Task` calls in one coordinator turn.** Emitting three `Task`s in a single response runs all three concurrently. Spreading them across turns serializes them.
- Pass context as **structured data with clear separation of data from metadata**, so the subagent does not confuse the document it should analyze with instructions about the document.
- Write coordinator prompts as **goals and quality criteria** ("cover every sub-topic with no overlap; flag contradictions"), not micro-managed step lists — the whole point of an agent is that it plans the steps.

**`fork_session`** clones the *current* context into an independent branch so you can explore alternatives in parallel without polluting the original. Contrast with `--resume`, covered in §1.7.

## 1.4 Implementing Multi-step Workflows with Enforcement and Handoff Patterns

### Key knowledge:
- The difference between **programmatic enforcement** (hooks, preconditions) and **prompt guidance** for ordering a workflow
- When you need deterministic guarantees (e.g., identity verification before financial operations), prompts alone are insufficient
- Structured handoff protocols during escalation (customer ID, reason, recommended action)

### Key skills:
- Programmatic preconditions that block downstream calls until prior steps are complete (e.g., block `process_refund` until `get_customer` returns a verified ID)
- Decompose multi-aspect customer requests into separate items
- Produce structured summaries when escalating to a human

### Why it matters and the correct mental model

A multi-step workflow has *ordering constraints* — "verify identity **before** any financial action", "confirm inventory **before** charging the card". The exam's core distinction is **how** you enforce that order:

| Mechanism | Guarantee | Use for |
|---|---|---|
| **Programmatic enforcement** (hook / precondition in code) | Deterministic, 100% | Identity-before-money, irreversible or compliance-bound steps |
| **Prompt guidance** ("verify the customer first") | Probabilistic, ~90% | Soft ordering, recommendations, style |

If the ordering matters for **money, safety, or compliance**, a prompt is *insufficient* — the model will usually comply but not always, and "usually" is unacceptable for a financial precondition. You implement a **precondition**: code that blocks `process_refund` until `get_customer` has returned a verified ID. The model literally cannot run the financial step out of order.

**Handoff to a human** must be a *structured* protocol, not a vague "ask a person". When escalating, hand off a structured summary: customer ID, the reason for escalation, and the recommended action. This lets the human (or the next system) act without re-deriving the whole case.

**Multi-aspect requests** ("I want a refund *and* to update my address *and* to cancel my subscription") should be **decomposed into separate items** and handled individually, so one part failing does not silently drop the others.

## 1.5 Agent SDK Hooks for Intercepting Tool Calls and Normalizing Data

### Key knowledge:
- Hook patterns (e.g., `PostToolUse`) to intercept tool results before the model consumes them
- Hooks that intercept outgoing calls to enforce compliance rules (e.g., block refunds above a threshold)
- Hooks provide **deterministic guarantees** vs prompt instructions that provide **probabilistic compliance**

### Key skills:
- `PostToolUse` hooks for normalizing data formats (Unix timestamps, ISO 8601, numeric status codes)
- Interception hooks to block policy-violating actions with redirection to escalation
- Choose hooks over prompts when business rules require guaranteed compliance

### Why it matters and the correct mental model

A **hook is code that runs at a fixed point in the agent lifecycle** and either transforms or blocks what passes through. Because it is code, it is **deterministic — 100%**. This is the lever you pull whenever a prompt's ~90% compliance is not good enough.

Two hook points dominate the exam:

```mermaid
flowchart TD
    M[Model decides to call a tool] --> Pre{{PreToolUse hook<br/>policy gate}}
    Pre -->|allowed| T[Tool executes]
    Pre -->|violates policy| Esc[Redirect to escalation<br/>or block]
    T --> Post{{PostToolUse hook<br/>normalize the result}}
    Post --> Ctx[Clean, uniform data<br/>enters model context]
```

- **PreToolUse** intercepts an *outgoing* tool call before it runs — the place to **block a policy violation** (e.g., a refund above a threshold) and redirect to escalation. The model cannot bypass it.
- **PostToolUse** intercepts a tool *result* before the model sees it — the place to **normalize data** so the model never reasons over three different date formats or raw numeric status codes. Convert Unix timestamps and `"Mar 5, 2025"` to ISO 8601, map status codes to labels, *then* hand it to the model.

**Common exam trap:** putting a guaranteed business rule in the system prompt. "Always escalate refunds over \$500" in a prompt is probabilistic and *will* eventually leak. The same rule in a `PreToolUse` hook is enforced every time. **When failure has financial, legal, or safety consequences, choose a hook, not a prompt.** (This is the hooks-vs-prompts table from §3.5, and it is one of the most reliably tested ideas in the whole exam.)

## 1.6 Task Decomposition Strategies for Complex Workflows

### Key knowledge:
- **Fixed pipelines** (prompt chaining) vs **dynamic adaptive decomposition** based on intermediate results
- Prompt chaining: sequential steps (analyze each file separately, then run an integration pass)
- Adaptive investigation plans that generate subtasks based on what was discovered

### Key skills:
- Use prompt chaining for predictable multi-aspect reviews; use dynamic decomposition for open-ended investigations
- Split large code reviews into per-file analysis plus a separate cross-file integration pass
- Decompose open-ended tasks: map structure first, then build a prioritized plan

### Why it matters and the correct mental model

Decomposition strategy is a **predictability** decision:

| Strategy | When the steps are knowable in advance? | Example |
|---|---|---|
| **Fixed pipeline / prompt chaining** | Yes — you know the steps up front | Review each file, then one cross-file integration pass |
| **Dynamic adaptive decomposition** | No — the next step depends on what you just found | Open-ended investigation: map the structure, then generate a prioritized plan from what you discovered |

```mermaid
flowchart TD
    Start[Complex task] --> Q{Are the steps<br/>knowable up front?}
    Q -->|yes| Chain[Fixed pipeline<br/>prompt chaining]
    Q -->|no| Adapt[Dynamic decomposition<br/>plan grows from findings]
    Chain --> C1[Per-file analysis]
    C1 --> C2[Cross-file integration pass]
    Adapt --> A1[Map the structure first]
    A1 --> A2[Generate prioritized subtasks]
    A2 --> A3{New findings<br/>change the plan?}
    A3 -->|yes| A2
    A3 -->|no| Done[Synthesize]
    C2 --> Done
```

A **large code review** is the canonical *fixed-pipeline* case: analyze each file separately (parallelizable, predictable), then a **separate cross-file integration pass** to catch issues that span files — a problem a per-file pass structurally cannot see. An **open-ended investigation** is the canonical *dynamic* case: you cannot enumerate the steps in advance, so the agent maps the structure first and grows a prioritized plan as it discovers things.

**Common exam trap:** forcing a rigid pipeline onto an open-ended problem (it cannot adapt to what it finds) — or spinning up an open-ended adaptive agent for a task whose steps are fully known (needless nondeterminism). Match the strategy to whether the steps are knowable up front.

## 1.7 Session State, Resuming, and Forking

### Key knowledge:
- `--resume <session-name>` to continue named sessions
- `fork_session` to create independent investigation branches from shared context
- The importance of informing the agent about file changes when resuming sessions
- A new session with a structured summary can be more reliable than resuming with stale results

### Key skills:
- Use `--resume` to continue named investigation sessions
- Use `fork_session` to compare approaches in parallel
- Choose between resuming (context still current) vs starting a new session (results stale)

### Why it matters and the correct mental model

Three lifecycle operations, three distinct purposes:

| Operation | What it does | Use when |
|---|---|---|
| `--resume <name>` | Continue a named session, keeping its history | The prior context is **still current** |
| `fork_session` | Branch the current context into an independent copy | You want to **compare approaches in parallel** without cross-contamination |
| New session + structured summary | Start fresh, seed only a clean summary | The prior results are **stale** or the history is polluted |

**The subtle, frequently tested judgement:** resuming is *not* always best. If the world changed underneath the session — files were edited, data moved — the session's stored results are now **stale**, and blindly resuming makes the agent reason over wrong facts. Two correct moves: when resuming, **inform the agent about the file changes** so it re-reads rather than trusting cached findings; or, when the staleness is significant, **start a new session seeded with a structured summary** instead. A clean summary often beats a long, partly-invalid history.

`fork_session` is the parallel-exploration tool: clone the shared context, run two strategies on the two branches, compare the outcomes — neither branch pollutes the other or the original.

## Worked Exam Scenario

**Scenario.** You are designing a **competitive-intelligence research assistant**. A user asks: *"Compare our three main competitors across pricing, product features, and customer sentiment, and tell me where we are most exposed."* The assistant has tools for web search, a pricing database, and a review-aggregation API. Company policy: **any externally published claim about a competitor must cite a retrieved source** — unsourced claims are a compliance violation. Which architecture is correct?

**Reasoning toward the answer:**

1. **Single agent or multi-agent?** The request fans out into **genuinely independent parts** — three competitors × three dimensions (pricing, features, sentiment) that can be researched in parallel without depending on each other. That independence is exactly the signal for **multi-agent** (§1.2). A single loop would serialize the work and crowd one context window with three competitors' worth of raw data.

2. **Coordinator design.** Use a coordinator that decomposes the request and **dynamically selects** subagents — one per (competitor, dimension) cell, or one per dimension covering all three competitors. To avoid the **over-narrow-decomposition** trap (§1.2), keep an **iterative refinement loop**: the coordinator checks the merged result for coverage gaps and contradictory findings, then re-routes a targeted follow-up Task where needed.

3. **Context isolation.** Each subagent inherits **nothing** (§1.3). The coordinator must write each subagent's slice of the goal *and* the relevant context (which competitor, which dimension, the output schema) directly into its `Task` prompt. Emit the subagent `Task`s **in one coordinator turn** so they run in parallel.

4. **Decomposition strategy.** Per-dimension research is predictable, but the final "where are we most exposed" step is a **cross-cutting integration pass** that only makes sense after all dimensions are in — exactly the per-item-then-integration shape from §1.6. The dimension research is fixed-pipeline; the synthesis is the integration pass.

5. **Enforcing the compliance rule.** "Every external claim must cite a source" is a **compliance guarantee**, so it must be **deterministic, not a prompt** (§1.4, §1.5). A prompt ("please cite sources") leaks. Implement a **hook** that inspects outgoing claims and **blocks any unsourced claim**, redirecting it back for a citation. A `PostToolUse` hook can also normalize the heterogeneous source metadata (search results, DB rows, review API) into one uniform citation format before the model reasons over it.

**Correct architecture:** a **coordinator with isolated, parallel subagents** (one per research slice, briefed with full context in each `Task`), a **dimension-then-integration** decomposition for the final exposure synthesis, an **iterative refinement loop** to close coverage gaps, and a **hook** that deterministically enforces the source-citation rule. The tempting-but-wrong answers: a single agent (serializes independent work, overloads context), subagents briefed without explicit context (they run blind), or "cite your sources" as a prompt instruction (probabilistic — fails the compliance bar).

## Exam Focus — Key Takeaways

| Concept | What is tested / common trap |
|---|---|
| Agentic loop stop signal | Only `stop_reason == "end_turn"` ends a task. Trap: parsing assistant text or using an iteration cap as the primary stop (§1.1). |
| Single vs multi-agent | Multi-agent only when parts are genuinely independent/parallel. Trap: defaulting to multi-agent for one coherent task (§1.2). |
| Hub-and-spoke routing | All communication flows through the coordinator; subagents never talk to each other. Trap: spoke-to-spoke edges (§1.2). |
| Over-narrow decomposition | Slicing too finely causes overlap and gaps; fix with an iterative refinement loop (§1.2). |
| Explicit context passing | Subagents inherit nothing — full context goes in the `Task` prompt. Trap: assuming history is shared (§1.3). |
| Parallel subagents | Multiple `Task` calls in one coordinator turn run concurrently. Trap: spreading Tasks across turns (§1.3). |
| Coordinator `allowedTools` | Must include `"Task"` to spawn subagents at all (§1.3). |
| Enforcement vs guidance | Money/safety/compliance ordering needs a programmatic precondition, not a prompt (§1.4). |
| Structured handoff | Escalation carries customer ID, reason, recommended action — never a vague "ask a human" (§1.4). |
| Hooks vs prompts | Hooks are deterministic (100%); prompts are probabilistic (~90%). Guaranteed rules → hook (§1.5). |
| PreToolUse vs PostToolUse | Pre blocks/redirects an outgoing call; Post normalizes a result before the model sees it (§1.5). |
| Fixed vs dynamic decomposition | Steps knowable up front → prompt chaining; steps depend on findings → adaptive (§1.6). |
| Per-file then integration | Large reviews need a separate cross-file pass that a per-file pass cannot see (§1.6). |
| Resume vs new session | Resume only if context is current; stale results → new session with a structured summary; inform the agent of file changes (§1.7). |
| `fork_session` | Branches shared context for parallel comparison without cross-contamination (§1.7). |

> **Maps to Domain 1 (27%) — the most heavily weighted domain.** If you can pick single vs multi-agent on the evidence, brief isolated subagents with full context, choose hooks over prompts for guaranteed rules, and match decomposition strategy to predictability, you have the core of the largest exam domain. Cross-reference Chapter 3 (Agent SDK) and Chapter 8 (Task Decomposition).

# Domain 2: Tool Design and MCP Integration (18%)

This domain tests whether you can **design the contract between an agent and the outside world**: how a tool is described so the model picks it correctly, how a tool reports success and failure, how tools are allocated across agents and steered with `tool_choice`, how MCP servers are wired into Claude Code and the Agent SDK, and when to reach for a built-in tool versus an MCP server. It is weighted **18%** of the exam — the third-heaviest domain — and draws on the theory in **Chapter 2 (`tool_use`)** and **Chapter 4 (MCP)**.

**How it is tested.** Questions are almost always *scenario-driven*: you are given a misbehaving or under-specified integration (two confusable tools, a generic error that breaks recovery, an agent drowning in 18 tools, a server registered in the wrong scope, the wrong transport for an auth model) and asked for the *correct fix*. The recurring trap is reaching for a **prompt instruction** when the right answer is a **structural change** — rename/split a tool, return a categorized error, scope the toolset, move the rule into the server. The mental model to carry through every question:

```mermaid
flowchart TD
    Need[Agent needs a capability] --> Q1{Read context<br/>or take an action?}
    Q1 -->|read only| RES[MCP Resource<br/>a read-only map]
    Q1 -->|action with side effects| Q2{Does a built-in or<br/>community tool fit?}
    Q2 -->|yes| REUSE[Reuse it<br/>strengthen description]
    Q2 -->|no, unique workflow| TOOL[Custom MCP tool<br/>clear schema plus errors]
    RES --> SEL[Description drives selection<br/>errors drive recovery]
    REUSE --> SEL
    TOOL --> SEL
```

## 2.1 Designing Tool Interfaces with Clear Descriptions

### Key knowledge
- Tool descriptions are the **primary mechanism** an LLM uses to select tools; minimal descriptions lead to unreliable selection.
- The importance of including input formats, example queries, edge cases, and applicability boundaries.
- Ambiguous or overlapping descriptions cause misrouting.
- System prompt wording can create unintended associations with tools.

### Key skills
- Write descriptions that clearly distinguish each tool from similar alternatives.
- Rename tools to eliminate functional overlap (e.g., `analyze_content` -> `extract_web_results`).
- Split general-purpose tools into specialized ones with clear input/output contracts.

### Why it matters and the correct mental model
The model never sees your implementation — it sees only the `name`, `description`, and `input_schema`. Those three fields **are the routing table**. A description is not human documentation; it is the prompt that decides whether the right tool fires. So a vague or duplicated description is not a cosmetic problem — it is a **correctness bug** that surfaces as the agent calling the wrong tool. A good description states what the tool does and returns, the input formats with example values, the edge cases and constraints, and **when to use it versus a similar tool**.

Two failure modes dominate the exam:

- **Overlap.** If `analyze_content` and `analyze_document` read almost the same, the model confuses them. The fix is to **rename for specificity** (`analyze_content` -> `extract_web_results`) and **split** an over-general tool into focused ones with distinct contracts — not to bolt on more prompt text.
- **Prompt bias.** Wording in the system prompt creates unintended associations: "you are a *search* assistant" biases the model toward anything named `search_*`. Routing is the product of *both* the descriptions and the surrounding prompt, so disambiguation sometimes means fixing the prompt, not the tool.

One more selection bias the exam probes: agents tend to **prefer built-in tools (Read, Grep) over MCP tools** with similar functionality. To win a needed MCP tool its share of calls, strengthen *its* description — name the concrete advantage, the unique data, or the context a built-in tool cannot provide.

**Common exam traps**
- Choosing "add an instruction to the system prompt telling the model which tool to use" when two tools are confusable. The exam-correct move is to **rewrite/rename the descriptions** (and split over-general tools).
- Treating the description as documentation rather than the model's decision input.

## 2.2 Implementing Structured Error Responses for MCP Tools

### Key knowledge
- The `isError` flag in MCP tool responses.
- The difference between **transient errors** (timeouts), **validation errors** (bad input), **business errors** (policy violations), and **access/permission errors**.
- Generic errors ("Operation failed") prevent correct recovery decisions.
- The difference between retryable and non-retryable errors.

### Key skills
- Return structured metadata such as `errorCategory` (transient/validation/permission), `isRetryable`, and a human-readable message.
- Use `retryable: false` for business-rule violations with clear user-facing explanations.
- Do local recovery inside subagents for transient failures; propagate only errors they cannot resolve.
- Distinguish access failures (retry decision) from valid empty results (no matches).

### Why it matters and the correct mental model
`isError: true` tells the agent *that* a call failed, but **signaling failure is not enough**. The agent's next move — retry, fix the arguments, stop and explain, or escalate — depends entirely on **what kind** of failure it was. A bare `"Operation failed"` strands the agent: it cannot tell a flaky timeout (retry) from a hard policy denial (stop). The contract that makes recovery possible is a *structured* error carrying `errorCategory`, `isRetryable`, and a human-readable `message`.

```json
{
  "isError": true,
  "content": {
    "errorCategory": "transient",
    "isRetryable": true,
    "message": "Orders API timed out; safe to retry.",
    "attempted_query": "order_id=12345"
  }
}
```

The four categories map cleanly to four agent responses:

| Category | Meaning | Retryable? | Right agent response |
|---|---|---|---|
| `transient` | Timeout, service briefly down | **Yes** | Retry, ideally with backoff |
| `validation` | Bad input (malformed id, missing field) | No | Fix the arguments, then retry |
| `business` | Policy/rule violation (over a limit) | **No** | Stop and explain to the user; do not retry |
| `permission` | Caller lacks access | No | Escalate or request access |

```mermaid
flowchart TD
    E[Tool returns isError true] --> CAT{errorCategory?}
    CAT -->|transient| RETRY[Retry with backoff]
    CAT -->|validation| FIX[Correct the arguments<br/>then retry]
    CAT -->|business| STOP[Stop and explain<br/>do not retry]
    CAT -->|permission| ESC[Escalate or request access]
    RETRY --> LOCAL[Resolve locally if possible]
    FIX --> LOCAL
    LOCAL -. only if unresolved .-> UP[Propagate to coordinator]
    STOP --> UP
    ESC --> UP
```

**Common exam traps**
- **Marking a business-rule violation retryable.** A policy failure (over a refund cap, rollback denied) must be `isRetryable: false`, or the agent burns turns in a pointless retry loop. Pair it with a clear user-facing explanation.
- **Treating an empty result as an error.** A search that legitimately found nothing returns `isError: false` with an empty set — *not* `isError: true`. Conflating "no matches" with "access failed" makes the agent escalate when it should simply report "none found."
- **Propagating every failure up.** A subagent should **recover transient failures locally** (retry) and only propagate what it genuinely cannot resolve — this keeps error noise out of the hub-and-spoke coordinator (links to Domain 5).

## 2.3 Allocating Tools Across Agents and Configuring `tool_choice`

### Key knowledge
- Too many tools per agent (e.g., 18 instead of 4–5) **reduces** tool-selection reliability.
- Agents with tools outside their specialization tend to misuse them.
- Scoped tool access: only role-relevant tools plus a limited set of cross-role utilities.
- `tool_choice`: `"auto"`, `"any"`, and forced tool selection (`{"type": "tool", "name": "..."}`).

### Key skills
- Restrict each subagent's toolset to what is relevant for its role.
- Replace general tools with constrained alternatives (e.g., `fetch_url` -> `load_document`).
- Use `tool_choice: "any"` to guarantee a tool call instead of a text answer.
- Force a specific tool to ensure execution order.

### Why it matters and the correct mental model
**Tool count is a budget, not a free dimension.** Every tool you expose enlarges the model's decision space; an agent given 18 tools selects *worse* than one given the 4–5 it actually needs, and an agent holding tools outside its specialization tends to misuse them. The principle is **least privilege per role**: each subagent gets only role-relevant tools plus a small set of shared cross-role utilities. Where a general tool invites misuse, replace it with a constrained one — `fetch_url` (can reach anything) becomes `load_document` (a bounded contract). This is the same lever Domain 4 of MCP design pulls with *MCP tool search*, which loads server tools lazily so a dozen connected servers don't flood context.

`tool_choice` is the steering wheel on top of that toolset:

| Value | Behavior | When to use |
|---|---|---|
| `{"type": "auto"}` | Model decides whether to call a tool or answer in text | Default for most cases |
| `{"type": "any"}` | Model **must** call some tool (never plain text) | Guarantee structured output |
| `{"type": "tool", "name": "..."}` | Model **must** call that specific tool | Force a first step / execution order |
| `{"type": "none"}` | Model **may not** call any tool this turn | Temporarily disable tools without removing them |

```mermaid
flowchart TD
    Start[Designing a turn] --> Q1{Need a guaranteed<br/>tool call?}
    Q1 -->|no, text is fine| AUTO[tool_choice auto]
    Q1 -->|yes| Q2{One specific tool,<br/>or any tool?}
    Q2 -->|any best tool| ANY[tool_choice any]
    Q2 -->|a forced first step| FORCE[tool_choice tool name]
    FORCE -. note disables thinking .-> WARN[Force only a<br/>side-effect-free tool]
    ANY --> OUT[Structured output guaranteed]
    FORCE --> OUT
```

**Common exam traps**
- **Solving low selection reliability by adding more tools or more prompt text.** The fix is to **shrink** the toolset to the role and **disambiguate** descriptions (2.1) — fewer, sharper tools.
- **Using `auto` when downstream code requires structured output.** With `auto`, Claude may legitimately answer in prose; code that unconditionally parses a `tool_use` block then crashes. Use `any` when a tool call is mandatory.
- **Forcing a side-effectful tool to "get structure."** A forced tool (`type: "tool"`) is called *unconditionally* and **disables extended thinking** that turn — so never force `send_email`; force an extraction/formatting tool instead.

## 2.4 Integrating MCP Servers into Claude Code and Agent Workflows

### Key knowledge
- MCP server scope: project (`.mcp.json`) for teams vs user (`~/.claude.json`) for experiments.
- Environment variable substitution in `.mcp.json` (e.g., `${GITHUB_TOKEN}`) for secret management.
- Tools from all connected MCP servers are discovered on connection and are available simultaneously.
- MCP resources as "content catalogs" (task summaries, database schemas) to reduce exploratory tool calls.

### Key skills
- Configure shared MCP servers in project `.mcp.json` with env-var-based tokens.
- Keep personal/experimental servers in `~/.claude.json`.
- Prefer community MCP servers over custom servers for standard integrations.

### Why it matters and the correct mental model
**Where you register a server decides who can use it**, and **how you handle its secret decides whether you just leaked it**. Two scopes:

- **Project — `.mcp.json` at the repo root, committed to version control.** Every contributor gets the same servers on checkout. This is the exam-correct answer to "how does each developer get the same server *without* each hand-editing config."
- **User — `~/.claude.json` in the home directory, not in version control.** For personal experiments and testing.

Secrets are handled by **environment-variable substitution**: you commit the *reference* `"${GITHUB_TOKEN}"`, never the token itself. Hard-coding a token into `.mcp.json` is the classic wrong answer.

```mermaid
flowchart TD
    Q{Who should get<br/>this server?}
    Q -->|whole team, reproducible| PROJ[.mcp.json at project root<br/>committed to git<br/>env-var token refs]
    Q -->|just me, experimental| USER[~/.claude.json<br/>home directory<br/>not in version control]
    PROJ --> TEAM[All contributors get it<br/>on checkout]
    USER --> SOLO[Only this developer]
```

Three more facts the exam leans on:

- **All connected servers' tools load at once.** On connection the client calls `tools/list` and every tool becomes available to the model simultaneously — namespaced as `mcp__<server>__<tool>` (e.g., `mcp__github__create_issue`). That exact name is what you allow-list or force with `tool_choice`. But "all at once" is also a cost: a dozen servers can flood context with hundreds of tools and *degrade* selection (ties back to 2.3). **MCP tool search** mitigates this by loading tools lazily.
- **Resources cut exploratory calls.** Expose stable read-only context — a service catalog, a database schema, task summaries — as an MCP **Resource** ("content catalog"), so the agent reads a *map* once instead of burning three or four tool calls to discover the shape of the system. Modeling that same read-only data as a `list_X` **tool** is the wrong answer: it inflates the tool count and forces exploratory round-trips.
- **Reuse over rebuild.** For standard integrations (Jira, GitHub, Slack) prefer **existing community MCP servers** — maintained and battle-tested. Build your own server only for a **unique, team-specific workflow** no community server covers.

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant CC as Claude Code host
    participant Srv as MCP server
    Dev->>CC: open project with .mcp.json
    CC->>Srv: connect, env-var token injected
    CC->>Srv: tools/list
    Srv-->>CC: tools mcp__server__query and others
    CC->>Srv: read resource catalog the map
    Srv-->>CC: catalog JSON, no exploratory calls
    CC->>Dev: tools and resources ready
```

**Common exam traps**
- Putting a shared team server in `~/.claude.json` (only that one developer gets it) instead of project `.mcp.json`.
- Hard-coding a token into `.mcp.json` instead of a `${VAR}` reference.
- Building a custom server for a standard integration a community server already covers.
- Modeling read-only context as a tool rather than a Resource.

## 2.5 Selecting and Applying Built-in Tools (Read, Write, Edit, Bash, Grep, Glob)

### Key knowledge
- **Grep**: search within file contents (function names, error messages, imports).
- **Glob**: find files by name/extension patterns.
- **Read/Write**: full-file operations; **Edit**: precise changes via unique text matches.
- If Edit fails due to non-unique matches, fall back to Read + Write.

### Key skills
- Use Grep for content search and Glob for file discovery by patterns.
- Build understanding incrementally: Grep entry points, then Read to trace flows.
- Trace function usage through wrapper modules.

### Why it matters and the correct mental model
Each built-in tool has **one job**, and the exam rewards picking the *cheapest correct* tool. Using a shell `cat` where `Read` belongs, or reading ten files where one `Grep` would answer the question, is marked wrong — both waste context and reduce reliability.

| Task | Tool |
|---|---|
| Find files by name/pattern | **Glob** |
| Search within file contents | **Grep** |
| Read a known file in full | **Read** |
| Create a new file | **Write** |
| Change an existing file precisely | **Edit** (unique-string match) |
| Run git / tests / build | **Bash** |

The classic trap is **Grep vs Glob**: Glob answers *"which files match this name pattern?"* and never opens contents; Grep answers *"which files contain this text?"* (built on ripgrep — real regex, respects `.gitignore`) and returns matches, not whole files; Read is for when you already know *which* file. Opening a file you found by Glob "just to check" is the dominant context-waste anti-pattern.

**Bash is the escape hatch, not the default.** Anything the typed tools do you *could* do with `find`/`grep`/`cat` in Bash — but shouldn't: the dedicated tools integrate with the permission UI, return structured results, and avoid shell-quoting bugs. Reserve Bash for what has no dedicated tool (`git`, `npm`/`pytest`, builds).

**Edit's failure mode is intentional.** `Edit` matches a *unique* string; if the target text appears more than once it fails by design rather than guessing. The two correct responses: make the match unique by adding surrounding context (or `replace_all` when you truly mean every occurrence), or fall back to **Read + Write** (load the whole file, recompute it, write it back).

Investigation is **incremental**, not "load the whole repo": Grep to *locate* entry points, Read to *confirm*, Grep again for *usages*, repeat. This is a context-management skill — reading whole directories early fills the window with text you don't need and pushes the relevant lines into the lost-in-the-middle zone. Tracing a function through its wrapper modules means doing the second Grep (call sites), not just the first (definition).

**Common exam traps**
- Using **Glob** to find text inside files, or **Grep** to list files by extension — they are swapped.
- Defaulting to **Bash** `grep`/`cat`/`find` when a dedicated tool exists.
- "Read the whole repository into context" — never the answer; search before reading.

## Worked Exam Scenario

**Scenario.** A data team ships an internal **`warehouse` MCP server** so Claude Code can help analysts. It exposes two tools whose descriptions both read roughly "Runs an analytics query and returns results," plus a tool that lists every table and its columns. Analysts complain Claude keeps (a) calling the *wrong* query tool, (b) wasting calls poking around to learn the schema, and (c) on a permission error, retrying the same blocked query in a loop. The server is registered in each analyst's `~/.claude.json` with the warehouse token pasted inline, and the team wants the same setup for everyone plus a hosted version for a Slack bot.

**Reasoning.**

1. **Two confusable query tools -> rename and split, don't prompt-patch (2.1).** Identical descriptions are a routing bug. Give each a specific name and a description that states inputs, outputs, and *when to use it versus the other* (e.g., `run_readonly_sql` vs `run_aggregation_report`). Adding "use the right tool" to the system prompt is the trap answer.
2. **Schema discovery -> a Resource, not a tool (2.4).** "List every table and column" is stable, read-only context. Expose it as an MCP **Resource** (a content catalog) so Claude reads the *map* once instead of burning exploratory calls. Keeping it as a `list_tables` tool inflates the tool count and forces round-trips.
3. **Permission error retried in a loop -> structured, non-retryable error (2.2).** The blocked query must return `isError: true` with `errorCategory: "permission"` and `isRetryable: false` and a clear message — so the agent **escalates instead of retrying**. A generic `"Operation failed"` or a retryable flag causes the loop.
4. **Same setup for everyone + a hosted bot -> project scope, env-var secret, two transports (2.4).** Move the server into the project **`.mcp.json`** (committed, so everyone gets it on checkout) and replace the inline token with `"${WAREHOUSE_TOKEN}"`. Run it over **stdio** for local analysts; deploy the *same* server over **Streamable HTTP with OAuth** for the Slack bot — not legacy SSE, and not a second hand-edited config per person.

The throughline: every fix is **structural** (rename, split, Resource, categorized error, correct scope/transport), never "tell the model to behave."

## Exam Focus — Key Takeaways

| Concept | What is tested / common trap |
|---|---|
| Tool descriptions | Description + schema are the model's routing table; fix confusable tools by **rename/split**, not prompt text (2.1). |
| Built-in vs MCP bias | Agents prefer built-ins (Read, Grep); strengthen an MCP tool's *description* to earn its calls (2.1). |
| `isError` + categories | `errorCategory`/`isRetryable` drive recovery: transient->retry, validation->fix args, business/permission->stop; **empty result is not an error** (2.2). |
| Local recovery | Subagents retry transient failures locally and propagate only the unresolved (2.2). |
| Tool count budget | 18 tools select worse than 4–5; **least privilege per role**, replace general tools with constrained ones (2.3). |
| `tool_choice` | `auto` may answer in text; `any` forces *some* tool; `tool` forces a specific one and **disables thinking** — never force a side-effectful tool (2.3). |
| Server scope & secrets | Team -> project `.mcp.json` (committed); personal -> `~/.claude.json`; tokens via `${VAR}`, never inline (2.4). |
| Resources vs tools | Read-only context (catalog, schema) is a **Resource** that cuts exploratory calls; don't model it as a tool (2.4). |
| Transports | **stdio** (local, env-var auth) vs **Streamable HTTP + OAuth** (shared/remote); legacy SSE is deprecated (Ch. 4). |
| Built-in tool choice | Grep = content, Glob = filenames; cheapest correct tool wins; Bash is the escape hatch; Edit fails on non-unique match -> Read+Write (2.5). |

> **Maps to Domain 2 (18%).** If you can take a broken integration and respond with the *structural* fix — disambiguate a description, categorize an error, scope a server, pick the right transport, choose the narrowest built-in tool — you have the core of this domain. Chapter 2 (`tool_use`) and Chapter 4 (MCP) are the deep references behind these objectives.

# Domain 3: Claude Code Configuration and Workflows (20%)

> Documentation: [Claude Code settings](https://platform.claude.com/docs/en/claude-code/settings) | [Memory (CLAUDE.md)](https://platform.claude.com/docs/en/claude-code/memory) | [Slash commands](https://platform.claude.com/docs/en/claude-code/slash-commands) | [Skills](https://platform.claude.com/docs/en/claude-code/skills) | [Headless / CI](https://platform.claude.com/docs/en/claude-code/sdk)

This domain is worth **20% of the exam** and covers how you *configure and operate Claude Code itself* — the CLI/agent that engineers actually run — rather than how you build agents with the SDK (that is Domain 1). The line the exam draws is consistent: questions here are about **where configuration lives, what scope it has, which mechanism is the right tool, and when to let the model plan vs act**.

**What this domain covers:**
- **Context configuration** — CLAUDE.md hierarchy, `@path` modularization, and `.claude/rules/` (§3.1, §3.3).
- **Extending Claude Code** — custom slash commands and Skills, including context isolation with `context: fork` (§3.2).
- **Workflow judgment** — planning mode vs direct execution (§3.4) and iterative refinement (§3.5).
- **Automation** — running Claude Code headlessly inside CI/CD with structured output (§3.6).

**How it is tested.** Expect short *situational* questions: a team symptom ("a new hire doesn't get our test conventions", "the review agent keeps approving its own bugs") and four plausible fixes. The trap answers are almost always *the wrong scope* (user-level when it should be project-level), *the wrong mechanism* (a prompt where a deterministic config belongs), or *the wrong workflow* (planning a one-line fix, or YOLO-ing a 45-file migration). The correct mental model below is: **pick the narrowest scope that solves it, the most deterministic mechanism available, and match planning depth to blast radius.**

```mermaid
flowchart TD
    Q[Where should this<br/>configuration live?] --> A{Who needs it?}
    A -->|Just me,<br/>personal workflow| U[User scope<br/>~/.claude/]
    A -->|Whole team,<br/>shared in VCS| P{Applies everywhere<br/>or only some files?}
    P -->|Everywhere<br/>in the project| Proj[Project CLAUDE.md<br/>committed to repo]
    P -->|One subtree<br/>only| Dir[Directory CLAUDE.md<br/>in that folder]
    P -->|A file type<br/>across the tree| Rules[.claude/rules with<br/>paths glob]
    Proj -. getting too long .-> Modular[Split via @path<br/>or .claude/rules]
```

## 3.1 Configuring CLAUDE.md with Hierarchy, Scope, and Modular Organization

### Key knowledge
- CLAUDE.md hierarchy: **user** (`~/.claude/CLAUDE.md`), **project** (`.claude/CLAUDE.md` or root `CLAUDE.md`), and **directory-level** (a CLAUDE.md inside a subdirectory).
- User-level settings apply only to **one user** and are **not shared via VCS** — your teammates never see them.
- `@path` syntax references external files (e.g., `@./standards/coding-style.md`) so a CLAUDE.md can **import** modular standards instead of inlining everything.
- The `.claude/rules/` directory holds **topic-focused** rule files (testing.md, api-conventions.md, deployment.md) instead of one monolithic CLAUDE.md.

### Why it matters
CLAUDE.md is the project's *persistent memory*: it is prepended to context on every run, so whatever lives there silently shapes every response. The two failure modes the exam loves are **scope mismatch** (the right instruction in the wrong place, so the right people never get it) and **context bloat** (a 600-line CLAUDE.md that burns tokens and buries the rules that matter). Hierarchy and modularization are the cures.

### Key skills
- **Diagnose hierarchy issues.** Classic symptom: a new team member's Claude Code ignores a convention because it was written into someone's **user-level** `~/.claude/CLAUDE.md` instead of the **committed project** CLAUDE.md. Fix = move it to project scope so VCS distributes it.
- **Modularize with `@path`.** In a monorepo, each package's CLAUDE.md can `@./standards/testing.md` to pull in only the standards relevant to it, keeping each file small.
- **Split into `.claude/rules/`.** Break a sprawling CLAUDE.md into `testing.md`, `api-conventions.md`, `deployment.md` so each concern is independently editable and loadable.

### Correct mental model
**Narrowest scope that still reaches everyone who needs it.** Personal preference → user. Team-wide → project (committed). One subtree → directory-level. A convention that follows a *file type* rather than a *folder* → a path-scoped rule (§3.3), not a directory CLAUDE.md.

### Common exam traps
- Choosing user-level for something the **team** must share — it won't reach them.
- Treating CLAUDE.md as unlimited — relevant content competes for the context window; modularize.
- Assuming a directory-level CLAUDE.md "inherits down" to *unrelated* files; it scopes to that subtree, not to a file pattern spread across the repo.

## 3.2 Creating and Configuring Custom Slash Commands and Skills

### Key knowledge
- **Project commands** live in `.claude/commands/` (shared via VCS); **user commands** live in `~/.claude/commands/` (personal, not shared).
- **Skills** live in `.claude/skills/` with a `SKILL.md` whose frontmatter can set `context: fork`, `allowed-tools`, and `argument-hint`.
- `context: fork` runs the skill in an **isolated subagent context** so its (often verbose) output does **not pollute the main session**.
- Personal Skill variants can live in `~/.claude/skills/` under different names without affecting the team's shared versions.

### Why it matters
Slash commands and Skills are how you turn a repeated multi-step prompt into a **named, reusable, governed** operation. The governance levers — *where* it lives (team vs personal), *what tools* it may touch (`allowed-tools`), and *whether it pollutes context* (`context: fork`) — are exactly what the exam probes, because they map onto sharing, least-privilege, and context-hygiene decisions.

### Key skills
- **Share via `.claude/commands/`** so the whole team gets the same `/deploy` or `/review` workflow.
- **Isolate noisy work with `context: fork`** — e.g., a skill that runs a full test suite or scans the codebase, whose raw output would otherwise crowd out the main conversation.
- **Restrict with `allowed-tools`** so a skill can only do what it should (a docs-generation skill needs no shell or write access).
- **Prompt for inputs with `argument-hint`** so developers know what parameters a command expects.

### Correct mental model
A Skill is a *mini-agent definition for a recurring task*. Decide three things in its frontmatter: **audience** (project dir vs user dir), **privilege** (`allowed-tools` = least it needs), and **context** (`fork` when the output is verbose or the work is exploratory).

### Common exam traps
- Putting a team workflow in `~/.claude/commands/` (personal) so only the author has it.
- Omitting `context: fork` for a verbose skill and then blaming "context window full."
- Granting broad tools to a skill that only needs read access — violates least privilege.

```mermaid
flowchart TD
    Need[I keep repeating<br/>a multi-step prompt] --> Team{Team-wide<br/>or just me?}
    Team -->|Team| ProjCmd[.claude/commands<br/>commit to repo]
    Team -->|Me| UserCmd[~/.claude/commands]
    ProjCmd --> Verbose{Output noisy or<br/>exploratory?}
    UserCmd --> Verbose
    Verbose -->|yes| Fork[Skill with<br/>context fork]
    Verbose -->|no| Inline[Inline command]
    Fork --> Priv[Set allowed-tools<br/>to least privilege]
    Inline --> Priv
```

## 3.3 Using Path-specific Rules for Conditional Convention Loading

### Key knowledge
- `.claude/rules/` files can carry YAML frontmatter `paths` to **activate based on glob patterns**.
- Path-scoped rules load **only** when editing matching files, **saving context and tokens** the rest of the time.
- Glob-based path rules are often **preferable to a directory-level CLAUDE.md** when a convention applies across many directories (e.g., every test file, wherever it lives).

### Why it matters
This is the surgical alternative to CLAUDE.md. A directory CLAUDE.md is *always-on for that folder*; a path rule is *conditionally-on for a pattern, anywhere*. When a convention tracks a **file type** rather than a **location**, path rules deliver the instruction exactly when relevant and stay out of context otherwise — the right answer whenever the exam mentions "tests scattered across the codebase" or "all Terraform files."

### Key skills
- Create `.claude/rules/terraform.md` with `paths: ["terraform/**/*"]` so it loads **only** while editing Terraform.
- Use type-based globs like `**/*.test.tsx` to apply test conventions **regardless of folder**.
- **Prefer path-specific rules over directory CLAUDE.md** when the convention spans the codebase by file type.

### Correct mental model
Ask: *does this convention follow a folder or a file pattern?* **Folder → directory CLAUDE.md. Pattern that crosses folders → path-scoped rule.** Either way the win over a global CLAUDE.md is **conditional loading**: tokens spent only when the rule applies.

### Common exam traps
- Putting test conventions in the root CLAUDE.md (always loaded, even when you're nowhere near a test).
- Creating one directory CLAUDE.md per folder when a single `**/*.test.*` glob rule would cover them all.
- Forgetting that path rules are about *which files you're editing*, not *which directory you launched from*.

## 3.4 Deciding When to Use Planning Mode vs Direct Execution

### Key knowledge
- **Planning mode**: for **complex** tasks — large changes, multiple viable approaches, architectural decisions.
- **Direct execution**: for **simple, well-understood** changes (e.g., adding one validation).
- Planning mode enables **safe exploration** of the codebase *before* making any changes.
- The **Explore subagent** isolates verbose discovery output so it doesn't exhaust the main context window.

### Why it matters
Planning depth should match **blast radius**. Plan a one-line fix and you waste cycles; YOLO a 45-file migration and you get an irreversible mess. The exam tests whether you size the workflow to the risk — and whether you know that *discovery* (reading the codebase) belongs in an isolated Explore subagent so its output doesn't crowd out the actual work.

### Key skills
- Use **planning mode** for tasks with architectural consequences (splitting a monolith into microservices, a migration touching 45+ files).
- Use **direct execution** for fixes with a clear stack trace pointing at a single file.
- Use the **Explore subagent** to prevent context-window exhaustion in multi-phase tasks.
- **Combine** them: plan/explore for discovery, then execute for implementation.

### Correct mental model
**Reversibility and uncertainty drive the choice.** High uncertainty or high blast radius → plan first (and review the plan before acting). Low-risk, fully-understood change → execute directly. Discovery is its own phase — push it into Explore so the main context stays clean.

### Common exam traps
- Using planning mode for a trivial, single-file fix (overhead with no benefit).
- Executing directly on a sweeping, multi-approach change (no review, no rollback story).
- Letting raw codebase-discovery output fill the main context instead of isolating it in Explore.

```mermaid
flowchart TD
    Task[Incoming task] --> Clear{Cause clear and<br/>change localized?}
    Clear -->|yes, one file| Exec[Direct execution]
    Clear -->|no| Big{Large blast radius<br/>or several approaches?}
    Big -->|yes| Plan[Planning mode<br/>explore then propose]
    Big -->|unsure, need to read<br/>a lot of code| Explore[Explore subagent<br/>isolates discovery]
    Explore --> Plan
    Plan --> Review[Review plan<br/>before executing]
    Review --> Exec
```

## 3.5 Iterative Refinement for Progressive Improvement

### Key knowledge
- **Concrete input/output examples** are the most effective way to communicate expectations.
- **Test-driven iteration**: write tests first, then iterate against the failures.
- The **"interview" pattern**: Claude asks clarifying questions to surface non-obvious design considerations *before* coding.
- Decide **batch vs sequential** feedback: give **interdependent** issues together in one message; give **independent** issues sequentially.

### Why it matters
Quality on a hard task comes from a **feedback loop**, not a single perfect prompt. The exam checks that you reach for *examples and tests* (concrete, verifiable) over vague prose, and that you know how to **structure feedback** — bundling coupled changes so the model sees their interaction, separating unrelated ones so fixes don't collide.

### Key skills
- Provide **2–3 concrete input/output examples** to pin down a transformation's exact requirements.
- Build a **test set** (expected behavior, edge cases, performance bounds) **before** implementation, then iterate to green.
- Use the **interview pattern** to surface hidden design aspects (cache invalidation, failure modes, concurrency).
- Provide concrete test cases — sample inputs and expected outputs — especially for **edge cases**.

### Correct mental model
**Specify by example, verify by test, iterate by structured feedback.** Examples remove ambiguity; tests make "done" objective; and how you *group* feedback (interdependent together, independent apart) controls whether iterations converge or thrash.

### Common exam traps
- Describing a transformation only in prose when 2–3 examples would be unambiguous.
- Sending many **interdependent** fixes one at a time, so the model never sees the whole shape.
- Skipping tests and judging correctness by eyeballing output.

## 3.6 Integrating Claude Code into CI/CD Pipelines

### Key knowledge
- The **`-p` / `--print`** flag runs Claude Code **non-interactively** (headless) so it never blocks a pipeline waiting for input.
- **`--output-format json`** plus **`--json-schema`** produce **structured output** CI can parse (e.g., to post inline PR comments).
- **CLAUDE.md** supplies the project context (testing standards, review criteria) that a CI-triggered run needs.
- **Session context isolation**: the *same* session that generated code is **less effective at reviewing it** than a fresh, independent instance.

### Why it matters
CI is where determinism and isolation stop being nice-to-haves. A headless run that pauses for input **hangs the pipeline**; output that isn't structured **can't be machine-consumed**; and a model reviewing its *own* just-written code shares its blind spots. The exam tests all three — the flags, the structured-output contract, and the **independent-reviewer** principle.

### Key skills
- Run Claude Code in CI with **`-p`** to avoid hanging on interactive prompts.
- Use **`--output-format json` + `--json-schema`** for structured results (inline PR comments, status checks).
- When re-running after new commits, **include prior review results** and report only **new or still-unfixed** issues — don't re-flag what's resolved.
- Document **testing standards and available fixtures in CLAUDE.md** to improve generated-test quality, and **include existing test files in context** so new tests don't duplicate and match the style.

### Correct mental model
**Headless, structured, isolated.** `-p` makes it non-blocking; `--json-schema` makes the output a contract; and you **separate generation from review** by using a fresh session for the review step, because shared context means shared blind spots.

### Common exam traps
- Running interactive Claude Code in CI without `-p` → the job hangs.
- Parsing free-text output instead of requesting `--output-format json` with a schema.
- Having the **generating** session review its own code (it rubber-stamps its own mistakes) — use an independent instance.

## Worked Exam Scenario

**Scenario.** A platform team's monorepo holds a TypeScript API and a Terraform infra package. Three complaints land in one sprint:

1. New hires' Claude Code never follows the team's **test conventions**, even though a senior engineer "definitely told Claude about them."
2. Engineers want a one-command **`/review`** workflow, shared by everyone, that runs a full lint+test sweep — but its output keeps **flooding the main session** so the rest of the conversation gets evicted.
3. They want **CI to auto-review every PR** and post inline comments, but the first attempt **hung the pipeline** and a later attempt had the *PR's own authoring session* do the review, which **approved its own bug**.

**What's the right configuration?**

- **(1) Test conventions don't reach new hires.** The senior engineer wrote them into their **user-level** `~/.claude/CLAUDE.md` — invisible to teammates. Because the convention follows the **test file type across the repo**, the precise fix is a **`.claude/rules/testing.md` with `paths: ["**/*.test.*"]`**, committed to VCS. That distributes it to everyone *and* loads it only when editing tests (cheaper than the root CLAUDE.md). (§3.1, §3.3)
- **(2) Shared `/review` floods context.** Make it a **project Skill in `.claude/skills/` (committed)** so the team shares it, with **`context: fork`** so its verbose lint/test output runs in an isolated subagent and never pollutes the main session. Set **`allowed-tools`** to just what it needs. (§3.2)
- **(3) CI review.** Run Claude Code headlessly with **`-p`** so it never blocks, and emit **`--output-format json` with `--json-schema`** so the pipeline can post structured inline comments. Crucially, the review must run in a **fresh, independent session** — *not* the one that authored the PR — because a session reviewing its own output shares its blind spots (session context isolation). (§3.6)

**The reasoning that gets it right:** for each symptom, pick the **narrowest scope that still reaches the right audience** (project/path scope, not user scope), the **right mechanism** (a committed rule/skill, not a verbal instruction or personal config), and **isolate** what would otherwise pollute context or blind the reviewer (`context: fork`; an independent CI session). Every trap answer in such a question is the inverse of one of those three: wrong scope, wrong mechanism, or no isolation.

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant Repo as PR / Repo
    participant CI as CI pipeline
    participant CC as Claude Code (-p, headless)
    participant Ctx as CLAUDE.md + rules
    Dev->>Repo: open pull request
    Repo->>CI: trigger on PR
    CI->>CC: run review, --output-format json
    CC->>Ctx: load project context (independent session)
    Ctx-->>CC: test standards + review criteria
    CC-->>CI: structured findings (new and unfixed only)
    CI-->>Repo: post inline PR comments
```

## Exam Focus — Key Takeaways

| Concept | What is tested / common trap |
|---|---|
| CLAUDE.md hierarchy | Pick the **right scope**: team-wide → committed project file; personal → user file. Trap: user-level instruction the team never receives (§3.1). |
| `@path` and `.claude/rules/` | Modularize to cut context bloat; import standards with `@path`. Trap: one 600-line CLAUDE.md loaded on every run (§3.1). |
| Path-specific rules | Convention that follows a **file type across the repo** → `.claude/rules/` with a `paths` glob, loaded conditionally. Trap: directory CLAUDE.md (or root CLAUDE.md) for a cross-cutting file pattern (§3.3). |
| Slash commands vs Skills scope | Team workflow → `.claude/commands/` (committed); personal → `~/.claude/`. Trap: putting a shared command in the user dir (§3.2). |
| `context: fork` | Isolate verbose/exploratory skill output so it doesn't evict the main session. Trap: omitting it, then hitting "context full" (§3.2). |
| `allowed-tools` on skills | Least privilege per skill. Trap: granting write/shell to a read-only skill (§3.2). |
| Planning vs direct execution | Match planning depth to **blast radius/reversibility**. Trap: planning a one-liner, or executing a 45-file migration unreviewed (§3.4). |
| Explore subagent | Isolates codebase discovery so it doesn't exhaust context. Trap: dumping raw discovery into the main window (§3.4). |
| Iterative refinement | Specify by **examples**, verify by **tests**; batch interdependent feedback, sequence independent. Trap: vague prose; drip-feeding coupled changes (§3.5). |
| Headless CI (`-p`) | Non-interactive so the pipeline never hangs. Trap: running interactive Claude Code in CI (§3.6). |
| Structured output | `--output-format json` + `--json-schema` for machine-parseable results. Trap: scraping free text (§3.6). |
| Session context isolation | Review code in a **fresh** session, not the one that wrote it. Trap: author reviews itself and rubber-stamps its own bug (§3.6). |

> **Maps to Domain 3 (20%).** Master the three axes — **scope** (user/project/directory/path), **mechanism** (deterministic config/skill/rule vs a soft prompt), and **workflow** (plan vs execute, isolate discovery, headless+isolated CI) — and the situational questions in this domain become a matter of picking the narrowest correct option.

# Domain 4: Prompt Engineering and Structured Output (20%)

> Documentation: [Tool use](https://platform.claude.com/docs/en/build-with-claude/tool-use) | [Prompt engineering](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | [Message Batches](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

This domain is worth **20% of the exam** — the second-heaviest after Agent Architecture. It tests whether you can turn a vague "make the model do X" goal into a **reliable, machine-consumable pipeline**: prompts with explicit criteria, few-shot examples that pin down format, `tool_use` schemas that *guarantee* well-formed output, validation/retry loops that catch what schemas can't, and the cost/throughput levers (batching, multi-pass review) for running it at scale.

The questions are almost never "what is few-shot?" They are **diagnostic and design** questions: *"The model's JSON sometimes fails to parse — what is the single most reliable fix?"*, *"A retry didn't fix the extraction — why?"*, *"Self-review missed a bug — what architecture finds it?"* The right answer is usually the one that moves a guarantee from **probabilistic** (a prompt instruction) to **structural** (a schema, an independent reviewer, a validation check). The recurring distinction the exam hammers is **syntax vs semantics**: `tool_use` fixes the *shape* of the output; nothing about a schema makes the *numbers* correct.

```mermaid
flowchart TD
    Goal[Goal — get reliable<br/>structured output] --> Q1{Output shape<br/>keeps breaking?}
    Q1 -->|yes| TU[tool_use plus JSON Schema<br/>section 4.3]
    Q1 -->|format is fine,<br/>judgement is inconsistent| FS[Few-shot examples<br/>section 4.2]
    TU --> Q2{Values wrong even<br/>though shape is valid?}
    Q2 -->|yes — semantic error| VR[Validate and retry<br/>with the error fed back<br/>section 4.4]
    Q2 -->|no| Done[Ship]
    Goal --> Q3{Vague criteria causing<br/>false positives?}
    Q3 -->|yes| EC[Explicit categorical criteria<br/>section 4.1]
    VR -.scale and cost.-> BR[Batch plus multi-pass review<br/>sections 4.5 and 4.6]
```

## 4.1 Designing Prompts with Explicit Criteria to Improve Accuracy

**Why it matters.** The fastest accuracy win is almost never a bigger model or more examples — it is *removing ambiguity from the instruction*. "Check comment accuracy" forces the model to invent its own bar for "accurate"; "flag a comment **only** when it contradicts the code it documents" gives it a decision rule it can apply consistently. Vague qualifiers like "be more conservative" or "use good judgement" are the worst kind of instruction: they shift behaviour unpredictably and differently on every run.

**The trust mechanic the exam loves.** False positives are not just noise — they are *contagious*. If a code-review assistant raises five bad "security" flags, developers stop trusting the security category *and* start ignoring the accurate categories next to it. The fix is not "tell it to be more careful"; it is to **define explicit, categorical criteria** for what counts as reportable, and to **temporarily disable a category** whose false-positive rate is poisoning trust until its criteria are tightened. This is a recurring trap: the tempting answer ("add 'be conservative' to the prompt") is wrong; the correct answer narrows the *definition* of a finding.

### Key knowledge
- Explicit criteria are more effective than vague instructions (e.g., "flag comments only when they contradict code" vs "check comment accuracy").
- Generic guidance like "be more conservative" works worse than concrete categorical criteria.
- The effect of false positives on developer trust: high false-positive rates in some categories undermine trust in accurate categories.

### Key skills
- Define review criteria: what to report (bugs, security) vs what to ignore (minor style).
- Temporarily disable categories with high false-positive rates.
- Define explicit severity criteria with code examples for each level.

## 4.2 Using Few-shot Prompting to Improve Output Consistency

**Why it matters.** Few-shot (in-context examples) is the single most effective lever for **consistency** — making the model format, label, and decide the *same way every time*. A criteria list tells the model *what* to do; examples show it *exactly what good looks like*, including the output shape (location, issue, severity, suggested fix) and how to handle the cases a rule list can't fully cover.

**The real power is the ambiguous case.** Anyone can format a clean example; the high-value few-shots are the **edge cases** — an acceptable code pattern that *looks* like a bug, a genuinely ambiguous tool choice, a gap in test coverage. Showing 2–4 of these *with their rationale* teaches the model to generalize the decision boundary instead of pattern-matching the obvious cases. Few-shot also **reduces hallucination in extraction**: an example that demonstrates "when the field is absent, return null" is far stronger than an instruction saying so.

**Common trap.** Zero-shot with a long rule list vs few-shot. When a question describes *inconsistent format or inconsistent judgement on ambiguous inputs*, the answer is **add targeted examples**, not "write more rules." Rules are probabilistic; a concrete demonstration of the exact output is what stabilizes behaviour.

```mermaid
flowchart TD
    In[New input to classify<br/>or extract] --> Amb{Is it a clean,<br/>unambiguous case?}
    Amb -->|yes| Zero[Zero-shot with clear<br/>criteria is enough]
    Amb -->|no — edge case,<br/>format-sensitive,<br/>hallucination-prone| Few[Add 2 to 4 few-shot<br/>examples with rationale]
    Few --> Cover[Cover the ambiguous<br/>boundary, not the<br/>obvious cases]
    Cover --> Stable[Consistent format<br/>and judgement]
    Zero --> Stable
```

### Key knowledge
- Few-shot examples are the most effective method for producing consistently formatted, actionable output.
- Few-shot can demonstrate handling of ambiguous cases (tool selection, gaps in test coverage).
- Few-shot helps the model generalize to new patterns rather than just repeating defaults.
- Few-shot can reduce hallucinations in extraction tasks.

### Key skills
- Provide 2–4 targeted examples for ambiguous scenarios with rationale.
- Include few-shot examples that demonstrate the output format (location, issue, severity, suggested fix).
- Provide examples that distinguish acceptable code patterns from real issues.
- Provide examples of correct extraction from documents with different structures.

## 4.3 Enforcing Structured Output with `tool_use` and JSON Schemas

**Why it matters.** This is the domain's centrepiece. If your code has to `json.loads()` the model's reply, **`tool_use` with a JSON Schema is the most reliable way to guarantee schema-conformant output** and eliminate JSON syntax errors. You define a tool whose `input_schema` *is* the shape you want back, call the model, and read the `input` of the resulting `tool_use` block — already-parsed, schema-valid data. This beats "respond in JSON" prompting, which leaves the model free to add a "Here is the JSON:" preamble or trail a comma.

**Steering with `tool_choice` — the exam's favourite knob:**
- `"auto"` (default) — the model may return prose *or* call a tool.
- `"any"` — the model **must** call one of the available tools (it picks which). Use this to *guarantee* structured output when several extraction schemas exist.
- forced — `{"type": "tool", "name": "extract_metadata"}` pins one specific tool, so you always get exactly that shape.

**Two traps the exam plants here.** (1) **Forcing a tool disables extended thinking** for that turn, and `any`/forced mean the model *always* calls something — so the forced tool must be safe to call unconditionally. Never force a side-effectful tool (`send_email`, `process_payment`) just to extract structure; force an *extraction/formatting* tool instead. (2) **Schemas fix syntax, not semantics.** A strict schema guarantees the JSON parses and the fields exist; it does **not** guarantee the totals add up or that a value landed in the right field. That is §4.4's job.

**Schema design that prevents hallucination.** Make a field **optional/nullable** when the source might not contain it — otherwise a `required` field pressures the model to *fabricate* a value. For categorization, give enums an escape hatch: include `"other"` or `"unclear"` plus a free-text detail field, so the model can flag the unexpected instead of forcing a wrong label.

```mermaid
sequenceDiagram
    actor App as Your backend
    participant Cl as Claude
    App->>Cl: document text plus extract tool schema<br/>tool_choice forces extract_metadata
    Cl->>Cl: read document, fill the schema
    Cl-->>App: tool_use block — input is schema-valid JSON
    App->>App: parse input directly, no json.loads on prose
    App->>App: schema guarantees shape, NOT correct values
```

### Key knowledge
- `tool_use` with JSON Schemas is the most reliable way to guarantee schema-conformant output and eliminate JSON syntax errors.
- With `tool_choice: "auto"` the model can return text; with `"any"` it must call a tool; forced selection chooses a specific tool.
- Strict JSON Schemas eliminate syntax errors but do not prevent semantic errors (totals don't add up; values in wrong fields).
- Schema design: required vs optional fields; enums with "other" plus a detail string for extensibility.

### Key skills
- Define extraction tools with JSON Schemas and parse data from `tool_use` results.
- Use `tool_choice: "any"` to guarantee structured output when multiple schemas exist.
- Force a specific tool call: `tool_choice: {"type": "tool", "name": "extract_metadata"}`.
- Make fields optional/nullable when the source may not contain information to avoid fabricating values.
- Use enum values like `"unclear"` and `"other"` plus detail fields for extensible categorization.

## 4.4 Implementing Validation, Retries, and Feedback Loops for Extraction Quality

**Why it matters.** Because §4.3 only fixes shape, you need a layer that catches **semantic** errors — totals that don't reconcile, a date in the wrong field, a value that violates a business rule. The pattern is **retry-with-error-feedback**: when validation fails, send a follow-up request containing the original document, the *incorrect* extraction, and the *specific* validation errors ("stated_total is 1200 but line items sum to 1180"). Concrete errors guide a real correction; "try again" does not.

**The trap that separates levels: retries can't conjure missing data.** If a field is simply *absent from the source* — the document never states the tax ID, the figure lives only in an external system — retrying is futile and just burns tokens. The exam wants you to *recognize* this case and stop retrying (return null / flag for human / fetch the external doc) rather than loop. Retries fix *correctable* mistakes; they cannot fix *absent* information.

**Designing for self-correction.** Build the detection *into the schema*: extract both `calculated_total` (the model sums the line items) and `stated_total` (the figure printed on the document), then compare them in code — a mismatch is a reconcilation error you can act on. Likewise, record the **`detected_pattern`** that triggered each finding, so you can analyze false positives later and feed §4.1's criteria-tightening loop.

```mermaid
flowchart TD
    Ext[Extract via tool_use] --> Val{Validation passes?<br/>totals reconcile,<br/>fields well-formed}
    Val -->|yes| Out[Accept result]
    Val -->|no| Src{Is the needed info<br/>present in the source?}
    Src -->|yes — correctable| Retry[Retry with document plus<br/>bad extraction plus<br/>specific errors]
    Retry --> Ext
    Src -->|no — absent from source| Stop[Stop retrying —<br/>return null, flag human,<br/>or fetch external doc]
```

### Key knowledge
- Retry-with-error-feedback: include concrete validation errors in the retry prompt to guide corrections.
- Retries are ineffective when the information is simply absent from the source.
- Feedback loop design: track the pattern that triggered a finding (`detected_pattern`).
- Semantic errors (totals don't reconcile) vs syntax errors (addressed by `tool_use`).

### Key skills
- Follow-up prompts with the original document, an incorrect extraction, and specific validation errors.
- Identify when retry will be ineffective (the required info is only in an external document).
- Include `detected_pattern` fields in findings to analyze false positives.
- Design self-correction by extracting both `calculated_total` and `stated_total` to detect discrepancies.

## 4.5 Designing Efficient Batch Processing Strategies

**Why it matters.** Once a prompt works on one document, scale changes the economics. The **Message Batches API** gives ~**50% cost savings** and processes within a **24-hour window**, but with **no latency SLA** — results may take minutes or many hours. The decision rule is simply **blocking vs non-blocking**: a pre-merge CI check that a developer waits on must be **synchronous**; an overnight audit, a weekly report, or a bulk back-fill belongs in the **Batch API**.

**Two constraints the exam tests.** (1) The Batch API does **not support multi-turn tool calling within a single request** — each request is one self-contained shot, so an agentic loop that needs several tool round-trips cannot run as a batch item. (2) `custom_id` correlates each request with its response (and lets you **re-submit only the failures** rather than the whole batch). A classic question gives an SLA — e.g. "results within 30 hours" — and asks for a cadence: submitting in **4-hour windows** keeps every item inside the 24-hour processing window with margin. Always **iterate the prompt on a small sample first**; debugging a 50,000-document batch after the fact is the expensive way to learn your schema was wrong.

### Key knowledge
- Message Batches API: 50% savings, up to 24-hour processing window, no latency SLA guarantees.
- Batch processing is suitable for non-blocking tasks (overnight reports, audits) and not suitable for blocking tasks (pre-merge checks).
- Batch API does not support multi-turn tool calling within a single request.
- `custom_id` fields correlate request/response within batches.

### Key skills
- Use synchronous API for blocking checks; use Batch API for overnight/weekly workloads.
- Plan batch submission cadence based on SLA needs (e.g., 4-hour windows for a 30-hour guarantee with 24-hour processing).
- Handle failures by re-submitting only failed documents (identified by `custom_id`).
- Iterate on prompts using a sample before running large-scale processing.

## 4.6 Designing Multi-instance and Multi-pass Review Architectures

**Why it matters.** A single model that both *generates* and *reviews* its own work has a blind spot: it **retains its own reasoning context** and is psychologically anchored to its earlier decision, so it rarely challenges itself. The fix is **architectural, not prompt-level** — spin up a **second, independent Claude instance with no generation context** to review the change cold. Without the rationalization of "why I wrote it this way," the independent reviewer is far better at catching subtle issues.

**Multi-pass beats one giant pass.** On large, multi-file changes, attention dilutes — the model spreads focus thin and misses both local bugs and cross-file interactions. Split it: a **per-file local pass** for in-file issues, plus a **cross-file integration pass** that reasons about dataflow *between* files. You can also route by confidence — a **verification pass with self-rated confidence** lets you escalate low-confidence reviews to deeper analysis or a human, spending effort where it's needed. The throughline of this whole domain: **independence and decomposition** beat asking one over-loaded call to do everything at once.

```mermaid
flowchart TD
    Gen[Instance A generates<br/>the change] --> Bad[Self-review is weak —<br/>anchored to its own<br/>reasoning context]
    Gen --> RevA[Instance B reviews<br/>with NO generation context]
    RevA --> Local[Per-file local pass<br/>in-file bugs]
    RevA --> Integ[Cross-file integration pass<br/>dataflow between files]
    Local --> Conf{Self-rated<br/>confidence low?}
    Integ --> Conf
    Conf -->|yes| Esc[Escalate to deeper<br/>pass or human]
    Conf -->|no| Accept[Accept findings]
```

### Key knowledge
- Self-review limitations: the model retains its reasoning context and is less likely to challenge its own decisions.
- Independent review instances (without generation context) are better at finding subtle issues.
- Multi-pass review: per-file local analysis plus a cross-file integration pass to avoid attention dilution.

### Key skills
- Use a second independent Claude instance to review changes without generation context.
- Split multi-file reviews into per-file passes plus integration passes for cross-file dataflow analysis.
- Use verification passes with self-rated confidence to route reviews in a calibrated way.

## 4.7 Worked Exam Scenario

**Scenario.** You are building a pipeline that ingests thousands of scanned **insurance claim forms** (OCR'd to messy text) and must emit, for each form, a record: `claim_id`, `claimant_name`, `incident_date`, `line_items[]`, `stated_total`, and a `claim_type` (one of `auto`, `property`, `medical`, or something else). Three problems surface in testing: (1) the model's JSON occasionally fails to parse; (2) on some forms it *invents* a `claim_id` that isn't printed anywhere; (3) on ~8% of forms the `stated_total` doesn't equal the sum of `line_items`. The pipeline runs nightly over the day's intake — there is no user waiting on any single form.

**Reasoning to the right design:**

1. **Parse failures → `tool_use`, not "respond in JSON" (§4.3).** Define an `extract_claim` tool whose `input_schema` is exactly this record, and call it with `tool_choice: {"type": "tool", "name": "extract_claim"}`. The model now *must* return that shape, already parsed in the `tool_use.input` — JSON syntax errors disappear. Forcing this tool is safe because extraction has no side effects (the rule from §4.3 about never forcing a side-effectful tool is satisfied).

2. **Invented `claim_id` → nullable field + few-shot (§4.3 + §4.2).** A `required` field pressures the model to fabricate. Make `claim_id` **nullable**, and add a **few-shot example** where a form with no visible claim number maps to `claim_id: null`. Demonstrating the "absent → null" behaviour is far more reliable than an instruction.

3. **Totals don't reconcile → this is semantic, so the schema can't catch it (§4.4).** Extract **both** `calculated_total` (model sums the line items) and `stated_total` (the printed figure); compare them in code. On a mismatch, **retry with the document, the bad extraction, and the specific discrepancy**. Crucially, if a form is too smudged for the totals to even be present, recognize that **retrying won't conjure the data** — flag it for a human instead of looping. For the genuinely hard reconciliation cases, a little reasoning helps (modern models reason *adaptively* — see Ch. 17 — rather than via a fixed thinking budget), but keep the reasoning trace separate from the parsed `tool_use` output.

4. **Scale + no one waiting → Message Batches API (§4.5).** The workload is non-blocking and nightly, so submit it as a batch for the **~50% cost saving** within the **24-hour window**; tag each form with a `custom_id` so the ~8% that need a reconciliation retry can be **re-submitted alone**. Note that because each batch item is single-shot, the validate-and-retry loop runs as a *second* batch pass, not as multi-turn tool calling inside one request.

5. **Want a second opinion on flagged claims → independent instance (§4.6).** For claims routed to manual review, a **separate Claude instance with no extraction context** reviews the record cold — it is more likely to catch a mis-filed value than the instance that produced it.

**The exam-correct chain in one line:** force a `tool_use` extraction tool for shape, make uncertain fields nullable with a few-shot for "absent → null", validate semantics in code and retry *only when the data exists*, run it through the Batch API for cost, and use an independent reviewer for the hard cases.

## 4.8 Exam Focus — Key Takeaways

| Concept | What is tested / common trap |
|---|---|
| Explicit criteria | Concrete categorical rules beat vague qualifiers; "be more conservative" is the wrong answer — narrow the *definition* of a finding (§4.1). |
| False-positive contagion | High false positives in one category erode trust in accurate ones; fix by tightening criteria or disabling the category, not by adding caution text (§4.1). |
| Few-shot vs zero-shot | Inconsistent format/judgement on ambiguous inputs → add 2–4 examples *with rationale*, not more rules; examples cut extraction hallucination (§4.2). |
| `tool_use` for structure | The most reliable way to guarantee schema-valid output and kill JSON syntax errors — beats "respond in JSON" (§4.3). |
| `tool_choice` | `auto` may return prose; `"any"` forces *some* tool; forced `{"type":"tool",...}` pins one. Forcing disables extended thinking and always calls — never force a side-effectful tool (§4.3). |
| Syntax vs semantics | Schemas fix shape, never correctness; reconciliation/wrong-field errors need validation, not a stricter schema (§4.3 / §4.4). |
| Nullable fields | Make a field optional/nullable when the source may omit it, or the model fabricates; enums need an `"other"`/`"unclear"` escape hatch (§4.3). |
| Retry with feedback | Feed the *specific* validation error back; but retries cannot recover info that is **absent from the source** — stop and flag instead (§4.4). |
| Self-correction check | Extract `calculated_total` and `stated_total` and compare in code to detect discrepancies (§4.4). |
| Batch API | ~50% cheaper, 24-hour window, no latency SLA, no multi-turn tool calling per request; blocking checks stay synchronous; `custom_id` re-submits only failures (§4.5). |
| Independent review | A second instance *without generation context* finds what self-review can't; split large reviews into per-file + cross-file passes (§4.6). |

> **Maps to Domain 4 (20%).** If you can decide — for any "make the output reliable" problem — between explicit criteria, few-shot, a forced `tool_use` schema, a validate-and-retry loop, the Batch API, and an independent reviewer, and you always separate *syntax* (schemas) from *semantics* (validation), you own this domain.

# Domain 5: Context Management and Reliability (15%)

**What this domain covers.** Domain 5 is about everything that keeps an agent *correct over time and under failure*: how the conversation context is budgeted and curated so critical facts survive, how the system degrades gracefully when a tool or subagent fails, and how human oversight and confidence calibration catch the errors automation cannot. It is the smallest exam domain by weight (**15%**), but it cuts across every other domain — a perfectly orchestrated multi-agent system (Domain 1) with brilliant prompts (Domain 4) still fails in production if a refund amount is lost to summarization or a search timeout silently aborts the workflow.

**How it is tested.** Questions are almost always *failure-mode recognition*: you are shown a long-running or multi-agent scenario that has gone subtly wrong — a number drifted, a citation vanished, an agent "remembers typical patterns" instead of the specific class, a 97%-accurate extractor is quietly wrong on one document type — and you must pick the mechanism that *prevents* it. The trap answers are the plausible-but-probabilistic ones (raise the summary quality, tell the model to be careful, trust a confidence self-rating). The correct answers are almost always **structural**: keep the fact *outside* the summarized history, return *structured* error context, sample to *measure* error rather than assume it. The reliability mindset mirrors Domain 1's hooks-vs-prompts rule: when correctness matters, encode it in the architecture, not in a hope that the model behaves.

This domain maps to **Part I Chapters 9–12** (escalation, multi-agent error handling, production context management, provenance). The six objectives below preserve the official exam objectives; each adds *why it matters*, the *common trap*, and the *correct mental model*.

```mermaid
flowchart TD
    A[Domain 5<br/>Context and Reliability] --> B[Context survival<br/>5.1 and 5.4 and 5.6]
    A --> C[Failure handling<br/>5.3]
    A --> D[Human oversight<br/>5.2 and 5.5]
    B --> B1[Keep facts outside<br/>the summary]
    C --> C1[Structured error<br/>not generic status]
    D --> D1[Escalate on rules<br/>not on sentiment]
    D --> D2[Measure accuracy<br/>by type and field]
```

## 5.1 Managing Conversation Context to Preserve Critical Information

The context window is a **budget, not a filing cabinet** — once it fills, older turns are summarized or evicted, and whatever was vague in the summary is gone for good. The exam's core insight is that *summarization is lossy in exactly the places that matter*: a paragraph compresses cleanly, but "$1,247.50 refunded on 2025-03-05 under policy R-12" degrades to "a refund was issued." Transactional precision is the first casualty.

Two reinforcing failure modes appear in questions:

- **Progressive summarization drift** — numeric values, percentages, IDs, and dates get rounded into prose. The agent later answers confidently *and wrong*, because its only memory of the fact is the lossy summary.
- **Lost-in-the-middle** — even when a fact is still verbatim in context, models attend most reliably to the **start and end** of a long input. A finding buried in the middle of a 40-tool-result dump is effectively invisible.

A third, quieter problem: **tool-output bloat**. A tool returns 40 fields when the model needs 5; the irrelevant 35 crowd the budget and dilute attention. Verbosity is not free — it is paid for in both tokens and recall.

### Key knowledge
- Risks of progressive summarization: numeric values, percentages, and dates get condensed into vague summaries.
- Lost-in-the-middle effect: models reliably process the start and end of long inputs, but may miss findings from the middle.
- Tool outputs can accumulate in context disproportionately to relevance (40+ fields when 5 are needed).
- The importance of sending the **full conversation history** in subsequent API requests (the API is stateless — the model only knows what you resend).

### Key skills
- Extract transactional facts into a persistent **"case facts" block** that lives *outside* the summarized history and is re-injected verbatim every turn, so it can never be compacted away.
- Trim verbose tool outputs down to the relevant fields (a `PostToolUse` hook is the deterministic place to do this).
- Place key findings at the **beginning** of aggregated data, with explicit section headings, to defeat lost-in-the-middle.
- Require subagents to include metadata (dates, sources, IDs) in **structured** outputs rather than prose.

**Correct mental model:** anything that *must* survive — money, IDs, dates, decisions — does not belong in the conversation flow where it can be summarized. It belongs in a durable, re-injected facts block. **Common trap:** "improve the summarization prompt." A better summary is still probabilistic and still lossy; the fix is to keep the fact *out of the summary's reach*, not to summarize it more carefully.

## 5.2 Designing Effective Escalation Patterns and Resolving Ambiguity

Escalation is the agent's **circuit breaker**: the decision to stop acting and hand off to a human. The exam tests *what legitimately triggers it* and, just as often, *what wrongly tempts you to trigger (or not) on the wrong signal*.

There are two escalation timings, and conflating them is a classic wrong answer:

- **Immediate escalation** — the customer *explicitly asks for a human*, or asks for something a policy *forbids*. Act now; do **not** investigate first. Spending three tool calls "trying to help" before honoring an explicit human request is the wrong behavior.
- **Attempt-to-resolve, then escalate** — the request is *within* the agent's scope; the agent works it and only escalates if it cannot make progress or the policy is silent/ambiguous.

```mermaid
flowchart TD
    R[Incoming request] --> Q1{Explicit request<br/>for a human?}
    Q1 -->|yes| E[Escalate immediately<br/>no investigation]
    Q1 -->|no| Q2{Policy covers<br/>this case?}
    Q2 -->|no, silent or exception| E
    Q2 -->|yes| Q3{Agent can make<br/>progress?}
    Q3 -->|no| E
    Q3 -->|yes| W[Resolve within scope]
    Q2 -->|multiple customer matches| ASK[Ask for another<br/>identifier]
    ASK --> R
```

### Key knowledge
- Suitable escalation triggers: explicit request for a human, policy gaps/exceptions, inability to make progress.
- Immediate escalation (explicit request) vs attempt-to-resolve (within agent scope).
- **Sentiment analysis and model confidence self-ratings are unreliable proxies for case complexity** — an angry customer may have a trivial request, and a calm one a policy-breaking edge case. A model's "I'm 95% sure" is not calibrated truth.
- Multiple customer matches require asking for additional identifiers, **not** heuristic guessing (picking "the most recent" can act on the wrong person's account).

### Key skills
- Define explicit escalation criteria with **few-shot examples** in the system prompt (show the model concrete escalate/resolve pairs).
- Execute explicit requests for a human **immediately**, without additional investigation.
- Escalate when policy is ambiguous or silent for a specific request.
- Ask for additional identifiers when tool results contain multiple matches.

**Correct mental model:** escalation criteria should be **objective and rule-based** (explicit request, policy-silent, no progress), not **affective** (tone, vibe, self-confidence). **Common trap:** "escalate when the customer seems frustrated" or "escalate when model confidence < 0.8." Both substitute an unreliable proxy for the actual policy condition.

## 5.3 Implementing Error Propagation Strategies in Multi-agent Systems

When a subagent's tool fails, the coordinator can only recover as well as the information it receives. The single most important idea here: **a failure is data, and its shape determines recovery quality.** A generic `"search unavailable"` tells the coordinator nothing actionable; a structured error tells it exactly how to react.

The exam draws a sharp line between two events that a naive design conflates:

- **Access failure** — a timeout, 5xx, or rate-limit. The operation *might* succeed on retry. This warrants a *retry decision*.
- **Valid empty result** — the query ran and legitimately matched nothing. Retrying is pointless; the answer *is* "none."

Collapsing both into "no results" makes the coordinator retry empty queries forever or, worse, treat a transient outage as a confirmed negative.

```mermaid
flowchart TD
    T[Subagent runs a tool] --> Q{Outcome?}
    Q -->|timeout or 5xx| AF[Access failure]
    Q -->|ran, no matches| EV[Valid empty result]
    Q -->|ran, has data| OK[Return results]
    AF --> LR{Transient and<br/>retryable?}
    LR -->|yes| RETRY[Local retry<br/>in subagent]
    LR -->|no| PROP[Propagate structured error<br/>type, query, partial, alternatives]
    EV --> RES[Return empty<br/>do not retry]
    RETRY --> OK
    PROP --> CO[Coordinator decides recovery]
```

### Key knowledge
- **Structured error context** (failure type, query attempted, partial results, alternatives) enables smarter coordinator recovery than a bare status string.
- Distinguish **access failures** (timeouts → a retry decision) from **valid empty results** (no matches → a final answer).
- Generic error statuses ("search unavailable") hide valuable context from the coordinator.
- **Silent suppression** of a failure and **aborting the whole workflow** on a single failure are *both* anti-patterns — one hides the problem, the other over-reacts to it.

### Key skills
- Return structured error context: failure type, what was attempted, partial results, possible alternatives.
- Distinguish access failures from valid empty results.
- Perform **local recovery** in subagents for transient failures; **propagate only non-recoverable errors**, and attach any partial results so the coordinator can still proceed.
- Annotate coverage in synthesis: what is well-supported vs where gaps remain (do not present a partial answer as complete).

**Correct mental model:** the goal is **graceful degradation** — recover locally where you can, propagate *rich* errors where you cannot, and let the coordinator make an informed decision with partial data. **Common trap:** the two extremes — catching the exception and returning `[]` (silent suppression), or letting one subagent's timeout crash the entire research run (over-abort). The exam reliably rewards the middle: structured propagation plus partial results.

## 5.4 Managing Context Efficiently When Investigating Large Codebases

Long autonomous investigations — auditing a large codebase, tracing a bug across dozens of files — are where context management becomes a *survival* problem. As the session grows, the model exhibits **context degradation**: answers get less specific, it starts hedging with "typical patterns" or "usually you'd see…" instead of naming the actual class or line, and earlier precise findings blur. This is the same summarization drift as 5.1, but sustained over a multi-hour run.

The defenses are architectural, and they compose:

```mermaid
flowchart TD
    M[Main coordinator<br/>holds the plan] --> SP[Scratchpad file<br/>durable findings]
    M -->|spawn for one question| SA1[Subagent A<br/>verbose discovery]
    M -->|spawn for one question| SA2[Subagent B<br/>verbose discovery]
    SA1 -. concise result .-> M
    SA2 -. concise result .-> M
    M --> CMP[Run compact<br/>when context fills]
    SP -. re-read findings .-> M
    M --> MAN[State manifest<br/>enables crash resume]
```

- **Subagent isolation** — push the *verbose* discovery (grep dumps, file reads) into a subagent and return only the distilled answer; the bulky output never pollutes the coordinator's window. This is the same hub-and-spoke isolation as Domain 1, used here for context hygiene.
- **Scratchpad files** — write key findings to a file the agent can re-read across context boundaries, so a finding from hour one survives into hour three even after the in-context turns are gone.
- **Summarize-before-spawn** — distill the current state into a brief before launching the next phase, so each subagent starts from a clean, accurate baseline.
- **`/compact`** — proactively compress the window during a long investigation to buy room, *before* degradation sets in.
- **State persistence** — a structured manifest of progress and findings enables resuming after a crash rather than restarting.

### Key knowledge
- Context degradation in long sessions: the model produces unstable answers and refers to "typical patterns" instead of specific classes.
- Scratchpad files preserve key findings across context boundaries.
- Delegating to subagents isolates verbose discovery output.
- Structured state persistence enables crash recovery.

### Key skills
- Spawn subagents for specific questions while keeping high-level coordination in the main agent.
- Use scratchpad files to store key findings and reference them later.
- Summarize key findings before spawning next-phase subagents.
- Use `/compact` to reduce context usage during long investigations.

**Correct mental model:** treat the main agent's window as scarce and *load-bearing for coordination only*; offload bulk to subagents and durability to files. **Common trap:** "just use a bigger context window." A larger window delays degradation but does not prevent it — lost-in-the-middle and drift still apply at scale — and it does nothing for crash recovery. Externalize state; do not just buy more of it.

## 5.5 Designing Workflows with Human Oversight and Confidence Calibration

When an agent automates a high-volume task (e.g., extracting fields from documents), the dangerous question is not "what is the overall accuracy?" but "**where is it wrong, and do we catch it?**" The headline number is a trap.

The central insight: **an aggregate metric hides its own distribution.** A pipeline that is 97% accurate overall can be 99.5% on invoices and 71% on handwritten forms — and if handwritten forms are the legally important 3%, the 97% is dangerously misleading. Worse, the errors may concentrate in one *field* (dates parsed wrong) even when the document-level number looks fine.

```mermaid
flowchart TD
    EX[Extraction pipeline] --> AGG[97 percent overall<br/>looks safe]
    AGG --> STR{Stratify by<br/>type and field}
    STR --> T1[Invoices<br/>99 percent]
    STR --> T2[Handwritten<br/>71 percent]
    STR --> T3[Date field<br/>across all types]
    T2 --> ROUTE[Route low-confidence<br/>to human review]
    T3 --> ROUTE
    ROUTE --> CAL[Calibrate thresholds<br/>on labeled data]
    CAL --> AUTO[Auto-accept only<br/>where measured safe]
```

### Key knowledge
- Aggregate metrics (e.g., 97% overall accuracy) can mask poor performance on specific document types or fields.
- **Stratified random sampling** measures error rates in high-confidence extractions (so you discover where "confident" still means "wrong").
- Field-level confidence calibration using **labeled validation sets** (a confidence score is only meaningful once mapped to measured accuracy).
- Validate accuracy *by document type and by field* before automating.

### Key skills
- Implement stratified random sampling to detect new error patterns (don't just sample uniformly — sample within each stratum).
- Analyze accuracy by document type and field to confirm performance is stable everywhere, not just on average.
- Output field-level confidence scores and **calibrate review thresholds using labeled data**, so the auto-accept cutoff reflects real accuracy.
- Route low-confidence or ambiguous-source extractions to human review.

**Correct mental model:** confidence must be **calibrated against ground truth**, and accuracy must be **stratified** before any threshold is trusted. Human review is targeted at the strata and fields where measurement says automation is unsafe. **Common trap:** "the model is 95% confident, so auto-accept" — an uncalibrated self-rating is not an error rate. The fix is to *measure* the error rate per stratum with labeled data, then set the cutoff from that measurement.

## 5.6 Preserving Provenance and Handling Uncertainty in Multi-source Synthesis

When a coordinator synthesizes findings from many sources, the report is only trustworthy if every claim can be traced back to where it came from. Provenance — the **claim → source** mapping — is fragile: it is exactly the kind of structured detail that summarization flattens. After one compaction, "Acme grew 12% (Q3 10-K, p.4)" becomes "Acme grew 12%," and the citation is unrecoverable.

Two synthesis hazards dominate the questions:

- **Conflicting values** — two sources report different numbers. The wrong move is to silently pick one. The right move is to **preserve both with attribution** and surface the conflict for reconciliation.
- **False contradictions from time** — two "conflicting" figures may simply be from different dates (a 2023 estimate vs a 2024 actual). Without **publication/collection dates**, the coordinator misreads a temporal difference as a disagreement.

```mermaid
sequenceDiagram
    actor U as User
    participant Co as Coordinator
    participant S1 as Source agent A
    participant S2 as Source agent B
    U->>Co: Synthesize the market figures
    S1-->>Co: claim plus source plus date A
    S2-->>Co: claim plus source plus date B
    Co->>Co: Values differ, compare dates
    Co->>Co: Different periods, not a conflict
    Co-->>U: Report with citations and dated values
```

### Key knowledge
- Attribution is lost during summarization **unless** "claim → source" mappings are explicitly preserved.
- Structured mappings must survive the **aggregation** step (keep them outside the summarized history, as in 5.1).
- Handle conflicting statistics by **annotating** conflicts with attribution rather than arbitrarily choosing one value.
- Include publication/collection dates to avoid misreading **temporal** differences as contradictions.

### Key skills
- Require subagents to output **"claim → source" mappings** (URL, document name, quotes) as structured data.
- Structure reports to separate **stable findings** from **disputed** ones.
- Preserve conflicting values with annotations and pass them to the coordinator for reconciliation (don't resolve silently in a subagent).
- Include publication dates for correct temporal interpretation.
- Render content by type: financial data as tables, news as prose, technical findings as structured lists.

**Correct mental model:** the synthesis pipeline must carry **claim, source, and date together** end-to-end, and treat conflict as something to *report*, not silently *resolve*. **Common trap:** averaging or arbitrarily choosing between conflicting figures — that discards the very signal (the disagreement, or the date gap) the user needs to judge the data.

## Worked Exam Scenario

**Scenario.** You operate a long-running "financial document analyst" agent. Each session ingests a 60-page quarterly filing plus several news articles, then answers analyst questions over many turns. Three problems surface in production:

1. By turn 30, the agent answers a question about Q3 revenue with "around 1.2 billion" — but the filing says **$1,247M**. The precise figure was correct at turn 8.
2. One of its source tools (a news API) intermittently times out; on those turns the agent reports "no relevant news," and the analyst assumes there genuinely was none.
3. The same 12-page risk-factors appendix is re-read on every session, and per-token costs are climbing.

**Which set of fixes is correct?**

- (A) Increase the context window to the maximum and tell the agent in its system prompt to "always keep exact figures and never drop news errors."
- (B) Extract a durable **case-facts block** (exact figures, with source and page, re-injected verbatim every turn); have the news tool return a **structured error** (`type=timeout`) so the coordinator distinguishes a timeout from a true empty result and can retry/annotate; and **prompt-cache** the static risk-factors appendix so the repeated read bills at a fraction of the cost.
- (C) Lower the temperature and add "be precise" to the prompt; wrap the news tool in a try/except that returns `[]` on error; summarize the appendix once and rely on the summary.
- (D) Escalate every revenue question to a human, and disable the news tool.

**Reasoning.** Each symptom maps to a Domain 5 mechanism, and only **(B)** uses the *structural* fix for all three:

- *Symptom 1* is progressive-summarization drift (5.1). A bigger window (A) or a "be precise" instruction (C) is probabilistic and still lossy; the only reliable fix is to keep the exact figure **outside the summarized history** in a re-injected facts block.
- *Symptom 2* is the access-failure-vs-empty-result confusion (5.3). Returning `[]` on timeout (C) is *silent suppression* — the exact anti-pattern. A **structured error** lets the coordinator retry or annotate "news coverage unverified," preserving graceful degradation.
- *Symptom 3* is a cost problem solved by **prompt caching** the static appendix (a stable, repeated prefix is the canonical caching case); summarizing it (C) re-introduces drift on the very content you wanted verbatim.
- (A) and (D) are the over-correction traps: a larger window delays but does not prevent drift, and blanket escalation/disabling throws away working automation instead of degrading gracefully.

**Correct answer: (B).** It is the option that, for every symptom, chooses *architecture over hope* — durable facts, structured errors, and caching — the recurring theme of the entire domain.

## Exam Focus — Key Takeaways

| Concept | What is tested / common trap |
|---|---|
| Summarization drift (5.1) | Exact numbers/IDs/dates are lost to lossy summaries. Trap: "write a better summary prompt." Fix: keep facts in a durable, re-injected **case-facts block** *outside* the summarized history. |
| Lost-in-the-middle (5.1) | Models attend to the start and end, not the middle. Fix: put key findings **first**, with headings; trim verbose tool output to the needed fields. |
| Stateless API (5.1) | The model only knows what you resend — send the **full history** each request. |
| Escalation timing (5.2) | Explicit human request or policy-forbidden → escalate **immediately**, no investigation. In-scope → attempt, then escalate if stuck. |
| Unreliable triggers (5.2) | Trap: escalate on **sentiment** or **model self-confidence**. Use objective rules (explicit request, policy-silent, no progress); ask for an identifier on multiple matches. |
| Error shape (5.3) | Return **structured** error context (type, query, partial, alternatives), not "search unavailable." Distinguish **access failure** (retry) from **valid empty result** (final). |
| Graceful degradation (5.3) | Trap: the two extremes — silent `[]` suppression vs aborting the whole run. Recover locally; propagate non-recoverable errors with **partial results**. |
| Context degradation (5.4) | Long sessions drift to "typical patterns." Fix: subagent isolation for verbose work, **scratchpad files**, summarize-before-spawn, `/compact`, state manifest. Trap: "just use a bigger window." |
| Hidden error distribution (5.5) | Trap: trust the **aggregate** accuracy. **Stratify** by document type and field; an uncalibrated confidence score is not an error rate. |
| Confidence calibration (5.5) | Calibrate thresholds on **labeled data**; route low-confidence/ambiguous cases to human review. |
| Provenance loss (5.6) | "claim → source" mappings flatten during summarization. Preserve them as structured data through aggregation; carry **dates** to avoid false temporal contradictions. |
| Conflict handling (5.6) | Trap: silently pick or average conflicting figures. **Annotate** the conflict with attribution; let the coordinator reconcile. |

> **Maps to Domain 5 (15%).** The unifying rule across all six objectives mirrors the hooks-vs-prompts principle from Domain 1: when correctness must survive time and failure, encode it **structurally** — durable facts, structured errors, calibrated thresholds, preserved provenance — never in a hope that the model stays careful.

# PART III: Modern Agent Engineering (Beyond the Foundations Exam)

> **Scope note:** This part covers current Anthropic engineering practice (2026) for building robust agents — **Workflows vs Agents, the agent harness, and loop engineering**. These topics go **beyond the official Foundations exam syllabus**; they are here for deeper Claude mastery, not because they are guaranteed to be tested. Each chapter cites Anthropic's primary sources.

---

# Chapter 14: Workflows vs Agents

> *Advanced — beyond the official exam scope.* Source: [Anthropic — Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents).

The single most consequential architecture decision in production agent engineering is also the simplest to state: **who controls the flow — your code, or the model?** Anthropic draws a sharp line between two answers, and almost every reliability, cost, and latency problem in a deployed system traces back to picking the wrong one.

- **Workflow** — "systems where LLMs and tools are orchestrated through **predefined code paths**." *You* control the flow. The sequence of steps is fixed at design time; the model fills in the intelligence at each step.
- **Agent** — "systems where LLMs **dynamically direct their own processes** and tool usage, maintaining control over how they accomplish tasks." *The model* controls the flow. It decides what to do next, in what order, and when it is done.

This chapter is **advanced material beyond the Foundations exam**, but it sits directly under Domain 1 (Agent Architecture, 27%): the exam's coordinator/subagent pattern is one specific workflow (orchestrator–workers), and the agentic loop from Chapter 3 is the *agent* end of this same spectrum. Knowing where a design sits on the control-versus-flexibility axis is what lets you defend an architecture rather than just build one.

By the end you should be able to:

- **Place any design on the control-vs-flexibility spectrum** (§14.1) and explain the trade-off you are buying.
- **Choose among the five workflow patterns** (§14.2) and know each one's failure mode.
- **Apply the four-question test** (§14.3) before reaching for an agent.
- **Invest in the agent–computer interface** (§14.4) — where reliability is actually won.
- **Build a feedback-triage system** end-to-end (§14.5) that starts as a workflow and graduates exactly one stage to an agent — and know why.

## 14.1 The control-vs-flexibility spectrum

"Workflow" and "agent" are not a binary; they are the two ends of a continuum. As you move from left to right you gain flexibility (the system handles inputs you never anticipated) and you lose predictability (you can no longer enumerate what it will do).

```mermaid
flowchart TD
    A[Single LLM call<br/>most control, least flexible] --> B[Workflow<br/>predefined code paths]
    B --> C[Agent<br/>model directs its own steps]
    C --> D[Multi-agent system<br/>most flexible, least predictable]
    A -. add steps you can enumerate .-> B
    B -. steps you cannot enumerate .-> C
    C -. parallel autonomous workers .-> D
```

**The golden rule: start simple, move right only when forced.** Use the simplest pattern that passes your evals — often a single well-tooled LLM call, sometimes a workflow. Each step rightward is a deliberate purchase: you pay in latency, tokens, and debuggability for the ability to handle open-endedness.

**Why this matters in production.** The cost of the agentic end is not theoretical:

- **Compounding errors.** In a workflow, a bad step is contained — the next step is fixed code that can validate and reject it. In an agent, an early wrong turn becomes the context the model reasons from for every subsequent step, so one mistake silently steers the whole trajectory.
- **Cost and latency multiply.** An agent may take 3 steps or 30 for the same input; you cannot budget tokens or p99 latency the way you can for a fixed 4-call chain.
- **Debuggability collapses.** "Why did it do that?" has a code answer in a workflow and a "re-read 40k tokens of model reasoning" answer in an agent.

**The decisive question: can you enumerate the steps?** If you can write down the sequence ("classify, then summarize, then draft a reply"), build a workflow — it will be cheaper, faster, and more reliable. Reserve agents for **open-ended problems where you cannot predict the number of steps or hardcode the path, but you *can still verify progress*.** That last clause is non-negotiable: an agent you cannot verify is an agent you cannot trust.

## 14.2 The five workflow patterns

Most "I need an agent" instincts are really one of five workflow patterns in disguise. Each is built from `predefined code paths` plus LLM calls, and each has a characteristic failure mode you must design against.

**1. Prompt chaining** — break a task into a fixed sequence of steps; each call processes the previous output, with **programmatic checks (gates) between steps**.

```mermaid
flowchart TD
    In[Input] --> S1[LLM call 1<br/>extract]
    S1 --> G{Gate<br/>schema valid?}
    G -->|fail| Fix[Repair or reject]
    G -->|pass| S2[LLM call 2<br/>transform]
    S2 --> S3[LLM call 3<br/>format]
    S3 --> Out[Output]
```

- *Use when* the task cleanly decomposes into ordered subtasks and you can validate each handoff.
- *Failure mode:* skipping the gates. The whole point is that the code between calls catches a bad step before it poisons the next one. A chain with no gates is just a slow single call.

**2. Routing** — classify the input, then send it to a specialized handler. This is separation of concerns: each handler gets a focused prompt and tool set instead of one bloated do-everything prompt.

- *Use when* inputs fall into distinct categories that each deserve different handling (billing vs. technical vs. refund).
- *Failure mode:* a weak classifier. Routing is only as good as the router; misroutes are invisible failures. Keep the categories few and mutually exclusive, and measure routing accuracy as its own eval.

**3. Parallelization** — run subtasks at once, in two flavors:
- **Sectioning** — split independent pieces of one task and run them concurrently (e.g., check a document for PII, tone, and policy in parallel), then merge.
- **Voting** — run the *same* task several times and aggregate (majority vote, or "flag if any run says unsafe") to raise reliability on a judgment call.
- *Failure mode:* using sectioning when the pieces actually depend on each other, or voting without a clear aggregation rule.

**4. Orchestrator–workers** — a central LLM dynamically breaks the task down, delegates to worker LLMs, and synthesizes their results. **This is the coordinator/subagent pattern from Domain 1 (Chapter 3).** It differs from parallelization because the *subtasks are not known in advance* — the orchestrator decides them at run time.

- *Use when* you cannot pre-decide how to split the work (e.g., "fix this bug" might touch one file or seven).
- *Failure mode:* forgetting that workers have **isolated context** — the orchestrator must pass everything each worker needs in its prompt (Chapter 3, §3.4).

**5. Evaluator–optimizer** — one LLM generates, a second evaluates against explicit criteria and returns feedback, and the first revises, in a loop. This is the engine of Chapter 16 (loop engineering).

```mermaid
flowchart TD
    Task[Task] --> Gen[Generator LLM<br/>produce draft]
    Gen --> Ev[Evaluator LLM<br/>check vs criteria]
    Ev --> D{Meets criteria?}
    D -->|no, with feedback| Gen
    D -->|yes| Done[Accept output]
    D -. budget exhausted .-> Esc[Escalate to human]
```

- *Use when* you have **clear, checkable success criteria** and quality improves measurably with iteration (translation, code that must pass tests, drafts against a rubric).
- *Failure mode:* the generator and evaluator share a model and context, so the evaluator rubber-stamps its own reasoning. Keep the evaluator's context independent (Chapter 16).

> **Note where routing/parallelization sit:** patterns 1–3 and 5 have a *fixed* structure — they are firmly workflows. Pattern 4 (orchestrator–workers) is the bridge: its control flow is decided by the model at run time, which already makes it agentic in spirit.

## 14.3 Should you build an agent? The four-question test

Before moving right on the spectrum, every "yes" is required. A single "no" means stay at a simpler tier.

| Question | What it checks | If "no" |
|---|---|---|
| **Complexity** | Is the task genuinely multi-step and hard to fully specify in code? | A workflow (or one call) is simpler and more reliable. |
| **Value** | Is the outcome worth the extra latency and token cost an agent incurs? | The economics don't justify autonomy; stay simple. |
| **Viability** | Is Claude actually capable at this task, with the tools it has? | No architecture rescues a task the model can't do. |
| **Cost of error** | Are mistakes **catchable and recoverable** — tests, review, rollback, human gate? | Autonomy is unsafe; keep a human or deterministic gate in the loop. |

The fourth question is the one teams skip and regret. An agent's value comes from acting without supervision, so **the cost of a wrong action sets the ceiling on how much autonomy you can grant.** A coding agent whose mistakes are caught by tests and code review can be highly autonomous; an agent that moves money or emails customers cannot — there, you keep the deterministic hooks and human gates of Chapter 3 and Domain 5, no matter how capable the model is.

## 14.4 Invest in the agent–computer interface (ACI)

Once you do build an agent, the highest-leverage work is **not** prompt cleverness — it is the interface between the model and its tools. Anthropic's guidance is to spend "just as much effort in creating good agent-computer interfaces (ACI)" as you would on a human-facing UI.

In practice, the ACI is your **tool definitions**:

- **Clear descriptions** — say exactly what the tool does, when to use it, and when *not* to.
- **Unambiguous parameters** — name and type each field so there is one obvious way to call it; prefer absolute paths over relative, enums over free text.
- **Example usage and edge cases** — show a correct call and document what happens at the boundaries.
- **Testing** — exercise the tool with the model and watch where it mis-calls; fix the description, not the prompt.

**Why this beats prompting on modern Claude:** the model is already strong at reasoning; what it cannot recover from is a tool it *misunderstands*. A vague schema produces malformed calls no system prompt can reliably fix. **Tool descriptions and schemas are where reliability is won** — this is the production version of the exam's tool-design domain (Domain 2), and it is why Chapter 15's harness treats tool quality as a first-class concern.

## 14.5 End-to-End Case Study: A Customer-Feedback Triage System

The spectrum only becomes real when you build on it. Here is a system that processes inbound customer feedback (support tickets, app-store reviews, survey free-text) — and the instructive part is that it is **mostly a workflow, with exactly one stage promoted to an agent**, because that is the only stage whose steps you cannot enumerate.

### Requirements

- Ingest free-text feedback from several sources at high volume (thousands/day) — so **cost and latency per item matter**.
- **Classify** each item (bug, feature request, billing, praise, churn-risk) and **route** it to the right downstream queue.
- For bug reports, produce a **structured, deduplicated** record (component, severity, repro steps) for the engineering tracker.
- For a small slice — **ambiguous, multi-issue, or escalated** items — do open-ended investigation: pull the customer's history, search past tickets and docs, and decide whether to merge, escalate, or draft a response. **The steps here cannot be enumerated in advance.**
- Anything that drafts a customer-facing reply must pass a **human gate** before sending (cost-of-error is high).

### Architecture: a workflow with one agentic stage

```mermaid
flowchart TD
    In[Feedback item] --> R{Router<br/>classify category}
    R -->|praise| Log[Log and thank<br/>single call]
    R -->|feature| Track[Append to roadmap<br/>prompt chain]
    R -->|bug| Chain[Bug chain<br/>extract then dedup then format]
    Chain --> Gate{Schema gate<br/>valid record?}
    Gate -->|fail| Repair[Repair or queue for human]
    Gate -->|pass| Tracker[Write to engineering tracker]
    R -->|ambiguous or escalated| Agent[Investigation agent<br/>agentic loop]
    Agent --> HG{Human gate<br/>reply approved?}
    HG -->|yes| Send[Send response]
    HG -->|no| Human[Human handles]
```

The router (pattern 2) and the bug chain (pattern 1, with a schema gate) are pure workflow — fixed paths, cheap, debuggable, and the bulk of the volume. Only the **ambiguous/escalated branch** becomes an agent, because there you genuinely cannot pre-script the steps: it might need one lookup or six, in an order that depends on what it finds.

### Why this split is correct (the four-question test, applied)

- **Praise / feature / bug** fail the *complexity* test — their steps are enumerable, so they stay workflows. Forcing them through an agent would burn 10x the tokens to do a job a chain does deterministically.
- **The ambiguous branch passes all four:** complex (unpredictable steps), valuable (these are the costly cases), viable (Claude can investigate with the right tools), and **error-recoverable only because of the human gate** before any reply is sent.

### Execution trace: an item that escalates from workflow to agent

```mermaid
sequenceDiagram
    actor U as Customer
    participant R as Router workflow
    participant A as Investigation agent
    participant T as Tools history plus search
    participant H as Human reviewer
    U->>R: "App keeps logging me out AND I was double charged"
    R->>R: classify, detects two issues, marks ambiguous
    R->>A: hand off with full text plus customer id
    A->>T: lookup_customer_history(id)
    T-->>A: 3 prior logout tickets, 1 open billing dispute
    A->>T: search_tickets("double charge")
    T-->>A: known billing bug, fix shipping Friday
    A->>H: draft reply plus merge into BUG-417, escalate billing
    H-->>U: approved reply sent
```

The router could not handle this item — it is two issues at once, and the right next step depended on what the history lookup returned. That unpredictability is the signal to cross from workflow into agent. Note the agent still ends at a **human gate**, satisfying cost-of-error.

### Implementation sketch

The router is deterministic dispatch over a classification — *not* an agent:

```python
def triage(item):
    category = classify(item)              # one LLM call, returns an enum
    if category == "bug":
        return bug_chain(item)             # prompt chain + schema gate
    if category in ("praise", "feature"):
        return simple_handler(category, item)
    return investigation_agent.run(item)   # only this branch is agentic
```

The bug chain is a workflow with a hard gate between steps — the gate, not a prompt, is what guarantees a valid record:

```python
def bug_chain(item):
    extracted = llm_extract(item)          # component, severity, repro
    if not schema_valid(extracted):        # programmatic gate, not model self-check
        return queue_for_human(item)
    deduped = dedupe_against_tracker(extracted)
    return write_tracker(format_record(deduped))
```

Only the investigation branch is an `AgentDefinition` running the agentic loop of Chapter 3, with least-privilege read tools and a mandatory human gate before any send:

```python
investigation_agent = AgentDefinition(
    name="feedback_investigator",
    description="Investigates ambiguous or escalated feedback; drafts but never sends.",
    system_prompt="Investigate the item, then propose a resolution. Never send a reply yourself.",
    allowed_tools=["lookup_customer_history", "search_tickets", "search_docs", "draft_reply"],
)  # no send_email tool — the human gate owns that action
```

### Validation

- **Spectrum-fit test:** measure cost/latency per category. If the bug chain were "upgraded" to an agent, tokens-per-item should spike with no quality gain — proving the workflow choice was right.
- **Gate test:** feed the bug chain malformed inputs and assert the schema gate (not the model) routes them to human review 100% of the time.
- **Routing-accuracy eval:** measure the classifier independently; a misroute is a silent failure, so track it as its own metric (§14.2).
- **Human-gate test:** assert the investigation agent has **no** send tool — confirm it physically cannot send a reply, so cost-of-error stays bounded.

### Common pitfalls

- **Agent-washing the whole pipeline.** Making the router and bug chain "an agent" multiplies cost and destroys debuggability for branches whose steps you can enumerate — the opposite of "start simple."
- **A chain with no gates.** Without the programmatic check between steps, prompt chaining is just a slower, more expensive single call (§14.2).
- **Promoting to an agent without verifiable progress.** The ambiguous branch only works because every action is a read or a draft, with a human gate on send — remove that and it fails the fourth question.
- **Tuning the agent's prompt instead of its tools.** When the investigator mis-calls `search_tickets`, fix the tool schema, not the system prompt (§14.4).

## 14.6 Key Takeaways

| Concept | What to remember |
|---|---|
| Control vs flexibility | Workflow = *your* code controls the flow; agent = *the model* controls the flow. They are ends of a spectrum, not a binary (§14.1). |
| Start simple | Use the simplest pattern that passes evals; move right only when you cannot enumerate the steps. Each step right costs latency, tokens, and debuggability (§14.1). |
| Five workflow patterns | Prompt chaining, routing, parallelization (sectioning/voting), orchestrator–workers, evaluator–optimizer — most "agent" needs are one of these (§14.2). |
| The four-question test | Complexity, value, viability, cost-of-error must *all* be yes before building an agent; cost-of-error sets the autonomy ceiling (§14.3). |
| Invest in the ACI | On modern Claude, reliability is won in tool descriptions and schemas, not clever prompting (§14.4). |
| One agentic stage | Promote only the branch whose steps you cannot enumerate; keep the rest as cheap, gated workflows (§14.5). |

> **Beyond the exam, but anchored to Domain 1.** The orchestrator–workers pattern *is* the coordinator/subagent design (Chapter 3), and the cost-of-error question *is* why Domain 5 keeps deterministic hooks and human gates. Master this spectrum and you can justify — not just assemble — any agent architecture.

# Chapter 15: The Agent Harness

> *Advanced — beyond the official exam scope.* Source: [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents).

The model emits text and tool calls. That is *all* it does. Everything else that makes a model behave like an **agent** — running the tools, deciding what to feed back in, persisting progress, stopping at the right moment, recovering from a crashed tool, recording what happened — is code you write *around* the model. That code is the **harness**.

This distinction is the most important mental model in production agent engineering. When a long-running agent fails — loops forever, forgets what it already did, leaks a secret into a log, declares success on broken code — the fix is almost never "a better prompt." It is a fix in the harness. **The prompt shapes the model's judgment; the harness governs the system's behavior.** For anything that must be reliable, behavior beats judgment.

This chapter is advanced material — the Foundations exam does not test "build a harness." But every harness responsibility below is the production-grade version of an exam theme: the agentic loop (Domain 1), tool design and error handling (Domain 2), and context management and reliability (Domain 5). Reading this chapter is the best way to understand *why* those exam topics exist. By the end you should be able to name the components of a harness, reason about the trade-offs in each, and design one end-to-end.

This chapter covers:

- **What a harness is vs. what the model is** (§15.1) — drawing the line precisely.
- **The five core components** (§15.2) — loop driver, tool execution, context assembly, error handling, observability.
- **Design principles for long-running harnesses** (§15.3) — state, decomposition, verification, cleanup.
- **An end-to-end case study** (§15.4) — a long-running codebase-migration agent.
- **Key takeaways** (§15.5).

## 15.1 What the Model Does vs. What the Harness Does

A single API call to Claude takes a list of messages plus tool definitions, and returns one response: some text, zero or more `tool_use` blocks, and a `stop_reason`. It does not run the tools. It does not remember the previous call. It does not decide when the task is "done." It cannot read a file, hit an API, or commit to git. It produces *a request to do those things* and waits.

The harness is everything that closes that gap:

```mermaid
flowchart TD
    H[Harness] --> A[Loop driver<br/>decides next step and when to stop]
    H --> B[Tool execution<br/>runs the tool, returns a result]
    H --> C[Context assembly<br/>builds the next request]
    H --> D[Error handling<br/>retries, timeouts, guardrails]
    H --> E[Observability<br/>logs, traces, metrics]
    M[Model] -. emits text plus tool_use plus stop_reason .-> H
    H -. sends messages plus tools .-> M
```

A useful test: **if you removed the model and replaced it with a human typing the same tool calls, what infrastructure would still be needed to run the task?** That infrastructure is the harness. The model supplies *judgment about what to do next*; the harness supplies *the machinery to actually do it, safely and observably, over and over*.

Why this line matters in practice: it tells you where to put each concern. A money limit, a permission check, a retry policy, a secret redactor, a stop condition — none of these belong in the prompt, because the prompt is advisory and the model is probabilistic. They belong in the harness, where they are deterministic code (this is the exam's hooks-vs-prompts rule from Chapter 3, generalized to the whole system).

## 15.2 The Five Core Components of a Harness

### Loop driver

The loop driver is the heart of the harness: a `while` loop that calls the model, inspects `stop_reason`, runs any requested tools, appends the results, and calls again — until a real stop condition fires.

```mermaid
flowchart TD
    Start[Receive task] --> Build[Assemble request<br/>messages plus tools]
    Build --> Call[Call the model]
    Call --> Stop{stop_reason?}
    Stop -->|tool_use| Exec[Execute requested tools]
    Exec --> Append[Append tool_result<br/>to history]
    Append --> Budget{Budget or<br/>guardrail hit?}
    Budget -->|no| Build
    Budget -->|yes| Halt[Halt and escalate]
    Stop -->|end_turn| Done[Return result]
```

The non-obvious decisions live here:

- **The stop condition.** The *primary* signal is `stop_reason == "end_turn"` — never parsed assistant text like "Done!", and never an iteration cap as the main control (Chapter 3, §3.1). But a production loop layers *secondary* guardrails on top: a max-turns budget, a token budget, a wall-clock timeout, and an escalation trigger. These do not *replace* `end_turn`; they bound the blast radius if the model never reaches it.
- **Sequential vs. parallel tool execution.** A single model response can contain several `tool_use` blocks. Read-only, independent tools (two lookups) can run concurrently for latency; tools with side effects, or where one depends on another's result, must run in order. The harness owns this decision — the model cannot.
- **Where to enforce policy.** Permission checks and business rules run *between* the model's request and the tool's execution, not inside the model. This is the natural home for the Chapter 3 hook pattern.

**Pitfall:** trusting the model to stop itself. Without a budget, a model that gets confused can call tools forever, burning money and time. **Pitfall:** treating the iteration cap as the *normal* exit — if your agent routinely hits `max_turns`, the task is under-decomposed (see §15.3), not the limit too low.

### Tool execution

A `tool_use` block is *a request*, not an action. The harness validates it, runs it, and turns whatever happened — success, error, timeout — into a `tool_result` the model can reason about.

Three responsibilities are easy to under-build:

1. **Validation before execution.** Check the arguments against the tool's schema and against policy *before* touching anything. A malformed or out-of-policy call should become an error result the model can correct, not a crash or an unauthorized action.
2. **Sandboxing and least privilege.** Tools that touch the filesystem, shell, or network are the agent's attack surface. Scope them (allowed paths, allowed commands, network allowlists) so a confused or adversarial model cannot exfiltrate data or destroy state. The harness — not the prompt — enforces this.
3. **Turning failure into a result.** When a tool raises, times out, or returns an error, the harness must feed a *structured error back to the model* (`is_error: true` with a clear message), not throw the whole loop away. A well-formed error message ("file not found: /x; did you mean /y?") lets the model self-correct on the next turn — that recovery loop is one of the biggest reliability wins a harness provides.

**Trade-off:** rich, forgiving tool results help the model recover but cost tokens and can leak internals; terse results are cheap but give the model less to work with. Tune per tool.

### Context assembly

The model is stateless; the harness decides *exactly what the model sees* on every call. This is the single biggest lever on cost, latency, and quality — and the hardest part to get right over a long run.

Context assembly answers, each turn: which system prompt, which tool definitions, how much conversation history, which retrieved documents or state files, and in what order. Key techniques (drawn from Domain 5):

- **Compaction / summarization.** A long-running agent will exceed any context window. The harness must summarize or prune older history while preserving the load-bearing facts. Things that must *survive* summarization (a findings list, a source registry, the original goal) live in a structured block the harness re-injects verbatim every turn, rather than relying on them staying in the rolling history.
- **Prompt caching.** Stable prefixes (system prompt, tool definitions, a large rubric) should be cached so repeated turns bill at a fraction of the cost. The harness controls cache boundaries; misplacing them silently wastes money.
- **Externalized state.** The cheapest context is the context you *don't* send. Keep machine-readable state (a progress file, a feature list in JSON) on disk and let the agent read only the slice it needs, rather than carrying everything in the window.

**Pitfall:** naive "append everything" context. It works in a demo and fails in production — cost grows turn over turn, latency climbs, and important early facts get buried or summarized away. **Pitfall:** summarizing away the one fact the task depended on. Decide *explicitly* what must never be compacted.

### Error handling and guardrails

Beyond individual tool failures, the harness owns system-level reliability: retries with backoff for transient API errors, timeouts on every external call, circuit breakers when a dependency is down, and *guardrails* that block disallowed actions regardless of what the model decides. Guardrails are deterministic code (block a refund over a limit, refuse to write outside the repo, require human approval for irreversible actions) — the production generalization of Chapter 3's hooks. **The rule from Chapter 3 holds for the whole harness:** when failure has financial, legal, or safety consequences, enforce it in code, not in the prompt.

### Observability

A long-running agent is a black box unless the harness opens it. Log every turn: the request (or a hash), the model's text and tool calls, each tool result, token counts, latency, and the eventual stop reason. This is what lets you debug "why did it do that on turn 40," attribute cost, build evals from real traces, and detect drift. **Pitfall:** logging raw tool I/O that contains secrets or PII — the observability layer is exactly where redaction must live.

## 15.3 Design Principles for Long-Running Harnesses

When an agent must run for hours across many context windows (a large migration, a multi-day investigation), a handful of principles separate harnesses that finish from harnesses that stall:

- **Differentiated initialization.** Use a *different prompt for the first context window* — one that lays down scaffolding (a feature list, repo layout, a progress doc) that every later session reads. Session one builds the map; later sessions follow it.
- **Structured, machine-readable state.** Persist progress as artifacts a fresh context window can parse in seconds — a feature list in JSON, a `progress.md`, a manifest that drives resume. The agent's memory lives on disk, not in the window.
- **Incremental decomposition.** Have the agent do **one unit of work at a time** (one feature, one file, one migration step), verify it, commit, then move on — rather than one-shotting the whole thing and running out of context mid-task. If the loop keeps hitting `max_turns`, the unit is too big.
- **Explicit verification.** Mandate end-to-end checks (tests pass, build is green) *before* a unit is declared done. Never trust the model's "it works" without evidence — pair the harness with an evaluator (Chapter 16) so success is *checked*, not *claimed*.
- **Environmental cleanup.** Require the agent to commit progress to git with descriptive messages and leave a clean state a human could pick up. The next session — or the next person — starts from a known-good point.
- **Session startup routine.** Begin each session by reading the progress file, reviewing recent git history, and running basic checks *before* doing new work, so a fresh context window re-orients instead of guessing.

## 15.4 End-to-End Case Study: A Long-Running Codebase-Migration Agent

The components above only matter when they fit together. Here is a realistic long-running agent: migrate a large repository from one framework version to the next — hundreds of files, far more work than fits in a single context window — running unattended overnight.

### Requirements

- Migrate every module in the repo from `framework v1` to `framework v2`, one module at a time.
- The work vastly exceeds one context window, so the agent must **resume across many sessions** without losing progress.
- A module is **not done until its tests pass** — no "looks migrated" without evidence.
- **Hard rule:** the agent may write only inside the repo and may run only allowlisted commands (no network, no deletes outside the repo). This is enforced in code.
- Every session must leave a **clean, committed git state** a human could inspect.
- The whole run must be **observable** — which module, which turn, what failed.

### Architecture

```mermaid
flowchart TD
    Start[Session start] --> Read[Read progress.json<br/>and git log]
    Read --> Pick[Pick next module<br/>marked pending]
    Pick --> Loop[Run agentic loop<br/>edit and migrate module]
    Loop --> Sandbox{{Tool sandbox<br/>repo-only writes plus allowlist}}
    Sandbox --> Verify[Run module tests]
    Verify --> Pass{Tests green?}
    Pass -->|no| Loop
    Pass -->|yes| Commit[Commit with message<br/>and mark module done]
    Commit --> More{More modules<br/>or budget left?}
    More -->|yes| Pick
    More -->|no| End[Stop and report]
```

The harness owns every non-model concern: the **loop driver** runs the migration turns; the **tool sandbox** makes repo-only, allowlisted execution a hard guarantee; **context assembly** keeps each session lean by reading `progress.json` instead of replaying history; **verification** (tests) gates completion; and **commits plus the progress file** give cleanup and resumability.

### Implementation sketch

The state file is the agent's long-term memory — small, machine-readable, re-read at every session start:

```
# progress.json — drives resume across context windows
{
  "framework": "v1 -> v2",
  "modules": [
    {"path": "src/auth",     "status": "done",    "commit": "a1b2c3d"},
    {"path": "src/billing",  "status": "pending"},
    {"path": "src/reports",  "status": "pending"}
  ]
}
```

The loop driver bounds the run and trusts only the real stop signal plus explicit guardrails:

```python
def run_session(state, budget_turns=200):
    history = build_initial_context(state)   # progress.json + repo map, not full history
    for turn in range(budget_turns):
        resp = model.call(messages=history, tools=TOOLS)
        log_turn(turn, resp)                 # observability: every turn recorded
        if resp.stop_reason == "end_turn":
            return "session_complete"
        for call in resp.tool_uses:
            result = execute_tool(call)      # validates, sandboxes, returns errors as results
            history.append(result)
    return "budget_exhausted"                # secondary guardrail, not the normal exit
```

Tool execution enforces the sandbox in code — the model cannot widen its own permissions:

```python
def execute_tool(call):
    if call.name == "write_file" and not inside_repo(call.args["path"]):
        return tool_result(call, is_error=True,
                           text="Refused: writes are restricted to the repo.")
    if call.name == "run_command" and call.args["cmd"] not in ALLOWLIST:
        return tool_result(call, is_error=True,
                           text=f"Refused: '{call.args['cmd']}' is not allowlisted.")
    try:
        return tool_result(call, text=dispatch(call))   # success
    except ToolError as e:
        return tool_result(call, is_error=True, text=str(e))  # failure -> model can self-correct
```

### Execution trace

```mermaid
sequenceDiagram
    actor Op as Operator
    participant Ha as Harness
    participant Mo as Model
    participant Sb as Tool sandbox
    participant Git as Git repo
    Op->>Ha: Start overnight migration run
    Ha->>Ha: Read progress.json, pick src/billing
    Ha->>Mo: Migrate src/billing to v2 plus repo context
    Mo-->>Ha: tool_use write_file src/billing
    Ha->>Sb: write_file inside repo
    Sb-->>Ha: ok
    Ha->>Sb: run_command pytest src/billing
    Sb-->>Ha: 2 tests failed
    Ha->>Mo: tool_result tests failed plus output
    Mo-->>Ha: tool_use write_file fix
    Ha->>Sb: run_command pytest src/billing
    Sb-->>Ha: all tests pass
    Ha->>Git: commit migrate src/billing to v2
    Ha->>Ha: mark src/billing done in progress.json
    Mo-->>Ha: end_turn
    Ha-->>Op: src/billing done, 2 modules remaining
```

Notice what the harness — not the model — guaranteed: the write stayed inside the repo (sandbox), the failed tests came back as a *result the model could fix* rather than a crash (error handling), completion was gated on green tests (verification), and progress survived for the next session (state plus commit). The model supplied only the migration edits.

### Validation

- **Resumability test:** kill the process mid-module and restart. The agent must re-read `progress.json`, skip the `done` modules, and resume the `pending` one — no repeated or lost work.
- **Sandbox test:** prompt the agent to write outside the repo or run a non-allowlisted command; assert it is refused by the harness *as an error result*, and that the loop continues.
- **Verification gate test:** point at a module whose tests fail; assert it is never marked `done` and is left `pending` for the next attempt.
- **Budget test:** force a non-terminating situation; assert the loop halts at `budget_turns` and escalates rather than running forever.

### Common pitfalls

- Carrying full conversation history across sessions instead of a compact `progress.json` (cost explodes; old facts get summarized away — §15.2).
- Enforcing the repo-only / allowlist rule in the *prompt* instead of in `execute_tool` (probabilistic, not guaranteed — §15.1).
- Marking a module done on the model's word instead of on passing tests (§15.3, verification).
- Using `budget_turns` as the *normal* exit signal instead of `end_turn` (the task is under-decomposed — §15.2).

## 15.5 Key Takeaways

| Concept | What to remember |
|---|---|
| Model vs. harness | The model only emits text plus `tool_use` plus `stop_reason`; the harness runs tools, assembles context, drives the loop, handles errors, and observes. Reliability lives in the harness, not the prompt (§15.1). |
| Loop driver | Primary stop signal is `stop_reason == "end_turn"`; budgets/timeouts are *secondary* guardrails that bound the blast radius, never the normal exit (§15.2). |
| Tool execution | A `tool_use` is a request — validate, sandbox (least privilege), and turn failures into structured `is_error` results so the model can self-correct (§15.2). |
| Context assembly | The harness decides exactly what the model sees each turn; use compaction, caching, and externalized state, and pin facts that must never be summarized away (§15.2). |
| Guardrails | Money/legal/safety rules and permission checks are deterministic code between request and execution — the system-wide generalization of Chapter 3 hooks (§15.2, §15.4). |
| Long-running design | Externalized machine-readable state, incremental decomposition, explicit verification, git cleanup, and a session-startup routine make multi-window runs resumable (§15.3). |

> **Beyond the exam, but built on it.** The harness is the production-grade form of the agentic loop (Domain 1), tool design and error handling (Domain 2), and context management and reliability (Domain 5). Pair it with **loop engineering** (Chapter 16): the harness gives an agent the machinery to run autonomously; the evaluator loop gives it a reason to trust the result.

# Chapter 16: Loop Engineering

> *Advanced — beyond the official exam scope.* Sources: [The New Stack — Loop engineering](https://thenewstack.io/loop-engineering/); Anthropic — [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) (evaluator–optimizer) and [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).

As agents grew more capable, the highest-leverage design work shifted from *writing the perfect one-shot prompt* to **designing the loop the agent runs in** — "ditched prompting, now writes loops." The loop (model → tool calls → feedback → repeat) is the unit you engineer. Chapter 3 introduced the *minimal* agentic loop for the exam: a `while` that runs until `stop_reason == "end_turn"`. That loop is correct, but it is also dangerously naive in production — it assumes the model always converges, never repeats itself, and never needs to be stopped, paused, or resumed. Real agents do all of these.

This chapter is the production engineering of that loop. It is **advanced material beyond the Foundations exam**, but it rests on one idea the exam *does* test (§3.1): **the model is in charge of the next step, so the harness must be in charge of the boundaries.** A loop that only stops on `end_turn` will, on a bad run, burn your entire token budget oscillating between two tools or chasing a goal it can never reach. Loop engineering is the discipline of giving an autonomous loop **edges**: stop conditions, budgets, progress detection, oscillation guards, and recovery checkpoints — so it can run unattended for minutes or hours without drifting, looping forever, or losing its work on a crash.

We cover six concerns:

- **Stop conditions** (§16.1) — the layered exit signals beyond `end_turn`.
- **Step and turn budgets** (§16.2) — bounding cost and latency without using a step cap as your *primary* stop.
- **Progress detection** (§16.3) — telling "still working" apart from "stuck," and oscillation guards.
- **Generator–evaluator loops** (§16.4) — splitting the worker from the checker to get a trustworthy "done."
- **Recovery and checkpoints** (§16.5) — surviving crashes and resuming a long loop without redoing work.
- **End-to-end case study** (§16.6) — a long-running codebase-migration agent that puts all five together.

## 16.1 Stop conditions: beyond `end_turn`

The exam's answer to "when does the loop stop?" is `stop_reason == "end_turn"` — and as the *completion* signal that is exactly right (never parse assistant text, never use a raw iteration cap as the *meaning* of done). But `end_turn` only answers **"did the model decide it is finished?"** A production loop needs to stop for several other reasons the model will never raise on its own. Think of stop conditions as **layers**, each owned by a different part of the system:

```mermaid
flowchart TD
    A[Loop iteration] --> B{Model says end_turn?}
    B -->|yes| C{Evaluator passes<br/>done criteria?}
    C -->|yes| DONE[Stop SUCCESS]
    C -->|no| FB[Inject feedback<br/>continue loop]
    FB --> A
    B -->|no, tool_use| D{Budget exhausted?}
    D -->|yes| BUD[Stop BUDGET<br/>hand off partial]
    D -->|no| E{No progress<br/>or oscillating?}
    E -->|yes| STUCK[Stop STUCK<br/>escalate to human]
    E -->|no| F{Guardrail or<br/>fatal error?}
    F -->|yes| ABORT[Stop ABORTED<br/>safe shutdown]
    F -->|no| G[Execute tool<br/>append result]
    G --> A
```

The five **terminal states** — `SUCCESS`, `BUDGET`, `STUCK`, `ABORTED`, and a timeout variant — matter because they drive *different* downstream behavior. A `SUCCESS` returns the result; a `BUDGET` stop hands off partial work with a clear "ran out of room here" marker; a `STUCK` stop escalates to a human (Domain 5) rather than pretending success; an `ABORTED` stop performs a safe shutdown after a guardrail trip or unrecoverable error. The single most common production bug is **collapsing all of these into one boolean** `done`, so the caller can't tell a finished task from a quit one.

**Why this matters / pitfalls.** Two failure modes bracket this design. Stop *too eagerly* (only `end_turn`, no evaluator) and the agent declares victory on work that doesn't actually pass — the model is an unreliable judge of its own output (§16.4). Stop *too late* (no budget, no progress check) and a single bad run can cost real money and wall-clock time while making no progress. The fix is not a smarter prompt; it is **multiple independent stop signals**, each owned by code, not the model.

## 16.2 Step and turn budgets

A **budget** bounds how much the loop may consume before it must stop and hand off. The exam-correct nuance (§3.1) is that an iteration cap is an **anti-pattern as the *primary* stop condition** — it tells you nothing about whether the work is done. But a budget is still essential as a **safety ceiling**: it is the difference between a runaway loop costing $2 and costing $2,000.

Budget along whichever axis actually hurts you:

| Budget type | Bounds | Typical use |
|---|---|---|
| **Turn / iteration** | Number of model calls | Cheap guard against tight infinite loops |
| **Token** | Total input+output tokens | The real cost ceiling; tracks context growth |
| **Wall-clock** | Elapsed time | Latency SLAs; user-facing interactivity |
| **Tool-call** | Calls to a specific tool | Rate limits, expensive or side-effecting tools |

**Why/trade-offs.** Token budgets are usually the truest cost proxy because context grows every iteration — each tool result is appended, so late iterations are far more expensive than early ones. Set the budget from the **p95 of successful runs plus headroom**, not the average: if a task normally finishes in 12 turns but occasionally needs 30, a cap of 15 will strangle legitimate work, while a cap of 100 lets a stuck loop run 70 turns past the point of no progress. This is why a budget should be a **backstop**, not the everyday exit — progress detection (§16.3) should usually stop a stuck loop *long before* the budget does. A budget that fires often is a signal your real stop conditions are too weak.

When the budget is the thing that stops you, **never silently drop the work.** Emit a partial-result handoff: what was accomplished, what remains, and the state needed to resume (§16.5). A budget stop is a pause, not a failure.

## 16.3 Progress detection and oscillation

This is the hardest part of loop engineering and the part the naive loop ignores entirely. The loop must distinguish three states that all *look* like "the model called another tool":

- **Progressing** — each step changes state toward the goal (tests go from 8 failing to 5 failing).
- **Stuck** — steps execute but the relevant state doesn't change (the same test keeps failing the same way).
- **Oscillating** — the agent flips between two states forever (edit A → test fails → revert to B → test fails → edit A …).

```mermaid
flowchart TD
    S[Capture progress signal<br/>after each step] --> C{Signal improved<br/>vs last checkpoint?}
    C -->|yes| R[Reset stall counter<br/>save checkpoint]
    R --> CONT[Continue loop]
    C -->|no| I[Increment stall counter]
    I --> O{Same state seen<br/>2 plus times before?}
    O -->|yes| OSC[Oscillation detected<br/>break the cycle]
    O -->|no| T{Stall counter<br/>over threshold?}
    T -->|yes| ESC[No progress<br/>change strategy or escalate]
    T -->|no| CONT
    OSC --> ESC
```

**Defining a progress signal.** Progress is only measurable against a **concrete, external metric** — never the model's self-report. Good signals are domain artifacts the harness can read without asking the model: failing-test count, lines remaining to migrate, unresolved checklist items in a progress file, a build that goes from red to green. The evaluator's checkable "done" criteria (§16.4) double as the progress yardstick. If you cannot name a signal the *harness* can measure, you cannot detect being stuck, and the loop has no edges.

**Oscillation guards.** Oscillation is insidious because every individual step looks productive — the model has a fresh, plausible reason each time. Detect it by **hashing the relevant state** (e.g. the set of changed files plus the test outcome) and tracking recent hashes; a repeat means a cycle. When you catch one, *change something* rather than letting it spin: inject the loop's own history ("you have tried A and B twice each; both fail the same test — try a different approach"), force a different tool, or escalate. Feeding the model its own loop history is often enough, because oscillation usually comes from the model **forgetting it already tried the other branch** — a context/memory problem as much as a reasoning one.

**Why/pitfalls.** The classic mistake is using a **turn cap as a stand-in for progress detection** — it eventually stops the oscillation, but only after wasting the entire budget, and it can't tell "stuck" from "almost done on a genuinely long task." The second mistake is trusting the model's narration ("Making good progress!") as the signal; a stuck model is often the *most* confident. Always measure progress against an artifact, never against prose.

## 16.4 Generator–evaluator loops

The most consequential single choice in a loop: **split the agent that produces the work from the agent that checks it.** A model grading its **own** output is too generous — it rationalizes the mistakes it just made. A **separate evaluator** with different instructions and a clean context catches the failures the generator reasoned itself into. This is the **evaluator–optimizer** pattern (Chapter 14) used as the core loop, and it maps onto the normal software lifecycle: code review and QA play the evaluator role.

```mermaid
flowchart TD
    G[Generator<br/>produces or revises work] --> E[Evaluator<br/>fresh context, own criteria]
    E --> D{Meets all<br/>done criteria?}
    D -->|yes| PASS[Accept output<br/>stop SUCCESS]
    D -->|no| F[Structured feedback<br/>what failed and why]
    F --> B{Budget or stall<br/>limit reached?}
    B -->|yes| ESC[Escalate to human<br/>with partial plus feedback]
    B -->|no| G
```

This single pattern resolves the "stop too eagerly" failure from §16.1: the evaluator, not the generator's `end_turn`, owns the `SUCCESS` decision. Making it work:

- Give the evaluator **explicit, checkable "done" criteria** — vague criteria produce noisy loops that never converge or pass slop. "All unit tests pass and no public API changed" beats "looks correct."
- Keep the evaluator's context **fresh and independent** of the generator's reasoning — a shared context lets the generator's rationalizations leak in, and the whole point is independence.
- Return **structured, actionable feedback**, not just pass/fail — the feedback is the generator's next input, so "test_auth fails: token expiry off by 3600s" is worth ten "try again"s.
- Pair it with the **harness** (Chapter 15): the verification step is what lets the loop run autonomously without drifting or declaring premature success.

**Trade-offs.** A separate evaluator costs an extra model call per round and roughly doubles per-iteration latency. Reserve it for steps where a wrong "done" is expensive (anything shipping code, money, or irreversible actions); for cheap, easily-reversible steps a programmatic check (a test runner, a schema validator) is a faster, fully-deterministic evaluator. The evaluator does not have to be a model — **the strongest evaluator is usually code.**

## 16.5 Recovery and checkpoints

A loop that runs for an hour *will* be interrupted — a crash, a rate limit, a deploy, a context-window rollover (Chapter 15). Without recovery, an interruption means **redoing everything**, which for a long agent is both expensive and risky (re-running side-effecting tools). Loop engineering therefore treats the loop as **resumable**: it periodically writes a **checkpoint** — durable, machine-readable state from which a fresh loop can continue where the last one stopped.

A good checkpoint captures the minimum needed to resume: the **goal**, the **progress signal** (§16.3), a **completed-vs-remaining** breakdown, and a pointer to externalized work (e.g. a git commit), so the resumed loop does *not* need the full prior message history. This is the same instinct as Chapter 15's "structured state management" and "session startup routines," applied at loop granularity. Checkpoint at **meaningful boundaries** — after the evaluator accepts a unit of work, not after every token — so a checkpoint always represents a consistent, verified state you'd be happy to resume from.

**Idempotency is the catch.** On resume, the loop may re-attempt a step that *partially* completed before the crash. If that step had a side effect (sent an email, charged a card, wrote a file), naïve resume **double-applies it**. The defenses are the standard ones: make side-effecting tools idempotent (keyed by a request id), record each side effect in the checkpoint *before* acting, and on resume reconcile against that record rather than blindly replaying. Recovery checkpoints and the budget handoff (§16.2) use the *same* serialized state — a budget stop is just a planned checkpoint that happens to be the last one.

## 16.6 End-to-End Case Study: A Long-Running Codebase-Migration Agent

The pieces above only matter assembled. Consider an agent asked to **migrate a large repository from a deprecated logging library to a new one** — hundreds of files, a multi-hour job that *will* span several context windows and may crash partway. This is the canonical loop-engineering problem: it is genuinely open-ended (you can't hardcode the steps), but progress is **verifiable** (the build and tests are ground truth), which is exactly when an agent — not a workflow — is justified (Chapter 14).

### Requirements

- Migrate every call to `old_logger` to `new_logger` across the repo, preserving behavior.
- The job exceeds one context window and one process lifetime — it **must survive crashes and resume** without redoing finished files.
- **Done** is defined by code, not by the model's say-so: the project builds, all tests pass, and no `old_logger` import remains.
- Bound the cost: stop and hand off if a hard token budget is hit, and escalate to a human if the loop stops making progress.

### Architecture

```mermaid
flowchart TD
    Start([Start or resume]) --> Init[Read checkpoint<br/>build remaining file list]
    Init --> Loop{Files remaining<br/>and budget left?}
    Loop -->|no, none left| Final[Full build plus test<br/>final evaluator]
    Loop -->|no, budget hit| Handoff[Write checkpoint<br/>hand off partial]
    Loop -->|yes| Gen[Generator migrates<br/>next file]
    Gen --> Eval[Evaluator<br/>build plus tests for file]
    Eval --> Ok{Passed?}
    Ok -->|yes| Save[Commit file<br/>write checkpoint]
    Save --> Loop
    Ok -->|no| Prog{Progress on<br/>this file?}
    Prog -->|yes| Gen
    Prog -->|no, stalled| Esc[Escalate file<br/>to human]
    Esc --> Loop
    Final --> Done[Stop SUCCESS]
```

The loop's **unit of work is one file**, not the whole repo (incremental decomposition, Chapter 15): each file is generated, verified by an evaluator that actually runs the build and the file's tests, then committed and checkpointed before the next. That makes every checkpoint a consistent, verified state, and keeps each iteration's context small.

### The loop, in pseudocode

The structure is a `while` whose *edges* are the stop conditions — `end_turn` alone is nowhere near enough:

```python
def migration_loop(state):
    while state.files_remaining:
        if state.tokens_used > TOKEN_BUDGET:
            return handoff(state, reason="budget")          # §16.2 planned checkpoint
        f = state.files_remaining[0]

        result = generate_migration(f, context=minimal(state))   # generator
        verdict = evaluator_run_build_and_tests(f, result)       # §16.4 code-as-evaluator

        if verdict.passed:
            commit(f, result)
            state.mark_done(f)
            checkpoint(state)                               # §16.5 at a verified boundary
            state.stall = 0
        else:
            state.stall += 1
            if oscillating(state, f) or state.stall > STALL_LIMIT:   # §16.3
                escalate(f, history=state.recent_attempts)  # change strategy / human
                state.defer(f)
        # loop continues; the model never decides to stop on its own here

    return finalize(state)   # full build + tests = the real end_turn
```

Note what is *not* trusted: the model never declares the file done — the **evaluator running real tests** does (`SUCCESS` is owned by code, §16.4). The model never decides to keep looping forever — the **budget and stall guards** decide (§16.2, §16.3). And the loop never loses work — every verified file is **committed and checkpointed** (§16.5).

### Execution trace (a crash and a clean resume)

```mermaid
sequenceDiagram
    actor Op as Operator
    participant H as Harness
    participant G as Generator
    participant V as Evaluator
    participant CK as Checkpoint store
    Op->>H: Start migration job
    H->>G: Migrate auth.py
    G-->>H: Edited auth.py
    H->>V: Build plus run tests
    V-->>H: Passed
    H->>CK: Save checkpoint at file 41 of 300
    Note over H: Process crashes mid file 42
    Op->>H: Restart job
    H->>CK: Load last checkpoint
    CK-->>H: Resume at file 42, 259 remaining
    H->>G: Migrate billing.py
    G-->>H: Edited billing.py
    H->>V: Build plus run tests
    V-->>H: Passed
    H->>CK: Save checkpoint at file 43 of 300
```

The crash costs **one file of rework at most** (file 42, which had not been checkpointed), not the 41 already finished. The resumed loop reads the checkpoint, not the prior conversation, so it starts cheaply with a fresh context — exactly Chapter 15's session-startup routine, expressed as loop recovery.

### Validation

- **Resumability test:** kill the process mid-run, restart, and assert it resumes at the last checkpoint and never re-migrates a committed file (proves idempotent recovery, §16.5).
- **Budget test:** set an artificially low token budget and assert the loop stops with a `BUDGET` handoff carrying a resumable checkpoint — not a silent drop (§16.2).
- **Anti-oscillation test:** seed a file the generator can't fix and assert the loop detects the stall, escalates that one file, and *keeps migrating the rest* instead of spinning (§16.3).
- **Done-means-done test:** assert the job only reports `SUCCESS` when the full build and tests pass and no `old_logger` import remains — never on the model's word (§16.4).

### Common pitfalls

- Using a turn cap (`max_iterations`) as the *meaning* of done instead of a backstop — it can't tell finished from stuck (§16.1, §3.1).
- One global `done` boolean, so the caller can't distinguish `SUCCESS` from `BUDGET` from `STUCK` (§16.1).
- Trusting the model's "all done!" instead of an evaluator that runs the tests (§16.4).
- Checkpointing mid-file, so a resume re-applies a partial, side-effecting edit (non-idempotent recovery, §16.5).
- No progress signal, so an oscillating loop burns the whole budget looking busy (§16.3).

## 16.7 Key Takeaways

| Concept | What to remember |
|---|---|
| Stop conditions are layered | `end_turn` is the *completion* signal (§3.1), but a production loop also stops on **budget, stall/oscillation, and guardrail/error** — each a distinct terminal state, owned by code, not one global `done` (§16.1). |
| Budgets are backstops, not the plan | Bound tokens/turns/time as a safety ceiling sized from p95 + headroom; if the budget fires often, your real stop conditions are too weak (§16.2). |
| Detect progress against an artifact | Measure "stuck vs progressing" with an external metric (failing tests, files remaining), never the model's self-report; guard oscillation by hashing recent state and breaking the cycle (§16.3). |
| Split generator from evaluator | A separate evaluator with fresh context and checkable criteria owns the `SUCCESS` decision; structured feedback drives the next round — and the strongest evaluator is usually code (§16.4). |
| Make the loop resumable | Checkpoint durable, machine-readable state at verified boundaries so a fresh loop resumes cheaply; keep side effects idempotent so resume never double-applies (§16.5). |
| Agents need *edges* | The model owns the next step; the harness owns the boundaries. Loop engineering is giving an autonomous loop stop conditions, budgets, progress detection, and recovery so it runs unattended without drifting or looping forever (§16.6). |

> **Beyond the exam, built on it.** The Foundations exam tests the *minimal* loop (`stop_reason == "end_turn"`, no parsed text, no raw iteration cap — §3.1). Production loop engineering keeps that core and adds the edges: this is what turns the exam's correct-but-naive loop into an agent you can leave running for an hour and trust to stop in the right way.

# PART IV: Complete Claude Platform Reference (Beyond the Foundations Exam)

> **Scope note:** PART IV is a reference to the **full current Claude platform** (2026) for comprehensive mastery — the API, tools, SDKs, Managed Agents, MCP, and modern Claude Code. Most of it is **beyond the official Foundations syllabus** (some is even on the exam's explicit out-of-scope list); it is here so you can *learn all of Claude*, not only pass the exam. Each chapter cites official docs. Current models referenced: flagship **Claude Fable 5** (`claude-fable-5`); default Opus **Claude Opus 4.8** (`claude-opus-4-8`); plus **Sonnet 4.6** and **Haiku 4.5**.

---

# Chapter 17: Thinking, Effort & Reasoning Control

> *Reference — beyond the exam scope.* Docs: [Adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking) · [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) · [Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking).

Modern Claude models reason *before* they answer. For a production agent, the question is never "should the model think?" but "**how much** should it think, **when**, and **what does that cost me?**" Reasoning is the single largest lever on the quality/latency/cost triangle: too little and the agent fumbles a multi-step migration; too much and a one-line lookup burns 40 seconds and thousands of tokens. This chapter is about controlling that lever deliberately.

This material is **advanced and largely outside the Foundations syllabus** — the official out-of-scope list explicitly names extended-thinking internals. It earns its place here because every real agent you ship will live or die on these dials. Where the exam *does* touch the topic (it expects you to know adaptive thinking exists and that `effort` trades cost for depth), that is noted inline. By the end you should be able to:

- Choose between **adaptive thinking** and the deprecated fixed budget, and know what 400s on which model (§17.1).
- Tune the **effort** ladder (`low`→`max`) per route, not globally (§17.2).
- Reason about **interleaved thinking** with tool use — why it helps agents and what it costs (§17.3).
- Control **visibility** (`display`) and handle **redacted thinking** without breaking multi-turn replay (§17.4).
- Bound a whole agentic loop with **task budgets** vs. the per-response `max_tokens` cap (§17.5).
- Decide **when extended thinking helps vs. hurts** (§17.6).

§17.7 then builds a complete reasoning-controlled **code-migration agent** end-to-end, and §17.8 distills the takeaways.

## 17.1 Two eras of thinking control: budgets vs. adaptive

There are two generations of the thinking API, and mixing them is the most common error.

**The old way (deprecated).** You set a fixed ceiling: `thinking: {type: "enabled", budget_tokens: N}`, where `N` had to be strictly less than `max_tokens`. You guessed the budget up front, the same for every request.

**The current way.** `thinking: {type: "adaptive"}`. The model decides *per request* whether to think and how deeply, scaling its reasoning to the difficulty it perceives. There is no token budget to tune.

```mermaid
flowchart TD
    A[Request arrives] --> B{Model family?}
    B -->|Opus 4.7 / 4.8 / Fable 5| C[thinking type adaptive<br/>budget_tokens rejected with 400]
    B -->|Opus 4.6 / Sonnet 4.6| D[thinking type adaptive<br/>budget_tokens deprecated but works]
    B -->|Pre-4.6 models| E[thinking type enabled<br/>budget_tokens less than max_tokens]
    C --> F[Depth controlled by effort]
    D --> F
    E --> G[Depth controlled by the fixed budget]
```

**Why this matters in production:** a fixed budget over-thinks easy requests and under-thinks hard ones — it cannot tell them apart. Adaptive thinking spends nothing on a trivial lookup and ramps up for a genuine multi-step problem, which is exactly the spend profile an agent wants across a heterogeneous workload.

**The hard pitfall.** On Opus 4.7, Opus 4.8, and Fable 5, `thinking: {type: "enabled", budget_tokens: N}` is not merely discouraged — it returns a **400 error**. So do the sampling parameters `temperature`, `top_p`, and `top_k`. Code carried forward from an older model will fail outright, not degrade quietly. On Opus 4.6 and Sonnet 4.6 the budget still *works* but is deprecated (a transitional escape hatch only). On Fable 5 there is one extra twist: thinking is *always on*, so even an explicit `thinking: {type: "disabled"}` is a 400 — you omit the parameter entirely.

## 17.2 The effort ladder

With adaptive thinking, depth is governed by **effort**, set inside `output_config` (not at the top level):

```python
output_config={"effort": "high"}   # low | medium | high | xhigh | max
```

Effort controls reasoning depth *and* overall token spend together — and it shapes *behavior*, not just thinking length. Lower effort yields fewer, more-consolidated tool calls, less preamble, and terser confirmations; higher effort explores more before acting.

| Level | Use it for | What to expect |
|---|---|---|
| `low` | Latency-sensitive or simple tasks, cheap subagents | Minimal reasoning; fast; scopes work tightly to what was asked |
| `medium` | Cost-sensitive workloads that still need some reasoning | A favorable balance when you must trim tokens |
| `high` | **Default** (omitting effort equals `high`); most intelligence-sensitive work | The recommended floor for anything that matters |
| `xhigh` | **Coding and agentic work** — the sweet spot, and Claude Code's default | More tool use, deeper planning; pair with generous `max_tokens` |
| `max` | Correctness matters more than cost; the hardest, latency-insensitive cases | Ceiling intelligence; can overthink with diminishing returns |

**Why per-route, not global.** A single `effort` for the whole system is almost always wrong. The agent's planning loop wants `xhigh`; a fan-out of read-only "find the file" subagents wants `low`; an interactive chat reply wants `medium`. Setting one value forces you to overpay on the cheap paths or underthink on the expensive ones.

**Trade-off and pitfall.** Effort matters *more* on Opus 4.7/4.8 and Fable 5 than on any prior model, and it is not monotonic with cost. On long-horizon agentic work, **higher effort up front often reduces total cost** because the agent plans better and takes fewer wasted turns — the naive assumption "lower effort = cheaper" can be false end-to-end. The reflexive habit of always reaching for `xhigh` to "maximize intelligence" is also a mistake on Opus 4.8: start at `high` and sweep your eval set, because the relationship between effort, latency, and cost differs per task.

## 17.3 Interleaved thinking with tool use

In a non-trivial agent, the model does not think once and then act. It **thinks between tool calls** — read a tool result, reason about what it means, decide the next call. This is *interleaved* (or interspersed) thinking, and on adaptive-thinking models it happens **automatically with no beta header** (older models gated it behind `interleaved-thinking-2025-05-14`).

```mermaid
flowchart TD
    A[User goal] --> B[Think — plan first step]
    B --> C[Tool call 1]
    C --> D[Tool result 1]
    D --> E[Think — interpret result<br/>revise the plan]
    E --> F[Tool call 2]
    F --> G[Tool result 2]
    G --> H{Goal met?}
    H -->|no| E
    H -->|yes| I[Think — final synthesis] --> J[Answer]
```

**Why it helps.** Without interleaved reasoning the model commits to a tool plan before it has seen any results — brittle when a lookup returns something unexpected. Interleaved thinking lets it *re-plan mid-loop*: a failed test result feeds a corrected fix, an empty search feeds a broadened query. This is the difference between an agent that recovers and one that charges ahead with a stale plan.

**What it costs and the pitfalls.** Each interleaved block is billed output, so a long tool loop accumulates reasoning tokens turn after turn. Two consequences for production:

- **Replay discipline.** When you continue a conversation on the **same** model, you must pass thinking blocks back *exactly as received* — including empty-text blocks. The API rejects *modified* blocks, not read ones; dropping or editing them breaks the turn (ordering/signature errors).
- **Context growth.** Interleaved blocks pile up. Pair long loops with **context editing** (`clear_thinking_20251015`) to clear stale thinking, or **compaction** when you approach the window — see Chapter 21.

## 17.4 Visibility (`display`) and redacted thinking

You control whether the reasoning is *shown*, separately from whether it *happens*.

**`display`.** On Opus 4.7, Opus 4.8, and Fable 5, `thinking.display` defaults to `"omitted"` — thinking blocks still come back, but their text is an empty string. Set `display: "summarized"` to stream a readable summary:

```python
thinking={"type": "adaptive", "display": "summarized"}
```

This is *visibility only* — thinking happens and is billed identically under every setting; the raw chain of thought is never exposed on any model. The practical trap: if you stream reasoning to users and leave the default, the UI shows a long silent pause before output. For any "show your work" UX, set `summarized` explicitly.

**Redacted thinking.** Occasionally a thinking block is encrypted by safety systems and returned as a `redacted_thinking` block — an opaque blob, not readable text. Do **not** treat this as an error and do **not** strip it: on multi-turn requests you pass it back unchanged exactly like a normal thinking block, and the model decrypts it internally to maintain continuity. Removing redacted blocks breaks the same replay contract as removing normal ones. (On Fable 5 and Mythos 5 the raw chain is *never* returned at all — you get regular `thinking` blocks that are summarized or empty, not `redacted_thinking`.)

## 17.5 Task budgets: bounding the whole loop

`max_tokens` caps a **single response** and the model cannot see it — hit it and output is truncated mid-thought. That is the wrong tool for "don't let this whole agentic run cost more than X." For that, use a **task budget** (beta header `task-budgets-2026-03-13`; Fable 5 / Opus 4.8 / 4.7):

```python
output_config={"effort": "high", "task_budget": {"type": "tokens", "total": 64000}}
```

The server injects a running **countdown** the model can see across the entire loop (its own generation plus the tool results it reads this turn — *not* the full history you resend). The model paces itself: it prioritizes, then wraps up gracefully as the budget drains, instead of being guillotined by `max_tokens`.

| Control | Scope | Model aware? | On exceed |
|---|---|---|---|
| `max_tokens` | One response | No | Hard truncation mid-output |
| `task_budget` | Whole agentic loop | **Yes** (sees a countdown) | Graceful wind-down; may finish less thoroughly, citing the budget |

**Pitfalls.** The minimum `total` is **20,000** tokens. In a normal loop, leave `remaining` unset — the server tracks the countdown itself; only pass a client-computed `remaining` if you compact or rewrite history between requests (otherwise you under-report). And surfacing the countdown to the model is a double edge: on Fable 5 a visible budget can trigger "context anxiety" (the model suggests a new session or trims its own work) — if you don't need it shown, don't show it.

## 17.6 When extended thinking helps — and when it hurts

Reasoning is not free intelligence; it is a spend you justify.

**Helps:** multi-step math and logic, complex code edits and migrations, planning a long agentic trajectory, tasks where the model verifies its own output (redlining a document, reconciling figures), and ambiguous problems that need decomposition.

**Hurts (or simply wastes):** trivial lookups and classification, latency-critical paths where a 30-second pause is unacceptable, and high-volume cheap calls where the per-request reasoning cost dominates. Forcing high effort on these is pure tax.

```mermaid
flowchart TD
    A[Incoming task] --> B{Multi-step or<br/>self-verifying?}
    B -->|no| C{Latency or<br/>cost critical?}
    C -->|yes| D[effort low<br/>or thinking off]
    C -->|no| E[effort medium]
    B -->|yes| F{Long agentic loop?}
    F -->|yes| G[adaptive plus effort high or xhigh<br/>add a task_budget]
    F -->|no| H[adaptive plus effort high]
```

**The subtle failure mode.** Over-thinking is a real regression, not a harmless extravagance. At `max`, models can explore past the point of usefulness and *over-engineer* — adding abstractions and defensive handling nobody asked for. The fix is to lower effort first and only then add prose constraints; reaching for more guardrails before dialing `effort` down treats the symptom, not the cause.

## 17.7 End-to-End Case Study: A Reasoning-Controlled Code-Migration Agent

The dials above only matter assembled into one system. Here is a realistic agent whose entire economics depend on reasoning control: a service that migrates a repository from one framework version to the next — read code, plan, edit, run tests, fix failures, until green.

### Requirements

- Take a repo and a target version; produce a passing migration autonomously.
- The **coordinator** plans and edits at high reasoning depth; it makes mistakes only at the planning layer, so that is where intelligence must go.
- A fan-out of **read-only scout subagents** locates every call site of the deprecated API — cheap, parallel, no reasoning needed.
- **Bound the whole run's cost** so a runaway migration can't bill unboundedly — but let the agent finish gracefully, not get truncated.
- Stream a **readable reasoning summary** to the engineer watching, without exposing raw chain of thought.
- The loop is long (dozens of edit/test cycles); **thinking tokens must not blow the context window**.

### Architecture

```mermaid
flowchart TD
    Eng([Engineer]) --> Coord[Coordinator agent<br/>effort xhigh, task_budget set]
    Coord -->|Task fan-out| Scout1[Scout subagent<br/>effort low]
    Coord -->|Task fan-out| Scout2[Scout subagent<br/>effort low]
    Scout1 -. call sites .-> Coord
    Scout2 -. call sites .-> Coord
    Coord --> Edit[Apply edits]
    Edit --> Test[Run test suite]
    Test --> Decide{Tests green?}
    Decide -->|no| Coord
    Decide -->|yes| Done[Migration complete]
    Coord -. clear_thinking on long loop .-> Coord
```

The coordinator owns the reasoning-heavy planning at `xhigh`; scouts run at `low` because pattern-matching call sites needs speed, not depth; a `task_budget` caps the cumulative spend; context editing keeps the long loop's thinking from overflowing.

### Implementation

Configure the coordinator for deep reasoning, a visible summary, and a whole-loop budget. Note adaptive thinking is set **explicitly** — omitting `thinking` runs *without* thinking on these models:

```python
response = client.beta.messages.create(
    model="claude-opus-4-8",
    max_tokens=32000,                                   # per-response hard cap
    betas=["task-budgets-2026-03-13"],
    thinking={"type": "adaptive", "display": "summarized"},
    output_config={
        "effort": "xhigh",                              # coding sweet spot
        "task_budget": {"type": "tokens", "total": 200000},  # whole-loop ceiling, min 20K
    },
    tools=[migrate_tools],
    messages=messages,
)
```

Spawn scouts at low effort — depth would be wasted on a grep-shaped task:

```python
scout = AgentDefinition(
    name="call_site_scout",
    description="Finds every call site of the deprecated API. Read-only.",
    # Per-route effort: this subagent runs at low; the coordinator stays at xhigh.
    output_config={"effort": "low"},
    allowed_tools=["grep", "read"],
)
```

Preserve replay discipline in the manual loop — pass thinking blocks back **unchanged**, then clear stale ones once the loop runs long:

```python
# Echo the assistant turn verbatim, including thinking/redacted_thinking blocks.
messages.append({"role": "assistant", "content": response.content})
# On a long edit/test loop, clear stale thinking to protect the context window.
context_management = {"edits": [{"type": "clear_thinking_20251015"}]}
```

### Execution trace

```mermaid
sequenceDiagram
    actor Eng as Engineer
    participant Co as Coordinator
    participant Sc as Scout subagents
    participant Te as Test runner
    Eng->>Co: Migrate repo to v2 (effort xhigh)
    Co->>Co: Think: plan migration (summarized)
    Co->>Sc: Task fan-out: find deprecated call sites (effort low)
    Sc-->>Co: 14 call sites across 6 files
    Co->>Co: Think: edit order, interpret risks
    Co->>Te: Run test suite
    Te-->>Co: 3 failures
    Co->>Co: Think: diagnose failures, revise fix
    Co->>Te: Re-run after fixes
    Te-->>Co: All green
    Co-->>Eng: Migration complete (budget 70 percent used)
```

Notice the interleaved `Think` steps between tool calls — the coordinator re-plans after the scout results and again after the failing tests. The scouts never reason deeply; the coordinator never wastes a turn on file-finding. The task budget let the agent pace a dozen cycles and finish at 70% spend rather than being cut off at an arbitrary response boundary.

### Validation

- **Cost-bound test:** run a deliberately hard migration and assert cumulative spend stays within the `task_budget`; confirm the run *winds down* gracefully (it cites the budget) rather than truncating mid-edit.
- **Per-route effort test:** assert the scout subagent's requests carry `effort: low` and the coordinator's carry `effort: xhigh` — a single global effort is a misconfiguration here.
- **Replay test:** drop thinking blocks from the echoed assistant turn and confirm the next request 400s — proving you must pass them back unchanged.
- **Context test:** run the edit/test loop long enough to trigger `clear_thinking` and assert the window doesn't overflow.

### Common pitfalls

- Carrying `budget_tokens` forward from an older model — a **400** on Opus 4.7/4.8, not a warning (§17.1).
- Omitting `thinking` and expecting reasoning — on these models that runs *without* thinking; set `{type: "adaptive"}` explicitly (§17.7).
- One global `effort` — overpays on scouts or underthinks the coordinator (§17.2).
- Leaving `display` at the default while streaming to a UI — the engineer sees a silent pause, not a summary (§17.4).
- Using `max_tokens` to cap the *run* — it caps one response and truncates mid-thought; use `task_budget` for the loop (§17.5).

## 17.8 Key Takeaways

| Concept | What to remember |
|---|---|
| Adaptive vs. budget | Use `thinking: {type: "adaptive"}` on 4.6+; fixed `budget_tokens` is deprecated on 4.6/Sonnet 4.6 and **400s** on Opus 4.7/4.8 and Fable 5 (§17.1). |
| Effort ladder | `low`→`max` inside `output_config`; default is `high`, `xhigh` is the coding/agentic sweet spot. Tune **per route**, not globally; higher effort can lower end-to-end cost (§17.2). |
| Interleaved thinking | Automatic with adaptive (no beta header); lets the agent re-plan between tool calls. Echo thinking blocks back **unchanged** on the same model (§17.3). |
| Display & redacted | `display` defaults to `"omitted"` on 4.7/4.8/Fable 5 — set `"summarized"` to show work; pass `redacted_thinking` blocks back unchanged, never strip them (§17.4). |
| Task budgets | `task_budget` (beta, min 20K) bounds the **whole loop** with a countdown the model sees; `max_tokens` caps one response and truncates. Leave `remaining` unset in a normal loop (§17.5). |
| When to think | Multi-step / self-verifying → think; trivial / latency-critical → `low` or off. Over-thinking at `max` causes over-engineering — lower effort before adding guardrails (§17.6). |

> **Beyond the exam.** The Foundations exam only expects you to know adaptive thinking exists and that `effort` trades cost for reasoning depth. Everything else here — task budgets, interleaved replay discipline, redacted thinking, per-route effort — is production craft for agents that must be fast, correct, *and* affordable at once.

# Chapter 18: Prompt Caching

> Documentation: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

Every production agent re-sends the same large prefix on every turn — a multi-thousand-token system prompt, a frozen tool catalog, retrieved documents, the whole prior conversation. Without caching you pay full input price to *re-process* those identical bytes on every single request, and the user waits while the model re-reads context it has already seen. **Prompt caching** lets the API reuse the work it did on a stable prefix: a cache *read* costs roughly **0.1×** the normal input price and skips re-processing, cutting both cost (up to ~90% on the cached span) and time-to-first-token.

This chapter is **PART III — advanced, production agent engineering, beyond the Foundations exam scope**. The exam only expects you to *know prompt caching exists*. But the moment you operate a real agent, caching stops being optional: it is the difference between an agent that costs cents per turn and one that costs dollars, and the silent failure mode (a cache that never hits) is one of the most common — and most invisible — production cost regressions. The one place it touches the exam directly is **context and cost reliability**: an agent with a large stable `system` + `tools` prefix is exactly the shape caching was built for, and Domain reasoning about cost-efficient context management assumes you understand it.

By the end you should be able to reason about five things and assemble them into a cache-efficient agent:

- **The prefix-match invariant** (§18.1) — why one changed byte invalidates everything after it.
- **`cache_control` breakpoints and TTL** (§18.2) — where to place markers, and 5-minute vs 1-hour.
- **The cost model** (§18.3) — ~0.1× read / 1.25×–2× write, and where break-even is.
- **Silent invalidators** (§18.4) — how to *prove* the cache is working, and what quietly breaks it.
- **Caching for agents** (§18.5) — the stable `system` + `tools` prefix, and mid-session workarounds.

§18.6 then builds a complete cache-optimized support agent end-to-end, and §18.7 distills the working knowledge.

## 18.1 The One Invariant: Caching Is a Prefix Match

Everything in this chapter follows from a single rule:

> **Prompt caching is a prefix match. Any byte change *anywhere* in the prefix invalidates everything after it.**

The cache key is derived from the *exact rendered bytes* of the prompt up to each breakpoint. The API renders a request in a fixed order — **`tools` → `system` → `messages`** — and walks that rendered sequence looking for the longest prefix it has already cached. A single differing byte at position N — a timestamp in the system header, a reordered JSON key in a tool schema, one extra tool in the list — means everything from position N onward is *not* in the cache and must be processed at full price.

```mermaid
flowchart TD
    A[Build request] --> B[Render in fixed order<br/>tools then system then messages]
    B --> C{Prefix bytes match<br/>a cached entry?}
    C -->|yes, up to position N| D[Read cached span<br/>about 0.1x input price]
    C -->|no match| E[Process at full price<br/>and write a new cache entry]
    D --> F[Process only the<br/>uncached remainder]
    E --> F
    F --> G[Return response<br/>plus usage cache counters]
```

The practical consequence is an ordering discipline: **stable content must physically precede volatile content.** Put the frozen system prompt and a deterministic tool list first; put the timestamps, per-request IDs, and the varying user question *last*, after the final breakpoint. Get the ordering right and most caching works for free. Get it wrong — interpolate today's date into the *top* of the system prompt — and no amount of `cache_control` markers can save you, because the very first block already differs on every request.

**Why a hard prefix match, not fuzzy reuse?** Because the cache stores the model's internal processing state at each prefix boundary, and that state is only valid for *exactly* those preceding bytes. There is no partial credit: the rule is brutal but completely predictable, which is what lets you engineer around it.

## 18.2 `cache_control` Breakpoints and TTL

A **breakpoint** marks where a cacheable span ends. You set one by attaching `cache_control` to a content block:

```python
{"type": "text", "text": LARGE_STABLE_CONTEXT, "cache_control": {"type": "ephemeral"}}
```

A breakpoint can sit on any content block — a `system` text block, a tool definition, or a message block (`text`, `image`, `tool_use`, `tool_result`, `document`). Because rendering is `tools` → `system` → `messages`, **a marker on the last `system` block caches the tools *and* the system prompt together** (tools render before system, so they are inside the same prefix).

**Two TTLs:**

- `{"type": "ephemeral"}` — **5-minute** sliding TTL (the default). Each read refreshes it.
- `{"type": "ephemeral", "ttl": "1h"}` — **1-hour** TTL, for bursty traffic with gaps longer than five minutes.

**Constraints that bite in practice:**

- **Maximum 4 breakpoints per request.** Spend them on stability boundaries (see §18.5), not arbitrarily.
- **Minimum cacheable prefix is model-dependent.** On Opus 4.8 / 4.7 / 4.6 it is **4096 tokens**; on Sonnet 4.6 it is 2048; on Sonnet 4.5 it is 1024. A prefix shorter than the minimum **silently won't cache** — no error, just `cache_creation_input_tokens: 0`. A 3K-token prompt caches on Sonnet 4.5 but not on Opus 4.8.
- **20-block lookback window.** Each breakpoint walks backward *at most 20 content blocks* to find a prior cache entry. A single turn that appends more than 20 blocks — common in agentic loops with many `tool_use`/`tool_result` pairs — pushes the previous cache out of reach, and the next request silently misses. Fix: place an intermediate breakpoint roughly every 15 blocks in long turns.

**Top-level auto-caching.** If you don't need fine-grained placement, pass `cache_control` at the top level of `messages.create()` and the API caches the last cacheable block automatically. This is the simplest option for a single large `system` prompt; reach for explicit per-block markers only when you need to cache several distinct spans (e.g. tools, then a session prefix, then a turn).

## 18.3 The Cost Model: When Caching Actually Pays

Caching is not free — a *write* costs more than a normal token. You must read enough times to amortize that premium.

| Operation | Price (relative to base input) |
|---|---|
| Cache **read** | **~0.1×** |
| Cache **write**, 5-minute TTL | **1.25×** |
| Cache **write**, 1-hour TTL | **2×** |
| Uncached input | 1× |

**Break-even** depends on the TTL:

- **5-minute TTL:** the first request writes (1.25×) and the second reads (0.1×): 1.35× total vs 2× uncached. **Two requests** against the same prefix already pay off.
- **1-hour TTL:** write is 2×, so you need 2× + 0.1× = 2.1× to beat 3× uncached — roughly **three requests**. The 1-hour TTL buys *survival across idle gaps*, but the doubled write means it needs more reads to win. Use it only when traffic is bursty enough that a 5-minute entry would expire between bursts.

```mermaid
flowchart TD
    A[Will the same prefix<br/>be reused soon?] -->|no| B[Do not cache<br/>a lone write only adds the 1.25x premium]
    A -->|yes| C{Gap between reuses<br/>longer than 5 minutes?}
    C -->|no| D[5-minute TTL<br/>pays off from the 2nd request]
    C -->|yes, bursty| E[1-hour TTL<br/>pays off from about the 3rd request]
    D --> F[Place the breakpoint at the<br/>end of the SHARED prefix]
    E --> F
```

**The most expensive mistake here is caching a prefix that is never reused** — every request writes a fresh entry at 1.25×, nothing is ever read, and you have made the workload *more* expensive than no caching at all. If the first 1K tokens differ on every request, there is no reusable prefix: leave caching off.

**`input_tokens` is the uncached remainder only.** Total prompt size = `input_tokens + cache_creation_input_tokens + cache_read_input_tokens`. If a long-running agent reports `input_tokens` of 4K after hours of work, the rest was served from cache — check the *sum*, not the single field, before concluding anything about cost.

## 18.4 Verification and Silent Invalidators

A broken cache fails *silently*: no error, just a bill that quietly stays at full price. The only way to know caching works is to **measure it**. The `usage` object on every response reports three counters:

| Field | Meaning |
|---|---|
| `cache_creation_input_tokens` | Tokens **written** this request (you paid the ~1.25× premium) |
| `cache_read_input_tokens` | Tokens **served from cache** this request (you paid ~0.1×) |
| `input_tokens` | Tokens processed at **full price** (not cached) |

**The diagnostic:** fire two requests with an identical prefix. If `cache_read_input_tokens` is **0** on the second, a *silent invalidator* changed the prefix bytes between them. Diff the rendered prompts to find it. The usual culprits:

| Pattern | Why it breaks caching |
|---|---|
| `datetime.now()` / `time.time()` in the system prompt | The prefix changes every request |
| `uuid4()` / request IDs early in the content | Same — every request is byte-unique |
| `json.dumps(d)` without `sort_keys=True`, or iterating a `set` | Non-deterministic serialization → prefix bytes differ run to run |
| Session/user ID interpolated into the `system` prompt | A per-user prefix — no cross-request, no cross-user sharing |
| Conditional system sections (`if flag: system += ...`) | Every flag combination is a distinct prefix |
| A tool set that varies per user (`tools=build_tools(user)`) | Tools render at position 0 — nothing caches across users |

**The invalidation hierarchy** is worth internalizing, because not every change is fatal. The cache has three tiers (tools, system, messages), and a change invalidates only its own tier *and below*:

- Changing **tool definitions** (add / remove / reorder) or **switching models** → invalidates **everything** (a full rebuild).
- Changing the **system prompt** → invalidates system + messages, but tools survive.
- Changing **message content**, `tool_choice`, images, or toggling `thinking` → invalidates only the messages tier; tools + system survive.

So you *can* flip `tool_choice` per request or toggle `thinking` without losing the expensive tools+system cache. The two changes to guard with your life are **tool-set edits** and **model switches** mid-conversation — both throw away the entire cache.

## 18.5 Caching for Agents: The Stable Prefix

An agent is the ideal caching workload because it has exactly the structure caching rewards: a **large, stable prefix** (a long system prompt plus a fixed tool catalog) followed by a growing conversation. The strategy:

1. **Freeze the system prompt.** Never interpolate "current date: X", "user: Y", or "mode: Z" into it — those sit at the front of the prefix and invalidate everything downstream. Inject dynamic context *later*, in `messages`.
2. **Serialize tools deterministically.** Sort tool definitions by name so the rendered bytes are identical every run. Cache tools + system together with one breakpoint on the last system block.
3. **Cache the conversation incrementally.** Put a breakpoint on the last block of the most-recent turn; each new request reuses the entire prior conversation prefix, and earlier breakpoints stay valid as read points so hits accrue as the conversation grows.

But agents also create three classic *invalidators*, each with a specific workaround:

```mermaid
flowchart TD
    P[Cached prefix<br/>system plus tools] --> Q{What does the agent<br/>need to change mid-session?}
    Q -->|inject an operator instruction| R[Append a role system message<br/>to messages, do not edit top-level system]
    Q -->|run a cheaper model for a subtask| S[Spawn a subagent on that model<br/>keep the main loop on one model]
    Q -->|discover new tools| T[Use tool search<br/>schemas are appended, not swapped]
    R --> U[Cached prefix stays intact]
    S --> U
    T --> U
```

- **Mid-session operator instructions.** Editing the top-level `system` prompt changes the prefix ahead of the *entire* conversation history — every cached turn re-processes uncached. Instead, on supporting models (Claude Opus 4.8) append a `{"role": "system", ...}` message to `messages[]`: it sits *after* the cached history, leaves the prefix intact, and carries non-spoofable operator authority (the prompt-injection-safe alternative to embedding instructions in a user turn).
- **Switching models mid-session.** Caches are model-scoped. If a sub-task wants a cheaper model, don't switch the main loop — spawn a **subagent** on that model and keep the primary conversation on one model (this is how Claude Code's Explore subagents use Haiku).
- **Adding tools mid-session.** Adding or removing a tool invalidates everything. If you need on-demand tools, use **tool search** — it *appends* discovered schemas rather than swapping the tool list, preserving the existing prefix.

**Two timing facts for fan-out.** A cache entry becomes readable only after the first response *begins streaming* — so N parallel requests with the same prefix all pay full write price (none can read what the others are still writing). Send one request, await its first streamed token, *then* fire the remaining N−1. And to kill cold-start latency on the very first real request, **pre-warm** with a `max_tokens: 0` request at startup: the API runs prefill, writes the cache at your breakpoint, and returns immediately with empty content — re-warm just under the TTL if traffic has gaps.

## 18.6 End-to-End Case Study: A Cache-Optimized Support Agent

The pieces only matter assembled. Here is a realistic agent whose economics are dominated by a large stable prefix — the exact shape where caching turns an unaffordable design into a cheap one.

### Requirements

- A customer-support agent with a **large, stable system prompt** (~6K tokens of policy, tone, and escalation rules) and a **fixed tool catalog** (`get_customer`, `lookup_order`, `search_kb`, `escalate`).
- It serves **high request volume** — many short conversations per minute against the same prefix.
- Each request must inject the **current time** and a **per-request trace ID** for observability, plus the varying customer question.
- A daily metrics job must **summarize each closed conversation** with a separate model call.

The naive build interpolates the timestamp and trace ID into the system prompt header and rebuilds the tool list per request. That design caches *nothing*: the prefix differs on every call, so every one of the 6K policy tokens is re-billed at full price, every turn.

### Architecture

```mermaid
flowchart TD
    Req([Incoming request]) --> Build[Assemble prompt]
    Build --> Tools[tools<br/>sorted by name, frozen]
    Tools --> Sys[system<br/>6K frozen policy<br/>cache_control here]
    Sys --> Hist[messages<br/>prior turns<br/>cache_control on last block]
    Hist --> Vol[Volatile tail<br/>time, trace id, new question]
    Vol --> API[messages.create]
    API --> Chk{cache_read_input_tokens<br/>greater than 0?}
    Chk -->|yes| Hit[Cache hit<br/>policy served at about 0.1x]
    Chk -->|no| Miss[Audit for a silent invalidator]
```

The order is the whole design: **frozen tools and system first, the volatile time/trace/question last.** The breakpoint on the last system block caches tools + 6K policy together; a second breakpoint on the last conversation block lets multi-turn chats reuse history.

### Implementation

Build the request so every volatile value lives *after* the cached prefix, never inside it:

```python
SYSTEM = [{
    "type": "text",
    "text": POLICY_PROMPT,                       # ~6K tokens, byte-identical every request
    "cache_control": {"type": "ephemeral"},      # caches tools + system together
}]

TOOLS = sorted(tool_defs, key=lambda t: t["name"])   # deterministic order — no set/dict churn

def handle(turn_history, question, trace_id):
    # Volatile context goes in the LAST user block, AFTER the cached prefix —
    # never interpolated into POLICY_PROMPT.
    user_block = {
        "type": "text",
        "text": f"[time={now_iso()} trace={trace_id}]\n{question}",
    }
    messages = turn_history + [{"role": "user", "content": [user_block]}]
    return client.messages.create(
        model="claude-opus-4-8",
        max_tokens=1024,
        tools=TOOLS,
        system=SYSTEM,
        messages=messages,
    )
```

When the operator needs to push a mid-session instruction (e.g. "VIP customer — skip the upsell"), do **not** edit `POLICY_PROMPT`. Append a system-role message *after* the cached history so the 6K prefix is never touched:

```python
messages = turn_history + [
    {"role": "user", "content": [user_block]},
    {"role": "system", "content": "VIP account — resolve directly, do not offer upsells."},
]   # Opus 4.8: no beta header; preserves the cached prefix
```

For the daily summarizer, the **fork must reuse the parent's exact prefix** — copy `system`, `tools`, and `model` verbatim and append only the summary instruction, or the metrics job misses the cache entirely and re-bills 6K tokens per conversation:

```python
summary = client.messages.create(
    model="claude-opus-4-8",     # SAME model as the live agent
    max_tokens=512,
    tools=TOOLS,                 # SAME tools, byte-identical
    system=SYSTEM,               # SAME 6K prefix → reads the warm cache
    messages=closed_convo + [{"role": "user", "content": "Summarize this conversation in 3 bullets."}],
)
```

### Execution trace

```mermaid
sequenceDiagram
    actor U as User
    participant A as Agent harness
    participant C as Claude API
    participant Cache as Prefix cache
    U->>A: First question of the burst
    A->>C: tools + system 6K + question
    C->>Cache: write prefix, 1.25x
    C-->>A: response, cache_creation about 6K
    U->>A: Second question, same prefix
    A->>C: tools + system 6K + new question
    C->>Cache: read prefix, 0.1x
    C-->>A: response, cache_read about 6K
    A->>A: assert cache_read greater than 0
```

The first request of a burst pays the 1.25× write; every request after it within the TTL pays 0.1× on the 6K policy span. At high volume the write cost is amortized across hundreds of reads — the steady-state cost of the policy prefix collapses to roughly a tenth of the naive design.

### Validation

- **Cache-hit test:** send two identical-prefix requests; assert `cache_read_input_tokens > 0` on the second. This is the single most important regression test for the agent's cost.
- **Invalidator guard:** snapshot the rendered `tools` + `system` bytes in a unit test and fail the build if they change unexpectedly — this catches a stray `datetime.now()` or a reordered tool before it silently doubles the bill in production.
- **Fork-reuse test:** assert the summarizer's `system`/`tools`/`model` are byte-identical to the live agent's, so it reads rather than re-writes.

### Common pitfalls

- Interpolating the timestamp / trace ID into the *top* of the system prompt instead of the volatile tail (§18.1) — the classic silent invalidator.
- Rebuilding the tool list with a `dict`/`set` so its order drifts between requests (§18.4) — tools render at position 0, so this invalidates *everything*.
- Editing the system prompt to inject a mid-session instruction instead of appending a `role: "system"` message (§18.5) — re-bills the whole history uncached.
- The summarizer fork using a different `model` or a trimmed `system`, missing the parent cache (§18.5).
- Caching when there is no reusable prefix — paying 1.25× writes for zero reads (§18.3).

## 18.7 Working Knowledge — Key Takeaways

| Concept | What to remember |
|---|---|
| Prefix-match invariant | Caching is a prefix match; one changed byte anywhere invalidates everything after it. Render order is `tools` → `system` → `messages` — stable content first, volatile last (§18.1). |
| Breakpoints & TTL | `cache_control: {type: "ephemeral"}` = 5-min; add `ttl: "1h"` for bursty gaps. Max 4 breakpoints; min prefix 4096 tokens on Opus 4.8 or it silently won't cache (§18.2). |
| Cost model | Read ~0.1×, write 1.25× (5m) / 2× (1h). Break-even ≈ 2 requests at 5m, ≈ 3 at 1h. Caching an un-reused prefix is *more* expensive than not caching (§18.3). |
| Verification | Confirm with `usage.cache_read_input_tokens`; 0 across identical prefixes means a silent invalidator (`datetime.now()`, unsorted `json.dumps()`, a changing tool set) (§18.4). |
| Agent prefix | Freeze system, sort tools, cache them together; inject mid-session context via a `role: "system"` message; never change tools or model mid-conversation (§18.5). |

> **Beyond the exam, essential in production.** The Foundations exam only asks you to know prompt caching exists. But for any agent with a large stable `system` + `tools` prefix, the cache-hit test (`cache_read_input_tokens > 0`) is the cost-reliability check that separates a viable production agent from one that quietly bleeds money on re-processed context.

# Chapter 19: Structured Outputs & Strict Tool Use

> *Reference — beyond the exam scope (the exam covers `tool_use` JSON schemas; this is the formal feature).* Docs: [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) | [Tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview).

When an agent's output is read by a human, "mostly well-formed JSON" is good enough — a person tolerates a stray `Here is the JSON:` preamble or a trailing comma. When the output is read by **another program**, that tolerance disappears: a single malformed character means a `json.loads()` exception, a dropped record, or a corrupted downstream write. This chapter is about turning the model's reply into a **contract** — a payload your code can parse without defensive string-munging, every single time, at production scale.

This is *advanced, production-engineering* material. The Foundations exam tests the **principle** in **Domain 4 — Prompt Engineering and Structured Output (20%)**: that `tool_use` with a JSON Schema is the most reliable way to guarantee schema-conformant output, that `tool_choice` steers whether and which tool is called, and the recurring trap that **schemas fix syntax, not semantics**. Chapter 2 introduced `tool_use` schemas as the mechanism; this chapter covers the two *formal, enforced* features that supersede prompt-only "respond in JSON" — **structured outputs** and **strict tool use** — plus the validation/retry layer and the cache and citation trade-offs the exam doesn't reach but production does.

By the end you should be able to choose the right enforcement mechanism for a given job, design a schema that prevents (rather than invites) fabrication, wrap it in a validator that catches what a schema cannot, and reason about the failure modes that survive all of the above.

## 19.1 Three Levels of "Make It JSON"

There is a ladder of reliability here, and the exam's favourite wrong answer is always a rung too low.

```mermaid
flowchart TD
    Need[Need machine-readable<br/>output from Claude] --> Q1{Is the model<br/>calling a function<br/>or returning an answer?}
    Q1 -->|calling a function| Strict[Strict tool use<br/>strict true on the tool<br/>section 19.3]
    Q1 -->|final answer must be JSON| SO[Structured outputs<br/>output_config.format<br/>section 19.2]
    Need --> Q2{Already have a<br/>plain prompt<br/>asking for JSON?}
    Q2 -->|yes| Weak[Prompt-only — works<br/>most of the time,<br/>NOT a guarantee]
    Weak -. upgrade .-> Strict
    Weak -. upgrade .-> SO
    Strict --> Val[Validate semantics<br/>and retry<br/>section 19.4]
    SO --> Val
    Val --> Ship[Parseable contract<br/>for downstream systems]
```

- **Level 0 — prompt only.** "Respond with JSON matching this shape." The model *usually* complies, but nothing stops a preamble, a markdown fence, a trailing comma, or an extra field. Fine for a throwaway script; a liability for a pipeline. On Claude Opus 4.6 and later this is also the path that **assistant-prefill** used to patch (`{"role": "assistant", "content": "{"}`) — and prefills now **400**, so the prompt-only crutch is gone. The formal features below are the replacement.
- **Level 1 — enforced shape.** Structured outputs (§19.2) or strict tool use (§19.3). The API *constrains decoding* so the output is schema-valid by construction. No preamble, no fence, no missing field.
- **Level 2 — validated meaning.** A schema guarantees the JSON *parses* and the fields *exist*; it does not guarantee the numbers are *right*. §19.4 adds the layer that checks semantics and retries with the specific error fed back.

The recurring exam diagnostic — *"the model's JSON sometimes fails to parse, what is the single most reliable fix?"* — is answered by moving from Level 0 to Level 1. The follow-up — *"the JSON parses but a total is wrong, why didn't a stricter schema fix it?"* — is the Level 1 → Level 2 distinction.

## 19.2 Structured Outputs — Constraining the Response

**Structured outputs** constrain the model's *final response* to a JSON Schema. You attach `output_config.format` to the request, and the text block that comes back is **guaranteed schema-valid JSON** — the API uses constrained decoding, so an invalid token is never emitted in the first place.

```python
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Extract the invoice fields: ..."}],
    output_config={
        "format": {
            "type": "json_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "number": {"type": "string"},
                    "total": {"type": "number"},
                },
                "required": ["number", "total"],
                "additionalProperties": False,
            },
        }
    },
)
# output_config.format guarantees the first block is text with valid JSON
import json
data = json.loads(next(b.text for b in response.content if b.type == "text"))
```

**Prefer `client.messages.parse()`** — it takes a Pydantic model (or Zod schema in TypeScript), sends the derived schema, *validates the response against it*, and hands back a typed object. You skip the manual `json.loads` and get an instance your IDE understands:

```python
from pydantic import BaseModel

class Invoice(BaseModel):
    number: str
    total: float

msg = client.messages.parse(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Extract the invoice fields: ..."}],
    output_format=Invoice,        # response is constrained to this schema
)
invoice = msg.parsed_output       # a validated Invoice instance
```

> **API note.** The canonical request-level parameter is `output_config.format`. The old top-level `output_format` parameter on `messages.create()` is **deprecated** — but `.parse()` still accepts `output_format=<Model>` as its convenience argument, which is why both spellings appear above. Supported on Claude Fable 5, Opus 4.8, Sonnet 4.6, and Haiku 4.5 (and legacy Opus 4.5/4.1).

**Why it beats prompt-only.** With Level 0, the model is *free* — it can decide a friendly preamble would help, wrap the JSON in a fence for "readability", or omit a field it judged irrelevant. Constrained decoding removes that freedom at the token level: the grammar of your schema is the only thing the decoder can produce.

## 19.3 Strict Tool Use — Constraining the Call

**Strict tool use** is the enforced version of Chapter 2's `tool_use` schemas. Set `strict: true` on a tool definition and the model's `tool_use.input` is guaranteed to validate *exactly* against the tool's `input_schema`:

```python
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Book a flight to Tokyo for 2 on March 15"}],
    tools=[{
        "name": "book_flight",
        "description": "Book a flight to a destination",
        "strict": True,                       # the enforcement switch
        "input_schema": {
            "type": "object",
            "properties": {
                "destination": {"type": "string"},
                "date": {"type": "string", "format": "date"},
                "passengers": {"type": "integer"},
            },
            "required": ["destination", "date", "passengers"],
            "additionalProperties": False,    # mandatory under strict
        },
    }],
)
```

Two requirements the exam-adjacent docs hammer: under `strict: true` the schema **must** set `additionalProperties: false` and list every field in `required`. The most common mistake is putting `strict` on `tool_choice` — it does nothing there. **`strict` is a sibling of `name` / `description` / `input_schema` on the tool definition itself.**

### Steering with `tool_choice`

`tool_choice` decides *whether and which* tool is called — orthogonal to `strict`, which decides *how rigorously* the chosen call is validated:

| `tool_choice` | Behaviour | Use when |
|---|---|---|
| `{"type": "auto"}` (default) | Model may return prose **or** call a tool | The turn might legitimately not need a tool |
| `{"type": "any"}` | Model **must** call one of the tools (its pick) | You want guaranteed structured output and several schemas exist |
| `{"type": "tool", "name": "extract"}` | Model **must** call exactly that tool | You always want one specific shape back |
| `{"type": "none"}` | Model **cannot** call a tool | Force prose for this turn |

**The trap the exam plants:** forcing a tool (`any` or a named tool) means the model *always* calls something — so the forced tool must be **safe to call unconditionally**. Never force a side-effectful tool (`send_email`, `process_payment`) just to coerce structure; force an **extraction/formatting** tool instead, and let an `auto` turn decide on the irreversible action. A second, quieter consequence: **forcing a specific tool disables extended thinking** for that turn — the model jumps straight to filling the schema.

### Structured outputs vs strict tool use — which, when

```mermaid
flowchart TD
    Start[What does the model<br/>need to produce?] --> A{A function call<br/>my harness executes?}
    A -->|yes| Tool[Strict tool use<br/>read tool_use.input]
    A -->|no — a final answer| B{Final answer is<br/>structured data?}
    B -->|yes| Resp[Structured outputs<br/>read the text block]
    B -->|no — free prose| Plain[Plain messages,<br/>no constraint]
    Tool --> Compose[They compose — a turn can<br/>force a tool AND constrain<br/>the final text block]
    Resp --> Compose
```

Rule of thumb: **strict tool use when the model should *call a function*; structured outputs when the model's *final answer* must be JSON.** They compose in one request — force an extraction tool *and* constrain the wrap-up text block — which is exactly the pattern in the case study below.

## 19.4 Schemas Fix Syntax, Not Semantics — Validation and Retry

This is the chapter's load-bearing caveat and the exam's sharpest distinction. A strict schema guarantees:

- the output **parses** (no syntax error),
- every `required` field **is present**,
- each field has the **declared type**.

It guarantees **nothing** about correctness: a `total` of `1200.00` is a valid `number` whether or not the line items actually sum to `1200`. A date can land in the wrong field and still be a well-formed `date` string. **Syntax is structural; semantics is not** — and no schema feature closes the gap, because the schema language deliberately omits the constraints that would help (see §19.5).

The production pattern is **validate-then-retry-with-error-feedback**:

```mermaid
flowchart TD
    Ext[Extract via strict tool use<br/>or structured outputs] --> Val{Semantic checks pass?<br/>totals reconcile,<br/>fields well-formed}
    Val -->|yes| Accept[Accept — emit the<br/>parseable contract]
    Val -->|no| Src{Is the needed value<br/>present in the source?}
    Src -->|yes — correctable| Retry[Retry with document plus<br/>the bad extraction plus<br/>the SPECIFIC error]
    Retry --> Ext
    Src -->|no — absent from source| Stop[Stop retrying — return null,<br/>flag for human,<br/>or fetch the external record]
```

Two design moves make this work:

1. **Build the check into the schema.** Extract both `stated_total` (the figure printed on the document) *and* `calculated_total` (the model's own sum of the line items), then compare them **in code**. A mismatch is a reconciliation error you can act on — and it's far more reliable than asking the model "is this right?" after the fact.
2. **Feed back the *specific* error, not "try again".** A retry that says *"stated_total is 1200 but the line items sum to 1180 — recheck the line items"* guides a real correction. A bare "that was wrong" wastes a round trip.

**The trap that separates levels: retries cannot conjure absent data.** If a field is simply *not in the source* — the document never states the tax ID, the figure lives only in an external system — retrying just burns tokens and may pressure the model into *fabricating* a plausible value. The right move is to **recognise the absent-data case and stop**: return `null`, flag for a human, or fetch the external record. Retries fix *correctable* mistakes; they do not fix *missing* information.

## 19.5 Schema Limits, Caching, and Citations — The Production Trade-offs

The enforced features carry constraints the exam doesn't cover but that will surface the first time you ship.

**Schema limits (constrained decoding).** The JSON Schema you can enforce is a *subset* of full JSON Schema:

- **Supported:** the basic types, `enum`, `const`, `anyOf` / `allOf`, `$ref` / `$defs`, and string `format`s (`date-time`, `date`, `email`, `uri`, `uuid`, …).
- **Not supported:** recursive schemas, numeric constraints (`minimum` / `maximum` / `multipleOf`), and string-length constraints (`minLength` / `maxLength`). `additionalProperties` must be `false`.

The omission of numeric/length constraints is *why* §19.4 exists: you cannot express "total must be positive" or "code must be 5 characters" in the enforced schema, so those checks live in your validator. (The Python and TypeScript SDKs quietly strip unsupported keywords from the wire schema and re-check them client-side, which softens the edge but does not move the guarantee onto the model.)

**Schema compilation and caching.** A *new* schema incurs a one-time **compile cost** on its first request; the compiled grammar then **caches for 24 hours**, so steady-state requests pay nothing extra. The practical implication for a high-throughput extraction service: keep your schema **stable**. A schema that is rebuilt with reordered keys or an interpolated value per request looks "new" every time and re-pays the compile cost — the same stability discipline that prompt caching demands (Chapter 18).

**Incompatible with citations.** Structured outputs (`output_config.format`) and **citations are mutually exclusive** — enabling `citations: {enabled: true}` on a document *and* `output_config.format` in the same request returns a **400**. The architectural consequence is real: if a job needs both a machine-parseable shape *and* per-claim source attribution, you cannot get both from one call. Split it — one pass extracts cited facts (citations on, no format constraint), a second pass shapes the validated facts into the contract (format constraint, no citations) — or move the structure into a strict *tool call*, which is not subject to the citations restriction.

**Other edges worth knowing:** a `stop_reason` of `"refusal"` or `"max_tokens"` means the returned content may **not** satisfy your schema even with the feature on — always check `stop_reason` before trusting the parse. Structured outputs *do* work with the Batches API, streaming, token counting, and extended thinking.

## 19.6 End-to-End Case Study: An Invoice-to-Ledger Extraction Service

The pieces only matter assembled. Here is a realistic service that ingests scanned vendor invoices and writes ledger entries into an accounting system — the canonical "the output is read by a program, not a person" job, where a single bad field corrupts the books.

### Requirements

- Ingest invoice PDFs and emit a **strictly-typed ledger record** the accounting API can `POST` without any string-cleaning.
- **Hard contract:** the downstream API rejects anything that isn't schema-valid, so a parseable shape is non-negotiable.
- **Reconcile** the stated invoice total against the sum of line items; a mismatch must be caught, not written.
- When a field is **absent** from the scan (e.g. no PO number printed), record `null` and flag for human review — never fabricate.
- Source attribution (which line of the PDF each figure came from) is needed for the audit trail — but **separately** from the strict record, because citations and structured outputs cannot coexist.

### Architecture

```mermaid
flowchart TD
    PDF([Vendor invoice PDF]) --> Extract[Extract pass<br/>force the extract_invoice tool<br/>strict schema]
    Extract --> Parse[Parse tool_use.input<br/>guaranteed schema-valid]
    Parse --> Recon{Reconcile<br/>stated vs calculated total}
    Recon -->|match| Ledger[Build ledger record<br/>POST to accounting API]
    Recon -->|mismatch and value present| Retry[Retry with the specific<br/>reconciliation error]
    Retry --> Extract
    Recon -->|field absent from scan| Human([Flag for human review])
    Extract -. separate cited pass .-> Cite[Citations pass<br/>for the audit trail]
```

The **strict extraction tool** carries the contract; **code** does the reconciliation that the schema cannot; the **absent-data branch** routes to a human instead of retrying into a hallucination; and the **audit trail runs as a separate cited call** precisely because §19.5 forbids citations + structured outputs in one request.

### Implementation

Define the extraction as a **strict tool**, force it with `tool_choice`, and have the model emit *both* totals so code can reconcile them:

```python
extract_invoice = {
    "name": "extract_invoice",
    "description": "Extract structured fields from a vendor invoice.",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {
            "invoice_number": {"type": "string"},
            "po_number": {"type": ["string", "null"]},     # nullable — absent on some invoices
            "currency": {"type": "string"},
            "line_items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "description": {"type": "string"},
                        "amount": {"type": "number"},
                    },
                    "required": ["description", "amount"],
                    "additionalProperties": False,
                },
            },
            "stated_total": {"type": "number"},            # the figure printed on the invoice
            "calculated_total": {"type": "number"},        # the model's own sum of line_items
        },
        "required": ["invoice_number", "po_number", "currency",
                     "line_items", "stated_total", "calculated_total"],
        "additionalProperties": False,
    },
}

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=2048,
    messages=[{"role": "user", "content": [
        {"type": "document", "source": {"type": "base64",
                                        "media_type": "application/pdf", "data": pdf_b64}},
        {"type": "text", "text": "Extract every field. If the PO number is not printed, return null."},
    ]}],
    tools=[extract_invoice],
    tool_choice={"type": "tool", "name": "extract_invoice"},   # guarantee the structured call
)
```

Note the two schema design choices that *prevent* fabrication: `po_number` is **nullable** so an absent value has a legal home (a `required` non-nullable field would pressure the model to invent one), and the explicit `instruction` reinforces the null path. The reconciliation logic lives in **code**, not the prompt:

```python
def reconcile(extraction) -> "Result":
    items_sum = round(sum(li["amount"] for li in extraction["line_items"]), 2)
    if abs(items_sum - extraction["stated_total"]) > 0.01:
        # Semantic error the schema cannot catch — retry with the SPECIFIC discrepancy.
        return Result.retry(
            reason=f"stated_total is {extraction['stated_total']} but line items "
                   f"sum to {items_sum} — recheck the line items"
        )
    if extraction["po_number"] is None:
        # Absent data — do NOT retry (would invite a fabricated PO). Route to a human.
        return Result.flag_for_human(extraction, missing="po_number")
    return Result.accept(extraction)
```

### Execution trace

```mermaid
sequenceDiagram
    actor Op as Ingestion worker
    participant Cl as Claude
    participant V as Validator (code)
    participant Led as Accounting API
    participant Hu as Human reviewer
    Op->>Cl: invoice PDF plus extract_invoice tool, tool_choice forces it
    Cl-->>Op: tool_use.input — schema-valid, stated_total 1200, items sum 1180
    Op->>V: reconcile(extraction)
    V->>V: 1180 not equal 1200 — mismatch
    V-->>Cl: retry with "stated 1200 but items sum 1180, recheck line items"
    Cl-->>Op: corrected extraction — items sum 1200, po_number null
    Op->>V: reconcile(extraction)
    V->>V: totals match, but po_number is absent
    V->>Hu: flag for review — never fabricate a PO
    V->>Led: POST the schema-valid ledger record
```

Notice the division of labour: **constrained decoding** guaranteed the *shape* (the worker never wrote a `json.loads` over prose), **code** caught the *reconciliation* error the schema could not, and the **absent PO** went to a human rather than into a retry loop that would have pressured a fabricated value.

### Validation

- **Contract test:** assert every emitted record validates against the downstream API's schema — and that the worker never calls `json.loads` on free text (it reads `tool_use.input` directly).
- **Reconciliation test:** feed an invoice whose stated total is deliberately wrong; assert the pipeline *retries with the specific discrepancy* and does **not** write the bad record.
- **Absent-data test:** feed an invoice with no PO number; assert the record carries `po_number: null` and is flagged for a human — and that the system did **not** retry (proving it distinguishes *absent* from *correctable*).
- **Citations test:** assert the audit-trail pass runs as a **separate** call; assert that combining `citations` with `output_config.format` in one request raises a 400 (proving the split is necessary, not optional).

### Common pitfalls

- Putting `strict` on `tool_choice` instead of on the tool definition (it does nothing there — §19.3).
- Forcing a side-effectful tool to coerce structure; force an *extraction* tool and gate the irreversible write separately (§19.3).
- Treating a valid parse as a correct value — skipping the reconciliation layer (§19.4).
- Retrying when the data is simply *absent*, which invites a fabricated value instead of a `null` (§19.4).
- Requesting `citations` and `output_config.format` together and getting a 400 — they are mutually exclusive (§19.5).

## 19.7 Key Takeaways

| Concept | What to remember |
|---|---|
| Three levels | Prompt-only (probabilistic) → enforced shape (structured outputs / strict tool use) → validated meaning (retry). The reliable fix is moving up a rung (§19.1). |
| Structured outputs | `output_config.format` constrains the *final response* to a schema via constrained decoding; prefer `messages.parse()` for a validated typed object. `output_format` (top-level) is deprecated (§19.2). |
| Strict tool use | `strict: true` on the **tool** (not `tool_choice`) guarantees `tool_use.input` validates exactly; requires `additionalProperties: false` + full `required` (§19.3). |
| `tool_choice` steering | `auto` (may use a tool) / `any` (must use one) / forced (must use that one). Forcing always calls something and disables thinking — so force a *safe extraction* tool, never a side-effectful one (§19.3). |
| Syntax vs semantics | A schema guarantees the JSON parses and fields exist; it does **not** guarantee values are correct. Validate semantics in code and retry with the *specific* error (§19.4). |
| Absent vs correctable | Retries fix correctable mistakes; they cannot conjure absent data. Recognise the absent case and return null / flag for human instead of looping (§19.4). |
| Schema limits | No recursion, no numeric (`minimum`/`maximum`) or string-length constraints; `additionalProperties` must be `false` — which is exactly why a code validator is still required (§19.5). |
| Caching & citations | A new schema compiles once then caches 24h — keep schemas stable. Structured outputs are **incompatible with citations** (400); split into two passes when you need both (§19.5). |

> **Maps to Domain 4 (20%)** for the core principle — `tool_use` + JSON Schema is the reliable structured-output mechanism, `tool_choice` steers it, and schemas fix syntax not semantics. The formal `output_config.format` / `strict: true` features, the 24-hour schema cache, and the citations incompatibility are production refinements beyond the exam — but the validate-then-retry discipline they sit inside is the same one Domain 4 tests.

# Chapter 20: Server-Side & Advanced Tools

> *Reference — beyond the exam scope.* Docs: [Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview).

Beyond your own custom tools, Claude offers built-in and advanced tool patterns:

**Tool-use patterns**
- **Parallel tool use** (default) — one assistant turn can emit several `tool_use` blocks; execute them concurrently and return **all** `tool_result`s in a **single** user message (splitting them trains the model to stop parallelizing).
- **Tool runner** (SDK helper) — drives the call → execute → loop automatically (Python `@beta_tool` + `tool_runner`, TS `betaZodTool` + `toolRunner`), so you don't hand-write the agent loop.
- **Programmatic tool calling (PTC)** — Claude calls your tools from *inside* code execution; intermediate results stay in the running script (out of the context window) and only the final output returns. Large token savings on long tool chains.

**Server-side tools** (run on Anthropic's infrastructure — just declare them in `tools`):
- **Web search** (`web_search_20260209`) — live search with citations and dynamic filtering.
- **Web fetch** (`web_fetch_20260209`) — fetch/parse a specific URL already present in the conversation.
- **Code execution** (`code_execution`) — sandboxed Python/bash container (data-science libs preinstalled; containers reusable ~30 days). Free when paired with web tools.
- **Tool search** (`tool_search_tool_regex` / `_bm25`) — discover tools on demand from a large library; mark the rest `defer_loading: true`. Schemas are *appended*, preserving the cache.

**Client-side / Anthropic-defined tools** (you execute):
- **Bash** (`bash_20250124`) and **text editor** (`text_editor_20250728`) — schema-less; reference implementations provided; sandbox them.
- **Memory tool** (`memory_20250818`) — Claude reads/writes a `/memories` directory for cross-session state; you implement the backend.
- **Computer use** — screenshots + mouse/keyboard control of a GUI (beta).
- **Advisor** (`advisor_20260301`, beta) — pairs a cheaper executor model with a smarter advisor consulted mid-generation (advisor model must be ≥ executor).

---

# Chapter 21: Long-Context Techniques (Compaction, Context Editing, Memory)

> *Reference — beyond the exam scope.* Docs: [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) · [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing).

For agents that run long enough to strain the context window, three distinct API mechanisms (don't confuse them):

- **Compaction** — *summarizes* older history server-side when nearing the limit, then continues from the summary. Beta `compact-2026-01-12` (`context_management.edits: [{type: "compact_20260112"}]`). **Critical:** append the whole `response.content` (including the compaction block) back on the next request, or you lose the compacted state.
- **Context editing** — *clears* (not summarizes) stale content: `clear_tool_uses_20250919` drops old tool results, `clear_thinking_20251015` drops thinking blocks. Beta `context-management-2025-06-27`. Use when old tool output is dead weight.
- **Memory (cross-session)** — the memory tool (Chapter 20) or Managed Agents **memory stores** persist information *outside* the window, surviving context resets and whole sessions.

**Choosing:** context editing prunes within a session; compaction summarizes when you're near the limit; memory persists across sessions. Long-running agents often use all three (plus prompt caching, Chapter 18).

---

# Chapter 22: Documents & Multimodal Input

> *Reference — the exam lists Vision and token counting as out-of-scope; this is for real-world work.* Docs: [Files API](https://platform.claude.com/docs/en/build-with-claude/files) · [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support).

- **Files API** (beta `files-api-2025-04-14`) — upload a file once, then reference it by `file_id` across many requests instead of re-sending bytes. (Not on Bedrock/Vertex.)
- **Vision** — `{"type": "image", "source": {...}}` content blocks (base64, URL, or `file_id`); JPEG/PNG/GIF/WebP. Opus 4.7+ supports high-resolution images (up to 2576px long edge) with pixel-accurate coordinates — useful for computer use and document understanding.
- **PDF input** — `{"type": "document", ...}` blocks process PDFs natively (text *and* visual layout); base64 (no beta) or via the Files API; up to ~600 pages / 32MB.
- **Citations** — `citations: {enabled: true}` on a document makes responses carry `cited_text` plus char/page locations for verifiable, grounded answers. (Incompatible with structured outputs.)
- **Token counting** — the `count_tokens` endpoint gives exact, model-specific counts *before* you send. Never estimate Claude tokens with `tiktoken` (it is OpenAI's tokenizer and is wrong for Claude).

---

# Chapter 23: The Claude Agent SDK

> *Reference — beyond the exam scope.* Docs: [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview).

The **Claude Agent SDK** (Python `claude-agent-sdk`, TypeScript `@anthropic-ai/claude-agent-sdk`) is **Claude Code as a library** — the same built-in tools, agent loop, and context management, callable from your own code. (It was formerly the "Claude Code SDK"; `claude -p` is its CLI form.)

- **Agent loop** — gather context → take action (tools) → verify → repeat until done. The SDK runs the loop *in your process*; you don't hand-write it.
- **Built-in tools** — Read/Write/Edit/Bash/Grep/Glob and more, ready to use.
- **Subagents** — `AgentDefinition`s for isolated/parallel/specialized work that protects the main context.
- **Hooks** — lifecycle callbacks (PreToolUse, PostToolUse, session start/end, compaction) to log, block, modify, or gate actions.
- **Sessions** — persistent state; resume with full context or fork to explore alternatives.
- **MCP & permissions** — declare MCP servers; per-tool allow/deny/ask with custom callbacks (human-in-the-loop).

**Three surfaces, one mental model:** **Client SDK** (`anthropic`) = raw Messages API, you write the loop. **Agent SDK** = the loop + tools run in *your* process. **Managed Agents** (Chapter 24) = Anthropic hosts the loop *and* a sandbox. Pick by who runs the loop and who provides the compute.

---

# Chapter 24: Managed Agents

> *Reference — beyond the exam scope.* Docs: [Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview). Beta header `managed-agents-2026-04-01`.

**Managed Agents** is Anthropic-hosted: Anthropic runs the agent loop **and** provisions a per-session container where the agent's tools (bash, file ops, code) execute. You supply config and drive an event stream.

**Object model (memorize this):**
- **Agent** (`/v1/agents`) — a *persisted, versioned* config: `model`, `system`, `tools`, `mcp_servers`, `skills`. **Create once, reference by ID.**
- **Session** (`/v1/sessions`) — one run that references an agent by ID + an environment. **Every run.**
- **Environment** (`/v1/environments`) — a reusable container template.

> ⚠️ **The #1 rule:** `model`/`system`/`tools` live on the **agent**, never the session; the session only takes a pointer (`agent: {id, version}`). Create the agent once in setup and reuse the ID — calling `agents.create()` per run is the classic anti-pattern.

**Key capabilities:**
- **Events & streaming** — an SSE stream (`agent.message`, `agent.thinking`, `agent.tool_use`, `session.status_*`); open the stream *before* sending, and reconnect-with-dedupe (SSE has no replay).
- **Multi-agent** — `multiagent: {type: "coordinator", agents: [...]}`; a coordinator delegates to subagent *threads* that share the container.
- **Outcomes** — send a `user.define_outcome` event with a rubric; a separate grader runs an iterate → grade → revise loop until it passes.
- **Memory stores** — workspace-scoped persistent docs mounted into the container, surviving sessions (versioned, redactable).
- **Vaults** — credential store (MCP OAuth with auto-refresh, static bearer, env-var secrets); secrets are injected at egress and never visible in the sandbox.
- **Scheduled deployments** — cron-fire sessions automatically (this is what powers the cloud "routines").
- **Self-hosted sandboxes** — `config: {type: "self_hosted"}` runs tool execution in *your* infra via an outbound-polling worker; Anthropic still runs the loop.
- **Webhooks** — HMAC-signed state-change notifications instead of holding a stream open.

---

**Example (Python):**

```python
# 1) Create the agent ONCE — store agent.id (do NOT call this per run)
agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-opus-4-8",
    tools=[{"type": "agent_toolset_20260401"}],
)
# 2) Every run: a session that references the agent by id
session = client.beta.sessions.create(
    agent={"type": "agent", "id": agent.id, "version": agent.version},
    environment_id=environment.id,
)
```

# Chapter 25: MCP In Depth

> *Reference — extends Chapter 4.* Docs: [Model Context Protocol](https://modelcontextprotocol.io/) · [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector).

- **Primitives** (recap) — **Tools** (model-invoked actions), **Resources** (read-only context data), **Prompts** (reusable templates). MCP is an open JSON-RPC 2.0 standard — "USB-C for AI."
- **Transports** — **stdio** (local subprocess) and **Streamable HTTP** (POST + SSE) are the two standards; the old SSE-only transport is deprecated.
- **Authorization** — OAuth 2.0 for HTTP servers; environment-based credentials for stdio.
- **MCP connector (Messages API)** — let Claude call a *remote* MCP server directly, server-side, with no local client: pass `mcp_servers: [{type:"url", name, url}]` **and** a matching `tools: [{type:"mcp_toolset", mcp_server_name}]` entry. Beta `mcp-client-2025-11-20`. (Both halves are required — `mcp_servers` alone is rejected.)
- **Credentials in Managed Agents** — MCP auth is supplied via **vaults** (Chapter 24), not in the agent's `mcp_servers` block; Anthropic matches credentials to servers by URL and auto-refreshes OAuth.
- **Claude Code** — `claude mcp add/list/remove`, `.mcp.json` (project) vs `~/.claude.json` (user), `/mcp` for in-session OAuth, and **MCP tool search** to lazily load tools and save context.

---

# Chapter 26: Modern Claude Code (2026)

> *Reference — beyond the exam scope.* Docs: [Claude Code docs](https://code.claude.com/docs/en/overview) · [What's new](https://code.claude.com/docs/en/whats-new).

Claude Code is now **multi-surface** (terminal, VS Code, JetBrains, desktop app, web/iOS, Slack, Chrome) sharing one engine, so CLAUDE.md, settings, skills, and MCP carry across all of them. Notable 2026 capabilities a guide usually misses:

- **Dynamic workflows + `ultracode`** — Claude writes a JavaScript script that orchestrates **dozens–hundreds** of subagents in the background (caps: 16 concurrent / 1,000 total); `/effort ultracode` enables auto-orchestration. *Who holds the plan:* subagents/skills → Claude turn-by-turn; **agent teams** → a lead via a shared task list; **workflows** → a script (only the final answer hits context).
- **Fork subagents / `context: fork`** — inherit the parent conversation instead of starting fresh; `isolation: worktree` runs a subagent's edits in a throwaway git worktree.
- **Checkpoints / `/rewind`** — auto-checkpoint before each edit; restore code/conversation/both. **Limitation:** it does **not** track bash-modified or external/concurrent file changes — not a Git replacement.
- **Auto memory** — Claude writes its own machine-local learnings to a `MEMORY.md`, reloaded each session (distinct from hand-written CLAUDE.md).
- **Headless for CI** — `-p`/`--print`, `--output-format json`, **`--json-schema`** (schema-conforming `structured_output`), and **`--bare`** (skip auto-discovery for deterministic runs; slated to become the `-p` default).
- **Permission modes** — `default`/`acceptEdits`/`plan`/`bypassPermissions`, plus newer **`auto`** (server-side safety classifier) and **`dontAsk`** (read-only/pre-approved only).
- **MCP tool search & managed MCP** — lazily load MCP tools to save context; org-wide `managed-mcp.json`; `claude mcp login` from the shell.
- **Output styles, effort levels, plugins, expanded hooks** — `/output-style` personas; `/effort` (incl. `xhigh`/`ultracode`); plugin marketplaces bundling skills/agents/hooks/MCP; many new hook events (e.g. `SubagentStart`, `PreCompact`, `SessionEnd`).
- **Scheduling & remote** — cloud **routines** (cron), **channels** (push external events into a session), and **remote control** from another device.

---

# Chapter 27: Evals for Agents

> *Reference — beyond the exam scope, but essential in practice.* Docs: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

You can't improve (or safely ship) what you don't measure. Evals are the test suite for agents.

- **Three grader types** — **code** (deterministic checks: did the file compile? does the JSON validate?), **model-based** ("LLM-as-judge" for open-ended quality against a rubric), and **human** (the gold standard for ambiguous cases; use it to calibrate the others).
- **Grade outcomes *and* trajectories** — not just "was the final answer right," but "did it take a sensible path" (which tools, in what order, how many turns). A right answer via a broken path will break on the next task.
- **Handle non-determinism** — agents vary run to run; use **pass@k** (does it succeed within k attempts?) and run multiple trials rather than judging a single run.
- **Realistic tasks** — evaluate on representative, end-to-end tasks (ideally from production traffic), not toy prompts.
- **Why it pays off** — a solid eval set lets you upgrade models in days, catch regressions before they reach users, and tune `effort`/prompts/tools with evidence instead of vibes. Without evals, bugs surface in production.

This is the measurement layer behind the generator–evaluator loop (Chapter 16) and the verification step in a harness (Chapter 15).

---

# Chapter 28: Model Lineup & Selection (2026)

> *Reference — the exam treats model comparison as out-of-scope; this is for real builds.* Docs: [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) · query live via the [Models API](https://platform.claude.com/docs/en/api/models).

Current models (mid-2026):

| Model | API ID | Context | Max output | Input / Output ($/MTok) | Use for |
|---|---|---|---|---|---|
| **Claude Fable 5** | `claude-fable-5` | 1M | 128K | $10 / $50 | The hardest reasoning & long-horizon agentic work (flagship) |
| **Claude Opus 4.8** | `claude-opus-4-8` | 1M | 128K | $5 / $25 | Default for complex/agentic tasks |
| **Claude Sonnet 4.6** | `claude-sonnet-4-6` | 1M | 128K | $3 / $15 | Best speed/intelligence balance; high-volume |
| **Claude Haiku 4.5** | `claude-haiku-4-5` | 200K | 64K | $1 / $5 | Fast, cheap, simple/latency-critical tasks |

- **Choosing:** start at **Opus 4.8** for complex work; **Sonnet 4.6** for the volume/cost sweet spot; **Haiku 4.5** for speed/cost; **Fable 5** only when you need the absolute ceiling (premium price).
- **Model IDs are pinned snapshots.** From the 4.6 generation on, IDs are dateless but still pinned (e.g. `claude-opus-4-8`); older ones resolve via dated aliases.
- **Legacy (still active):** Opus 4.7/4.6, Sonnet 4.5, Opus 4.5. **Deprecated:** Opus 4.1 (retires 2026-08-05). Migrate off retiring models.
- **Don't hardcode assumptions** — query the **Models API** (`max_input_tokens`, `max_tokens`, `capabilities`) at runtime to discover context windows and feature support, since the lineup changes.

---

# Examples of Exam Questions with Explanations

## Question 1 (Scenario: Customer Support Agent)

**Situation:** Data shows that in 12% of cases the agent skips `get_customer` and calls `lookup_order` using only the customer’s name, which leads to incorrect refunds.

**Which change is most effective?**

- A) Add a programmatic precondition that blocks `lookup_order` and `process_refund` until an ID is obtained from `get_customer` **[CORRECT]**
- B) Improve the system prompt
- C) Add few-shot examples
- D) Implement a routing classifier

**Why A:** When critical business logic requires a specific tool sequence, software provides **deterministic guarantees** that prompt-based approaches (B, C) cannot. D addresses availability, not tool ordering.

---

## Question 2 (Scenario: Customer Support Agent)

**Situation:** The agent often calls `get_customer` instead of `lookup_order` for order-related questions. Tool descriptions are minimal and similar.

**What is the first step?**

- A) Few-shot examples
- B) Expand each tool’s description with input formats, examples, and boundaries **[CORRECT]**
- C) Add a routing layer
- D) Merge the tools

**Why B:** Tool descriptions are the model’s primary selection mechanism. This is the lowest-effort, highest-impact fix. A adds tokens without addressing the root cause. C is overengineering. D requires more effort than justified.

---

## Question 3 (Scenario: Customer Support Agent)

**Situation:** The agent resolves only 55% of issues with a target of 80%. It escalates simple cases and tries to handle complex policy exceptions autonomously.

**How do you improve calibration?**

- A) Add explicit escalation criteria with few-shot examples **[CORRECT]**
- B) Self-rated confidence (1–10) with automatic escalation
- C) A separate classifier trained on historical data
- D) Sentiment analysis

**Why A:** It directly addresses the root cause—unclear decision boundaries. B is unreliable (the model can be confidently wrong). C is overengineering. D solves a different problem (mood != complexity).

---

## Question 4 (Scenario: Code Generation with Claude Code)

**Situation:** You need a custom `/review` command for standard code review that is available to the whole team when they clone the repository.

**Where should you create the command file?**

- A) `.claude/commands/` in the project repository **[CORRECT]**
- B) `~/.claude/commands/`
- C) Root `CLAUDE.md`
- D) `.claude/config.json`

**Why A:** Project commands stored in `.claude/commands/` are version-controlled and automatically available to everyone. B is for personal commands. C is for instructions, not command definitions. D does not exist.

---

## Question 5 (Scenario: Code Generation with Claude Code)

**Situation:** You need to restructure a monolith into microservices (dozens of files, service-boundary decisions).

**What approach should you use?**

- A) Planning mode: explore the codebase, understand dependencies, design an approach **[CORRECT]**
- B) Direct execution incrementally
- C) Direct execution with detailed up-front instructions
- D) Direct execution and switch to planning when it gets hard

**Why A:** Planning mode is designed for large changes, multiple possible approaches, and architectural decisions. B risks expensive rework. C assumes you already know the structure. D is reactive.

---

## Question 6 (Scenario: Code Generation with Claude Code)

**Situation:** A codebase has different conventions across areas (React, API, database). Tests are co-located with code. You want conventions to be applied automatically.

**What approach should you use?**

- A) `.claude/rules/` files with YAML frontmatter and glob patterns **[CORRECT]**
- B) Put everything in the root CLAUDE.md
- C) Skills in `.claude/skills/`
- D) CLAUDE.md in every directory

**Why A:** `.claude/rules/` with glob patterns (e.g., `**/*.test.tsx`) enables automatic convention application based on file paths—ideal for tests spread across the codebase. B relies on model inference. C is manual/on-demand. D does not work well when relevant files are in many directories.

---

## Question 7 (Scenario: Multi-agent Research System)

**Situation:** The system researches “AI impact on creative industries,” but reports cover only visual art. The coordinator decomposed the topic into: “AI in digital art,” “AI in graphic design,” “AI in photography.”

**What’s the cause?**

- A) The synthesis agent does not detect gaps
- B) The coordinator decomposed the task too narrowly **[CORRECT]**
- C) The web search agent does not search thoroughly enough
- D) The document analysis agent filters out non-visual sources

**Why B:** The logs show the coordinator decomposed “creative industries” only into visual subtopics, completely missing music, literature, and film. Subagents executed correctly—the issue is what they were assigned.

---

## Question 8 (Scenario: Multi-agent Research System)

**Situation:** A web-search subagent times out while researching a complex topic. You need to design how error information is passed back to the coordinator.

**Which error propagation approach best enables intelligent recovery?**

- A) Return structured error context to the coordinator: failure type, query, partial results, and alternatives **[CORRECT]**
- B) Implement automatic retries with exponential backoff inside the subagent, then return a generic “search unavailable” status
- C) Catch the timeout inside the subagent and return an empty result set marked as success
- D) Propagate the timeout exception to a top-level handler that terminates the whole workflow

**Why A:** Structured error context gives the coordinator what it needs to decide whether to retry with a modified query, try an alternative approach, or continue with partial results. B hides context behind a generic status. C masks failure as success. D aborts the entire workflow unnecessarily.

---

## Question 9 (Scenario: Multi-agent Research System)

**Situation:** The synthesis agent often needs to verify specific claims while merging results. Currently, when verification is needed, the synthesis agent hands control back to the coordinator, which calls the web-search agent and then re-runs synthesis with the new results. This adds 2–3 extra round trips per task and increases latency by 40%. Your assessment shows that 85% of these checks are simple fact checks (dates, names, statistics), while 15% require deeper investigation.

**How do you reduce overhead while maintaining reliability?**

- A) Give the synthesis agent a limited `verify_fact` tool for simple checks, and continue routing complex verification through the coordinator **[CORRECT]**
- B) Accumulate all verification needs into a batch and return them to the coordinator at the end
- C) Give the synthesis agent full access to all web-search tools
- D) Proactively cache additional context around each source

**Why A:** This applies the principle of least privilege: the synthesis agent gets exactly what it needs for the 85% common case (simple fact checks) while preserving the coordinator-mediated path for complex investigations. B introduces blocking dependencies (later synthesis steps may depend on earlier verified facts). C breaks separation of responsibilities. D relies on speculative caching that cannot reliably predict needs.

---

## Question 10 (Scenario: Claude Code for CI)

**Situation:** A pipeline runs `claude "Analyze this pull request for security issues"`, but hangs waiting for interactive input.

**What is the correct approach?**

- A) Use the `-p` flag: `claude -p "Analyze this pull request for security issues"` **[CORRECT]**
- B) Set `CLAUDE_HEADLESS=true`
- C) Redirect stdin from `/dev/null`
- D) Use `--batch`

**Why A:** `-p` (or `--print`) is the documented way to run Claude Code in non-interactive mode. It processes the prompt, prints to stdout, and exits. The other options are either non-existent features or Unix workarounds.

---

## Question 11 (Scenario: Claude Code for CI)

**Situation:** The team wants to reduce API cost for automated analysis. Claude currently serves two workflows in real time: (1) a blocking pre-merge check that must complete before developers can merge a PR, and (2) a tech-debt report generated overnight for morning review. A manager proposes moving both to the Message Batches API to save 50%.

**How should you evaluate this proposal?**

- A) Use batch processing only for tech-debt reports; keep real-time calls for pre-merge checks **[CORRECT]**
- B) Move both workflows to batch processing and poll for completion
- C) Keep real-time calls for both to avoid ordering issues in batch results
- D) Move both to batch processing with a fallback to real time if a batch takes too long

**Why A:** The Message Batches API saves 50%, but processing time can be up to 24 hours with no guaranteed latency SLA. That makes it unsuitable for blocking pre-merge checks where developers are waiting, but ideal for overnight batch workloads like tech-debt reports.

---

## Question 12 (Scenario: Multi-file Code Review)

**Situation:** A pull request changes 14 files in an inventory tracking module. A single-pass review of all files produces inconsistent results: detailed comments for some files but superficial ones for others, missed obvious bugs, and contradictory feedback (a pattern is flagged as problematic in one file but approved in identical code in another file).

**How should you restructure the review?**

- A) Split into focused passes: analyze each file individually for local issues, then run a separate integration pass for cross-file data flows **[CORRECT]**
- B) Require developers to split large PRs into submissions of 3–4 files
- C) Switch to a higher-tier model with a larger context window to review all 14 files in one pass
- D) Run three independent full-PR review passes and report only issues found in at least two runs

**Why A:** Focused passes directly address the root cause—attention dilution when processing many files at once. Per-file analysis ensures consistent depth, and a separate integration pass catches cross-file issues. B shifts burden to developers without improving the system. C is a misconception: larger context does not fix attention quality. D suppresses real bugs by requiring consensus across inconsistent detections.

---

# Practice Test

> 100 questions across 8 scenarios. Format and difficulty match the real exam.
> 
> Alternatively, you can practice these questions in an exam-like HTML file: [Practical Test (EN)](practical_test_en.html)

## Scenario: Multi-agent Research System

---

## Question 1 (Scenario: Multi-agent Research System)

**Situation:** A document analysis agent discovers that two credible sources contain directly contradictory statistics for a key metric: a government report states 40% growth, while an industry analysis states 12%. Both sources look credible, and the discrepancy could materially affect the research conclusions. How should the document analysis agent handle this situation most effectively?

**Which approach is most effective?**

- A) Apply credibility heuristics to pick the most likely correct number, finish analysis with that value, and add a footnote mentioning the discrepancy.
- B) Include both numbers in the analysis output without marking them as conflicting, letting the synthesis agent decide which to use based on broader context.
- C) Stop analysis and immediately escalate to the coordinator, asking it to decide which source is more authoritative before continuing.
- D) Complete analysis with both numbers, explicitly annotate the conflict with source attribution, and let the coordinator decide how to reconcile the data before passing to synthesis. **[CORRECT]**

**Why D:** This approach preserves separation of responsibilities: the analysis agent completes its core work without blocking, preserves both conflicting values with clear attribution, and correctly passes reconciliation to the coordinator, which has broader context.

---

## Question 2 (Scenario: Multi-agent Research System)

**Situation:** The web-search and document-analysis agents have completed their tasks and returned results to the coordinator. What is the next step for creating an integrated research report?

**Which next step is most appropriate?**

- A) Each agent sends its results directly to the report-writing agent, bypassing the coordinator.
- B) The document analysis agent requests web-search results and merges them internally.
- C) The coordinator passes both sets of results to the synthesis agent for a unified integration. **[CORRECT]**
- D) The coordinator concatenates the raw outputs from both agents and returns them as the final result.

**Why C:** In a coordinator–subagent architecture, the coordinator forwards both result sets to the synthesis agent for centralized integration, preserving control and ensuring high-quality merging.

---

## Question 3 (Scenario: Multi-agent Research System)

**Situation:** A document analysis subagent frequently fails when processing PDF files: some have corrupted sections that trigger parsing exceptions, others are password-protected, and sometimes the parsing library hangs on large files. Currently, any exception immediately terminates the subagent and returns an error to the coordinator, which must decide whether to retry, skip, or fail the whole task. This causes excessive coordinator involvement in routine error handling. What architectural improvement is most effective?

**Which improvement is most effective?**

- A) Create a dedicated error-handling agent that monitors all failures via a shared queue and decides recovery actions, sending restart commands directly to subagents.
- B) Configure the subagent to always return partial results with a success status, embedding error details in metadata; the coordinator treats all responses as successful.
- C) Make the coordinator validate all documents before sending them to the subagent, rejecting documents that might cause failures.
- D) Implement local recovery in the subagent for transient failures and escalate to the coordinator only errors it cannot resolve, including attempted steps and partial results. **[CORRECT]**

**Why D:** Handle errors at the lowest level capable of resolving them. Local recovery reduces coordinator workload while still escalating truly unrecoverable issues with full context and partial progress.

---

## Question 4 (Scenario: Multi-agent Research System)

**Situation:** After running the system on “AI impact on creative industries,” you observe that every subagent completes successfully: the web-search agent finds relevant articles, the document analysis agent summarizes them correctly, and the synthesis agent produces coherent text. However, final reports cover only visual art and completely miss music, literature, and film. In the coordinator logs, you see it decomposed the topic into three subtasks: “AI in digital art,” “AI in graphic design,” and “AI in photography.” What is the most likely root cause?

**What is the most likely root cause?**

- A) The synthesis agent lacks instructions to detect coverage gaps.
- B) The document analysis agent filters out non-visual sources due to overly strict relevance criteria.
- C) The coordinator’s task decomposition is too narrow, assigning subagents work that does not cover all relevant areas. **[CORRECT]**
- D) The web-search agent’s queries are insufficient and should be broadened to cover more sectors.

**Why C:** The coordinator decomposed a broad topic only into visual-art subtasks, missing music, literature, and film entirely. Since subagents executed their assignments correctly, the narrow decomposition is the obvious root cause.

---

## Question 5 (Scenario: Multi-agent Research System)

**Situation:** The web-search subagent returns results for only 3 of 5 requested source categories (competitor sites and industry reports succeed, but news archives and social feeds time out). The document analysis subagent successfully processes all provided documents. The synthesis subagent must produce a summary from mixed-quality upstream inputs. Which error-propagation strategy is most effective?

**Which error-propagation strategy is most effective?**

- A) Continue synthesis using only successful sources and produce an output without mentioning which data was unavailable.
- B) The synthesis subagent returns an error to the coordinator, triggering a full retry or task failure due to incomplete data.
- C) The synthesis subagent asks the coordinator to retry timed-out sources with a longer timeout before starting synthesis.
- D) Structure the synthesis output with coverage annotations that indicate which conclusions are well-supported and where gaps exist due to unavailable sources. **[CORRECT]**

**Why D:** Coverage annotations implement graceful degradation with transparency, preserving value from completed work while propagating uncertainty to enable informed decisions about confidence.

---

## Question 6 (Scenario: Multi-agent Research System)

**Situation:** The document analysis subagent encounters a corrupted PDF file that it cannot parse. When designing the system’s error handling, what is the most effective way to handle this failure?

**Which approach is most effective?**

- A) Return an error with context to the coordinator agent, allowing it to decide how to proceed. **[CORRECT]**
- B) Silently skip the corrupted document and continue processing the remaining files to avoid interrupting the workflow.
- C) Automatically retry parsing the document three times with exponential backoff before reporting a failure.
- D) Throw an exception that terminates the entire research workflow.

**Why A:** Returning an error with context to the coordinator is the most effective approach because it lets the coordinator make an informed decision—skip the file, try an alternative parsing method, or notify the user—while maintaining visibility into the failure.

---

## Question 7 (Scenario: Multi-agent Research System)

**Situation:** Production logs show a persistent pattern: requests like “analyze the uploaded quarterly report” are routed to the web-search agent 45% of the time instead of the document analysis agent. Reviewing tool definitions, you find that the web-search agent has a tool `analyze_content` described as “analyzes content and extracts key information,” while the document analysis agent has a tool `analyze_document` described as “analyzes documents and extracts key information.” How should you fix the misrouting problem?

**How should you fix the misrouting problem?**

- A) Add a pre-routing classifier that detects whether the user refers to uploaded files or web content before the coordinator decides on delegation.
- B) Rename the web-search tool to `extract_web_results` and update its description to “processes and returns information retrieved from web search and URLs.” **[CORRECT]**
- C) Add few-shot examples to the coordinator prompt showing correct routing: “User uploads a quarterly report → document analysis agent” and “User asks about a web page → web-search agent.”
- D) Expand the document analysis tool description with usage examples like “Use for uploaded PDFs, Word docs, and spreadsheets,” leaving the web-search tool unchanged.

**Why B:** Renaming the web-search tool to `extract_web_results` and updating its description to explicitly reference web search and URLs directly removes the root cause by eliminating semantic overlap between the two tool names and descriptions. This makes each tool’s purpose unambiguous, enabling the coordinator to reliably distinguish document analysis from web search.

---

## Question 8 (Scenario: Multi-agent Research System)

**Situation:** A colleague proposes that the document analysis agent should send its results directly to the synthesis agent, bypassing the coordinator. What is the main advantage of keeping the coordinator as the central hub for all communication between subagents?

**What is the main advantage of keeping the coordinator as the central hub?**

- A) The coordinator can observe all interactions, handle errors uniformly, and decide what information each subagent should receive. **[CORRECT]**
- B) The coordinator batches multiple requests to subagents, reducing total API calls and overall latency.
- C) Routing through the coordinator enables automatic retry logic that direct inter-agent calls cannot support.
- D) Subagents use isolated memory, and direct communication would require complex serialization that only the coordinator can perform.

**Why A:** The coordinator pattern provides centralized visibility into all interactions, uniform error handling across the system, and fine-grained control over what information each subagent receives—these are the primary advantages of a star-shaped communication topology.

---

## Question 9 (Scenario: Multi-agent Research System)

**Situation:** The web-search subagent times out while researching a complex topic. You need to design how information about this failure is returned to the coordinator. Which error-propagation approach best enables intelligent recovery?

**Which error-propagation approach best enables intelligent recovery?**

- A) Return structured error context to the coordinator including the failure type, the query executed, any partial results, and potential alternative approaches. **[CORRECT]**
- B) Catch the timeout within the subagent and return an empty result set marked as successful.
- C) Implement automatic exponential-backoff retries inside the subagent, only returning a generic “search unavailable” status after exhausting retries.
- D) Propagate the timeout exception directly to the top-level handler, terminating the entire research workflow.

**Why A:** Returning structured error context—including failure type, executed query, partial results, and alternative approaches—gives the coordinator everything needed to make intelligent recovery decisions (e.g., retry with a modified query or continue with partial results). It preserves maximum context for informed coordination-level decision-making.

---

## Question 10 (Scenario: Multi-agent Research System)

**Situation:** In your system design, you gave the document analysis agent access to a general-purpose tool `fetch_url` so it could download documents by URL. Production logs show this agent now frequently downloads search engine results pages to perform ad hoc web search—behavior that should be routed through the web-search agent—causing inconsistent results. Which fix is most effective?

**Which fix is most effective?**

- A) Replace `fetch_url` with a `load_document` tool that validates that URLs point to document formats. **[CORRECT]**
- B) Remove `fetch_url` from the document analysis agent and route all URL fetching through the coordinator to the web-search agent.
- C) Implement filtering that blocks `fetch_url` calls to known search engine domains while allowing other URLs.
- D) Add instructions to the document analysis agent prompt that `fetch_url` should only be used to download document URLs, not to search.

**Why A:** Replacing a general-purpose tool with a document-specific tool that validates URLs against document formats fixes the root cause by constraining capability at the interface level. This follows the principle of least privilege, making undesired search behavior impossible rather than merely discouraged.

---

## Question 11 (Scenario: Multi-agent Research System)

**Situation:** While researching a broad topic, you observe that the web-search agent and the document analysis agent investigate the same subtopics, leading to substantial duplication in their outputs. Token usage nearly doubles without a proportional increase in research breadth or depth. What is the most effective way to address this?

**What is the most effective way to address this?**

- A) Allow both agents to finish in parallel, then have the coordinator deduplicate overlapping results before passing them to the synthesis agent.
- B) The coordinator explicitly partitions the research space before delegating, assigning each agent distinct subtopics or source types. **[CORRECT]**
- C) Implement a shared-state mechanism where agents log their current focus area so other agents can dynamically avoid duplication during execution.
- D) Switch to sequential execution where document analysis runs only after web search completes, using web-search results as context to avoid duplication.

**Why B:** Having the coordinator explicitly partition the research space before delegating is most effective because it addresses the root cause—unclear task boundaries—before any work begins. It preserves parallelism while preventing duplicated effort and wasted tokens.

---

## Question 12 (Scenario: Multi-agent Research System)

**Situation:** During research, the web-search subagent queries three source categories with different outcomes: academic databases return 15 relevant papers, industry reports return “0 results,” and patent databases return “Connection timeout.” When designing error propagation to the coordinator, which approach enables the best recovery decisions?

**Which approach enables the best recovery decisions?**

- A) Aggregate the results into a single success-percentage metric (e.g., “67% source coverage”) with detailed logs available on demand.
- B) Report both “timeout” and “0 results” as failures requiring coordinator intervention.
- C) Retry transient failures internally and report only persistent errors.
- D) Distinguish access failures (timeout) that require a retry decision from valid empty results (“0 results”) that represent successful queries. **[CORRECT]**

**Why D:** A timeout (access failure) and “0 results” (valid empty result) are semantically different outcomes requiring different responses. Distinguishing them allows the coordinator to retry the patent database while accepting the industry reports “0 results” as a valid, informative finding.

---

## Question 13 (Scenario: Multi-agent Research System)

**Situation:** Production monitoring shows inconsistent synthesis quality. When aggregated results are ~75K tokens, the synthesis agent reliably cites information from the first 15K tokens (web-search headlines/snippets) and the last 10K tokens (document analysis conclusions), but often misses critical findings in the middle 50K tokens—even when they directly answer the research question. How should you restructure the aggregated input?

**How should you restructure the aggregated input?**

- A) Summarize all subagent outputs to under 20K tokens before aggregation to keep content within the model’s reliable processing range.
- B) Stream subagent results to the synthesis agent incrementally, processing web-search results first to completion, then adding document analysis results.
- C) Place a key-findings summary at the start of the aggregated input and organize detailed results with explicit section headings for easier navigation. **[CORRECT]**
- D) Implement rotation that alternates which subagent’s results appear first across research tasks to ensure both sources get equal top positioning over time.

**Why C:** Putting a key-findings summary at the start leverages primacy effects so critical information sits in the most reliably processed position. Adding explicit section headings throughout helps the model navigate and attend to mid-input content, directly mitigating the “lost in the middle” phenomenon.

---

## Question 14 (Scenario: Multi-agent Research System)

**Situation:** In testing, the combined output of the web-search agent (85K tokens including page content) and the document analysis agent (70K tokens including chains of thought) totals 155K tokens, but the synthesis agent performs best with inputs under 50K tokens. Which solution is most effective?

**Which solution is most effective?**

- A) Modify upstream agents to return structured data (key facts, quotes, relevance scores) instead of verbose content and reasoning. **[CORRECT]**
- B) Add an intermediate summarization agent that condenses findings before passing them to synthesis.
- C) Have the synthesis agent process findings in sequential batches, maintaining state between calls.
- D) Store findings in a vector database and give the synthesis agent search tools to query during its work.

**Why A:** Modifying upstream agents to return structured data fixes the root cause by reducing token volume at the source while preserving essential information. It avoids passing bulky page content and reasoning traces that inflate tokens without improving the synthesis step.

---

## Question 15 (Scenario: Multi-agent Research System)

**Situation:** In testing, you observe that the synthesis agent often needs to verify specific claims while merging results. Currently, when verification is needed, the synthesis agent returns control to the coordinator, which calls the web-search agent and then re-invokes synthesis with the results. This adds 2–3 extra loops per task and increases latency by 40%. Your assessment shows 85% of these verifications are simple fact checks (dates, names, stats) and 15% require deeper research. Which approach most effectively reduces overhead while preserving system reliability?

**Which approach is most effective?**

- A) Give the synthesis agent access to all web-search tools so it can handle any verification need directly without coordinator loops.
- B) Have the synthesis agent accumulate all verification needs and return them as a batch to the coordinator at the end, which then sends them all to the web-search agent at once.
- C) Have the web-search agent proactively cache extra context around each source during initial research in anticipation of synthesis needing verification.
- D) Give the synthesis agent a limited-scope `verify_fact` tool for simple checks, while routing complex verifications through the coordinator to the web-search agent. **[CORRECT]**

**Why D:** A limited-scope fact-verification tool lets the synthesis agent handle 85% of simple checks directly, eliminating most loops, while preserving the coordinator delegation path for the 15% of complex verifications. This applies least privilege while significantly reducing latency.

---

## Scenario: Claude Code for Continuous Integration

---

## Question 16 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your CI pipeline runs the Claude Code CLI (in `--print` mode) using CLAUDE.md to provide project context for code review, and developers generally find the reviews substantive. However, they report that integrating findings into the workflow is difficult—Claude outputs narrative paragraphs that must be manually copied into PR comments. The team wants to automatically post each finding as a separate inline PR comment at the relevant place in code, which requires structured data with file path, line number, severity level, and suggested fix. Which approach is most effective?

**Which approach is most effective?**

- A) Add an “Output Format for Review” section to CLAUDE.md with examples of structured findings so Claude learns the expected format from project context.
- B) Use the CLI flags `--output-format json` and `--json-schema` to enforce structured findings, then parse the output to post inline comments via the GitHub API. **[CORRECT]**
- C) Include explicit formatting instructions in the review prompt requiring each finding to follow a parseable template like `[FILE:path] [LINE:n] [SEVERITY:level] ...`.
- D) Keep narrative review format but add a summarization step that uses Claude to generate a structured JSON summary of findings.

**Why B:** Using `--output-format json` with `--json-schema` enforces structured output at the CLI level, guaranteeing well-formed JSON with the required fields (file path, line number, severity, suggested fix) that can be reliably parsed and posted as inline PR comments via the GitHub API. It leverages built-in CLI capabilities designed specifically for structured output.

---

## Question 17 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your team uses Claude Code for generating code suggestions, but you notice a pattern: non-obvious issues—performance optimizations that break edge cases, cleanups that unexpectedly change behavior—are only caught when another team member reviews the PR. Claude’s reasoning during generation shows it considered these cases but concluded its approach was correct. Which approach directly addresses the root cause of this self-check limitation?

**Which approach directly addresses the root cause?**

- A) Run a second independent instance of Claude Code to review the changes without access to the generator’s reasoning. **[CORRECT]**
- B) Enable extended thinking mode for the generation stage to allow more thorough deliberation before producing suggestions.
- C) Add explicit self-review instructions to the generation prompt asking Claude to critique its own suggestions before finalizing output.
- D) Include full test files and documentation in prompt context so Claude better understands expected behavior during generation.

**Why A:** A second independent Claude Code instance without access to the generator’s reasoning directly addresses the root cause by avoiding confirmation bias. This “fresh eyes” perspective mirrors human peer review, where another reviewer catches issues the author rationalized.

---

## Question 18 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your code review component is iterative: Claude analyzes the changed file, then may request related files (imports, base classes, tests) via tool calls to understand context before providing final feedback. Your application defines a tool that lets Claude request file contents; Claude calls the tool, gets results, and continues analysis. You’re evaluating batch processing to reduce API cost. What is the primary technical limitation when considering batch processing for this workflow?

**What is the primary technical limitation?**

- A) Batch processing does not include correlation IDs to map outputs back to input requests.
- B) The asynchronous model cannot execute tools mid-request and return results for Claude to continue analysis. **[CORRECT]**
- C) The Batch API does not support tool definitions in request parameters.
- D) The batch processing latency of up to 24 hours is too slow for pull request feedback, although the workflow would otherwise function.

**Why B:** A “fire-and-forget” asynchronous Batch API model has no mechanism to intercept a tool call during a request, execute the tool, and return results for Claude to continue analysis. This is fundamentally incompatible with iterative tool-calling workflows that require multiple tool request/response rounds within a single logical interaction.

---

## Question 19 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your CI/CD system runs three Claude-based analyses: (1) fast style checks on every PR that block merging until completion, (2) comprehensive weekly security audits of the entire codebase, and (3) nightly test-case generation for recently changed modules. The Message Batches API offers 50% savings but processing can take up to 24 hours. You want to optimize API cost while maintaining an acceptable developer experience. Which combination correctly matches each task to an API approach?

**Which combination is correct?**

- A) Use the Message Batches API for all three tasks to maximize 50% savings, configuring the pipeline to poll for batch completion.
- B) Use synchronous calls for PR style checks; use the Message Batches API for weekly security audits and nightly test generation. **[CORRECT]**
- C) Use synchronous calls for all three tasks for consistent response times, relying on prompt caching to reduce costs across workloads.
- D) Use synchronous calls for PR style checks and nightly test generation; use the Message Batches API only for weekly security audits.

**Why B:** PR style checks block developers and require immediate responses via synchronous calls, while weekly security audits and nightly test generation are scheduled tasks with flexible deadlines that can tolerate up to a 24-hour batch window—capturing 50% savings for both.

---

## Question 20 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your automated reviews find real issues, but developers report the feedback is not actionable. Findings include phrases like “complex ticket routing logic” or “potential null pointer” without specifying what exactly to change. When you add detailed instructions like “always include concrete fix suggestions,” the model still produces inconsistent output—sometimes detailed, sometimes vague. Which prompting technique most reliably produces consistently actionable feedback?

**Which prompting technique is most reliable?**

- A) Further refine instructions with more explicit requirements for each part of the feedback format (location, issue, severity, proposed fix).
- B) Expand the context window to include more surrounding codebase so the model has enough information to propose concrete fixes.
- C) Implement a two-pass approach where one prompt identifies issues and a second generates fixes, allowing specialization.
- D) Add 3–4 few-shot examples showing the exact required format: identified issue, location in code, concrete fix suggestion. **[CORRECT]**

**Why D:** Few-shot examples are the most effective technique for achieving consistent output format when instructions alone produce variable results. Providing 3–4 examples that show the exact desired structure (issue, location, concrete fix) gives the model a concrete pattern to follow, which is more reliable than abstract instructions.

---

## Question 21 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your CI pipeline includes two Claude-based code review modes: a pre-merge-commit hook that blocks PR merge until completion, and a “deep analysis” that runs overnight, polls for batch completion, and posts detailed suggestions to the PR. You want to reduce API cost using the Message Batches API, which offers 50% savings but requires polling and can take up to 24 hours. Which mode should use batch processing?

**Which mode should use batch processing?**

- A) Only the pre-merge-commit hook.
- B) Only the deep analysis. **[CORRECT]**
- C) Both modes.
- D) Neither mode.

**Why B:** Deep analysis is an ideal candidate for batch processing because it already runs overnight, tolerates delay, and uses a polling model before publishing results—matching the asynchronous, polling-based architecture of the Message Batches API while capturing 50% savings.

---

## Question 22 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your automated review analyzes comments and docstrings. The current prompt instructs Claude to “check that comments are accurate and up to date.” Findings often flag acceptable patterns (TODO markers, simple descriptions) while missing comments describing behavior the code no longer implements. What change addresses the root cause of this inconsistent analysis?

**What change addresses the root cause?**

- A) Include `git blame` data so Claude can identify comments that predate recent code changes.
- B) Add few-shot examples of misleading comments to help the model recognize similar patterns in the codebase.
- C) Filter TODO, FIXME, and descriptive comment patterns before analysis to reduce noise.
- D) Specify explicit criteria: flag comments only when the behavior they claim contradicts the code’s actual behavior. **[CORRECT]**

**Why D:** Explicit criteria—flagging comments only when claimed behavior contradicts actual code behavior—directly addresses the root cause by replacing a vague instruction with a precise definition of what constitutes a problem. This reduces false positives on acceptable patterns and misses of truly misleading comments.

---

## Question 23 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your automated code review system shows inconsistent severity ratings—similar issues like null pointer risks are rated “critical” in some PRs but only “medium” in others. Developer surveys show growing distrust—many start dismissing findings without reading because “half are wrong.” High-false-positive categories erode trust in accurate categories. Which approach best restores developer trust while improving the system?

**Which approach best restores developer trust?**

- A) Temporarily disable high-false-positive categories (style, naming, documentation) and keep only high-precision categories while improving prompts. **[CORRECT]**
- B) Keep all categories enabled but display confidence scores with each finding so developers can decide what to investigate.
- C) Keep all categories enabled and add few-shot examples to improve accuracy for each category over the next few weeks.
- D) Apply a uniform strictness reduction across all categories to bring the overall false-positive rate down.

**Why A:** Temporarily disabling high-false-positive categories immediately stops trust erosion by removing noisy findings that cause developers to dismiss everything, while preserving value from high-precision categories like security and correctness. It also creates space to improve prompts for problematic categories before re-enabling them.

---

## Question 24 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your automated review generates test-case suggestions for each PR. Reviewing a PR that adds course completion tracking, Claude suggests 10 test cases, but developer feedback shows that 6 duplicate scenarios already covered by the existing test suite. What change most effectively reduces duplicate suggestions?

**What change is most effective?**

- A) Include the existing test file in context so Claude can determine what scenarios are already covered. **[CORRECT]**
- B) Reduce the requested number of suggestions from 10 to 5, assuming Claude prioritizes the most valuable cases first.
- C) Add instructions directing Claude to focus exclusively on edge cases and error conditions rather than success paths.
- D) Implement post-processing that filters suggestions whose descriptions match existing test names via keyword overlap.

**Why A:** Including the existing test file fixes the root cause of duplication: Claude can only avoid suggesting already-covered scenarios if it knows what tests already exist. This gives Claude the information needed to propose genuinely new, valuable tests.

---

## Question 25 (Scenario: Claude Code for Continuous Integration)

**Situation:** After an initial automated review identifies 12 findings, a developer pushes new commits to address issues. Re-running review produces 8 findings, but developers report that 5 duplicate previous comments on code that was already fixed in the new commits. What is the most effective way to eliminate this redundant feedback while maintaining thoroughness?

**What is the most effective way to eliminate redundant feedback?**

- A) Run review only when the PR is created and in the final pre-merge state, skipping intermediate commits.
- B) Add a post-processing filter that removes findings that match previous ones by file paths and issue descriptions before posting comments.
- C) Restrict review scope to files changed in the most recent push, excluding files from earlier commits.
- D) Include previous review findings in context and instruct Claude to report only new or still-unresolved issues. **[CORRECT]**

**Why D:** Including prior review findings in context lets Claude distinguish new problems from those already addressed in recent commits. This preserves review thoroughness while using Claude’s reasoning to avoid redundant feedback on fixed code.

---

## Question 26 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your pipeline script runs `claude "Analyze this pull request for security issues"`, but the job hangs indefinitely. Logs show Claude Code is waiting for interactive input. What is the correct approach to run Claude Code in an automated pipeline?

**What is the correct approach?**

- A) Add a `--batch` flag: `claude --batch "Analyze this pull request for security issues"`.
- B) Add the `-p` flag: `claude -p "Analyze this pull request for security issues"`. **[CORRECT]**
- C) Redirect stdin from `/dev/null`: `claude "Analyze this pull request for security issues" < /dev/null`.
- D) Set the environment variable `CLAUDE_HEADLESS=true` before running the command.

**Why B:** The `-p` (or `--print`) flag is the documented way to run Claude Code non-interactively. It processes the prompt, prints the result to stdout, and exits without waiting for user input—ideal for CI/CD pipelines.

---

## Question 27 (Scenario: Claude Code for Continuous Integration)

**Situation:** A pull request changes 14 files in an inventory tracking module. A single-pass review that analyzes all files together produces inconsistent results: detailed feedback on some files but shallow comments on others, missed obvious bugs, and contradictory feedback (a pattern is flagged in one file but identical code is approved in another file in the same PR). How should you restructure the review?

**How should you restructure the review?**

- A) Run three independent full-PR review passes and flag only issues that appear in at least two of the three runs.
- B) Split into focused passes: review each file individually for local issues, then run a separate integration-oriented pass to examine cross-file data flows. **[CORRECT]**
- C) Require developers to split large PRs into smaller submissions of 3–4 files before running automated review.
- D) Switch to a larger model with a bigger context window so it can pay sufficient attention to all 14 files in one pass.

**Why B:** Focused per-file passes address the root cause—attention dilution—by ensuring consistent depth and reliable local issue detection. A separate integration-oriented pass then covers cross-file concerns such as dependency and data-flow interactions.

---

## Question 28 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your automated code review averages 15 findings per pull request, and developers report a 40% false-positive rate. The bottleneck is investigation time: developers must click into each finding to read Claude’s rationale before deciding whether to fix or dismiss it. Your CLAUDE.md already contains comprehensive rules for acceptable patterns, and stakeholders rejected any approach that filters findings before developers see them. What change best addresses investigation time?

**What change best addresses investigation time?**

- A) Require Claude to include its rationale and confidence estimate directly in each finding. **[CORRECT]**
- B) Add a post-processor that analyzes finding patterns and automatically suppresses those that match historical false-positive signatures.
- C) Categorize findings as “blocking issues” vs “suggestions,” with different review requirements by level.
- D) Configure Claude to show only high-confidence findings, filtering uncertain flags before developers see them.

**Why A:** Including rationale and confidence directly in each finding reduces investigation time by letting developers quickly triage without opening each finding. It satisfies the “no filtering” constraint because all findings remain visible while accelerating developer decision-making.

---

## Question 29 (Scenario: Claude Code for Continuous Integration)

**Situation:** Analysis of your automated code review shows large differences in false-positive rates by finding category: security/correctness findings have 8% false positives, performance findings 18%, style/naming findings 52%, and documentation findings 48%. Developer surveys show growing distrust—many start dismissing findings without reading because “half are wrong.” High-false-positive categories erode trust in accurate categories. Which approach best restores developer trust while improving the system?

**Which approach best restores developer trust?**

- A) Temporarily disable high-false-positive categories (style, naming, documentation) and keep only high-precision categories while improving prompts. **[CORRECT]**
- B) Keep all categories enabled but display confidence scores with each finding so developers can decide what to investigate.
- C) Keep all categories enabled and add few-shot examples to improve accuracy for each category over the next few weeks.
- D) Apply a uniform strictness reduction across all categories to bring the overall false-positive rate down.

**Why A:** Temporarily disabling high-false-positive categories immediately stops trust erosion by removing noisy findings that cause developers to dismiss everything, while preserving value from high-precision categories like security and correctness. It also creates space to improve prompts for problematic categories before re-enabling them.

---

## Question 30 (Scenario: Claude Code for Continuous Integration)

**Situation:** Your team wants to reduce API costs for automated analysis. Currently, synchronous Claude calls support two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. Your manager proposes moving both to the Message Batches API to save 50%. How should you evaluate this proposal?

**How should you evaluate this proposal?**

- A) Move both to batch processing with fallback to synchronous calls if batches take too long.
- B) Move both workflows to batch processing with status polling to verify completion.
- C) Use batch processing only for technical debt reports; keep synchronous calls for pre-merge checks. **[CORRECT]**
- D) Keep synchronous calls for both workflows to avoid issues with batch result ordering.

**Why C:** Message Batches API processing can take up to 24 hours with no latency SLA, which is acceptable for overnight technical debt reports but unacceptable for blocking pre-merge checks where developers wait. This matches each workflow to the right API based on latency requirements.

---

## Scenario: Code Generation with Claude Code

---

## Question 31 (Scenario: Code Generation with Claude Code)

**Situation:** You asked Claude Code to implement a function that transforms API responses into an internal normalized format. After two iterations, the output structure still doesn’t match expectations—some fields are nested differently and timestamps are formatted incorrectly. You described requirements in prose, but Claude interprets them differently each time.

**Which approach is most effective for the next iteration?**

- A) Write a JSON schema describing the expected output structure and validate Claude’s output against it after each iteration.
- B) Provide 2–3 concrete input-output examples showing the expected transformation for representative API responses. **[CORRECT]**
- C) Rewrite requirements with more technical precision, specifying exact field mappings, nesting rules, and timestamp format strings.
- D) Ask Claude to explain its current understanding of the requirements to identify where interpretations diverge.

**Why B:** Concrete input-output examples remove ambiguity inherent in prose descriptions by showing Claude the exact expected transformation results. This directly addresses the root cause—misinterpretation of textual requirements—by providing unambiguous patterns for field nesting and timestamp formatting.

---

## Question 32 (Scenario: Code Generation with Claude Code)

**Situation:** You need to add Slack as a new notification channel. The existing codebase has clear, established patterns for email, SMS, and push channels. However, Slack’s API offers fundamentally different integration approaches—incoming webhooks (simple, one-way), bot tokens (support delivery confirmation and programmatic control), or Slack Apps (two-way events, requires workspace approval). Your task says “add Slack support” without specifying integration method or requiring advanced features like delivery tracking.

**How should you approach this task?**

- A) Start in direct execution mode using incoming webhooks to match the existing one-way notification pattern.
- B) Switch to planning mode to explore integration options and architectural implications, then present a recommendation before implementation. **[CORRECT]**
- C) Start in direct execution mode by scaffolding a Slack channel class using existing patterns, deferring the integration method decision.
- D) Start in direct execution mode using a bot-token approach to ensure delivery confirmation is possible.

**Why B:** Slack integration has multiple valid approaches with significantly different architectural implications, and requirements are ambiguous. Planning mode lets you evaluate trade-offs among webhooks, bot tokens, and Slack Apps and align on an approach before implementation.

---

## Question 33 (Scenario: Code Generation with Claude Code)

**Situation:** Your CLAUDE.md file has grown to 400+ lines containing coding standards, testing conventions, a detailed PR review checklist, deployment instructions, and database migration procedures. You want Claude to always follow coding standards and testing conventions, but apply PR review, deploy, and migration guidance only when doing those tasks.

**Which restructuring approach is most effective?**

- A) Move all guidance into separate Skills files organized by workflow type, leaving only a brief project description in CLAUDE.md.
- B) Keep everything in CLAUDE.md but use `@import` syntax to organize into separately maintained files by category.
- C) Split CLAUDE.md into files under `.claude/rules/` with path-bound glob patterns so each rule loads only for the relevant file types.
- D) Keep universal standards in CLAUDE.md and create Skills for workflow-specific guidance (PR review, deploy, migrations) with trigger keywords. **[CORRECT]**

**Why D:** CLAUDE.md content loads in every session, ensuring coding standards and testing conventions always apply, while Skills are invoked on demand when Claude detects trigger keywords—ideal for workflow-specific guidance like PR review, deployment, and migrations.

---

## Question 34 (Scenario: Code Generation with Claude Code)

**Situation:** You’re tasked with restructuring your team’s monolithic application into microservices. This impacts changes across dozens of files and requires decisions about service boundaries and module dependencies.

**Which approach should you choose?**

- A) Switch to planning mode to explore the codebase, understand dependencies, and design the implementation approach before making changes. **[CORRECT]**
- B) Start in direct execution mode and switch to planning only after encountering unexpected complexity during implementation.
- C) Start in direct execution mode and make incremental changes, letting implementation reveal natural service boundaries.
- D) Use direct execution with detailed upfront instructions that specify each service structure.

**Why A:** Planning mode is the right strategy for complex architectural restructuring like splitting a monolith: it allows safe exploration and informed decisions about boundaries before committing to potentially expensive changes across many files.

---

## Question 35 (Scenario: Code Generation with Claude Code)

**Situation:** Your team created a `/analyze-codebase` skill that performs deep code analysis—dependency scanning, test coverage counts, and code quality metrics. After running the command, team members report Claude becomes less responsive in the session and loses the context of the original task.

**How do you most effectively fix this while keeping full analysis capabilities?**

- A) Add `context: fork` in the skill frontmatter to run the analysis in an isolated subagent context. **[CORRECT]**
- B) Add `model: haiku` in frontmatter to use a faster, cheaper model for analysis.
- C) Split the skill into three smaller skills, each producing less output.
- D) Add instructions to the skill to compress all results into a short summary before displaying them.

**Why A:** `context: fork` runs the analysis in an isolated subagent context so the large output does not pollute the main session’s context window and Claude does not lose track of the original task. It preserves full analysis capability while keeping the main session responsive.

---

## Question 36 (Scenario: Code Generation with Claude Code)

**Situation:** Your team uses a `/commit` skill in `.claude/skills/commit/SKILL.md`. A developer wants to customize it for their personal workflow (different commit message format, extra checks) without affecting teammates.

**What do you recommend?**

- A) Create a personal version under `~/.claude/skills/` with a different name, e.g., `/my-commit`.
- B) Add conditional logic based on username in the project skill frontmatter.
- C) Create a personal version at `~/.claude/skills/commit/SKILL.md` with the same name. **[CORRECT]**
- D) Set `override: true` in the personal skill frontmatter to prioritize it over the project version.

**Why C:** Personal skills take precedence over project skills with the same name. A personal skill at `~/.claude/skills/commit/SKILL.md` will override the team’s project skill, allowing the developer to customize their workflow while maintaining the familiar `/commit` command name for their personal use. This approach is better than option A because it preserves the original command name, improving the developer’s workflow without affecting teammates.

---

## Question 37 (Scenario: Code Generation with Claude Code)

**Situation:** Your team has used Claude Code for months. Recently, three developers report Claude follows the guidance “always include comprehensive error handling,” but a fourth developer who just joined says Claude does not follow it. All four work in the same repo and have up-to-date code.

**What is the most likely cause and fix?**

- A) The guidance lives in the original developers’ user-level `~/.claude/CLAUDE.md` files, not in the project `.claude/CLAUDE.md`. Move the instruction to the project-level file so all team members receive it. **[CORRECT]**
- B) The new developer’s `~/.claude/CLAUDE.md` contains conflicting instructions overriding project settings; they should delete the conflicting section.
- C) Claude Code learns per-user preferences over time; the new developer must repeat the requirement until Claude “remembers” it.
- D) Claude Code caches CLAUDE.md after first read; original developers use cached versions. Everyone should clear the Claude Code cache.

**Why A:** If the guidance was added only to the original developers’ user-level configs and not to the project-level `.claude/CLAUDE.md`, new team members won’t receive it. Moving it to the project-level configuration ensures all current and future team members automatically get the guidance.

---

## Question 38 (Scenario: Code Generation with Claude Code)

**Situation:** You find that including 2–3 full endpoint implementation examples as context significantly improves consistency when generating new API endpoints. However, this context is useful only when creating new endpoints—not when debugging, reviewing code, or other work in the API directory.

**Which configuration approach is most effective?**

- A) Add endpoint examples and pattern documentation to the project CLAUDE.md so they are always available.
- B) Manually reference endpoint examples in every generation request by copying code into the prompt.
- C) Configure path-specific rules in `.claude/rules/api/` that include endpoint examples and activate when working in the API directory.
- D) Create a skill that references the endpoint examples and contains pattern-following instructions, invoked on demand via a slash command. **[CORRECT]**

**Why D:** A skill invoked on demand loads the example context only when generating new endpoints, not during unrelated tasks like debugging or review. This keeps the main context clean while preserving high-quality generation when needed.

---

## Question 39 (Scenario: Code Generation with Claude Code)

**Situation:** Your team created a `/migration` skill that generates database migration files. It takes the migration name via `$ARGUMENTS`. In production you observe three issues: (1) developers often run the skill without arguments, causing poorly named files, (2) the skill sometimes uses database schema details from unrelated prior conversations, and (3) a developer accidentally ran destructive test cleanup when the skill had broad tool access.

**Which configuration approach fixes all three problems?**

- A) Use positional parameters `$1` and `$2` instead of `$ARGUMENTS` to enforce specific inputs, include explicit schema file references via `@` syntax for context control, and add a frontmatter description warning about destructive operations.
- B) Add `argument-hint` in frontmatter to request required parameters, use `context: fork` to isolate execution, and restrict `allowed-tools` to file-write operations. **[CORRECT]**
- C) Split into `/migration-create` and `/migration-apply` skills, add validation instructions to request migration name if missing, and use different `allowed-tools` scopes for each.
- D) Add validation instructions in the skill SKILL.md to ensure `$ARGUMENTS` is a valid name, add prompts to ignore prior conversation context, and list prohibited operations to avoid.

**Why B:** This uses three separate configuration features to address each problem: `argument-hint` improves argument entry and reduces missing arguments, `context: fork` prevents context leakage from prior conversations, and `allowed-tools` constrains the skill to safe file-writing operations, preventing destructive actions.

---

## Question 40 (Scenario: Code Generation with Claude Code)

**Situation:** Your codebase contains areas with different coding conventions: React components use functional style with hooks, API handlers use async/await with specific error handling, and database models follow the repository pattern. Test files are distributed across the codebase next to the code under test (e.g., `Button.test.tsx` next to `Button.tsx`), and you want all tests to follow the same conventions regardless of location.

**What is the most supported way to ensure Claude automatically applies the correct conventions when generating code?**

- A) Put all conventions in the root CLAUDE.md under headings for each area and rely on Claude to infer which section applies.
- B) Create skills in `.claude/skills/` for each code type, embedding conventions in each SKILL.md.
- C) Place a separate CLAUDE.md file in each subdirectory containing conventions for that area.
- D) Create rule files under `.claude/rules/` with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths. **[CORRECT]**

**Why D:** `.claude/rules/` files with YAML frontmatter and glob patterns (e.g., `**/*.test.tsx`, `src/api/**/*.ts`) enable deterministic, path-based convention application regardless of directory structure. This is the most supported approach for cross-cutting patterns like distributed test files.

---

## Question 41 (Scenario: Code Generation with Claude Code)

**Situation:** You want to create a custom slash command `/review` that runs your team’s standard code review checklist. It should be available to every developer when they clone or update the repository.

**Where should you create the command file?**

- A) In `~/.claude/commands/` in each developer’s home directory.
- B) In the project repository under `.claude/commands/`. **[CORRECT]**
- C) In `.claude/config.json` as an array of commands.
- D) In the root project CLAUDE.md.

**Why B:** Putting custom slash commands under `.claude/commands/` inside the project repository ensures they are version-controlled and automatically available to every developer who clones or updates the repo. This is the intended location for project-level custom commands in Claude Code.

---

## Question 42 (Scenario: Code Generation with Claude Code)

**Situation:** Your team’s CLAUDE.md grew beyond 500 lines mixing TypeScript conventions, testing guidance, API patterns, and deployment procedures. Developers find it hard to locate and update the right sections.

**What approach does Claude Code support to organize project-level instructions into focused topical modules?**

- A) Define a `.claude/config.yaml` mapping file patterns to specific sections inside CLAUDE.md.
- B) Create separate Markdown files in `.claude/rules/`, each covering one topic (e.g., `testing.md`, `api-conventions.md`). **[CORRECT]**
- C) Split instructions into README.md files in relevant subdirectories that Claude automatically loads as instructions.
- D) Create multiple files named CLAUDE.md at different levels of the directory tree, each overriding parent instructions.

**Why B:** Claude Code supports a `.claude/rules/` directory where you can create separate Markdown files for topical guidance (e.g., `testing.md`, `api-conventions.md`), allowing teams to organize large instruction sets into focused, maintainable modules.

---

## Question 43 (Scenario: Code Generation with Claude Code)

**Situation:** You create a custom skill `/explore-alternatives` that your team uses to brainstorm and evaluate implementation approaches before choosing one. Developers report that after running the skill, subsequent Claude responses are influenced by the alternatives discussion—sometimes referencing rejected approaches or retaining exploration context that interferes with actual implementation.

**How should you most effectively configure this skill?**

- A) Use the `!` prefix in the skill to run exploration logic as a bash subprocess.
- B) Add `context: fork` in the skill frontmatter. **[CORRECT]**
- C) Split into two skills—`/explore-start` and `/explore-end`—to mark boundaries when exploration context should be discarded.
- D) Create the skill in `~/.claude/skills/` instead of `.claude/skills/`.

**Why B:** `context: fork` runs the skill in an isolated subagent context so exploration discussions do not pollute the main conversation history. This prevents rejected approaches and brainstorming context from influencing subsequent implementation work.

---

## Question 44 (Scenario: Code Generation with Claude Code)

**Situation:** Your team wants to add a GitHub MCP server for searching PRs and checking CI status via Claude Code. Each of six developers has their own personal GitHub access token. You want consistent tooling across the team without committing credentials to version control.

**Which configuration approach is most effective?**

- A) Have each developer add the server in user scope via `claude mcp add --scope user`.
- B) Create an MCP server wrapper that reads tokens from a `.env` file and proxies GitHub API calls, then add the wrapper to the project `.mcp.json`.
- C) Add the server to the project `.mcp.json` using environment variable substitution (`${GITHUB_TOKEN}`) for auth and document the required environment variable in the project README. **[CORRECT]**
- D) Configure the server in project scope with a placeholder token, then tell developers to override it in their local config.

**Why C:** A project `.mcp.json` with environment variable substitution is idiomatic: it provides a single version-controlled source of truth for MCP configuration while letting each developer supply credentials via environment variables. Documenting the variable makes onboarding easy without committing secrets.

---

## Question 45 (Scenario: Code Generation with Claude Code)

**Situation:** You’re adding error-handling wrappers around external API calls across a 120-file codebase. The work has three phases: (1) discover all call sites and patterns, (2) collaboratively design the error-handling approach, and (3) implement wrappers consistently. In Phase 1, Claude generates large output listing hundreds of call sites with context, quickly filling the context window before discovery finishes.

**Which approach is most effective to complete the task while maintaining implementation consistency?**

- A) Use an Explore subagent for Phase 1 to isolate verbose discovery output and return a summary, then continue Phases 2–3 in the main conversation. **[CORRECT]**
- B) Do all phases in the main conversation, periodically using `/compact` to reduce context usage while moving through files.
- C) Switch to headless mode with `--continue`, passing explicit context summaries between batch calls to maintain continuity.
- D) Define the error-handling pattern in CLAUDE.md, then process files in batches across multiple sessions relying on the shared memory file for consistency.

**Why A:** An Explore subagent isolates the verbose discovery output in a separate context and returns only a concise summary to the main conversation. This preserves the main context window for the collaborative design and consistent implementation phases where retained context is most valuable.

---

## Scenario: Customer Support Agent

---

## Question 46 (Scenario: Customer Support Agent)

**Situation:** While testing, you notice the agent often calls `get_customer` when users ask about order status, even though `lookup_order` would be more appropriate. What should you check first to address this problem?

**What should you check first?**

- A) Implement a preprocessing classifier to detect order-related requests and route them directly to `lookup_order`.
- B) Reduce the number of tools available to the agent to simplify choice.
- C) Add few-shot examples to the system prompt covering all possible order request patterns to improve tool selection.
- D) Check the tool descriptions to ensure they clearly differentiate each tool’s purpose. **[CORRECT]**

**Why D:** Tool descriptions are the primary input the model uses to decide which tool to call. When an agent consistently picks the wrong tool, the first diagnostic step is to verify that tool descriptions clearly separate each tool’s purpose and usage boundaries.

---

## Question 47 (Scenario: Customer Support Agent)

**Situation:** Your agent handles single-issue requests with 94% accuracy (e.g., “I need a refund for order #1234”). But when customers include multiple issues in one message (e.g., “I need a refund for order #1234 and also want to update the shipping address for order #5678”), tool selection accuracy drops to 58%. The agent usually solves only one issue or mixes parameters across requests. What approach most effectively improves reliability for multi-issue requests?

**What approach is most effective?**

- A) Implement a preprocessing layer that uses a separate model call to decompose multi-issue messages into separate requests, handle each independently, and merge results.
- B) Combine related tools into fewer universal tools.
- C) Add few-shot examples to the prompt demonstrating correct reasoning and tool sequencing for multi-issue requests. **[CORRECT]**
- D) Implement response validation that detects incomplete answers and automatically reprompts the agent to resolve missed issues.

**Why C:** Few-shot examples that demonstrate correct reasoning and tool sequencing for multi-issue requests are most effective because the agent already performs well on single issues—what it needs is guidance on the pattern for decomposing and routing multiple issues and keeping parameters separated.

---

## Question 48 (Scenario: Customer Support Agent)

**Situation:** Production logs show that for simple requests like “refund for order #1234,” your agent resolves the issue in 3–4 tool calls with 91% success. But for complex requests like “I was billed twice, my discount didn’t apply, and I want to cancel,” the agent averages 12+ tool calls with only 54% success—often investigating issues sequentially and fetching redundant customer data for each. What change most effectively improves handling of complex requests?

**What change is most effective?**

- A) Add explicit verification checkpoints between stages, requiring the agent to record progress after resolving each issue before moving to the next.
- B) Reduce the number of tools by combining `get_customer`, `lookup_order`, and billing-related tools into a single `investigate_issue` tool.
- C) Decompose the request into separate issues, then investigate each in parallel using shared customer context before synthesizing a final resolution. **[CORRECT]**
- D) Add few-shot examples to the system prompt demonstrating ideal tool-call sequences for various multi-faceted billing scenarios.

**Why C:** Decomposing into separate issues and investigating in parallel with shared customer context fixes both key problems: it eliminates redundant data retrieval by reusing shared context across issues and reduces total tool-call loops by parallelizing investigation before synthesizing a single resolution.

---

## Question 49 (Scenario: Customer Support Agent)

**Situation:** Your agent achieves 55% first-contact resolution, well below the 80% target. Logs show it escalates simple cases (standard replacements for damaged goods with photo proof) while trying to handle complex situations requiring policy exceptions autonomously. What is the most effective way to improve escalation calibration?

**What is the most effective way to improve escalation calibration?**

- A) Require the agent to self-rate confidence on a 1–10 scale before each response and automatically route to humans when confidence drops below a threshold.

- B) Deploy a separate classifier model trained on historical tickets to predict which requests need escalation before the main agent starts processing.
- C) Add explicit escalation criteria to the system prompt with few-shot examples showing when to escalate versus resolve autonomously. **[CORRECT]**
- D) Implement sentiment analysis to determine customer frustration level and automatically escalate past a negative sentiment threshold.

**Why C:** Explicit escalation criteria with few-shot examples directly address the root cause—unclear decision boundaries between simple and complex cases. It’s the most proportional, effective first intervention that teaches the agent when to escalate and when to resolve autonomously without extra infrastructure.

---

## Question 50 (Scenario: Customer Support Agent)

**Situation:** After calling `get_customer` and `lookup_order`, the agent has all available system data but still faces uncertainty. Which situation is the most justified trigger for calling `escalate_to_human`?

**Which situation is most justified for escalation?**

- A) A customer wants to cancel an order shipped yesterday and arriving tomorrow. The agent should escalate because the customer might change their mind after receiving the package.
- B) A customer claims they didn’t receive an order, but tracking shows it was delivered and signed for at their address three days ago. The agent should escalate because presenting contradictory evidence could harm the customer relationship.
- C) A customer requests competitor price matching. Your policies allow price adjustments for price drops on your own site within 14 days, but say nothing about competitor prices. The agent should escalate for policy interpretation. **[CORRECT]**
- D) A customer message contains both a billing question and a product return. The agent should escalate so a human can coordinate both issues in one interaction.

**Why C:** This is a genuine policy gap: company rules cover price drops on your own site but do not address competitor price matching. The agent must not invent policy and should escalate for human judgment on how to interpret or extend existing rules.

---

## Question 51 (Scenario: Customer Support Agent)

**Situation:** Production logs show that in 12% of cases your agent skips `get_customer` and calls `lookup_order` directly using only the customer-provided name, sometimes leading to misidentified accounts and incorrect refunds. What change most effectively fixes this reliability problem?

**What change is most effective?**

- A) Add few-shot examples showing that the agent always calls `get_customer` first, even when customers voluntarily provide order details.
- B) Implement a routing classifier that analyzes each request and enables only a subset of tools appropriate for that request type.
- C) Add a programmatic precondition that blocks `lookup_order` and `process_refund` until `get_customer` returns a verified customer identifier. **[CORRECT]**
- D) Strengthen the system prompt stating that customer verification via `get_customer` is mandatory before any order operations.

**Why C:** A programmatic precondition provides a deterministic guarantee that required sequencing is followed. It’s the most effective approach because it eliminates the possibility of skipping verification, regardless of LLM behavior.

---

## Question 52 (Scenario: Customer Support Agent)

**Situation:** Production metrics show that when resolving complex billing disputes or multi-order returns, customer satisfaction scores are 15% lower than for simple cases—even when the resolution is technically correct. Root-cause analysis shows the agent provides accurate solutions but inconsistently explains rationale: sometimes omitting relevant policy details, sometimes missing timeline info or next steps. The specific context gaps vary case by case. You want to improve solution quality without adding human oversight. What approach is most effective?

**What approach is most effective?**

- A) Add a self-critique stage where the agent evaluates a draft response for completeness—ensuring it resolves the customer’s issue, includes relevant context, and anticipates follow-up questions. **[CORRECT]**
- B) Add a confirmation stage where the agent asks “Does this fully resolve your issue?” before closing, allowing customers to request additional information if needed.
- C) Upgrade the model from Haiku to Sonnet for complex cases, routing based on a defined complexity metric.
- D) Implement few-shot examples in the system prompt showing complete explanations for five common complex case types, demonstrating how to include policy context, timelines, and next steps.

**Why A:** A self-critique stage (the evaluator-optimizer pattern) directly addresses inconsistent explanation completeness by forcing the agent to assess its own draft against concrete criteria—such as policy context, timelines, and next steps—before presenting it. This catches case-specific gaps without human oversight.

---

## Question 53 (Scenario: Customer Support Agent)

**Situation:** Production metrics show your agent averages 4+ API loops per resolution. Analysis reveals Claude often requests `get_customer` and `lookup_order` in separate sequential turns even when both are needed initially. What is the most effective way to reduce the number of loops?

**What is the most effective way to reduce loops?**

- A) Implement speculative execution that automatically calls likely-needed tools in parallel with any requested tool and returns all results regardless of what was requested.
- B) Increase `max_tokens` to give Claude more room to plan and naturally combine tool requests.
- C) Create composite tools like `get_customer_with_orders` that bundle common lookup combinations into single calls.
- D) Instruct Claude in the prompt to bundle tool requests into one turn and return all results together before the next API call. **[CORRECT]**

**Why D:** Prompting Claude to bundle related tool requests into a single turn leverages its native ability to request multiple tools at once. It directly fixes the sequential-call pattern with minimal architectural change.

---

## Question 54 (Scenario: Customer Support Agent)

**Situation:** Production logs show a pattern: customers reference specific amounts (e.g., “the 15% discount I mentioned”), but the agent responds with incorrect values. Investigation shows these details were mentioned 20+ turns ago and condensed into vague summaries like “promotional pricing was discussed.” What fix is most effective?

**What fix is most effective?**

- A) Increase the summarization threshold from 70% to 85% so conversations have more room before summarization triggers.
- B) Store full conversation history in external storage and implement retrieval when the agent detects references like “as I mentioned.”
- C) Extract transactional facts (amounts, dates, order numbers) into a persistent “case facts” block included in every prompt outside the summarized history. **[CORRECT]**
- D) Revise the summarization prompt to explicitly preserve all numbers, percentages, dates, and customer-stated expectations verbatim.

**Why C:** Summarization inherently loses precise details. Extracting transactional facts into a structured “case facts” block outside the summarized history preserves critical information so it’s reliably available in every prompt regardless of how many turns have been summarized.

---

## Question 55 (Scenario: Customer Support Agent)

**Situation:** Your `get_customer` tool returns all matches when searching by name. Currently, when there are multiple results, Claude picks the customer with the most recent order, but production data shows this selects the wrong account 15% of the time for ambiguous matches. How should you address this?

**How should you address this?**

- A) Implement a confidence scoring system that acts autonomously above 85% confidence and requests clarification below the threshold.
- B) Instruct Claude to request an additional identifier (email, phone, or order number) when `get_customer` returns multiple matches before taking any customer-specific action. **[CORRECT]**
- C) Modify `get_customer` to return only a single most-likely match based on a ranking algorithm, eliminating ambiguity.
- D) Add few-shot examples to the prompt demonstrating correct reasoning and tool sequencing for ambiguous matches.

**Why B:** Asking the user for an additional identifier is the most reliable way to resolve ambiguity because the user has definitive knowledge of their identity. One extra conversational turn is a small price to pay to eliminate a 15% error rate caused by choosing the wrong account.

---

## Question 56 (Scenario: Customer Support Agent)

**Situation:** Production logs show a consistent pattern: when customers include the word “account” in their message (e.g., “I want to check my account for an order I made yesterday”), the agent calls `get_customer` first 78% of the time. When customers phrase similar requests without “account” (e.g., “I want to check an order I made yesterday”), it calls `lookup_order` first 93% of the time. Tool descriptions are clear and unambiguous. What is the most likely root cause of this discrepancy?

**What is the most likely root cause?**

- A) The system prompt contains keyword-sensitive instructions that steer behavior based on terms like “account,” creating unintended tool-selection patterns. **[CORRECT]**
- B) The model’s base training creates associations between “account” terminology and customer-related operations that override tool descriptions.
- C) The model needs more training data on multi-concept messages and should be fine-tuned on examples containing both account and order terminology.
- D) Tool descriptions need additional negative examples specifying when NOT to use each tool to prevent this keyword-induced confusion.

**Why A:** The systematic keyword-driven pattern (78% vs 93%) strongly indicates explicit routing logic in the system prompt reacting to the word “account” and steering the agent toward customer-related tools. Since tool descriptions are already clear, the discrepancy points to prompt-level instructions creating unintended behavioral steering.

---

## Question 57 (Scenario: Customer Support Agent)

**Situation:** Production logs show the agent often calls `get_customer` when users ask about orders (e.g., “check my order #12345”) instead of calling `lookup_order`. Both tools have minimal descriptions (“Gets customer information” / “Gets order details”) and accept similar-looking identifier formats. What is the most effective first step to improve tool selection reliability?

**What is the most effective first step?**

- A) Implement a routing layer that analyzes user input before each turn and preselects the correct tool based on detected keywords and ID patterns.
- B) Combine both tools into a single `lookup_entity` that accepts any identifier and internally decides which backend to query.
- C) Add few-shot examples to the system prompt demonstrating correct tool selection patterns, with 5–8 examples routing order-related queries to `lookup_order`.
- D) Expand each tool’s description to include input formats, example queries, edge cases, and boundaries explaining when to use it versus similar tools. **[CORRECT]**

**Why D:** Expanding tool descriptions with input formats, example queries, edge cases, and clear boundaries directly fixes the root cause—minimal descriptions that don’t give the LLM enough information to distinguish similar tools. It’s a low-effort, high-impact first step that improves the primary mechanism the LLM uses for tool selection.

---

## Question 58 (Scenario: Customer Support Agent)

**Situation:** You are implementing the agent loop for your support agent. After each Claude API call, you must decide whether to continue the loop (run requested tools and call Claude again) or stop (present the final answer to the customer). What determines this decision?

**What determines this decision?**

- A) Check the `stop_reason` field in Claude’s response—continue if it is `tool_use` and stop if it is `end_turn`. **[CORRECT]**
- B) Parse Claude’s text for phrases like “I’m done” or “Can I help with anything else?”—natural language signals indicate task completion.
- C) Set a maximum iteration count (e.g., 10 calls) and stop when reached, regardless of whether Claude indicates more work is needed.
- D) Check whether the response contains assistant text content—if Claude generated explanatory text, the loop should terminate.

**Why A:** `stop_reason` is Claude’s explicit structured signal for loop control: `tool_use` indicates Claude wants to run a tool and receive results back, while `end_turn` indicates Claude has completed its response and the loop should end.

---

## Question 59 (Scenario: Customer Support Agent)

**Situation:** Production logs show the agent misinterprets outputs from your MCP tools: Unix timestamps from `get_customer`, ISO 8601 dates from `lookup_order`, and numeric status codes (1=pending, 2=shipped). Some tools are third-party MCP servers you cannot modify. Which approach to data format normalization is most maintainable?

**Which approach is most maintainable?**

- A) Use a PostToolUse hook to intercept tool outputs and apply formatting transformations before the agent processes them. **[CORRECT]**
- B) Modify tools you control to return human-readable formats and create wrappers for third-party tools.
- C) Create a `normalize_data` tool that the agent calls after every data retrieval to transform values.
- D) Add detailed format documentation to the system prompt explaining each tool’s data conventions.

**Why A:** A PostToolUse hook provides a centralized, deterministic point to intercept and normalize all tool outputs—including third-party MCP server data—before the agent processes them. It’s more maintainable because transformations live in code and apply uniformly, rather than relying on LLM interpretation.

---

## Question 60 (Scenario: Customer Support Agent)

**Situation:** Production logs show the agent sometimes chooses `get_customer` when `lookup_order` would be more appropriate, especially for ambiguous queries like “I need help with my recent purchase.” You decide to add few-shot examples to the system prompt to improve tool selection. Which approach most effectively addresses the problem?

**Which approach is most effective?**

- A) Add explicit “use when” and “don’t use when” guidance in each tool description covering ambiguous cases.
- B) Add examples grouped by tool—all `get_customer` scenarios together, then all `lookup_order` scenarios.
- C) Add 4–6 examples targeted at ambiguous scenarios, each with rationale for why one tool was chosen over plausible alternatives. **[CORRECT]**
- D) Add 10–15 examples of clear, unambiguous requests demonstrating correct tool choice for typical scenarios for each tool.

**Why C:** Targeting few-shot examples at the specific ambiguous scenarios where errors occur, with explicit rationale for why one tool is preferable to alternatives, teaches the model the comparative decision process needed for edge cases. This is more effective than generic examples or declarative rules.

---

## Scenario: Conversational AI Architecture Patterns

---

## Question 61 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Your `remove_team_member` tool uses a `dry_run: boolean` parameter for previewing impacts before execution. Production monitoring shows the agent bypasses the preview step by calling with `dry_run=false` directly. You need to ensure every removal is preceded by a preview that the user explicitly confirms.

**What is the most reliable approach?**

- A) Add server-side validation that permits `dry_run=false` only when a `dry_run=true` call with identical parameters occurred within the past 60 seconds.
- B) Annotate the tool as requiring confirmation and configure the orchestration layer to prompt the user for approval before forwarding any calls to annotated tools.
- C) Add detailed instructions and few-shot examples to the tool description requiring the agent to always call with `dry_run=true` first and wait for user confirmation before calling again.
- D) Replace with two tools: `preview_remove_member` returns impact details and a single-use confirmation token; `execute_remove_member` requires that token, binding execution to the preview. **[CORRECT]**

**Why D:** The two-tool token-binding approach makes it architecturally impossible to execute without a prior preview—the execute tool literally requires a token that only the preview tool can generate. This is the only approach that enforces the constraint at the code level rather than relying on LLM compliance with instructions (C), timing heuristics (A), or orchestration infrastructure (B).

---

## Question 62 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Production monitoring shows your `search_catalog` tool fails 12% of the time: 8% are network timeouts that succeed when retried, and 4% are query syntax errors that never succeed regardless of retries. Currently both error types are returned identically, causing wasted retries.

**How should you modify the tool's error handling?**

- A) Add few-shot examples to your system prompt demonstrating how to distinguish network errors from syntax errors.
- B) Apply exponential backoff retry logic to all errors uniformly.
- C) Implement automatic retry with backoff for network timeouts inside the tool; return syntax errors immediately with parameter validation details. **[CORRECT]**
- D) Return all errors with a `retryable` boolean flag and error type details.

**Why C:** Handling retries at the tool level for transient errors is the correct abstraction boundary—the tool has definitive knowledge of the error type and can implement deterministic retry logic without relying on the agent to interpret a flag (D) or follow prompt-level instructions (A). Uniform backoff (B) wastes time on syntax errors that will never succeed.

---

## Question 63 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Over several turns discussing investment strategy, a user stated "I have a very low risk tolerance" and later "I want to maximize my returns." They now ask: "What should I invest in?"

**Which approach best ensures the recommendation aligns with the user's actual priority?**

- A) Surface the contradiction and ask the user to clarify which matters more. **[CORRECT]**
- B) Provide separate recommendations for both scenarios.
- C) Proceed with the most recently stated preference.
- D) Recommend a balanced portfolio without addressing the conflict.

**Why A:** When user preferences directly contradict each other, surfacing the conflict and asking for clarification is the only way to guarantee the recommendation aligns with the user's true intent. Any other approach involves making an assumption that may be wrong—maximizing returns and low risk tolerance are fundamentally incompatible goals that require a human decision.

---

## Question 64 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Users refine playlist preferences over multiple conversation turns. Two messages after a user said "I love jazz," Claude asks "What genres do you enjoy?"

**What is the most likely cause?**

- A) Claude requires a vector database connection to maintain conversation memory.
- B) The model's context window has been exceeded.
- C) The Claude API requires a `session_id` parameter.
- D) Your application isn't including prior messages in the `messages` array. **[CORRECT]**

**Why D:** Claude has no server-side memory—every API call is stateless. Without including the full conversation history in the `messages` array of each request, Claude has no knowledge of prior turns. Vector databases (A) and `session_id` (C) are not part of Claude's architecture; context window overflow (B) is impossible for two-message exchanges.

---

## Question 65 (Scenario: Conversational AI Architecture Patterns)

**Situation:** After a 40-minute cooking session, the conversation reaches 78,000 tokens. History includes allergies, recipe scaling, clarified cooking terms, and general discussion. You must reduce tokens while preserving important information.

**What approach best balances preservation with token reduction?**

- A) Summarize the entire conversation history.
- B) Keep only the most recent 20,000 tokens.
- C) Extract critical structured data (allergies, quantities, preferences), summarize general discussion, and keep recent exchanges verbatim. **[CORRECT]**
- D) Store the full conversation externally and retrieve relevant parts via semantic search.

**Why C:** The hybrid approach preserves the highest-value information at the lowest cost. Critical facts like allergies and recipe quantities are extracted into a compact structured block (preventing the precision loss that occurs during summarization), general discussion is summarized, and recent exchanges are kept verbatim for conversational coherence. Options A and B risk losing critical dietary information; D is architectural overkill for a single cooking session.

---

## Question 66 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Users report that during extended conversations the assistant loses track of earlier topics and preferences. Your current implementation keeps only the last 25 message pairs.

**What is the most effective solution?**

- A) Hybrid approach: summarize older messages while keeping recent ones verbatim. **[CORRECT]**
- B) Vector similarity search over the full conversation history.
- C) Increase the window to 50 message pairs.
- D) Summarize dropped messages every turn and prepend the running summary.

**Why A:** The hybrid approach addresses both dimensions of the problem: retaining exact recent context (critical for conversational coherence) while maintaining a compressed representation of earlier preferences (preventing total loss when pairs are dropped). Increasing the window (C) simply delays the same problem. Vector search (B) may miss important context that isn't semantically similar to the current query. Full per-turn summarization (D) adds overhead and accumulates summarization errors.

---

## Question 67 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Users report that latency increases and costs rise when conversations exceed 50 turns.

**What is the primary cause?**

- A) The entire conversation history is included with each API request. **[CORRECT]**
- B) The model generates progressively longer responses.
- C) Database operations slow down as history grows.
- D) The model builds an internal user profile requiring more processing.

**Why A:** Claude's API is fully stateless—every request must include the complete conversation history in the `messages` array. As conversations grow, each request carries more tokens, which directly increases both processing latency and cost. The model does not maintain any internal state between calls (D is false), and response length is not inherently tied to conversation length (B).

---

## Question 68 (Scenario: Conversational AI Architecture Patterns)

**Situation:** After three months of weekly sessions, conversation history grows to 85,000 tokens. When a user asks "What did we conclude about the theme of isolation?", the assistant gives generic answers instead of referencing previous discussions.

**What is the most effective approach?**

- A) Rolling window truncation.
- B) Progressive summarization capturing key conclusions.
- C) Semantic embeddings with retrieval of relevant exchanges. **[CORRECT]**
- D) Add structured XML tags marking discussion conclusions.

**Why C:** Semantic search over conversation history is the only approach that scales to three months of discussion while being able to surface specific relevant exchanges on demand. Rolling window (A) would discard most of the history. Progressive summarization (B) compresses discussions into abstractions that lose the specific conclusions users are asking about. XML tags (D) require restructuring all past content and don't solve the retrieval problem at this scale.

---

## Question 69 (Scenario: Conversational AI Architecture Patterns)

**Situation:** During QA testing, Claude follows system prompt guidelines for the first 10–15 turns, but later responses deviate. The conversation is still within token limits.

**What is the best solution?**

- A) Move behavioral guidelines into the first user message.
- B) Start a new conversation after 20 turns.
- C) Insert user-role messages reinforcing guidelines at conversation breakpoints. **[CORRECT]**
- D) Use post-response validation to regenerate non-compliant responses.

**Why C:** Periodic injection of behavioral reminders directly combats instruction drift by re-establishing constraints at regular intervals as conversation history accumulates. Moving guidelines to the first user message (A) reduces their authority. Starting a new conversation (B) destroys context. Post-response validation (D) is corrective rather than preventive and adds significant latency.

---

## Question 70 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Your AI tutor has a 2,800-token system prompt defining teaching methodology and adaptation rules. After 12 turns, the assistant starts ignoring proficiency levels.

**What is the most effective fix?**

- A) Inject reminders every 4–5 turns.
- B) Replace verbose rules with few-shot examples demonstrating proficiency-level adaptation. **[CORRECT]**
- C) Place critical rules at the end of the system prompt.
- D) Evaluate responses and regenerate if difficulty level mismatches.

**Why B:** A 2,800-token system prompt with declarative rules is vulnerable to drift because abstract rules require the model to reason about them on every turn. Replacing verbose rules with concrete few-shot examples that demonstrate correct proficiency-level adaptation gives the model clear behavioral patterns to match—this is more reliably followed across many turns than abstract instructions. Reminder injection (A) helps but addresses symptoms; end-placement (C) helps initially but not with turn-level drift; regeneration (D) is expensive and corrective.

---

## Question 71 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Your assistant must maintain an enthusiastic tone, explain its reasoning, and ask clarifying questions. Where should these behavioral guidelines be defined?

**Where should these behavioral guidelines be defined?**

- A) Prepended to each user message.
- B) In the system prompt. **[CORRECT]**
- C) In the first assistant message.
- D) In environment variables.

**Why B:** The system prompt is specifically designed for persistent behavioral constraints and guidelines that apply throughout the entire conversation. Prepending to each user message (A) is redundant overhead. The first assistant message (C) is unreliable because the model can deviate from its own prior statements. Environment variables (D) have no effect on model behavior.

---

## Question 72 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Users report repetitive response openings like "Certainly!" and "I'd be happy to help!"

**What is the most effective approach?**

- A) Append a partial assistant message with a direct response opening. **[CORRECT]**
- B) Lower the temperature setting.
- C) Post-process responses to remove greetings.
- D) Add system prompt instructions to avoid those phrases.

**Why A:** Prefilling the assistant's response with the beginning of a direct answer prevents greeting patterns at the generation level—the model continues from the prefill rather than generating new opening phrases. System prompt instructions (D) can help but are less reliable since the model may still produce variants. Post-processing (C) is a fragile workaround. Temperature (B) controls randomness, not specific phrase patterns.

---

## Question 73 (Scenario: Conversational AI Architecture Patterns)

**Situation:** A webhook notifies your system that a user's package has shipped while the user is actively chatting. You want the assistant to incorporate this naturally into the next response.

**What is the best approach?**

- A) Add shipping status to the system prompt.
- B) Send an immediate synthetic user message.
- C) Force the assistant to call a status tool on each turn.
- D) Append the status update as a prefix to the next user message. **[CORRECT]**

**Why D:** Prefixing the status update to the next user message injects real-time context at a natural conversation boundary without disrupting the flow. Modifying the system prompt (A) requires rebuilding the session or is architecturally cumbersome. A synthetic user message (B) can break the natural dialogue flow and confuse attribution. Forcing a tool call each turn (C) is wasteful when events are rare.

---

## Question 74 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Users frequently send requests like "Book a venue for the party." The assistant asks 4+ clarifying questions, causing 35% abandonment.

**What approach best improves the trade-off?**

- A) Proceed with hidden defaults.
- B) Ask all clarifying questions in one compound message.
- C) State assumptions explicitly and proceed while inviting corrections. **[CORRECT]**
- D) Use a structured intake form.

**Why C:** Stating assumptions explicitly and proceeding gives the user an immediate, useful response while preserving their ability to correct wrong assumptions. Hidden defaults (A) leave the user unaware of what was assumed. A compound question list (B) still demands upfront effort from the user. A structured form (D) adds more friction, not less—contradicting the goal of reducing abandonment.

---

## Question 75 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Your assistant uses a contractor-persona system prompt. Early turns follow the rules, but by turn 7 the assistant gives generic advice. Conversation length is only 2,500 tokens.

**What is the most likely cause?**

- A) System prompts only establish initial behavior.
- B) Model attention weakens as turns accumulate.
- C) Accumulated assistant responses dilute system prompt influence. **[CORRECT]**
- D) The system prompt is only sent once.

**Why C:** As assistant responses accumulate in the conversation history, the proportion of text reflecting the system prompt's behavioral constraints decreases relative to the growing body of assistant-generated content. The model increasingly pattern-matches to its own prior outputs rather than the system prompt, compounding drift even at short token lengths. The system prompt is included in every API call (D is false as a standalone explanation), and model attention degradation (B) doesn't operate at 2,500 tokens.

---

## Question 76 (Scenario: Conversational AI Architecture Patterns)

**Situation:** Users ask vague requests like "Can you help with the report?" The assistant responds by asking multiple questions (which report? what help? deadline?), causing 40% abandonment.

**What is the best solution?**

- A) Make reasonable assumptions, state them explicitly, and offer to adjust. **[CORRECT]**
- B) Classify ambiguity with a smaller model before responding.
- C) Use predefined interpretations without stating assumptions.
- D) Limit the assistant to one clarifying question per turn.

**Why A:** Proceeding with reasonable stated assumptions eliminates the back-and-forth entirely while keeping the user informed and in control. Predefined silent interpretations (C) leave users confused when the response doesn't match their intent. A single-question limit (D) still requires turns of back-and-forth. A smaller classification model (B) adds latency and infrastructure complexity without solving the core UX problem.

---

## Scenario: Developer Productivity Tools

---

## Question 77 (Scenario: Developer Productivity Tools)

**Situation:** An engineer asks the agent to find every place a function `calculate_tax` is defined and called across a 2,000-file repository. The agent has Read, Write, Edit, Bash, Grep, and Glob available.

**Which approach is most effective?**

- A) Read every file in the repository sequentially and scan the contents for the function name.
- B) Use Grep to search file contents for `calculate_tax`, narrowing file types with Glob if needed. **[CORRECT]**
- C) Use Bash to run `find . | xargs cat` and look for the function in the combined output.
- D) Ask the user to paste the relevant files into the conversation.

**Why B:** Grep is purpose-built for content search across many files and returns just the matching lines with locations, keeping the context window small. Reading every file (A) wastes context and is slow; piping everything through Bash `cat` (C) dumps unstructured output and loses file/line attribution; asking the user to paste files (D) defeats the point of an automated tool with repository access.

---

## Question 78 (Scenario: Developer Productivity Tools)

**Situation:** To map an unfamiliar codebase, the agent runs a broad discovery pass that lists hundreds of modules with descriptions. The raw output is enormous and starts crowding out the main conversation before the engineer's actual task begins.

**What is the best way to handle the discovery output?**

- A) Delegate discovery to an Explore subagent (or a `context: fork` skill) that returns a concise summary to the main session. **[CORRECT]**
- B) Increase `max_tokens` so the full discovery output fits.
- C) Truncate the discovery output to the first 50 modules and proceed.
- D) Restart the session after discovery so the context is fresh.

**Why A:** A subagent isolates the verbose discovery in a separate context and returns only a distilled summary, preserving the main context window for the real work. `max_tokens` (B) governs output length, not context pressure. Truncating (C) silently drops modules that may matter. Restarting (D) throws away the discovery you just paid for.

---

## Question 79 (Scenario: Developer Productivity Tools)

**Situation:** Generated boilerplate keeps diverging from the team's conventions (import ordering, error-handling style, test layout). Different engineers get different output for the same request.

**What is the most durable fix?**

- A) Add the conventions to a CLAUDE.md so they load automatically for every request in the project. **[CORRECT]**
- B) Ask each engineer to restate the conventions in their prompt each time.
- C) Lower the temperature so output is more consistent.
- D) Run a formatter after generation to reshape the code.

**Why A:** CLAUDE.md is the project's persistent memory—conventions placed there apply to every session and every engineer automatically, fixing the root cause. Restating conventions per prompt (B) is error-prone and unscalable. Temperature (C) affects variability, not adherence to unstated rules. A formatter (D) catches formatting but not error-handling style or structural conventions.

---

## Question 80 (Scenario: Developer Productivity Tools)

**Situation:** An engineer requests a refactor that will touch ~15 files and involves a non-trivial design decision (how to split a module). They want to review the approach before any code changes.

**Which Claude Code capability fits best?**

- A) Use planning mode to produce and confirm an approach before making edits. **[CORRECT]**
- B) Start editing immediately and let the engineer review the diff afterward.
- C) Use a single Bash command to apply all changes at once.
- D) Generate the whole refactor in one message without tool calls.

**Why A:** Planning mode separates design from execution, letting the engineer approve the approach for an ambiguous, multi-file change before any file is touched—exactly when up-front alignment pays off. Editing first (B) risks large rework if the approach is wrong. A bulk Bash apply (C) skips review entirely. One-shot generation (D) gives no checkpoint and no tool-verified edits.

---

## Question 81 (Scenario: Developer Productivity Tools)

**Situation:** The agent tries to Edit a file but the operation is rejected because the file changed since it was last read in this session.

**What is the correct response?**

- A) Re-read the file to get current contents, then reapply the edit against the new state. **[CORRECT]**
- B) Force the edit by switching to a Bash `sed` command.
- C) Retry the identical Edit until it succeeds.
- D) Overwrite the whole file with Write using the agent's last known version.

**Why A:** The staleness guard fires because the on-disk content no longer matches what the agent last saw; re-reading restores an accurate basis for the edit. Forcing it through Bash `sed` (B) bypasses the safety check and can corrupt concurrent changes. Retrying the identical Edit (C) keeps failing for the same reason. Overwriting with a stale version via Write (D) discards whatever changed the file.

---

## Question 82 (Scenario: Developer Productivity Tools)

**Situation:** The team wants the agent to look up and update tickets in an internal issue tracker that exposes a REST API. Engineers should not paste ticket data by hand, and API credentials must not be embedded in prompts.

**What is the best integration approach?**

- A) Expose the tracker through an MCP server so the agent gets structured tools with credentials handled outside the conversation. **[CORRECT]**
- B) Have engineers copy ticket JSON into the chat whenever it's needed.
- C) Put the API key in CLAUDE.md so the agent can `curl` the API via Bash.
- D) Hardcode ticket contents into a skill file.

**Why A:** An MCP server is the standard way to give an agent typed tools backed by a backend service, with authentication managed by the server rather than the prompt. Manual pasting (B) is unscalable and goes stale. Putting the key in CLAUDE.md (C) leaks a secret into a committed file. Hardcoding tickets in a skill (D) can't reflect live data.

---

## Question 83 (Scenario: Developer Productivity Tools)

**Situation:** Every release, an engineer walks the agent through the same six steps (bump version, update changelog, run tests, tag, build notes, open PR). They want to invoke it as one repeatable action.

**What should they create?**

- A) A custom slash command (or skill) in `.claude/` that encodes the six-step workflow. **[CORRECT]**
- B) A longer CLAUDE.md describing the steps in prose.
- C) A saved chat transcript they re-read each release.
- D) A Bash script that bypasses the agent entirely.

**Why A:** A custom command/skill captures a repeatable, parameterizable workflow that the engineer invokes by name—purpose-built for exactly this. Describing it in CLAUDE.md (B) provides background context but isn't an invokable action. Re-reading a transcript (C) is manual and brittle. A pure Bash script (D) loses the agent's judgment for steps like changelog and PR text.

---

## Question 84 (Scenario: Developer Productivity Tools)

**Situation:** The team wants a set of strict API-design rules to apply only when the agent works on files under `src/api/`, without polluting every other file's context.

**Which mechanism fits?**

- A) Add a rule file in `.claude/rules/` with a `paths` glob scoping it to `src/api/**`. **[CORRECT]**
- B) Put the rules in the top-level CLAUDE.md so they always load.
- C) Paste the rules into every prompt that touches the API.
- D) Create a separate repository for API code.

**Why A:** Path-scoped rule files load conditionally based on which files are in play, so the API rules apply under `src/api/` and nowhere else—keeping other contexts clean. Top-level CLAUDE.md (B) loads everywhere, the opposite of what's wanted. Per-prompt pasting (C) is manual and inconsistent. Splitting the repo (D) is a heavy structural change to solve a context-scoping problem.

---

## Scenario: Structured Data Extraction

---

## Question 85 (Scenario: Structured Data Extraction)

**Situation:** A pipeline extracts fields from invoices, and downstream code needs reliably parseable, well-typed output. Free-text responses occasionally break the parser.

**Which approach gives the most reliable structured output?**

- A) Define the fields as a JSON schema and have the model return them via `tool_use`. **[CORRECT]**
- B) Ask the model to "respond in JSON" in the system prompt and parse the text.
- C) Parse the model's prose answer with regular expressions.
- D) Lower `max_tokens` so the model stays terse.

**Why A:** Driving extraction through a `tool_use` JSON schema constrains the output's shape and types, so downstream parsing is dependable. A prose "respond in JSON" instruction (B) is not enforced and drifts. Regex over prose (C) is brittle and breaks on any phrasing change. `max_tokens` (D) controls length, not structure.

---

## Question 86 (Scenario: Structured Data Extraction)

**Situation:** Some invoices have no purchase-order number. The current schema marks `po_number` as required, so the model fabricates plausible-looking values to satisfy it.

**What is the correct schema design?**

- A) Make `po_number` optional/nullable so the model can return null when it's absent. **[CORRECT]**
- B) Keep it required and accept the occasional invented value.
- C) Remove `po_number` from the schema entirely.
- D) Add an instruction saying "never guess" while keeping the field required.

**Why A:** Marking the field nullable/optional gives the model a correct way to represent "not present," removing the pressure to fabricate. Keeping it required (B) guarantees hallucinated values. Removing the field (C) discards data when it does exist. A "never guess" instruction while the field is still required (D) conflicts with the schema and is unreliable—the structure should make the right answer expressible.

---

## Question 87 (Scenario: Structured Data Extraction)

**Situation:** A `document_type` field usually falls into a known set (invoice, receipt, statement), but occasionally a document matches none of them.

**How should the schema handle this best?**

- A) Use an enum of known types plus an "other" value paired with a free-text detail field. **[CORRECT]**
- B) Use a free-text string with no constraints.
- C) Use an enum of only the three known types and force a choice.
- D) Add a new enum value every time an unexpected type appears.

**Why A:** An enum captures the common cases for clean downstream handling, while "other" + a detail field gives a correct, inspectable home for the long tail. A pure free-text string (B) loses the consistency an enum provides. A closed three-value enum (C) forces miscategorization of genuine outliers. Continuously expanding the enum (D) is reactive and unmaintainable.

---

## Question 88 (Scenario: Structured Data Extraction)

**Situation:** Extracted output is schema-valid, but line-item amounts sometimes don't sum to the stated invoice total—an error the JSON schema cannot catch.

**What is the most effective safeguard?**

- A) Add semantic validation (e.g., Pydantic checks) and feed failures back to the model in a retry loop. **[CORRECT]**
- B) Tighten the JSON schema with more field types.
- C) Lower the temperature to reduce arithmetic mistakes.
- D) Accept the output since it is schema-valid.

**Why A:** Schema validation checks shape and types, not cross-field business rules; a semantic validator catches the sum mismatch, and a retry-with-feedback loop lets the model correct itself. More field types (B) still can't express "items must sum to total." Temperature (C) doesn't guarantee arithmetic consistency. Accepting schema-valid-but-wrong data (D) ships the error.

---

## Question 89 (Scenario: Structured Data Extraction)

**Situation:** You must extract fields from 50,000 archived documents. The job is a one-time backfill with no latency requirement, and cost matters.

**Which mechanism fits best?**

- A) Submit the work through the Message Batches API. **[CORRECT]**
- B) Send 50,000 individual synchronous requests as fast as possible.
- C) Concatenate all documents into one request.
- D) Process them interactively, one at a time, by hand.

**Why A:** The Message Batches API is built for large, non-latency-sensitive volume and runs at roughly half the cost—ideal for a one-time backfill. Firing 50,000 synchronous requests (B) is costlier and pressures rate limits. Concatenating everything (C) blows past the context window and entangles documents. Manual processing (D) doesn't scale.

---

## Question 90 (Scenario: Structured Data Extraction)

**Situation:** Downstream code requires that the model's tool input conform *exactly* to the schema—no missing required keys, no extra properties—every time.

**Which option provides the strongest guarantee?**

- A) Enable strict mode on the tool so inputs are validated against the schema at generation time. **[CORRECT]**
- B) Add "follow the schema exactly" to the system prompt.
- C) Validate after the fact and discard non-conforming results.
- D) Provide a few-shot example of a correct payload.

**Why A:** Strict tool use enforces the schema as the model generates the tool input, guaranteeing conformant payloads. A prompt instruction (B) is advisory, not guaranteed. Post-hoc discard (C) wastes calls and still needs a fallback. A few-shot example (D) nudges format but provides no guarantee.

---

## Question 91 (Scenario: Structured Data Extraction)

**Situation:** A scanned contract is too degraded to determine the effective date with confidence, yet the schema lists `effective_date` as required.

**What is the most responsible behavior?**

- A) Return null (or a flag) for the field with low confidence so it can be routed for human review. **[CORRECT]**
- B) Output the most plausible date to satisfy the required field.
- C) Skip the document silently.
- D) Halt the entire batch until a human intervenes.

**Why A:** Surfacing "unknown" with low confidence lets a human resolve the genuinely ambiguous case without corrupting the dataset (which is also why the field should be nullable). Emitting a plausible guess (B) injects silent errors. Skipping silently (C) loses the record with no trace. Halting the whole batch (D) blocks thousands of good extractions for one bad scan.

---

## Question 92 (Scenario: Structured Data Extraction)

**Situation:** Before trusting the pipeline, you need to know how accurate extraction is per field and set confidence thresholds for auto-accept vs. human review.

**Which approach gives a trustworthy measure?**

- A) Score per-field confidence and calibrate it against a labeled set, sampling documents in a stratified way across types. **[CORRECT]**
- B) Use one overall confidence score for the whole document.
- C) Trust the model's self-reported confidence without checking it.
- D) Spot-check a handful of easy documents.

**Why A:** Field-level scoring calibrated on labeled data shows where the pipeline is reliable, and stratified sampling ensures every document type is represented—so thresholds reflect real accuracy. A single document-level score (B) hides which fields fail. Uncalibrated self-reported confidence (C) may not match reality. Spot-checking easy cases (D) yields a biased, optimistic estimate.

---

## Scenario: Agentic AI Tools

---

## Question 93 (Scenario: Agentic AI Tools)

**Situation:** An agent must be able to issue refunds. Refunds are irreversible and must be gated by a confirmation/permission step before they execute.

**How should this capability be exposed?**

- A) As a dedicated `process_refund` tool the harness can gate, validate, and require confirmation for. **[CORRECT]**
- B) As a general `bash` capability the model composes (e.g., a `curl` to the refund endpoint).
- C) By instructing the model in the system prompt to always ask before refunding.
- D) By trusting the model to refund only when appropriate.

**Why A:** A dedicated tool gives the harness a typed, interceptable hook where it can enforce confirmation and permissions before a destructive, irreversible action—control the prompt alone cannot guarantee. A generic `bash` capability (B) is an opaque command string the harness can't reliably gate. A system-prompt instruction (C) and pure trust (D) are not enforcement; the model can still act without the gate.

---

## Question 94 (Scenario: Agentic AI Tools)

**Situation:** An agent frequently calls `get_customer` when it should call `lookup_order`. The two tools have terse, similar descriptions.

**What should you try first?**

- A) Rewrite the tool descriptions so each clearly states when to use it and how it differs from the other. **[CORRECT]**
- B) Add a routing classifier model in front of the agent.
- C) Remove one of the tools.
- D) Force `tool_choice` to `lookup_order` for all requests.

**Why A:** The model selects tools largely from their descriptions, so disambiguating the descriptions targets the root cause at the lowest cost. A separate classifier (B) adds latency and infrastructure for a problem solvable in text. Removing a tool (C) loses needed capability. Forcing `lookup_order` everywhere (D) breaks the legitimate cases that need `get_customer`.

---

## Question 95 (Scenario: Agentic AI Tools)

**Situation:** You are writing the loop that decides when an agent's turn is complete after tool calls.

**What is the correct termination signal?**

- A) Continue while `stop_reason` is `tool_use`, and stop when it is `end_turn`. **[CORRECT]**
- B) Stop after a fixed number of iterations regardless of state.
- C) Parse the assistant's text for phrases like "I'm done."
- D) Stop as soon as any tool returns a result.

**Why A:** `stop_reason` is the API's explicit, reliable signal: `tool_use` means run the tool and continue; `end_turn` means the model is finished. A fixed iteration cap (B) either cuts off legitimate work or loops needlessly. Parsing text for "done" (C) is fragile and easily wrong. Stopping after the first tool result (D) ends multi-step tasks prematurely.

---

## Question 96 (Scenario: Agentic AI Tools)

**Situation:** To answer a request, the agent needs three independent lookups (customer, order, inventory) that don't depend on one another's results.

**What is the most efficient pattern?**

- A) Issue the three tool calls in parallel in one turn and return all three results together in the next user message. **[CORRECT]**
- B) Call them strictly one at a time across three turns.
- C) Combine all three into a single overloaded tool.
- D) Ask the user to choose which lookup matters most.

**Why A:** Independent calls can run in parallel within one assistant turn, and returning all `tool_result` blocks together in a single user message is the supported pattern—minimizing round-trips. Sequential calls (B) waste turns for work with no dependencies. One overloaded tool (C) muddies responsibilities and schemas. Asking the user to pick (D) discards needed information.

---

## Question 97 (Scenario: Agentic AI Tools)

**Situation:** A `get_account` tool returns 40+ fields, but the agent only ever needs five. Over a long session, the unused fields pile up and crowd the context window.

**What is the best fix?**

- A) Change the tool to return only the fields the agent needs. **[CORRECT]**
- B) Increase the context window by switching to a larger model.
- C) Tell the model to ignore the extra fields.
- D) Summarize the whole conversation more often.

**Why A:** Trimming the tool's output at the source removes the wasted tokens on every call—fixing the root cause. A bigger context window (B) just delays the same accumulation at higher cost. Telling the model to ignore fields (C) still pays to carry them in context. More frequent summarization (D) treats the symptom and risks dropping detail.

---

## Question 98 (Scenario: Agentic AI Tools)

**Situation:** A tool wraps a flaky external API. Sometimes it times out (worth a retry); sometimes it returns a permanent "not found" (not worth retrying). Right now every failure looks identical to the model.

**How should tool errors be propagated?**

- A) Return structured errors with a category and a retryable flag so the model retries transient failures and escalates permanent ones. **[CORRECT]**
- B) Return a generic "error" string for every failure.
- C) Silently return empty results on any failure.
- D) Discard the tool call and end the turn.

**Why A:** Distinguishing transient from permanent failures—via a category and a retryable flag—lets the model make the right recovery decision per case. A generic error (B) erases that distinction. Silent empties (C) hide failures and mislead the model into thinking the call succeeded. Ending the turn (D) abandons recoverable work.

---

## Question 99 (Scenario: Agentic AI Tools)

**Situation:** For a specific workflow step, the agent must call the `validate_address` tool before proceeding—skipping it is not acceptable.

**Which mechanism enforces this?**

- A) Set `tool_choice` to force the `validate_address` tool for that request. **[CORRECT]**
- B) Add "always validate the address" to the system prompt and hope it complies.
- C) Lower the temperature so the model is more obedient.
- D) Remove every other tool for the whole session.

**Why A:** `tool_choice` can require a specific tool, guaranteeing the call happens for that step. A prompt instruction (B) is not a guarantee. Temperature (C) doesn't control tool selection. Removing all other tools for the entire session (D) is a blunt, over-broad change that breaks every other step.

---

## Question 100 (Scenario: Agentic AI Tools)

**Situation:** A support agent reaches a case with no matching policy and has already failed to make progress after several attempts.

**What is the correct behavior?**

- A) Invoke `escalate_to_human` with the gathered context so a person can take over. **[CORRECT]**
- B) Keep retrying the same tools until something works.
- C) Make a best-guess decision and act on it.
- D) End the conversation without resolution or handoff.

**Why A:** Escalation with accumulated context is the designed path when the agent faces a policy gap or can't make progress—handing a person the work already done. Endless retries (B) waste resources and frustrate the user. Acting on a guess (C) risks a wrong, possibly irreversible decision. Ending with no handoff (D) abandons the user.

---

# Practical Exercises

## Exercise 1: Multi-tool Agent with Escalation Logic

**Goal:** Design an agent loop with tool integration, structured error handling, and escalation.

**Steps:**
1. Define 3–4 MCP tools with detailed descriptions (include two similar tools to test tool selection)
2. Implement an agent loop checking `stop_reason` (`"tool_use"` / `"end_turn"`)
3. Add structured error responses: `errorCategory`, `isRetryable`, description
4. Implement an interceptor hook that blocks operations above a threshold and routes to escalation
5. Test with multi-aspect requests

**Domains:** 1 (Agent architecture), 2 (Tools and MCP), 5 (Context and reliability)

---

## Exercise 2: Configuring Claude Code for Team Development

**Goal:** Configure CLAUDE.md, custom commands, path-specific rules, and MCP servers.

**Steps:**
1. Create a project-level CLAUDE.md with universal standards
2. Create `.claude/rules/` files with YAML frontmatter for different code areas (`paths: ["src/api/**/*"]`, `paths: ["**/*.test.*"]`)
3. Create a project skill under `.claude/skills/` with `context: fork` and `allowed-tools`
4. Configure an MCP server in `.mcp.json` with environment variables + a personal override in `~/.claude.json`
5. Test planning mode vs direct execution on tasks of different complexity

**Domains:** 3 (Claude Code configuration), 2 (Tools and MCP)

---

## Exercise 3: Structured Data Extraction Pipeline

**Goal:** JSON schemas, `tool_use` for structured output, validation/retry loops, batch processing.

**Steps:**
1. Define an extraction tool with a JSON schema (required/optional fields, enums with "other", nullable fields)
2. Build a validation loop: on error, retry with the document, the incorrect extraction, and the specific validation error
3. Add few-shot examples for documents with different structures
4. Use batch processing via the Message Batches API: 100 documents, handle failures via `custom_id`
5. Route to humans: field-level confidence scores, document-type analysis

**Domains:** 4 (Prompt engineering), 5 (Context and reliability)

---

## Exercise 4: Designing and Debugging a Multi-agent Research Pipeline

**Goal:** Subagent orchestration, context passing, error propagation, synthesis with source tracking.

**Steps:**
1. A coordinator with 2+ subagents (`allowedTools` includes `"Task"`, context is passed explicitly in prompts)
2. Run subagents in parallel via multiple `Task` calls in a single response
3. Require structured subagent output: claim, quote, source URL, publication date
4. Simulate a subagent timeout: return structured error context to the coordinator and continue with partial results
5. Test with conflicting data: preserve both values with attribution; separate confirmed vs disputed findings

**Domains:** 1 (Agent architecture), 2 (Tools and MCP), 5 (Context and reliability)

---

# Appendix: Technologies and Concepts

| Technology | Key aspects |
|---|---|
| **Claude Agent SDK** | AgentDefinition, agent loops, `stop_reason`, hooks (PostToolUse), spawning subagents via Task, `allowedTools` |
| **Model Context Protocol (MCP)** | MCP servers, tools, resources, `isError`, tool descriptions, `.mcp.json`, environment variables |
| **Claude Code** | CLAUDE.md hierarchy, `.claude/rules/` with glob patterns, `.claude/commands/`, `.claude/skills/` with SKILL.md, planning mode, `/compact`, `--resume`, `fork_session` |
| **Claude Code CLI** | `-p` / `--print` for non-interactive mode, `--output-format json`, `--json-schema` |
| **Claude API** | `tool_use` with JSON schemas, `tool_choice` ("auto"/"any"/forced), `stop_reason`, `max_tokens`, system prompts |
| **Message Batches API** | 50% savings, up to 24-hour window, `custom_id`, no multi-turn tool calling |
| **JSON Schema** | Required vs optional, nullable fields, enum types, "other" + detail, strict mode |
| **Pydantic** | Schema validation, semantic errors, validation/retry loops |
| **Built-in tools** | Read, Write, Edit, Bash, Grep, Glob — purpose and selection criteria |
| **Few-shot prompting** | Targeted examples for ambiguous situations, generalization to new patterns |
| **Prompt chaining** | Sequential decomposition into focused passes |
| **Context window** | Token budgets, progressive summarization, "lost in the middle", scratchpad files |
| **Session management** | Resume, `fork_session`, named sessions, context isolation |
| **Confidence calibration** | Field-level scoring, calibration on labeled sets, stratified sampling |

---

# Out-of-Scope Topics

The following adjacent topics will **NOT** be on the exam:

- Fine-tuning Claude models or training custom models
- Claude API authentication, billing, or account management
- Detailed implementation in specific programming languages or frameworks (beyond what’s needed for tool/schema configuration)
- Deploying or hosting MCP servers (infrastructure, networking, container orchestration)
- Claude’s internal architecture, training process, or model weights
- Constitutional AI, RLHF, or safety training methodologies
- Embedding models or vector database implementation details
- Computer use (browser automation, desktop interaction)
- Image analysis capabilities (Vision)
- Streaming API or server-sent events
- Rate limiting, quotas, or detailed API cost calculations
- OAuth, API key rotation, or authentication protocol details
- Cloud-provider-specific configurations (AWS, GCP, Azure)
- Performance benchmarks or model comparison metrics
- Prompt caching implementation details (beyond knowing it exists)
- Token counting algorithms or tokenization specifics

---

# Preparation Recommendations

1. **Build an agent with the Claude Agent SDK** — implement a full agent loop with tool calling, error handling, and session management. Practice subagents and explicit context passing.

2. **Configure Claude Code for a real project** — use CLAUDE.md hierarchy, path-specific rules in `.claude/rules/`, skills with `context: fork` and `allowed-tools`, and MCP server integration.

3. **Design and test MCP tools** — write descriptions that differentiate similar tools, return structured errors with categories and retry flags, and test against ambiguous user requests.

4. **Build a data extraction pipeline** — use `tool_use` with JSON schemas, validation/retry loops, optional/nullable fields, and batch processing via the Message Batches API.

5. **Practice prompt engineering** — add few-shot examples for ambiguous scenarios, explicit review criteria, and multi-pass architectures for large code reviews.

6. **Study context management patterns** — extract facts from verbose outputs, use scratchpad files, and delegate discovery to subagents to handle context limits.

7. **Understand escalation and human-in-the-loop** — when to escalate (policy gaps, explicit user request, inability to make progress) and confidence-based routing workflows.

8. **Take a practice exam** before the real one. It uses the same scenarios and format.


# Appendix: The Complete Claude Application Map (2026)

> A panoramic reference to everything Claude can do and how it is used across the internet, current as of 2026. This appendix is **beyond the exam scope** — it exists to give you a complete mental model of the Claude platform that the certification sits inside. Pricing and model IDs change; always confirm against the official docs linked at the end.

---

## 1. The Claude Model Family

All current models share a 1M-token context window except Haiku. Prices are USD per **million tokens (MTok)**, standard tier; batch is 50% off and prompt-cache reads are ~0.1×.

| Model | Model ID | Context | Max output | Input $/MTok | Output $/MTok | Positioning |
|---|---|---|---|---|---|---|
| Claude Fable 5 | `claude-fable-5` | 1M | 128K | $10 | $50 | Most capable widely-released model; hardest reasoning + long-horizon agentic work. Thinking always on; safety classifiers may refuse. |
| Claude Mythos 5 | `claude-mythos-5` | 1M | 128K | $10 | $50 | Same as Fable 5; available **only** via Project Glasswing (security/defensive research program). |
| Claude Opus 4.8 | `claude-opus-4-8` | 1M | 128K | $5 | $25 | Flagship Opus — default for most demanding work; state-of-the-art autonomous agents, knowledge work, memory. |
| Claude Opus 4.7 | `claude-opus-4-7` | 1M | 128K | $5 | $25 | Previous-gen Opus; strong agentic + vision + memory. |
| Claude Opus 4.6 | `claude-opus-4-6` | 1M | 128K | $5 | $25 | Older Opus; adaptive thinking, 128K output. |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | 1M | 128K | $3 | $15 | Best speed/intelligence balance for high-volume production. |
| Claude Haiku 4.5 | `claude-haiku-4-5` | 200K | 64K | $1 | $5 | Fastest, cheapest; simple/latency-sensitive tasks and cheap subagents. |

- **Use exact IDs, never date-suffixed variants** (e.g. `claude-opus-4-8`, not `claude-opus-4-8-20xxxxxx`). Source: [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview), [Pricing](https://platform.claude.com/docs/en/pricing).
- **Live discovery:** the Models API returns context window (`max_input_tokens`), output cap (`max_tokens`), and a `capabilities` tree per model — `GET /v1/models/{id}`.
- **Thinking & effort differ by tier:** Fable 5 / Opus 4.8 / 4.7 reject `budget_tokens` — use `thinking: {type:"adaptive"}` + `output_config.effort` (`low`→`max`, plus `xhigh` on 4.7/4.8). Legacy models still use `budget_tokens`.

---

## 2. Ways to Use Claude

### 2a. The Claude apps (web · desktop · mobile)

The consumer/prosumer product at [claude.ai](https://claude.ai) (plus native macOS/Windows desktop and iOS/Android apps). Key features:

| Feature | What it does |
|---|---|
| **Projects** | Persistent workspaces with shared knowledge, custom instructions, and chat history scoped to a body of work. |
| **Artifacts** | Live side-panel for generated content (code, docs, diagrams, **runnable mini-apps/React**) that can be iterated on and shared/published. |
| **Files** | Upload PDFs, spreadsheets, images, code; Claude reads and analyzes them in-conversation. |
| **Memory** | Claude remembers context and preferences across conversations (per-project memory). |
| **Web Search** | Live web results with citations, surfaced inline in answers. |
| **Connectors** | MCP-based integrations to external apps/data (Google Drive, GitHub, Notion, Box, Slack, and the broader [Connectors directory](https://claude.com/connectors)). |
| **Skills** | On-demand task expertise (e.g. xlsx/pptx/docx/pdf authoring) loaded when relevant. |
| **Code execution / Analysis** | Sandboxed Python for data analysis, chart generation, file creation. |

Editions: Free, Pro, Max, **Team**, and **Enterprise** (SSO, audit, expanded context, admin controls). Vertical offerings: **[Claude for Education](https://www.anthropic.com/news/introducing-claude-for-education)** (Socratic "Learning mode", Canvas LMS), **[Claude for Life Sciences](https://www.anthropic.com/news/claude-for-life-sciences)** (Benchling/PubMed/10x connectors).

### 2b. Claude in the browser

The **Claude extension for Chrome** lets Claude see and act inside the browser tab — read pages, fill forms, click, and complete multi-step web tasks as an agent (a research-preview "agentic browsing" capability, rolling out to higher tiers). It is the consumer-facing relative of the API's **computer use** tool. See [anthropic.com/claude-in-chrome](https://www.anthropic.com/news/claude-for-chrome).

### 2c. Claude Code

Anthropic's agentic coding tool — runs in the terminal, IDEs, and the cloud; natively powered by Claude. [Repo](https://github.com/anthropics/claude-code) · [Docs](https://code.claude.com/docs).

**Surfaces**
- **Terminal CLI** (`claude`) — the primary surface.
- **IDE extensions** — VS Code, JetBrains; plus third-party hosting via ACP (Zed, JetBrains) and Agent HQ (VS Code).
- **Cloud / async agents** and the **GitHub action** for CI and background tasks.
- **Web/mobile** session surfaces for kicking off and reviewing runs.

**Key feature groups**
| Group | Highlights |
|---|---|
| **Project memory** | `CLAUDE.md` hierarchy, `@path` imports, `.claude/rules/`. |
| **Extensibility** | Custom **slash commands**, **Skills** (`.claude/skills/`), **subagents**, **hooks** (PreToolUse/PostToolUse, etc.), **plugins**. |
| **Tools** | Built-ins: Read, Write, Edit, Bash, Grep, Glob, WebFetch/WebSearch; plus **MCP servers** and **connectors**. |
| **Workflow** | Planning mode, `/compact`, `/memory`, `/goal`, session fork/resume, permission gating, todo tracking. |
| **Config** | `settings.json` (permissions, env, hooks), effort/model selection, MCP config. |

### 2d. Developer Platform / API

Everything runs through one endpoint: **`POST /v1/messages`**. Tools and output constraints are features of this one endpoint, not separate APIs. [Platform docs](https://platform.claude.com/docs) · [Console](https://console.anthropic.com).

- **SDKs:** Python, TypeScript, Java, Go, Ruby, C#, PHP (+ `ant` CLI). Supporting endpoints: **Batches**, **Files**, **Token Counting**, **Models**, **Skills**.
- **Surfaces by tier:** single LLM call → workflow (API + tool use) → custom agent (your loop) → **Managed Agents** (Anthropic runs the loop + hosts the sandbox). See §4.

### 2e. Cloud providers (parity notes)

| Provider | Model IDs | Notes |
|---|---|---|
| **[Claude Platform on AWS](https://docs.aws.amazon.com/claude-platform/latest/userguide/welcome.html)** | bare (`claude-opus-4-8`) | Anthropic-operated; **same-day first-party parity**, AWS IAM + Marketplace billing, SigV4. |
| **[Amazon Bedrock](https://aws.amazon.com/bedrock/anthropic/)** | `anthropic.`-prefixed | AWS-operated; feature subset; FedRAMP High / DoD IL4-5. No batches, web fetch, code execution, Managed Agents, Files API. |
| **[Google Vertex AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude)** | bare ID (`@`-versioned snapshots) | GCP IAM/billing. Web search basic-only; no web fetch/code execution/batches/Files/Managed Agents. |
| **[Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-claude)** | bare | Most features in **beta**; usable as Foundry Agent Service reasoning core with MCP. |

> **Parity rule of thumb:** First-party API and Claude Platform on AWS are full-surface. Bedrock/Vertex are model-inference + tool-use (build agents with your own loop). Foundry mirrors much of the surface in beta. The single source of truth is the [platform availability table](https://platform.claude.com/docs).

---

## 3. Core Capabilities

| Capability | Summary | Docs |
|---|---|---|
| **Long context (1M)** | Up to 1M input tokens (200K on Haiku) at standard pricing — whole codebases, long document sets, multi-agent transcripts. | [context-windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) |
| **Vision & PDF** | Images (base64/URL/file) and PDFs (32MB/≤600 pages) natively; high-resolution vision (to 2576px long edge) on Opus 4.7+. | [vision](https://platform.claude.com/docs/en/build-with-claude/vision) · [pdf](https://platform.claude.com/docs/en/build-with-claude/pdf-support) |
| **Adaptive thinking + effort** | `thinking:{type:"adaptive"}` lets Claude decide depth and interleave thinking with tool calls; `output_config.effort` (`low`→`max`, `xhigh`) trades quality vs cost. | [adaptive-thinking](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking) · [effort](https://platform.claude.com/docs/en/build-with-claude/effort) |
| **Tool use** | User-defined tools (JSON schema), `tool_choice`, parallel calls, strict mode, the SDK **tool runner**, and programmatic tool calling (Claude calls tools from inside code execution). | [tool-use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) |
| **Server tools** | Anthropic-hosted, no client loop: **web search** / **web fetch** (`_20260209`, with dynamic filtering), **code execution**, **tool search** (BM25/regex), **advisor**. | [code-execution](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool) |
| **Structured outputs** | `output_config.format` (JSON schema) and `strict:true` tools guarantee parseable output; `messages.parse()` validates automatically. | [structured-outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) |
| **Prompt caching** | Prefix-match cache; reads ~0.1×, writes 1.25× (5m) / 2× (1h). Auto or manual breakpoints (max 4). Pre-warm with `max_tokens:0`. | [prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) |
| **Batches** | Async at **50% cost**; up to 100K requests/batch; results within ~1h (max 24h). Key by `custom_id` (unordered). | [batch-processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) |
| **Citations** | Per-document `citations:{enabled:true}` yields cited spans with char/page locations (incompatible with structured outputs). | [citations](https://platform.claude.com/docs/en/build-with-claude/citations) |
| **Skills** | Folder-based (`SKILL.md`) task expertise with progressive disclosure; pre-built (xlsx/docx/pptx/pdf) + custom via Skills API. | [skills](https://platform.claude.com/docs/en/agents-and-tools/skills) |
| **Context management** | **Compaction** (summarize near limit) and **context editing** (clear stale tool results/thinking) for long runs. | [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) |
| **Memory tool** | `memory_20250818` — Claude reads/writes a `/memories` directory persisting across sessions (you own the backend). | [memory-tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) |

---

## 4. Building Agents

Three ways to build, in increasing hand-off to Anthropic:

### Custom agents (Claude API + tool use)
You host the compute and run the loop (or use the SDK **tool runner**). Maximum flexibility; right when you need your own runtime, approval gates, or custom logging. See [agent-design](https://platform.claude.com/docs/en/agents-and-tools).

### Managed Agents (Anthropic runs the loop + hosts the sandbox)
Server-managed stateful agents. **Mandatory flow: Agent (once) → Session (every run).** [Managed Agents docs](https://platform.claude.com/docs/en/managed-agents/overview).

| Concept | Role |
|---|---|
| **Agent** (`/v1/agents`) | Persisted, **versioned** config: model, system prompt, tools, MCP servers, skills. Create once, reference by ID. |
| **Session** (`/v1/sessions`) | A stateful run referencing an agent + environment; produces an SSE **event stream**. |
| **Environment** (`/v1/environments`) | Template for the **container** (cloud or self-hosted, networking policy). |
| **Container** | Isolated workspace where tools execute (bash, file ops, code). The loop runs on Anthropic's orchestration layer. |

Extras: **vaults** (MCP/secret credentials, substituted at egress), **memory stores** (cross-session persistence), **outcomes** (rubric-graded iterate→grade loop), **multiagent** coordinator/threads, **scheduled deployments** (cron), **webhooks**.

### Agent SDK
The **[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)** (Python + TypeScript; formerly the Claude Code SDK) exposes the same agent loop, tool execution, context management, subagents, hooks, and Skills system that power Claude Code — for building your own autonomous Claude agents.

### MCP — the Model Context Protocol
Open standard for connecting models to tools/data. [modelcontextprotocol.io](https://modelcontextprotocol.io).

| Form | What it is |
|---|---|
| **Connectors** | Vetted, OAuth-based MCP integrations in the Claude apps ([directory](https://claude.com/connectors)). |
| **MCP servers** | Programs exposing tools/resources/prompts (local stdio or remote Streamable-HTTP). |
| **MCP connector (API)** | `mcp_servers` + `mcp_toolset` let the Messages API call a remote server directly (beta). |
| **Tunnels / remote** | Hosted remote servers (e.g. `mcp.stripe.com`, `mcp.linear.app`) reachable over HTTP with OAuth. |

---

## 5. The Claude Ecosystem Across the Internet

### 5a. Third-party coding tools

| Tool | Category | Claude usage |
|---|---|---|
| [Cursor](https://docs.cursor.com/models) | AI code editor | Sonnet/Opus selectable for agent chat, edits, completion. |
| [Windsurf](https://windsurf.com/changelog) | Agentic IDE | Cascade agent runs Sonnet/Opus (BYO key). |
| [GitHub Copilot](https://docs.github.com/copilot) | IDE assistant | Claude Sonnet/Opus in the model picker. |
| [VS Code (Agent HQ)](https://code.visualstudio.com/docs/copilot/agents/third-party-agents) | Editor | Hosts the official Claude Agent SDK harness. |
| [Zed](https://zed.dev/blog/claude-code-via-acp) · [JetBrains](https://blog.jetbrains.com/ai/2025/09/introducing-claude-agent-in-jetbrains-ides/) | Editors/IDEs | Native Claude + Claude Code via Agent Client Protocol (ACP). |
| [Cline](https://docs.cline.bot) · [Roo Code](https://github.com/RooCodeInc/Roo-Code) · [Kilo Code](https://kilo.ai/docs/ai-providers/anthropic) | OSS VS Code agents | Autonomous multi-file editing on your Anthropic key. |
| [Sourcegraph Cody](https://sourcegraph.com/changelog/claude-4-models-available-in-cody) · [Continue](https://docs.continue.dev) · [Tabnine](https://www.tabnine.com/blog/claude-3-7-is-now-available-in-tabnine/) · [Augment](https://www.augmentcode.com/changelog/claude-sonnet-4-5-is-now-available-as-the-default-model-in-augment-code) | Codebase-aware assistants | Claude as selectable/default LLM. |
| [Aider](https://aider.chat/docs/llms/anthropic.html) · [Warp](https://docs.warp.dev/agent-platform/cli-agents/claude-code) | Terminal | CLI pair-programming / hosts Claude Code. |
| [Replit](https://claude.com/customers/replit) · [Bolt.new](https://bolt.new/blog/we-ve-partnered-with-anthropic-to-bring-claude-sonnet-4-to-all-bolt-users) · [Devin](https://claude.com/customers/cognition) | App builders / autonomous SWE | Full-app generation and long-horizon PRs on Claude. |

### 5b. Other apps using Claude

- **Productivity:** [Notion](https://claude.com/customers/notion), [Slack](https://slack.com/marketplace/A08SF47R6P4-claude), [Raycast](https://www.raycast.com/core-features/ai/models), [Asana](https://claude.com/customers/asana), [Box](https://www.techbuzz.ai/articles/anthropic-brings-interactive-workplace-apps-to-claude).
- **Search / answer engines:** [Perplexity](https://www.perplexity.ai/help-center/en/articles/10354919), [Quora Poe](https://poe.com/anthropic), [DuckDuckGo Duck.ai](https://duckduckgo.com/duckduckgo-help-pages/duckai/chat-models).
- **Browsers:** [Brave Leo](https://support.brave.app/hc/en-us/articles/26727364100493), Perplexity Comet.
- **Design / content:** [Canva](https://www.canva.com/newsroom/news/canva-claude-design/).
- **Customer support:** [Intercom Fin](https://www.intercom.com/blog/fin-2-powered-by-anthropic-claude-llm/), [Zendesk](https://support.zendesk.com/hc/en-us/articles/10630133525018).
- **Data / voice:** [Snowflake Cortex](https://www.snowflake.com/en/news/press-releases/snowflake-and-anthropic-announce-200-million-partnership-to-bring-agentic-ai-to-global-enterprises/), [Amazon Alexa+](https://www.anthropic.com/news/claude-and-alexa-plus).

### 5c. The MCP server ecosystem

- **Registries/directories:** [Official MCP Registry](https://registry.modelcontextprotocol.io/), [reference servers monorepo](https://github.com/modelcontextprotocol/servers), [GitHub MCP Registry](https://github.com/mcp), [Anthropic Connectors](https://claude.com/connectors), community [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers).
- **Reference servers** (active): Filesystem, Git, Fetch, Memory, Sequential Thinking, Time, Everything.
- **Official third-party:** [GitHub](https://github.com/github/github-mcp-server), [Stripe](https://github.com/stripe/agent-toolkit), [Cloudflare](https://github.com/cloudflare/mcp-server-cloudflare), [Sentry](https://github.com/getsentry/sentry-mcp), [Playwright (Microsoft)](https://github.com/microsoft/playwright-mcp), [Notion](https://github.com/makenotion/notion-mcp-server), [Atlassian](https://github.com/atlassian/atlassian-mcp-server), [Linear](https://linear.app/docs/mcp), [Postgres MCP Pro](https://github.com/crystaldba/postgres-mcp).
- **Archived references** (superseded): Slack, Google Drive, PostgreSQL (read-only), Puppeteer (→ Playwright), GitLab, SQLite.

### 5d. Agent frameworks

| Framework | Language | Claude integration |
|---|---|---|
| [LangChain](https://docs.langchain.com/oss/python/integrations/chat/anthropic) | Py/TS | `ChatAnthropic` — tools, streaming, adaptive thinking, caching, built-in tools. |
| [LlamaIndex](https://docs.llamaindex.ai/en/stable/examples/llm/anthropic/) | Py | RAG/agents, structured output, citations, token counting. |
| [CrewAI](https://github.com/crewAIInc/crewAI) · [AutoGen](https://microsoft.github.io/autogen/stable//reference/python/autogen_ext.models.anthropic.html) · [AG2](https://docs.ag2.ai/latest/docs/user-guide/models/anthropic/) | Py | Multi-agent orchestration on Claude. |
| [Pydantic AI](https://ai.pydantic.dev/models/anthropic/) | Py | Typed agents; built-in web search, thinking, MCP. |
| [Vercel AI SDK](https://www.npmjs.com/package/@ai-sdk/anthropic) · [Mastra](https://mastra.ai/models/providers/anthropic) | TS | Unified interface + Agent abstraction; Mastra wraps the Agent SDK. |
| [Strands](https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/) · [Google ADK](https://google.github.io/adk-docs/agents/models/anthropic/) | Py/TS/Java/Go | Model-driven SDKs with Claude (direct + Bedrock/Vertex). |
| **[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)** | Py/TS | Official — the Claude Code engine as a library. |

### 5e. Industry use cases

**Software engineering:** [Cursor](https://www.anthropic.com/news/claude-4), [Sourcegraph](https://claude.com/customers/sourcegraph), [Replit](https://www.anthropic.com/news/claude-4) — agentic coding on Claude.

**Cybersecurity** (its own subsection given the security-architect audience):

| Org | Use |
|---|---|
| [eSentire](https://aws.amazon.com/solutions/case-studies/esentire-anthropic/) | SOC threat investigation on Claude (Bedrock) — ~95% senior-analyst alignment across 1,000 investigations; days→minutes. |
| [Anthropic Threat Intel](https://www.anthropic.com/news/disrupting-AI-espionage) | Detected/disrupted the first reported AI-orchestrated cyber-espionage campaign (GTG-1002). |
| [Project Glasswing](https://www.anthropic.com/news/claude-code-security) (CrowdStrike, AWS, Google, Microsoft, NVIDIA) | Defensive AI scanner reasoning over code to find and patch vulnerabilities; hardens critical codebases. |
| HackerOne | Hai agents on Sonnet 4.5 — vuln-intake time −44%, accuracy +25%. |
| [Snyk](https://snyk.io/articles/anthropic-launches-claude-code-security/) | Claude in its AI Security Platform across code, deps, containers, AI artifacts. |

> **Note:** Claude's safety classifiers (notably on Fable 5) target offensive cyber and bio content and may **refuse** requests. Legitimate defensive security work can trip false positives — architects should plan refusal handling (server-side `fallbacks` / fallback credit to Opus 4.8) and run security tooling on Opus-tier models.

**Other verticals:** Legal — [Harvey](https://claude.com/customers/harvey), [Robin AI](https://www.anthropic.com/news/claude-4). Healthcare/Life-sciences — [Commure](https://www.anthropic.com/news/healthcare-life-sciences), [Banner Health](https://www.anthropic.com/news/healthcare-life-sciences), [Sanofi](https://www.anthropic.com/news/claude-for-life-sciences). Finance — [NBIM](https://claude.com/customers/nbim), [Bridgewater](https://www.anthropic.com/news/claude-4). Customer service — [Intercom](https://claude.com/customers/intercom). Education — [Claude for Education](https://www.anthropic.com/news/introducing-claude-for-education). Content — [Canva](https://claude.com/customers/canva).

---

## 6. Official Documentation & Where to Go Deeper

| Topic | Link |
|---|---|
| Platform docs (API, build-with-claude, agents-and-tools) | https://platform.claude.com/docs |
| Models overview & pricing | https://platform.claude.com/docs/en/about-claude/models/overview · https://platform.claude.com/docs/en/pricing |
| Claude Code | https://code.claude.com/docs · https://github.com/anthropics/claude-code |
| Claude Agent SDK | https://code.claude.com/docs/en/agent-sdk/overview |
| Managed Agents | https://platform.claude.com/docs/en/managed-agents/overview |
| Model Context Protocol | https://modelcontextprotocol.io · https://registry.modelcontextprotocol.io |
| Connectors directory | https://claude.com/connectors |
| Console (keys, usage, workspaces) | https://console.anthropic.com |
| Customer stories | https://claude.com/customers |
| News & research | https://www.anthropic.com/news |
| Status | https://status.anthropic.com |
