export interface Application {
  id: number;

  student_id: number;

  opportunity_id: number;

  status: string;

  created_at: string;
}

export interface CreateApplicationRequest {
  opportunity_id: number;
}