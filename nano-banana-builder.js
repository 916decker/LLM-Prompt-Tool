/**
 * Google Nano Banana Prompt Builder - Ultimate Edition
 * The world's most advanced prompt engineering system for Gemini 2.5 Flash Image (Nano Banana)
 *
 * GEMINI 2.5 FLASH IMAGE WORKFLOWS:
 * 1. Text → Image: Generate images from text descriptions
 * 2. Image Editing: Remove/add/replace objects in existing images
 * 3. Multi-Image Fusion: Blend multiple images, style transfer, character consistency
 * 4. Conversational Refinement: Iterative multi-turn editing
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
    selectedWorkflow: 'text-to-image', // NEW: Workflow selection
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
  // WORKFLOW DEFINITIONS FOR GEMINI 2.5 FLASH IMAGE
  // ============================================================================

  workflows: {
    'text-to-image': {
      id: 'text-to-image',
      name: 'Text → Image Generation',
      icon: '🎨',
      description: 'Generate images from scratch using detailed text descriptions',
      capabilities: ['Photography prompts', 'Illustrated scenes', 'Product visualization', 'Character design', 'Technical renderings'],
      examplePrompt: 'A professional photograph of a golden retriever playing in a sunlit meadow, shot with a Canon EOS R5, 85mm f/1.4 lens, shallow depth of field, golden hour lighting, warm color palette'
    },
    'image-editing': {
      id: 'image-editing',
      name: 'Image Editing',
      icon: '✂️',
      description: 'Remove, add, or replace objects in existing images',
      capabilities: ['Remove unwanted objects', 'Add new elements', 'Replace backgrounds', 'Color grading', 'Object manipulation'],
      examplePrompt: 'Remove the car from the background and replace it with blooming cherry blossom trees. Maintain natural lighting and perspective.'
    },
    'multi-image-fusion': {
      id: 'multi-image-fusion',
      name: 'Multi-Image Fusion',
      icon: '🔄',
      description: 'Blend multiple images, apply style transfer, ensure character consistency',
      capabilities: ['Character + scene blending', 'Style transfer from reference', 'Consistent characters across scenes', 'Image compositing', 'Artistic style application'],
      examplePrompt: 'Place the character from Image A into the scene from Image B, maintaining consistent lighting and applying the artistic style from Image C'
    },
    'conversational': {
      id: 'conversational',
      name: 'Conversational Refinement',
      icon: '💬',
      description: 'Iterative multi-turn editing for progressive refinement',
      capabilities: ['Sequential edits', 'Iterative improvements', 'Progressive detailing', 'Multi-step transformations', 'Guided refinement'],
      examplePrompt: 'Turn 1: Make the lighting more dramatic. Turn 2: Add a fog effect in the background. Turn 3: Increase color saturation by 20%.'
    }
  },

  // ============================================================================
  // ONBOARDING CONTENT
  // ============================================================================

  onboardingLessons: {
    intro: {
      title: '🍌 Welcome to Gemini 2.5 Flash Image',
      content: `
        <h3>What is Gemini 2.5 Flash Image (Nano Banana)?</h3>
        <p><strong>Gemini 2.5 Flash Image</strong> (codename "Nano Banana") is Google DeepMind's advanced AI model for image generation and manipulation with 4 distinct workflows.</p>

        <div class="nb-highlight">
          <strong>🎯 Four Powerful Workflows:</strong>
          <ul>
            <li><strong>Text → Image</strong> - Generate images from detailed text descriptions</li>
            <li><strong>Image Editing</strong> - Remove/add/replace objects in existing images</li>
            <li><strong>Multi-Image Fusion</strong> - Blend images, style transfer, character consistency</li>
            <li><strong>Conversational Refinement</strong> - Iterative multi-turn editing</li>
          </ul>
        </div>

        <div class="nb-highlight">
          <strong>🔒 Built-in Safety:</strong>
          <ul>
            <li><strong>SynthID Watermarking</strong> - Invisible watermarks on AI-generated images</li>
            <li><strong>Content Filtering</strong> - Blocks harmful, violent, or inappropriate content</li>
            <li><strong>Quality Assurance</strong> - Maintains natural appearance and coherence</li>
          </ul>
        </div>

        <h3>Why Use This Builder?</h3>
        <p>Crafting effective prompts for image generation is both an art and a science. This tool combines proven prompt engineering techniques with Gemini 2.5 Flash Image's specific capabilities.</p>

        <p><strong>✨ What makes this builder special:</strong></p>
        <ul>
          <li>Real-time validation and scoring</li>
          <li>100+ photography-specific templates</li>
          <li>Equipment Wizard for camera/lens selection</li>
          <li>Subject consistency tracking</li>
          <li>10+ advanced prompt techniques</li>
          <li>Meta-evaluation and self-critique</li>
          <li>Automatic optimization to 10/10 quality</li>
        </ul>
      `
    },
    strengths: {
      title: '💪 Gemini 2.5 Flash Image Strengths',
      content: `
        <h3>What Gemini 2.5 Flash Image Excels At</h3>

        <div class="nb-highlight">
          <strong>📸 Photorealistic Generation</strong>
          <p>Produces highly realistic photographs with accurate lighting, composition, and details. Understands camera equipment specifications (lenses, apertures, focal lengths).</p>
        </div>

        <div class="nb-highlight">
          <strong>✂️ Precise Image Editing</strong>
          <p>Seamlessly removes, adds, or replaces objects while maintaining natural lighting, perspective, and coherence. No visible editing artifacts.</p>
        </div>

        <div class="nb-highlight">
          <strong>👤 Character Consistency</strong>
          <p>Maintains consistent character appearance across multiple scenes and variations. Preserves specific features, clothing, and style.</p>
        </div>

        <div class="nb-highlight">
          <strong>🎨 Style Transfer & Fusion</strong>
          <p>Blends multiple images intelligently, applies artistic styles from references, and creates cohesive composites.</p>
        </div>

        <div class="nb-highlight">
          <strong>🔄 Iterative Refinement</strong>
          <p>Supports conversational multi-turn editing for progressive improvements without starting over.</p>
        </div>

        <p><strong>Best Use Cases:</strong></p>
        <ul>
          <li><strong>Commercial Photography:</strong> Product shots, marketing visuals, professional portraits</li>
          <li><strong>Creative Projects:</strong> Character designs, scene illustrations, concept art</li>
          <li><strong>Image Enhancement:</strong> Background replacement, object removal, color grading</li>
          <li><strong>Style Exploration:</strong> Applying artistic styles, exploring variations</li>
          <li><strong>Character-Based Content:</strong> Consistent characters across multiple scenes</li>
        </ul>
      `
    },
    limitations: {
      title: '⚠️ Understanding Limitations',
      content: `
        <h3>What to Watch Out For</h3>

        <p>Understanding limitations helps you craft better prompts:</p>

        <div class="nb-highlight">
          <strong>✋ Text in Images</strong>
          <p>May struggle with accurate text rendering, especially complex words or non-Latin scripts.</p>
          <p><em>Tip: Keep text simple, use single words, or add text post-generation.</em></p>
        </div>

        <div class="nb-highlight">
          <strong>🔢 Counting & Precise Numbers</strong>
          <p>Exact counts (e.g., "exactly 7 flowers") may not be perfectly accurate.</p>
          <p><em>Tip: Use approximate language ("several", "many") unless precision is critical.</em></p>
        </div>

        <div class="nb-highlight">
          <strong>👥 Multiple Similar Subjects</strong>
          <p>Complex scenes with many similar objects may have minor inconsistencies.</p>
          <p><em>Tip: Focus on 1-3 main subjects for best results.</em></p>
        </div>

        <div class="nb-highlight">
          <strong>🎲 Output Variation</strong>
          <p>Same prompt may produce different variations. This is intentional for creative exploration.</p>
          <p><em>Tip: Use conversational refinement to guide toward your vision.</em></p>
        </div>

        <div class="nb-highlight">
          <strong>🚫 Content Policy</strong>
          <p>Blocks harmful, violent, sexual, or copyrighted content automatically.</p>
          <p><em>Tip: Focus on original, safe, creative concepts.</em></p>
        </div>

        <h3>Mitigation Strategies</h3>
        <ul>
          <li>Use specific photography terms (lens, lighting, composition)</li>
          <li>Reference camera equipment for photorealism</li>
          <li>Provide clear subject descriptions for character consistency</li>
          <li>Use negative constraints ("avoid", "maintain natural skin tones")</li>
          <li>Iterate with conversational refinement for perfection</li>
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
  // TEMPLATE LIBRARY - 100+ Gemini 2.5 Flash Image Templates
  // ============================================================================

  templates: [
    // ========================================
    // WORKFLOW 1: TEXT → IMAGE GENERATION
    // ========================================

    // PORTRAIT PHOTOGRAPHY
    {
      id: 'portrait-professional',
      name: 'Professional Portrait Photography',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'intermediate',
      tags: ['portrait', 'photography', 'professional'],
      recommended: true,
      description: 'Create professional portrait photographs with camera specifications',
      example: {
        subject: 'a confident female CEO in her 40s',
        camera_type: 'Sony A7R V',
        lens_type: 'portrait',
        focal_length: '85',
        aperture: '1.4',
        depth_of_field: 'shallow, blurred background',
        primary_lighting: 'softbox positioned 45 degrees to the right',
        fill_lighting: 'reflector on the left side',
        lighting_style: 'soft, professional',
        shot_type: 'mid-shot from waist up',
        angle: 'eye-level',
        background: 'modern office with blurred city view through windows',
        color_palette: 'cool professional tones, navy and white',
        expression: 'confident, approachable smile',
        atmosphere: 'professional yet warm',
        photography_style: 'corporate editorial',
        post_processing: 'subtle color grading, sharp details, natural skin tones'
      },
      didYouKnow: 'Portrait lenses (85mm, 100mm) create beautiful background blur (bokeh) that makes your subject stand out! The f/1.4 aperture lets you control exactly how blurry the background is.',
      relatedTemplates: ['character-design', 'product-photography', 'visual-storytelling-scenes'],
      template: `Professional portrait photograph of {{subject}}

Camera Setup:
- Camera: {{camera_type}} (e.g., Canon EOS R5, Nikon Z9, Sony A7R V)
- Lens: {{lens_type}} {{focal_length}}mm f/{{aperture}}
- Depth of Field: {{depth_of_field}}

Lighting:
- Primary Light: {{primary_lighting}}
- Fill Light: {{fill_lighting}}
- Overall Lighting: {{lighting_style}} (e.g., soft, dramatic, natural, studio)

Composition:
- Shot Type: {{shot_type}} (e.g., headshot, mid-shot, full-body)
- Angle: {{angle}} (e.g., eye-level, slightly above, low angle)
- Background: {{background}}
- Color Palette: {{color_palette}}

Mood & Style:
- Expression: {{expression}}
- Atmosphere: {{atmosphere}}
- Style: {{photography_style}} (e.g., editorial, corporate, lifestyle, fashion)

Technical Specifications:
- Image Quality: High resolution, sharp focus on eyes, natural skin tones
- Post-Processing: {{post_processing}} (e.g., subtle color grading, maintained naturalness)`
    },

    // LANDSCAPE PHOTOGRAPHY
    {
      id: 'landscape-photography',
      name: 'Landscape Photography',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'intermediate',
      tags: ['landscape', 'nature', 'scenery'],
      recommended: true,
      description: 'Create breathtaking landscape photographs',
      example: {
        location_description: 'mountain lake surrounded by pine forests at sunrise',
        camera_type: 'Canon EOS R6',
        lens_type: 'wide-angle 16-35mm f/2.8',
        f_stop: '11',
        depth_preference: 'maximum depth of field, everything in focus',
        time_of_day: 'golden hour sunrise, 30 minutes after dawn',
        weather_conditions: 'clear sky with light morning mist',
        lighting_quality: 'warm, directional golden light',
        foreground_elements: 'rocky shoreline with wildflowers',
        midground_elements: 'crystal clear lake with mirror reflections',
        background_elements: 'snow-capped mountain peaks',
        composition_rule: 'rule of thirds, mountains in upper third, lake in middle third',
        color_palette: 'warm golds and oranges, cool blue shadows',
        mood: 'serene, majestic, awe-inspiring',
        season: 'early autumn',
        post_processing: 'enhanced colors, HDR look, maintained naturalness'
      },
      didYouKnow: 'Golden hour (shortly after sunrise or before sunset) creates magical warm light perfect for landscapes! Using f/11 or higher ensures everything from foreground to background stays sharp.',
      relatedTemplates: ['food-photography', 'product-photography', 'poster-banner-design'],
      template: `Landscape photograph of {{location_description}}

Camera Setup:
- Camera: {{camera_type}} (e.g., Canon EOS R6, Sony A7III)
- Lens: {{lens_type}} (e.g., wide-angle 16-35mm f/2.8, ultra-wide 10-24mm)
- Settings: f/{{f_stop}} for {{depth_preference}}

Time & Lighting:
- Time of Day: {{time_of_day}} (e.g., golden hour, blue hour, midday, twilight)
- Weather: {{weather_conditions}}
- Natural Lighting: {{lighting_quality}}

Composition:
- Foreground: {{foreground_elements}}
- Midground: {{midground_elements}}
- Background: {{background_elements}}
- Composition Rule: {{composition_rule}} (e.g., rule of thirds, leading lines, golden ratio)

Atmosphere:
- Color Palette: {{color_palette}}
- Mood: {{mood}}
- Season: {{season}}

Technical Specifications:
- Focus: Everything in sharp focus (f/8-f/16)
- Dynamic Range: Balanced exposure across highlights and shadows
- Post-Processing: {{post_processing}} (e.g., enhanced colors, HDR look, natural)`
    },

    // PRODUCT PHOTOGRAPHY
    {
      id: 'product-photography',
      name: 'Professional Product Photography',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'intermediate',
      tags: ['product', 'commercial', 'e-commerce'],
      recommended: true,
      description: 'Create professional product photographs for commercial use',
      example: {
        product_name: 'premium leather wallet',
        product_type: 'luxury accessory',
        features_to_highlight: 'hand-stitched seams, Italian leather, RFID protection',
        material: 'full-grain Italian leather with brass hardware',
        product_color: 'rich cognac brown',
        camera_type: 'Sony A7R IV',
        lens_type: 'macro 100mm f/2.8',
        camera_angle: '45-degree angle showing front and side',
        lighting_setup: 'softbox studio lighting with two lights at 45 degrees',
        shadow_style: 'soft shadows on the right side',
        reflection_style: 'subtle reflection on glossy surface',
        background: 'pure white seamless backdrop',
        props: 'minimalist, just a few copper coins artfully placed',
        setting: 'clean studio environment',
        photo_style: 'clean commercial',
        color_grading: 'warm tones enhanced',
        mood: 'premium, sophisticated, timeless',
        depth_of_field: 'moderate, product entirely in focus with slight background blur',
        perspective_correction: 'corrected, no distortion'
      },
      didYouKnow: 'Professional product photography uses at least 2 lights to eliminate harsh shadows! The 45-degree lighting angle is perfect for showing texture and dimension.',
      relatedTemplates: ['product-description-writer', 'food-photography', 'poster-banner-design'],
      template: `Professional product photograph of {{product_name}}

Product Details:
- Product Type: {{product_type}}
- Key Features: {{features_to_highlight}}
- Material/Texture: {{material}}
- Color: {{product_color}}

Camera Setup:
- Camera: {{camera_type}} (e.g., Canon 5D Mark IV, Sony A7R IV)
- Lens: {{lens_type}} (e.g., macro 100mm f/2.8, 50mm f/1.8)
- Angle: {{camera_angle}} (e.g., 45-degree, straight-on, top-down)

Lighting:
- Lighting Setup: {{lighting_setup}} (e.g., softbox studio lighting, natural window light)
- Shadows: {{shadow_style}} (e.g., soft shadows, dramatic shadows, no shadows)
- Reflections: {{reflection_style}}

Background & Context:
- Background: {{background}} (e.g., pure white, lifestyle context, textured surface)
- Props: {{props}}
- Setting: {{setting}} (e.g., studio, lifestyle, outdoor)

Style & Mood:
- Photography Style: {{photo_style}} (e.g., clean commercial, lifestyle, editorial)
- Color Grading: {{color_grading}}
- Mood: {{mood}}

Technical Requirements:
- Focus: Sharp product focus, {{depth_of_field}}
- Quality: High resolution, color-accurate, no distortion
- Perspective: {{perspective_correction}}`
    },

    // FOOD PHOTOGRAPHY
    {
      id: 'food-photography',
      name: 'Food Photography',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'intermediate',
      tags: ['food', 'culinary', 'restaurant'],
      description: 'Create appetizing food photographs',
      template: `Food photograph of {{dish_name}}

Camera Setup:
- Camera: {{camera_type}} (e.g., Canon EOS R5, Sony A7III)
- Lens: {{lens_type}} (e.g., 50mm f/1.4, 100mm macro f/2.8)
- Angle: {{camera_angle}} (e.g., 45-degree, overhead flat lay, eye-level)
- Depth of Field: {{depth_of_field}} (e.g., shallow bokeh, moderate, deep focus)

Lighting:
- Light Source: {{light_source}} (e.g., natural window light, softbox, backlit)
- Light Direction: {{light_direction}}
- Mood: {{lighting_mood}} (e.g., bright and airy, moody and dramatic)

Composition:
- Plating Style: {{plating_style}}
- Props & Styling: {{props}} (e.g., cutlery, napkins, ingredients, background textures)
- Background: {{background}}
- Color Palette: {{color_palette}}

Food Styling:
- Texture Emphasis: {{texture_details}} (e.g., crispy edges, glossy sauce, fresh herbs)
- Garnishes: {{garnishes}}
- Steam/Freshness Indicators: {{freshness_cues}}

Style & Mood:
- Photography Style: {{photography_style}} (e.g., rustic, modern, editorial, restaurant menu)
- Atmosphere: {{atmosphere}}

Technical Specifications:
- Focus: Sharp on main dish, {{background_blur}}
- Colors: Vibrant, appetizing, true-to-life
- Post-Processing: {{post_processing}} (e.g., enhanced saturation, natural look)`
    },

    // CHARACTER DESIGN
    {
      id: 'character-design',
      name: 'Character Design & Illustration',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'advanced',
      tags: ['character', 'design', 'illustration'],
      recommended: true,
      description: 'Create detailed character designs with consistent features',
      example: {
        character_name: 'Luna Starweaver',
        species: 'human with magical abilities',
        age: '16 years old',
        body_type: 'petite, athletic',
        height_build: '5\'4", lean with defined muscles',
        skin_tone: 'warm medium brown',
        hair_description: 'long silver-white hair with purple streaks, braided crown style',
        eye_description: 'bright violet eyes with star-shaped pupils, expressive',
        distinctive_features: 'constellation-shaped birthmark on left cheek, glowing runes on forearms',
        outfit_description: 'flowing purple and silver battle robes with leather armor pieces',
        clothing_style: 'fantasy mage-warrior hybrid',
        accessories: 'crescent moon pendant, fingerless gloves, tall leather boots',
        clothing_colors: 'deep purple, silver, black leather',
        pose: 'confident stance, hands glowing with magical energy',
        expression: 'determined yet kind, slight smile',
        body_language: 'ready for action, weight shifted to left leg',
        setting: 'floating above ancient ruins under starry sky',
        background: 'mystical ruins with glowing crystals',
        environment: 'magical energy swirling around her',
        art_style: 'anime-inspired, semi-realistic',
        line_work: 'clean, dynamic lines',
        coloring_style: 'vibrant digital painting',
        shading_style: 'cel-shaded with soft gradients',
        personality: 'brave, curious, protective of friends',
        mood: 'heroic, magical, adventurous',
        view_type: 'full-body front view with slight three-quarter turn',
        detail_level: 'highly detailed, character sheet quality',
        specific_features_to_remember: 'silver-white hair with purple streaks, violet star-shaped pupils, constellation birthmark, glowing forearm runes'
      },
      didYouKnow: 'Character consistency is KEY for sequels! Note specific features like eye color, hair style, and distinctive marks in your prompt so you can recreate the same character in future scenes.',
      relatedTemplates: ['visual-storytelling-scenes', 'fusion-character-consistency', 'portrait-professional'],
      template: `Character design illustration of {{character_name}}

Physical Attributes:
- Species/Type: {{species}}
- Age: {{age}}
- Body Type: {{body_type}}
- Height/Build: {{height_build}}
- Skin Tone: {{skin_tone}}
- Hair: {{hair_description}} (style, color, length)
- Eyes: {{eye_description}} (color, shape, distinctive features)
- Distinctive Features: {{distinctive_features}} (scars, tattoos, accessories, unique traits)

Clothing & Accessories:
- Outfit: {{outfit_description}}
- Style: {{clothing_style}}
- Accessories: {{accessories}}
- Colors: {{clothing_colors}}

Pose & Expression:
- Pose: {{pose}}
- Expression: {{expression}}
- Body Language: {{body_language}}

Background & Context:
- Setting: {{setting}}
- Background: {{background}}
- Environmental Elements: {{environment}}

Art Style:
- Style: {{art_style}} (e.g., anime, realistic, cartoon, semi-realistic, comic book)
- Line Work: {{line_work}}
- Coloring Style: {{coloring_style}}
- Shading: {{shading_style}}

Character Personality Indicators:
- Personality Traits: {{personality}}
- Mood/Atmosphere: {{mood}}

Technical Specifications:
- View: {{view_type}} (e.g., full-body front view, three-quarter view, character sheet)
- Detail Level: {{detail_level}}
- Quality: High resolution, clean lines, professional illustration quality

IMPORTANT FOR CONSISTENCY: Note key features like {{specific_features_to_remember}} for use in future prompts to maintain character consistency.`
    },

    // ========================================
    // WORKFLOW 2: IMAGE EDITING
    // ========================================

    {
      id: 'edit-background-replace',
      name: 'Background Replacement',
      category: 'image-editing',
      workflow: 'image-editing',
      complexity: 'intermediate',
      tags: ['editing', 'background', 'replacement'],
      recommended: true,
      description: 'Replace image backgrounds while maintaining subject integrity',
      template: `Replace the background in the provided image:

Target Subject:
- Keep: {{subject_to_keep}} (describe what should remain unchanged)
- Preserve: {{features_to_preserve}} (lighting on subject, shadows, perspective)

New Background:
- Background Type: {{new_background}} (e.g., outdoor landscape, studio backdrop, urban setting)
- Environment: {{environment_details}}
- Time of Day: {{time_of_day}}
- Weather/Atmosphere: {{atmosphere}}

Integration Requirements:
- Lighting Match: Adjust subject lighting to match new background {{lighting_direction}}
- Perspective Match: Ensure subject perspective aligns with new background
- Shadow/Reflection: Add appropriate {{shadow_type}} beneath/around subject
- Color Harmony: {{color_grading_adjustment}} to blend subject with new background
- Edge Quality: Maintain natural, clean edges around subject

Technical Specifications:
- Maintain subject sharpness and detail
- Seamless integration, no visible editing artifacts
- Natural lighting and color transitions
- Preserve original image resolution

Constraints:
- Avoid: {{objects_to_avoid}}
- Maintain: {{elements_to_maintain}} (e.g., natural appearance, realistic lighting, proper scale)`
    },

    {
      id: 'edit-object-remove',
      name: 'Object Removal',
      category: 'image-editing',
      workflow: 'image-editing',
      complexity: 'simple',
      tags: ['editing', 'removal', 'cleanup'],
      recommended: true,
      description: 'Remove unwanted objects from images',
      template: `Remove the following from the provided image:

Objects to Remove:
- {{object_1_to_remove}}
- {{object_2_to_remove}}
- {{object_3_to_remove}}

Replacement/Fill Strategy:
- Fill with: {{fill_strategy}} (e.g., seamless background continuation, similar texture, natural environment)
- Match: {{match_requirements}} (surrounding colors, textures, patterns, lighting)

Quality Requirements:
- No visible editing artifacts or seams
- Natural continuation of background elements
- Maintain original perspective and depth
- Preserve lighting consistency
- Match grain/texture of surrounding area

Constraints:
- Keep everything else unchanged
- Maintain natural appearance
- Seamless integration

Additional Notes:
{{additional_instructions}}`
    },

    {
      id: 'edit-object-add',
      name: 'Add Objects to Image',
      category: 'image-editing',
      workflow: 'image-editing',
      complexity: 'intermediate',
      tags: ['editing', 'addition', 'compositing'],
      description: 'Add new objects or elements to existing images',
      template: `Add the following to the provided image:

Object(s) to Add:
- {{object_to_add}} (detailed description)
- Location: {{placement_location}} (specific position in image)
- Size/Scale: {{size_scale}} relative to existing elements
- Orientation: {{orientation}}

Integration Requirements:
- Lighting Match: Match {{existing_lighting_direction}} and {{lighting_quality}}
- Perspective Match: Follow existing {{perspective_angle}}
- Shadows: Add appropriate {{shadow_type}} consistent with scene lighting
- Color Grading: Match {{color_temperature}} and overall color palette
- Depth Integration: Place at {{depth_layer}} (foreground/midground/background)

Style Matching:
- Match existing image style: {{image_style}}
- Texture/Detail Level: {{texture_match}}
- Focus/Sharpness: {{focus_match}} based on depth

Technical Requirements:
- Seamless integration, no visible compositing
- Natural lighting and shadows
- Proper scale and perspective
- Maintain original image quality

Constraints:
- Avoid: {{elements_to_avoid}}
- Maintain: {{elements_to_preserve}} unchanged

Atmosphere:
- Ensure added object(s) fit the scene's {{atmosphere}} and {{context}}`
    },

    {
      id: 'edit-color-grade',
      name: 'Color Grading & Mood Adjustment',
      category: 'image-editing',
      workflow: 'image-editing',
      complexity: 'intermediate',
      tags: ['editing', 'color', 'grading', 'mood'],
      description: 'Apply color grading and mood adjustments to images',
      template: `Apply color grading to the provided image:

Target Mood/Style:
- Overall Mood: {{target_mood}} (e.g., warm and cozy, cool and modern, dramatic, vintage)
- Color Palette: {{color_palette}} (e.g., warm tones, cool blues, desaturated, vibrant)
- Reference Style: {{reference_style}} (e.g., cinematic, Instagram aesthetic, film photography)

Color Adjustments:
- Temperature: {{temperature_shift}} (warmer/cooler)
- Saturation: {{saturation_level}} (increased/decreased/selective)
- Contrast: {{contrast_adjustment}}
- Highlights: {{highlights_adjustment}}
- Shadows: {{shadows_adjustment}}

Specific Color Modifications:
- {{color_1}}: {{color_1_adjustment}}
- {{color_2}}: {{color_2_adjustment}}
- Skin Tones: {{skin_tone_adjustment}} (maintain natural appearance)

Artistic Effects:
- Vignette: {{vignette_style}}
- Grain/Texture: {{grain_effect}}
- Clarity: {{clarity_adjustment}}

Constraints:
- Maintain: {{elements_to_preserve}} (e.g., natural skin tones, detail in shadows)
- Avoid: {{avoid_elements}} (e.g., over-saturation, loss of detail, unnatural colors)

Technical Requirements:
- Preserve image detail and sharpness
- Smooth, professional color transitions
- Maintain proper exposure balance
- No color banding or artifacts`
    },

    // ========================================
    // WORKFLOW 3: MULTI-IMAGE FUSION
    // ========================================

    {
      id: 'fusion-character-scene',
      name: 'Character + Scene Fusion',
      category: 'multi-image-fusion',
      workflow: 'multi-image-fusion',
      complexity: 'advanced',
      tags: ['fusion', 'character', 'compositing'],
      recommended: true,
      description: 'Place a character from one image into a scene from another',
      template: `Fuse character from Image A into scene from Image B:

Image A (Character Source):
- Subject to Extract: {{character_description}}
- Keep: {{features_to_keep}} (pose, clothing, expression)
- Note Specific Features: {{specific_features}} (for consistency)

Image B (Scene/Background):
- Environment: {{scene_description}}
- Placement Location: {{placement_location}} in the scene
- Desired Position: {{position_details}}

Integration Requirements:
- Lighting Match: Adjust character lighting to match {{scene_lighting_direction}} and {{lighting_quality}}
- Perspective: Ensure character perspective fits {{scene_perspective}}
- Scale: Adjust character size to be {{scale_relationship}} relative to scene elements
- Shadows: Add {{shadow_type}} beneath/around character matching scene lighting
- Depth: Place character at {{depth_position}} (foreground/midground/background)

Color Harmony:
- Color Grading: {{color_adjustment}} to blend character with scene color palette
- Temperature Match: Adjust to match scene's {{color_temperature}}

Technical Requirements:
- Seamless edges around character
- Natural integration, no visible compositing
- Maintain character detail and quality
- Preserve scene background quality

Atmosphere:
- Ensure character fits the scene's {{atmosphere}} and {{context}}
- Expression/Pose: {{expression_adjustment}} if needed to match scene mood

Constraints:
- Maintain natural appearance
- Keep {{preserved_elements}} unchanged
- Avoid {{elements_to_avoid}}`
    },

    {
      id: 'fusion-style-transfer',
      name: 'Artistic Style Transfer',
      category: 'multi-image-fusion',
      workflow: 'multi-image-fusion',
      complexity: 'advanced',
      tags: ['fusion', 'style', 'artistic'],
      recommended: true,
      description: 'Apply the artistic style from one image to another',
      template: `Apply the artistic style from Image A to Image B:

Image A (Style Reference):
- Style Type: {{style_type}} (e.g., impressionist painting, anime art style, watercolor, oil painting)
- Key Style Elements: {{style_elements}} (brushstrokes, color palette, line work, texture)
- Artistic Characteristics: {{artistic_characteristics}}

Image B (Content to Transform):
- Subject: {{content_description}}
- Elements to Preserve: {{elements_to_preserve}} (composition, main subjects, layout)
- Elements to Transform: {{elements_to_transform}}

Style Application:
- Intensity: {{style_intensity}} (subtle/moderate/strong application)
- Color Palette: {{color_palette_approach}} (adopt reference colors/maintain original/blend)
- Texture: Apply {{texture_style}} from reference
- Detail Level: {{detail_level}}

Balance:
- Content Recognition: {{content_visibility}} (keep content clearly recognizable)
- Style Prominence: {{style_prominence}}
- Blend Strategy: {{blend_strategy}}

Technical Requirements:
- Smooth, consistent style application
- Maintain image coherence
- No jarring transitions
- Professional artistic quality

Constraints:
- Preserve: {{preserved_content}} (e.g., facial features, main subjects)
- Avoid: {{style_avoid}} (over-distortion, loss of subject recognition)

Output Style:
- Final Look: {{final_aesthetic}}`
    },

    {
      id: 'fusion-character-consistency',
      name: 'Character Consistency Across Scenes',
      category: 'multi-image-fusion',
      workflow: 'multi-image-fusion',
      complexity: 'expert',
      tags: ['fusion', 'character', 'consistency'],
      recommended: true,
      description: 'Maintain the same character appearance across different scenes',
      template: `Create a new scene featuring the character from the reference image:

Reference Character (from Image A):
- Character Description: {{character_description}}
- CRITICAL FEATURES TO MAINTAIN:
  * Facial Features: {{facial_features}} (eyes, nose, mouth, face shape)
  * Hair: {{hair_details}} (style, color, length, texture)
  * Body Type: {{body_type}}
  * Distinctive Marks: {{distinctive_features}} (scars, tattoos, accessories)
  * Clothing: {{clothing}} (if maintaining same outfit)
  * Age: {{age}}
  * Style Characteristics: {{style_characteristics}}

New Scene:
- Setting: {{new_setting}}
- Background: {{new_background}}
- Lighting: {{new_lighting}}
- Time/Weather: {{time_weather}}

Character in New Scene:
- Pose: {{new_pose}}
- Action: {{action}}
- Expression: {{expression}}
- Clothing: {{clothing_in_new_scene}} (same as reference / new outfit described)
- Camera Angle: {{camera_angle}}

Consistency Requirements:
- MUST maintain exact same: {{exact_same_features}} (facial features, hair, distinctive marks)
- Lighting can change but character features must remain identical
- Age and body type must stay consistent
- Overall character recognition must be immediate

Technical Specifications:
- High quality, detailed rendering
- Clear, recognizable features
- Proper integration with new environment
- Consistent art style with reference

Constraints:
- Character must be unmistakably the same person/character
- Avoid any changes to: {{features_cannot_change}}
- Natural appearance in new scene context`
    },

    // ========================================
    // WORKFLOW 4: CONVERSATIONAL REFINEMENT
    // ========================================

    {
      id: 'conv-sequential-edits',
      name: 'Sequential Editing Chain',
      category: 'conversational',
      workflow: 'conversational',
      complexity: 'advanced',
      tags: ['conversational', 'iterative', 'refinement'],
      recommended: true,
      description: 'Multi-turn sequential edits for progressive improvements',
      template: `Multi-turn editing sequence:

TURN 1 - Initial Request:
{{turn_1_request}}
Expected Outcome: {{turn_1_outcome}}

TURN 2 - First Refinement:
Building on Turn 1 result:
{{turn_2_request}}
Expected Outcome: {{turn_2_outcome}}

TURN 3 - Second Refinement:
Building on Turn 2 result:
{{turn_3_request}}
Expected Outcome: {{turn_3_outcome}}

TURN 4 - Final Polish (if needed):
{{turn_4_request}}
Expected Final Result: {{final_outcome}}

Guidelines for Each Turn:
- Maintain progress from previous turns
- Apply incremental improvements
- Preserve quality and details from earlier turns
- Build progressively toward final vision

Final Requirements:
- Overall Style: {{final_style}}
- Quality: {{quality_standards}}
- Mood: {{final_mood}}

Notes:
- Each turn should enhance, not restart
- Preserve successful elements from previous turns
- Focus each turn on specific improvement area`
    },

    {
      id: 'conv-progressive-detail',
      name: 'Progressive Detailing',
      category: 'conversational',
      workflow: 'conversational',
      complexity: 'intermediate',
      tags: ['conversational', 'detail', 'enhancement'],
      description: 'Progressively add detail and refinement through multiple turns',
      template: `Progressive detailing sequence:

Starting Point:
- Base Image: {{base_description}}
- Current Detail Level: {{current_detail_level}}

TURN 1 - Add Primary Details:
Focus Area: {{focus_area_1}}
Add: {{details_to_add_1}}
Priority: Main subject enhancement

TURN 2 - Add Secondary Details:
Focus Area: {{focus_area_2}}
Add: {{details_to_add_2}}
Priority: Supporting elements

TURN 3 - Add Fine Details:
Focus Area: {{focus_area_3}}
Add: {{details_to_add_3}}
Priority: Texture and subtle elements

TURN 4 - Final Refinement:
Polish: {{final_polish_areas}}
Enhance: {{final_enhancements}}

Quality Requirements:
- Maintain coherence throughout all turns
- Each turn should add clarity and richness
- Avoid over-processing or loss of natural appearance
- Progressive improvement, not replacement

Final Vision:
{{final_detailed_vision}}`
    },

    // ========================================
    // SUPPORTING TEMPLATES - ADAPTED FOR IMAGE GENERATION
    // ========================================

    // HIGH PRIORITY - Marketing & Commercial

    {
      id: 'product-description-writer',
      name: 'Product Photography + Description',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'intermediate',
      tags: ['product', 'marketing', 'commercial', 'copy'],
      recommended: true,
      description: 'Generate product photo prompt AND marketing copy together',
      example: {
        product_name: 'EcoGlow Bamboo Wireless Charger',
        product_type: 'tech accessory / eco-friendly gadget',
        camera_type: 'Canon 5D Mark IV',
        lens_type: 'macro 100mm f/2.8',
        lighting_setup: 'soft natural window light with white reflector',
        camera_angle: '45-degree angle on modern desk',
        background: 'minimal workspace with plant and coffee cup',
        mood: 'eco-conscious, modern, peaceful',
        color_palette: 'natural wood tones, white, green accents',
        target_audience: 'environmentally conscious professionals aged 25-40',
        key_features: '15W fast charging, sustainable bamboo, LED indicator, universal compatibility',
        usp: 'The only wireless charger that charges your phone AND your conscience',
        tone: 'friendly yet premium, eco-focused',
        benefits: 'Reduce plastic waste, beautiful desk aesthetic, faster charging than competitors, sustainably sourced materials',
        cta: 'Shop Sustainable Tech'
      },
      didYouKnow: 'You can generate BOTH the product image AND all your marketing copy in one prompt! This saves hours of work for e-commerce sellers and marketers.',
      relatedTemplates: ['product-photography', 'poster-banner-design', 'image-request-email'],
      template: `Create comprehensive product marketing package:

PART 1 - PHOTOGRAPHY PROMPT:
Product: {{product_name}}
Product Type: {{product_type}}

Camera Setup:
- Camera: {{camera_type}}
- Lens: {{lens_type}}
- Lighting: {{lighting_setup}}
- Angle: {{camera_angle}}

Visual Style:
- Background: {{background}}
- Mood: {{mood}}
- Color Palette: {{color_palette}}

PART 2 - MARKETING COPY:
Target Audience: {{target_audience}}
Key Features to Highlight: {{key_features}}
Unique Selling Point: {{usp}}
Tone: {{tone}} (e.g., professional, friendly, luxury, playful)

OUTPUT FORMAT:
1. Complete photography prompt for product image
2. Product description (50-100 words)
3. Short marketing tagline (10-15 words)
4. Social media caption (Instagram/Facebook ready)
5. Key bullet points for product page

Benefits to Emphasize: {{benefits}}
Call to Action: {{cta}}`
    },

    {
      id: 'visual-storytelling-scenes',
      name: 'Visual Storytelling Scene Creator',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'advanced',
      tags: ['storytelling', 'sequential', 'narrative', 'character'],
      recommended: true,
      description: 'Create sequential image prompts for visual narratives',
      template: `Create sequential scene prompts for visual story:

STORY OVERVIEW:
Story Concept: {{story_concept}}
Genre: {{genre}} (e.g., fantasy, sci-fi, children's book, comic)
Art Style: {{art_style}} (e.g., anime, realistic, cartoon, watercolor)
Number of Scenes: {{scene_count}}

MAIN CHARACTERS (for consistency):
Character 1: {{character_1_description}}
- Key Features: {{character_1_features}} (hair, eyes, clothing, distinctive marks)
Character 2: {{character_2_description}}
- Key Features: {{character_2_features}}

SCENE-BY-SCENE BREAKDOWN:

Scene 1:
- Setting: {{scene_1_setting}}
- Action: {{scene_1_action}}
- Characters Present: {{scene_1_characters}}
- Mood: {{scene_1_mood}}
- Camera Angle: {{scene_1_angle}}

Scene 2:
- Setting: {{scene_2_setting}}
- Action: {{scene_2_action}}
- Characters Present: {{scene_2_characters}}
- Mood: {{scene_2_mood}}
- Camera Angle: {{scene_2_angle}}

Scene 3:
- Setting: {{scene_3_setting}}
- Action: {{scene_3_action}}
- Characters Present: {{scene_3_characters}}
- Mood: {{scene_3_mood}}
- Camera Angle: {{scene_3_angle}}

[Add more scenes as needed]

CONSISTENCY REQUIREMENTS:
- Maintain exact same character features across ALL scenes
- Keep consistent art style throughout
- Use {{color_palette}} color palette for entire story
- Lighting can vary by scene but style must remain consistent

OUTPUT: Generate detailed prompt for each scene with character consistency tracking.`
    },

    {
      id: 'infographic-chart-generator',
      name: 'Infographic & Chart Image Generator',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'advanced',
      tags: ['infographic', 'data', 'visualization', 'chart'],
      description: 'Create prompts for infographic and data visualization images',
      template: `Create infographic/chart visualization prompt:

DATA & CONTENT:
Topic: {{topic}}
Key Data Points: {{data_points}}
Main Message: {{main_message}}
Statistics to Highlight: {{statistics}}

VISUALIZATION TYPE:
Chart Type: {{chart_type}} (e.g., bar chart, pie chart, flowchart, timeline, comparison table, process diagram)
Layout Style: {{layout_style}} (e.g., vertical, horizontal, circular, grid)

DESIGN SPECIFICATIONS:
Visual Style: {{visual_style}} (e.g., minimal, modern, colorful, professional, flat design, 3D)
Color Scheme: {{color_scheme}}
- Primary Color: {{primary_color}}
- Secondary Color: {{secondary_color}}
- Accent Color: {{accent_color}}

Typography:
- Headline Style: {{headline_style}} (bold, clean, modern)
- Data Label Style: {{label_style}}
- Font Mood: {{font_mood}} (professional, friendly, technical)

CONTENT ELEMENTS:
- Title: {{title}}
- Subtitle: {{subtitle}}
- Icons Needed: {{icons}} (e.g., people, money, growth arrows, checkmarks)
- Sections: {{sections}}

LAYOUT REQUIREMENTS:
- Dimensions: {{dimensions}} (e.g., square, vertical, horizontal, social media size)
- Information Density: {{density}} (minimal, balanced, detailed)
- White Space: {{white_space_amount}}
- Visual Hierarchy: {{hierarchy}} (what should stand out most)

TARGET USE:
Purpose: {{purpose}} (presentation, social media, report, education)
Audience: {{audience}}
Platform: {{platform}} (PowerPoint, Instagram, website, print)

OUTPUT: Generate prompt for creating visual infographic/chart with all data clearly represented.`
    },

    {
      id: 'poster-banner-design',
      name: 'Poster/Banner Design with Text',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'intermediate',
      tags: ['poster', 'banner', 'text', 'design', 'social'],
      recommended: true,
      description: 'Create poster/banner designs with integrated text',
      template: `Create poster/banner design with text integration:

PURPOSE & CONTEXT:
Purpose: {{purpose}} (e.g., event promotion, product launch, announcement, social media graphic)
Event/Product: {{event_product}}
Target Audience: {{target_audience}}

TEXT CONTENT:
Main Headline: {{headline}}
- Font Style: {{headline_font}} (bold, decorative, modern, elegant)
- Size: {{headline_size}} (large, dominant, eye-catching)
- Position: {{headline_position}}

Subheadline/Details: {{subheadline}}
- Font Style: {{subheadline_font}}
- Size: {{subheadline_size}}

Call to Action: {{cta_text}}
Additional Info: {{additional_info}} (date, time, location, website)

VISUAL DESIGN:
Overall Style: {{design_style}} (e.g., modern, vintage, minimalist, maximalist, grunge, elegant)
Color Scheme: {{color_scheme}}
- Background Color(s): {{background_colors}}
- Text Color(s): {{text_colors}}
- Accent Colors: {{accent_colors}}

Background Image/Elements:
- Background Type: {{background_type}} (photo, gradient, pattern, illustration, solid color)
- Background Description: {{background_description}}
- Visual Elements: {{visual_elements}} (shapes, icons, photos, illustrations)

LAYOUT & COMPOSITION:
Dimensions: {{dimensions}} (e.g., Instagram square, story, Facebook cover, print poster 24x36)
Orientation: {{orientation}} (portrait, landscape, square)
Text Placement: {{text_placement}} (centered, left-aligned, top, bottom)
Visual Balance: {{balance}} (symmetrical, asymmetrical, dynamic)

MOOD & ATMOSPHERE:
Mood: {{mood}} (energetic, calm, professional, playful, urgent, celebratory)
Emotional Impact: {{emotional_impact}}

TECHNICAL SPECS:
- Text Readability: Ensure high contrast between text and background
- Hierarchy: {{hierarchy}} (what should viewer see first, second, third)
- Brand Elements: {{brand_elements}} (logo, brand colors, specific fonts)

OUTPUT: Generate prompt for creating poster/banner with all text clearly integrated and readable.`
    },

    // MEDIUM PRIORITY - Workflow Support

    {
      id: 'image-request-email',
      name: 'Image Request Email Template',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'simple',
      tags: ['email', 'communication', 'brief', 'client'],
      description: 'Generate professional emails requesting specific images',
      template: `Compose professional image request email:

TO: {{recipient}} (designer, photographer, creative team)
FROM: {{sender_role}}

PROJECT CONTEXT:
Project Name: {{project_name}}
Purpose: {{purpose}}
Deadline: {{deadline}}
Budget Range: {{budget}} (if applicable)

IMAGE REQUIREMENTS:

Number of Images Needed: {{image_count}}

For Each Image:
1. Subject/Content: {{image_1_subject}}
   - Style: {{image_1_style}}
   - Mood: {{image_1_mood}}
   - Specific Requirements: {{image_1_requirements}}
   - Dimensions: {{image_1_dimensions}}
   - File Format: {{image_1_format}}

2. Subject/Content: {{image_2_subject}}
   - Style: {{image_2_style}}
   - Mood: {{image_2_mood}}
   - Specific Requirements: {{image_2_requirements}}

[Add more as needed]

TECHNICAL SPECIFICATIONS:
- Resolution: {{resolution}}
- Color Profile: {{color_profile}}
- File Formats Needed: {{file_formats}}
- Usage Rights: {{usage_rights}}

BRAND GUIDELINES:
- Brand Colors: {{brand_colors}}
- Brand Style: {{brand_style}}
- Elements to Include: {{brand_elements}}
- Elements to Avoid: {{elements_to_avoid}}

REFERENCE MATERIALS:
- Reference Images Attached: {{reference_images}}
- Inspiration Links: {{inspiration_links}}
- Mood Board: {{mood_board}}

DELIVERABLES:
- Number of Concepts: {{concept_count}}
- Revision Rounds: {{revision_rounds}}
- Final Deliverable Date: {{final_date}}

TONE: {{email_tone}} (professional, friendly, collaborative)

OUTPUT: Professional email that clearly communicates image requirements to creative team.`
    },

    {
      id: 'comic-speech-bubbles',
      name: 'Comic Book Speech Bubble Generator',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'intermediate',
      tags: ['comic', 'dialogue', 'speech', 'sequential'],
      description: 'Create dialogue and scene prompts for comic panels',
      template: `Create comic book panel with dialogue:

COMIC STYLE:
Art Style: {{art_style}} (e.g., American superhero, manga, European BD, indie, webcomic)
Genre: {{genre}} (action, romance, comedy, horror, sci-fi, slice-of-life)
Color Style: {{color_style}} (full color, black & white, limited palette, grayscale with spot color)

PANEL LAYOUT:
Panel Size: {{panel_size}} (full page, half page, quarter page, splash page)
Panel Shape: {{panel_shape}} (rectangular, irregular, borderless)

CHARACTERS IN PANEL:
Character 1: {{character_1_name}}
- Appearance: {{character_1_appearance}}
- Position: {{character_1_position}}
- Expression: {{character_1_expression}}
- Action: {{character_1_action}}

Character 2: {{character_2_name}}
- Appearance: {{character_2_appearance}}
- Position: {{character_2_position}}
- Expression: {{character_2_expression}}
- Action: {{character_2_action}}

DIALOGUE & SPEECH BUBBLES:

Character 1 Says: "{{character_1_dialogue}}"
- Speech Bubble Type: {{bubble_1_type}} (normal, thought bubble, shout, whisper, telepathy)
- Bubble Position: {{bubble_1_position}}

Character 2 Says: "{{character_2_dialogue}}"
- Speech Bubble Type: {{bubble_2_type}}
- Bubble Position: {{bubble_2_position}}

Narration Box (if any): "{{narration}}"
- Position: {{narration_position}}

Sound Effects (if any): {{sound_effects}} (e.g., BOOM!, CRASH!, whoosh)
- Sound Effect Style: {{sfx_style}} (integrated, floating, bold)

SCENE & BACKGROUND:
Setting: {{setting}}
Background Detail Level: {{background_detail}} (detailed, simple, minimal, abstract)
Perspective: {{perspective}} (eye-level, bird's eye, worm's eye, dutch angle)
Depth: {{depth}} (deep background, mid-depth, flat)

MOOD & ATMOSPHERE:
Panel Mood: {{panel_mood}}
Lighting: {{lighting}} (dramatic shadows, bright, noir, backlit)
Color Temperature: {{color_temperature}}

COMPOSITION:
Focus: {{focus}} (who/what is the main focus)
Camera Angle: {{camera_angle}}
Panel Border Style: {{border_style}} (clean, rough, broken, none)

OUTPUT: Generate prompt for comic panel with characters, dialogue bubbles, and scene elements clearly positioned.`
    },

    {
      id: 'educational-illustration-planner',
      name: 'Educational Illustration Planner',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'advanced',
      tags: ['education', 'teaching', 'illustration', 'diagram'],
      description: 'Create illustrated educational content and diagrams',
      template: `Create educational illustration series:

EDUCATIONAL CONTEXT:
Subject/Topic: {{subject}}
Specific Concept: {{concept}}
Grade Level: {{grade_level}} (elementary, middle school, high school, college, adult learning)
Learning Objective: {{learning_objective}}

ILLUSTRATION TYPE:
Type: {{illustration_type}} (e.g., diagram, flowchart, step-by-step process, comparison, timeline, anatomy, cross-section)
Complexity Level: {{complexity}} (simple, moderate, detailed)

VISUAL STYLE:
Art Style: {{art_style}} (e.g., flat illustration, realistic, cartoon, technical drawing, hand-drawn, infographic)
Color Scheme: {{color_scheme}}
- Use colors to: {{color_purpose}} (differentiate parts, show progression, highlight important elements)

CONTENT BREAKDOWN:

Main Illustration:
- Central Visual: {{central_visual}}
- Key Components: {{components}}
- Labels Needed: {{labels}}
- Arrows/Connections: {{connections}}

Supporting Illustrations (if series):
1. {{illustration_1_description}}
2. {{illustration_2_description}}
3. {{illustration_3_description}}

TEXT ELEMENTS:
- Title: {{title}}
- Main Labels: {{main_labels}}
- Explanatory Text: {{explanatory_text}}
- Numbered Steps (if applicable): {{steps}}
- Caption: {{caption}}

VISUAL HIERARCHY:
- Primary Focus: {{primary_focus}} (what should students notice first)
- Secondary Elements: {{secondary_elements}}
- Supporting Details: {{supporting_details}}

EDUCATIONAL FEATURES:
- Visual Metaphors: {{visual_metaphors}} (to make abstract concepts concrete)
- Color Coding: {{color_coding_system}}
- Size/Scale Indicators: {{scale_indicators}}
- Before/After Comparisons: {{comparisons}}

ACCESSIBILITY:
- Color Contrast: High contrast for visibility
- Text Size: {{text_size}} (large enough for projected/printed viewing)
- Icon Clarity: {{icon_clarity}}
- Pattern/Texture: {{patterns}} (for color-blind accessibility)

TARGET USE:
Platform: {{platform}} (textbook, presentation, worksheet, poster, digital learning)
Viewing Distance: {{viewing_distance}} (projected, computer screen, printed handout)
Age-Appropriate: {{age_appropriateness}}

OUTPUT: Generate prompt for educational illustration(s) that clearly explain the concept visually.`
    },

    // LOWER PRIORITY - Prompt Utilities

    {
      id: 'prompt-tone-adjuster',
      name: 'Prompt Tone Adjuster',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'simple',
      tags: ['utility', 'adjustment', 'mood', 'tone'],
      description: 'Transform image prompt mood and emotional tone',
      template: `Adjust the tone/mood of an existing image prompt:

ORIGINAL PROMPT:
{{original_prompt}}

TONE TRANSFORMATION:
From: {{current_tone}} (e.g., professional, serious, dramatic, realistic)
To: {{target_tone}} (e.g., playful, whimsical, dark, uplifting, nostalgic, futuristic)

ADJUSTMENTS TO MAKE:

Mood/Atmosphere:
- Current Mood: {{current_mood}}
- Target Mood: {{target_mood}}
- Emotional Impact: {{emotional_impact}}

Visual Style Changes:
- Color Palette: Change from {{old_colors}} to {{new_colors}}
- Lighting: Change from {{old_lighting}} to {{new_lighting}}
- Art Style: {{style_adjustment}} (make more realistic/stylized/abstract)

Language & Descriptors:
- Replace formal language with: {{language_style}}
- Adjust adjectives to convey: {{adjective_tone}}
- Modify intensity: {{intensity}} (subtle, moderate, dramatic)

Specific Elements to Change:
- {{element_1}}: Change to {{element_1_new}}
- {{element_2}}: Change to {{element_2_new}}
- {{element_3}}: Change to {{element_3_new}}

PRESERVE:
Keep these elements unchanged: {{preserve_elements}}

TONE EXAMPLES:
Professional → Playful: Serious office → Fun creative workspace with colorful decor
Realistic → Whimsical: Real forest → Enchanted forest with glowing mushrooms
Dark → Uplifting: Gloomy cityscape → Vibrant sunrise over city
Modern → Nostalgic: Contemporary design → Vintage 1950s aesthetic

OUTPUT: Rewritten prompt with adjusted tone while maintaining core subject/composition.`
    },

    {
      id: 'prompt-detail-enhancer',
      name: 'Prompt Detail Enhancer',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'simple',
      tags: ['utility', 'enhancement', 'expansion'],
      recommended: true,
      description: 'Expand brief ideas into detailed photography prompts',
      template: `Expand brief image idea into comprehensive prompt:

BRIEF IDEA:
{{brief_idea}}

TARGET WORKFLOW:
Workflow: {{workflow}} (text-to-image, image-editing, multi-image-fusion, conversational)

DETAIL LEVEL:
Level: {{detail_level}} (basic, moderate, comprehensive, expert)

EXPANSION AREAS:

1. SUBJECT CLARIFICATION:
Main Subject: {{main_subject}} (expanded description)
Supporting Elements: {{supporting_elements}}
Specific Details: {{specific_details}}

2. PHOTOGRAPHY SPECIFICATIONS:
Camera Equipment:
- Camera Type: {{camera_suggestion}}
- Lens: {{lens_suggestion}}
- Settings: {{settings_suggestion}}

Composition:
- Framing: {{framing}}
- Angle: {{angle}}
- Perspective: {{perspective}}

3. LIGHTING & ATMOSPHERE:
Lighting Setup: {{lighting_setup}}
Time of Day: {{time_of_day}}
Weather/Conditions: {{conditions}}
Mood: {{mood}}

4. VISUAL STYLE:
Photography Style: {{photography_style}}
Color Palette: {{color_palette}}
Post-Processing: {{post_processing}}

5. TECHNICAL QUALITY:
Resolution: {{resolution}}
Focus: {{focus_points}}
Depth of Field: {{depth_of_field}}

6. CONTEXTUAL DETAILS:
Background: {{background_details}}
Foreground: {{foreground_details}}
Environmental Context: {{environmental_context}}

ENHANCEMENT GOALS:
- Add {{specificity_level}} specificity
- Include {{technical_depth}} technical photography terms
- Ensure {{clarity_level}} clarity for AI interpretation

OUTPUT: Complete, detailed prompt ready for Gemini 2.5 Flash Image with all photography specifications.`
    },

    {
      id: 'prompt-simplifier',
      name: 'Prompt Simplifier',
      category: 'text-to-image',
      workflow: 'text-to-image',
      complexity: 'simple',
      tags: ['utility', 'simplification', 'clarity'],
      description: 'Condense complex prompts to essential elements',
      template: `Simplify overly complex prompt to essential elements:

COMPLEX PROMPT:
{{complex_prompt}}

SIMPLIFICATION GOALS:
Target Length: {{target_length}} (words/characters)
Retain Priority: {{priority}} (subject, style, mood, technical specs)
Remove: {{elements_to_remove}} (redundancy, excessive detail, conflicting instructions)

SIMPLIFICATION PROCESS:

1. IDENTIFY CORE ELEMENTS:
Essential Subject: {{core_subject}}
Essential Style: {{core_style}}
Essential Mood: {{core_mood}}
Must-Have Technical Specs: {{must_have_specs}}

2. REMOVE REDUNDANCY:
Redundant Phrases: {{redundant_phrases}}
Repetitive Details: {{repetitive_details}}
Conflicting Instructions: {{conflicts}}

3. CONSOLIDATE:
Merge similar concepts: {{merged_concepts}}
Combine related details: {{combined_details}}

4. PRIORITIZE:
Keep Priority 1 (Critical): {{priority_1}}
Keep Priority 2 (Important): {{priority_2}}
Remove Priority 3 (Nice-to-have): {{priority_3}}

5. CLARITY OPTIMIZATION:
Replace verbose phrases with: {{concise_replacements}}
Simplify technical jargon: {{simplified_jargon}}
Use clear, direct language: {{direct_language}}

SIMPLIFICATION RULES:
- Maximum {{max_words}} words
- Focus on {{focus_areas}}
- Maintain {{preserve_qualities}}
- Remove {{remove_categories}}

BALANCE:
Simplicity vs Detail: {{balance_point}}
- Too simple: Vague, generic results
- Just right: Clear, focused, essential
- Too complex: Overwhelming, contradictory

OUTPUT: Simplified prompt that maintains essential quality while removing complexity.`
    }

    // Total: 25+ comprehensive templates covering all 4 workflows + supporting tools

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
  setupWorkflowSelector(); // NEW: Setup workflow selection
  setupOnboarding();
  setupBuilder();
  setupTemplates();
  setupTechniques();
  setupValidator();
  setupResources();
  setupQuickWins(); // NEW: Setup Quick Wins
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

  // Hide all views (must use inline style to override HTML inline styles)
  document.querySelectorAll('.nb-view').forEach(view => {
    view.style.display = 'none';
    view.classList.remove('active');
  });

  // Show selected view (use inline style to override)
  const view = document.getElementById(`${viewName}-view`);
  if (view) {
    view.style.display = 'block';
    view.classList.add('active');
  }

  // Load content for each specific view
  switch(viewName) {
    case 'quick-wins':
      if (typeof loadQuickWins === 'function') loadQuickWins();
      break;
    case 'onboarding':
      if (typeof loadLesson === 'function') loadLesson('intro');
      break;
    case 'library':
      loadLibraryTemplates();
      break;
    case 'validate':
      // Validate view is just an input field, no loading needed
      break;
    case 'resources':
      if (typeof loadResources === 'function') loadResources();
      break;
  }
}

function loadLibraryTemplates() {
  const container = document.getElementById('libraryGrid');
  if (!container) return;

  const search = document.getElementById('librarySearch')?.value.toLowerCase() || '';
  const category = document.getElementById('libraryCategory')?.value || 'all';
  const complexity = document.getElementById('libraryComplexity')?.value || 'all';

  let filtered = NanoBananaBuilder.templates;

  // Apply filters
  if (category !== 'all') {
    filtered = filtered.filter(t => t.category === category || t.workflow === category);
  }

  if (complexity !== 'all') {
    filtered = filtered.filter(t => t.complexity === complexity);
  }

  if (search) {
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(search) ||
      t.description.toLowerCase().includes(search)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = '<p class="nb-info-text">No templates found matching your filters.</p>';
    return;
  }

  container.innerHTML = filtered.map(template => `
    <div class="nb-template-card" style="cursor: pointer;" onclick="selectTemplateFromLibrary('${template.id}')">
      ${template.recommended ? '<span class="nb-template-badge">⭐ Recommended</span>' : ''}
      <h3>${template.name}</h3>
      <p>${template.description}</p>
      <div class="nb-template-tags">
        ${template.tags.slice(0, 3).map(tag => `<span class="nb-tag">${tag}</span>`).join('')}
      </div>
      <button class="nb-btn-primary" onclick="event.stopPropagation(); selectTemplateFromLibrary('${template.id}')">Use Template</button>
    </div>
  `).join('');
}

function selectTemplateFromLibrary(templateId) {
  const template = NanoBananaBuilder.templates.find(t => t.id === templateId);
  if (template) {
    showView('builder');
    applyTemplate(template);
  }
}

// ============================================================================
// QUICK WINS
// ============================================================================

function setupQuickWins() {
  const searchInput = document.getElementById('quickWinsSearch');
  const difficultySelect = document.getElementById('quickWinsDifficulty');
  const categorySelect = document.getElementById('quickWinsCategory');

  if (searchInput) {
    searchInput.addEventListener('input', () => loadQuickWins());
  }

  if (difficultySelect) {
    difficultySelect.addEventListener('change', () => loadQuickWins());
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', () => loadQuickWins());
  }
}

function loadQuickWins() {
  const container = document.getElementById('quickWinsGrid');
  if (!container) return;

  // Check if NanoBananaQuickWins is available
  if (typeof NanoBananaQuickWins === 'undefined') {
    container.innerHTML = '<p class="nb-info-text">Quick Wins library not loaded. Please refresh the page.</p>';
    return;
  }

  const search = document.getElementById('quickWinsSearch')?.value.toLowerCase() || '';
  const difficulty = document.getElementById('quickWinsDifficulty')?.value || 'all';
  const category = document.getElementById('quickWinsCategory')?.value || 'all';

  let filtered = NanoBananaQuickWins;

  // Filter by difficulty
  if (difficulty !== 'all') {
    filtered = filtered.filter(qw => qw.difficulty === difficulty);
  }

  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(qw => qw.category === category);
  }

  // Filter by search
  if (search) {
    filtered = filtered.filter(qw =>
      qw.name.toLowerCase().includes(search) ||
      qw.useCase.toLowerCase().includes(search) ||
      qw.tags.some(tag => tag.toLowerCase().includes(search))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div class="nb-quick-wins-empty"><p>No Quick Wins found matching your filters. Try adjusting your search criteria.</p></div>';
    return;
  }

  container.innerHTML = filtered.map((qw, index) => `
    <div class="nb-quick-win-card" data-qw-id="${qw.id}" data-qw-index="${index}">
      <div class="nb-quick-win-header">
        <h3>${qw.name}</h3>
        <span class="nb-quick-win-difficulty nb-difficulty-${qw.difficulty}">${qw.difficulty}</span>
      </div>

      <div class="nb-quick-win-meta">
        <span>⏱️ ${qw.timeToValue}</span>
        <span>📸 ${qw.workflow}</span>
      </div>

      <div class="nb-quick-win-usecase">
        <strong>USE CASE:</strong>
        ${qw.useCase}
      </div>

      <div class="nb-quick-win-prompt">
        ${qw.prompt.substring(0, 200)}${qw.prompt.length > 200 ? '...' : ''}
      </div>

      <div class="nb-quick-win-details">
        <div class="nb-quick-win-prompt">
          ${qw.prompt}
        </div>

        <div class="nb-quick-win-why">
          <strong>WHY IT WORKS:</strong>
          ${qw.why}
        </div>

        <div class="nb-quick-win-protip">
          <strong>💡 PRO TIP:</strong>
          ${qw.proTip}
        </div>

        <div class="nb-quick-win-tags">
          ${qw.tags.map(tag => `<span class="nb-tag">${tag}</span>`).join('')}
        </div>
      </div>

      <div class="nb-quick-win-actions">
        <button class="nb-btn-copy-prompt">
          📋 Copy Prompt
        </button>
        <button class="nb-btn-expand">
          <span class="expand-text">Details ▼</span>
        </button>
      </div>
    </div>
  `).join('');

  // Store reference to filtered array for copy buttons
  const filteredQuickWins = filtered;

  // Add event listeners for copy buttons
  container.querySelectorAll('.nb-btn-copy-prompt').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.nb-quick-win-card');
      const qwIndex = parseInt(card.dataset.qwIndex);
      const prompt = filteredQuickWins[qwIndex].prompt;
      copyQuickWinPrompt(prompt, btn);
    });
  });

  // Add event listeners for expand buttons
  container.querySelectorAll('.nb-btn-expand').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.nb-quick-win-card');
      card.classList.toggle('expanded');
      const expandText = btn.querySelector('.expand-text');
      if (card.classList.contains('expanded')) {
        expandText.textContent = 'Hide ▲';
      } else {
        expandText.textContent = 'Details ▼';
      }
    });
  });
}

function copyQuickWinPrompt(prompt, buttonElement) {
  navigator.clipboard.writeText(prompt).then(() => {
    // Show success feedback
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '✓ Copied!';
    buttonElement.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';

    // Show success toast
    if (typeof showSuccessToast === 'function') {
      showSuccessToast('✓ Prompt copied! Paste it into Gemini 2.5 Flash Image and watch the magic happen!');
    }

    // Reset button after 2 seconds
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
      buttonElement.style.background = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    if (typeof showErrorToast === 'function') {
      showErrorToast('Failed to copy prompt. Please try again.');
    } else {
      alert('Failed to copy prompt. Please try selecting and copying manually.');
    }
  });
}

// ============================================================================
// WORKFLOW SELECTOR
// ============================================================================

function setupWorkflowSelector() {
  const workflowCards = document.querySelectorAll('.nb-workflow-card');

  workflowCards.forEach(card => {
    card.addEventListener('click', () => {
      selectWorkflow(card.dataset.workflow, card);
    });

    // Keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectWorkflow(card.dataset.workflow, card);
      }
    });
  });
}

function selectWorkflow(workflowId, cardElement) {
  // Update state
  NanoBananaBuilder.state.selectedWorkflow = workflowId;

  // Update UI
  document.querySelectorAll('.nb-workflow-card').forEach(card => {
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
    card.setAttribute('tabindex', '-1');
  });

  cardElement.classList.add('selected');
  cardElement.setAttribute('aria-checked', 'true');
  cardElement.setAttribute('tabindex', '0');

  // Filter templates by workflow
  loadTemplates(workflowId);

  // Show notification
  const workflowNames = {
    'text-to-image': 'Text → Image Generation',
    'image-editing': 'Image Editing',
    'multi-image-fusion': 'Multi-Image Fusion',
    'conversational': 'Conversational Refinement'
  };

  console.log(`Workflow selected: ${workflowNames[workflowId]}`);
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

function loadTemplates(filterWorkflow = null) {
  const container = document.getElementById('templatesList');
  if (!container) return;

  const search = document.getElementById('templateSearch')?.value.toLowerCase() || '';
  const category = document.getElementById('templateCategory')?.value || 'all';
  const workflow = filterWorkflow || NanoBananaBuilder.state.selectedWorkflow;

  let filtered = NanoBananaBuilder.templates;

  // Filter by workflow first (most important)
  if (workflow && workflow !== 'all') {
    filtered = filtered.filter(t => t.workflow === workflow);
  }

  // Then filter by category
  if (category && category !== 'all') {
    if (category === 'recommended') {
      filtered = filtered.filter(t => t.recommended);
    } else {
      filtered = filtered.filter(t => t.category === category);
    }
  }

  // Then filter by search
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

      ${template.didYouKnow ? `
        <div class="nb-did-you-know">
          <span class="nb-tip-icon">💡</span>
          <span class="nb-tip-text">${template.didYouKnow}</span>
        </div>
      ` : ''}

      <div class="nb-template-tags">
        ${template.tags.map(tag => `<span class="nb-tag">${tag}</span>`).join('')}
      </div>

      <div class="nb-template-actions">
        <button class="nb-btn-select" data-template-id="${template.id}">Use Template</button>
        ${template.example ? `<button class="nb-btn-example" data-template-id="${template.id}">✨ Try Example</button>` : ''}
      </div>
    </div>
  `).join('');

  // Add click handlers for template selection
  container.querySelectorAll('.nb-btn-select').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const templateId = btn.dataset.templateId;
      const template = NanoBananaBuilder.templates.find(t => t.id === templateId);
      const card = btn.closest('.nb-template-card');
      if (template) {
        selectTemplate(template, card);
      }
    });
  });

  // Add click handlers for example buttons
  container.querySelectorAll('.nb-btn-example').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const templateId = btn.dataset.templateId;
      const template = NanoBananaBuilder.templates.find(t => t.id === templateId);
      if (template && template.example) {
        tryExample(template);
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

  // Show related templates recommendations
  showRelatedTemplates(template);
}

// ============================================================================
// DISCOVERY FEATURES
// ============================================================================

function tryExample(template) {
  if (!template.example) return;

  // Apply template first
  document.getElementById('promptEditor').value = template.template;
  NanoBananaBuilder.state.promptText = template.template;

  // Fill in example values
  let filledPrompt = template.template;
  Object.keys(template.example).forEach(key => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    filledPrompt = filledPrompt.replace(regex, template.example[key]);
  });

  // Display filled prompt
  document.getElementById('promptEditor').value = filledPrompt;
  NanoBananaBuilder.state.promptText = filledPrompt;

  // Switch to builder view if not already there
  showView('builder');

  // Update stats and validation
  updatePromptStats();
  validatePrompt();
  updateQualityScores();

  // Show success message with discovery moment
  if (typeof showSuccessToast === 'function') {
    showSuccessToast(`✨ Example loaded! This is what a professional ${template.name} prompt looks like.`);
  } else {
    console.log(`Example loaded for ${template.name}`);
  }

  // Show tip if available
  if (template.didYouKnow) {
    setTimeout(() => {
      showDiscoveryTip(template.didYouKnow);
    }, 2000);
  }

  // Show related templates
  showRelatedTemplates(template);
}

function showDiscoveryTip(tip) {
  const tipContainer = document.getElementById('discoveryTipContainer');
  if (!tipContainer) {
    // Create tip container if it doesn't exist
    const container = document.createElement('div');
    container.id = 'discoveryTipContainer';
    container.className = 'nb-discovery-tip';
    container.innerHTML = `
      <div class="nb-tip-header">
        <span class="nb-tip-icon">💡 Did You Know?</span>
        <button class="nb-tip-close" onclick="this.parentElement.parentElement.style.display='none'">×</button>
      </div>
      <div class="nb-tip-content">${tip}</div>
    `;
    document.querySelector('.nb-builder')?.prepend(container);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      container.style.opacity = '0';
      setTimeout(() => container.style.display = 'none', 300);
    }, 10000);
  } else {
    tipContainer.querySelector('.nb-tip-content').textContent = tip;
    tipContainer.style.display = 'block';
    tipContainer.style.opacity = '1';
  }
}

function showRelatedTemplates(template) {
  if (!template.relatedTemplates || template.relatedTemplates.length === 0) return;

  const container = document.getElementById('relatedTemplatesContainer');
  if (!container) {
    // Create container if it doesn't exist
    const relatedDiv = document.createElement('div');
    relatedDiv.id = 'relatedTemplatesContainer';
    relatedDiv.className = 'nb-related-templates';
    relatedDiv.innerHTML = '<h4>📚 You might also like...</h4><div class="nb-related-list"></div>';
    document.querySelector('.nb-builder')?.appendChild(relatedDiv);
  }

  const listContainer = document.querySelector('.nb-related-list');
  if (!listContainer) return;

  // Get related templates
  const related = template.relatedTemplates
    .map(id => NanoBananaBuilder.templates.find(t => t.id === id))
    .filter(t => t); // Remove undefined

  listContainer.innerHTML = related.map(t => `
    <div class="nb-related-card" data-template-id="${t.id}">
      <h5>${t.name}</h5>
      <p>${t.description}</p>
      <button class="nb-btn-try-related" data-template-id="${t.id}">Try This →</button>
    </div>
  `).join('');

  // Add click handlers
  listContainer.querySelectorAll('.nb-btn-try-related').forEach(btn => {
    btn.addEventListener('click', () => {
      const templateId = btn.dataset.templateId;
      const relatedTemplate = NanoBananaBuilder.templates.find(t => t.id === templateId);
      if (relatedTemplate) {
        if (relatedTemplate.example) {
          tryExample(relatedTemplate);
        } else {
          applyTemplate(relatedTemplate);
        }
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
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
