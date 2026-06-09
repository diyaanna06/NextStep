import { DashboardLayout } from "@/components/layouts/dashboard-layout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  return (
    <DashboardLayout
      title="Student Dashboard"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Applications
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              0
            </p>

            <Badge className="mt-2">
              Applied Opportunities
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Mentorship Sessions
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              0
            </p>

            <Badge className="mt-2">
              Session Requests
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            Welcome to NextStep
          </CardTitle>
        </CardHeader>

        <CardContent>
          Start exploring opportunities
          and connect with mentors to
          accelerate your career journey.
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}