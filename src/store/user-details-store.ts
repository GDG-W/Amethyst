import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UserDetailsState = Record<string, string>;

export type UserState = {
  user: UserDetailsState;
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
  user: {},
};

export const useUserDetailsStore = create<UserDetailsStore>()(
  devtools(
    persist(
      (set) => ({
        user: initialUserState,

        setUser: (user) => set({ user }, false, "setUser"),
        logOut: () => set({ user: initialUserState }, false, "logOut"),
      }),
      {
        name: "user-details-store",
      }
    )
  )
);
