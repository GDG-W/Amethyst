import { useUserDetailsStore } from "@/store/user-details-store";

export function useGetuser() {
  const user = useUserDetailsStore((state) => state.user);
  return user;
}
