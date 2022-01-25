import { AxiosRequestConfig, AxiosStatic } from 'axios';

interface NuxtAxiosInstance extends AxiosStatic {
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export const getDailyWord = ($axios: NuxtAxiosInstance) =>
  $axios.$get<string>('/daily');

export const checkWordIsValid = ($axios: NuxtAxiosInstance, word: string) =>
  $axios.$get<string>('/check', { params: { input: word } });
