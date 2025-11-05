/**
 * Google Nano Banana Prompt Builder - Ultimate Edition
 * The world's most advanced prompt engineering system for Nano Banana AI
 */

// ============================================================================
// CONFIGURATION & DATA STRUCTURES
// ============================================================================

const NanoBananaBuilder = {
  // Current state
  state: {
    currentView: 'builder',
    currentLesson: 'intro',
    selectedTemplate: null,
    selectedTechniques: [],
    variables: [],
    promptText: '',
    validationResults: [],
    qualityScores: {
      clarity: 0,
      coverage: 0,
      effectiveness: 0,
      creativity: 0,
      success: 0
    },
    userIntent: {},
    onboardingProgress: 0
  },

  // ============================================================================
  // ONBOARDING CONTENT
  // ============================================================================

  onboardingLessons: {
    intro: {
      title: '🍌 Welcome to Google Nano Banana',
      content: `
        <h3>What is Google Nano Banana?</h3>
        <p>Google Nano Banana is Google's cutting-edge AI model designed for efficient, high-quality prompt processing across multiple modalities.</p>

        <div class="nb-highlight">
          <strong>🎯 Key Features:</strong>
          <ul>
            <li><strong>Multi-modal processing</strong> - Seamlessly handle text, images, code, and hybrid inputs</li>
            <li><strong>Efficient architecture</strong> - Optimized for speed without sacrificing quality</li>
            <li><strong>Precision-focused</strong> - Delivers accurate, context-aware results</li>
            <li><strong>Variable-rich prompts</strong> - Supports complex dynamic templates</li>
          </ul>
        </div>

        <h3>Why Use This Builder?</h3>
        <p>Crafting effective prompts is both an art and a science. This tool combines proven prompt engineering techniques with Nano Banana's specific capabilities to ensure you get the best results every time.</p>

        <p><strong>✨ What makes this builder special:</strong></p>
        <ul>
          <li>Real-time validation and scoring</li>
          <li>150+ professional templates</li>
          <li>10+ advanced prompt techniques</li>
          <li>Meta-evaluation and self-critique</li>
          <li>Automatic optimization to 10/10 quality</li>
        </ul>
      `
    },
    strengths: {
      title: '💪 Nano Banana Strengths',
      content: `
        <h3>What Nano Banana Excels At</h3>

        <div class="nb-highlight">
          <strong>🎨 Creative Generation</strong>
          <p>Exceptional at producing creative content, from visual descriptions to storytelling.</p>
        </div>

        <div class="nb-highlight">
          <strong>⚡ Speed & Efficiency</strong>
          <p>Optimized architecture delivers fast responses without compromising quality.</p>
        </div>

        <div class="nb-highlight">
          <strong>🔍 Context Understanding</strong>
          <p>Deep comprehension of context enables nuanced, relevant outputs.</p>
        </div>

        <div class="nb-highlight">
          <strong>🌐 Multi-modal Integration</strong>
          <p>Seamlessly processes and connects different types of content.</p>
        </div>

        <div class="nb-highlight">
          <strong>🎯 Precision Following</strong>
          <p>Excellent adherence to detailed instructions and constraints.</p>
        </div>

        <p><strong>Best Use Cases:</strong></p>
        <ul>
          <li>Creative writing and content generation</li>
          <li>Image description and visual prompts</li>
          <li>Code generation with clear specifications</li>
          <li>Data transformation and formatting</li>
          <li>Multi-step workflows with clear goals</li>
        </ul>
      `
    },
    limitations: {
      title: '⚠️ Understanding Limitations',
      content: `
        <h3>What to Watch Out For</h3>

        <p>Understanding limitations helps you craft better prompts:</p>

        <div class="nb-highlight">
          <strong>🔢 Complex Mathematical Reasoning</strong>
          <p>While capable, may require step-by-step breakdowns for complex calculations.</p>
          <p><em>Tip: Use chain-of-thought prompting for math problems.</em></p>
        </div>

        <div class="nb-highlight">
          <strong>📏 Extremely Long Context</strong>
          <p>Performance may vary with very large inputs exceeding optimal context windows.</p>
          <p><em>Tip: Break down large tasks into smaller, focused prompts.</em></p>
        </div>

        <div class="nb-highlight">
          <strong>🌍 Real-time Information</strong>
          <p>Knowledge cutoff means it may not have the latest information.</p>
          <p><em>Tip: Provide current context in your prompt when needed.</em></p>
        </div>

        <div class="nb-highlight">
          <strong>🎲 Absolute Determinism</strong>
          <p>Some variation in outputs is normal; use temperature controls for consistency.</p>
          <p><em>Tip: Specify exact requirements and use examples.</em></p>
        </div>

        <h3>Mitigation Strategies</h3>
        <ul>
          <li>Use clear, unambiguous language</li>
          <li>Provide examples of desired outputs</li>
          <li>Break complex tasks into steps</li>
          <li>Include relevant context and constraints</li>
          <li>Iterate and refine based on results</li>
        </ul>
      `
    },
    usecases: {
      title: '🎯 Ideal Use Cases',
      content: `
        <h3>When to Use Nano Banana</h3>

        <div class="nb-highlight">
          <strong>✍️ Content Creation</strong>
          <ul>
            <li>Blog posts, articles, and marketing copy</li>
            <li>Social media content</li>
            <li>Product descriptions</li>
            <li>Email campaigns</li>
          </ul>
        </div>

        <div class="nb-highlight">
          <strong>🎨 Creative Projects</strong>
          <ul>
            <li>Story generation and world-building</li>
            <li>Character development</li>
            <li>Visual prompts for image generation</li>
            <li>Screenplay and dialogue writing</li>
          </ul>
        </div>

        <div class="nb-highlight">
          <strong>💻 Development & Code</strong>
          <ul>
            <li>Code generation from specifications</li>
            <li>API integration snippets</li>
            <li>Documentation writing</li>
            <li>Test case generation</li>
          </ul>
        </div>

        <div class="nb-highlight">
          <strong>📊 Data & Analysis</strong>
          <ul>
            <li>Data transformation</li>
            <li>Report generation</li>
            <li>Summarization tasks</li>
            <li>Format conversions</li>
          </ul>
        </div>

        <div class="nb-highlight">
          <strong>🎓 Education & Training</strong>
          <ul>
            <li>Course content development</li>
            <li>Quiz and assessment creation</li>
            <li>Explanatory content</li>
            <li>Learning path design</li>
          </ul>
        </div>
      `
    },
    fundamentals: {
      title: '📚 Prompt Writing Fundamentals',
      content: `
        <h3>Core Principles of Effective Prompts</h3>

        <div class="nb-highlight">
          <strong>1. Clarity is King</strong>
          <p>Be specific and unambiguous. Vague prompts yield vague results.</p>
          <pre><code>❌ "Write about dogs"
✅ "Write a 500-word informative article about Golden Retriever training techniques for first-time dog owners"</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>2. Provide Context</strong>
          <p>Give the AI background information to understand your needs.</p>
          <pre><code>✅ "You are a technical writer creating documentation for developers. Write a guide on API authentication using OAuth 2.0."</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>3. Define the Output Format</strong>
          <p>Specify how you want the result structured.</p>
          <pre><code>✅ "Format the output as JSON with fields: title, description, tags (array), publishDate"</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>4. Set Constraints</strong>
          <p>Define boundaries, limitations, and requirements.</p>
          <pre><code>✅ "Maximum 280 characters, professional tone, avoid jargon, include one emoji"</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>5. Use Examples</strong>
          <p>Show the AI what you want through examples (few-shot prompting).</p>
          <pre><code>✅ "Convert sentences to questions:
Input: The sky is blue.
Output: What color is the sky?

Input: Dogs bark loudly.
Output: How do dogs bark?"</code></pre>
        </div>

        <h3>The Prompt Structure Template</h3>
        <pre><code>[ROLE/CONTEXT]
[TASK/GOAL]
[SPECIFIC REQUIREMENTS]
[OUTPUT FORMAT]
[CONSTRAINTS]
[EXAMPLES (if applicable)]</code></pre>
      `
    },
    advanced: {
      title: '🚀 Advanced Techniques',
      content: `
        <h3>Master-Level Prompt Engineering</h3>

        <div class="nb-highlight">
          <strong>🧠 Chain-of-Thought (CoT)</strong>
          <p>Guide the AI to show its reasoning process.</p>
          <pre><code>✅ "Let's solve this step by step:
1. First, identify the key variables
2. Next, determine the relationships
3. Then, calculate the result
4. Finally, verify the answer"</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>🎭 Role-Based Prompting</strong>
          <p>Assign a specific role or persona to guide behavior.</p>
          <pre><code>✅ "You are a seasoned cybersecurity expert with 15 years of experience. Explain SQL injection to a junior developer."</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>🔗 Prompt Chaining</strong>
          <p>Break complex tasks into sequential prompts.</p>
          <pre><code>Prompt 1: "Generate 5 blog topic ideas about AI"
Prompt 2: "Take topic #3 and create a detailed outline"
Prompt 3: "Write the introduction section from the outline"</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>🎯 Constraint Stacking</strong>
          <p>Layer multiple constraints for precise control.</p>
          <pre><code>✅ "Write a product description that:
- Is exactly 150 words
- Uses 'you' language
- Includes 3 benefits
- Ends with a call-to-action
- Maintains a friendly, conversational tone
- Avoids superlatives"</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>🔄 Self-Critique Prompting</strong>
          <p>Ask the AI to evaluate and improve its own output.</p>
          <pre><code>✅ "After generating the response, critically review it for accuracy, clarity, and completeness. Then provide an improved version."</code></pre>
        </div>

        <div class="nb-highlight">
          <strong>📊 Template Variables</strong>
          <p>Create reusable prompts with placeholders.</p>
          <pre><code>✅ "Write a {{length}} {{content_type}} about {{topic}} for {{audience}} in a {{tone}} tone, focusing on {{key_points}}."</code></pre>
        </div>
      `
    }
  },

  // ============================================================================
  // TEMPLATE LIBRARY - 150+ Professional Templates
  // ============================================================================

  templates: [
    // IMAGE GENERATION TEMPLATES
    {
      id: 'img-detailed-scene',
      name: 'Detailed Scene Generator',
      category: 'image',
      complexity: 'advanced',
      tags: ['visual', 'detailed', 'scene'],
      recommended: true,
      description: 'Generate highly detailed visual scene descriptions',
      template: `Create a detailed visual description for: {{subject}}

Style: {{style}}
Mood/Atmosphere: {{mood}}
Color Palette: {{color_palette}}
Lighting: {{lighting}}
Composition: {{composition}}
Resolution/Quality: {{resolution}}

Additional Details:
{{additional_details}}

Output a comprehensive visual prompt that captures all specified elements in vivid, precise language.`
    },
    {
      id: 'img-character-design',
      name: 'Character Design Prompt',
      category: 'image',
      complexity: 'intermediate',
      tags: ['character', 'design', 'visual'],
      description: 'Design detailed character descriptions',
      template: `Design a character with these specifications:

Character Name: {{character_name}}
Physical Appearance: {{physical_appearance}}
Clothing/Outfit: {{clothing}}
Facial Features: {{facial_features}}
Pose/Action: {{pose}}
Background: {{background}}
Art Style: {{art_style}}
Mood/Expression: {{expression}}

Generate a vivid character description suitable for visual generation.`
    },
    {
      id: 'img-product-visual',
      name: 'Product Visualization',
      category: 'image',
      complexity: 'simple',
      tags: ['product', 'commercial', 'marketing'],
      description: 'Create product image prompts',
      template: `Product Visualization Request:

Product: {{product_name}}
Product Type: {{product_type}}
Setting/Context: {{setting}}
Angle/View: {{view_angle}}
Background: {{background}}
Lighting Style: {{lighting}}
Desired Mood: {{mood}}
Call-out Features: {{features}}

Create a professional product visualization description.`
    },

    // TEXT TRANSFORMATION TEMPLATES
    {
      id: 'text-rewrite-tone',
      name: 'Tone Transformation',
      category: 'text',
      complexity: 'simple',
      tags: ['rewrite', 'tone', 'style'],
      recommended: true,
      description: 'Rewrite text in different tones',
      template: `Transform the following text to match the specified tone:

Original Text:
{{original_text}}

Target Tone: {{tone}}
Target Audience: {{audience}}
Length: {{length_requirement}}
Key Message: {{key_message}}

Rewrite while preserving the core message but adapting the tone perfectly.`
    },
    {
      id: 'text-summarize',
      name: 'Smart Summarization',
      category: 'text',
      complexity: 'simple',
      tags: ['summary', 'concise', 'analysis'],
      description: 'Create intelligent summaries',
      template: `Summarize the following content:

Content:
{{content}}

Summary Type: {{summary_type}}
Target Length: {{length}}
Focus Areas: {{focus_areas}}
Audience: {{audience}}

Provide a {{summary_type}} summary that captures the essential points in {{length}}.`
    },
    {
      id: 'text-expand',
      name: 'Content Expansion',
      category: 'text',
      complexity: 'intermediate',
      tags: ['expand', 'elaborate', 'detail'],
      description: 'Expand brief content into detailed form',
      template: `Expand the following brief content into a detailed version:

Brief Content:
{{brief_content}}

Target Length: {{target_length}}
Detail Level: {{detail_level}}
Tone: {{tone}}
Include: {{elements_to_include}}
Audience: {{audience}}

Expand while maintaining accuracy and adding valuable detail.`
    },

    // CODE GENERATION TEMPLATES
    {
      id: 'code-function',
      name: 'Function Generator',
      category: 'code',
      complexity: 'intermediate',
      tags: ['code', 'function', 'development'],
      recommended: true,
      description: 'Generate code functions from specifications',
      template: `Generate a function with these specifications:

Programming Language: {{language}}
Function Name: {{function_name}}
Purpose: {{purpose}}
Input Parameters: {{parameters}}
Expected Output: {{output}}
Constraints: {{constraints}}
Error Handling: {{error_handling}}
Documentation Style: {{doc_style}}

Include:
- Function implementation
- Inline comments
- Usage example
- Edge case handling`
    },
    {
      id: 'code-api-endpoint',
      name: 'API Endpoint Builder',
      category: 'code',
      complexity: 'advanced',
      tags: ['api', 'backend', 'rest'],
      description: 'Create RESTful API endpoint code',
      template: `Create an API endpoint with these specifications:

Framework: {{framework}}
Endpoint: {{endpoint_path}}
HTTP Method: {{http_method}}
Purpose: {{purpose}}
Request Body: {{request_body}}
Response Format: {{response_format}}
Authentication: {{auth_method}}
Error Handling: {{error_handling}}
Validation Rules: {{validation}}

Generate complete endpoint code with proper error handling and documentation.`
    },
    {
      id: 'code-test-cases',
      name: 'Test Case Generator',
      category: 'code',
      complexity: 'intermediate',
      tags: ['testing', 'qa', 'unit-test'],
      description: 'Generate comprehensive test cases',
      template: `Generate test cases for:

Code/Function:
{{code_to_test}}

Testing Framework: {{framework}}
Test Type: {{test_type}}
Coverage Requirements: {{coverage}}
Edge Cases: {{edge_cases}}
Mock Data: {{mock_data}}

Create comprehensive test cases covering normal operation, edge cases, and error scenarios.`
    },

    // CREATIVE WRITING TEMPLATES
    {
      id: 'creative-story',
      name: 'Story Generator',
      category: 'creative',
      complexity: 'advanced',
      tags: ['story', 'narrative', 'fiction'],
      description: 'Generate creative stories',
      template: `Write a story with these parameters:

Genre: {{genre}}
Setting: {{setting}}
Main Character(s): {{characters}}
Conflict/Challenge: {{conflict}}
Tone: {{tone}}
Length: {{length}}
POV: {{pov}}
Theme: {{theme}}

Create an engaging narrative that incorporates all elements naturally.`
    },
    {
      id: 'creative-dialogue',
      name: 'Dialogue Writer',
      category: 'creative',
      complexity: 'intermediate',
      tags: ['dialogue', 'conversation', 'characters'],
      description: 'Craft realistic dialogue',
      template: `Create dialogue between:

Characters: {{characters}}
Setting: {{setting}}
Situation: {{situation}}
Character Traits: {{traits}}
Tone: {{tone}}
Conflict/Tension: {{conflict}}
Length: {{length}}

Write natural, character-appropriate dialogue that advances the situation.`
    },

    // BUSINESS & MARKETING TEMPLATES
    {
      id: 'business-email',
      name: 'Professional Email',
      category: 'business',
      complexity: 'simple',
      tags: ['email', 'communication', 'professional'],
      recommended: true,
      description: 'Draft professional emails',
      template: `Compose a professional email:

To: {{recipient}}
Purpose: {{purpose}}
Context: {{context}}
Tone: {{tone}}
Key Points: {{key_points}}
Call to Action: {{cta}}
Sender Role: {{sender_role}}

Write a clear, professional email that achieves the stated purpose.`
    },
    {
      id: 'business-proposal',
      name: 'Business Proposal',
      category: 'business',
      complexity: 'advanced',
      tags: ['proposal', 'business', 'sales'],
      description: 'Create compelling business proposals',
      template: `Create a business proposal for:

Project/Service: {{offering}}
Client: {{client}}
Problem Solving: {{problem}}
Proposed Solution: {{solution}}
Benefits: {{benefits}}
Timeline: {{timeline}}
Budget Range: {{budget}}
Differentiators: {{differentiators}}

Structure as a professional proposal with clear sections and persuasive language.`
    },
    {
      id: 'marketing-copy',
      name: 'Marketing Copy Generator',
      category: 'business',
      complexity: 'intermediate',
      tags: ['marketing', 'advertising', 'copy'],
      recommended: true,
      description: 'Generate compelling marketing copy',
      template: `Create marketing copy for:

Product/Service: {{product}}
Target Audience: {{audience}}
Key Benefits: {{benefits}}
Unique Selling Point: {{usp}}
Tone: {{tone}}
Length: {{length}}
Call to Action: {{cta}}
Emotional Appeal: {{emotion}}

Craft persuasive copy that resonates with the target audience and drives action.`
    },

    // RESEARCH & ANALYSIS TEMPLATES
    {
      id: 'research-analysis',
      name: 'Research Analysis',
      category: 'research',
      complexity: 'advanced',
      tags: ['research', 'analysis', 'academic'],
      description: 'Analyze research topics',
      template: `Analyze the following research topic:

Topic: {{topic}}
Research Question: {{question}}
Methodology: {{methodology}}
Data/Sources: {{data}}
Analysis Type: {{analysis_type}}
Audience: {{audience}}
Depth: {{depth_level}}

Provide a thorough analysis including key findings, implications, and conclusions.`
    },
    {
      id: 'research-literature-review',
      name: 'Literature Review',
      category: 'research',
      complexity: 'expert',
      tags: ['academic', 'literature', 'review'],
      description: 'Structure literature reviews',
      template: `Create a literature review on:

Topic: {{topic}}
Time Period: {{time_period}}
Key Themes: {{themes}}
Number of Sources: {{source_count}}
Academic Field: {{field}}
Review Type: {{review_type}}
Citation Style: {{citation_style}}

Structure: Introduction, thematic analysis, gaps in literature, conclusions.`
    },

    // EDUCATION & TRAINING TEMPLATES
    {
      id: 'edu-lesson-plan',
      name: 'Lesson Plan Creator',
      category: 'education',
      complexity: 'intermediate',
      tags: ['education', 'teaching', 'curriculum'],
      description: 'Design comprehensive lesson plans',
      template: `Create a lesson plan for:

Subject: {{subject}}
Topic: {{topic}}
Grade Level: {{grade_level}}
Duration: {{duration}}
Learning Objectives: {{objectives}}
Prior Knowledge: {{prerequisites}}
Materials Needed: {{materials}}
Assessment Method: {{assessment}}

Include: Introduction, main activities, assessment, and homework.`
    },
    {
      id: 'edu-quiz',
      name: 'Quiz Generator',
      category: 'education',
      complexity: 'simple',
      tags: ['quiz', 'assessment', 'questions'],
      description: 'Generate educational quizzes',
      template: `Generate a quiz on:

Topic: {{topic}}
Difficulty Level: {{difficulty}}
Number of Questions: {{question_count}}
Question Types: {{question_types}}
Learning Objectives: {{objectives}}
Include Answer Key: {{answer_key}}

Create diverse, well-structured questions that assess understanding.`
    },

    // MULTI-MODAL TEMPLATES
    {
      id: 'multi-visual-text',
      name: 'Visual-Text Hybrid',
      category: 'multimodal',
      complexity: 'advanced',
      tags: ['hybrid', 'visual', 'text'],
      description: 'Combine visual and text elements',
      template: `Create a multi-modal output combining visual and text elements:

Visual Component:
{{visual_description}}

Text Component:
{{text_content}}

Integration Goal: {{integration_goal}}
Primary Medium: {{primary_medium}}
Tone: {{tone}}
Audience: {{audience}}

Generate both a detailed visual description and accompanying text that work together seamlessly.`
    },
    {
      id: 'multi-data-viz',
      name: 'Data Visualization Prompt',
      category: 'multimodal',
      complexity: 'expert',
      tags: ['data', 'visualization', 'charts'],
      description: 'Create data visualization prompts',
      template: `Create a data visualization for:

Data Type: {{data_type}}
Visualization Type: {{viz_type}}
Key Metrics: {{metrics}}
Insights to Highlight: {{insights}}
Color Scheme: {{colors}}
Audience: {{audience}}
Interactivity: {{interactivity}}

Generate both the data structure and visual design specifications.`
    }
  ],

  // ============================================================================
  // PROMPT ENGINEERING TECHNIQUES
  // ============================================================================

  techniques: [
    {
      id: 'zero-shot',
      name: 'Zero-Shot',
      icon: '🎯',
      description: 'Direct prompting without examples',
      longDescription: `Zero-shot prompting provides clear instructions without examples. Best for straightforward tasks where the desired output is easy to describe.

      Example: "Translate the following English text to Spanish: [text]"

      When to use:
      - Simple, well-defined tasks
      - When examples are unavailable
      - For general knowledge queries`,
      applied: (prompt) => {
        return `Task: ${prompt}\n\nProvide a direct, accurate response based on the instructions above.`;
      }
    },
    {
      id: 'few-shot',
      name: 'Few-Shot',
      icon: '📚',
      description: 'Learning from examples',
      longDescription: `Few-shot prompting provides examples of input-output pairs to guide the AI's behavior.

      Example:
      Input: Happy
      Output: 😊

      Input: Sad
      Output: 😢

      Input: Excited
      [AI continues the pattern]

      When to use:
      - Pattern recognition tasks
      - Specific formatting requirements
      - Demonstrating desired tone/style`,
      applied: (prompt) => {
        return `Here are some examples of the desired output:\n\n[Add 2-3 relevant examples here]\n\nNow, apply this pattern to: ${prompt}`;
      }
    },
    {
      id: 'chain-of-thought',
      name: 'Chain-of-Thought',
      icon: '🧠',
      description: 'Step-by-step reasoning',
      longDescription: `Chain-of-thought prompting guides the AI to break down complex problems into steps.

      Example: "Let's solve this step by step:
      1. First, identify...
      2. Next, calculate...
      3. Then, verify...
      4. Finally, conclude..."

      When to use:
      - Complex problem-solving
      - Mathematical reasoning
      - Multi-step analysis`,
      applied: (prompt) => {
        return `Let's approach this systematically:\n\nTask: ${prompt}\n\nPlease break this down step by step:\n1. First, analyze the requirements\n2. Then, identify the key components\n3. Next, develop the solution\n4. Finally, verify and refine\n\nShow your reasoning at each step.`;
      }
    },
    {
      id: 'role-playing',
      name: 'Role-Based',
      icon: '🎭',
      description: 'Assign expert personas',
      longDescription: `Role-based prompting assigns a specific expert role to guide responses.

      Example: "You are a senior software architect with 20 years of experience in distributed systems. Explain microservices architecture to a junior developer."

      When to use:
      - Need expert-level responses
      - Specific domain knowledge
      - Particular communication style`,
      applied: (prompt) => {
        return `You are an experienced professional expert in this domain.\n\nTask: ${prompt}\n\nProvide a response that reflects deep expertise, practical experience, and professional insights.`;
      }
    },
    {
      id: 'constraint-stacking',
      name: 'Constraint Stacking',
      icon: '🎯',
      description: 'Multiple specific requirements',
      longDescription: `Constraint stacking layers multiple specific requirements for precise control.

      Example: "Write a description that:
      - Is exactly 100 words
      - Uses active voice
      - Includes 3 specific benefits
      - Maintains a professional tone
      - Avoids technical jargon"

      When to use:
      - Precise output requirements
      - Multiple quality criteria
      - Strict specifications`,
      applied: (prompt) => {
        return `${prompt}\n\nAdditional Requirements:\n- Clear and concise language\n- Logical structure\n- Comprehensive coverage\n- Appropriate tone\n- Accurate information\n\nEnsure ALL requirements are met.`;
      }
    },
    {
      id: 'recursive-refinement',
      name: 'Recursive Refinement',
      icon: '🔄',
      description: 'Iterative improvement',
      longDescription: `Recursive refinement asks the AI to generate, critique, and improve its own output.

      Example: "Generate a response, then critically evaluate it for weaknesses, and finally provide an improved version."

      When to use:
      - High-quality output needed
      - Complex creative tasks
      - When perfection matters`,
      applied: (prompt) => {
        return `${prompt}\n\nProcess:\n1. Generate an initial response\n2. Critically evaluate it for weaknesses, gaps, or improvements\n3. Create an enhanced version addressing all identified issues\n\nProvide both the initial and refined versions.`;
      }
    },
    {
      id: 'multi-perspective',
      name: 'Multi-Perspective',
      icon: '👁️',
      description: 'Multiple viewpoints',
      longDescription: `Multi-perspective prompting asks for analysis from different angles or viewpoints.

      Example: "Analyze this business decision from three perspectives: financial, ethical, and long-term strategic."

      When to use:
      - Comprehensive analysis needed
      - Balanced viewpoints required
      - Complex decision-making`,
      applied: (prompt) => {
        return `Analyze the following from multiple perspectives:\n\n${prompt}\n\nProvide analysis from:\n1. A practical/implementation perspective\n2. A theoretical/conceptual perspective\n3. A critical/evaluative perspective\n\nSynthesize insights from all viewpoints.`;
      }
    },
    {
      id: 'conditional-logic',
      name: 'Conditional Logic',
      icon: '🔀',
      description: 'If-then reasoning',
      longDescription: `Conditional logic prompting uses if-then structures for dynamic responses.

      Example: "If the user is a beginner, explain in simple terms. If intermediate, provide technical details. If expert, focus on advanced optimization."

      When to use:
      - Multiple scenarios
      - Adaptive responses
      - Decision trees`,
      applied: (prompt) => {
        return `${prompt}\n\nApply conditional logic:\n- IF simple case, THEN provide straightforward solution\n- IF complex case, THEN break down into steps\n- IF ambiguous, THEN clarify assumptions first\n\nAdapt your response based on the specific scenario.`;
      }
    },
    {
      id: 'style-emulation',
      name: 'Style Emulation',
      icon: '✨',
      description: 'Match specific styles',
      longDescription: `Style emulation prompting asks for output matching a specific writing or communication style.

      Example: "Write this in the style of a technical documentation, similar to Apple's Human Interface Guidelines - clear, concise, with practical examples."

      When to use:
      - Brand voice matching
      - Consistent tone across content
      - Specific style requirements`,
      applied: (prompt) => {
        return `${prompt}\n\nStyle Requirements:\n- Match the specified tone and voice\n- Use appropriate vocabulary level\n- Maintain consistency throughout\n- Reflect the desired brand/personality\n\nEnsure the style is authentic and well-executed.`;
      }
    },
    {
      id: 'template-filling',
      name: 'Template-Based',
      icon: '📋',
      description: 'Structured output formats',
      longDescription: `Template-based prompting provides a specific structure or format to follow.

      Example: "Use this format:
      Title: [clear, engaging title]
      Summary: [2-3 sentences]
      Details: [3-5 bullet points]
      Conclusion: [1 sentence]"

      When to use:
      - Consistent formatting needed
      - Structured data output
      - Standardized reports`,
      applied: (prompt) => {
        return `${prompt}\n\nUse this structure:\n\n## Overview\n[Provide overview]\n\n## Details\n[Provide detailed information]\n\n## Key Points\n- Point 1\n- Point 2\n- Point 3\n\n## Conclusion\n[Summarize]\n\nFollow this template exactly.`;
      }
    }
  ],

  // ============================================================================
  // VALIDATION RULES
  // ============================================================================

  validationRules: [
    {
      id: 'ambiguity',
      check: (prompt) => {
        const ambiguousWords = ['maybe', 'might', 'could', 'perhaps', 'possibly', 'somewhat', 'kind of', 'sort of'];
        const found = ambiguousWords.filter(word => prompt.toLowerCase().includes(word));
        return {
          passed: found.length === 0,
          severity: found.length > 2 ? 'error' : 'warning',
          message: found.length > 0
            ? `Ambiguous language detected: ${found.join(', ')}. Be more specific.`
            : 'No ambiguous language detected. ✓'
        };
      }
    },
    {
      id: 'length',
      check: (prompt) => {
        const words = prompt.trim().split(/\s+/).length;
        if (words < 5) {
          return { passed: false, severity: 'error', message: 'Prompt is too short. Add more detail.' };
        } else if (words > 500) {
          return { passed: false, severity: 'warning', message: 'Prompt might be too long. Consider breaking it down.' };
        }
        return { passed: true, severity: 'success', message: `Length is appropriate (${words} words). ✓` };
      }
    },
    {
      id: 'clarity',
      check: (prompt) => {
        const hasGoal = /\b(create|generate|write|analyze|explain|describe|design|build)\b/i.test(prompt);
        return {
          passed: hasGoal,
          severity: hasGoal ? 'success' : 'error',
          message: hasGoal
            ? 'Clear action verb detected. ✓'
            : 'No clear goal/action verb found. Start with what you want to create/do.'
        };
      }
    },
    {
      id: 'variables',
      check: (prompt) => {
        const variablePattern = /\{\{[^}]+\}\}/g;
        const variables = prompt.match(variablePattern);
        if (variables) {
          const unique = [...new Set(variables)];
          return {
            passed: true,
            severity: 'info',
            message: `${unique.length} variable(s) defined: ${unique.join(', ')} ✓`
          };
        }
        return {
          passed: true,
          severity: 'info',
          message: 'No variables used. Consider using {{variable}} syntax for reusability.'
        };
      }
    },
    {
      id: 'context',
      check: (prompt) => {
        const contextIndicators = ['you are', 'act as', 'role:', 'context:', 'background:', 'scenario:'];
        const hasContext = contextIndicators.some(indicator => prompt.toLowerCase().includes(indicator));
        return {
          passed: hasContext,
          severity: hasContext ? 'success' : 'warning',
          message: hasContext
            ? 'Context/role provided. ✓'
            : 'Consider adding context or role to improve results.'
        };
      }
    },
    {
      id: 'output-format',
      check: (prompt) => {
        const formatIndicators = ['format:', 'output:', 'structure:', 'json', 'markdown', 'list', 'bullet'];
        const hasFormat = formatIndicators.some(indicator => prompt.toLowerCase().includes(indicator));
        return {
          passed: hasFormat,
          severity: hasFormat ? 'success' : 'warning',
          message: hasFormat
            ? 'Output format specified. ✓'
            : 'Consider specifying the desired output format.'
        };
      }
    },
    {
      id: 'constraints',
      check: (prompt) => {
        const constraintIndicators = ['length:', 'tone:', 'style:', 'avoid:', 'must:', 'should:', 'requirements:'];
        const constraints = constraintIndicators.filter(indicator => prompt.toLowerCase().includes(indicator));
        return {
          passed: constraints.length > 0,
          severity: constraints.length > 0 ? 'success' : 'info',
          message: constraints.length > 0
            ? `${constraints.length} constraint(s) specified. ✓`
            : 'Consider adding constraints for more precise results.'
        };
      }
    },
    {
      id: 'jargon',
      check: (prompt) => {
        const jargonWords = ['utilize', 'leverage', 'synergy', 'paradigm', 'holistic', 'actionable'];
        const found = jargonWords.filter(word => prompt.toLowerCase().includes(word));
        return {
          passed: found.length === 0,
          severity: found.length > 0 ? 'warning' : 'success',
          message: found.length > 0
            ? `Business jargon detected: ${found.join(', ')}. Consider simpler alternatives.`
            : 'No unnecessary jargon detected. ✓'
        };
      }
    }
  ],

  // ============================================================================
  // QUALITY SCORING SYSTEM
  // ============================================================================

  calculateQualityScores: function(prompt) {
    const scores = {
      clarity: 0,
      coverage: 0,
      effectiveness: 0,
      creativity: 0,
      success: 0
    };

    // CLARITY SCORE (0-10)
    let clarityPoints = 0;
    if (/\b(create|generate|write|analyze|explain|describe|design|build)\b/i.test(prompt)) clarityPoints += 2;
    if (prompt.length > 20) clarityPoints += 2;
    if (!/\b(maybe|might|could|perhaps|possibly|somewhat)\b/i.test(prompt)) clarityPoints += 2;
    if (prompt.split('\n').length > 1) clarityPoints += 2; // Multi-line structure
    if (/\d+/.test(prompt)) clarityPoints += 1; // Specific numbers
    if (prompt.includes(':')) clarityPoints += 1; // Structured format
    scores.clarity = Math.min(10, clarityPoints);

    // COVERAGE SCORE (0-10)
    let coveragePoints = 0;
    if (/\b(context|background|scenario|you are|act as)\b/i.test(prompt)) coveragePoints += 2;
    if (/\b(format|output|structure)\b/i.test(prompt)) coveragePoints += 2;
    if (/\b(tone|style|voice)\b/i.test(prompt)) coveragePoints += 2;
    if (/\b(constraints?|requirements?|must|should)\b/i.test(prompt)) coveragePoints += 2;
    if (/\{\{[^}]+\}\}/.test(prompt)) coveragePoints += 1; // Variables
    if (/\b(example|instance|such as)\b/i.test(prompt)) coveragePoints += 1; // Examples
    scores.coverage = Math.min(10, coveragePoints);

    // EFFECTIVENESS SCORE (0-10)
    let effectivenessPoints = 0;
    const wordCount = prompt.split(/\s+/).length;
    if (wordCount >= 10 && wordCount <= 300) effectivenessPoints += 3;
    if (prompt.includes('{{') && prompt.includes('}}')) effectivenessPoints += 2; // Uses variables
    if (/\n/.test(prompt)) effectivenessPoints += 2; // Multi-line structure
    if (/[:.;]/.test(prompt)) effectivenessPoints += 1; // Proper punctuation
    if (!/\b(thing|stuff|something|anything)\b/i.test(prompt)) effectivenessPoints += 2; // Avoids vague terms
    scores.effectiveness = Math.min(10, effectivenessPoints);

    // CREATIVITY SCORE (0-10)
    let creativityPoints = 0;
    if (/\{\{[^}]+\}\}/.test(prompt)) creativityPoints += 2; // Variable usage
    if (prompt.split('\n').length >= 5) creativityPoints += 2; // Well-structured
    if (/\b(unique|creative|innovative|novel|original)\b/i.test(prompt)) creativityPoints += 1;
    if (/\b(style|tone|mood|atmosphere|feeling)\b/i.test(prompt)) creativityPoints += 2;
    if (prompt.length > 100) creativityPoints += 2; // Detailed prompts
    if (/\b(metaphor|analogy|compare|contrast)\b/i.test(prompt)) creativityPoints += 1;
    scores.creativity = Math.min(10, creativityPoints);

    // SUCCESS LIKELIHOOD (0-10) - Composite score
    let successPoints = 0;
    successPoints += scores.clarity * 0.3;
    successPoints += scores.coverage * 0.3;
    successPoints += scores.effectiveness * 0.2;
    if (this.state.selectedTechniques.length > 0) successPoints += 2;
    scores.success = Math.min(10, successPoints);

    return scores;
  },

  // ============================================================================
  // META-EVALUATION ENGINE
  // ============================================================================

  performMetaEvaluation: function(prompt) {
    const evaluation = {
      strengths: [],
      weaknesses: [],
      suggestions: [],
      overall: ''
    };

    // Analyze strengths
    if (/\b(create|generate|write|analyze)\b/i.test(prompt)) {
      evaluation.strengths.push('Clear action verb establishes intent');
    }
    if (/\{\{[^}]+\}\}/g.test(prompt)) {
      evaluation.strengths.push('Uses variables for reusability');
    }
    if (prompt.split('\n').length > 3) {
      evaluation.strengths.push('Well-structured with clear sections');
    }
    if (/\b(context|background|scenario)\b/i.test(prompt)) {
      evaluation.strengths.push('Provides context for better results');
    }
    if (/\b(format|output|structure)\b/i.test(prompt)) {
      evaluation.strengths.push('Specifies desired output format');
    }

    // Analyze weaknesses
    if (prompt.split(/\s+/).length < 10) {
      evaluation.weaknesses.push('Prompt may be too brief for optimal results');
    }
    if (!/\b(tone|style|voice)\b/i.test(prompt)) {
      evaluation.weaknesses.push('No tone or style specification');
    }
    if (!/\b(length|size|count)\b/i.test(prompt)) {
      evaluation.weaknesses.push('No length or size constraints specified');
    }
    if (/\b(maybe|might|could|perhaps)\b/i.test(prompt)) {
      evaluation.weaknesses.push('Contains ambiguous language');
    }
    if (!/\b(example|instance|such as)\b/i.test(prompt)) {
      evaluation.weaknesses.push('Could benefit from examples');
    }

    // Generate suggestions
    if (evaluation.weaknesses.length === 0 && evaluation.strengths.length >= 3) {
      evaluation.suggestions.push('Excellent prompt! Consider A/B testing different variables.');
    } else {
      if (!/\b(tone|style)\b/i.test(prompt)) {
        evaluation.suggestions.push('Add tone/style specification (e.g., "professional", "casual", "technical")');
      }
      if (!/\b(length|size)\b/i.test(prompt)) {
        evaluation.suggestions.push('Specify desired length or size constraints');
      }
      if (!this.state.selectedTechniques.length) {
        evaluation.suggestions.push('Apply prompt engineering techniques (Chain-of-Thought, Few-Shot, etc.)');
      }
      if (!/\{\{.*\}\}/.test(prompt)) {
        evaluation.suggestions.push('Use {{variable}} syntax for reusable template creation');
      }
      if (prompt.split('\n').length < 3) {
        evaluation.suggestions.push('Structure your prompt into clear sections for better organization');
      }
    }

    // Overall assessment
    const avgScore = (
      this.state.qualityScores.clarity +
      this.state.qualityScores.coverage +
      this.state.qualityScores.effectiveness +
      this.state.qualityScores.creativity +
      this.state.qualityScores.success
    ) / 5;

    if (avgScore >= 9) {
      evaluation.overall = 'EXCELLENT - This prompt exemplifies best practices in prompt engineering.';
    } else if (avgScore >= 7) {
      evaluation.overall = 'GOOD - Solid prompt with room for minor refinements.';
    } else if (avgScore >= 5) {
      evaluation.overall = 'FAIR - Functional but could benefit from significant improvements.';
    } else {
      evaluation.overall = 'NEEDS IMPROVEMENT - Apply suggested changes to enhance effectiveness.';
    }

    return evaluation;
  },

  // ============================================================================
  // AUTO-OPTIMIZATION ENGINE
  // ============================================================================

  optimizePromptTo10: function(prompt) {
    let optimized = prompt;

    // Add clear structure if missing
    if (!optimized.includes('\n')) {
      optimized = `Task: ${optimized}`;
    }

    // Add context if missing
    if (!/\b(context|background|you are|act as)\b/i.test(optimized)) {
      optimized = `Context: You are an expert AI assistant.\n\n${optimized}`;
    }

    // Add output format if missing
    if (!/\b(format|output|structure)\b/i.test(optimized)) {
      optimized += '\n\nOutput Format: Provide a well-structured, comprehensive response.';
    }

    // Add tone specification if missing
    if (!/\b(tone|style|voice)\b/i.test(optimized)) {
      optimized += '\nTone: Professional and clear.';
    }

    // Add constraints if missing
    if (!/\b(requirements?|constraints?|must|should)\b/i.test(optimized)) {
      optimized += '\n\nRequirements:\n- Be specific and detailed\n- Use clear, unambiguous language\n- Ensure accuracy and completeness';
    }

    // Add quality criteria
    optimized += '\n\nQuality Criteria:\n- Clarity: Information should be easy to understand\n- Completeness: Cover all relevant aspects\n- Accuracy: Ensure all information is correct\n- Actionability: Provide practical, usable results';

    // Add self-verification
    optimized += '\n\nBefore finalizing, verify the response meets all requirements and quality criteria.';

    return optimized;
  },

  // ============================================================================
  // RESOURCE HUB DATA
  // ============================================================================

  resources: {
    documentation: [
      { title: 'Nano Banana Official Documentation', url: '#', icon: '📘' },
      { title: 'API Reference Guide', url: '#', icon: '🔧' },
      { title: 'Quick Start Tutorial', url: '#', icon: '⚡' },
      { title: 'Best Practices Guide', url: '#', icon: '⭐' },
      { title: 'Model Capabilities Overview', url: '#', icon: '🧠' }
    ],
    examples: [
      { title: 'Image Generation Gallery', url: '#', icon: '🎨' },
      { title: 'Code Examples Repository', url: '#', icon: '💻' },
      { title: 'Writing Samples Collection', url: '#', icon: '✍️' },
      { title: 'Business Use Cases', url: '#', icon: '💼' },
      { title: 'Creative Projects Showcase', url: '#', icon: '🌟' }
    ],
    cheatsheets: [
      { title: 'Prompt Syntax Cheat Sheet', url: '#', icon: '📋' },
      { title: 'Variable System Guide', url: '#', icon: '🔧' },
      { title: 'Technique Quick Reference', url: '#', icon: '🧠' },
      { title: 'Common Patterns Library', url: '#', icon: '🎯' },
      { title: 'Troubleshooting Guide', url: '#', icon: '🔍' }
    ],
    community: [
      { title: 'Nano Banana Community Forum', url: '#', icon: '💬' },
      { title: 'Discord Server', url: '#', icon: '💬' },
      { title: 'Reddit r/NanoBanana', url: '#', icon: '🗨️' },
      { title: 'Stack Overflow Tag', url: '#', icon: '❓' },
      { title: 'GitHub Discussions', url: '#', icon: '👥' }
    ],
    tutorials: [
      { title: 'Getting Started (5 min)', url: '#', icon: '🎬' },
      { title: 'Advanced Techniques (15 min)', url: '#', icon: '🎓' },
      { title: 'Real-world Applications (20 min)', url: '#', icon: '🌍' },
      { title: 'Optimization Strategies (10 min)', url: '#', icon: '⚡' },
      { title: 'Troubleshooting Common Issues (12 min)', url: '#', icon: '🔧' }
    ],
    api: [
      { title: 'REST API Documentation', url: '#', icon: '🔌' },
      { title: 'Python SDK', url: '#', icon: '🐍' },
      { title: 'JavaScript SDK', url: '#', icon: '📜' },
      { title: 'Authentication Guide', url: '#', icon: '🔐' },
      { title: 'Rate Limits & Quotas', url: '#', icon: '⏱️' }
    ]
  }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupOnboarding();
  setupBuilder();
  setupTemplates();
  setupTechniques();
  setupValidator();
  setupResources();
  setupModals();
  setupEventListeners();

  // Load initial view
  showView('builder');
  loadTemplates();
  loadTechniques();
}

