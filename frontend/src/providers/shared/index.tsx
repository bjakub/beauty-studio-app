import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { theme } from "@/config/theme";

interface SharedProvidersProps {
  children: ReactNode;
}

export const SharedProviders = ({ children }: SharedProvidersProps) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </AppRouterCacheProvider>
);
