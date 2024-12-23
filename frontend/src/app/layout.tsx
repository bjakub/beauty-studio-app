import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Metadata } from "next";

import { SharedProviders } from "@/providers/shared";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <CssBaseline />

    <body>
      <SharedProviders>{children}</SharedProviders>
    </body>
  </html>
);

export default RootLayout;
