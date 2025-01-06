"use client";

import { useActionState } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, TextField } from "@mui/material";

import { signIn } from "../../../../actions/auth";

import { Container } from "@/app/admin/Admin.styled";
import { TEXTS } from "@/app/admin/Admin.texts";
import { SignInHandler } from "@/types/app/admin";

export const SingInForm = () => {
  const [state, action, isLoading] = useActionState<SignInHandler, FormData>(signIn, { success: false });

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

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading}
          fullWidth
        >
          {TEXTS.BUTTON_LABEL}
        </LoadingButton>

        {state.message && <Alert severity={state.success ? "success" : "error"}>{state.message}</Alert>}
      </Container>
    </form>
  );
};
