/**
 * Nano Banana Variable Guide System
 * Comprehensive variable definitions with examples and suggestions
 */

const NanoBananaVariables = {
  // Complete variable guide with descriptions and suggestions
  variableGuide: {
    // IMAGE GENERATION VARIABLES
    subject: {
      name: 'subject',
      description: 'Main object, creature, element, or theme in the image',
      category: 'image',
      examples: ['cat', 'mountain', 'product', 'phone', 'person', 'car', 'building', 'sunset', 'flower', 'food'],
      suggestions: [
        'portrait of a person',
        'majestic mountain landscape',
        'modern smartphone product',
        'adorable kitten',
        'vintage car',
        'architectural building',
        'gourmet food dish',
        'exotic flower',
        'wild animal',
        'tech gadget'
      ],
      tooltip: 'This is the main focus of your image. Be specific for best results.'
    },

    style: {
      name: 'style',
      description: 'Artistic direction/style reference',
      category: 'image',
      examples: ['cinematic', 'watercolor', '3D render', 'anime', 'photorealistic', 'impressionist'],
      suggestions: [
        'cinematic movie still',
        'watercolor painting',
        'photorealistic 3D render',
        'anime art style',
        'oil painting',
        'digital art',
        'minimalist design',
        'baroque style',
        'impressionist artwork',
        'cyberpunk aesthetic',
        'vintage photograph',
        'modern flat design'
      ],
      tooltip: 'The artistic style defines the overall look and feel of the image.'
    },

    tone: {
      name: 'tone',
      description: 'Emotional or narrative feel',
      category: 'image',
      examples: ['mysterious', 'happy', 'professional', 'playful', 'serene', 'dramatic'],
      suggestions: [
        'mysterious and moody',
        'bright and happy',
        'professional and clean',
        'playful and fun',
        'serene and peaceful',
        'dramatic and intense',
        'warm and cozy',
        'cold and clinical',
        'energetic and dynamic',
        'melancholic and nostalgic'
      ],
      tooltip: 'Tone sets the emotional atmosphere of your image.'
    },

    camera_type: {
      name: 'camera_type',
      description: 'Equipment reference for photo realism',
      category: 'image',
      examples: ['DSLR', 'mirrorless', 'film camera', 'iPhone', 'medium format', 'instant camera'],
      suggestions: [
        'professional DSLR camera',
        'mirrorless camera',
        '35mm film camera',
        'iPhone 15 Pro Max',
        'medium format camera',
        'vintage Polaroid',
        'GoPro action camera',
        'drone camera',
        'security camera',
        'webcam'
      ],
      tooltip: 'Camera type affects the technical quality and characteristics of the image.',
      bestPractice: 'For commercial/professional looks, use DSLR or mirrorless. For authentic/vintage feels, use film or instant cameras.'
    },

    lens_type: {
      name: 'lens_type',
      description: 'Lens or focal length: affects perspective and focus',
      category: 'image',
      examples: ['wide angle', 'macro', 'telephoto', 'fisheye', '50mm', '85mm'],
      suggestions: [
        'wide angle 24mm',
        'macro close-up lens',
        'telephoto 200mm',
        'fisheye lens',
        '50mm standard lens',
        '85mm portrait lens',
        '35mm street photography',
        'ultra-wide 14mm',
        '70-200mm zoom',
        'tilt-shift lens'
      ],
      tooltip: 'Lens type dramatically changes perspective and depth of field.',
      bestPractice: 'Try a wide angle lens with bokeh for dramatic portraits! Use macro for detailed product shots.'
    },

    lighting: {
      name: 'lighting',
      description: 'Lighting condition: sets mood',
      category: 'image',
      examples: ['sunset', 'studio', 'low light', 'natural', 'neon', 'golden hour'],
      suggestions: [
        'golden hour sunset lighting',
        'professional studio lighting',
        'dramatic low light',
        'soft natural window light',
        'vibrant neon lighting',
        'harsh midday sun',
        'candlelight ambiance',
        'backlighting',
        'rim lighting',
        'three-point studio setup',
        'moody blue hour',
        'bright overcast daylight'
      ],
      tooltip: 'Lighting is crucial for mood and atmosphere.',
      bestPractice: 'Golden hour (sunrise/sunset) creates warm, flattering light. Studio lighting gives you full control.'
    },

    shot_type: {
      name: 'shot_type',
      description: 'Camera technique or composition',
      category: 'image',
      examples: ['close-up', 'aerial', "bird's-eye", 'panorama', 'portrait', 'wide shot'],
      suggestions: [
        'extreme close-up',
        'aerial drone shot',
        "bird's-eye view",
        'panoramic landscape',
        'medium portrait shot',
        'full body shot',
        'over-the-shoulder',
        'dutch angle',
        'low angle',
        'high angle',
        'eye level',
        'establishing wide shot'
      ],
      tooltip: 'Shot type defines the camera angle and framing.',
      bestPractice: 'Close-ups for emotion, wide shots for context, aerial for scale.'
    },

    background: {
      name: 'background',
      description: 'Scene behind main subject',
      category: 'image',
      examples: ['white', 'urban', 'forest', 'textured', 'bokeh', 'gradient'],
      suggestions: [
        'clean white background',
        'urban city street',
        'lush forest setting',
        'textured concrete wall',
        'beautiful bokeh blur',
        'gradient color background',
        'studio backdrop',
        'natural outdoor scene',
        'abstract pattern',
        'mountain vista',
        'interior room',
        'minimalist setting'
      ],
      tooltip: 'Background should complement but not distract from the subject.'
    },

    resolution: {
      name: 'resolution',
      description: 'Output pixel dimension',
      category: 'image',
      examples: ['1024x1024', '4K', 'HD', '8K', '1920x1080', '3840x2160'],
      suggestions: [
        '1024x1024 square',
        '4K ultra high definition (3840x2160)',
        'HD 1080p (1920x1080)',
        '8K resolution (7680x4320)',
        '720p standard (1280x720)',
        '4K DCI (4096x2160)',
        'Instagram square (1080x1080)',
        'Instagram portrait (1080x1350)',
        'YouTube thumbnail (1280x720)',
        'Website banner (1920x400)'
      ],
      tooltip: 'Higher resolution means more detail but larger file size.'
    },

    output_format: {
      name: 'output_format',
      description: 'File format',
      category: 'image',
      examples: ['JPEG', 'PNG', 'WEBP', 'TIFF', 'RAW'],
      suggestions: [
        'JPEG (compressed, web-friendly)',
        'PNG (transparent background support)',
        'WEBP (modern, efficient)',
        'TIFF (print quality)',
        'RAW (maximum editing flexibility)',
        'GIF (animation)',
        'SVG (vector graphics)'
      ],
      tooltip: 'Choose format based on use case: PNG for transparency, JPEG for photos, WEBP for web.'
    },

    emotion_mood: {
      name: 'emotion_mood',
      description: 'Expressed emotion for people/animals',
      category: 'image',
      examples: ['serene', 'tense', 'joyful', 'contemplative', 'excited', 'peaceful'],
      suggestions: [
        'serene and calm',
        'tense and anxious',
        'joyful and laughing',
        'contemplative and thoughtful',
        'excited and energetic',
        'peaceful and relaxed',
        'confident and powerful',
        'vulnerable and gentle',
        'mysterious and enigmatic',
        'playful and mischievous'
      ],
      tooltip: 'Emotion brings life and relatability to portraits and character images.'
    },

    location: {
      name: 'location',
      description: 'Setting or scene type',
      category: 'image',
      examples: ['beach', 'city skyline', 'kitchen', 'indoors', 'studio', 'park'],
      suggestions: [
        'tropical beach at sunset',
        'modern city skyline',
        'cozy home kitchen',
        'professional photography studio',
        'urban park',
        'mountain summit',
        'desert landscape',
        'coffee shop interior',
        'rooftop terrace',
        'forest clearing',
        'industrial warehouse',
        'minimalist office'
      ],
      tooltip: 'Location provides context and environmental storytelling.'
    },

    weather: {
      name: 'weather',
      description: 'Environmental conditions',
      category: 'image',
      examples: ['rainy', 'sunny', 'foggy', 'snowy', 'stormy', 'overcast'],
      suggestions: [
        'light rain with reflections',
        'bright sunny day',
        'misty fog',
        'heavy snowfall',
        'dramatic storm clouds',
        'overcast gray sky',
        'partly cloudy',
        'clear blue sky',
        'golden sunset',
        'dawn breaking',
        'twilight hour',
        'starry night'
      ],
      tooltip: 'Weather dramatically affects mood and lighting in outdoor scenes.'
    },

    composition: {
      name: 'composition',
      description: 'Placement/design rule',
      category: 'image',
      examples: ['centered', 'rule-of-thirds', 'minimalism', 'symmetrical', 'golden ratio'],
      suggestions: [
        'perfectly centered',
        'rule of thirds composition',
        'minimalist negative space',
        'symmetrical balance',
        'golden ratio spiral',
        'leading lines',
        'frame within frame',
        'diagonal composition',
        'triangular composition',
        'radial composition',
        'balanced asymmetry',
        'layered depth'
      ],
      tooltip: 'Good composition guides the viewer\'s eye and creates visual interest.',
      bestPractice: 'Rule of thirds is the most versatile. Use symmetry for formal subjects.'
    },

    focus_area: {
      name: 'focus_area',
      description: 'Where detail/sharpness is highest',
      category: 'image',
      examples: ['eyes', 'product', 'landscape details', 'foreground', 'center'],
      suggestions: [
        'sharp focus on eyes',
        'product in crisp focus',
        'foreground sharp, background blurred',
        'entire landscape in focus',
        'center subject sharp',
        'selective focus on hands',
        'focus on facial features',
        'focus on texture details',
        'rack focus transition',
        'deep focus throughout'
      ],
      tooltip: 'Focus directs attention to the most important part of the image.'
    },

    color_palette: {
      name: 'color_palette',
      description: 'Color range, tone, mood',
      category: 'image',
      examples: ['pastel', 'saturated', 'monochrome', 'vibrant', 'muted', 'warm'],
      suggestions: [
        'soft pastel colors',
        'highly saturated vibrant',
        'black and white monochrome',
        'sepia tone vintage',
        'muted earthy tones',
        'warm orange and yellow',
        'cool blue and teal',
        'complementary color scheme',
        'analogous colors',
        'triadic color harmony',
        'split complementary',
        'desaturated cinematic'
      ],
      tooltip: 'Color palette sets the overall visual mood and brand identity.'
    },

    accuracy_level: {
      name: 'accuracy_level',
      description: 'Realism vs abstraction',
      category: 'image',
      examples: ['photorealistic', 'stylized', 'cartoonish', 'abstract', 'hyperrealistic'],
      suggestions: [
        'photorealistic perfection',
        'stylized illustration',
        'cartoonish and fun',
        'abstract interpretation',
        'hyperrealistic detail',
        'semi-realistic',
        'impressionistic',
        'expressionistic',
        'surrealistic',
        'minimalist representation'
      ],
      tooltip: 'Balance realism based on your creative goals and audience.'
    },

    labels: {
      name: 'labels',
      description: 'Diagram/infographic annotation',
      category: 'image',
      examples: ['"left ventricle"', '"battery port"', '"main entrance"', '"control panel"'],
      suggestions: [
        'anatomical labels (medical)',
        'technical component labels',
        'architectural annotations',
        'product feature callouts',
        'data visualization labels',
        'map location markers',
        'instructional step numbers',
        'measurement indicators'
      ],
      tooltip: 'Labels add educational or informational value to technical images.'
    },

    dreamlike_element: {
      name: 'dreamlike_element',
      description: 'Surreal/abstract creative cues',
      category: 'image',
      examples: ['floating clouds', 'melting clocks', 'impossible geometry', 'ethereal glow'],
      suggestions: [
        'floating objects defying gravity',
        'melting surreal elements',
        'impossible geometric shapes',
        'ethereal glowing aura',
        'dream-like soft focus',
        'surreal size distortion',
        'mirror reflections in sky',
        'abstract light patterns',
        'morphing transformations',
        'fantastical elements'
      ],
      tooltip: 'Add surreal elements for creative, artistic, or conceptual images.'
    },

    // TEXT & CONTENT VARIABLES
    content_type: {
      name: 'content_type',
      description: 'Type of written content',
      category: 'text',
      examples: ['article', 'email', 'social post', 'blog post', 'script', 'documentation'],
      suggestions: [
        'blog article',
        'professional email',
        'social media post',
        'technical documentation',
        'marketing copy',
        'product description',
        'press release',
        'case study',
        'white paper',
        'tutorial guide'
      ],
      tooltip: 'Content type determines structure and formatting conventions.'
    },

    length: {
      name: 'length',
      description: 'Desired content length',
      category: 'text',
      examples: ['100 words', '500 words', '1000 words', 'one paragraph', 'brief', 'comprehensive'],
      suggestions: [
        '50-100 words (brief)',
        '200-300 words (short)',
        '500-700 words (medium)',
        '1000-1500 words (long)',
        '2000+ words (comprehensive)',
        'one paragraph',
        'three paragraphs',
        'single sentence',
        'bullet points only',
        'detailed multi-page'
      ],
      tooltip: 'Be specific about length for best results.'
    },

    audience: {
      name: 'audience',
      description: 'Target audience or readers',
      category: 'text',
      examples: ['general public', 'developers', 'executives', 'students', 'experts'],
      suggestions: [
        'general public audience',
        'software developers',
        'business executives',
        'college students',
        'industry experts',
        'beginners/newcomers',
        'technical professionals',
        'creative professionals',
        'decision makers',
        'end consumers'
      ],
      tooltip: 'Knowing your audience shapes vocabulary, tone, and depth.'
    },

    context: {
      name: 'context',
      description: 'Background or situational context',
      category: 'text',
      examples: ['business proposal', 'customer support', 'educational', 'entertainment'],
      suggestions: [
        'formal business context',
        'customer support scenario',
        'educational setting',
        'entertainment purposes',
        'marketing campaign',
        'internal communication',
        'public announcement',
        'research paper',
        'social media context',
        'personal communication'
      ],
      tooltip: 'Context helps AI understand the purpose and constraints.'
    },

    // CODE VARIABLES
    language: {
      name: 'language',
      description: 'Programming language',
      category: 'code',
      examples: ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Rust'],
      suggestions: [
        'JavaScript (ES6+)',
        'Python 3.x',
        'Java 17',
        'TypeScript',
        'C++',
        'Go',
        'Rust',
        'PHP',
        'Ruby',
        'Swift',
        'Kotlin',
        'C#'
      ],
      tooltip: 'Specify language version for modern syntax and features.'
    },

    framework: {
      name: 'framework',
      description: 'Development framework or library',
      category: 'code',
      examples: ['React', 'Node.js', 'Django', 'Spring Boot', 'Express', 'Flask'],
      suggestions: [
        'React 18',
        'Node.js with Express',
        'Django 4.x',
        'Spring Boot 3',
        'Vue.js 3',
        'Angular',
        'Flask',
        'FastAPI',
        'Next.js',
        'Laravel',
        'Ruby on Rails',
        'ASP.NET Core'
      ],
      tooltip: 'Framework choice affects syntax and available features.'
    },

    // UNIVERSAL VARIABLES
    intent: {
      name: 'intent',
      description: 'Primary goal or purpose',
      category: 'universal',
      examples: ['inform', 'persuade', 'entertain', 'educate', 'sell', 'explain'],
      suggestions: [
        'inform the audience',
        'persuade to action',
        'entertain and engage',
        'educate and teach',
        'sell a product/service',
        'explain a concept',
        'inspire creativity',
        'solve a problem',
        'build trust',
        'generate curiosity'
      ],
      tooltip: 'Clear intent leads to focused, effective outputs.'
    },

    constraints: {
      name: 'constraints',
      description: 'Limitations or requirements',
      category: 'universal',
      examples: ['under 100 words', 'no jargon', 'family-friendly', 'accessible', 'SEO optimized'],
      suggestions: [
        'maximum word count',
        'avoid technical jargon',
        'family-friendly content',
        'accessibility compliant',
        'SEO optimized',
        'mobile-friendly',
        'brand guidelines compliant',
        'legal compliance',
        'budget constraints',
        'time-sensitive'
      ],
      tooltip: 'Constraints ensure output meets specific requirements.'
    },

    goal: {
      name: 'goal',
      description: 'Desired outcome or result',
      category: 'universal',
      examples: ['increase engagement', 'drive sales', 'educate users', 'build awareness'],
      suggestions: [
        'increase user engagement',
        'drive sales conversions',
        'educate the audience',
        'build brand awareness',
        'improve SEO ranking',
        'generate leads',
        'enhance user experience',
        'establish thought leadership',
        'foster community',
        'achieve viral reach'
      ],
      tooltip: 'Specific goals help measure success and guide content strategy.'
    }
  },

  // Skill-level specific onboarding content
  onboardingByLevel: {
    beginner: {
      title: 'Welcome to Nano Banana Prompt Builder!',
      description: 'Type what you want to make (like "cat at sunset"). Pick a mood for your image, select image type, and preview results instantly. You don\'t have to know photography—just fill in some words, and let us do the rest!',
      steps: [
        {
          title: 'Step 1: Choose What You Want',
          content: 'Start by telling us what you want to create. For example: "a cute puppy" or "sunset over ocean"',
          tip: 'Keep it simple! You can always add more details later.'
        },
        {
          title: 'Step 2: Pick a Style',
          content: 'Choose how you want it to look. Try "realistic photo" or "cartoon style"',
          tip: 'Not sure? Just pick one and try it - you can change it anytime!'
        },
        {
          title: 'Step 3: Set the Mood',
          content: 'What feeling do you want? Happy? Mysterious? Peaceful?',
          tip: 'The mood changes the colors and lighting automatically.'
        },
        {
          title: 'Step 4: Click Generate!',
          content: 'That\'s it! Your prompt is ready to use with Nano Banana.',
          tip: 'If you don\'t like the result, just change one thing and try again.'
        }
      ],
      quickTips: [
        'Start with simple ideas and add details gradually',
        'Use the templates - they\'re designed to work perfectly',
        'Don\'t worry about technical terms - we handle that for you',
        'Try the "Auto-Optimize" button for instant improvements'
      ]
    },

    intermediate: {
      title: 'Quick Setup: Master Nano Banana Templates',
      description: 'Choose a template for portraits, landscapes, products, or art. Rapidly swap variables like camera type or lighting with our drop-down menus. Preview how small changes affect image outcomes, and upgrade your prompt with smart tips.',
      steps: [
        {
          title: 'Template Selection',
          content: 'Browse our 150+ templates organized by category. Each template is optimized for specific use cases.',
          tip: 'Recommended templates are marked with a star - these have the highest success rates.'
        },
        {
          title: 'Variable Management',
          content: 'Variables like {{subject}}, {{style}}, and {{lighting}} let you create reusable prompts. Change them once, use them everywhere.',
          tip: 'Save your favorite variable combinations for quick access later.'
        },
        {
          title: 'Apply Techniques',
          content: 'Enhance your prompts with techniques like Chain-of-Thought or Few-Shot learning.',
          tip: 'Start with 1-2 techniques. Too many can overcomplicate your prompt.'
        },
        {
          title: 'Quality Scoring',
          content: 'Watch your quality score improve as you add details and structure.',
          tip: 'Aim for 7.0+ for most projects, 9.0+ for critical work.'
        }
      ],
      quickTips: [
        'Use variables for anything you\'ll change frequently',
        'Combine templates to create custom workflows',
        'Check validation warnings - they catch common mistakes',
        'Experiment with different techniques to find what works best'
      ]
    },

    expert: {
      title: 'Advanced Prompt Engineering Control',
      description: 'Access raw prompt editor, batch creation (CSV import), and custom parameter chaining. Apply style transfer syntax, define technical terms precisely (e.g., 85mm f/1.4 lens, studio flash at 45°), and view generated code. Audit prompt logic and reverse engineer outputs for advanced creative control.',
      steps: [
        {
          title: 'Raw Editor Access',
          content: 'Work directly with prompt code for maximum control. All advanced features are available.',
          tip: 'Use Ctrl/Cmd + shortcuts for rapid workflow.'
        },
        {
          title: 'Batch Processing',
          content: 'Generate hundreds of prompt variants programmatically. Import CSV, apply templates, export results.',
          tip: 'Use batch generation for A/B testing and dataset creation.'
        },
        {
          title: 'Custom Techniques',
          content: 'Stack multiple techniques, create custom technique chains, and develop your own prompt engineering methods.',
          tip: 'Document your custom techniques for team reuse.'
        },
        {
          title: 'Meta-Evaluation',
          content: 'Deep analysis of prompt effectiveness with actionable insights.',
          tip: 'Use meta-evaluation to continuously refine your approach.'
        },
        {
          title: 'Version Control',
          content: 'Track prompt iterations, compare versions, and roll back changes.',
          tip: 'Version control is essential for team collaboration.'
        }
      ],
      quickTips: [
        'Master keyboard shortcuts to 10x your speed',
        'Build a personal library of proven prompt patterns',
        'Contribute templates to help the community',
        'Combine multiple techniques strategically, not randomly',
        'Use batch variants for systematic quality improvement',
        'Export to JSON for integration with other tools'
      ]
    }
  },

  // Visual process flow steps
  visualFlow: [
    {
      step: 1,
      title: 'Select Template',
      description: 'User selects "Portrait Template" - interface highlights variables',
      variables: ['[subject]', '[emotion/mood]', '[camera_type]', '[lighting]', '[background]', '[style]'],
      action: 'Click on template card',
      result: 'Template loads into editor with variables highlighted'
    },
    {
      step: 2,
      title: 'Fill Variables',
      description: 'Auto-suggestions populate based on template type',
      variables: {
        subject: ['person', 'dog', 'robot'],
        emotion_mood: ['relaxed', 'intense', 'joyful'],
        camera_type: ['DSLR', 'film', 'smartphone']
      },
      action: 'Select from dropdowns or type custom values',
      result: 'Variables update in real-time in prompt editor'
    },
    {
      step: 3,
      title: 'Live Preview',
      description: 'Preview updates as user changes variables',
      variables: {
        lighting: ['studio', 'natural light', 'neon']
      },
      action: 'Change lighting variable',
      result: 'Example output image shown on right panel'
    },
    {
      step: 4,
      title: 'Edit Anatomy',
      description: 'Prompt anatomy visible - each section editable',
      features: ['Drag to reorder', 'Click to edit', 'Hover for tooltip'],
      action: 'Drag sections, edit text, view tooltips',
      result: 'Custom prompt structure created'
    },
    {
      step: 5,
      title: 'Generate Batch',
      description: 'Apply template across multiple subjects',
      options: ['10 different subjects', 'Preview thumbnails', 'Export all'],
      action: 'Click "Generate Batch" button',
      result: 'Multiple prompt variants created and displayed'
    },
    {
      step: 6,
      title: 'QA Feedback',
      description: 'Feedback engine runs quality assurance',
      checks: ['Missing mood', 'Conflicting lens types', 'Ambiguous language'],
      action: 'Auto-scan runs on prompt',
      result: 'Issues flagged with fix suggestions'
    },
    {
      step: 7,
      title: 'Success Badge',
      description: 'Prompt earns quality certification',
      badges: ['Best Practice', '10/10 Quality', 'Production Ready'],
      action: 'All criteria met',
      result: 'Template versioned and stored'
    },
    {
      step: 8,
      title: 'Community Feedback',
      description: 'User rates and provides feedback',
      options: ['Rate 1-5 stars', 'Leave comment', 'Share template'],
      action: 'Submit feedback',
      result: 'Template refined and community-enhanced'
    }
  ],

  // Get variable by name
  getVariable(name) {
    return this.variableGuide[name] || null;
  },

  // Get all variables for a category
  getVariablesByCategory(category) {
    return Object.values(this.variableGuide).filter(v => v.category === category);
  },

  // Get suggestions for a variable
  getSuggestions(variableName) {
    const variable = this.variableGuide[variableName];
    return variable ? variable.suggestions : [];
  },

  // Get best practice tip for a variable
  getBestPractice(variableName) {
    const variable = this.variableGuide[variableName];
    return variable ? variable.bestPractice : null;
  },

  // Get onboarding content for skill level
  getOnboarding(skillLevel) {
    return this.onboardingByLevel[skillLevel] || this.onboardingByLevel.beginner;
  },

  // Get visual flow step
  getFlowStep(stepNumber) {
    return this.visualFlow.find(step => step.step === stepNumber);
  },

  // Get all flow steps
  getAllFlowSteps() {
    return this.visualFlow;
  }
};

// Export for use in main builder
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NanoBananaVariables;
}

console.log('🍌 Nano Banana Variable Guide System Loaded! 🍌');
