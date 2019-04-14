{
  //在页面加载完成后执行加载页头页尾，防止方法中需要嵌入到的目标元素未渲染到页面上导致方法错误
  window.onload = () => {
    loadHeader()
    loadFooter()
  }

  let phoneRegex = /^1[34578]\d{9}$/, //手机号正则
    upwdRegex = /^[a-zA-Z\d_]{6,18}$/, //密码正则
    state_phone = 0, //手机号验证状态
    state_upwd = 0 //密码验证状态
    /**
     * 登录按钮的点击事件所调用的方法
     */
  function login() {
    //将表单中的值手机到data对象中
    let data = {
      phone: phone.value,
      upwd: upwd.value
    },
      url = "http://127.0.0.1:5555/user/login", //请求的url
      method = "post" //请求的方法
      //调用ajax前验证手机号密码是否正确
      func_phone_blur() 
      func_upwd_blur()
      
    if (state_phone && state_upwd) { //手机号和密码正确
      // 调用ajax发起请求
      ajax(url, method, data).then(callback)
    } else { //手机号或密码不正确
      //调用自定义提示框
      my_alert("请正确输入用户名和密码") 
    }
  }
  /**
   * 
   * @param {object} res 请求响应回来的js对象数组 
   */
  let callback = function (res) {
    //调用自定义提示框
    my_alert(res.msg)
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
      phone_err.innerHTML = "正确"
      phone_err.style.display = "block"
      phone_err.style.color = "#4ab71a"
      phone.className = "input_form"
      state_phone = 1

    }
  }
  /**
   * 密码表单失去焦点时调用的方法
   */
  function func_upwd_blur() {
    if (!upwdRegex.test(upwd.value)) { //密码验证未通过
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
}
