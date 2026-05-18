# Claude Certified Architect — תעודת Foundations

## מדריך לימוד (מבוסס על מדריך המבחן הרשמי)

---

## הקדמה

תעודת **Claude Certified Architect — Foundations** מאשרת שמומחה מסוגל לקבל החלטות מאוזנות (trade-off) בעת מימוש פתרונות אמיתיים מבוססי Claude. המבחן בוחן ידע יסודי ב-Claude Code, ב-Claude Agent SDK, ב-Claude API וב-Model Context Protocol (MCP) — הטכנולוגיות המרכזיות לבניית אפליקציות פרודקשן עם Claude.

שאלות המבחן מבוססות על תרחישי תעשייה ריאליסטיים: בניית מערכות סוכן (agentic) לתמיכת לקוחות, תכנון פייפליין מחקר רב-סוכני, אינטגרציה של Claude Code ב-CI/CD, יצירת כלי פרודוקטיביות למפתחים, וחילוץ נתונים מובנים ממסמכים לא-מובנים.

---

## הפרופיל המבוקש

המועמד האידיאלי הוא **ארכיטקט פתרונות (solution architect)** שמתכנן ומשגר אפליקציות פרודקשן עם Claude. רצויה לפחות חצי שנת ניסיון מעשי ב:

- **Claude Agent SDK** — אורקסטרציה רב-סוכנית, הענקת משימות לתת-סוכנים, אינטגרציית כלים, hooks של מחזור חיים
- **Claude Code** — CLAUDE.md, שרתי MCP, Agent Skills, מצב תכנון (planning mode)
- **Model Context Protocol (MCP)** — כלים ומשאבים לאינטגרציה אל ה-backend
- **הנדסת פרומפט** — JSON schemas, דוגמאות few-shot, תבניות לחילוץ נתונים
- **חלון הקשר (context window)** — עבודה עם מסמכים ארוכים, העברת הקשר רב-סוכני
- **פייפליין CI/CD** — code review אוטומטי, יצירת בדיקות
- **הסלמה ואמינות** — טיפול בשגיאות, human-in-the-loop

---

## פורמט המבחן

| פרמטר | ערך |
|---|---|
| סוג שאלה | בחירה מרובה (1 נכון מתוך 4) |
| ניקוד | סולם 100–1000, ציון עובר **720** |
| עונש על ניחוש | אין (תענו על כל שאלה!) |
| תרחישים | 4 מתוך 8 אפשריים (בחירה אקראית) |

---

## תוכן המבחן: 5 דומיינים

| דומיין | משקל |
|---|---|
| 1. ארכיטקטורת סוכנים ואורקסטרציה | **27%** |
| 2. עיצוב כלים ואינטגרציית MCP | **18%** |
| 3. הגדרות Claude Code וזרימות עבודה | **20%** |
| 4. הנדסת פרומפט ופלט מובנה | **20%** |
| 5. ניהול הקשר ואמינות | **15%** |

---

## תרחישי המבחן

### תרחיש 1: סוכן תמיכת לקוחות
אתם בונים סוכן שמטפל בהחזרות, מחלוקות חיוב ובעיות חשבון תוך שימוש ב-Claude Agent SDK. הסוכן משתמש בכלי MCP (`get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`). היעד הוא 80%+ פתרון במגע ראשון עם הסלמה מתאימה.

### תרחיש 2: יצירת קוד עם Claude Code
אתם משתמשים ב-Claude Code להאצת פיתוח: יצירת קוד, refactoring, debugging, תיעוד. צריך לשלב פקודות slash מותאמות אישית והגדרות CLAUDE.md, ולהבין מתי להשתמש במצב תכנון.

### תרחיש 3: מערכת מחקר רב-סוכנית
סוכן מתאם מאציל משימות לתת-סוכנים מתמחים: מחקר אינטרנטי, ניתוח מסמכים, סינתזה, ויצירת דוחות. המערכת חייבת להפיק דוחות מלאים עם ציטוטים.

### תרחיש 4: כלי פרודוקטיביות למפתחים
הסוכן עוזר למהנדסים לחקור codebase לא-מוכר, לייצר boilerplate ולאוטומט משימות שגרתיות. נעשה שימוש בכלים מובנים (Read, Write, Bash, Grep, Glob) ובשרתי MCP.

### תרחיש 5: Claude Code ל-Continuous Integration
שילוב Claude Code בפייפליין CI/CD ל-code review אוטומטי, יצירת בדיקות ופידבק על PR. הפרומפטים חייבים להיות מתוכננים למזער false positives.

### תרחיש 6: חילוץ נתונים מובנים
המערכת מחלצת מידע ממסמכים לא-מובנים, מאמתת פלט מול JSON schema ושומרת על דיוק גבוה. עליה לטפל נכון במקרי קצה.

### תרחיש 7: דפוסי ארכיטקטורת AI שיחתי
אתם מתכננים מערכות שיחה רב-תורניות שמכסות ניהול חלון הקשר, התמדה של הוראות בין תורים, אסטרטגיות זיכרון, עיצוב כלים לביצוע בטוח, וטיפול בקלט משתמש דו-משמעי או סותר.

