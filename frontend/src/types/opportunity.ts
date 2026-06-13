export interface OrganizationSummary {
  user_id: number;

  organization_name: string;
  industry: string;

  website: string;
  description: string;

  location: string;
  verified: boolean;
}

export interface Opportunity {
  id: number;

  title: string;
  description: string;

  opportunity_type: string;
  location: string;

  skills_required: string;

  application_deadline: string;

  is_active: boolean;
  created_at: string;

  organization: OrganizationSummary;
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