import { logoutAdmin } from "@/actions/admin-token";

export const LogoutButton = () => {
  return (
    <button
      className="btn"
      onClick={logoutAdmin}
    >
      Logout
    </button>
  );
};