### תרחיש 8: כלי AI סוכניים *(תוכן חסר — עזרו לנו להשלים!)*
תרחיש זה דווח על ידי נבחנים אך טרם כוסה במדריך. אם נתקלתם בשאלות מהתרחיש הזה במבחן האמיתי, שתפו ב-[GitHub Issues](https://github.com/paullarionov/claude-certified-architect/issues) כדי שנוסיף כיסוי מלא. התרומה שלכם תעזור לכל מי שמתכונן למבחן.

---

# תיעוד רשמי

| משאב | כתובת |
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

# חלק I: יסודות תיאורטיים

חלק זה מכסה את כל התיאוריה שצריך לעבור בהצלחה את המבחן. החומר מאורגן לפי טכנולוגיות ומושגים ולא לפי דומיינים — כך בונים הבנה עמוקה יותר של כל נושא.

---

# פרק 1: Claude API — יסודות אינטראקציה עם המודל

> תיעוד: [Messages API](https://platform.claude.com/docs/en/api/messages) | [Prompt Engineering](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)

## 1.1 מבנה בקשת API

ה-Claude API פועל על פי מודל בקשה–תגובה. כל בקשה ל-Claude Messages API כוללת:

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

**שדות מפתח:**
- `model` — בחירת מודל (`claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5`)
- `max_tokens` — מספר טוקנים מקסימלי בתגובה
- `system` — system prompt (מגדיר התנהגות המודל)
- `messages` — היסטוריית שיחה (**חובה לשלוח את ההיסטוריה המלאה** כדי לשמור על קוהרנטיות)
- `tools` — הגדרות הכלים הזמינים
- `tool_choice` — אסטרטגיית בחירת כלי

## 1.2 תפקידי הודעות (Message Roles)

מערך ה-`messages` משתמש בשלושה תפקידים:
- `user` — הודעות משתמש
- `assistant` — תגובות המודל (כלולות בשליחת היסטוריה)
- `tool` — תוצאות קריאה לכלי (התפקיד אינו מוגדר במפורש; זה מופיע כ-`tool_result` content block)

**חשוב במיוחד:** בכל בקשת API חייבים לשלוח את **כל היסטוריית השיחה**. המודל לא שומר state בין בקשות — כל קריאה עצמאית.

## 1.3 השדה `stop_reason` בתגובה

תגובת Claude API כוללת `stop_reason` שמציין מדוע המודל הפסיק לייצר:

| ערך | תיאור | פעולה |
|---|---|---|
| `"end_turn"` | המודל סיים את תגובתו | הציגו תוצאה למשתמש |
| `"tool_use"` | המודל רוצה לקרוא לכלי | הריצו את הכלי והחזירו תוצאה |
| `"max_tokens"` | הגעתם לגבול טוקנים | התגובה קטומה; ייתכן שצריך להגדיל גבול |
| `"stop_sequence"` | נתקלתם ב-stop sequence | טפלו לפי לוגיקת האפליקציה |

במערכות סוכן `"tool_use"` ו-`"end_turn"` הם החשובים ביותר — הם שולטים בלולאת הסוכן.

## 1.4 System Prompt

ה-system prompt הוא הוראה מיוחדת שמגדירה הקשר וכללי התנהגות. הוא:
- לא חלק ממערך ה-`messages`; מועבר בנפרד בשדה `system`
- בעדיפות גבוהה יותר מהודעות משתמש
- נטען פעם אחת וחל לאורך כל השיחה
- משמש להגדרת תפקיד, מגבלות ופורמט פלט

**חשוב למבחן:** ניסוח של system prompt יכול ליצור אסוציאציות לא-רצויות לכלים. למשל, הוראה כמו "תאמת תמיד את הלקוח" עלולה לגרום למודל להשתמש יותר מדי ב-`get_customer`, גם כשזה לא נחוץ.

## 1.5 חלון הקשר (Context Window)

חלון ההקשר הוא הכמות הכוללת של טקסט (בטוקנים) שהמודל יכול לעבד בבת אחת. הוא כולל:
- system prompt
- היסטוריית ההודעות המלאה
- הגדרות כלים
- תוצאות כלים

**בעיות מפתח של חלון ההקשר:**

1. **אפקט lost-in-the-middle:** מודלים מעבדים מידע באמינות בהתחלה ובסוף של קלט ארוך, אבל עלולים לפספס פרטים באמצע. מיתון: מקמו מידע קריטי קרוב לתחילה או לסוף.

2. **הצטברות תוצאות כלי:** כל קריאה לכלי מוסיפה פלט להקשר. אם כלי מחזיר 40+ שדות אבל רק 5 רלוונטיים — רוב ההקשר מבוזבז.

3. **סיכום פרוגרסיבי:** בעת דחיסת היסטוריה, ערכים מספריים, אחוזים ותאריכים אובדים לעיתים והופכים מעורפלים ("בערך", "בקירוב", "כמה").

---

# פרק 2: Tools ו-`tool_use`

> תיעוד: [Tool Use](https://platform.claude.com/docs/en/build-with-claude/tool-use)

## 2.1 מה זה `tool_use`

`tool_use` הוא מנגנון שמאפשר ל-Claude לקרוא לפונקציות חיצוניות. המודל לא מריץ קוד בעצמו — הוא מייצר בקשת קריאה מובנית; הקוד שלכם מריץ אותה ומחזיר את התוצאה.

## 2.2 הגדרת כלי

כל כלי מוגדר באמצעות JSON schema:

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

**היבטים קריטיים של תיאור הכלי:**

1. **התיאור הוא מנגנון הבחירה העיקרי.** LLM בוחר כלים על בסיס התיאור שלהם. תיאורים מינימליים ("מאחזר מידע לקוח") מובילים לטעויות כשכלים חופפים.

2. **כללו בתיאור:**
   - מה הכלי עושה ומחזיר
   - פורמטי קלט וערכים לדוגמה
   - מקרי קצה ומגבלות
   - מתי להשתמש בכלי הזה לעומת חלופות דומות

3. **הימנעו** מתיאורים זהים או חופפים בין כלים. אם ל-`analyze_content` ו-`analyze_document` יש תיאורים כמעט זהים — המודל יבלבל ביניהם.

4. **כלים מובנים מול כלי MCP:** סוכנים עשויים להעדיף כלים מובנים (Read, Grep) על פני כלי MCP עם פונקציונליות דומה. כדי למנוע — חזקו את תיאורי כלי MCP: הדגישו יתרונות קונקרטיים, נתונים ייחודיים או הקשר שכלים מובנים לא יכולים לספק.

## 2.3 הפרמטר `tool_choice`

`tool_choice` שולט באופן שבו המודל בוחר כלים:

| ערך | התנהגות | מתי להשתמש |
|---|---|---|
| `{"type": "auto"}` | המודל מחליט אם לקרוא לכלי או לענות בטקסט | ברירת מחדל לרוב המקרים |
| `{"type": "any"}` | המודל **חייב** לקרוא לאיזשהו כלי | כשצריך פלט מובנה מובטח |
| `{"type": "tool", "name": "extract_metadata"}` | המודל **חייב** לקרוא לכלי ספציפי | כשצריך לכפות צעד ראשון / סדר הפעלה |

**תרחישים חשובים:**
- `tool_choice: "any"` + מספר כלי חילוץ → המודל בוחר את המתאים ביותר אבל אתם עדיין מקבלים פלט מובנה
- בחירה כפויה → כשחייבים להבטיח פעולה ראשונה מסוימת (למשל `extract_metadata` לפני העשרה)

## 2.4 JSON Schemas לפלט מובנה

שימוש ב-`tool_use` עם JSON schemas הוא הדרך **האמינה ביותר** לקבל פלט מובנה מ-Claude. הוא:
- מבטיח JSON תקין מבחינה תחבירית (אין סוגריים חסרים, פסיקים מיותרים)
- אוכף את המבנה הנדרש (שדות required נוכחים)
- **לא** מבטיח נכונות סמנטית (ערכים עדיין יכולים להיות שגויים)

**עיצוב סכמה — עקרונות מפתח:**

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

**כללי עיצוב סכמה:**
1. **Required מול optional:** סמנו שדות כ-required רק אם המידע תמיד זמין. שדות required דוחפים את המודל לבדות ערכים כשהמידע חסר.
2. **שדות nullable:** השתמשו ב-`"type": ["string", "null"]` למידע שעלול להיות חסר. המודל יכול להחזיר `null` במקום להזות.
3. **Enums עם `"other"`:** הוסיפו `"other"` + שדה פירוט כדי לא לאבד נתונים מחוץ לקטגוריות שהגדרתם מראש.
4. **Enum `"unclear"`:** למקרים שבהם המודל לא יכול לבחור קטגוריה בביטחון — `"unclear"` כן הוא טוב יותר מקטגוריה שגויה.

## 2.5 שגיאות תחביריות מול סמנטיות

| סוג שגיאה | דוגמה | מיתון |
|---|---|---|
| **תחבירית** | JSON לא תקין, סוג שדה שגוי | `tool_use` עם JSON schema (מבטל) |
| **סמנטית** | סכומים לא מסתכמים, ערך בשדה לא נכון, הזיה | בדיקות אימות, retry-with-feedback, self-correction |

---

# פרק 3: Claude Agent SDK — בניית מערכות סוכן

> תיעוד: [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) | [Hooks](https://platform.claude.com/docs/en/agent-sdk/hooks) | [Subagents](https://platform.claude.com/docs/en/agent-sdk/subagents) | [Sessions](https://platform.claude.com/docs/en/agent-sdk/sessions)

## 3.1 מהי לולאת סוכן (Agentic Loop)

לולאת הסוכן היא הדפוס הליבתי לביצוע משימות אוטונומיות. המודל לא רק עונה — הוא מבצע רצף פעולות:

```
1. שלחו בקשה ל-Claude עם כלים
2. קבלו תגובה
3. בדקו stop_reason:
   - "tool_use" -> הריצו את הכלי, צרפו תוצאה להיסטוריה, חזרו לצעד 1
   - "end_turn" -> המשימה הושלמה, הציגו תוצאה למשתמש
4. חזרו עד להשלמה
```

**זוהי גישה model-driven:** Claude מחליט באיזה כלי לקרוא בא הלאה על בסיס הקשר ותוצאות קודמות. שונה מעצי החלטה מקודדים-קשיחים שבהם הרצף קבוע מראש.

**אנטי-פטרנים (להימנע):**
- ניתוח טקסט של ה-assistant כדי לזהות סיום ("Task completed")
- שימוש בגבול איטרציות שרירותי (`max_iterations=5`) כתנאי עצירה ראשי
- בדיקה אם ה-assistant ייצר תוכן טקסטואלי כאות סיום

**גישה נכונה:** הסימן האמין היחיד לסיום הוא `stop_reason == "end_turn"`.

## 3.2 הגדרת `AgentDefinition`

`AgentDefinition` הוא אובייקט הגדרת הסוכן ב-Claude Agent SDK:

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

**פרמטרים מרכזיים:**
- `name` / `description` — זיהוי ותיאור הסוכן
- `system_prompt` — system prompt עם הוראות
- `allowed_tools` — רשימת הכלים המותרים (עקרון הרשאה מינימלית)

## 3.3 Hub-and-Spoke: מתאם ותת-סוכנים

ארכיטקטורה רב-סוכנית בדרך כלל בנויה כטופולוגיית hub-and-spoke:

```
         Coordinator
        /     |      \
   Subagent1  Subagent2  Subagent3
    (search)   (analysis)   (synthesis)
```

**המתאם אחראי על:**
- פירוק המשימה לתת-משימות
- החלטה אילו תת-סוכנים נדרשים (בחירה דינמית)
- האצלת עבודה לתת-סוכנים
- צבירה ואימות תוצאות
- טיפול בשגיאות ו-retries
- העברת תוצאות למשתמש

**עקרון קריטי: לתת-סוכנים יש הקשר מבודד.**
- תת-סוכנים **אינם** יורשים אוטומטית את היסטוריית השיחה של המתאם
- כל ההקשר הנדרש חייב להיות **מועבר במפורש** בפרומפט של תת-הסוכן
- תת-סוכנים לא חולקים זיכרון בין קריאות
- כל התקשורת זורמת דרך המתאם (לצורך תצפיתיות ובקרת שגיאות)

## 3.4 הכלי `Task` ליצירת תת-סוכנים

תת-סוכנים נוצרים דרך הכלי `Task`:

```python
# The coordinator's allowedTools must include "Task"
coordinator_agent = AgentDefinition(
    allowed_tools=["Task", "get_customer"]
)
```

**העברת הקשר מפורשת היא חובה:**

```
# Bad: the subagent has no context
Task: "Analyze the document"

# Good: full context in the prompt
Task: "Analyze the following document.
Document: [full document text]
Prior search results: [web search results]
Output format requirements: [schema]"
```

**הפעלה מקבילית:** מתאם יכול לקרוא למספר `Task`-ים בתגובה אחת — תת-הסוכנים רצים במקביל:

```
# One coordinator response contains:
Task 1: "Search for articles about X"
Task 2: "Analyze document Y"
Task 3: "Search for articles about Z"
# All three run concurrently
```

## 3.5 Hooks ב-Agent SDK

Hooks מאפשרים יירוט וטרנספורמציה בנקודות ספציפיות במחזור החיים של הסוכן.

**PostToolUse** מיירט תוצאת כלי לפני שהיא מועברת למודל:

```python
# Example: normalize date formats from different MCP tools
@hook("PostToolUse")
def normalize_dates(tool_result):
    # Convert Unix timestamp -> ISO 8601
    # Convert "Mar 5, 2025" -> "2025-03-05"
    return normalized_result
```

**Hook ליירוט קריאות יוצאות** חוסם פעולות שמפרות מדיניות:

```python
# Example: block refunds above $500
@hook("PreToolUse")
def enforce_refund_limit(tool_call):
    if tool_call.name == "process_refund" and tool_call.args.amount > 500:
        return redirect_to_escalation(tool_call)
```

**הבדל מרכזי: hooks מול הוראות בפרומפט**

| תכונה | Hooks | הוראות בפרומפט |
|---|---|---|
| הבטחה | **דטרמיניסטית** (100%) | **הסתברותית** (>90%, לא 100%) |
| מתי להשתמש | כללי עסק קריטיים, פעולות פיננסיות, compliance | העדפות כלליות, המלצות, פורמט |
| דוגמה | חסום החזרים > 500$ | "נסה לפתור לפני הסלמה" |

**כלל:** כששגיאה יוצרת תוצאות פיננסיות, משפטיות או בטיחותיות — השתמשו ב-hooks, לא בפרומפטים.

# פרק 4: Model Context Protocol (MCP)

> תיעוד: [MCP](https://modelcontextprotocol.io/) | [Tools](https://modelcontextprotocol.io/docs/concepts/tools) | [Resources](https://modelcontextprotocol.io/docs/concepts/resources) | [Servers](https://modelcontextprotocol.io/docs/concepts/servers)

## 4.1 מה זה MCP

Model Context Protocol (MCP) הוא פרוטוקול פתוח לחיבור מערכות חיצוניות ל-Claude. MCP מגדיר שלושה סוגי משאבים עיקריים:

1. **Tools** — פונקציות שהסוכן יכול לקרוא להן כדי לבצע פעולות (CRUD, קריאות API, הרצת פקודות)
2. **Resources** — נתונים שהסוכן יכול לקרוא להקשר (תיעוד, סכמות DB, קטלוגי תוכן)
3. **Prompts** — תבניות פרומפט מוגדרות מראש למשימות נפוצות

## 4.2 שרתי MCP

שרת MCP הוא תהליך שמממש את פרוטוקול MCP ומספק tools/resources. כשמתחברים לשרת MCP:
- כל הכלים מתגלים אוטומטית
- כלים מכל השרתים המחוברים זמינים בו-זמנית
- תיאורי הכלים קובעים איך המודל ישתמש בהם

## 4.3 הגדרת שרתי MCP

**הגדרת פרויקט (`.mcp.json`)** — לשימוש צוותי:

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

**נקודות מפתח:**
- `.mcp.json` נשמר בשורש הפרויקט ומנוהל ב-VCS
- משתני סביבה (`${GITHUB_TOKEN}`) משמשים לסודות — הטוקנים עצמם לא מוקמטים
- זמין לכל תורמי הפרויקט

**הגדרת משתמש (`~/.claude.json`)** — לשרתים אישיים/ניסיוניים:
- נשמר ב-home directory של המשתמש
- לא משותף דרך VCS
- מתאים לניסיונות אישיים ובדיקות

**בחירת שרתים:**
- לאינטגרציות סטנדרטיות (Jira, GitHub, Slack) — העדיפו שרתי MCP קהילתיים קיימים
- בנו שרתים משלכם רק לזרימות עבודה ייחודיות וצוותיות

## 4.4 הדגל `isError` ב-MCP

כשכלי MCP נתקל בשגיאה, הוא משתמש ב-`isError: true` בתגובה. זה מסמן לסוכן שהקריאה נכשלה.

**שגיאה מובנית (טוב):**

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

**שגיאה גנרית (אנטי-פטרן):**

```json
{
  "isError": true,
  "content": "Operation failed"
}
```

שגיאה גנרית לא נותנת לסוכן שום מידע להחלטה — האם לנסות שוב, לשנות שאילתה או להסלים?

## 4.5 MCP Resources

Resources הם נתונים שסוכן יכול לבקש כדי לקבל הקשר בלי לבצע פעולות:

- קטלוגי תוכן (למשל רשימת כל משימות הפרויקט, ניווט היררכי)
- סכמות מסד נתונים (הבנת מבנה הנתונים)
- תיעוד (API references, מדריכים פנימיים)
- סיכומי issue/task

**יתרון Resources:** הסוכן לא צריך קריאות כלי חקרניות כדי להבין אילו נתונים קיימים. Resource מספק "מפה" מיידית.

---

# פרק 5: Claude Code — הגדרות וזרימות עבודה

> תיעוד: [Claude Code](https://code.claude.com/docs/en/overview) | [Memory / CLAUDE.md](https://code.claude.com/docs/en/memory) | [Skills](https://code.claude.com/docs/en/skills) | [MCP](https://code.claude.com/docs/en/mcp) | [Hooks](https://code.claude.com/docs/en/hooks) | [Sub-agents](https://code.claude.com/docs/en/sub-agents) | [GitHub Actions](https://code.claude.com/docs/en/github-actions) | [Headless](https://code.claude.com/docs/en/headless)

## 5.1 ההיררכיה של CLAUDE.md

CLAUDE.md הוא קובץ/קבצי ההוראות ל-Claude Code. יש היררכיה תלת-שכבתית:

```
1. רמת משתמש: ~/.claude/CLAUDE.md
   - חל רק על המשתמש הזה
   - לא משותף דרך VCS
   - העדפות אישיות וסגנון עבודה

2. רמת פרויקט: .claude/CLAUDE.md או CLAUDE.md בשורש
   - חל על כל תורמי הפרויקט
   - מנוהל דרך VCS
   - סטנדרטי קוד, סטנדרטי בדיקה, החלטות ארכיטקטוניות

3. רמת תיקייה: CLAUDE.md בתת-תיקיות
   - חל בעת עבודה עם קבצים בתיקייה
   - מוסכמות ספציפיות לחלק זה של ה-codebase
```

**טעות נפוצה:** חבר צוות חדש לא מקבל הוראות פרויקט כי הן הושמו ב-`~/.claude/CLAUDE.md` (רמת משתמש) במקום ב-`.claude/CLAUDE.md` (רמת פרויקט).

## 5.2 תחביר `@path` (יבוא קבצים)

CLAUDE.md יכול להתייחס לקבצים חיצוניים באמצעות `@path`, מה שהופך את ההגדרה למודולרית:

```markdown
# Project CLAUDE.md

Coding standards are described in @./standards/coding-style.md
Test requirements are in @./standards/testing-requirements.md
Project overview is in @README.md and dependencies are in @package.json
```

**כללי `@path`:**
- השתמשו ב-`@` מיד לפני נתיב הקובץ (בלי רווח)
- נתמכים נתיבים יחסיים ומוחלטים
- נתיבים יחסיים נפתרים יחסית לקובץ שמכיל את היבוא
- עומק קינון מקסימלי של יבוא הוא 5

זה מונע כפילויות ומאפשר לכל חבילה לכלול רק סטנדרטי רלוונטיים.

## 5.3 התיקייה `.claude/rules/`

`.claude/rules/` היא חלופה ל-CLAUDE.md מונוליטי, לארגון כללים לפי נושא:

```
.claude/rules/
  testing.md          -- testing conventions
  api-conventions.md  -- API conventions
  deployment.md       -- deployment rules
  react-patterns.md   -- React patterns
```

**תכונה מרכזית: YAML frontmatter עם `paths` לטעינה מותנית:**

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

**איך זה עובד:**
- כלל נטען **רק** כש-Claude Code עורך קובץ שמתאים לתבנית `paths`
- זה חוסך הקשר וטוקנים — כללים לא-רלוונטיים לא נטענים
- תבניות glob מאפשרות להחיל מוסכמות לפי סוג קובץ ללא תלות במיקום (אידיאלי לבדיקות פזורות)

**מתי להשתמש ב-`.claude/rules/` עם `paths` לעומת CLAUDE.md ברמת תיקייה:**
- `.claude/rules/` עם `paths` — כשמוסכמות חלות על קבצים פזורים בהרבה תיקיות (tests, migrations)
- CLAUDE.md ברמת תיקייה — כשמוסכמות קשורות לתיקייה ספציפית ולא נחוצות במקום אחר

## 5.4 Custom Slash Commands ו-Skills

> **הערה:** בגרסה הנוכחית של Claude Code, פקודות מותאמות אישית (`.claude/commands/`) מאוחדות עם skills (`.claude/skills/`). שני הפורמטים יוצרים פקודות `/name`. מדריך המבחן מתייחס ל-`.claude/commands/` — הפורמט הזה עדיין נתמך.

Slash commands הן תבניות פרומפט הניתנות לשימוש חוזר שמופעלות דרך `/name`:

**פורמט `.claude/commands/` (legacy, נתמך):**

```
.claude/commands/
  review.md        -- /review -- standard code review
  test-gen.md      -- /test-gen -- test generation
```

**פורמט `.claude/skills/` (נוכחי):**

```
.claude/skills/
  review/SKILL.md  -- /review -- with frontmatter configuration
  test-gen/SKILL.md
```

**פקודות פרויקט** (`.claude/commands/` או `.claude/skills/`):
- נשמרות ב-VCS וזמינות לכולם בעת clone של הריפו
- מבטיחות זרימות עבודה עקביות בכל הצוות

**פקודות משתמש** (`~/.claude/commands/` או `~/.claude/skills/`):
- פקודות אישיות שלא משותפות דרך VCS
- לזרימות עבודה אינדיבידואליות

## 5.5 Skills — `.claude/skills/`

Skills הן פקודות מתקדמות שמוגדרות דרך frontmatter של SKILL.md:

```yaml
---
context: fork
allowed-tools: ["Read", "Grep", "Glob"]
argument-hint: "Path to the directory to analyze"
---

Analyze the code structure in the specified directory.
Output a report on dependencies and architectural patterns.
```

**פרמטרי Frontmatter:**

| פרמטר | תיאור |
|---|---|
| `context: fork` | מריץ את ה-skill בתת-סוכן מבודד. פלט verbose לא מזהם את הסשן הראשי |
| `allowed-tools` | מגביל אילו כלים זמינים (אבטחה — למשל ה-skill לא יכול למחוק קבצים אם לא הותר) |
| `argument-hint` | רמז שמבקש ארגומנט בעת הפעלה ללא פרמטרים |

**מתי skill לעומת CLAUDE.md:**
- **Skill** — הפעלה on-demand למשימה ספציפית (review, ניתוח, יצירה)
- **CLAUDE.md** — סטנדרטי ומוסכמות כלליים שטעונים תמיד

**Skills אישיים (`~/.claude/skills/`):**
- צרו ואריאנטים אישיים בשמות שונים כדי לא להשפיע על חברי הצוות

## 5.6 מצב תכנון (Planning Mode) לעומת ביצוע ישיר

**מצב תכנון:**
- המודל רק חוקר ומתכנן; לא מבצע שינויים
- משתמש ב-Read, Grep, Glob כדי לחקור את ה-codebase
- מייצר תוכנית מימוש שהמשתמש מאשר
- חקירה בטוחה בלי תופעות לוואי

**מתי להשתמש במצב תכנון:**
- שינויים גדולים (עשרות קבצים)
- מספר גישות סבירות (microservices: איך להגדיר גבולות?)
- החלטות ארכיטקטוניות (איזה framework? איזה מבנה?)
- codebase לא מוכר (חייבים להבין לפני שמשנים)
- מיגרציות ספרייה שמשפיעות על 45+ קבצים

**מתי להשתמש בביצוע ישיר:**
- תיקון בקובץ יחיד עם stack trace ברור
- הוספת בדיקת validation בודדת
- שינויים מובנים היטב ולא דו-משמעיים

**גישה משולבת:**
1. מצב תכנון לחקירה ועיצוב
2. המשתמש מאשר את התוכנית
3. ביצוע ישיר ליישום התוכנית המאושרת

**Explore subagent** — תת-סוכן מתמחה לחקירת ה-codebase:
- מבודד פלט verbose מההקשר הראשי
- מחזיר רק סיכום
- מונע אזילת חלון הקשר במשימות רב-שלביות

## 5.7 הפקודה `/compact`

`/compact` היא פקודה מובנית לדחיסת הקשר:
- מסכמת היסטוריה קודמת כדי לפנות חלון הקשר
- משמשת בסשני חקירה ארוכים שבהם ההקשר מתמלא בפלט כלי verbose
- סיכון: ערכים מספריים מדויקים, תאריכים ופרטים ספציפיים עלולים ללכת לאיבוד בסיכום

## 5.8 הפקודה `/memory`

`/memory` היא פקודה מובנית לניהול זיכרון בין סשנים:
- פותחת את הקובץ `CLAUDE.md` לעריכה, מאפשרת לשמור הערות, העדפות והקשר
- מידע נמשך בין סשנים ונטען אוטומטית בהפעלה
- שימושית לשמירת מוסכמות פרויקט, העדפות משתמש, פקודות בשימוש תכוף, והקשר עבודה נוכחי
- חלופה להסבר חוזר של אותן הוראות בכל סשן

## 5.9 Claude Code CLI ל-CI/CD

**הדגל `-p` (או `--print`):**

```bash
claude -p "Analyze this pull request for security issues"
```

- מצב לא-אינטראקטיבי: מעבד את הפרומפט, מדפיס ל-stdout, יוצא
- לא מחכה לקלט משתמש
- הדרך הנכונה היחידה להריץ Claude בפייפליין CI/CD

**פלט מובנה ל-CI:**

```bash
claude -p "Review this PR" --output-format json --json-schema '{"type":"object",...}'
```

- `--output-format json` — פלט ב-JSON
- `--json-schema` — אימות פלט מול סכמה
- ניתן לפרסר את התוצאה כדי לפרסם הערות inline על ה-PR אוטומטית

**בידוד הקשר של סשן:**
אותו סשן Claude שייצר קוד הוא לרוב פחות אפקטיבי בסקירתו (המודל שומר את הקשר השיקול שלו ופחות סביר שיאתגר את ההחלטות של עצמו). השתמשו ב-instance עצמאי ל-review.

**מניעת הערות כפולות:**
בעת re-review אחרי קומיטים חדשים, כללו את תוצאות ה-review הקודמות בהקשר והנחו את Claude לדווח רק על בעיות חדשות או לא-פתורות.

## 5.10 `fork_session` וניהול סשנים

**`--resume <session-name>`** ממשיך סשן בעל שם:

```bash
claude --resume investigation-auth-bug
```

- ממשיך שיחה קודמת עם הקשר שמור
- שימושי לחקירות ארוכות שמתפרסות על מספר סשנים
- סיכון: אם קבצים השתנו מאז הסשן הקודם, תוצאות הכלים עלולות להיות מיושנות

**`fork_session`** יוצר סניף עצמאי מהקשר משותף:

```
Codebase investigation
         |
    fork_session
    /           \
Approach A:      Approach B:
Redux            Context API
```

- שני ה-forks יורשים הקשר עד נקודת ההסתעפות
- אחרי כן הם מתפצלים עצמאית
- שימושי להשוואת גישות או בדיקת אסטרטגיות

**מתי להתחיל סשן חדש במקום להמשיך:**
- תוצאות הכלים מיושנות (קבצים השתנו)
- עבר הרבה זמן וההקשר ירד באיכותו
- עדיף להתחיל מחדש עם "הנה סיכום קצר של מה שמצאנו: ..." במקום להמשיך עם נתוני כלי ישנים

---

# פרק 6: הנדסת פרומפט — טכניקות מתקדמות

> תיעוד: [Prompt Engineering](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook)

## 6.1 Few-shot Prompting

Few-shot prompting הוא הכללה של 2–4 דוגמאות קלט/פלט בפרומפט כדי להדגים את ההתנהגות הצפויה.

**למה few-shot אפקטיבי יותר מתיאורים טקסטואליים:**
- הוראה מעורפלת כמו "תהיה מדויק יותר" יכולה להתפרש בהרבה דרכים
- דוגמה מראה באופן חד-משמעי את הפורמט הצפוי ולוגיקת ההחלטה
- המודל מכליל את הדפוס למקרים חדשים (הוא לא רק חוזר על הדוגמאות)

**סוגי דוגמאות few-shot ומתי להשתמש בהן:**

1. **דוגמאות לתרחישים דו-משמעיים:**

```
Request: "My order is broken"
Action: Call get_customer -> lookup_order -> check status.
Rationale: "broken" may mean a damaged item; you need order details.

Request: "Get me a manager"
Action: Immediately call escalate_to_human.
Rationale: The customer explicitly requests a human. Do not attempt to solve autonomously.
```

2. **דוגמאות לפורמט פלט:**

```
Finding example:
{
  "location": "src/auth/login.ts:42",
  "issue": "SQL injection in the username parameter",
  "severity": "critical",
  "suggested_fix": "Use a parameterized query"
}
```

3. **דוגמאות להפרדת קוד מקובל מקוד בעייתי:**

```
// Acceptable (do not flag):
const items = data.filter(x => x.active);

// Problem (flag):
const items = data.filter(x => x.active == true); // Use strict equality ===
```

4. **דוגמאות לחילוץ מפורמטי מסמכים שונים:**

```
Document with inline citations:
"As shown in the study (Smith, 2023), the rate is 42%."
-> {"value": "42%", "source": "Smith, 2023", "type": "inline_citation"}

Document with bibliography references:
"The rate is 42%. [1]"
-> {"value": "42%", "source": "reference_1", "type": "bibliography"}
```

5. **דוגמאות למדידות לא-פורמליות:**

```
Text: "about two handfuls of rice"
-> {"amount": "~100g", "original_text": "two handfuls", "precision": "approximate"}

Text: "a pinch of salt"
-> {"amount": "~1g", "original_text": "a pinch", "precision": "approximate"}
```

Few-shot אפקטיבי במיוחד לחילוץ יחידות מדידה לא-פורמליות ולא-סטנדרטיות, שמגוונות מדי לכללים בלבד.

**כללי נורמליזציית פורמט בפרומפט:**
בעת שימוש ב-JSON schemas מחמירים לפלט מובנה, הוסיפו כללי נורמליזציה בפרומפט:

```
Normalization:
- Dates: always ISO 8601 (YYYY-MM-DD); "yesterday" -> compute an absolute date
- Currency: numeric amount + currency code; "five bucks" -> {"amount": 5, "currency": "USD"}
- Percentages: decimal fraction; "half" -> 0.5
```

זה מונע שגיאות סמנטיות שבהן ה-JSON תקין תחבירית אבל הערכים לא עקביים.

## 6.2 קריטריונים מפורשים לעומת הוראות מעורפלות

**רע (מעורפל):**

```
Check code comments for accuracy.
Be conservative—report only high-confidence findings.
```

**טוב (קריטריונים מפורשים):**

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

**הגדירו קריטריוני חומרה עם דוגמאות:**

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

## 6.3 Prompt Chaining

Prompt chaining מפרק משימה מורכבת לרצף שלבים ממוקדים:

```
Step 1: Analyze auth.ts (local issues only)
       -> Output: list of issues in auth.ts

Step 2: Analyze database.ts (local issues only)
       -> Output: list of issues in database.ts

Step 3: Integration pass (cross-file dependencies)
       -> Output: issues at module boundaries
```

**למה זה חשוב:**
- מונע **דילול תשומת לב** — כשהמודל מקבל יותר מדי קבצים בבת אחת, הוא עלול לפספס באגים בחלקם ולתת הערות שטחיות על אחרים
- מבטיח איכות ניתוח עקבית לכל קובץ
- מאפשר ניתוח נפרד של אינטראקציות בין-קבצים

**מתי prompt chaining לעומת dynamic decomposition:**
- **Prompt chaining** — משימות צפויות וחזרתיות (code review, מיגרציות קבצים)
- **Dynamic decomposition** — חקירות פתוחות שבהן תת-המשימות מתבהרות רק במהלך הביצוע

## 6.4 דפוס ה-"Interview"

לפני יישום פתרון, Claude שואל שאלות הבהרה:

```
Claude: "Before implementing caching for the API, a few questions:
1. Which cache invalidation strategy do you prefer—TTL or event-based?
2. Is stale data acceptable when the cache is unavailable?
3. Should caching be per-user or global?
4. What is the expected data volume to cache?"
```

**מתי זה שימושי:**
- דומיין לא מוכר (fintech, healthcare, מערכות משפטיות)
- משימות עם השלכות לא-מובנות (אסטרטגיות cache, מצבי כשל)
- מספר גישות סבירות שבחירת הטובה תלויה בהקשר

## 6.5 Validation ו-Retry-with-Feedback

כשנתונים מחולצים נכשלים באימות:

```
Step 1: Extract data from the document
Step 2: Validate (Pydantic, JSON Schema, business rules)
Step 3: If there's an error—retry with context:
  - The original document
  - The previous (incorrect) extraction
  - The specific error: "Field 'total' = 150, but sum(line_items) = 145. Re-check values."
```

**מתי retry יהיה אפקטיבי:**
- שגיאות פורמט (תאריך בפורמט שגוי)
- שגיאות מבניות (שדה ממוקם במקום הלא נכון)
- אי-עקביות אריתמטיות (המודל יכול לבדוק מחדש)

**מתי retry לא יעזור:**
- המידע לא קיים במסמך המקור
- ההקשר הנדרש חיצוני (הנתונים במסמך אחר שלא סופק)

**Pydantic ככלי אימות:**
Pydantic היא ספריית Python לאימות נתונים מבוסס-סכמה. למבחן, הנקודות החשובות:
- **אימות מבני:** סוגים, requiredness, מגבלות enum נבדקות בקוד אחרי קבלת JSON מ-Claude
- **אימות סמנטי:** validators מותאמים אכופים לוגיקה עסקית (סכום פריטים שווה לסך הכל; start_date < end_date)
- **לולאות validate–retry:** עם כשל אימות Pydantic, בנו הודעת שגיאה וקראו שוב ל-Claude עם הקשר השגיאה
- **יצירת JSON Schema:** מודלים של Pydantic יכולים לייצר JSON Schema ל-`tool_use`, מספקים מקור אמת יחיד

## 6.6 Self-correction

דפוס לזיהוי סתירות פנימיות:

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

המודל מחלץ גם את הערך המוצהר וגם ערך מחושב — אם הם שונים, `conflict_detected` מאפשר לטפל באי-התאמה.

---

# פרק 7: Message Batches API

> תיעוד: [Message Batches](https://platform.claude.com/docs/en/build-with-claude/message-batches)

## 7.1 סקירה

ה-Message Batches API מאפשר לכם להגיש batch של בקשות לעיבוד אסינכרוני:

| תכונה | ערך |
|---|---|
| חיסכון | **50%** לעומת קריאות סינכרוניות |
| חלון עיבוד | עד **24 שעות** (אין הבטחת SLA לאיחור) |
| Multi-turn tool calling | **לא נתמך** (בקשה אחת = תגובה אחת) |
| קישור | שדה `custom_id` לקישור בין בקשה לתגובה |

## 7.2 מתי Batch API לעומת Synchronous API

| משימה | API | למה |
|---|---|---|
| בדיקת PR לפני merge | **Synchronous** | המפתח מחכה; 24 שעות לא מקובל |
| דוח tech-debt לילה | **Batch** | התוצאה נדרשת לבוקר; חיסכון של 50% |
| ביקורת אבטחה שבועית | **Batch** | לא דחוף; חיסכון של 50% |
| Code review אינטראקטיבי | **Synchronous** | נדרשת תגובה מיידית |
| עיבוד 10,000 מסמכים | **Batch** | עיבוד מסיבי; החיסכון משמעותי |

## 7.3 שימוש ב-`custom_id`

```json
{
  "custom_id": "doc-invoice-2024-001",
  "params": {
    "model": "claude-sonnet-4-6",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Extract data from: ..."}]
  }
}
```

`custom_id` מאפשר לכם:
- לקשר את התוצאה למסמך המקורי
- בכשל, להגיש מחדש רק את המסמכים שנכשלו
- להימנע מעיבוד חוזר של מסמכים שהצליחו

## 7.4 טיפול בכשלים ב-Batches

1. הגישו batch של 100 מסמכים
2. 95 מצליחים; 5 נכשלים (חרגו מגבול ההקשר)
3. זהו כשלים לפי `custom_id`
4. שנו אסטרטגיה (למשל פצלו מסמכים ארוכים ל-chunks)
5. הגישו מחדש רק את 5 המסמכים שנכשלו

## 7.5 תכנון SLA

אם צריך תוצאה תוך 30 שעות ו-Batch API יכול לקחת עד 24 שעות:
- חלון הגשה: 30 - 24 = **6 שעות**
- Batches חייבים להיות מוגשים לא יאוחר מ-24 שעות לפני ה-deadline
- להגשות תכופות, פצלו לחלונות של 4 שעות

---

# פרק 8: אסטרטגיות פירוק משימות

## 8.1 Fixed Pipelines (Prompt Chaining)

כל שלב מוגדר מראש:

```
Document -> Metadata extraction -> Data extraction -> Validation -> Enrichment -> Final output
```

**מתי להשתמש:**
- מבנה המשימה צפוי (ביקורות תמיד עוקבות אחר אותה תבנית)
- כל השלבים ידועים מראש
- צריך יציבות ושחזוריות

## 8.2 Dynamic Adaptive Decomposition

תת-משימות נוצרות על בסיס תוצאות ביניים:

```
1. "Add tests for a legacy codebase"
2. -> First: map the structure (Glob, Grep)
3. -> Found: 3 modules with no tests, 2 with partial coverage
4. -> Prioritize: start with the payments module (high risk)
5. -> During work: discovered a dependency on an external API
6. -> Adapt: add a mock for the external API before writing tests
```

**מתי להשתמש:**
- משימות חקרניות פתוחות
- כשהיקף מלא לא ידוע מראש
- כשכל שלב תלוי בתוצאות הקודם

## 8.3 Multi-pass Code Review

ל-PRs עם 10+ קבצים:

```
Pass 1 (per-file): Analyze auth.ts -> list local issues
Pass 1 (per-file): Analyze database.ts -> list local issues
Pass 1 (per-file): Analyze routes.ts -> list local issues
...
Pass 2 (integration): Analyze relationships between files
  -> Cross-file issues: inconsistent types, circular dependencies
```

**למה pass יחיד מעל 14 קבצים גרוע:**
- דילול תשומת לב: ניתוח עמוק לחלק מהקבצים, שטחי לאחרים
- הערות לא-עקביות: דפוס מסומן בקובץ אחד ומאושר באחר
- באגים מפוספסים: שגיאות ברורות נדלגות עקב עומס קוגניטיבי

---

# פרק 9: הסלמה ו-Human-in-the-Loop

## 9.1 מתי להסלים לאדם

**טריגרים להסלמה (כללים ברורים):**

| מצב | פעולה |
|---|---|
| הלקוח מבקש מפורשות "תביא לי מנהל" | הסלימו מיד; אל תנסו לפתור |
| המדיניות לא מכסה את הבקשה | הסלימו (למשל התאמת מחיר למתחרה כשהמדיניות שותקת) |
| הסוכן לא מצליח להתקדם | הסלימו אחרי מספר ניסיונות סביר |
| פעולה פיננסית מעל סף | הסלימו (רצוי דרך hook, לא בפרומפט) |
| מספר תוצאות בחיפוש לקוח | בקשו מזהים נוספים; אל תנחשו |

**מה **לא** טריגר אמין:**

| שיטה לא-אמינה | למה נכשלת |
|---|---|
| ניתוח sentiment | מצב רוח של לקוח לא בקורלציה עם מורכבות התיק |
| ביטחון עצמי של המודל (1–10) | המודל יכול לטעות בביטחון; קליברציה גרועה |
| מסווג אוטומטי | over-engineering; עלול לדרוש training data שאין |

## 9.2 דפוסי הסלמה

**הסלמה מיידית:**

```
Customer: "I want to speak to a manager"
Agent: [immediately calls escalate_to_human]
NOT: "I can help with your issue, let me..."
```

**הסלמה אחרי ניסיון פתרון:**

```
Customer: "My refrigerator broke two days after purchase"
Agent: [checks the order, offers a warranty replacement]
If the customer is not satisfied -> escalate
```

**הסלמה ניואנסית (acknowledge → resolve → escalate on reiteration):**

```
Customer: "This is outrageous, I'm very unhappy with the quality!"
Agent: [acknowledges frustration] "I understand your frustration."
       [offers resolution] "I can offer a replacement or a refund."
Customer: "No, I want to talk to someone!"
Agent: [customer insists again -> immediate escalation]
```

עיקרון מפתח: הכירו ברגש קודם, אז הציעו פתרון קונקרטי, והסלימו רק אם הלקוח חוזר על הבקשה לבן אדם. אל תסלימו על ביטוי ראשון של חוסר שביעות רצון (זה לא זהה לבקשת מנהל).

**הסלמה על פער במדיניות:**

```
Customer: "Competitor X has this item 30% cheaper—give me a discount"
Policy: covers price adjustments only on your own site
Agent: [escalates — policy does not cover competitor price matching]
```

## 9.3 פרוטוקולי Handoff מובנים

בהסלמה, הסוכן צריך להעביר סיכום מובנה לאדם:

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

האופרטור האנושי לא רואה את כל תמלול השיחה — הוא רואה רק את הסיכום הזה. לכן הוא חייב להיות שלם ומכיל בתוך עצמו.

## 9.4 Confidence Calibration ופיקוח אנושי

למערכות חילוץ נתונים:

1. **ציוני ביטחון ברמת שדה:** המודל מוציא ציון ביטחון לכל שדה מחולץ
2. **קליברציה:** השתמשו בסטים מתויגים לכיוון ספים
3. **ניתוב:**
   - ביטחון גבוה + דיוק יציב -> עיבוד אוטומטי
   - ביטחון נמוך או מקורות עמומים -> סקירה אנושית

**Stratified random sampling:**
- גם לחילוצים בביטחון גבוה, בצעו audit שוטף של מדגם
- דיוק מצרפי של 97% יכול להסתיר 40% שגיאות לסוג מסמך מסוים
- נתחו דיוק לפי סוג מסמך ולפי שדה, לא רק כללי

---

# פרק 10: טיפול בשגיאות במערכות רב-סוכניות

## 10.1 קטגוריות שגיאה

| קטגוריה | דוגמאות | Retryable | פעולת סוכן |
|---|---|---|---|
| **Transient** | Timeout, 503, כשל רשת | כן | Retry עם exponential backoff |
| **Validation** | פורמט קלט לא תקין, שדה חובה חסר | לא (תקנו קלט) | שנו בקשה ונסו שוב |
| **Business** | הפרת מדיניות, חציית סף | לא | הסבירו למשתמש; הציעו חלופה |
| **Permission** | גישה נדחתה | לא | הסלימו |

## 10.2 אנטי-פטרנים בטיפול שגיאות

| אנטי-פטרן | בעיה | גישה נכונה |
|---|---|---|
| סטטוס גנרי "search unavailable" | המתאם לא יכול להחליט איך להתאושש | החזירו סוג שגיאה, query, תוצאות חלקיות, חלופות |
| השתקה שקטה (תוצאה ריקה = הצלחה) | המתאם חושב שלא היו תוצאות, אבל זה היה כשל | הבדילו "אין תוצאות" מ"כשל בחיפוש" |
| ביטול כל הזרימה על כשל אחד | אתם מאבדים את כל התוצאות החלקיות | המשיכו עם תוצאות חלקיות; סמנו פערים |
| Retries אינסופיים בתוך תת-סוכן | latency ובזבוז משאבים | החלמה מקומית (1–2 retries), אז הפצה למתאם |

## 10.3 שגיאת תת-סוכן מובנית

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

זה מספק למתאם את המידע הדרוש כדי להחליט:
- Retry עם query שונה?
- להשתמש בתוצאות חלקיות?
- להאציל לתת-סוכן אחר?
- להמשיך בלי הסקציה הזו ולסמן את הפער?

## 10.4 הערות כיסוי בסינתזה הסופית

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

---

# פרק 11: ניהול הקשר במערכות פרודקשן

## 11.1 חילוץ עובדות לבלוק נפרד

במקום להסתמך על היסטוריית שיחה (שיורדת באיכות בעת סיכום), חלצו עובדות מפתח לבלוק מובנה:

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

כללו את הבלוק הזה בכל פרומפט, ללא קשר לאיך ההיסטוריה מסוכמת.

## 11.2 קיצוץ תוצאות כלי

אם `lookup_order` מחזיר 40+ שדות אבל אתם צריכים רק 5 למשימה הנוכחית:

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

זה חוסך הקשר ומפחית רעש.

## 11.3 קלט מודע-מיקום

מקמו מידע קריטי תוך התחשבות באפקט lost-in-the-middle:

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

## 11.4 קבצי Scratchpad

בחקירות ארוכות, הסוכן יכול לכתוב ממצאים מרכזיים לקובץ scratchpad:

```
# investigation-scratchpad.md
## Key findings
- PaymentProcessor in src/payments/processor.ts inherits from BaseProcessor
- refund() is called from 3 places: OrderController, AdminPanel, CronJob
- External PaymentGateway API has a rate limit of 100 req/min
- Migration #47 added refund_reason (NOT NULL) — 2024-12-01
```

כשההקשר יורד באיכותו (או בסשן חדש), הסוכן יכול להתייעץ ב-scratchpad במקום להריץ discovery מחדש.

## 11.5 האצלה לתת-סוכנים כדי להגן על ההקשר

```
Main agent: "Investigate dependencies of the payments module"
  -> Subagent (Explore): reads 15 files, traces imports
  -> Returns: "Payments depends on AuthService, OrderModel, and the external PaymentGateway API"

Main agent: keeps one line in context instead of 15 files
```

**שכבת הקשר נפרדת:**
במערכות רב-סוכניות, כל תת-סוכן פועל בתוך תקציב הקשר מוגבל — הוא מקבל רק את המידע הנדרש למשימתו. המתאם פועל כשכבת הקשר נפרדת: הוא מצרף פלטי תת-סוכן, שומר state גלובלי, ומקצה הקשר. זה מונע "context leakage", שבו סוכן אחד צורך את החלון במידע לא רלוונטי לאחרים.

**תקציבי הקשר מוגבלים לתת-סוכנים:**
- שלחו הקשר מינימלי: משימה ספציפית + נתונים נדרשים
- הנחו את תת-הסוכן להחזיר תוצאות מובנות, לא dumps של נתונים גולמיים
- השתמשו ב-`allowedTools` כדי להגביל את ערכת הכלים של תת-הסוכן — פחות כלים פירושו פחות הסחות דעת ועלות הקשר נמוכה יותר

## 11.6 שמירת State מובנה (להתאוששות מקריסה)

כל סוכן מייצא את ה-state שלו למיקום ידוע:

```json
// agent-state/web-search-agent.json
{
  "status": "completed",
  "queries_executed": ["AI music 2024", "AI music composition"],
  "results_count": 12,
  "key_findings": [...],
  "coverage": ["music composition", "music production"],
  "gaps": ["music distribution", "music licensing"]
}
```

---


```json
// agent-state/manifest.json
{
  "web-search": "completed",
  "doc-analysis": "in_progress",
  "synthesis": "not_started"
}
```

המתאם טוען manifest בהמשך.

---

# פרק 12: שימור Provenance (מקור הציטוט)

## 12.1 בעיית אובדן Attribution

בעת סיכום תוצאות ממקורות מרובים, הקישור "טענה → מקור" יכול ללכת לאיבוד:

```
Bad: "The AI music market is estimated at $3.2B." (No source, no year.)

Good:
{
  "claim": "The AI music market is estimated at $3.2B.",
  "source_url": "https://example.com/report",
  "source_name": "Global AI Music Report 2024",
  "publication_date": "2024-06-15",
  "confidence": 0.9
}
```

## 12.2 טיפול בנתונים סותרים

כששני מקורות מספקים ערכים שונים:

```json
{
  "claim": "Share of AI-generated music on streaming platforms",
  "values": [
    {
      "value": "12%",
      "source": "Spotify Annual Report 2024",
      "date": "2024-03",
      "methodology": "Automated classification"
    },
    {
      "value": "8%",
      "source": "Music Industry Association Survey",
      "date": "2024-07",
      "methodology": "Survey of 500 labels"
    }
  ],
  "conflict_detected": true,
  "possible_explanation": "Difference in methodology and time period"
}
```

אל תבחרו ערך אחד שרירותית. שמרו את שניהם עם attribution ותנו למתאם להחליט.

## 12.3 כללו תאריכים לפרשנות נכונה

בלי תאריכים, הבדלים זמניים יכולים להתפרש בטעות כסתירות:

```
Bad: "Source A says 10%, source B says 15%. Contradiction."
Good: "Source A (2023) says 10%, source B (2024) says 15%. Likely +5% growth over a year."
```

## 12.4 רינדור לפי סוג תוכן

אל תכפו הכל לפורמט אחד:
- נתונים פיננסיים -> טבלאות
- חדשות וניתוח -> פרוזה
- ממצאים טכניים -> רשימות מובנות
- סדרות זמן -> סדר כרונולוגי

---

# פרק 13: כלים מובנים של Claude Code

## 13.1 הפניית בחירת כלי

| משימה | כלי | דוגמה |
|---|---|---|
| מציאת קבצים לפי שם/תבנית | **Glob** | `**/*.test.tsx`, `src/components/**/*.ts` |
| חיפוש בתוך קבצים | **Grep** | שם פונקציה, הודעת שגיאה, import |
| קריאת קובץ במלואו | **Read** | טעינת קובץ לניתוח |
| כתיבת קובץ חדש | **Write** | יצירת קובץ מאפס |
| עריכת קובץ קיים מדויקת | **Edit** | החלפת snippet ספציפי דרך התאמת טקסט ייחודית |
| הרצת פקודת shell | **Bash** | git, npm, הרצת בדיקות, build |

## 13.2 אסטרטגיית חקירה הדרגתית

אל תקראו את כל הקבצים בבת אחת. בנו הבנה הדרגתית:

```
1. Grep: find entry points (function definition, export)
2. Read: read the found files
3. Grep: find usages (import, calls)
4. Read: read consumer files
5. Repeat until you have a complete picture
```

## 13.3 Fallback: Read + Write במקום Edit

כש-Edit נכשל בגלל התאמת טקסט לא-ייחודית:
1. Read — טענו את תוכן הקובץ המלא
2. שנו את התוכן תוכנתית
3. Write — כתבו את הגרסה המעודכנת

---

# חלק II: הערות לפי דומיין מבחן

---

# דומיין 1: ארכיטקטורת סוכנים ואורקסטרציה (27%)

## 1.1 תכנון לולאות סוכן לביצוע משימות אוטונומיות

### ידע מפתח:
- מחזור חיים של לולאת סוכן: שלחו בקשת Claude, בדקו `stop_reason` (`"tool_use"` מול `"end_turn"`), הריצו כלים, החזירו תוצאות לאיטרציה הבאה
- תוצאות כלי מצורפות להיסטוריית השיחה כדי שהמודל יחליט על הפעולה הבאה
- קבלת החלטות model-driven (Claude בוחר את הכלי הבא) לעומת עצי החלטה מקודדים-קשיחים

### מיומנויות מפתח:
- בקרת זרימה: המשיכו את הלולאה כש-`stop_reason = "tool_use"` ועצרו ב-`"end_turn"`
- צירוף תוצאות כלי להקשר בין איטרציות
- אנטי-פטרנים להימנע: ניתוח טקסט assistant לסיום, שימוש בגבולות איטרציה שרירותיים כמנגנון עצירה ראשי

## 1.2 אורקסטרציה של מערכות רב-סוכניות (מתאם–תת-סוכן)

### ידע מפתח:
- ארכיטקטורת hub-and-spoke: המתאם מחזיק בכל התקשורת בין סוכנים, טיפול שגיאות וניתוב
- תת-סוכנים פועלים עם הקשר מבודד — הם לא יורשים אוטומטית את היסטוריית המתאם
- אחריות המתאם: פירוק משימה, האצלה, צבירת תוצאות, בחירה דינמית של תת-סוכנים
- סיכון של פירוק מצומצם מדי על ידי המתאם

### מיומנויות מפתח:
- חלקו כיסוי מחקרי בין תת-סוכנים כדי למזער כפילות
- מימשו לולאות שיפור איטרטיביות (המתאם מעריך סינתזה ומנתב מחדש משימות)
- נתבו את כל התקשורת דרך המתאם לצורך תצפיתיות

## 1.3 הגדרת קריאות תת-סוכן, העברת הקשר ויצירה

### ידע מפתח:
- הכלי `Task` יוצר תת-סוכנים; `allowedTools` של המתאם חייב לכלול `"Task"`
- הקשר תת-סוכן חייב להיכלל מפורשות בפרומפט; תת-סוכנים לא יורשים הקשר הורה
- הגדרת `AgentDefinition`: תיאורים, system prompts, מגבלות כלים
- ניהול סשנים דרך `fork_session` לחקירת חלופות

### מיומנויות מפתח:
- כללו פלטים מלאים מסוכנים קודמים בפרומפט תת-הסוכן
- השתמשו בפורמטים מובנים להפרדת נתונים ממטא-דאטה בהעברת הקשר
- צרו תת-סוכנים מקבילים דרך מספר קריאות `Task` בתור מתאם יחיד
- כתבו פרומפטי מתאם במונחי מטרות וקריטריוני איכות במקום הוראות שלב-אחר-שלב

## 1.4 מימוש זרימות עבודה רב-שלביות עם אכיפה ו-handoff

### ידע מפתח:
- ההבדל בין **אכיפה תוכנתית** (hooks, preconditions) לבין **הנחיית פרומפט** לסדר זרימת עבודה
- כשצריך הבטחות דטרמיניסטיות (למשל אימות זהות לפני פעולות פיננסיות), פרומפטים לבדם לא מספיקים
- פרוטוקולי handoff מובנים בהסלמה (זיהוי לקוח, סיבה, פעולה מומלצת)

### מיומנויות מפתח:
- Preconditions תוכנתיים שחוסמים קריאות במורד הזרימה עד שצעדים קודמים הושלמו (למשל חסום `process_refund` עד ש-`get_customer` מחזיר ID מאומת)
- פרקו בקשות לקוח רב-היבטיות לפריטים נפרדים
- הפיקו סיכומים מובנים בהסלמה לאדם

## 1.5 Hooks ב-Agent SDK ליירוט קריאות כלי ונורמליזציה

### ידע מפתח:
- דפוסי Hook (למשל `PostToolUse`) ליירוט תוצאות כלי לפני שהמודל צורך אותן
- Hooks שמיירטים קריאות יוצאות לאכיפת כללי compliance (למשל חסום החזרים מעל סף)
- Hooks מספקים **הבטחות דטרמיניסטיות** לעומת הוראות פרומפט שמספקות **compliance הסתברותי**

### מיומנויות מפתח:
- `PostToolUse` hooks לנורמליזציית פורמטי נתונים (Unix timestamps, ISO 8601, קודי סטטוס מספריים)
- Hooks ליירוט שחוסמים פעולות שמפרות מדיניות עם ניתוב להסלמה
- בחרו hooks על פני פרומפטים כשכללי עסק דורשים compliance מובטח

## 1.6 אסטרטגיות פירוק משימות לזרימות מורכבות

### ידע מפתח:
- **Fixed pipelines** (prompt chaining) לעומת **פירוק אדפטיבי דינמי** מבוסס תוצאות ביניים
- Prompt chaining: צעדים סדרתיים (נתחו כל קובץ בנפרד, ואז הריצו pass אינטגרציה)
- תוכניות חקירה אדפטיביות שיוצרות תת-משימות לפי מה שהתגלה

### מיומנויות מפתח:
- השתמשו ב-prompt chaining לסקירות צפויות רב-היבטיות; השתמשו בפירוק דינמי לחקירות פתוחות
- פצלו code reviews גדולים לניתוח לפי קובץ ועוד pass אינטגרציה נפרד לבין-קבצים
- פרקו משימות פתוחות: מפו מבנה קודם, אז בנו תוכנית מתועדפת

## 1.7 Session State, Resume ו-Fork

### ידע מפתח:
- `--resume <session-name>` להמשך סשנים בעלי שם
- `fork_session` ליצירת ענפי חקירה עצמאיים מהקשר משותף
- חשיבות יידוע הסוכן על שינויי קבצים בעת המשך סשנים
- סשן חדש עם סיכום מובנה יכול להיות אמין יותר מהמשך עם תוצאות מיושנות

### מיומנויות מפתח:
- השתמשו ב-`--resume` להמשך סשני חקירה בעלי שם
- השתמשו ב-`fork_session` להשוואת גישות במקביל
- בחרו בין resume (הקשר עדיין רלוונטי) לעומת התחלת סשן חדש (תוצאות מיושנות)

---

# דומיין 2: עיצוב כלים ואינטגרציית MCP (18%)

## 2.1 עיצוב ממשקי כלי עם תיאורים ברורים

### ידע מפתח:
- תיאורי כלי הם **המנגנון העיקרי** ש-LLM משתמש בו לבחירת כלים; תיאורים מינימליים מובילים לבחירה לא-אמינה
- חשיבות הכללת פורמטי קלט, שאילתות לדוגמה, מקרי קצה וגבולות תחולה
- תיאורים דו-משמעיים או חופפים גורמים לניתוב שגוי
- ניסוח system prompt יכול ליצור אסוציאציות לא-רצויות לכלים

### מיומנויות מפתח:
- כתבו תיאורים שמבדילים בבירור כל כלי מחלופות דומות
- שנו שמות כלים כדי לבטל חפיפה פונקציונלית (למשל `analyze_content` -> `extract_web_results`)
- פצלו כלים כלליים למתמחים עם חוזי קלט/פלט ברורים

## 2.2 מימוש תגובות שגיאה מובנות לכלי MCP

### ידע מפתח:
- הדגל `isError` בתגובות כלי MCP
- ההבדל בין **שגיאות transient** (timeouts), **שגיאות validation** (קלט שגוי), **שגיאות business** (הפרות מדיניות), ו**שגיאות גישה/הרשאה**
- שגיאות גנריות ("Operation failed") מונעות החלטות התאוששות נכונות
- ההבדל בין שגיאות retryable ל-non-retryable

### מיומנויות מפתח:
- החזירו מטא-דאטה מובנית כמו `errorCategory` (transient/validation/permission), `isRetryable`, והודעה קריאה לאדם
- השתמשו ב-`retryable: false` להפרות business-rule עם הסברים ברורים למשתמש
- בצעו החלמה מקומית בתוך תת-סוכנים לכשלים transient; הפיצו רק שגיאות שהם לא יכולים לפתור
- הבדילו כשלי גישה (החלטת retry) מתוצאות ריקות תקפות (אין תוצאות)

## 2.3 הקצאת כלים בין סוכנים והגדרת `tool_choice`

### ידע מפתח:
- יותר מדי כלים לסוכן (למשל 18 במקום 4–5) **מפחית** אמינות בחירת כלים
- סוכנים עם כלים מחוץ להתמחותם נוטים להשתמש בהם לרעה
- גישת כלים מצומצמת: רק כלים רלוונטיים לתפקיד ועוד ערכה מוגבלת של utilities בין-תפקידים
- `tool_choice`: `"auto"`, `"any"`, ובחירה כפויה (`{"type": "tool", "name": "..."}`)

### מיומנויות מפתח:
- הגבילו את ערכת הכלים של כל תת-סוכן למה שרלוונטי לתפקידו
- החליפו כלים כלליים בחלופות מוגבלות (למשל `fetch_url` -> `load_document`)
- השתמשו ב-`tool_choice: "any"` להבטחת קריאת כלי במקום תשובה טקסטואלית
- כפו כלי ספציפי כדי להבטיח סדר ביצוע

## 2.4 שילוב שרתי MCP ב-Claude Code וזרימות סוכן

### ידע מפתח:
- היקף שרת MCP: פרויקט (`.mcp.json`) לצוותים לעומת משתמש (`~/.claude.json`) לניסיונות
- החלפת משתני סביבה ב-`.mcp.json` (למשל `${GITHUB_TOKEN}`) לניהול סודות
- כלים מכל שרתי MCP המחוברים מתגלים בחיבור וזמינים בו-זמנית
- MCP resources כ"קטלוגי תוכן" (סיכומי משימות, סכמות DB) להפחתת קריאות כלי חקרניות

### מיומנויות מפתח:
- הגדירו שרתי MCP משותפים ב-`.mcp.json` של הפרויקט עם טוקנים מבוססי env-var
- שמרו שרתים אישיים/ניסיוניים ב-`~/.claude.json`
- העדיפו שרתי MCP קהילתיים על פני שרתים מותאמים אישית לאינטגרציות סטנדרטיות

## 2.5 בחירה ויישום של כלים מובנים (Read, Write, Edit, Bash, Grep, Glob)

### ידע מפתח:
- **Grep**: חיפוש בתוך תוכן קבצים (שמות פונקציות, הודעות שגיאה, imports)
- **Glob**: מציאת קבצים לפי תבניות שם/סיומת
- **Read/Write**: פעולות מלאות על קבצים; **Edit**: שינויים מדויקים דרך התאמות טקסט ייחודיות
- אם Edit נכשל עקב התאמות לא-ייחודיות, fallback ל-Read + Write

### מיומנויות מפתח:
- השתמשו ב-Grep לחיפוש תוכן וב-Glob לגילוי קבצים לפי תבניות
- בנו הבנה הדרגתית: Grep entry points, אז Read לעקיבת flows
- עקבו אחר שימוש בפונקציות דרך מודולי wrapper

---

# דומיין 3: הגדרות Claude Code וזרימות עבודה (20%)

## 3.1 הגדרת CLAUDE.md עם היררכיה, היקף וארגון מודולרי

### ידע מפתח:
- היררכיית CLAUDE.md: משתמש (`~/.claude/CLAUDE.md`), פרויקט (`.claude/CLAUDE.md` או CLAUDE.md בשורש), ורמת תיקייה (CLAUDE.md בתת-תיקיות)
- הגדרות ברמת משתמש חלות רק על משתמש אחד ולא משותפות דרך VCS
- תחביר `@path` להתייחסות לקבצים חיצוניים (למשל `@./standards/coding-style.md`) למודולריות CLAUDE.md
- תיקיית `.claude/rules/` לקבצי כללים ממוקדי-נושא במקום CLAUDE.md מונוליטי

### מיומנויות מפתח:
- אבחנו בעיות היררכיה (חבר צוות חדש מפספס הוראות כי הן ברמת משתמש במקום פרויקט)
- השתמשו ב-`@path` (למשל `@./standards/testing.md`) להכללה סלקטיבית של standards בכל חבילה
- פצלו CLAUDE.md גדול לקבצי `.claude/rules/` מרובים (testing.md, api-conventions.md, deployment.md)

## 3.2 יצירה והגדרה של Custom Slash Commands ו-Skills

### ידע מפתח:
- **פקודות פרויקט** ב-`.claude/commands/` (משותפות דרך VCS) לעומת **פקודות משתמש** ב-`~/.claude/commands/`
- Skills ב-`.claude/skills/` עם frontmatter של `SKILL.md`: `context: fork`, `allowed-tools`, `argument-hint`
- `context: fork` מריץ את ה-skill בהקשר תת-סוכן מבודד כדי שלא יזהם את הסשן הראשי
- ואריאנטי skills אישיים יכולים לחיות ב-`~/.claude/skills/` בשמות שונים

### מיומנויות מפתח:
- שמרו slash commands של פרויקט ב-`.claude/commands/` כדי שכל הצוות יקבל אותן
- השתמשו ב-`context: fork` לבידוד skills עם פלט verbose
- השתמשו ב-`allowed-tools` להגבלת אילו כלים skill יכול להשתמש בהם
- השתמשו ב-`argument-hint` כדי לדרבן מפתחים לפרמטרים נדרשים

## 3.3 שימוש בכללי Path Specific לטעינת מוסכמות מותנית

### ידע מפתח:
- קבצי `.claude/rules/` יכולים לכלול frontmatter YAML עם `paths` להפעלת כללים על בסיס תבניות glob
- כללים מסומני-path נטענים **רק** בעריכת קבצים תואמים, חוסכים הקשר וטוקנים
- כללי path מבוססי-glob יכולים להיות עדיפים על CLAUDE.md ברמת תיקייה כשמוסכמות חלות על הרבה תיקיות (למשל tests)

### מיומנויות מפתח:
- צרו קבצי `.claude/rules/` עם `paths: ["terraform/**/*"]` לטעינה רק בעבודה על קבצים תואמים
- השתמשו בתבניות glob (`**/*.test.tsx`) להחלת מוסכמות לפי סוג קובץ ללא תלות במיקום
- העדיפו כללים מסומני-path על CLAUDE.md ברמת תיקייה כשמוסכמות מתפרסות על ה-codebase

## 3.4 מתי להשתמש במצב תכנון מול ביצוע ישיר

### ידע מפתח:
- **מצב תכנון**: למשימות מורכבות עם שינויים גדולים, מספר גישות סבירות, והחלטות ארכיטקטוניות
- **ביצוע ישיר**: לשינויים פשוטים ומובנים היטב (למשל הוספת validation בודד)
- מצב תכנון מאפשר חקירה בטוחה של ה-codebase לפני ביצוע שינויים
- Explore subagent מבודד פלט discovery מילולי

### מיומנויות מפתח:
- השתמשו במצב תכנון למשימות עם השלכות ארכיטקטוניות (microservices, מיגרציות שנוגעות ל-45+ קבצים)
- השתמשו בביצוע ישיר לתיקונים עם stack trace ברור וקובץ יחיד
- השתמשו ב-Explore subagent כדי למנוע אזילת חלון הקשר במשימות רב-שלביות
- שלבו גישות: תכנון לגילוי, אז ביצוע ליישום

## 3.5 שיפור איטרטיבי לשיפור פרוגרסיבי

### ידע מפתח:
- דוגמאות קונקרטיות של קלט/פלט הן הדרך האפקטיבית ביותר לתקשר ציפיות
- **איטרציה מונחית-בדיקות**: כתבו בדיקות קודם, אז iterate על בסיס כשלים
- דפוס ה"interview": Claude שואל שאלות כדי להעלות שיקולי עיצוב לא-מובנים
- מתי לספק את כל הבעיות בהודעה אחת (תלויות הדדית) לעומת ברצף (עצמאיות)

### מיומנויות מפתח:
- ספקו 2–3 דוגמאות קונקרטיות של קלט/פלט להבהרת דרישות טרנספורמציה
- בנו ערכות בדיקה עם התנהגות צפויה, מקרי קצה ודרישות ביצועים לפני מימוש
- השתמשו בדפוס interview להעלאת היבטי עיצוב (cache invalidation, מצבי כשל)
- ספקו test cases קונקרטיים עם קלטים לדוגמה ופלטים צפויים למקרי קצה

## 3.6 שילוב Claude Code בפייפליין CI/CD

### ידע מפתח:
- הדגל `-p` (או `--print`) למצב לא-אינטראקטיבי בפייפליין אוטומטי
- `--output-format json` ו-`--json-schema` לפלט מובנה ב-CI
- CLAUDE.md מספק הקשר פרויקט (סטנדרטי בדיקות, קריטריוני review) ל-Claude Code שמופעל מ-CI
- **בידוד הקשר סשן**: אותו סשן שייצר קוד הוא פחות אפקטיבי בסקירתו מ-instance עצמאי

### מיומנויות מפתח:
- הריצו Claude Code ב-CI עם `-p` כדי להימנע מתליה על קלט אינטראקטיבי
- השתמשו ב-`--output-format json` + `--json-schema` לתוצאות מובנות (למשל הערות inline על PR)
- כללו תוצאות review קודמות בעת הרצה מחדש אחרי קומיטים חדשים (דווחו רק על בעיות חדשות/לא-מתוקנות)
- תעדו סטנדרטי בדיקות ו-fixtures זמינים ב-CLAUDE.md לשיפור איכות יצירת בדיקות
- כללו קבצי בדיקה קיימים בהקשר בעת יצירת בדיקות חדשות כדי להימנע מכפילות ולשמור על עקביות סגנון

---

# דומיין 4: הנדסת פרומפט ופלט מובנה (20%)

## 4.1 עיצוב פרומפטים עם קריטריונים מפורשים לשיפור דיוק

### ידע מפתח:
- קריטריונים מפורשים אפקטיביים יותר מהוראות מעורפלות (למשל "סמן הערות רק כשהן סותרות את הקוד" מול "בדוק דיוק הערות")
- הנחיה גנרית כמו "תהיה שמרני יותר" עובדת פחות טוב מקריטריונים קטגוריאליים קונקרטיים
- ההשפעה של false positives על אמון מפתחים: שיעורי false-positive גבוהים בקטגוריות מסוימות פוגעים באמון בקטגוריות מדויקות

### מיומנויות מפתח:
- הגדירו קריטריוני review: מה לדווח (באגים, אבטחה) לעומת מה להתעלם (סגנון מינורי)
- בטלו זמנית קטגוריות עם שיעורי false-positive גבוהים
- הגדירו קריטריוני חומרה מפורשים עם דוגמאות קוד לכל רמה

## 4.2 שימוש ב-Few-shot Prompting לשיפור עקביות פלט

### ידע מפתח:
- דוגמאות few-shot הן השיטה האפקטיבית ביותר להפקת פלט עקבי בפורמט וניתן לפעולה
- Few-shot יכול להדגים טיפול במקרים דו-משמעיים (בחירת כלי, פערים בכיסוי בדיקות)
- Few-shot עוזר למודל להכליל לדפוסים חדשים במקום רק לחזור על ברירות מחדל
- Few-shot יכול להפחית הזיות במשימות חילוץ

### מיומנויות מפתח:
- ספקו 2–4 דוגמאות ממוקדות לתרחישים דו-משמעיים עם הצדקה
- כללו דוגמאות few-shot שמדגימות את פורמט הפלט (מיקום, בעיה, חומרה, תיקון מוצע)
- ספקו דוגמאות שמבדילות דפוסי קוד מקובלים מבעיות אמיתיות
- ספקו דוגמאות לחילוץ נכון ממסמכים עם מבנים שונים

## 4.3 אכיפת פלט מובנה עם `tool_use` ו-JSON Schemas

### ידע מפתח:
- `tool_use` עם JSON Schemas הוא הדרך האמינה ביותר להבטיח פלט תואם-סכמה ולבטל שגיאות תחביר JSON
- עם `tool_choice: "auto"` המודל יכול להחזיר טקסט; עם `"any"` הוא חייב לקרוא לכלי; בחירה כפויה בוחרת כלי ספציפי
- JSON Schemas מחמירים מבטלים שגיאות תחביר אך לא מונעים שגיאות סמנטיות (סכומים לא מסתכמים; ערכים בשדות שגויים)
- עיצוב סכמה: שדות required לעומת optional; enums עם "other" ועוד שדה פירוט להרחבה

### מיומנויות מפתח:
- הגדירו כלי חילוץ עם JSON Schemas ופרסרו נתונים מתוצאות `tool_use`
- השתמשו ב-`tool_choice: "any"` להבטחת פלט מובנה כשקיימות מספר סכמות
- כפו קריאה לכלי ספציפי: `tool_choice: {"type": "tool", "name": "extract_metadata"}`
- הפכו שדות לאופציונליים/nullable כשהמקור עשוי לא להכיל מידע, כדי להימנע מבדיית ערכים
- השתמשו בערכי enum כמו `"unclear"` ו-`"other"` ועוד שדות פירוט לקטגוריזציה הניתנת להרחבה

## 4.4 מימוש Validation, Retries ולולאות פידבק לאיכות חילוץ

### ידע מפתח:
- Retry-with-error-feedback: כללו שגיאות validation קונקרטיות בפרומפט ה-retry לכוון תיקונים
- Retries לא אפקטיביים כשהמידע פשוט נעדר מהמקור
- עיצוב לולאת פידבק: עקבו אחר הדפוס שהפעיל ממצא (`detected_pattern`)
- שגיאות סמנטיות (סכומים לא מסתדרים) לעומת שגיאות תחביר (מטופלות על ידי `tool_use`)

### מיומנויות מפתח:
- פרומפטי follow-up עם המסמך המקורי, חילוץ שגוי ושגיאות validation ספציפיות
- זהו מתי retry לא יהיה אפקטיבי (המידע הנדרש רק במסמך חיצוני)
- כללו שדות `detected_pattern` בממצאים לניתוח false positives
- עצבו self-correction על ידי חילוץ גם `calculated_total` וגם `stated_total` לזיהוי אי-התאמות

## 4.5 עיצוב אסטרטגיות יעילות לעיבוד Batch

### ידע מפתח:
- Message Batches API: 50% חיסכון, חלון עיבוד עד 24 שעות, אין הבטחות SLA על latency
- עיבוד batch מתאים למשימות לא-חוסמות (דוחות לילה, audits) ולא מתאים למשימות חוסמות (בדיקות לפני merge)
- Batch API לא תומך ב-multi-turn tool calling בתוך בקשה יחידה
- שדות `custom_id` מקשרים request/response בתוך batches

### מיומנויות מפתח:
- השתמשו ב-API סינכרוני לבדיקות חוסמות; השתמשו ב-Batch API לעומסי לילה/שבועיים
- תכננו cadence הגשת batch על בסיס צרכי SLA (למשל חלונות של 4 שעות להבטחת 30 שעות עם עיבוד 24 שעות)
- טפלו בכשלים על ידי הגשה מחדש רק של מסמכים שנכשלו (מזוהים לפי `custom_id`)
- iterate על פרומפטים תוך שימוש במדגם לפני הרצת עיבוד בקנה מידה גדול

## 4.6 עיצוב ארכיטקטורות review רב-instance ורב-pass

### ידע מפתח:
- מגבלות self-review: המודל שומר את הקשר השיקול שלו ופחות סביר שיאתגר את ההחלטות של עצמו
- Instances ביקורת עצמאיים (בלי הקשר היצירה) טובים יותר במציאת בעיות עדינות
- Multi-pass review: ניתוח מקומי לכל קובץ ועוד pass אינטגרציה בין-קבצים כדי להימנע מדילול תשומת לב

### מיומנויות מפתח:
- השתמשו ב-Claude instance שני עצמאי לסקירת שינויים בלי הקשר היצירה
- פצלו ביקורות רב-קבציות ל-passes לפי קובץ ועוד passes אינטגרציה לניתוח זרימת נתונים בין-קבצים
- השתמשו ב-passes אימות עם ביטחון עצמי לניתוב ביקורות באופן מכויל

---

# דומיין 5: ניהול הקשר ואמינות (15%)

## 5.1 ניהול הקשר שיחה לשימור מידע קריטי

### ידע מפתח:
- סיכוני סיכום פרוגרסיבי: ערכים מספריים, אחוזים ותאריכים מתעבים לסיכומים מעורפלים
- אפקט lost-in-the-middle: מודלים מעבדים אמינות התחלה וסוף של קלטים ארוכים, אבל עלולים לפספס ממצאים מהאמצע
- פלטי כלי יכולים להצטבר בהקשר באופן לא-פרופורציוני לרלוונטיות (40+ שדות כש-5 נחוצים)
- חשיבות שליחת היסטוריית השיחה המלאה בבקשות API עוקבות

### מיומנויות מפתח:
- חלצו עובדות טרנזקציוניות לבלוק "case facts" קבוע מחוץ להיסטוריה המסוכמת
- קצצו פלטי כלי verbose לשדות רלוונטיים
- מקמו ממצאי מפתח בתחילת נתונים מצורפים עם כותרות סקציה מפורשות
- דרשו שתת-סוכנים יכללו מטא-דאטה (תאריכים, מקורות) בפלטים מובנים

## 5.2 עיצוב דפוסי הסלמה אפקטיביים ופתרון דו-משמעיות

### ידע מפתח:
- טריגרי הסלמה מתאימים: בקשה מפורשת לאדם, פערים/חריגים במדיניות, חוסר יכולת להתקדם
- הסלמה מיידית (בקשה מפורשת) לעומת ניסיון פתרון (בתחום הסוכן)
- ניתוח sentiment וביטחון עצמי של המודל הם פרוקסי לא-אמינים למורכבות תיק
- מספר התאמות לקוח דורש בקשת מזהים נוספים, לא ניחוש היוריסטי

### מיומנויות מפתח:
- קריטריוני הסלמה מפורשים עם דוגמאות few-shot ב-system prompt
- בצעו בקשות מפורשות לאדם מיד ללא חקירה נוספת
- הסלימו כשהמדיניות דו-משמעית או שותקת לבקשה ספציפית
- בקשו מזהים נוספים כשתוצאות כלי מכילות מספר התאמות

## 5.3 מימוש אסטרטגיות הפצת שגיאות במערכות רב-סוכניות

### ידע מפתח:
- הקשר שגיאה מובנה (סוג כשל, query, תוצאות חלקיות, חלופות) מאפשר התאוששות חכמה יותר של מתאם
- הבדילו כשלי גישה (timeouts דורשים החלטת retry) מתוצאות ריקות תקפות (אין התאמות)
- סטטוסי שגיאה גנריים ("search unavailable") מסתירים הקשר חשוב מהמתאם
- השתקה שקטה או ביטול כל הזרימה על כשל אחד הם אנטי-פטרנים

### מיומנויות מפתח:
- החזירו הקשר שגיאה מובנה: סוג כשל, מה נוסה, תוצאות חלקיות, חלופות אפשריות
- הבדילו כשלי גישה מתוצאות ריקות תקפות
- בצעו החלמה מקומית בתת-סוכנים לכשלים transient; הפיצו רק שגיאות לא-ניתנות-להתאוששות עם תוצאות חלקיות
- סמנו כיסוי בסינתזה: מה מבוסס היטב לעומת היכן נשארו פערים

## 5.4 ניהול הקשר יעיל בחקירת Codebases גדולים

### ידע מפתח:
- ירידה באיכות הקשר בסשנים ארוכים: המודל מתחיל להפיק תשובות לא-יציבות ומתייחס ל"דפוסים אופייניים" במקום למחלקות ספציפיות
- קבצי Scratchpad משמרים ממצאי מפתח מעבר לגבולות הקשר
- האצלה לתת-סוכנים מבודדת פלט discovery מילולי
- שמירת state מובנה מאפשרת התאוששות מקריסה

### מיומנויות מפתח:
- צרו תת-סוכנים לשאלות ספציפיות תוך שמירה על תיאום ברמה גבוהה בסוכן הראשי
- השתמשו בקבצי scratchpad לאחסון ממצאי מפתח והפניה אליהם בהמשך
- סכמו ממצאי מפתח לפני יצירת תת-סוכני שלב הבא
- השתמשו ב-`/compact` להפחתת שימוש בהקשר בחקירות ארוכות

## 5.5 עיצוב זרימות עם פיקוח אנושי וקליברציית ביטחון

### ידע מפתח:
- מדדים מצרפיים (למשל 97% דיוק כללי) יכולים להסוות ביצועים גרועים בסוגי מסמכים או שדות ספציפיים
- Stratified random sampling מודד שיעורי שגיאה בחילוצים בביטחון גבוה
- קליברציית ביטחון ברמת שדה תוך שימוש בסטים מתויגים
- אמתו דיוק לפי סוג מסמך ומגזר שדה לפני אוטומציה

### מיומנויות מפתח:
- מימשו stratified random sampling לזיהוי דפוסי שגיאה חדשים
- נתחו דיוק לפי סוג מסמך ושדה לאימות ביצועים יציבים
- הוציאו ציוני ביטחון ברמת שדה וכיילו ספי review תוך שימוש בנתונים מתויגים
- נתבו חילוצים בביטחון נמוך או ממקורות עמומים לסקירה אנושית

## 5.6 שימור Provenance וטיפול באי-ודאות בסינתזה רב-מקורית

### ידע מפתח:
- Attribution אובד בסיכום ללא שימור מיפוי "טענה → מקור"
- מיפויים מובנים חייבים להישמר בעת צבירה
- טפלו בסטטיסטיקות סותרות על ידי הערה על קונפליקטים עם attribution במקום בחירה שרירותית של ערך אחד
- כללו תאריכי פרסום/איסוף כדי להימנע מקריאה שגויה של הבדלים זמניים כסתירות

### מיומנויות מפתח:
- דרשו שתת-סוכנים יוציאו מיפויי "טענה → מקור" (URL, שם מסמך, ציטוטים)
- בנו דוחות שמפרידים ממצאים יציבים מאלה הנמצאים במחלוקת
- שמרו ערכים סותרים עם הערות והעבירו אותם למתאם להתאמה
- כללו תאריכי פרסום לפרשנות זמנית נכונה
- רנדרו תוכן לפי סוג: נתונים פיננסיים כטבלאות, חדשות כפרוזה, ממצאים טכניים כרשימות מובנות

---

# דוגמאות שאלות מבחן עם הסברים

## שאלה 1 (תרחיש: Customer Support Agent)

**מצב:** הנתונים מראים שב-12% מהמקרים הסוכן מדלג על `get_customer` וקורא ל-`lookup_order` רק עם שם הלקוח, מה שמוביל להחזרים שגויים.

**איזה שינוי הכי אפקטיבי?**

- A) הוסיפו precondition תוכנתי שחוסם `lookup_order` ו-`process_refund` עד שמתקבל ID מ-`get_customer` **[נכון]**
- B) שפרו את ה-system prompt
- C) הוסיפו דוגמאות few-shot
- D) מימשו מסווג ניתוב

**למה A:** כשלוגיקה עסקית קריטית דורשת רצף כלים מסוים, תוכנה מספקת **הבטחות דטרמיניסטיות** שגישות מבוססות-פרומפט (B, C) לא יכולות. D מטפל בזמינות, לא בסדר כלים.

---

## שאלה 2 (תרחיש: Customer Support Agent)

**מצב:** הסוכן קורא ל-`get_customer` במקום ל-`lookup_order` לשאלות הקשורות בהזמנה. תיאורי הכלים מינימליים ודומים.

**מה הצעד הראשון?**

- A) דוגמאות few-shot
- B) הרחיבו את תיאור כל כלי עם פורמטי קלט, דוגמאות וגבולות **[נכון]**
- C) הוסיפו שכבת ניתוב
- D) מזגו את הכלים

