exports.HTTP_OK = {
  code: 200
}
exports.HTTP_FOUND = {
  code: 302
}
exports.HTTP_BAD_REQUEST = {
  code: 400
}
exports.HTTP_UNAUTHORIZED = {
  code: 401
}
exports.HTTP_FORBIDDEN = {
  code: 403
}
exports.HTTP_NOT_FOUND = {
  code: 404
}
exports.HTTP_SERVER_ERROR = {
  code: 500
}

exports.CODE_OK = {
  code: 0
}
exports.TOKEN_EXPIRED = {
  code: -1,
  msg: '登录超时,请重新登录'
}
exports.PARAM_ERROR = {
  code: 10000,
  msg: "参数错误,请检查你的请求"
}
exports.TOKEN_ERROR = {
  code: 10100,
  msg: 'Token无效,请重新登录'
}
exports.AUTH_VERIFY_ERROR = {
  code: 10201,
  msg: '无操作权限'
}

exports.USER_NOT_EXIST = {
  code: 10301,
  msg: '用户不存在'
}
exports.USER_PASSWORD_ERROR = {
  code: 10303,
  msg: '登录出错'
}
exports.DATA_DUPLICATE = {
  code: 10302,
  msg: '请勿重复添加'
}
exports.DATA_NOT_EXIST = {
  code: 10400,
  msg: '数据不存在'
}
exports.CREATE_DATA_ERROR = {
  code: 10401,
  msg: '添加新数据错误'
}
exports.RISK_NOT_EXSIT_ERROR = {
  code: 10402
}

// 角色相关 105 开头
exports.ROLE_EMPTY = {
  code: 10500
}

// 用户相关 106开头
exports.USER_DUPLICATE_ADD = {
  code: 10601,
  msg: '用户重复添加'
}

