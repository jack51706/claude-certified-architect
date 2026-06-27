#!/usr/bin/env python3
"""Extract Practice Test questions from a guide_<lang> Markdown file as JSON.

Usage:
    python3 extract_question.py <lang> [scenario|all]

  <lang>     language code, e.g. en, zh-tw, zh, ja, ru, it, ko
  scenario   optional; "all" (default) or a case-insensitive scenario-name
             substring to filter by.

Consumed by utils/build_practical_test_html.py, which calls this script and
json.loads() its stdout. Each emitted question is:

    {
      "scenario":    str,
      "global_n":    int,          # sequential 1..N over the emitted questions
      "situation":   str,          # without the "**Situation:**" label
      "question":    str,          # the bold prompt, without the ** wrapper
      "options":     [ {"letter": "A", "text": str, "correct": bool}, ... ],
      "correct":     "A" | "B" | ...,   # the correct option's letter
      "explanation": str           # without the "**Why X:**" label
    }

Only the Practice Test section is emitted. The example/explanation section that
precedes it is skipped. The boundary is detected language-agnostically: the
practice questions are those following the last point where the question number
in the headings resets to 1.

The parser is deliberately label-agnostic so it works across every translation:
  * Question headings are matched by "<#...> <number> (<scenario>)" with either
    half-width "()" / ":" or full-width "（）" / "：".
  * The situation and explanation are the bold-label paragraphs before/after the
    options; the prompt is the fully-bold line in between.
  * A correct option is any option whose text contains a bold bracketed marker
    such as **[CORRECT]**, **[正解]**, **[正確]**, etc.
"""
import json
import os
import re
import sys

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

# "## Question 12 (Scenario: Multi-agent Research System)"
# "## 問題 12（情境：多代理研究系統）"  (full-width variants)
HEADER_RE = re.compile(r"^#{1,6}\s+\D*?(\d+)\s*[(（]\s*(.+?)\s*[)）]\s*$")
OPTION_RE = re.compile(r"^[-*]\s*([A-Za-z])\)\s*(.*)$")
BOLD_RE = re.compile(r"^\*\*([^*]+?)\*\*\s*(.*)$")
CORRECT_RE = re.compile(r"\s*\*\*\[[^\]]+\]\*\*\s*")  # **[CORRECT]** / **[正解]** / ...


def find_guide(lang):
    """Resolve guide_<lang>.md / .MD case-insensitively in the repo root."""
    target = "guide_{}".format(lang).lower()
    for name in os.listdir(ROOT_DIR):
        base, ext = os.path.splitext(name)
        if base.lower() == target and ext.lower() == ".md":
            return os.path.join(ROOT_DIR, name)
    raise FileNotFoundError(
        "No guide file for lang '{}' (looked for guide_{}.md/.MD in {})".format(
            lang, lang, ROOT_DIR
        )
    )


def scenario_from_header(inner):
    """Take the scenario name from the text inside a heading's parentheses."""
    parts = re.split(r"[:：]", inner, maxsplit=1)
    return (parts[1] if len(parts) > 1 else parts[0]).strip()


def split_blocks(lines):
    """Yield (number, scenario, body_lines) for every question heading found."""
    i, n = 0, len(lines)
    while i < n:
        m = HEADER_RE.match(lines[i].rstrip())
        if m:
            number = int(m.group(1))
            scenario = scenario_from_header(m.group(2))
            j = i + 1
            body = []
            while j < n and not HEADER_RE.match(lines[j].rstrip()):
                body.append(lines[j])
                j += 1
            yield number, scenario, body
            i = j
        else:
            i += 1


def parse_block(body):
    situation = ""
    question = ""
    options = []
    explanation = ""
    in_options = False
    target = None  # "situation" | "explanation" for plain continuation lines

    for raw in body:
        line = raw.strip()
        if not line or line == "---" or line.startswith("#"):
            # blank, horizontal rule, or a stray heading (e.g. a scenario
            # divider that fell inside this block) — never part of the content.
            continue

        mo = OPTION_RE.match(line)
        if mo:
            text = mo.group(2)
            correct = bool(CORRECT_RE.search(text))
            text = CORRECT_RE.sub(" ", text).strip()
            options.append({"letter": mo.group(1).upper(), "text": text, "correct": correct})
            in_options = True
            target = None
            continue

        mb = BOLD_RE.match(line)
        if mb:
            trailing = mb.group(2).strip()
            if trailing == "":
                # a fully-bold line with no trailing text => the question prompt
                question = mb.group(1).strip()
                target = None
            elif not in_options:
                situation = trailing
                target = "situation"
            else:
                explanation = trailing
                target = "explanation"
            continue

        # plain continuation line for a multi-line situation/explanation
        if target == "situation":
            situation = (situation + " " + line).strip()
        elif target == "explanation":
            explanation = (explanation + " " + line).strip()

    correct_letter = next((o["letter"] for o in options if o["correct"]), "")
    return situation, question, options, correct_letter, explanation


def extract(lang, scenario_filter="all"):
    path = find_guide(lang)
    with open(path, encoding="utf-8") as f:
        lines = f.readlines()

    blocks = [
        b
        for b in split_blocks(lines)
        if sum(1 for ln in b[2] if OPTION_RE.match(ln.strip())) >= 2
    ]

    # Practice Test = questions from the last numbering reset (number == 1) on.
    resets = [idx for idx, (num, _, _) in enumerate(blocks) if num == 1]
    practice = blocks[resets[-1]:] if resets else blocks

    questions = []
    gn = 1
    for _number, scenario, body in practice:
        if scenario_filter not in ("all", "", None) and scenario_filter.lower() not in scenario.lower():
            continue
        situation, question, options, correct_letter, explanation = parse_block(body)
        questions.append(
            {
                "scenario": scenario,
                "global_n": gn,
                "situation": situation,
                "question": question,
                "options": options,
                "correct": correct_letter,
                "explanation": explanation,
            }
        )
        gn += 1
    return questions


def main():
    if len(sys.argv) < 2:
        sys.stderr.write("usage: extract_question.py <lang> [scenario|all]\n")
        sys.exit(2)
    lang = sys.argv[1]
    scenario_filter = sys.argv[2] if len(sys.argv) > 2 else "all"
    try:
        sys.stdout.reconfigure(encoding="utf-8")  # py3.7+: avoid Windows cp encoding errors
    except AttributeError:
        pass
    questions = extract(lang, scenario_filter)
    sys.stdout.write(json.dumps(questions, ensure_ascii=False))


if __name__ == "__main__":
    main()
