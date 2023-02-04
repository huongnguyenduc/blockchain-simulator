import { HttpStatusCode } from "lib/constants/http-status-code";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

/* ---------------------------------------------------------------------------------------------------------------------
 * Utils
 * ------------------------------------------------------------------------------------------------------------------ */

/**
 * Custom Error class for fetcher
 */
export class FetchError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/**
 * Fetcher data from a URL with default options
 */

export const fetcher = (input: string, init?: RequestInit, isProxy = false) => {
  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    // If the status is 204 or is a proxy request, we don't need to parse the response
    if (
      isProxy ||
      [HttpStatusCode.NoContent, HttpStatusCode.ServiceUnavailable].includes(
        res.status
      )
    ) {
      return res;
    }

    const results = res.json();

    // Throw error if status code is not 2xx
    // if (!res.ok) {
    //   throw new FetchError(
    //     (await results)?.message || res.statusText,
    //     res.status
    //   );
    // }

    return results;
  });
};

/**
 * Add query params to a URL
 * @param url
 * @param query
 */
const addQuery = (
  url: string,
  query?: Partial<{ [key: string]: string | string[] | number | number[] }>
) => {
  if (!query) {
    return url;
  }

  const queryString = Object.entries(query)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }

      return `${key}=${value}`;
    })
    .join("&");

  if (queryString) {
    return `${url}?${queryString}`;
  }

  return url;
};

const addParams = (
  url: string,
  params?: Partial<{ [key: string]: string | number }>
) => {
  if (!params) {
    return url;
  }

  // Remove empty params
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
    url
  );
};

export type EndpointInit = {
  ip?: string;
  port?: number;
  params?: Partial<{ [key: string]: string | number }>;
  query?: Partial<{ [key: string]: string | string[] | number | number[] }>;
};

/**
 * Get the api url
 * @param path
 * @param initial
 */
export const getEndpoint = (path: string, initial: EndpointInit = {}) => {
  const { params, query, ip, port } = initial;

  const url = `http://${ip ?? publicRuntimeConfig.BOOTSTRAP_IP}:${
    port ?? publicRuntimeConfig.BOOTSTRAP_PORT
  }${path}`;

  return addQuery(addParams(url, params), query);
};
