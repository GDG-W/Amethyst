import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type UserState = {
  user_id: string;
  created_at: Date;
  expires_at: Date;
};

type UserDetailsStore = {
  user: UserState;
  setUser: (user: UserState) => void;
  logOut: () => void;
};

const initialUserState: UserState = {
  created_at: new Date(),
  expires_at: new Date(),
  user_id: "",
};

export const useUserDetailsStore = create<UserDetailsStore>()(
  devtools(
    (set) => ({
      user: initialUserState,

      setUser: (user) => set({ user }, false, "setUser"),
      logOut: () => set({ user: initialUserState }, false, "logOut"),
    }),
    {
      name: "user-details-store",
    }
  )
);
