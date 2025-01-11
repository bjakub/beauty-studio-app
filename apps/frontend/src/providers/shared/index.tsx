import { ReactNode } from "react";

interface SharedProvidersProps {
  children: ReactNode;
}

export const SharedProviders = ({ children }: SharedProvidersProps) => <>{children}</>;
