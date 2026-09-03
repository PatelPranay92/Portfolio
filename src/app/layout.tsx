import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranay Patel | Full Stack Developer",
  description:
    "Pranay Patel – Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable, responsive, and user-friendly web applications.",
  keywords: [
    "Pranay Patel",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Pranay Patel" }],
  openGraph: {
    title: "Pranay Patel | Full Stack Developer",
    description:
      "Building scalable, responsive and user-friendly web applications that solve real-world problems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranay Patel | Full Stack Developer",
    description:
      "Building scalable, responsive and user-friendly web applications that solve real-world problems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
