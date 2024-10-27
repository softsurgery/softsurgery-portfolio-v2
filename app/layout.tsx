import Layout from "@/components/layout/admin/layout";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  metadataBase: new URL("https://postgres-drizzle.vercel.app"),
  title: "Softsurgery Portfolio",
  description: "",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
