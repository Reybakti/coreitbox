import "./globals.css";

import type {
  Metadata,
} from "next";

import {
  Toaster,
} from "sonner";

import QueryProvider
from "@/providers/query-provider";

import { ThemeProvider }
from "@/providers/theme-provider";

import { AuthProvider }
from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "CoreITBox",
  description:
    "IT Service Management Platform",
    manifest: "/manifest.webmanifest",
};
import {
  RegisterSW,
} from "@/components/pwa/register-sw";

import {
  OfflineBanner,
} from "@/components/pwa/offline-banner";
import {
  BackgroundSync,
} from "@/components/pwa/background-sync";

import {
  NotificationPermission,
} from "@/components/notifications/notification-permission";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <RegisterSW />
                <NotificationPermission />
              <BackgroundSync />
                <OfflineBanner />
              {children}

              <Toaster
                richColors
                expand
                position="top-right"
                duration={5000}
                closeButton
              />
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}