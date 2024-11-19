"use client";

import { useActionState } from "react";
import { Button, TextField } from "@mui/material";

import { Container } from "@/app/admin/Admin.styled";
import { TEXTS } from "@/app/admin/Admin.texts";
import { signIn } from "@/app/lib/auth";

export const SingInForm = () => {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <form action={action}>
      <Container>
        {state && <div>ERROR</div>}

        <TextField
          name="username"
          label={TEXTS.USERNAME_LABEL}
          fullWidth
        />

        <TextField
          name="password"
          label={TEXTS.PASSWORD_LABEL}
          fullWidth
          type="password"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
        >
          {TEXTS.BUTTON_LABEL}
        </Button>
      </Container>
    </form>
  );
};
