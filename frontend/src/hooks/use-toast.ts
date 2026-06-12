
import { toast as sonnerToast, type ExternalToast } from "sonner";

type ToastOptions = Omit<ExternalToast, "style">;

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    sonnerToast.success(message, options),

  error: (message: string, options?: ToastOptions) =>
    sonnerToast.error(message, options),

  warning: (message: string, options?: ToastOptions) =>
    sonnerToast.warning(message, options),

  info: (message: string, options?: ToastOptions) =>
    sonnerToast.info(message, options),

  message: (message: string, options?: ToastOptions) =>
    sonnerToast(message, options),

  custom: sonnerToast.custom,
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
  loading: sonnerToast.loading,
};
