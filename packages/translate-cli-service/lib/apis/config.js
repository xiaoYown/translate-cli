const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const codeMsg = require('./code_msg');

const { CODE_OK } = codeMsg;

const configName = 'xtc.config.json';
const config = {
  baseUrl: './locales'
}

const isExist = (filePath) => {
  return new Promise((resolve) => {
    fs.stat(filePath, (err) => {
      resolve(!err)
    });
  })
}

router.get('/get', async (ctx) => {
  const filePath = path.join(__dirname, configName);
  const exist = await isExist(filePath);
  const _config = Object.assign({}, config);
  if (exist) {
    // TODO: 异常处理
    const content = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }).toString());
    _config.assign(_config, content);
  }

  ctx.body = {
    ...CODE_OK,
    data: _config
  };
});

router.post('/update', async (ctx) => {
  // TODO
});


module.exports = router;