**למה B:** תיאורי כלים הם מנגנון הבחירה העיקרי של המודל. זה התיקון בעלות הנמוכה ביותר עם ההשפעה הגבוהה ביותר. A מוסיף טוקנים בלי לטפל בשורש הבעיה. C זה over-engineering. D דורש יותר מאמץ מהמוצדק.

---

## שאלה 3 (תרחיש: Customer Support Agent)

**מצב:** הסוכן פותר רק 55% מהבעיות במטרת 80%. הוא מסלים מקרים פשוטים ומנסה לטפל באופן אוטונומי בחריגי מדיניות מורכבים.

**איך משפרים את הקליברציה?**

- A) הוסיפו קריטריוני הסלמה מפורשים עם דוגמאות few-shot **[נכון]**
- B) ביטחון עצמי (1–10) עם הסלמה אוטומטית
- C) מסווג נפרד שאומן על נתונים היסטוריים
- D) ניתוח sentiment

**למה A:** מטפל ישירות בשורש הבעיה — גבולות החלטה לא-ברורים. B לא אמין (המודל יכול לטעות בביטחון). C זה over-engineering. D פותר בעיה אחרת (מצב רוח != מורכבות).

---

## שאלה 4 (תרחיש: Code Generation with Claude Code)

**מצב:** אתם צריכים פקודה מותאמת `/review` ל-code review סטנדרטי שזמינה לכל הצוות בעת clone של הריפו.

