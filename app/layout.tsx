import type { Metadata } from "next";
import { Caveat, Instrument_Sans } from "next/font/google";
import { ThemeToggle } from "@/components/features/themeToggle";
import { Header } from "@/components/layout/header";
import { Shell } from "@/components/layout/shell";
import { ThemeProvider } from "@/components/layout/themeProvider";
import { CommandMenu } from "@/components/sections/commandMenu";
import { Footer } from "@/components/layout/footer";
import { Tooltip } from "@/components/ui/tooltip";
import { site } from "@/content/site";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akhilesh Singh",
  description:
    "I build backend systems and think hard about how they break when real users show up.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Shell>
            <Header
              nav={site.nav}
              actions={
                <div className="flex items-center gap-2">
                  <CommandMenu />
                  <Tooltip label="Toggle theme" align="end">
                    <ThemeToggle />
                  </Tooltip>
                </div>
              }
            />
            {children}
            <Footer name={site.name} />
          </Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}