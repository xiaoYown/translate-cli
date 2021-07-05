import fetch from './utils/fetch';

export async function getConfig () {
  return fetch.get('/config/get');
}