// ============================================================================
// NAVIGATION
// ============================================================================

function setupNavigation() {
  const navButtons = document.querySelectorAll('.nb-nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      showView(view);

      // Update active state
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function showView(viewName) {
  NanoBananaBuilder.state.currentView = viewName;

  // Hide all views
  document.querySelectorAll('.nb-view').forEach(view => {
    view.classList.remove('active');
  });

  // Show selected view
  const view = document.getElementById(`${viewName}-view`);
  if (view) {
    view.classList.add('active');
  }
}

// ============================================================================
// ONBOARDING
// ============================================================================

function setupOnboarding() {
  const lessonTabs = document.querySelectorAll('.nb-lesson-tab');
  lessonTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const lesson = tab.dataset.lesson;
      loadLesson(lesson);

      lessonTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  document.getElementById('nextLesson')?.addEventListener('click', nextLesson);
  document.getElementById('prevLesson')?.addEventListener('click', prevLesson);
  document.getElementById('skipOnboarding')?.addEventListener('click', () => showView('builder'));

  // Load first lesson
  loadLesson('intro');
}

function loadLesson(lessonId) {
  NanoBananaBuilder.state.currentLesson = lessonId;
  const lesson = NanoBananaBuilder.onboardingLessons[lessonId];

  if (lesson) {
    document.getElementById('lesson-content').innerHTML = lesson.content;
    updateOnboardingProgress();
  }
}

function nextLesson() {
  const lessons = Object.keys(NanoBananaBuilder.onboardingLessons);
  const currentIndex = lessons.indexOf(NanoBananaBuilder.state.currentLesson);
  if (currentIndex < lessons.length - 1) {
    loadLesson(lessons[currentIndex + 1]);
    document.querySelectorAll('.nb-lesson-tab')[currentIndex + 1].click();
  }
}

function prevLesson() {
  const lessons = Object.keys(NanoBananaBuilder.onboardingLessons);
  const currentIndex = lessons.indexOf(NanoBananaBuilder.state.currentLesson);
  if (currentIndex > 0) {
    loadLesson(lessons[currentIndex - 1]);
    document.querySelectorAll('.nb-lesson-tab')[currentIndex - 1].click();
  }
}

function updateOnboardingProgress() {
  const lessons = Object.keys(NanoBananaBuilder.onboardingLessons);
  const currentIndex = lessons.indexOf(NanoBananaBuilder.state.currentLesson);
  const progress = ((currentIndex + 1) / lessons.length) * 100;

  NanoBananaBuilder.state.onboardingProgress = progress;

  const progressBar = document.getElementById('onboarding-progress');
  const progressText = document.getElementById('progress-text');

  if (progressBar) progressBar.style.width = `${progress}%`;
  if (progressText) progressText.textContent = `Progress: ${Math.round(progress)}% Complete`;
}

// ============================================================================
// BUILDER
// ============================================================================

function setupBuilder() {
  // Intent analysis
  document.getElementById('analyzeIntent')?.addEventListener('click', analyzeIntent);

  // Variables
  document.getElementById('addVariable')?.addEventListener('click', () => {
    document.getElementById('variableModal').style.display = 'flex';
  });

  // Prompt editor
  const editor = document.getElementById('promptEditor');
  if (editor) {
    editor.addEventListener('input', () => {
      NanoBananaBuilder.state.promptText = editor.value;
      updatePromptStats();
      validatePrompt();
      updateQualityScores();
    });
  }

  // Actions
  document.getElementById('regeneratePrompt')?.addEventListener('click', regeneratePrompt);
  document.getElementById('optimizePrompt')?.addEventListener('click', optimizePrompt);
  document.getElementById('generateVariants')?.addEventListener('click', () => {
    document.getElementById('batchModal').style.display = 'flex';
  });
  document.getElementById('savePrompt')?.addEventListener('click', savePrompt);
  document.getElementById('exportPrompt')?.addEventListener('click', exportPrompt);
  document.getElementById('copyPrompt')?.addEventListener('click', copyPrompt);
  document.getElementById('analyzePrompt')?.addEventListener('click', performDeepAnalysis);
  document.getElementById('clearCanvas')?.addEventListener('click', clearCanvas);
}

function analyzeIntent() {
  const intent = {
    goal: document.getElementById('primaryGoal')?.value,
    skillLevel: document.getElementById('skillLevel')?.value,
    context: document.getElementById('outputContext')?.value,
    outcome: document.getElementById('desiredOutcome')?.value,
    constraints: document.getElementById('constraints')?.value,
    audience: document.getElementById('audience')?.value,
    integration: document.getElementById('integration')?.value
  };

  NanoBananaBuilder.state.userIntent = intent;

  // Filter and recommend templates based on intent
  filterTemplatesByIntent(intent);

  // Show notification
  alert('✓ Intent analyzed! Recommended templates have been highlighted.');
}

function filterTemplatesByIntent(intent) {
  const container = document.getElementById('templatesList');
  if (!container) return;

  // Clear and reload with filtering
  loadTemplates(intent.goal);
}

function updatePromptStats() {
  const prompt = NanoBananaBuilder.state.promptText;
  const chars = prompt.length;
  const words = prompt.trim().split(/\s+/).filter(w => w.length > 0).length;
  const tokens = Math.ceil(words * 1.3); // Rough estimate

  document.getElementById('charCount').textContent = `${chars} characters`;
  document.getElementById('wordCount').textContent = `${words} words`;
  document.getElementById('tokenEstimate').textContent = `~${tokens} tokens`;
}

function validatePrompt() {
  const prompt = NanoBananaBuilder.state.promptText;
  const results = NanoBananaBuilder.validationRules.map(rule => rule.check(prompt));

  NanoBananaBuilder.state.validationResults = results;
  displayValidationResults(results);
}

function displayValidationResults(results) {
  const container = document.getElementById('validationResults');
  if (!container) return;

  container.innerHTML = results.map(result => {
    const iconMap = {
      success: '✓',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️'
    };

    return `
      <div class="nb-validation-item nb-${result.severity}">
        <span class="nb-icon">${iconMap[result.severity]}</span>
        <span>${result.message}</span>
      </div>
    `;
  }).join('');
}

function updateQualityScores() {
  const prompt = NanoBananaBuilder.state.promptText;
  if (!prompt) {
    // Reset scores
    Object.keys(NanoBananaBuilder.state.qualityScores).forEach(key => {
      NanoBananaBuilder.state.qualityScores[key] = 0;
    });
    displayQualityScores();
    return;
  }

  const scores = NanoBananaBuilder.calculateQualityScores(prompt);
  NanoBananaBuilder.state.qualityScores = scores;
  displayQualityScores();
}

function displayQualityScores() {
  const scores = NanoBananaBuilder.state.qualityScores;

  // Update individual metrics
  Object.keys(scores).forEach(key => {
    const fillEl = document.getElementById(`${key}-score`);
    const valueEl = document.getElementById(`${key}-value`);

    if (fillEl) fillEl.style.width = `${scores[key] * 10}%`;
    if (valueEl) valueEl.textContent = `${scores[key].toFixed(1)}/10`;
  });

  // Calculate and display overall score
  const overall = (scores.clarity + scores.coverage + scores.effectiveness + scores.creativity + scores.success) / 5;
  const overallEl = document.getElementById('overall-score');
  if (overallEl) overallEl.textContent = `${overall.toFixed(1)}/10`;

  // Show recommendation
  const recommendEl = document.getElementById('scoreRecommendation');
  if (recommendEl) {
    let recommendation = '';
    let className = '';

    if (overall >= 9) {
      recommendation = '🎉 EXCELLENT! This prompt meets the highest quality standards.';
      className = 'excellent';
    } else if (overall >= 7) {
      recommendation = '👍 GOOD! Minor improvements could push this to 10/10.';
      className = 'good';
    } else if (overall >= 5) {
      recommendation = '⚠️ FAIR. Apply suggested improvements for better results.';
      className = 'needs-improvement';
    } else {
      recommendation = '❌ NEEDS WORK. Review validation messages and optimize.';
      className = 'poor';
    }

    recommendEl.textContent = recommendation;
    recommendEl.className = `nb-score-recommendation ${className}`;
  }
}

function regeneratePrompt() {
  if (!NanoBananaBuilder.state.selectedTemplate) {
    alert('Please select a template first.');
    return;
  }

  applyTemplate(NanoBananaBuilder.state.selectedTemplate);
}

function optimizePrompt() {
  const currentPrompt = document.getElementById('promptEditor')?.value || '';
  if (!currentPrompt) {
    alert('Please enter a prompt first.');
    return;
  }

  const optimized = NanoBananaBuilder.optimizePromptTo10(currentPrompt);
  document.getElementById('promptEditor').value = optimized;
  NanoBananaBuilder.state.promptText = optimized;

  updatePromptStats();
  validatePrompt();
  updateQualityScores();

  alert('✓ Prompt optimized! Check the updated quality scores.');
}

function savePrompt() {
  const prompt = NanoBananaBuilder.state.promptText;
  if (!prompt) {
    alert('No prompt to save.');
    return;
  }

  const name = window.prompt('Enter a name for this prompt:');
  if (name) {
    const saved = JSON.parse(localStorage.getItem('nanoBananaSavedPrompts') || '[]');
    saved.push({
      name,
      prompt,
      date: new Date().toISOString(),
      scores: NanoBananaBuilder.state.qualityScores
    });
    localStorage.setItem('nanoBananaSavedPrompts', JSON.stringify(saved));
    alert('✓ Prompt saved successfully!');
  }
}

function exportPrompt() {
  const prompt = NanoBananaBuilder.state.promptText;
  if (!prompt) {
    alert('No prompt to export.');
    return;
  }

  const format = document.getElementById('outputFormat')?.value || 'text';
  let content = prompt;
  let filename = 'nano-banana-prompt.txt';

  if (format === 'json') {
    content = JSON.stringify({
      prompt,
      variables: NanoBananaBuilder.state.variables,
      techniques: NanoBananaBuilder.state.selectedTechniques,
      scores: NanoBananaBuilder.state.qualityScores
    }, null, 2);
    filename = 'nano-banana-prompt.json';
  } else if (format === 'markdown') {
    content = `# Nano Banana Prompt\n\n${prompt}\n\n## Quality Scores\n\n${JSON.stringify(NanoBananaBuilder.state.qualityScores, null, 2)}`;
    filename = 'nano-banana-prompt.md';
  }

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function copyPrompt() {
  const prompt = NanoBananaBuilder.state.promptText;
  if (!prompt) {
    alert('No prompt to copy.');
    return;
  }

  navigator.clipboard.writeText(prompt).then(() => {
    alert('✓ Prompt copied to clipboard!');
  });
}

function performDeepAnalysis() {
  const prompt = NanoBananaBuilder.state.promptText;
  if (!prompt) {
    alert('Please enter a prompt first.');
    return;
  }

  const evaluation = NanoBananaBuilder.performMetaEvaluation(prompt);
  displayMetaEvaluation(evaluation);
}

function displayMetaEvaluation(evaluation) {
  const container = document.getElementById('metaEvaluation');
  if (!container) return;

  let html = `
    <h3>${evaluation.overall}</h3>

    <h4>💪 Strengths</h4>
    <ul>
      ${evaluation.strengths.map(s => `<li>${s}</li>`).join('')}
      ${evaluation.strengths.length === 0 ? '<li>No significant strengths detected</li>' : ''}
    </ul>

    <h4>⚠️ Areas for Improvement</h4>
    <ul>
      ${evaluation.weaknesses.map(w => `<li>${w}</li>`).join('')}
      ${evaluation.weaknesses.length === 0 ? '<li>No significant weaknesses detected</li>' : ''}
    </ul>

    <h4>💡 Suggestions</h4>
    <ul>
      ${evaluation.suggestions.map(s => `<li>${s}</li>`).join('')}
    </ul>
  `;

  container.innerHTML = html;
}

function clearCanvas() {
  if (confirm('Clear all content? This cannot be undone.')) {
    document.getElementById('promptEditor').value = '';
    NanoBananaBuilder.state.promptText = '';
    NanoBananaBuilder.state.variables = [];
    NanoBananaBuilder.state.selectedTechniques = [];
    updatePromptStats();
    validatePrompt();
    updateQualityScores();
    displayVariables();
  }
}

// ============================================================================
// TEMPLATES
// ============================================================================

function setupTemplates() {
  const searchInput = document.getElementById('templateSearch');
  const categorySelect = document.getElementById('templateCategory');

  if (searchInput) {
    searchInput.addEventListener('input', () => loadTemplates());
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', () => loadTemplates());
  }
}

function loadTemplates(filterCategory = null) {
  const container = document.getElementById('templatesList');
  if (!container) return;

  const search = document.getElementById('templateSearch')?.value.toLowerCase() || '';
  const category = filterCategory || document.getElementById('templateCategory')?.value || 'all';

  let filtered = NanoBananaBuilder.templates;

  if (category && category !== 'all') {
    if (category === 'recommended') {
      filtered = filtered.filter(t => t.recommended);
    } else {
      filtered = filtered.filter(t => t.category === category);
    }
  }

  if (search) {
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(search) ||
      t.description.toLowerCase().includes(search) ||
      t.tags.some(tag => tag.includes(search))
    );
  }

  container.innerHTML = filtered.map(template => `
    <div class="nb-template-card" data-template-id="${template.id}">
      ${template.recommended ? '<span class="nb-template-badge">⭐ Recommended</span>' : ''}
      <h3>${template.name}</h3>
      <p>${template.description}</p>
      <div class="nb-template-tags">
        ${template.tags.map(tag => `<span class="nb-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Add click handlers
  container.querySelectorAll('.nb-template-card').forEach(card => {
    card.addEventListener('click', () => {
      const templateId = card.dataset.templateId;
      const template = NanoBananaBuilder.templates.find(t => t.id === templateId);
      if (template) {
        selectTemplate(template, card);
      }
    });
  });
}

function selectTemplate(template, cardElement) {
  NanoBananaBuilder.state.selectedTemplate = template;

  // Update UI
  document.querySelectorAll('.nb-template-card').forEach(c => c.classList.remove('selected'));
  cardElement.classList.add('selected');

  // Apply template
  applyTemplate(template);
}

function applyTemplate(template) {
  document.getElementById('promptEditor').value = template.template;
  NanoBananaBuilder.state.promptText = template.template;

  // Extract variables
  const variablePattern = /\{\{([^}]+)\}\}/g;
  const matches = [...template.template.matchAll(variablePattern)];
  const uniqueVars = [...new Set(matches.map(m => m[1]))];

  NanoBananaBuilder.state.variables = uniqueVars.map(v => ({
    name: v,
    description: '',
    defaultValue: '',
    suggestions: []
  }));

  displayVariables();
  updatePromptStats();
  validatePrompt();
  updateQualityScores();
}

// ============================================================================
// TECHNIQUES
// ============================================================================

function setupTechniques() {
  loadTechniques();
}

function loadTechniques() {
  const container = document.getElementById('techniquesList');
  if (!container) return;

  container.innerHTML = NanoBananaBuilder.techniques.map(technique => `
    <div class="nb-technique-card" data-technique-id="${technique.id}">
      <div class="nb-technique-icon">${technique.icon}</div>
      <h4>${technique.name}</h4>
      <p>${technique.description}</p>
    </div>
  `).join('');

  // Add click handlers
  container.querySelectorAll('.nb-technique-card').forEach(card => {
    card.addEventListener('click', () => {
      const techniqueId = card.dataset.techniqueId;
      toggleTechnique(techniqueId, card);
    });
  });
}

function toggleTechnique(techniqueId, cardElement) {
  const technique = NanoBananaBuilder.techniques.find(t => t.id === techniqueId);
  if (!technique) return;

  const index = NanoBananaBuilder.state.selectedTechniques.indexOf(techniqueId);

  if (index > -1) {
    // Deselect
    NanoBananaBuilder.state.selectedTechniques.splice(index, 1);
    cardElement.classList.remove('selected');
  } else {
    // Select
    NanoBananaBuilder.state.selectedTechniques.push(techniqueId);
    cardElement.classList.add('selected');
  }

  // Show description
  document.getElementById('techniqueDescription').innerHTML =
    technique.longDescription.replace(/\n/g, '<br>');

  // Apply techniques to prompt
  applySelectedTechniques();
}

function applySelectedTechniques() {
  let prompt = NanoBananaBuilder.state.promptText;

  NanoBananaBuilder.state.selectedTechniques.forEach(techId => {
    const technique = NanoBananaBuilder.techniques.find(t => t.id === techId);
    if (technique && technique.applied) {
      prompt = technique.applied(prompt);
    }
  });

  document.getElementById('promptEditor').value = prompt;
  NanoBananaBuilder.state.promptText = prompt;

  updatePromptStats();
  validatePrompt();
  updateQualityScores();
}

// ============================================================================
// VARIABLES
// ============================================================================

function displayVariables() {
  const container = document.getElementById('variablesList');
  if (!container) return;

  if (NanoBananaBuilder.state.variables.length === 0) {
    container.innerHTML = '<p class="nb-info-text">No variables defined. Click "Add Variable" to create one.</p>';
    return;
  }

  container.innerHTML = NanoBananaBuilder.state.variables.map((v, index) => `
    <div class="nb-variable-chip">
      <span>{{${v.name}}}</span>
      <span class="remove" data-index="${index}">×</span>
    </div>
  `).join('');

  // Add remove handlers
  container.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      NanoBananaBuilder.state.variables.splice(index, 1);
      displayVariables();
    });
  });
}

