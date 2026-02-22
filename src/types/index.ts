// TypeScript types for BD News Archive

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  district: string;
  newspaper: string;
  date: string;
  summary: string;
  originalUrl: string;
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface Submission {
  id: number;
  title: string;
  category: string;
  district: string;
  newspaper: string;
  date: string;
  description: string;
  contactName: string;
  contactEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface District {
  id: number;
  name: string;
}

export interface Newspaper {
  id: number;
  name: string;
}
