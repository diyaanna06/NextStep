export interface MentorProfile {
  user_id: number;

  full_name: string;

  current_role: string;

  company: string;

  years_of_experience: number;

  expertise_areas: string;

  availability_status: boolean;
}

export interface UpdateMentorProfileRequest {
  full_name?: string;

  current_role?: string;

  company?: string;

  years_of_experience?: number;

  expertise_areas?: string;

  availability_status?: boolean;
}