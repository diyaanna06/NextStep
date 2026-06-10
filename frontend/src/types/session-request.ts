export interface SessionRequest {
  id: number;
  student_id: number;
  mentor_id: number;

  message: string;

  status: string;

  created_at: string;
}

export interface CreateSessionRequest {
  mentor_id: number;
  message: string;
}