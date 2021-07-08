import fetch from './utils/fetch';

export async function fetchConfig () {
  return fetch.get('/config/get');
}
export async function postSaveBaseUrl (params) {
  return fetch.post('/config/save_base_url', params);
}

export async function fetchFiles () {
  return fetch.get('/config/getFiles');
}

export async function saveFiles (params) {
  return fetch.post('/config/saveFiles', params);
}

export async function postBatchRemoveKeys (params) {
  return fetch.post('/config/batch/remove_keys', params);
}

export async function addTranslate (params) {
  return fetch.post('/config/addTranslate', params);
}
