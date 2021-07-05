const router = require('koa-router')();
const codeMsg = require('./code_msg');
const { getConfig, getFiles } = require('../utils');

const { CODE_OK } = codeMsg;

router.get('/get', async (ctx) => {
  const result = await getConfig();

  ctx.body = {
    ...CODE_OK,
    data: result
  };
});

router.get('/getFiles', async (ctx) => {
  const result = await getFiles();

  ctx.body = {
    ...CODE_OK,
    data: result
  };
});

router.post('/update', async (ctx) => {
  // TODO
});


module.exports = router;
