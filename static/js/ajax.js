/**
 * 封装ajax异步请求，返回promise对象
 * @param {string} url 请求的地址
 * @param {string} method 请求的方法
 * @param {object} data 请求携带的数据
 * @param {string} dataType 响应的数据格式（JSON字符串，文本）
 */
function ajax(url, method, data, dataType) {
  return new Promise(function (resolve, reject) {

    let res, //响应回来的结果
      xhr = new XMLHttpRequest(), //创建异步对象，并赋值给变量
      formdata = null, //提交的表单字符串
      str = "", //临时字符串
      ind //多余字符的下标
    // 遍历data对象将值以查询字符串的形式拼接到str中
    for (var key in data) {
      str += key + "=" + data[key] + "&"
    }
    // 获取最后一个&符号的下标
    ind = str.lastIndexOf("&")
    //剔除最后一个&符号
    str = str.slice(0, ind)
    //接收响应的回调函数
    xhr.onreadystatechange = () => {
      //响应数据成功
      if (xhr.readyState === 4 && xhr.status === 200) {
        //接收的数据非文本格式，为JSON字符串
        if (!dataType) {
          //转为js对象数组
          res = JSON.parse(xhr.responseText)
        }
        //接收数据为文本格式
        if (dataType === "text") {
          res = xhr.responseText
        }
        //执行成功执行回调函数
        resolve(res)
      }
    }
    //使用get方法
    if (method === "get") {
      url += "?" + str
    }
    //创建请求
    xhr.open(method, url, true)
    //使用post方法
    if (method === "post") {
      formdata = str
      //设置请求头为提交的数据格式为任意字符，即文本
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    }
    //发送请求
    xhr.send(formdata)
  })
}