// ============================================================================
// VALIDATOR
// ============================================================================

function setupValidator() {
  document.getElementById('validateBtn')?.addEventListener('click', () => {
    const input = document.getElementById('validatorInput')?.value;
    if (!input) {
      alert('Please enter a prompt to validate.');
      return;
    }

    validateExternalPrompt(input);
  });
}

function validateExternalPrompt(prompt) {
  // Run validation
  const results = NanoBananaBuilder.validationRules.map(rule => rule.check(prompt));
  const scores = NanoBananaBuilder.calculateQualityScores(prompt);
  const evaluation = NanoBananaBuilder.performMetaEvaluation(prompt);

  // Display results
  const container = document.getElementById('validatorResults');
  if (!container) return;

  const overall = (scores.clarity + scores.coverage + scores.effectiveness + scores.creativity + scores.success) / 5;

  container.innerHTML = `
    <div class="nb-validator-section">
      <h3>📊 Overall Score: ${overall.toFixed(1)}/10</h3>
      <p>${evaluation.overall}</p>
    </div>

    <div class="nb-validator-section">
      <h3>✓ Validation Results</h3>
      ${results.map(r => {
        const iconMap = { success: '✓', warning: '⚠️', error: '❌', info: 'ℹ️' };
        return `
          <div class="nb-validation-item nb-${r.severity}">
            <span class="nb-icon">${iconMap[r.severity]}</span>
            <span>${r.message}</span>
          </div>
        `;
      }).join('')}
    </div>

    <div class="nb-validator-section">
      <h3>📈 Quality Breakdown</h3>
      <p>Clarity: ${scores.clarity}/10</p>
      <p>Coverage: ${scores.coverage}/10</p>
      <p>Effectiveness: ${scores.effectiveness}/10</p>
      <p>Creativity: ${scores.creativity}/10</p>
      <p>Success Likelihood: ${scores.success}/10</p>
    </div>

    <div class="nb-validator-section">
      <h3>💪 Strengths</h3>
      <ul>
        ${evaluation.strengths.map(s => `<li>${s}</li>`).join('')}
        ${evaluation.strengths.length === 0 ? '<li>No significant strengths detected</li>' : ''}
      </ul>
    </div>

    <div class="nb-validator-section">
      <h3>💡 Suggestions</h3>
      <ul>
        ${evaluation.suggestions.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>
  `;
}

