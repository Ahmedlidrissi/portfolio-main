import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Lidrissi — Full Stack Developer",
  description: "Senior Full-Stack Engineer specialising in cloud-native architectures, microservices, and modern web technologies. Based in Casablanca, Morocco.",
  openGraph: {
    title: "Ahmed Lidrissi — Full Stack Developer",
    description: "Senior Full-Stack Engineer specialising in cloud-native architectures, microservices, and modern web technologies.",
    url: "https://ahmedlidrissi.com",
    siteName: "Ahmed Lidrissi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Lidrissi — Full Stack Developer",
    description: "Senior Full-Stack Engineer specialising in cloud-native architectures, microservices, and modern web technologies.",
    creator: "@ahmedlidrissi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="scanline-overlay" aria-hidden="true" />
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
