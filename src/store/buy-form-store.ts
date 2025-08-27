import { create } from "zustand";

import { devtools } from "zustand/middleware";

import { AttendeeInfo, BuyerInfo, OrderItem } from "@/app/(dashboard)/buy/client";

import { TicketType } from "@/types/ticket";

interface TicketState {
  orderItems: OrderItem[];
  selectedByType: Record<TicketType, string[]>;
  quantities: Record<string, number>;
  activeTicketType: TicketType;
}

interface BuyerState {
  buyerInfo: BuyerInfo | null;
  buyerErrors: Partial<Record<keyof BuyerInfo, string>>;
}

interface ProfileState {
  profileInfo: {
    gender: string;
    role: string;
    experienceLevel: string;
  } | null;
  profileErrors: Partial<Record<"gender" | "role" | "experienceLevel", string>>;
}

interface AttendeeState {
  attendeeInfo: AttendeeInfo | null;
  attendeeErrors: Partial<Record<string, string>>;
}

interface TicketActions {
  setOrderItems: (items: OrderItem[]) => void;
  setSelectedByType: (type: TicketType, dates: string[]) => void;
  setQuantities: (quantities: Record<string, number>) => void;
  updateTicketQuantity: (ticketId: string, quantity: number) => void;
  setActiveTicketType: (type: TicketType) => void;
  resetTicketState: () => void;
}

interface BuyerActions {
  setBuyerInfo: (info: BuyerInfo) => void;
  updateBuyerField: <K extends keyof BuyerInfo>(field: K, value: BuyerInfo[K]) => void;
  setBuyerError: (field: keyof BuyerInfo, error: string | null) => void;
  resetBuyerState: () => void;
}

interface ProfileActions {
  setProfileInfo: (info: { gender: string; role: string; experienceLevel: string }) => void;
  updateProfileField: (field: "gender" | "role" | "experienceLevel", value: string) => void;
  setProfileError: (field: "gender" | "role" | "experienceLevel", error: string | null) => void;
  resetProfileState: () => void;
}

interface AttendeeActions {
  setAttendeeInfo: (info: AttendeeInfo) => void;
  updateAttendeeEmails: (dateId: string, emails: string[]) => void;
  setAttendeeError: (field: string, error: string | null) => void;
  resetAttendeeState: () => void;
}

type BuyFormStore = TicketState &
  BuyerState &
  ProfileState &
  AttendeeState &
  TicketActions &
  BuyerActions &
  ProfileActions &
  AttendeeActions;

const initialTicketState: TicketState = {
  orderItems: [],
  selectedByType: { standard: [], pro: [] },
  quantities: {},
  activeTicketType: "standard",
};

const initialBuyerState: BuyerState = {
  buyerInfo: null,
  buyerErrors: {},
};

const initialProfileState: ProfileState = {
  profileInfo: null,
  profileErrors: {},
};

const initialAttendeeState: AttendeeState = {
  attendeeInfo: null,
  attendeeErrors: {},
};

export const useBuyFormStore = create<BuyFormStore>()(
  devtools(
    (set, get) => ({
      ...initialTicketState,
      ...initialBuyerState,
      ...initialProfileState,
      ...initialAttendeeState,

      setOrderItems: (items) => set({ orderItems: items }, false, "setOrderItems"),

      setSelectedByType: (type, dates) =>
        set(
          (state) => ({
            selectedByType: {
              ...state.selectedByType,
              [type]: dates,
            },
          }),
          false,
          "setSelectedByType"
        ),

      setQuantities: (quantities) => set({ quantities }, false, "setQuantities"),

      updateTicketQuantity: (ticketId, quantity) =>
        set(
          (state) => ({
            quantities: {
              ...state.quantities,
              [ticketId]: quantity,
            },
          }),
          false,
          "updateTicketQuantity"
        ),

      setActiveTicketType: (type) => set({ activeTicketType: type }, false, "setActiveTicketType"),

      resetTicketState: () => set(initialTicketState, false, "resetTicketState"),

      setBuyerInfo: (info) => set({ buyerInfo: info }, false, "setBuyerInfo"),

      updateBuyerField: (field, value) =>
        set(
          (state) => ({
            buyerInfo: state.buyerInfo
              ? { ...state.buyerInfo, [field]: value }
              : ({ fullName: "", email: "", belongsToMe: false, [field]: value } as BuyerInfo),
          }),
          false,
          "updateBuyerField"
        ),

      setBuyerError: (field, error) =>
        set(
          (state) => ({
            buyerErrors: error
              ? { ...state.buyerErrors, [field]: error }
              : Object.fromEntries(
                  Object.entries(state.buyerErrors).filter(([key]) => key !== field)
                ),
          }),
          false,
          "setBuyerError"
        ),

      resetBuyerState: () => set(initialBuyerState, false, "resetBuyerState"),

      setProfileInfo: (info) => set({ profileInfo: info }, false, "setProfileInfo"),

      updateProfileField: (field, value) =>
        set(
          (state) => ({
            profileInfo: state.profileInfo
              ? { ...state.profileInfo, [field]: value }
              : { gender: "", role: "", experienceLevel: "", [field]: value },
          }),
          false,
          "updateProfileField"
        ),

      setProfileError: (field, error) =>
        set(
          (state) => ({
            profileErrors: error
              ? { ...state.profileErrors, [field]: error }
              : Object.fromEntries(
                  Object.entries(state.profileErrors).filter(([key]) => key !== field)
                ),
          }),
          false,
          "setProfileError"
        ),

      resetProfileState: () => set(initialProfileState, false, "resetProfileState"),

      setAttendeeInfo: (info) => set({ attendeeInfo: info }, false, "setAttendeeInfo"),

      updateAttendeeEmails: (dateId, emails) =>
        set(
          (state) => ({
            attendeeInfo: state.attendeeInfo
              ? {
                  ...state.attendeeInfo,
                  emailsByDate: {
                    ...state.attendeeInfo.emailsByDate,
                    [dateId]: emails,
                  },
                }
              : { emailsByDate: { [dateId]: emails } },
          }),
          false,
          "updateAttendeeEmails"
        ),

      setAttendeeError: (field, error) =>
        set(
          (state) => ({
            attendeeErrors: error
              ? { ...state.attendeeErrors, [field]: error }
              : Object.fromEntries(
                  Object.entries(state.attendeeErrors).filter(([key]) => key !== field)
                ),
          }),
          false,
          "setAttendeeError"
        ),

      resetAttendeeState: () => set(initialAttendeeState, false, "resetAttendeeState"),
    }),
    {
      name: "buy-form-store",
    }
  )
);
