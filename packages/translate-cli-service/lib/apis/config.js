const router = require('koa-router')();
const codeMsg = require('./code_msg');
const {
  getConfig,
  updateConfig,
  getFiles,
  saveFiles,
  addTranslate,
  batchRemoveKeys,
} = require('../utils');

const { CODE_OK, DATA_NOT_EXIST } = codeMsg;

router.get('/get', async (ctx) => {
  const result = await getConfig();

  ctx.body = {
    ...CODE_OK,
    data: result
  };
});

router.post('/save_base_url', async (ctx) => {
  await updateConfig(ctx.request.body);
  ctx.body = {
    ...CODE_OK,
    data: null
  };
});

router.get('/getFiles', async (ctx) => {
  let result = await getFiles();
  let data = { ...CODE_OK, data: result };
  if (!result) {
    Object.assign(data, DATA_NOT_EXIST);
  }
  ctx.body = data;
});

router.post('/saveFiles', async (ctx) => {
  await saveFiles(ctx.request.body);
  ctx.body = {
    ...CODE_OK,
    data: null
  };
});

router.post('/addTranslate', async (ctx) => {
  await addTranslate(ctx.request.body);
  ctx.body = {
    ...CODE_OK,
    data: null
  };
});

router.post('/update', async (ctx) => {
  // TODO
});

router.post('/batch/remove_keys', async (ctx) => {
  await batchRemoveKeys(ctx.request.body.keys);
  ctx.body = {
    ...CODE_OK,
    data: null
  };
});


module.exports = router;