**איפה ליצור את קובץ הפקודה?**

- A) `.claude/commands/` ב-repo הפרויקט **[נכון]**
- B) `~/.claude/commands/`
- C) `CLAUDE.md` בשורש
- D) `.claude/config.json`

**למה A:** פקודות פרויקט הנשמרות ב-`.claude/commands/` הן version-controlled וזמינות אוטומטית לכולם. B לפקודות אישיות. C להוראות, לא להגדרות פקודה. D לא קיים.

---

## שאלה 5 (תרחיש: Code Generation with Claude Code)

**מצב:** צריך לבצע ארגון מחדש של מונוליט ל-microservices (עשרות קבצים, החלטות גבולות שירות).

**באיזה גישה להשתמש?**

- A) מצב תכנון: חקרו את ה-codebase, הבינו תלויות, עצבו גישה **[נכון]**
- B) ביצוע ישיר הדרגתי
- C) ביצוע ישיר עם הוראות מפורטות מראש
- D) ביצוע ישיר ומעבר לתכנון כשנהיה קשה

**למה A:** מצב תכנון מתוכנן לשינויים גדולים, מספר גישות אפשריות והחלטות ארכיטקטוניות. B מסכן בעבודה חוזרת יקרה. C מניח שאתם כבר יודעים את המבנה. D ריאקטיבי.

