export interface Story {
  id: string;
  title: string;
  author: string;
  synopsis?: string;
  category: 'Financial' | 'Technology' | 'Health';
  keywords: string[];
  status: 'Publish' | 'Draft';
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  lastUpdated: Date;
}

export interface StoryFormData {
  title: string;
  author: string;
  synopsis: string;
  category: 'Financial' | 'Technology' | 'Health' | '';
  storyCover: File | null;
  keywords: string[];
  status: 'Publish' | 'Draft' | '';
  chapters: Chapter[];
}

export interface FilterState {
  category: string;
  status: string;
}

export interface SearchState {
  query: string;
} 