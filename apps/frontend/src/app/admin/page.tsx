import { TEXTS } from "@/app/admin/Admin.texts";
import { LogoutButton } from "@/app/admin/components/logout-button/LogoutButton";

export default function AdminPage() {
  return (
    <div>
      <h1>{TEXTS.HEADING}</h1>

      <LogoutButton />
    </div>
  );
}

// TODO: Zacznij budować widok admina