---

## שאלה 6 (תרחיש: Code Generation with Claude Code)

**מצב:** ל-codebase יש מוסכמות שונות באזורים שונים (React, API, database). בדיקות ממוקמות יחד עם הקוד. אתם רוצים שמוסכמות יוחלו אוטומטית.

**באיזה גישה להשתמש?**

- A) קבצי `.claude/rules/` עם YAML frontmatter ותבניות glob **[נכון]**
- B) שמו הכל ב-CLAUDE.md בשורש
- C) Skills ב-`.claude/skills/`
- D) CLAUDE.md בכל תיקייה

**למה A:** `.claude/rules/` עם תבניות glob (למשל `**/*.test.tsx`) מאפשר החלת מוסכמות אוטומטית על בסיס נתיבי קבצים — אידיאלי לבדיקות פזורות ב-codebase. B מסתמך על הסקת המודל. C ידני/לפי דרישה. D לא עובד טוב כשקבצים רלוונטיים בהרבה תיקיות.

---

## שאלה 7 (תרחיש: Multi-agent Research System)

**מצב:** המערכת חוקרת "השפעת AI על תעשיות יצירה", אבל הדוחות מכסים רק אמנות חזותית. המתאם פירק את הנושא ל: "AI באמנות דיגיטלית", "AI בעיצוב גרפי", "AI בצילום".