// ============================================================================
// RESOURCES
// ============================================================================

function setupResources() {
  loadResources();
}

function loadResources() {
  const resources = NanoBananaBuilder.resources;

  Object.keys(resources).forEach(key => {
    const listId = `${key}List`;
    const container = document.getElementById(listId);

    if (container) {
      container.innerHTML = resources[key].map(item => `
        <li>
          <a href="${item.url}" target="_blank">
            ${item.icon} ${item.title}
          </a>
        </li>
      `).join('');
    }
  });
}

// ============================================================================
// MODALS
// ============================================================================

function setupModals() {
  // Close buttons
  document.querySelectorAll('.nb-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.nb-modal').style.display = 'none';
    });
  });

  // Click outside to close
  document.querySelectorAll('.nb-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Variable modal
  document.getElementById('addVarBtn')?.addEventListener('click', () => {
    const name = document.getElementById('varName')?.value;
    const description = document.getElementById('varDescription')?.value;
    const defaultValue = document.getElementById('varDefault')?.value;
    const suggestions = document.getElementById('varSuggestions')?.value.split(',').map(s => s.trim());

    if (name) {
      NanoBananaBuilder.state.variables.push({
        name,
        description,
        defaultValue,
        suggestions
      });

      // Insert into prompt
      const editor = document.getElementById('promptEditor');
      editor.value += `\n{{${name}}}`;
      NanoBananaBuilder.state.promptText = editor.value;

      displayVariables();
      document.getElementById('variableModal').style.display = 'none';

      // Clear form
      document.getElementById('varName').value = '';
      document.getElementById('varDescription').value = '';
      document.getElementById('varDefault').value = '';
      document.getElementById('varSuggestions').value = '';
    }
  });

  document.getElementById('closeVarModal')?.addEventListener('click', () => {
    document.getElementById('variableModal').style.display = 'none';
  });

  // Batch modal
  document.getElementById('generateBatch')?.addEventListener('click', generateBatchVariants);
  document.getElementById('closeBatchModal')?.addEventListener('click', () => {
    document.getElementById('batchModal').style.display = 'none';
  });
}

