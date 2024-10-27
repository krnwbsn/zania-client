import UrlPattern from 'url-pattern';
import type { AxiosRequestConfig, Method } from 'axios';

import { axiosInstance } from './apiServicesInstanceAndInterceptors';

import { baseURL } from 'constants/url';

interface ServiceConfigInstanceRequestInterface
  extends Pick<AxiosRequestConfig, 'data' | 'params'> {
  url: Exclude<AxiosRequestConfig['url'], undefined>;
  urlParams?: Record<string, unknown>;
  servicePath?: string;
  contentType?: 'application/json' | 'multipart/form-data';
  config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'data' | 'method'>;
}

const urlAndParamsGenerator = (
  url: ServiceConfigInstanceRequestInterface['url'],
  urlParams: ServiceConfigInstanceRequestInterface['urlParams'] = {}
) => new UrlPattern(url).stringify({ ...urlParams });

const services = <
  ArgsType extends ServiceConfigInstanceRequestInterface,
  Response
>(
  args: ArgsType,
  type: Extract<Method, 'PUT' | 'PATCH' | 'GET' | 'POST' | 'DELETE'>
) => {
  const {
    url: urlValue,
    data,
    params,
    urlParams,
    contentType = 'application/json',
    config,
  } = args;

  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': contentType,
  };

  const url = `/v1/${urlValue}`;

  const configCall = {
    params,
    headers,
    baseURL,
    retry: 1,
    retryDelay: 1000,
    ...config,
  };

  const serviceMethod = {
    GET: () =>
      axiosInstance.get<Response>(
        urlAndParamsGenerator(url, urlParams),
        configCall
      ),
    POST: () =>
      axiosInstance.post<Response>(
        urlAndParamsGenerator(url, urlParams),
        data,
        configCall
      ),
    PUT: () =>
      axiosInstance.put<Response>(
        urlAndParamsGenerator(url, urlParams),
        data,
        configCall
      ),
    PATCH: () =>
      axiosInstance.patch<Response>(
        urlAndParamsGenerator(url, urlParams),
        data,
        configCall
      ),
    DELETE: () =>
      axiosInstance.delete<Response>(
        urlAndParamsGenerator(url, urlParams),
        configCall
      ),
  };

  return serviceMethod[type]();
};

export const Get = <Response>(
  args: Omit<ServiceConfigInstanceRequestInterface, 'data' | 'contentType'>
) => services<typeof args, Response>(args, 'GET');

export const Post = <Response>(args: ServiceConfigInstanceRequestInterface) =>
  services<typeof args, Response>(args, 'POST');

export const Patch = <Response>(args: ServiceConfigInstanceRequestInterface) =>
  services<typeof args, Response>(args, 'PATCH');

export const Put = <Response>(args: ServiceConfigInstanceRequestInterface) =>
  services<typeof args, Response>(args, 'PUT');

export const Delete = <Response>(
  args: Omit<ServiceConfigInstanceRequestInterface, 'data' | 'contentType'>
) => services<typeof args, Response>(args, 'DELETE');
