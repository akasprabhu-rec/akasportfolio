export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  valueProposition?: string;
  deliverables: string[];
  visualType: 'business-websites' | 'startup-landing' | 'ecommerce' | 'portfolio' | 'web-design' | 'frontend' | 'ui-ux' | 'interactive';
}

export interface ClientCategoryItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'business' | 'restaurant' | 'gym' | 'startup' | 'agency' | 'personal';
  deliverables: string[];
}

export interface ValuePillarItem {
  id: string;
  number: string;
  title: string;
  description: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  extendedDetails: string;
  architectureHighlights: string[];
  tags: string[];
  category: string;
  imageUrl?: string;
  liveUrl?: string;
  visualType: 'fintrack' | 'lumina' | 'ecobot' | 'kinetix';
  year: string;
}

export interface ProcessStepItem {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface TechStackItem {
  name: string;
  category: 'Core' | 'Framework & Motion' | 'Design & Workflow';
  description: string;
}

export interface PortfolioData {
  intro: {
    phase1Text: string;
    phase2Name: string;
    phase4Text: string;
  };
  hero: {
    label: string;
    heading: string;
    subtitle: string;
    description: string;
    portraitWebpUrl: string;
    portraitVideoMp4Url?: string;
    portraitVideoWebmUrl?: string;
    portraitPosterUrl?: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    philosophy: {
      title: string;
      statement: string;
    };
    focusAreas: string[];
    creativePillars: {
      label: string;
      detail: string;
    }[];
  };
  services: ServiceItem[];
  whoIBuildFor: ClientCategoryItem[];
  whyWorkWithMe: ValuePillarItem[];
  projects: ProjectItem[];
  process: ProcessStepItem[];
  techStack: TechStackItem[];
  contact: {
    heading: string;
    description: string;
    ctaLabel: string;
    email: string;
    phone: string;
    whatsapp: string;
    whatsappDisplay: string;
    instagram: string;
    linkedin: string;
    github: string;
    location: string;
  };
  footer: {
    brand: string;
    tagline: string;
  };
}

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  intro: {
    phase1Text: 'MODERN WEBSITES. REAL BUSINESS IMPACT.',
    phase2Name: 'AKAS PRABHU',
    phase4Text: 'WEBSITES THAT MOVE BUSINESSES FORWARD.',
  },
  hero: {
    label: 'CREATIVE DEVELOPER',
    heading: 'AKAS PRABHU',
    subtitle: 'DESIGNING DIGITAL EXPERIENCES.',
    description:
      'I create visually striking websites and interactive digital experiences that bring brands and ideas to life.',
    portraitWebpUrl:
      '/assets/aistudio/Person_transitioning_between_poses_6b0d8a4a_t0-5-ezgif.com-crop_ae2703b5.webp',
    portraitVideoMp4Url: '/assets/aistudio/portrait_scrub.mp4',
    portraitVideoWebmUrl: '/assets/aistudio/portrait_scrub.webm',
    portraitPosterUrl: '/assets/aistudio/portrait_poster.webp',
    primaryCta: 'VIEW MY WORK',
    secondaryCta: "LET'S TALK",
  },
  about: {
    heading: 'NOT JUST WEBSITES. EXPERIENCES THAT DRIVE GROWTH.',
    paragraphs: [
      "I'm a creative developer and website designer dedicated to helping small businesses, startups, and modern founders establish an authoritative digital presence.",
      'I combine strategic UI/UX design, modern mobile-first frontend engineering, and interactive motion to craft websites that do not just look visually striking—they build trust and convert visitors into customers.',
      'Whether launching an ambitious new startup, elevating a local business brand, or building a bespoke product showcase, I deliver clean, fast, and high-converting digital solutions.',
    ],
    philosophy: {
      title: 'Business-Driven Digital Craft',
      statement:
        'Every layout, typographic choice, and choreographed motion is intentionally designed to communicate value, guide customer attention, and accelerate business momentum.',
    },
    focusAreas: [
      'Small Business Websites',
      'Startup Landing Pages',
      'E-Commerce Experiences',
      'Founder & Agency Portfolios',
      'UI/UX Interface Design',
      'Mobile-First Frontend Development',
      'Conversion & Performance Optimization',
    ],
    creativePillars: [
      {
        label: 'Clear Value Communication',
        detail:
          'Structuring pages so your visitors instantly understand who you are, what you offer, and why they should choose your business.',
      },
      {
        label: 'Choreographed Interaction',
        detail:
          'Using GSAP, Framer Motion, and 3D depth to make exploring your website feel responsive, fluid, and memorable.',
      },
      {
        label: 'Performance & Reliability',
        detail:
          'Engineering clean, lightweight React code that loads in milliseconds on any mobile device and ranks smoothly on search engines.',
      },
    ],
  },
  services: [
    {
      id: 'business-websites',
      number: '01',
      title: 'BUSINESS WEBSITES',
      description:
        'High-credibility, modern digital flagships engineered to turn local visitors and corporate prospects into paying clients.',
      valueProposition:
        'Establishes immediate market authority, showcases core offerings with clarity, and automates client inquiry flow with zero clutter.',
      deliverables: [
        'Custom Multi-Page Responsive Architecture',
        'Brand Visual Identity & Art Direction',
        'Local SEO & Google Business Integration',
        'Direct Inquiry & Booking Funnels',
        'Fast 60fps Mobile Performance',
      ],
      visualType: 'business-websites',
    },
    {
      id: 'startup-landing',
      number: '02',
      title: 'STARTUP LANDING PAGES',
      description:
        'High-conversion launchpads built to validate products, capture waitlists, and pitch value to early adopters and investors.',
      valueProposition:
        'Maximizes sign-up conversion with clean product framing, interactive feature breakdowns, and compelling visual narrative.',
      deliverables: [
        'High-Conversion Waitlist & Beta Funnels',
        'Interactive Product Visualizers & Demos',
        'Investor-Ready Pitch Narrative Alignment',
        'Responsive Layout Across All Screen Sizes',
        'GSAP Motion Choreography & Micro-Interactions',
      ],
      visualType: 'startup-landing',
    },
    {
      id: 'ecommerce',
      number: '03',
      title: 'E-COMMERCE WEBSITES',
      description:
        'Fast, frictionless online storefronts designed to showcase products and drive sales with intuitive buying journeys.',
      valueProposition:
        'Eliminates buying friction, elevates brand desirability, and delivers a seamless shopping experience optimized for mobile checkouts.',
      deliverables: [
        'High-Performance Product Catalogs & Filters',
        'Frictionless Mobile-First Checkout UX',
        'High-Resolution Product Showcases',
        'Secure Payment Gateway & Checkout Flow',
        'Inventory & Inquiry Architecture',
      ],
      visualType: 'ecommerce',
    },
    {
      id: 'portfolio',
      number: '04',
      title: 'PORTFOLIO WEBSITES',
      description:
        'Distinctive, memorable showcase websites for founders, executives, creators, and agencies who demand standout credibility.',
      valueProposition:
        'Positions you as an industry authority, highlights tangible proof of work, and attracts premium deals and speaking inquiries.',
      deliverables: [
        'Bespoke Editorial & Architectural Layouts',
        'Interactive 3D Perspective & Motion Highlights',
        'In-Depth Case Study & Deliverable Breakdowns',
        'Media Kit, Press & Speaking Integration',
        'Social Authority & Direct Contact Access',
      ],
      visualType: 'portfolio',
    },
  ],
  whoIBuildFor: [
    {
      id: 'small-businesses',
      number: '01',
      title: 'Small Businesses',
      subtitle: 'Local & Independent Businesses',
      description:
        'Clean, authoritative websites that build immediate local trust, showcase services clearly, and turn online searches into inquiries and bookings.',
      iconType: 'business',
      deliverables: [
        'Local SEO & Map Integration',
        'Clear Service & Pricing Menus',
        'Direct Call & Inquiry Triggers',
        'Client Trust & Review Badges',
      ],
    },
    {
      id: 'restaurants-cafes',
      number: '02',
      title: 'Restaurants & Cafés',
      subtitle: 'Hospitality & Dining Venues',
      description:
        'Appetizing, sensory websites featuring interactive digital menus, online reservation routing, location hours, and warm ambiance showcases.',
      iconType: 'restaurant',
      deliverables: [
        'Mobile Digital Food & Drink Menus',
        'Table Reservation Flow Links',
        'Atmosphere & Ambiance Photography',
        'Instant Directions & Operating Hours',
      ],
    },
    {
      id: 'gyms-fitness',
      number: '03',
      title: 'Gyms & Fitness Studios',
      subtitle: 'Fitness, Yoga & Wellness Centers',
      description:
        'High-energy, motivating digital destinations with live class schedules, trainer rosters, membership sign-ups, and free pass lead capture.',
      iconType: 'gym',
      deliverables: [
        'Interactive Class Schedule Grid',
        'Membership Tier Comparisons',
        'Coach & Personal Trainer Profiles',
        'Trial Pass & Lead Capture Funnel',
      ],
    },
    {
      id: 'startups-saas',
      number: '04',
      title: 'Startups & SaaS',
      subtitle: 'Tech Products & Early-Stage Ventures',
      description:
        'High-velocity product landing pages that explain complex technology simply, validate market demand, capture waitlists, and impress investors.',
      iconType: 'startup',
      deliverables: [
        'Interactive Product Feature Demos',
        'Waitlist & Beta Onboarding Flow',
        'Pricing Tiers & ROI Calculator UX',
        'Pitch Deck Narrative Alignment',
      ],
    },
    {
      id: 'creative-agencies',
      number: '05',
      title: 'Creative Agencies',
      subtitle: 'Design Studios & Marketing Collectives',
      description:
        'Bold, boundary-pushing showcase websites that exhibit client case studies with choreographed motion, editorial typography, and creative flair.',
      iconType: 'agency',
      deliverables: [
        'Full-Bleed Media Case Studies',
        'Choreographed GSAP Transitions',
        'Team Roster & Service Capabilities',
        'High-Value Client Inquiry Funnel',
      ],
    },
    {
      id: 'personal-brands',
      number: '06',
      title: 'Personal Brands',
      subtitle: 'Founders, Consultants & Creators',
      description:
        'Authoritative digital homes for founders, consultants, speakers, and creators to amplify their industry reputation, publish insights, and close advisory deals.',
      iconType: 'personal',
      deliverables: [
        'Speaking & Media Press Kit',
        'Consulting Discovery Application',
        'Articles & Thought Leadership Hub',
        'Social Authority & Podcast Links',
      ],
    },
  ],
  whyWorkWithMe: [
    {
      id: 'responsive-design',
      number: '01',
      title: 'Modern & Responsive Designs',
      description:
        'Fluid, adaptive layouts engineered to look pristine and function flawlessly on every screen size from smartphones to ultrawide desktop monitors.',
      badge: 'ALL VIEWPORTS',
    },
    {
      id: 'custom-built',
      number: '02',
      title: 'Custom-Built Experiences',
      description:
        'Every website is tailored directly to your specific business identity and audience goals, with zero generic cookie-cutter templates.',
      badge: '100% BESPOKE',
    },
    {
      id: 'mobile-first',
      number: '03',
      title: 'Mobile-First Development',
      description:
        'Prioritizing touch usability, gesture responsiveness, and fast mobile rendering where over 70% of your real customers browse.',
      badge: 'TOUCH-OPTIMIZED',
    },
    {
      id: 'interactive-animations',
      number: '04',
      title: 'Interactive Animations',
      description:
        'Intentional, hardware-accelerated motion using GSAP and Framer Motion that engages visitors and guides attention without sacrificing speed.',
      badge: '60 FPS MOTION',
    },
    {
      id: 'direct-communication',
      number: '05',
      title: 'Direct Communication',
      description:
        'You work one-on-one directly with the designer and developer from initial kickoff to final launch with fast responses and zero agency middlemen.',
      badge: 'NO MIDDLEMEN',
    },
    {
      id: 'performance-usability',
      number: '06',
      title: 'Focus on Performance & Usability',
      description:
        'Clean semantic code, optimized media delivery, intuitive navigational paths, and lightning-fast loading speeds that boost SEO and conversions.',
      badge: 'HIGH SPEED',
    },
  ],
  projects: [
    {
      id: 'fintrack',
      number: '01',
      title: 'FinTrack',
      subtitle: 'Modern Financial Tracking Platform',
      description:
        'A modern financial tracking platform designed to help users manage daily expenses, monitor income and understand their spending habits through a clean, intuitive dashboard.',
      extendedDetails:
        'FinTrack reimagines personal and small business expense management as a calm, high-contrast web experience. Built with a focus on rapid transaction logging, interactive cash-flow visualizers, and responsive layout precision across desktop and mobile viewports.',
      architectureHighlights: [
        'High-contrast editorial dashboard with interactive cash-flow and revenue visualizers',
        'Instant category filtering, monthly expense breakdowns, and transaction logging',
        'Fluid responsive layout precision optimized for on-the-go financial monitoring',
      ],
      tags: ['React', 'JavaScript', 'CSS', 'Figma'],
      category: 'FINTECH · WEB APPLICATION',
      imageUrl: '/assets/projects/fintrack.jpg',
      visualType: 'fintrack',
      year: '2025',
    },
    {
      id: 'bros-production',
      number: '02',
      title: 'BROS Production',
      subtitle: 'Creative Production & Brand Experience',
      description:
        'A digital presence for BROS Production, part of the BROS Companies ecosystem. Designed to showcase its production identity, creative work and brand presence through an engaging, visually driven website.',
      extendedDetails:
        'Built as the digital flagship for BROS Production within the BROS Companies ecosystem. The experience combines cinematic dark-mode aesthetics, bold editorial typography, and choreographed motion to present the studio’s creative production roster, commercial work, and high-impact brand capabilities.',
      architectureHighlights: [
        'High-impact editorial storytelling presenting the BROS Companies ecosystem and creative production portfolio',
        'Responsive motion choreography, cinematic contrast, and dynamic brand presentation',
        'Streamlined client inquiry routing and modern mobile-first media performance',
      ],
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'CREATIVE PRODUCTION · BRAND EXPERIENCE',
      imageUrl: '/assets/projects/bros-companies.jpg',
      visualType: 'lumina',
      year: '2025',
    },
    {
      id: 'mend-and-blend',
      number: '03',
      title: 'Mend and Blend',
      subtitle: 'Event Technology & Ticket Booking Platform',
      description:
        'A modern ticket booking platform designed to simplify event discovery and reservations. Featuring an intuitive interface, clear event presentation and a responsive booking experience across devices.',
      extendedDetails:
        'Mend and Blend brings event discovery and ticket reservations into one streamlined digital experience. The platform focuses on intuitive navigation, clean visual hierarchy and a smooth user journey, making it easier for users to explore events and book tickets.',
      architectureHighlights: [
        'Intuitive event discovery catalog with real-time workshop details, schedules, and reservations',
        'Frictionless ticket reservation and payment integration powered by Razorpay',
        'Full-stack state management, user accounts, and ticket verification with Firebase and Node.js',
      ],
      tags: ['React', 'JavaScript', 'Node.js', 'Firebase', 'Razorpay'],
      category: 'EVENT TECHNOLOGY · TICKET BOOKING PLATFORM',
      imageUrl: '/assets/projects/mend-and-blend.jpg',
      visualType: 'ecobot',
      year: '2024',
    },
  ],
  process: [
    {
      id: 'discover',
      number: '01',
      title: 'DISCOVERY',
      description: 'Understand the business, audience and goals.',
      detail:
        'We begin by analyzing your business model, target audience, competitors, and key conversion metrics before designing a single pixel.',
    },
    {
      id: 'design',
      number: '02',
      title: 'DESIGN',
      description: 'Create a visual identity and intuitive user experience.',
      detail:
        'Crafting bespoke typography systems, spatial wireframes, and interactive Figma prototypes that reflect your brand identity with effortless usability.',
    },
    {
      id: 'develop',
      number: '03',
      title: 'DEVELOPMENT',
      description: 'Build responsive, interactive and optimized websites.',
      detail:
        'Translating designs into clean, modern React frontend architecture with fluid GSAP/Framer Motion choreography, mobile responsiveness, and 60fps performance.',
    },
    {
      id: 'launch',
      number: '04',
      title: 'LAUNCH',
      description: 'Test, refine and deploy the completed website.',
      detail:
        'Rigorous cross-device quality assurance, SEO checks, page-speed optimization, and seamless deployment to ensure a smooth, impactful launch.',
    },
  ],
  techStack: [
    {
      name: 'HTML5',
      category: 'Core',
      description: 'Semantic document structure & accessible markup architecture',
    },
    {
      name: 'CSS3',
      category: 'Core',
      description: 'Modern layout systems, custom properties & 3D transforms',
    },
    {
      name: 'JavaScript',
      category: 'Core',
      description: 'Interactive application logic, DOM choreography & async flows',
    },
    {
      name: 'React',
      category: 'Framework & Motion',
      description: 'Component-driven UI engineering & stateful web applications',
    },
    {
      name: 'Tailwind CSS',
      category: 'Framework & Motion',
      description: 'Precision utility styling & responsive design tokens',
    },
    {
      name: 'GSAP',
      category: 'Framework & Motion',
      description: 'Timeline choreography, ScrollTrigger & scroll scrubbing',
    },
    {
      name: 'Framer Motion',
      category: 'Framework & Motion',
      description: 'Declarative layout transitions, gestures & spring physics',
    },
    {
      name: 'Three.js',
      category: 'Framework & Motion',
      description: 'Spatial WebGL canvases, 3D perspective scenes & ambient shaders',
    },
    {
      name: 'Figma',
      category: 'Design & Workflow',
      description: 'Interface design, typography systems & interactive prototyping',
    },
    {
      name: 'Git & GitHub',
      category: 'Design & Workflow',
      description: 'Version control, collaborative workflows & CI/CD deployments',
    },
  ],
  contact: {
    heading: 'YOUR BUSINESS DESERVES A BETTER WEBSITE.',
    description: "Have an idea? Let's turn it into a digital experience.",
    ctaLabel: "LET'S BUILD SOMETHING GREAT.",
    email: 'akasprabhu2216@gmail.com',
    phone: '+91 93604 84615',
    whatsapp: '+919360484615',
    whatsappDisplay: '+91 93604 84615',
    instagram: 'https://www.instagram.com/theakas.in/',
    linkedin: 'https://linkedin.com/in/akasprabhu',
    github: 'https://github.com/akasprabhu',
    location: 'Available for Remote & Worldwide Projects',
  },
  footer: {
    brand: 'AKAS PRABHU',
    tagline: 'CREATIVE DEVELOPER & WEBSITE DESIGNER · DIGITAL EXPERIENCES',
  },
};
