import { ReactNode } from "react";
import { Metadata } from "next";

import { SingInForm } from "@/app/admin/components/sing-in-form/SingInForm";
import { getSession } from "@/app/lib/session";

export const metadata: Metadata = {
  title: "Panel pracownika",
  description: "Miejsce w którym pracownik może zarządzać swoimi zadaniami",
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getSession();

  if (!session) {
    return <SingInForm />;
  }

  return children;
}
