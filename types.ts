export interface LinkItem {
  title: string;
  url?: string;
  description: string;
  action?: () => void;
  isButton?: boolean;
  supportsHebrew?: boolean;
}

export interface Section {
  title?: string;
  content?: string;
  links?: LinkItem[];
  image?: string;
  code?: string;
  isInputSection?: boolean;
}

export interface Guide {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  sections: Section[];
  warning?: string;
}