**מה הסיבה?**

- A) סוכן הסינתזה לא מזהה פערים
- B) המתאם פירק את המשימה בצורה צרה מדי **[נכון]**
- C) סוכן חיפוש האינטרנט לא מחפש מספיק יסודית
- D) סוכן ניתוח המסמכים מסנן מקורות לא-חזותיים

**למה B:** הלוגים מראים שהמתאם פירק את "תעשיות יצירה" רק לתת-נושאים חזותיים, מפספס לגמרי מוזיקה, ספרות וקולנוע. תת-הסוכנים ביצעו נכון — הבעיה היא במה שהוקצה להם.

---

## שאלות נוספות

הקובץ המקורי כולל למעלה מ-70 שאלות. המבנה והעקרונות זהים — מקרי שימוש מתרחישי המבחן, ארבע אפשרויות, והסבר למה התשובה הנכונה היא הנכונה. כל אלה מבוססים על העקרונות שכוסו בחלקים I ו-II לעיל. לתרגול מלא, ראו את [practical_test_en.html](practical_test_en.html).

מומלץ להתאמן בשאלות באנגלית כיוון שכך תקבלו את ניסוח השאלות הזהה למבחן האמיתי.

---

# תרגילים מעשיים

## תרגיל 1: סוכן רב-כלים עם לוגיקת הסלמה

