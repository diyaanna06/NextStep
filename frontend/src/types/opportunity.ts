export interface Opportunity {
  id: number;
  organization_id: number;

  title: string;
  description: string;

  opportunity_type: string;
  location: string;

  skills_required: string;

  application_deadline: string;

  is_active: boolean;
  created_at: string;
}

export interface CreateOpportunityRequest {
  title: string;
  description: string;
  opportunity_type: string;
  location: string;
  skills_required: string;
  application_deadline: string;
}

export interface UpdateOpportunityRequest {
  title?: string;
  description?: string;
  opportunity_type?: string;
  location?: string;
  skills_required?: string;
  application_deadline?: string;
  is_active?: boolean;
}