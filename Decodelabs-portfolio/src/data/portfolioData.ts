import { Project, Certification, SkillCategory, Experience } from '../types';

export const PERSONAL_INFO = {
  name: "Urooj Fatima",
  title: "Computer Engineering Technology Student & AI/ML Enthusiast",
  university: "University of Gujrat",
  degree: "B.S. Computer Engineering Technology (Undergraduate)",
  location: "Gujrat, Pakistan",
  email: "uroojfatima1206@gmail.com",
  github: "https://github.com/uroojfatima6260-create",
  linkedin: "https://linkedin.com/in/uroojfatima",
  currentRole: "AI & Software Engineering Intern at DecodeLabs",
  bio: `I am an Undergraduate Computer Engineering Technology student at the University of Gujrat with a strong passion for Artificial Intelligence, Machine Learning, Software Development, and Emerging Technologies.

I enjoy turning ideas into practical solutions by building responsive websites, web applications, and programming projects while continuously expanding my knowledge in Python, SQL, JavaScript, React, and modern software development practices.

I have completed multiple industry-recognized job simulations and certifications from Forage, Coddy, Alison, and leading global organizations in Software Engineering, Data Science, Cybersecurity, AI, and Financial Technology. These experiences have strengthened my problem-solving abilities, technical skills, and understanding of real-world industry workflows.

I believe in continuous learning, hands-on practice, and creating impactful technology that solves real-world problems. I am currently seeking internship opportunities, collaborative projects, and networking opportunities where I can contribute, learn from experienced professionals, and grow as a future computer engineer and AI professional.`,
  stats: [
    { label: "Completed Projects", value: "10+" },
    { label: "Industry Certifications", value: "10+" },
    { label: "Current Internship", value: "DecodeLabs" },
    { label: "Tech Focus", value: "AI, ML & Computer Vision" }
  ]
};

