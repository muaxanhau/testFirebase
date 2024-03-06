import {DevToolConfigModel, EnvironmentsConfigModel} from 'models';

const environments: EnvironmentsConfigModel = {
  DEVELOPMENT: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'https://reqres.in/',
    tokenType: 'Bearer',
  },
  STAGING: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'https://reqres.in/',
    tokenType: 'Bearer',
  },
  PRODUCTION: {
    enableLog: false,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'https://reqres.in/',
    tokenType: 'Bearer',
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
  enable: false,
  method: 'ALL',
  url: null,
  delayFetching: 3000,
};
