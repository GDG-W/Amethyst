// Domain-specific API functions

import { Auth } from "@/types/auth";

import API from "./api";

const login = async (body: Auth) => {
  return API.post(`/sessions`, body);
};

export { login };
