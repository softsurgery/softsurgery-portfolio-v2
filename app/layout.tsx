import "./globals.css";
import { Inter } from "next/font/google";
import { Application } from "@/components/common/Application";

export const metadata = {
  metadataBase: new URL("https://softsurgery-portfolio-v2.vercel.app"),
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
        <Application>{children}</Application>
      </body>
    </html>
  );
}
