import type { Metadata } from "next";
import { Sora, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextStep — Career Acceleration Platform",
  description:
    "Connect students, mentors, and organizations to accelerate careers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
     <body className="min-h-screen bg-background text-foreground">
      <QueryProvider>
        {children}
      </QueryProvider>

      <Toaster />
    </body>
    </html>
  );
}
