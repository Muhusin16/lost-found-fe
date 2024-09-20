import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearLocalStorage, getJsonValueFromLocalStorage } from "@/app/services/coreServices";
import { GetUIcookie, DeleteAllCookies } from "../services/authServices";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const withMemberAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const userRole = useSelector((state: RootState) => state.role.role)
    const [isClient, setIsClient] = useState(false);
    const token = isClient
      ? getJsonValueFromLocalStorage("token")
      : null;
    const role = isClient ? userRole : null;
    const isAuthenticated = isClient ? checkAuthentication() : false;

    useEffect(() => {
      setIsClient(true); // This will re-trigger rendering once client-side
    }, []);

    useEffect(() => {
      if (isClient && (!isAuthenticated || !token || role !== 'user')) {
        clearLocalStorage();
        DeleteAllCookies();
        router.push("/login");
      }
    }, [isClient, isAuthenticated, token, router, role]);

    if (!isClient || !isAuthenticated || !token || role !== 'user') {
      return null; // Render nothing or a spinner while waiting for auth check
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};
const checkAuthentication = () => {
  let isAuthenticated = GetUIcookie("isAuthenticated"); // We need to check this once loaded.

  console.log("on the server", isAuthenticated);
  const checkAuth = isAuthenticated === "true";

  return checkAuth;
};

export default withMemberAuth;
