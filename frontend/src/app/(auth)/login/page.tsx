"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/login";
import type { LoginFormData } from "@/lib/validations/login";
import { authService } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const tokenResponse = await authService.login({
        username: data.email,
        password: data.password,
      });
      useAuthStore.setState({ token: tokenResponse.access_token });
      const user = await authService.getCurrentUser();
      login(user, tokenResponse.access_token);

      if (user.role === "student") router.push("/student");
      else if (user.role === "mentor") router.push("/mentor");
      else router.push("/organization");
    } catch (error) {
    
      useAuthStore.getState().logout();
      toast.error("Login failed", {
      description:
        "Please check your credentials and try again.",
    });
      
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-foreground text-primary font-bold">
            N
          </div>
          <span className="font-heading text-lg font-semibold">NextStep</span>
        </div>
        <div>
          <h2 className="font-heading text-3xl font-semibold leading-tight">
            Your next step starts here.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/70">
            Connect with mentors, discover opportunities, and accelerate your
            career — all in one place.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} NextStep
        </p>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
                N
              </div>
              <span className="font-heading text-lg font-semibold">
                NextStep
              </span>
            </div>
          </div>

          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue to your dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" /> Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By signing in you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