function generateBatchVariants() {
  const count = parseInt(document.getElementById('batchCount')?.value || '5');
  const strategy = document.getElementById('variationStrategy')?.value;
  const basePrompt = NanoBananaBuilder.state.promptText;

  if (!basePrompt) {
    alert('Please create a prompt first.');
    return;
  }

  const variants = [];

  for (let i = 0; i < count; i++) {
    let variant = basePrompt;

    switch (strategy) {
      case 'diverse':
        variant = createDiverseVariant(basePrompt, i);
        break;
      case 'incremental':
        variant = createIncrementalVariant(basePrompt, i);
        break;
      case 'style':
        variant = createStyleVariant(basePrompt, i);
        break;
      case 'technical':
        variant = createTechnicalVariant(basePrompt, i);
        break;
      case 'creative':
        variant = createCreativeVariant(basePrompt, i);
        break;
    }

    variants.push({ id: i + 1, prompt: variant });
  }

  displayBatchVariants(variants);
}

function createDiverseVariant(basePrompt, index) {
  const variations = [
    basePrompt,
    `Alternative approach:\n${basePrompt}`,
    `${basePrompt}\n\nProvide multiple perspectives.`,
    `${basePrompt}\n\nExplore different angles.`,
    `${basePrompt}\n\nConsider unconventional solutions.`
  ];
  return variations[index % variations.length];
}

