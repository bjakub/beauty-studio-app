import { Button } from "@mui/material";

import { logout } from "@/app/lib/session";

export const LogoutButton = () => {
  return <Button onClick={logout}>Logout</Button>;
};
