import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/themeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akhilesh Singh — Backend & Systems Engineer",
  description:
    "I build backend systems and think hard about how they break when real users show up.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes sets data-theme before hydration.
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}