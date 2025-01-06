import { ZodError } from "zod";

export const mapZodErrorsToClient = (zodError: ZodError): Record<string, string> =>
  zodError.errors.reduce<Record<string, string>>(
    (acc, error) => ({
      ...acc,
      [error.path[0]]: error.message,
    }),
    {},
  );
