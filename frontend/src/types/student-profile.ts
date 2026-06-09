export interface StudentProfile {
  user_id: number;
  full_name: string;
  college: string;
  degree: string;
  graduation_year: number;
  skills: string | null;
  career_interests: string | null;
  resume_link: string | null;
}