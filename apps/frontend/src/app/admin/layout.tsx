import { ReactNode } from "react";
import { Metadata } from "next";

import { getAdminToken } from "@/actions/admin-token";
import { SignInForm } from "@/app/admin/components/sing-in-form/SignInForm";

export const metadata: Metadata = {
  title: "Panel pracownika",
  description: "Miejsce w którym pracownik może zarządzać swoimi zadaniami",
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const token = await getAdminToken();

  if (!token) {
    return <SignInForm />;
  }

  return children;
}