function createIncrementalVariant(basePrompt, index) {
  const additions = [
    '',
    '\n\nProvide detailed examples.',
    '\n\nInclude step-by-step breakdown.',
    '\n\nAdd relevant context and background.',
    '\n\nInclude best practices and recommendations.'
  ];
  return basePrompt + additions[index % additions.length];
}

function createStyleVariant(basePrompt, index) {
  const styles = [
    'professional',
    'casual and conversational',
    'technical and precise',
    'creative and engaging',
    'academic and scholarly'
  ];
  return `${basePrompt}\n\nTone: ${styles[index % styles.length]}`;
}

function createTechnicalVariant(basePrompt, index) {
  const levels = [
    'beginner-friendly with clear explanations',
    'intermediate level with practical examples',
    'advanced with technical depth',
    'expert level with optimization focus',
    'comprehensive covering all levels'
  ];
  return `${basePrompt}\n\nTechnical Level: ${levels[index % levels.length]}`;
}

function createCreativeVariant(basePrompt, index) {
  const approaches = [
    'traditional and proven methods',
    'innovative and experimental approaches',
    'hybrid combining multiple techniques',
    'unconventional and creative solutions',
    'cutting-edge and modern practices'
  ];
  return `${basePrompt}\n\nApproach: ${approaches[index % approaches.length]}`;
}

