"use client";

import { useActionState } from "react";

import { signIn } from "@/actions/auth";
import { TEXTS } from "@/app/admin/Admin.texts";
import { Alert } from "@/components/alert";
import { Button } from "@/components/forms/button";
import { TextField } from "@/components/forms/text-field";
import { SignInHandler } from "@/types/app/admin";

export const SignInForm = () => {
  const [state, action, isLoading] = useActionState<SignInHandler, FormData>(signIn, { success: false });

  return (
    <form
      action={action}
      className="flex flex-col justify-center items-center h-screen"
    >
      <div className="p-8 flex flex-col gap-y-4 w-1/4 min-w-80 justify-center items-center border-2 border-secondary">
        <TextField
          label={TEXTS.USERNAME_LABEL}
          placeholder={TEXTS.USERNAME_PLACEHOLDER}
          defaultValue={state.defaultValues?.username}
          name="username"
          error={state.errors?.username}
        />

        <TextField
          label={TEXTS.PASSWORD_LABEL}
          placeholder={TEXTS.PASSWORD_PLACEHOLDER}
          defaultValue={state.defaultValues?.password}
          name="password"
          type="password"
          error={state.errors?.password}
        />

        <Button
          type="submit"
          text={TEXTS.BUTTON_LABEL}
          isLoading={isLoading}
        />

        {state.message && (
          <Alert
            severity={state.success ? "success" : "error"}
            text={state.message}
          />
        )}
      </div>
    </form>
  );
};

// TODO: Zacznij robić widoki dla admina
