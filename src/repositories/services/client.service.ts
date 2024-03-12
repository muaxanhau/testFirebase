import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {config} from 'config';
import {useAuthStore} from 'stores';
import {utils} from 'utils';

const clientService = axios.create({
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
const handleError = (e: AxiosError) => {
  const {config} = e;
  const {method, baseURL, url, headers, params, data: body} = config!;

  utils.logResponse(
    'error',
    method?.toUpperCase() || 'GET',
    `${baseURL}${url}`,
    headers,
    params,
    body,
    e.message,
  );

  return Promise.reject(e.response?.data);
};

clientService.interceptors.request.use(handleRequest, handleError);
clientService.interceptors.response.use(handleResponse, handleError);

export {clientService};
