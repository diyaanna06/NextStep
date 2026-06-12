import * as React from "react";
import { Toaster as Sonner } from "sonner";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  X,
} from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      duration={4000}
      gap={12}
      closeButton
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="h-5 w-5" />,
        error: <XCircle className="h-5 w-5" />,
        warning: <AlertTriangle className="h-5 w-5" />,
        info: <Info className="h-5 w-5" />,
        loading: <Loader2 className="h-5 w-5 animate-spin" />,
        close: <X className="h-3.5 w-3.5" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast flex w-full items-start gap-3 rounded-xl border p-4 shadow-xl shadow-black/5 backdrop-blur-sm transition-all duration-300",
          title: "text-sm font-semibold leading-tight font-sans",
          description: "text-xs leading-relaxed opacity-90 mt-0.5 font-sans",
          actionButton:
            "inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          cancelButton:
            "inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
