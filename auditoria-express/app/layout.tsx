import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auditoria Express - Balance Express",
  description: "Conoce la salud financiera real de tu negocio en 5 minutos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
