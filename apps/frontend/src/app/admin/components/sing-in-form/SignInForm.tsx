"use client";

import { useActionState } from "react";

import { signIn } from "@/actions/auth";
import { TEXTS } from "@/app/admin/Admin.texts";
import { Button } from "@/components/forms/button";
import { TextField } from "@/components/forms/text-field";
import { Toast } from "@/components/toast";
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
          text={TEXTS.BUTTON_LABEL}
          isLoading={isLoading}
        />
      </div>

      {state.message && (
        <Toast
          key={isLoading + JSON.stringify(state)}
          severity={state.success ? "success" : "error"}
          text={state.message}
        />
      )}
    </form>
  );
};

// TODO Spróbuj powalczyć z tym tostem jeszcze, ale bez przesady
// TODO: Zacznin robić widoki dla admina
