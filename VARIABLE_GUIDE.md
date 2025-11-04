# 🔤 Variable Substitution Guide

## Complete Guide to Dynamic Prompt Templates

Welcome to the Variable Substitution Guide! Learn how to create powerful, reusable prompt templates using variables.

---

## 📖 Table of Contents

- [What Are Variables?](#-what-are-variables)
- [Basic Syntax](#-basic-syntax)
- [How It Works](#-how-it-works)
- [Real-World Examples](#-real-world-examples)
- [Best Practices](#-best-practices)
- [Advanced Use Cases](#-advanced-use-cases)
- [Common Mistakes](#-common-mistakes)
- [Tips & Tricks](#-tips--tricks)
- [FAQ](#-faq)

---

## 🎯 What Are Variables?

**Variables** are placeholders in your prompts that you can fill in with different values each time you use them. Instead of creating multiple similar prompts, you create **one template** that adapts to your needs.

### The Problem Variables Solve

**Without Variables:**
```
❌ "Review this Python code for security issues"
❌ "Review this JavaScript code for security issues"
❌ "Review this Java code for security issues"
❌ "Review this Python code for performance issues"
❌ "Review this Python code for best practices"
... and so on (creating dozens of similar prompts!)
```

**With Variables:**
```
✅ "Review this {{language}} code for {{focus_area}}"
   (One prompt that replaces them all!)
```

---

## 📝 Basic Syntax

### The Variable Format

Variables use **double curly braces**:

```
{{variableName}}
```

### Rules for Variable Names

✅ **Valid Variable Names:**
```
{{name}}
{{firstName}}
{{user_name}}
{{level1}}
{{topicOfInterest}}
{{API_KEY}}
```

❌ **Invalid Variable Names:**
```
{name}              // Single braces - won't work
${name}             // Dollar sign - wrong syntax
{{first name}}      // Spaces - not allowed
{{user-name}}       // Hyphens - use underscores instead
{{topic!}}          // Special characters - not allowed
```

### Valid Characters

- **Letters**: a-z, A-Z
- **Numbers**: 0-9
- **Underscores**: _
- **CamelCase**: firstName, lastName
- **snake_case**: first_name, last_name

---

## ⚙️ How It Works

### Step-by-Step Process

**1. Create a Prompt with Variables**
```
Explain {{concept}} to a {{audience}} audience.
Use examples related to {{interest}}.
```

**2. Use the Prompt**
- Click on the prompt from the right-click menu or popup
- A modal window appears with input fields

**3. Fill in the Variables**
```
concept: "Quantum Computing"
audience: "high school"
interest: "video games"
```

**4. Get the Final Result**
```
Explain Quantum Computing to a high school audience.
Use examples related to video games.
```

**5. Automatic Copy**
- The final text is automatically copied to your clipboard
- Paste it anywhere (Ctrl+V / Cmd+V)

---

## 🌟 Real-World Examples

### Example 1: Code Review Template

**Template:**
```
Review this {{language}} code for the following:

1. {{focus_area_1}} issues
2. {{focus_area_2}} concerns
3. {{focus_area_3}} improvements

Target audience: {{experience_level}} developers
Framework: {{framework}}

Provide specific suggestions with code examples.
```

**Usage Scenario:**
```
language: Python
focus_area_1: Security
focus_area_2: Performance
focus_area_3: Maintainability
experience_level: Junior
framework: Django
```

**Result:**
```
Review this Python code for the following:

1. Security issues
2. Performance concerns
3. Maintainability improvements

Target audience: Junior developers
Framework: Django

Provide specific suggestions with code examples.
```

---

### Example 2: Email Writer

**Template:**
```
Write a {{tone}} email to {{recipient}} regarding {{subject}}.

Context:
{{context}}

Key points to include:
- {{point_1}}
- {{point_2}}
- {{point_3}}

Desired outcome: {{desired_outcome}}

Keep it {{length}} and {{formality}}.
```

**Usage Scenario:**
```
tone: professional
recipient: my manager
subject: project deadline extension
context: The API integration is taking longer than expected
point_1: Current progress status
point_2: Remaining challenges
point_3: Proposed new timeline
desired_outcome: Approval for 2-week extension
length: concise
formality: respectful but direct
```

---

### Example 3: Learning Assistant

**Template:**
```
I'm learning about {{topic}} in {{subject}}.

My current level: {{level}}
Learning style: {{learning_style}}

Please explain {{topic}} using:
1. Simple {{analogy_type}} analogies
2. Real-world examples from {{industry}}
3. {{num_practice}} practice questions

Focus on: {{focus_aspect}}
```

**Usage Scenario:**
```
topic: Binary Search Trees
subject: Computer Science
level: Beginner
learning_style: Visual
analogy_type: everyday life
industry: cooking
num_practice: 3
focus_aspect: understanding traversal methods
```

---

### Example 4: Content Creation

**Template:**
```
Create a {{content_type}} about {{topic}} for {{platform}}.

Target audience: {{audience}}
Tone: {{tone}}
Length: {{length}}
Goal: {{goal}}

Include:
- {{element_1}}
- {{element_2}}
- {{element_3}}

SEO keywords: {{keywords}}
Call-to-action: {{cta}}
```

**Usage Scenario:**
```
content_type: blog post
topic: sustainable living tips
platform: Medium
audience: young professionals
tone: inspirational and practical
length: 800-1000 words
goal: increase engagement
element_1: Statistics about climate change
element_2: 5 actionable tips
element_3: Personal story
keywords: sustainability, eco-friendly, green living
cta: subscribe to newsletter
```

---

### Example 5: Bug Report Template

**Template:**
```
Bug Report: {{bug_title}}

Environment:
- OS: {{operating_system}}
- Browser/App: {{application}}
- Version: {{version}}

Steps to Reproduce:
{{steps}}

Expected Behavior:
{{expected}}

Actual Behavior:
{{actual}}

Severity: {{severity}}
Priority: {{priority}}

Additional Context:
{{context}}
```

**Usage Scenario:**
```
bug_title: Login button not responding
operating_system: Windows 11
application: Chrome
version: 120.0.6099.129
steps: 1. Navigate to /login 2. Fill credentials 3. Click login button
expected: User should be redirected to dashboard
actual: Button click has no effect, no error message
severity: High
priority: Critical
context: Happens only on Windows, works fine on Mac
```

---

### Example 6: Meeting Notes Template

**Template:**
```
Meeting Notes: {{meeting_title}}

Date: {{date}}
Attendees: {{attendees}}
Duration: {{duration}}

Agenda:
{{agenda}}

Key Discussion Points:
1. {{point_1}}
2. {{point_2}}
3. {{point_3}}

Decisions Made:
{{decisions}}

Action Items:
- {{action_1}} - Owner: {{owner_1}} - Due: {{due_1}}
- {{action_2}} - Owner: {{owner_2}} - Due: {{due_2}}

Next Meeting: {{next_meeting}}
```

---

### Example 7: Social Media Post

**Template:**
```
Create a {{platform}} post about {{topic}}.

Brand voice: {{brand_voice}}
Target audience: {{audience}}
Post goal: {{goal}}

Include:
- Hook: {{hook_style}}
- {{num_tips}} key points
- Hashtags: {{hashtags}}
- Emoji usage: {{emoji_level}}

Character limit: {{char_limit}}
```

**Usage Scenario:**
```
platform: LinkedIn
topic: productivity tips for remote workers
brand_voice: professional yet friendly
audience: remote professionals aged 25-40
goal: drive engagement and comments
hook_style: question-based
num_tips: 3
hashtags: #RemoteWork #Productivity #WorkFromHome
emoji_level: moderate (2-3 emojis)
char_limit: 1300
```

---

### Example 8: API Documentation

**Template:**
```
Document the {{endpoint_name}} API endpoint.

Endpoint: {{http_method}} {{endpoint_path}}
Purpose: {{purpose}}

Request Parameters:
{{parameters}}

Request Body ({{body_format}}):
{{request_body}}

Success Response ({{success_code}}):
{{success_response}}

Error Responses:
{{error_responses}}

Authentication: {{auth_type}}
Rate Limiting: {{rate_limit}}

Example Usage in {{language}}:
{{example_code}}
```

---

### Example 9: User Story Template

**Template:**
```
User Story: {{story_title}}

As a {{user_role}},
I want to {{action}},
So that {{benefit}}.

Acceptance Criteria:
- {{criteria_1}}
- {{criteria_2}}
- {{criteria_3}}

Technical Notes:
{{technical_notes}}

Estimation: {{story_points}} story points
Priority: {{priority}}
Sprint: {{sprint}}

Dependencies: {{dependencies}}
```

---

### Example 10: Product Review Template

**Template:**
```
Write a detailed review of {{product_name}}.

Category: {{category}}
Price Range: {{price}}
Target Audience: {{audience}}

Review Structure:
1. Overview ({{overview_tone}})
2. Key Features:
   - {{feature_1}}
   - {{feature_2}}
   - {{feature_3}}
3. Pros and Cons
4. {{comparison_type}} comparison with {{competitor}}
5. Final Rating: {{rating}}/10

Writing Style: {{style}}
Review Length: {{length}} words
```

---

## ✨ Best Practices

### 1. Use Descriptive Variable Names

❌ **Bad:**
```
Review this {{x}} code for {{y}} issues.
```

✅ **Good:**
```
Review this {{language}} code for {{security_concern}} issues.
```

**Why?** When the modal appears, you'll see clear labels for each field.

---

### 2. Keep Variables Simple and Clear

❌ **Too Complex:**
```
{{thisIsAnExtremelyLongVariableNameThatIsHardToRead}}
```

✅ **Just Right:**
```
{{description}}
{{targetAudience}}
```

---

### 3. Group Related Variables Logically

✅ **Good Organization:**
```
Analyze {{topic}} for:

User Information:
- Name: {{user_name}}
- Level: {{user_level}}
- Goal: {{user_goal}}

Content Requirements:
- Format: {{content_format}}
- Length: {{content_length}}
- Style: {{content_style}}
```

---

### 4. Provide Context in Your Prompt

✅ **Helpful:**
```
Explain {{concept}} to a {{audience}} audience.
Use {{style}} explanations.
Include {{num_examples}} examples from {{domain}}.
```

The prompt text itself guides what to fill in each variable!

---

### 5. Use Default Values in Descriptions

When naming variables, hint at common values:

```
{{tone}}           → professional, casual, friendly
{{length}}         → short, medium, long
{{audience}}       → beginners, intermediate, advanced
{{format}}         → bullet points, paragraph, outline
```

---

### 6. Combine Fixed and Variable Content

✅ **Good Balance:**
```
You are an expert {{specialty}} with {{years}} years of experience.

Analyze the following {{item_type}}:
{{content}}

Focus specifically on:
1. {{focus_1}}
2. {{focus_2}}

Provide actionable recommendations.
```

The fixed parts provide structure, variables provide flexibility.

---

## 🚀 Advanced Use Cases

### Multi-Language Prompts

**Template:**
```
Translate the following from {{source_language}} to {{target_language}}.

Source text:
{{text}}

Translation style: {{style}}
Formality: {{formality}}
Regional variant: {{variant}}

Preserve: {{preserve_elements}}
```

---

### Research Assistant

**Template:**
```
Research {{topic}} focusing on {{time_period}}.

Sources to prioritize: {{source_types}}
Depth level: {{depth}}

Provide:
1. {{num_key_findings}} key findings
2. {{perspective}} perspective analysis
3. Implications for {{application_area}}

Format: {{output_format}}
Citation style: {{citation_style}}
```

---

### Code Generator

**Template:**
```
Generate {{code_type}} code in {{language}}.

Requirements:
- Framework: {{framework}}
- Use {{design_pattern}} pattern
- Include {{error_handling}} error handling
- Add {{testing_type}} tests
- Follow {{coding_standard}} standards

Functionality:
{{functionality_description}}

Additional libraries: {{libraries}}
```

---

### Interview Preparation

**Template:**
```
Prepare me for a {{role}} interview at a {{company_type}} company.

Focus Areas:
1. {{skill_area_1}}
2. {{skill_area_2}}
3. {{skill_area_3}}

Interview Type: {{interview_type}}
Difficulty Level: {{difficulty}}
Time to Prepare: {{prep_time}}

Include:
- {{num_questions}} practice questions
- {{feedback_type}} feedback approach
- Tips for {{company_size}} companies
```

---

## ❌ Common Mistakes

### Mistake 1: Wrong Syntax

❌ **Wrong:**
```
Review {language} code          // Single braces
Review ${language} code         // Dollar sign
Review [language] code          // Square brackets
```

✅ **Correct:**
```
Review {{language}} code        // Double curly braces
```

---

### Mistake 2: Spaces in Variable Names

❌ **Wrong:**
```
{{first name}}
{{user email}}
{{target audience}}
```

✅ **Correct:**
```
{{firstName}} or {{first_name}}
{{userEmail}} or {{user_email}}
{{targetAudience}} or {{target_audience}}
```

---

### Mistake 3: Special Characters

❌ **Wrong:**
```
{{user-name}}          // Hyphens
{{email@address}}      // @ symbol
{{topic!}}            // Exclamation
{{question?}}         // Question mark
```

✅ **Correct:**
```
{{userName}}
{{emailAddress}}
{{topic}}
{{question}}
```

---

### Mistake 4: Nested Variables

❌ **Doesn't Work:**
```
{{user_{{type}}}}               // Nested variables
{{topic_{{level}}_info}}        // Won't parse correctly
```

✅ **Alternative:**
```
{{user_type}}
{{topic_level_info}}
```

---

### Mistake 5: Too Many Variables

❌ **Overwhelming:**
```
Write a {{adj1}} {{content_type}} about {{topic}} for {{platform}}
using {{tone1}} and {{tone2}} tone for {{audience1}} and {{audience2}}
in {{format1}} or {{format2}} with {{element1}}, {{element2}},
{{element3}}, {{element4}}, and {{element5}}...
```

✅ **Better:**
```
Write a {{content_type}} about {{topic}} for {{platform}}.
Tone: {{tone}}
Audience: {{audience}}
Include: {{key_elements}}
```

**Tip:** Group related information when possible.

---

## 💡 Tips & Tricks

### Tip 1: Create Template Libraries

Organize variables by category:

**Writing Templates:**
- `{{tone}}`, `{{audience}}`, `{{style}}`, `{{length}}`

**Code Templates:**
- `{{language}}`, `{{framework}}`, `{{pattern}}`, `{{test_type}}`

**Research Templates:**
- `{{topic}}`, `{{depth}}`, `{{sources}}`, `{{format}}`

---

### Tip 2: Reuse Variable Names Across Prompts

Use consistent names like:
- `{{language}}` for programming languages
- `{{tone}}` for writing style
- `{{audience}}` for target readers
- `{{level}}` for difficulty/expertise

**Why?** You'll remember them easily and fill them faster!

---

### Tip 3: Use Numbered Variables for Lists

When you need multiple similar inputs:

```
Key points to cover:
1. {{point_1}}
2. {{point_2}}
3. {{point_3}}
4. {{point_4}}
5. {{point_5}}
```

Or:

```
Action items:
- {{action_1}} - Owner: {{owner_1}}
- {{action_2}} - Owner: {{owner_2}}
- {{action_3}} - Owner: {{owner_3}}
```

---

### Tip 4: Include Optional Sections

```
Review {{topic}}.

{{additional_context}}

Focus on: {{focus_area}}

{{special_instructions}}
```

Leave `{{additional_context}}` and `{{special_instructions}}` empty if not needed.

---

### Tip 5: Document Your Templates

Add a comment at the top:

```
// Template: Professional Email Writer
// Variables: recipient, subject, tone, key_points, desired_outcome
// Use for: Client communications, internal requests, follow-ups

Write a {{tone}} email to {{recipient}}...
```

---

### Tip 6: Test with Sample Data

Before saving, test your template:

```
Variable: {{language}} → Test with: "Python", "JavaScript", "Java"
Variable: {{audience}} → Test with: "beginners", "experts"
Variable: {{length}} → Test with: "2 paragraphs", "500 words"
```

---

### Tip 7: Version Your Templates

Use the version history feature to track improvements:

```
v1: Basic template with 3 variables
v2: Added {{context}} and {{constraints}}
v3: Restructured with numbered points
v4: Added optional {{examples}} section
```

---

## ❓ FAQ

### Q1: How many variables can I use in one prompt?

**A:** There's no hard limit, but for best usability:
- **Recommended:** 3-8 variables
- **Comfortable:** Up to 10 variables
- **Maximum:** 15-20 variables (but consider breaking into multiple prompts)

---

### Q2: Can I use the same variable name multiple times?

**A:** Yes! The same value will be used for all instances:

```
Explain {{topic}} in simple terms.

First, define {{topic}}.
Then, provide examples of {{topic}}.
Finally, explain why {{topic}} matters.
```

Fill in `{{topic}}` once, it applies everywhere!

---

### Q3: Can I have optional variables?

**A:** Yes! Just leave the input field empty:

```
Analyze {{main_topic}}.

{{additional_context}}

Focus on {{aspect}}.
```

If you leave `{{additional_context}}` empty, you'll get:

```
Analyze Machine Learning.


Focus on neural networks.
```

(Extra blank line appears - this is expected)

---

### Q4: What happens if I forget to fill in a variable?

**A:** The variable placeholder remains in the text:

```
Input: Review this {{language}} code.
If you don't fill {{language}}: "Review this {{language}} code."
```

**Tip:** Always check the final output before using it!

---

### Q5: Can I use variables for AI model instructions?

**A:** Absolutely! This is a great use case:

```
You are a {{role}} with expertise in {{expertise}}.
Your task is to {{task}}.
Use a {{tone}} tone and provide {{output_type}} output.
```

---

### Q6: Can I include example values in the prompt?

**A:** Yes, but they won't be interactive:

```
Explain {{topic}}.
(Examples: quantum computing, machine learning, blockchain)

Audience: {{audience}}
(Examples: high school students, professionals, experts)
```

The text in parentheses is just guidance - variables are the `{{name}}` parts.

---

### Q7: Do variables work with all LLM platforms?

**A:** Yes! Variables are processed **before** sending to the LLM:

1. You fill in variables
2. Extension replaces `{{variable}}` with your values
3. Final text is copied
4. You paste into ChatGPT/Claude/Gemini/etc.

The LLM sees the final text, not the variables.

---

### Q8: Can I export and share prompts with variables?

**A:** Yes! Variables are preserved:
- ✅ Export to JSON: Variables included
- ✅ Share codes: Variables work
- ✅ Import: Variables functional
- ✅ Cloud sync: Variables preserved

---

### Q9: Can I use variables in prompt names?

**A:** No, variables only work in the prompt **text** field, not the name field.

❌ **Doesn't work:** Name: "Review {{language}} Code"
✅ **Works:** Name: "Code Review Template", Text: "Review {{language}} code"

---

### Q10: How do I update a variable template?

**A:** Edit the prompt normally:
1. Click ✏️ (edit) button
2. Modify variable names or add new ones
3. Save changes
4. A new version is created automatically

Old versions are preserved in history!

---

## 🎓 Practice Exercises

Try creating these variable templates yourself:

### Exercise 1: Basic
Create a template for asking LLMs to explain any concept to any audience level.

<details>
<summary>View Solution</summary>

```
Explain {{concept}} to someone at a {{level}} level.
Use {{style}} language and provide {{num_examples}} examples.
```
</details>

---

### Exercise 2: Intermediate
Create a template for generating social media posts for any platform.

<details>
<summary>View Solution</summary>

```
Create a {{platform}} post about {{topic}}.

Tone: {{tone}}
Length: {{length}}
Goal: {{goal}}

Include:
- Engaging hook
- {{num_points}} key points
- Call-to-action: {{cta}}
- Hashtags: {{hashtags}}
```
</details>

---

### Exercise 3: Advanced
Create a template for conducting code reviews that adapts to any language and focus area.

<details>
<summary>View Solution</summary>

```
Review this {{language}} code for a {{project_type}} project.

Focus Areas:
1. {{focus_1}} (High Priority)
2. {{focus_2}} (Medium Priority)
3. {{focus_3}} (Nice to Have)

Context:
- Framework: {{framework}}
- Team size: {{team_size}}
- Developer level: {{dev_level}}

Provide:
- Specific issues with line references
- Severity ratings
- Actionable suggestions
- Code examples for improvements

Output format: {{format}}
```
</details>

---

## 🎉 You're Ready!

You now know everything about using variables in the LLM Prompt Manager:

✅ Basic syntax and rules
✅ Real-world examples
✅ Best practices
✅ Common mistakes to avoid
✅ Advanced techniques
✅ Tips and tricks

### Next Steps:

1. **Create your first variable template**
2. **Test it with different values**
3. **Refine based on results**
4. **Share your best templates with the community!**

---

## 📚 Additional Resources

- 📖 [Main User Guide](USER_GUIDE.md) - Complete extension documentation
- 🚀 [README](README.md) - Quick start and features
- 💬 [GitHub Issues](https://github.com/yourusername/LLM-Prompt-Tool/issues) - Get help

---

<div align="center">

**Made with ❤️ for the LLM Community**

*One template, infinite possibilities. 🔤*

[⬆ Back to Top](#-variable-substitution-guide)

</div>
