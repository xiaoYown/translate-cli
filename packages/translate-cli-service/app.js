const Koa = require('koa');
const logger = require('koa-logger');
const KoaBody = require('koa-body');
// const KoaStatic = require('koa-static');
const router = require('./lib/apis');
const CONFIG = require('./config');

const app = new Koa();

async function start () {
  app.use(logger());
  app.use(
    KoaBody({
      multipart: true,
      formidable: {
        maxFileSize: 1000 * 1024 * 1024
      },
      patchKoa: true
    })
  );
  // app.use(KoaStatic(path.join(__dirname, 'build')));
  app.use(router.routes(),  router.allowedMethods());
  app.listen(CONFIG.port);
  console.log('https://127.0.0.1:7000');
}

module.exports = start;
