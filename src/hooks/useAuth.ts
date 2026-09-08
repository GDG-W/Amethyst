import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserDetailsStore, UserState } from "@/store/user-details-store";
import { login } from "@/services/auth.service";
import { Auth, SuccessResponse } from "@/types/auth";
import { toAPIError } from "@/services/api";

export function useLogin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: Auth) => {
      const res = await login(payload);
      if (!res.success) {
        throw toAPIError(res);
      }
      return res;
    },
    mutationKey: ["auth"],
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      const response = res as SuccessResponse;
      const data = response?.data;
      const { id, ...userData } = data;
      handlePostLogin(userData, id);
    },
  });

  const setUser = useUserDetailsStore((state) => state.setUser);

  function handlePostLogin(user: UserState, token: string) {
    setUser(user);

    // Derive the session lifetime from the two server timestamps rather than from
    // `expires_at` vs. the local clock: the browser evaluates `expires` against the
    // device clock, so a device running fast makes the cookie land in the past and
    // the browser drops it silently, leaving the user bounced back to /login.
    // Anchoring the server-provided duration to the local clock keeps it skew-proof.
    const createdAt = new Date(user.created_at).getTime();
    const expiresAt = new Date(user.expires_at).getTime();
    const sessionLifetimeMs = expiresAt - createdAt;

    // Fall back to a session cookie if the timestamps are missing or nonsensical —
    // a cookie that dies with the tab still beats no cookie at all.
    const expires =
      Number.isFinite(sessionLifetimeMs) && sessionLifetimeMs > 0
        ? new Date(Date.now() + sessionLifetimeMs)
        : undefined;

    Cookies.set("token", token, { expires, path: "/" });
    Cookies.set("user", JSON.stringify(user), { expires, path: "/" });
  }

  return mutation;
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
