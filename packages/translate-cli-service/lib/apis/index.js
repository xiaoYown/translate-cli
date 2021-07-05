const Router = require('koa-router');
const config = require('./config');

const router = new Router({ prefix: '/app/api' })

router.use('/config', config.routes(), config.allowedMethods());


module.exports = router;
