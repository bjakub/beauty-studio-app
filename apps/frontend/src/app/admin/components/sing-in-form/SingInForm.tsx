"use client";

import { useActionState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { SignInHandler } from "@repo/types/modules";

import { Container } from "@/app/admin/Admin.styled";
import { TEXTS } from "@/app/admin/Admin.texts";
import { signIn } from "@/app/lib/auth";

export const SingInForm = () => {
  const [state, action] = useActionState<SignInHandler, FormData>(signIn, { success: false });

  return (
    <form action={action}>
      <Container>
        <TextField
          label={TEXTS.USERNAME_LABEL}
          fullWidth
          name="username"
          error={!!state.errors?.username}
          helperText={state.errors?.username}
          defaultValue={state.defaultValues?.username}
        />

        <TextField
          label={TEXTS.PASSWORD_LABEL}
          fullWidth
          name="password"
          type="password"
          error={!!state.errors?.password}
          helperText={state.errors?.password}
          defaultValue={state.defaultValues?.password}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
        >
          {TEXTS.BUTTON_LABEL}
        </Button>

        {state.message && <Alert severity={state.success ? "success" : "error"}>{state.message}</Alert>}
      </Container>
    </form>
  );
};
