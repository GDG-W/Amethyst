import { AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { isPlainObject } from "@/lib/utils";

type ErrorResponse = {
  message: string;
  errors?: {
    [key: string]: string;
  };
};

const isErrorResponse = (data: unknown): data is ErrorResponse => {
  return isPlainObject(data) && "message" in data;
};

type BaseResponse<T> =
  | { data: T; success: true }
  | ({ code?: number; success: false } & ErrorResponse);

class API {
  private static _handleResponse<T>(
    response: AxiosResponse<T | ErrorResponse> | undefined,
  ): BaseResponse<T> {
    if (!response) return { success: false, message: "Unknown error" };

    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data as T };
    }

    if (isErrorResponse(response.data)) {
      return {
        success: false,
        code: response.status,
        errors: response.data.errors,
        message: response.data.message,
      };
    }

    return {
      success: false,
      code: response.status,
      message: `An unexpected ${response.status} error occurred.`,
    };
  }

  static post = async <D, T>(endpoint: string, data: D): Promise<BaseResponse<T>> => {
    const response = await axiosInstance.post<
      T | ErrorResponse,
      AxiosResponse<T | ErrorResponse>,
      D
    >(endpoint, data);
    return this._handleResponse(response);
  };

  static get = async <T>(endpoint: string): Promise<BaseResponse<T>> => {
    const response = await axiosInstance.get<T | ErrorResponse, AxiosResponse<T | ErrorResponse>>(
      endpoint,
    );
    return this._handleResponse(response);
  };
}

export default API;
