export interface StudentProfile {
  user_id: number;
  full_name: string;
  college: string;
  degree: string;
  graduation_year: number;
  skills: string | null;
  career_interests: string | null;

  resume_filename: string | null;
  resume_uploaded_at: string | null;
}