**מטרה:** לתכנן לולאת סוכן עם אינטגרציית כלים, טיפול שגיאות מובנה והסלמה.

**שלבים:**
1. הגדירו 3–4 כלי MCP עם תיאורים מפורטים (כללו שני כלים דומים לבחינת בחירת כלי)
2. מימשו לולאת סוכן הבודקת `stop_reason` (`"tool_use"` / `"end_turn"`)
3. הוסיפו תגובות שגיאה מובנות: `errorCategory`, `isRetryable`, תיאור
4. מימשו hook ליירוט שחוסם פעולות מעל סף ומנתב להסלמה
5. בדקו עם בקשות רב-היבטיות

**דומיינים:** 1 (ארכיטקטורת סוכן), 2 (כלים ו-MCP), 5 (הקשר ואמינות)

---

## תרגיל 2: הגדרת Claude Code לפיתוח צוותי

**מטרה:** להגדיר CLAUDE.md, פקודות מותאמות אישית, כללי path ספציפיים ושרתי MCP.

**שלבים:**
1. צרו CLAUDE.md ברמת פרויקט עם סטנדרטי universal
2. צרו קבצי `.claude/rules/` עם YAML frontmatter לאזורי קוד שונים (`paths: ["src/api/**/*"]`, `paths: ["**/*.test.*"]`)
3. צרו skill פרויקט תחת `.claude/skills/` עם `context: fork` ו-`allowed-tools`
4. הגדירו שרת MCP ב-`.mcp.json` עם משתני סביבה + override אישי ב-`~/.claude.json`
5. בדקו מצב תכנון לעומת ביצוע ישיר במשימות בעלות מורכבות שונה

