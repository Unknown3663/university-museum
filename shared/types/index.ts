// Database Models
export interface Exhibit {
  id?: string;
  title: string;
  description: string;
  image_url: string | null;
  category?: string | null;
  published: boolean;
  created_at?: string;
}

export interface Workshop {
  id?: string;
  title: string;
  description: string | null;
  date: string;
  order: number;
  image_url: string | null;
  published: boolean;
  created_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  bio?: string | null;
  order: number;
  created_at?: string;
}

// Form Data Types
export interface ExhibitFormData {
  title: string;
  description: string;
  published: boolean;
  category?: string;
}

export interface WorkshopFormData {
  title: string;
  description: string;
  date: string;
  order: string;
  published: boolean;
}

// Component Props
export interface ExhibitCardProps {
  exhibit: Exhibit;
  index?: number;
  priority?: boolean;
}

export interface WorkshopCardProps {
  workshop: Workshop;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Supabase Client Types
export interface SupabaseConfig {
  url: string;
  anonKey: string;
}
