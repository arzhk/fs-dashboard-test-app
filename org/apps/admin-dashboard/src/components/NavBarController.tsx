"use client";
import { Login, Dashboard, Logout } from "@mui/icons-material";
import { useAuthStore } from "../lib/hooks/useAuthStore";
import { NavBar } from "@org/shared-ui";
import { useRouter } from "next/navigation";

function NavBarController() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();

  const authenticatedLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <Dashboard /> },
    {
      path: "#",
      label: "Logout",
      onClick: () => {
        logout();
        router.push("/login");
      },
      icon: <Logout />,
    },
  ];

  const unauthenticatedLinks = [
    { path: "/login", label: "Login", icon: <Login /> },
    { path: "/register", label: "Register", icon: <Login /> },
  ];

  return <NavBar links={isAuthenticated ? authenticatedLinks : unauthenticatedLinks} />;
}

export default NavBarController;
