import Cookies from "js-cookie";

import { UserState, useUserDetailsStore } from "@/store/user-details-store";

export function useGetuser() {
  const user = useUserDetailsStore((state) => state.user);
  return user;
}

export function useLogin() {
  const setUser = useUserDetailsStore((state) => state.setUser);

  function handleLogin(user: UserState, token: string) {
    setUser(user);

    //store the token and user in cookie
    const expiresDate = new Date(user.expires_at);
    const daysUntilExpiry = Math.ceil((expiresDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    Cookies.set("token", token, { expires: daysUntilExpiry, path: "/" });
    Cookies.set("user", JSON.stringify(user), { expires: daysUntilExpiry, path: "/" });
  }
  return handleLogin;
}

export function useLogout() {
  const logOut = useUserDetailsStore((state) => state.logOut);

  function handleLogout() {
    // clear cookies and storage
    Cookies.remove("token");
    Cookies.remove("user");
    logOut();
    localStorage.clear();
    window.location.href = "/";
  }

  return handleLogout;
}
