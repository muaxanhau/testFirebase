import {DevToolConfigModel, EnvironmentsConfigModel} from 'models';

const environments: EnvironmentsConfigModel = {
  DEVELOPMENT: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'http://localhost:3000/v1/api/',
    staleTime: 1000 * 15,
  },
  STAGING: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'https://reqres.in/',
    staleTime: 1000 * 15,
  },
  PRODUCTION: {
    enableLog: false,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'https://reqres.in/',
    staleTime: 1000 * 15,
  },
};

/**
 * *******************************
 * *** change environment here ***
 * *******************************
 */
export const config = environments.DEVELOPMENT;

/**
 * debug log for response api
 */
export const devToolConfig: DevToolConfigModel = {
  delayFetching: 0, // delay fetch data from server
};
