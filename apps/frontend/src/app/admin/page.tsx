import { Container } from "@/app/admin/Admin.styled";
import { TEXTS } from "@/app/admin/Admin.texts";
import { LogoutButton } from "@/app/admin/components/logout-button/LogoutButton";

export default function AdminPage() {
  return (
    <Container>
      <h1>{TEXTS.HEADING}</h1>
      <LogoutButton />
    </Container>
  );
}

// TODO: Zacznij budować widok admina
