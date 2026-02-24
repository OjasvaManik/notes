import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import React from "react";
import { ApolloWrapper } from "@/providers/apollo-client";

const outfit = Outfit( { subsets: [ 'latin' ], variable: '--font-sans' } );

export const metadata: Metadata = {
  title: "Notes App",
  description: "Write notes and organize them in tags.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout( {
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={ cn( 'antialiased bg-background dark:bg-background-dark', outfit.className ) }
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ApolloWrapper>
        <TooltipProvider>
          { children }
          <Toaster/>
        </TooltipProvider>
      </ApolloWrapper>
    </ThemeProvider>
    </body>
    </html>
  );
}
