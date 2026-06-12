import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, Building2 } from "lucide-react";

export default function Home() {
  const roles = [
    {
      icon: GraduationCap,
      title: "Students",
      desc: "Discover opportunities, connect with mentors, and track your career journey.",
    },
    {
      icon: Users,
      title: "Mentors",
      desc: "Guide students, manage requests, and run mentoring sessions.",
    },
    {
      icon: Building2,
      title: "Organizations",
      desc: "Post opportunities and recruit talented students efficiently.",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-background to-secondary/40">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
            N
          </div>
          <span className="font-heading text-lg font-semibold tracking-tight">
            NextStep
          </span>
        </div>
        <Button asChild size="lg">
          <Link href="/login">
            Sign in <ArrowRight />
          </Link>
        </Button>
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          Career acceleration platform
        </span>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight sm:text-6xl">
          From learning to{" "}
          <span className="text-gradient-navy">your next step.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          NextStep brings students, mentors, and organizations together in one
          professional ecosystem — discover opportunities, get mentorship, and
          recruit talent.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/login">Get started</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-24 sm:grid-cols-3">
        {roles.map((r) => (
          <div
            key={r.title}
            className="surface-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <r.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold">
              {r.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
