import fetch from './utils/fetch';

export async function getConfig () {
  return fetch.get('/config/get');
}

export async function getFiles () {
  return fetch.get('/config/getFiles');
}

export async function saveFiles (params) {
  return fetch.post('/config/saveFiles', params);
}

export async function addTranslate (params) {
  return fetch.post('/config/addTranslate', params);
}
