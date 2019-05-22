function request(obj) {
  let url = obj.url || ''

  //配置基础路径
  url = 'https://www.zhengzhicheng.cn' + url

  let method = obj.method || 'get'
  let data = obj.data || {}
  //其他参数。。

  return new Promise(function (resolve,rejected) {
    mpvue.request({
      url: url,
      method: method,
      data: data,
      success: function (info) {
        resolve(info.data)
      }
    })
  })
}

export default request