export const EXPERIENCES: Experience[] = [
  {
    id: "decodelabs-internship",
    role: "Software Engineering & AI Intern",
    company: "DecodeLabs",
    period: "2026 - Present",
    location: "Remote / On-site",
    type: "Internship",
    description: "Working on cutting-edge computer vision pipelines, rule-based AI systems, recommendation engines, and responsive software solutions.",
    responsibilities: [
      "Engineered computer vision & machine perception pipeline (Project 4: Machine's Optic Nerve) using OpenCV cv2.dnn, MobileNet-SSD, and pytesseract OCR with PSM tuning.",
      "Built AI Recommendation System (Project 3) implementing logical pattern matching, user skill filtering, and JSON data structures.",
      "Developing modular, responsive web interfaces using modern frontend frameworks and clean UI engineering practices.",
      "Implementing rule-based AI components, NLP query handlers, and Machine Learning model pipelines into web platforms.",
      "Collaborating with senior engineers to apply software design patterns, code reviews, and Git version control workflows."
    ],
    skills: ["Python", "OpenCV", "MobileNet-SSD", "pytesseract", "Machine Learning", "Pattern Matching", "React", "JavaScript", "Git", "Tailwind CSS"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "decodelabs-project-4-computer-vision",
    title: "Project 4: Computer Vision - Machine's Optic Nerve",
    category: "Computer Vision",
    description: "Computer vision & machine perception pipeline engineered for DecodeLabs Industrial Training. Combines pytesseract OCR (PSM tuning) and MobileNet-SSD deep learning with an 80% confidence gatekeeper.",
    longDescription: "Engineered an end-to-end computer vision pipeline transforming raw visual data into structured intelligence. Features a 4-step pre-processing pipeline (3D to 1D Grayscale, Gaussian Blur noise reduction, Deskewing rotation estimation, Otsu Adaptive Thresholding), dual processing paths (OCR with pytesseract PSM mode tuning `--psm 3`, `--psm 7`, `--psm 11` & OpenCV MobileNet-SSD 4D blob object detection), an 80% confidence threshold filter gatekeeper, and automated test validation.",
    githubUrl: "https://github.com/uroojfatima6260-create/Decodelabs-project4",
    techStack: ["Python", "OpenCV (cv2.dnn)", "pytesseract", "MobileNet-SSD", "Gaussian Blur", "Otsu Thresholding", "Deskewing"],
    imageUrl: "/src/assets/images/computer_vision_project_thumb_1786124627112.jpg",
    demoType: "computer-vision",
    featured: true,
    highlights: [
      "Path 1 (OCR): pytesseract with PSM tuning (--psm 3 layout, --psm 7 single line plates, --psm 11 sparse text)",
      "Path 2 (Object Detection): OpenCV cv2.dnn + MobileNet-SSD with 4D Blob creation (300x300 normalization)",
      "Pre-Processing Skeleton: 3D to 1D Grayscale, Gaussian Blur, Deskewing, and Otsu Adaptive Thresholding",
      "80% Confidence Filter: Strictly enforced (confidence >= 0.80) to eliminate false positives & model hallucinations",
      "Outputs & Validation: Annotated images saved to outputs/ with green bounding boxes & 100% test_pipeline.py validation"
    ]
  },
  {
    id: "decodelabs-project-3-recommendation-system",
    title: "Project 3: AI Recommendation System",
    category: "AI & ML",
    description: "Python-based recommendation engine built for DecodeLabs AI Training Program. Delivers personalized item recommendations using logical pattern matching and skill-level filtering.",
    longDescription: "Built an AI-powered recommendation system using Python that suggests tailored content and items based on user preferences and skill levels. Implemented a clean modular architecture (app.py, recommender.py), JSON-based dataset management (items.json, users.json), and logical pattern matching algorithms to personalize user experiences.",
    githubUrl: "https://github.com/uroojfatima6260-create/DecodeLabs_Project3_AI_Recommendation",
    techStack: ["Python", "JSON", "Pattern Matching", "Filtering Logic", "Algorithm Design", "Git & GitHub"],
    imageUrl: "/src/assets/images/ai_recommendation_project_thumb_1786124641646.jpg",
    demoType: "ai-recommender",
    featured: true,
    highlights: [
      "Logical Pattern Matching Engine for interest & skill-level alignment",
      "Category & Skill-Level Filtering with JSON dataset storage (items.json, users.json)",
      "Clean modular codebase structure (app.py, recommender.py)",
      "Personalized recommendation score generation & user preference inputs"
    ]
  },
  {
    id: "project-1-chatbot",
    title: "Project 1: Rule-Based Intelligent Chatbot",
    category: "AI & ML",
    description: "An automated rule-based conversational agent built in Python using NLP, regex pattern matching, and intent classification rules.",
    longDescription: "Designed and implemented an intelligent conversational agent capable of processing user queries, matching regex intent patterns, providing context-aware answers, and executing pre-defined task workflows seamlessly.",
    githubUrl: "https://github.com/uroojfatima6260-create/Project1_RuleBased_Chatbot/tree/7228fb418e2e454cd7648be2b8711d683702bd56/Project1_RuleBased_Chatbot",
    techStack: ["Python", "NLP", "Regex", "Rule Engine", "Intent Mapping", "CLI/Web"],
    imageUrl: "/src/assets/images/chatbot_project_thumb_1785947667087.jpg",
    demoType: "chatbot",
    featured: true,
    highlights: [
      "Dynamic Regex pattern matching for multi-intent recognition",
      "Contextual state handling for multi-turn conversations",
      "Fallback handling & default guidance response triggers",
      "Interactive query simulator built into web portfolio"
    ]
  },
  {
    id: "project-2-data-classification",
    title: "Project 2: ML Data Classification System",
    category: "AI & ML",
    description: "Supervised Machine Learning project featuring dataset preprocessing, feature engineering, and model evaluation algorithms.",
    longDescription: "A comprehensive machine learning system that trains, evaluates, and compares multiple classification models (Random Forest, SVM, Decision Trees, Logistic Regression) on structured datasets, generating accuracy metrics and confusion matrices.",
    githubUrl: "https://github.com/uroojfatima6260-create/Project2_Data_Classification",
    techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Supervised Learning"],
    imageUrl: "/src/assets/images/data_classification_thumb_1785947680337.jpg",
    demoType: "ml-classifier",
    featured: true,
    highlights: [
      "Automated feature scaling & missing value imputations",
      "Model benchmarking across Decision Trees, Random Forests, and SVMs",
      "Real-time accuracy, precision, recall & confusion matrix visualizer",
      "Interactive hyperparameter tuning playground"
    ]
  },
  {
    id: "decodelabs-ai-dashboard",
    title: "DecodeLabs AI Web Platform Prototype",
    category: "DecodeLabs Work",
    description: "Interactive web platform developed during DecodeLabs internship integrating AI modules and analytics visualization.",
    longDescription: "Built as part of DecodeLabs internship deliverables, combining clean component-driven React frontend architecture with backend Python microservices for AI query routing.",
    githubUrl: "https://github.com/uroojfatima6260-create",
    techStack: ["React", "Python", "Tailwind CSS", "REST APIs", "DecodeLabs AI"],
    imageUrl: "/src/assets/images/chatbot_project_thumb_1785947667087.jpg",
    demoType: "decodelabs",
    featured: false,
    highlights: [
      "Responsive glassmorphism UI layout",
      "Real-time API response streaming and status badges",
      "Modular design system with dark/light themes"
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-forage-se",
    title: "Software Engineering Job Simulation",
    organization: "Forage",
    logoText: "FORAGE",
    issueDate: "2025 - 2026",
    credentialCategory: "Software Engineering",
    skillsLearned: ["Software Design", "Code Review", "Data Structures", "Git Workflows"],
    description: "Completed practical tasks covering real-world software engineering scenarios, architecture design, and system debugging."
  },
  {
    id: "cert-coddy-python",
    title: "Advanced Python & Algorithmic Problem Solving",
    organization: "Coddy",
    logoText: "CODDY",
    issueDate: "2025",
    credentialCategory: "AI & ML",
    skillsLearned: ["Object-Oriented Python", "Algorithmic Efficiency", "Data Preprocessing"],
    description: "Hands-on coding challenges mastering data structures, algorithms, and clean Pythonic code practices."
  },
  {
    id: "cert-alison-ml",
    title: "Machine Learning & AI Foundations Certification",
    organization: "Alison",
    logoText: "ALISON",
    issueDate: "2025",
    credentialCategory: "AI & ML",
    skillsLearned: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation Metrics"],
    description: "In-depth study of statistical learning theories, neural networks, and computer engineering applications of AI."
  },
  {
    id: "cert-cybersecurity-fintech",
    title: "Cybersecurity & FinTech Industry Simulations",
    organization: "Global Industry Programs",
    logoText: "GLOBAL",
    issueDate: "2025",
    credentialCategory: "Cybersecurity",
    skillsLearned: ["Security Protocols", "Threat Analysis", "Financial Systems Tech", "SQL Data Auditing"],
    description: "Industry-aligned simulations focused on secure coding practices, network defenses, and technology workflows."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    iconName: "BrainCircuit",
    description: "Model building, NLP rule engines, data classification, and supervised learning algorithms.",
    skills: [
      { name: "Python", level: 90 },
      { name: "Machine Learning (Scikit-Learn)", level: 82 },
      { name: "Natural Language Processing (NLP)", level: 80 },
      { name: "Rule-Based Engines", level: 88 },
      { name: "Data Analysis (Pandas/NumPy)", level: 85 }
    ]
  },
  {
    title: "Web & Software Development",
    iconName: "Code2",
    description: "Crafting modern, responsive, and performance-optimized user interfaces and applications.",
    skills: [
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "React.js", level: 82 },
      { name: "HTML5 & CSS3", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Git & GitHub", level: 86 }
    ]
  },
  {
    title: "Computer Engineering & Core Skills",
    iconName: "Cpu",
    description: "Hardware-software integration, query optimization, and foundational engineering principles.",
    skills: [
      { name: "SQL & Relational Databases", level: 84 },
      { name: "Computer Engineering Technology", level: 88 },
      { name: "Embedded Systems Fundamentals", level: 75 },
      { name: "Cybersecurity Basics", level: 78 }
    ]
  }
];
