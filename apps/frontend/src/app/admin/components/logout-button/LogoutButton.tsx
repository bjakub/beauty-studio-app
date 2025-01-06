import { Button } from "@mui/material";

import { logoutAdmin } from "../../../../actions/admin-token";

export const LogoutButton = () => {
  return <Button onClick={logoutAdmin}>Logout</Button>;
};
