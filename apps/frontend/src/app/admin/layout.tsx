import { ReactNode } from "react";
import { Metadata } from "next";

import { getAdminToken } from "../../actions/admin-token";

import { SingInForm } from "@/app/admin/components/sing-in-form/SingInForm";

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
    return <SingInForm />;
  }

  return children;
}
