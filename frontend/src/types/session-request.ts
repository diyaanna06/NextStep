import { MentorProfile } from "./mentor";
import { StudentProfile } from "./student-profile";

export interface SessionRequest {
  id: number;

  student: StudentProfile;

  mentor: MentorProfile;

  message: string;

  status: string;

  created_at: string;
}

export interface CreateSessionRequest {
  mentor_id: number;
  message: string;
}