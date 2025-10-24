import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query.provider";
import { LanguageProvider } from "@/providers/language.provider";
import { Toaster } from "sonner";
import { TranslationButton } from "@/components/ui/TranslationButton.component";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dormitory Management System",
  description: "A comprehensive dormitory management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <QueryProvider>
            {children}
            <TranslationButton variant="floating" />
            <Toaster position="top-right" />
          </QueryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}