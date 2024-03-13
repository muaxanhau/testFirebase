import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import {config} from 'config';
import {ErrorResponseBaseModel, SuccessResponseBaseModel} from 'models';
import {useAuthStore} from 'stores';
import {utils} from 'utils';

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleRequest = (requestConfig: InternalAxiosRequestConfig) => {
  const {token} = useAuthStore.getState();
  requestConfig.headers['firebase-token'] = token;
  return requestConfig;
};
const handleResponse = (response: AxiosResponse) => {
  const {data, config} = response;
  const {method, baseURL, url, headers, params, data: body} = config;

  utils.logResponse(
    'success',
    method?.toUpperCase() || 'GET',
    `${baseURL}${url}`,
    headers,
    params,
    body,
    data,
  );

  return Promise.resolve(response);
};
const handleError = (e: AxiosError<ErrorResponseBaseModel>) => {
  const {config, response} = e;
  const {method, baseURL, url, headers, params, data: body} = config!;
  const message = response?.data.message.join('. ');

  utils.logResponse(
    'error',
    method?.toUpperCase() || 'GET',
    `${baseURL}${url}`,
    headers,
    params,
    body,
    message || e.message,
  );

  return Promise.reject(message);
};

axiosClient.interceptors.request.use(handleRequest, handleError);
axiosClient.interceptors.response.use(handleResponse, handleError);

export const service = {
  get: <Output>(url: string, config?: AxiosRequestConfig) =>
    axiosClient.get<SuccessResponseBaseModel<Output>>(url, config),
  post: <Output, Input>(
    url: string,
    data: Input,
    config?: AxiosRequestConfig,
  ) =>
    axiosClient.post<
      SuccessResponseBaseModel<Output>,
      AxiosResponse<SuccessResponseBaseModel<Output>>,
      Input
    >(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) =>
    axiosClient.delete(url, config),
  put: <Output, Input>(url: string, data: Input, config?: AxiosRequestConfig) =>
    axiosClient.put<
      SuccessResponseBaseModel<Output>,
      AxiosResponse<SuccessResponseBaseModel<Output>>,
      Input
    >(url, data, config),
};
