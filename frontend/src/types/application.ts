import { Opportunity } from "./opportunity";
import { StudentProfile } from "./student-profile";

export interface Application {
  id: number;

  student: StudentProfile;

  opportunity: Opportunity;

  status: string;

  created_at: string;
}

export interface CreateApplicationRequest {
  opportunity_id: number;
}

export interface UpdateApplicationStatusRequest {
  status: string;
}