import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import {
  ClerkProvider
} from '@clerk/nextjs'


const inter = Inter({subsets:["latin"]})

export const metadata: Metadata = {
  title: "Paisa",
  description: "Money management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Header>
          
        </Header>
        <main className="min-h-screen">
        {children}
        </main>
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center">
          Made by ShivaMarath
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
    
  );
}
