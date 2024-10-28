"use client";

import { usePathname } from "next/navigation";
import AdminLayout from "../layout/admin/layout";
import PublicLayout from "../layout/public/layout";

interface ApplicationProps {
  className?: string;
  children: React.ReactNode;
}

export const Application = ({ className, children }: ApplicationProps) => {
  const pathname = usePathname();
  if (pathname?.includes("admin")) return <AdminLayout>{children}</AdminLayout>;
  else return <PublicLayout>{children}</PublicLayout>;
};
