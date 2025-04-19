// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TRPCProvider } from "@/lib/trpc/provider";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Tutorías Universitarias - Servicios Académicos",
    template: "%s | Tutorías Universitarias",
  },
  description:
    "Servicios de tutoría experta para estudiantes universitarios de República Dominicana, España y Latinoamérica.",
  keywords: [
    "tutorías",
    "académico",
    "universidad",
    "República Dominicana",
    "España",
    "turnitin",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <TRPCProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
