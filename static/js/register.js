{
  //在页面加载完成后执行加载页头页尾，防止方法中需要嵌入到的目标元素未渲染到页面上导致方法错误
  window.onload = () => {
    loadHeader()
    loadFooter()
  }

  let phoneRegex = /^1[34578]\d{9}$/, //手机号正则
    upwdRegex = /^[a-zA-Z\d_]{6,18}$/, //密码正则
    //验证状态
    state_phone = 0, 
    state_upwd = 0,
    state_cpwd = 0,
    state_iden = 0
  /**
   * 注册按钮点击时所调用的方法
   */
  function register() {
    //将表单中的数据放入data对象
    let data = {
      phone: phone.value,
      upwd: upwd.value,
      cpwd: cpwd.value,
      iden: iden.value
    },
      url = "http://127.0.0.1:5555/user/register", //请求的url
      method = "post" //请求的方法
    //调用ajax前验证数据
    func_phone_blur()
    func_upwd_blur()
    func_cpwd_blur()
    func_iden_blur()
    if (state_phone && state_upwd && state_iden && state_cpwd && agree.checked) { //验证通过
      //调用ajax发送请求
      ajax(url, method, data).then(callback)
      
    } else { //验证未通过
      if (!agree.checked) { //未勾选同意协议复选框
        //调用自定义提示框
        my_alert("请先阅读用户协议后再点击注册")
      }
    }
  }
  /**
   * 内部方法的回调函数，使用函数表达式，外部无法访问
   * @param {object} res 响应数据的js对象
   */
  let callback = function (res) {
    //调用自定义提示框
    my_alert(res.msg)
    //验证手机号
    func_phone_blur()
  }
  /**
   * 手机号表单失去焦点时调用的方法
   */
  function func_phone_blur() {
    // console.log("失去焦点")
    if (!phoneRegex.test(phone.value)) { //手机号验证不通过
      phone_err.style.display = "block"
      phone_err.style.color = ""
      phone.className = "input_form input_form_error"
      state_phone = 0
      phone_err.innerHTML = "手机号格式错误"
    } else { //手机号验证通过
      let url = "http://127.0.0.1:5555/user/phone",
        data = {
          phone: phone.value
        },
        method = "get"
      ajax(url, method, data).then(func_phone_blur_yanzheng)
    }
  }
  /**
   * 根据请求的状态码，提示消息，内部使用方法，外部无法访问
   * @param {obj} res 响应数据的js对象
   */
  let func_phone_blur_yanzheng = function (res) {
    // console.log(res)
    // console.log("手机号非空，验证是否被注册")
    if (res.code === 200) {
      phone_err.style.display = "block"
      phone_err.style.color = "#4ab71a"
      phone.className = "input_form"
      state_phone = 1
      phone_err.innerHTML = res.msg
    } else {
      phone_err.style.display = "block"
      phone_err.style.color = ""
      phone.className = "input_form input_form_error"
      state_phone = 0
      phone_err.innerHTML = res.msg
    }
  }
  /**
   * 密码表单失去焦点时调用的方法
   */
  function func_upwd_blur() {
    if (!upwdRegex.test(upwd.value)) { //密码验证不通过
      upwd_err.style.display = "block"
      upwd_err.style.color = ""
      upwd_err.innerHTML = "包含数字、字母、下划线的6-18位"
      upwd.className = "input_form input_form_error"
      state_upwd = 0
    } else { //密码验证通过
      upwd_err.style.display = "block"
      upwd_err.style.color = "#4ab71a"
      upwd_err.innerHTML = "正确"
      // upwd_err.style.display = "none"
      upwd.className = "input_form"
      state_upwd = 1
    }
  }
  /**
   * 重复密码表单失去焦点时调用的方法
   */
  function func_cpwd_blur() { 
    if (cpwd.value !== upwd.value) { //重复密码验证不通过
      cpwd_err.style.color = ""
      cpwd_err.innerHTML = "两次输入密码不一致"
      cpwd_err.style.display = 'block'
      cpwd.className = "input_form input_form_error"
      state_cpwd = 0
    } else { //重复密码验证通过
      // cpwd_err.style.display = "none"
      cpwd_err.style.display = 'block'
      cpwd_err.style.color = "#4ab71a"
      cpwd_err.innerHTML = "两次密码输入一致"
      cpwd.className = "input_form"
      state_cpwd = 1
    }
  }
  //验证码表单失去焦点时调用的方法 
  function func_iden_blur() {
    if (iden.value.toLowerCase() !== "kfax") { //验证码验证不通过
      iden_err.style.display = "block"
      iden.className = "input_form iden_form input_form_error"
      iden_err.style.color = ""
      iden_err.innerHTML = "验证码错误"
      state_iden = 0
    } else { //验证码验证通过
      iden_err.style.display = "block"
      iden_err.style.color = "#4ab71a"
      iden_err.innerHTML = "正确"
      // iden_err.style.display = "none"
      iden.className = "input_form iden_form"
      state_iden = 1
    }
  }
}