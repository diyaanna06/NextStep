"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { OpportunityFormData } from "@/lib/validations/opportunity";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types/opportunity";
import { organizationService } from "@/services/organization-service";
import { opportunityService } from "@/services/opportunity-service";

import { OpportunityForm } from "./components/opportunity-form";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Loader2 } from "lucide-react";

export default function OpportunitiesPage() {
  const queryClient = useQueryClient();
const [editingOpportunity, setEditingOpportunity] =
  useState<Opportunity | null>(null);
  const { data: profile } = useQuery({
    queryKey: ["organization-profile"],
    queryFn: () => organizationService.getMyProfile(),
  });

  const { data: opportunities, isLoading } = useQuery({
    queryKey: ["organization-opportunities"],
    enabled: !!profile,
    queryFn: () =>
      opportunityService.getOrganizationOpportunities(profile!.user_id),
  });

  const mutation = useMutation({
  mutationFn: opportunityService.create,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: [
        "organization-opportunities",
      ],
    });

    toast.success(
      "Opportunity created",
      {
        description:
          "The opportunity has been posted successfully.",
      }
    );
  },

  onError: (
    error: unknown
  ) => {
    let message =
      "Failed to create opportunity";

    if (
      typeof error ===
        "object" &&
      error !== null &&
      "response" in error
    ) {
      const axiosError =
        error as {
          response?: {
            data?: {
              detail?: string;
            };
          };
        };

      message =
        axiosError
          .response
          ?.data
          ?.detail ??
        message;
    }

    toast.error(
      "Failed to create opportunity",
      {
        description:
          message,
      }
    );
  },
});
const updateMutation = useMutation({
  mutationFn: ({
    id,
    data,
  }: {
    id: number;
    data: OpportunityFormData;
  }) =>
    opportunityService.update(
      id,
      data
    ),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: [
        "organization-opportunities",
      ],
    });

    toast.success(
      "Opportunity updated",
      {
        description:
          "The opportunity has been updated successfully.",
      }
    );

    setEditingOpportunity(
      null
    );
  },

  onError: () => {
    toast.error(
      "Failed to update opportunity"
    );
  },
});

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </div>
    );
  }
  if (!profile) {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Opportunities"
        description="Complete your organization profile to start posting opportunities."
      />

      <Card>
        <CardContent className="py-12 text-center">
          <Briefcase className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

          <h2 className="text-lg font-semibold">
            Complete Your Profile First
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            You need to complete your organization profile before creating opportunities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
  return (
    <div className="space-y-8">
      <PageHeader
        title="Opportunities"
        description="Create new opportunities and manage your existing ones."
      />

      <Card>
        <CardHeader>
          <CardTitle>
  {editingOpportunity
    ? "Edit Opportunity"
    : "Create Opportunity"}
</CardTitle>
        </CardHeader>
        <CardContent>
         <OpportunityForm
  defaultValues={
    editingOpportunity
      ? {
          title:
            editingOpportunity.title,

          description:
            editingOpportunity.description,

          opportunity_type:
            editingOpportunity.opportunity_type,

          location:
            editingOpportunity.location,

          skills_required:
            editingOpportunity.skills_required,

          application_deadline:
            editingOpportunity.application_deadline.slice(
              0,
              16
            ),
        }
      : undefined
  }

  submitText={
    editingOpportunity
      ? "Update Opportunity"
      : "Create Opportunity"
  }

  onCancel={
    editingOpportunity
      ? () =>
          setEditingOpportunity(
            null
          )
      : undefined
  }

  onSubmit={(data) => {
    if (
      editingOpportunity
    ) {
      updateMutation.mutate({
        id:
          editingOpportunity.id,

        data,
      });
    } else {
      mutation.mutate(
        data
      );
    }
  }}

  isSubmitting={
    mutation.isPending ||
    updateMutation.isPending
  }
/>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold">
          Your opportunities
        </h2>

        {!opportunities || opportunities.length === 0 ? (
          <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-12 text-center">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No opportunities created yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle className="truncate">
                      {opportunity.title}
                    </CardTitle>
                   <div className="flex gap-2">
  <Badge
    variant={
      opportunity.is_active
        ? "default"
        : "secondary"
    }
  >
    {opportunity.is_active
      ? "Active"
      : "Inactive"}
  </Badge>

  <Button
    variant="outline"
    size="sm"
    onClick={() =>
      setEditingOpportunity(
        opportunity
      )
    }
  >
    Edit
  </Button>
</div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {opportunity.description}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
