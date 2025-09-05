import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { useUserDetailsStore, UserState } from "@/store/user-details-store";
import { login } from "@/services/auth.service";
import { Auth, SuccessResponse } from "@/types/auth";
import { toAPIError } from "@/services/api";

export function useLogin() {
  const router = useRouter();
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
      router.replace("/dashboard");
    },
  });

  const setUser = useUserDetailsStore((state) => state.setUser);

  function handlePostLogin(user: UserState, token: string) {
    setUser(user);

    //store the token and user in cookie
    const expiresDate = new Date(user.expires_at);
    const daysUntilExpiry = Math.ceil((expiresDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    Cookies.set("token", token, { expires: daysUntilExpiry, path: "/" });
    Cookies.set("user", JSON.stringify(user), { expires: daysUntilExpiry, path: "/" });
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