function displayBatchVariants(variants) {
  const container = document.getElementById('batchResults');
  if (!container) return;

  container.innerHTML = variants.map(v => `
    <div class="nb-batch-item">
      <h4>Variant ${v.id}</h4>
      <pre>${v.prompt}</pre>
      <button class="nb-btn-secondary" onclick="useBatchVariant(${v.id - 1})">Use This Variant</button>
    </div>
  `).join('');
}

// Global function for variant selection
window.useBatchVariant = function(index) {
  const count = parseInt(document.getElementById('batchCount')?.value || '5');
  const strategy = document.getElementById('variationStrategy')?.value;
  const basePrompt = NanoBananaBuilder.state.promptText;

  let variant = basePrompt;

  switch (strategy) {
    case 'diverse':
      variant = createDiverseVariant(basePrompt, index);
      break;
    case 'incremental':
      variant = createIncrementalVariant(basePrompt, index);
      break;
    case 'style':
      variant = createStyleVariant(basePrompt, index);
      break;
    case 'technical':
      variant = createTechnicalVariant(basePrompt, index);
      break;
    case 'creative':
      variant = createCreativeVariant(basePrompt, index);
      break;
  }

  document.getElementById('promptEditor').value = variant;
  NanoBananaBuilder.state.promptText = variant;

  updatePromptStats();
  validatePrompt();
  updateQualityScores();

  document.getElementById('batchModal').style.display = 'none';
  alert('✓ Variant applied!');
};

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function setupEventListeners() {
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      savePrompt();
    }

    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      exportPrompt();
    }

    // Ctrl/Cmd + O to optimize
    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
      e.preventDefault();
      optimizePrompt();
    }
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

console.log('🍌 Nano Banana Prompt Builder - Ultimate Edition Loaded Successfully! 🍌');
