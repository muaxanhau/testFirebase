import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {config} from 'config';
import {AuthStorageModel, StorageEnum} from 'models';
import {utils, storageUtil, devTools} from 'utils';

const clientService = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleRequest = (requestConfig: InternalAxiosRequestConfig) => {
  const auth = storageUtil.retrieve<AuthStorageModel>(StorageEnum.AUTH);
  requestConfig.headers['Authorization'] = `${config.tokenType} ${auth?.token}`;

  const {method, baseURL, url} = requestConfig;
  utils.log(
    method + ' - ' + baseURL + url,
    "call from 'client.service.ts'",
    'warning',
  );

  return requestConfig;
};
const handleResponse = (response: AxiosResponse) => {
  const {
    data,
    config: {method, url},
  } = response;

  devTools.logResponse(data, method, url);

  return Promise.resolve(utils.keysToCamel(data));
};
const handleError = (e: AxiosError) => {
  return Promise.reject(e.response?.data);
};

clientService.interceptors.request.use(handleRequest, handleError);
clientService.interceptors.response.use(handleResponse, handleError);

export {clientService};
