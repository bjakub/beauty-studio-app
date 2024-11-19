import { ReactNode } from "react";
import { Metadata } from "next";

import { SingInForm } from "@/app/admin/components/SingInForm";
import { getSession } from "@/app/lib/session";

export const metadata: Metadata = {
  title: "Panel pracownika",
  description: "Miejsce w którym pracownik może zarządzać swoimi zadaniami",
};

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  // TODO: Tutaj trzeba zrobić obsługę sesji tzn. sprawdzić czy użytkownik jest zalogowany wyświelamy panel admina jak nie to wyświetlamy formularz logowania
  // TODO: Trzeba będzie pokombinować tez w getSession, zeby to ładnie działało razem z refresh token
  // TODO: Children to page.tsx

  const session = await getSession();

  console.log("session");
  console.log(session);

  return <SingInForm />;
};

export default AdminLayout;