**דומיינים:** 3 (הגדרות Claude Code), 2 (כלים ו-MCP)

---

## תרגיל 3: Pipeline לחילוץ נתונים מובנים

**מטרה:** JSON schemas, `tool_use` לפלט מובנה, לולאות validation/retry, עיבוד batch.

**שלבים:**
1. הגדירו כלי חילוץ עם JSON schema (שדות required/optional, enums עם "other", שדות nullable)
2. בנו לולאת validation: בשגיאה, retry עם המסמך, חילוץ שגוי ושגיאת validation ספציפית
3. הוסיפו דוגמאות few-shot למסמכים עם מבנים שונים
4. השתמשו בעיבוד batch דרך Message Batches API: 100 מסמכים, טיפול בכשלים דרך `custom_id`
5. ניתוב לאדם: ציוני ביטחון ברמת שדה, ניתוח לפי סוג מסמך

**דומיינים:** 4 (הנדסת פרומפט), 5 (הקשר ואמינות)

---

## תרגיל 4: עיצוב ו-debugging של pipeline מחקרי רב-סוכני

**מטרה:** אורקסטרציית תת-סוכנים, העברת הקשר, הפצת שגיאות, סינתזה עם מעקב מקורות.

**שלבים:**
1. מתאם עם 2+ תת-סוכנים (`allowedTools` כולל `"Task"`, הקשר מועבר מפורשות בפרומפטים)
2. הריצו תת-סוכנים במקביל דרך מספר קריאות `Task` בתגובה אחת
3. דרשו פלט תת-סוכן מובנה: טענה, ציטוט, URL מקור, תאריך פרסום
4. דמו timeout של תת-סוכן: החזירו הקשר שגיאה מובנה למתאם והמשיכו עם תוצאות חלקיות
5. בדקו עם נתונים סותרים: שמרו את שני הערכים עם attribution; הפרידו ממצאים מאומתים ממוכרזים

**דומיינים:** 1 (ארכיטקטורת סוכן), 2 (כלים ו-MCP), 5 (הקשר ואמינות)

---

# נספח: טכנולוגיות ומושגים

| טכנולוגיה | היבטי מפתח |
|---|---|
| **Claude Agent SDK** | AgentDefinition, agent loops, `stop_reason`, hooks (PostToolUse), יצירת תת-סוכנים דרך Task, `allowedTools` |
| **Model Context Protocol (MCP)** | שרתי MCP, tools, resources, `isError`, תיאורי כלים, `.mcp.json`, משתני סביבה |
| **Claude Code** | היררכיית CLAUDE.md, `.claude/rules/` עם תבניות glob, `.claude/commands/`, `.claude/skills/` עם SKILL.md, מצב תכנון, `/compact`, `--resume`, `fork_session` |
| **Claude Code CLI** | `-p` / `--print` למצב לא-אינטראקטיבי, `--output-format json`, `--json-schema` |
| **Claude API** | `tool_use` עם JSON schemas, `tool_choice` ("auto"/"any"/forced), `stop_reason`, `max_tokens`, system prompts |
| **Message Batches API** | 50% חיסכון, חלון של עד 24 שעות, `custom_id`, אין multi-turn tool calling |
| **JSON Schema** | Required לעומת optional, שדות nullable, סוגי enum, "other" + פירוט, מצב strict |
| **Pydantic** | אימות סכמה, שגיאות סמנטיות, לולאות validation/retry |
| **כלים מובנים** | Read, Write, Edit, Bash, Grep, Glob — מטרה וקריטריוני בחירה |
| **Few-shot prompting** | דוגמאות ממוקדות למצבים דו-משמעיים, הכללה לדפוסים חדשים |
| **Prompt chaining** | פירוק סדרתי ל-passes ממוקדים |
| **חלון הקשר** | תקציבי טוקנים, סיכום פרוגרסיבי, "lost in the middle", קבצי scratchpad |
| **ניהול סשנים** | Resume, `fork_session`, סשנים בעלי שם, בידוד הקשר |
| **קליברציית ביטחון** | ניקוד ברמת שדה, קליברציה על סטים מתויגים, stratified sampling |

---

# נושאים מחוץ להיקף

הנושאים הסמוכים הבאים **לא** יהיו במבחן:

- Fine-tuning של מודלי Claude או אימון מודלים מותאמים
- אימות Claude API, חיוב או ניהול חשבון
- מימוש מפורט בשפות תכנות או frameworks ספציפיים (מעבר למה שדרוש להגדרת tool/schema)
- פריסה או אירוח של שרתי MCP (תשתית, רשת, container orchestration)
- ארכיטקטורה פנימית של Claude, תהליך אימון או משקלי מודל
- Constitutional AI, RLHF או מתודולוגיות אימון בטיחות
- פרטי מימוש של מודלי embedding או vector database
- Computer use (אוטומציית דפדפן, אינטראקציה דסקטופ)
- יכולות ניתוח תמונה (Vision)
- Streaming API או server-sent events
- Rate limiting, מכסות, או חישובי עלות API מפורטים
- OAuth, סבב API keys, או פרטי פרוטוקול אימות
- הגדרות ספציפיות לספק ענן (AWS, GCP, Azure)
- בנצ'מרקים של ביצועים או מדדי השוואת מודלים
- פרטי מימוש של prompt caching (מעבר לידיעה שזה קיים)
- אלגוריתמי ספירת טוקנים או פרטי tokenization

---

# המלצות הכנה

1. **בנו סוכן עם Claude Agent SDK** — מימשו לולאת סוכן מלאה עם קריאה לכלים, טיפול שגיאות וניהול סשנים. תתאמנו בתת-סוכנים והעברת הקשר מפורשת.

2. **הגדירו Claude Code לפרויקט אמיתי** — השתמשו בהיררכיית CLAUDE.md, כללי path ספציפיים ב-`.claude/rules/`, skills עם `context: fork` ו-`allowed-tools`, ושילוב שרת MCP.

3. **תכננו ובדקו כלי MCP** — כתבו תיאורים שמבדילים כלים דומים, החזירו שגיאות מובנות עם קטגוריות ודגלי retry, ובדקו מול בקשות משתמש דו-משמעיות.

4. **בנו pipeline לחילוץ נתונים** — השתמשו ב-`tool_use` עם JSON schemas, לולאות validation/retry, שדות optional/nullable, ועיבוד batch דרך Message Batches API.

5. **תתאמנו בהנדסת פרומפט** — הוסיפו דוגמאות few-shot לתרחישים דו-משמעיים, קריטריוני review מפורשים, וארכיטקטורות multi-pass ל-code reviews גדולים.

6. **למדו דפוסי ניהול הקשר** — חלצו עובדות מפלטים מילוליים, השתמשו בקבצי scratchpad, והאצילו discovery לתת-סוכנים כדי לטפל בגבולות הקשר.

7. **הבינו הסלמה ו-human-in-the-loop** — מתי להסלים (פערי מדיניות, בקשה מפורשת של משתמש, חוסר יכולת להתקדם) וזרימות ניתוב מבוסס-ביטחון.

8. **קחו מבחן תרגול** לפני האמיתי. הוא משתמש באותם תרחישים ופורמט.

---

> 📝 **על התרגום:** המדריך הזה הוא תרגום עברי של המדריך האנגלי `guide_en.MD`, מותאם להישראלי-טכני. מונחים טכניים (CLAUDE.md, MCP, tool_use, וכו') נשמרו באנגלית לפי המוסכמה הישראלית. דוגמאות קוד, סכמות וערכי enum נשמרו באנגלית כיוון שהם תחביר API.
>
> תרומות לשיפור התרגום מתקבלות בברכה דרך [GitHub Issues](https://github.com/paullarionov/claude-certified-architect/issues).
