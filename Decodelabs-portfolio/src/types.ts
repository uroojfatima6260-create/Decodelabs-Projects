export interface Project {
  id: string;
  title: string;
  category: 'AI & ML' | 'Web Development' | 'DecodeLabs Work' | 'Data Science' | 'Computer Vision';
  description: string;
  longDescription: string;
  githubUrl: string;
  techStack: string[];
  imageUrl: string;
  demoType: 'chatbot' | 'ml-classifier' | 'computer-vision' | 'ai-recommender' | 'decodelabs' | 'none';
  highlights: string[];
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  logoText: string;
  issueDate: string;
  skillsLearned: string[];
  credentialCategory: 'Software Engineering' | 'Data Science' | 'Cybersecurity' | 'AI & ML' | 'FinTech';
  description: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  skills: string[];
}
