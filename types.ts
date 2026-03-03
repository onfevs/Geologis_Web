
export interface NavItem {
  label: string;
  href: string;
}

export interface Review {
  id: number;
  author: string;
  role: string;
  company: string;
  project?: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Project {
  title: string;
  category: string;
  image: string;
  result: string;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}


