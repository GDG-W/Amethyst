import Cookies from "js-cookie";

import { UserState, useUserDetailsStore } from "@/store/user-details-store";

export function useGetuser() {
  const user = useUserDetailsStore((state) => state.user);
  return user;
}

export function useLogin(user: UserState, token: string) {
  const setUser = useUserDetailsStore((state) => state.setUser);

  function handleLogin() {
    setUser(user);

    //store the token and user in cookie
    Cookies.set("token", token, { expires: user.expires_at });
    Cookies.set("user", JSON.stringify(user), { expires: user.expires_at });
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
