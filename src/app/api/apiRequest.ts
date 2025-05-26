import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axios";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function apiRequest<T>(
  path: string,
  method: ApiMethod,
  body?: any,
  config?: AxiosRequestConfig & { skipAuth?: boolean },
): Promise<AxiosResponse<T>> {
  const res = await axiosInstance.request<T>({
    url: path,
    method,
    data: body,
    ...config,
  });
  return res;
}
