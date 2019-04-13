{
  window.onload = () => {
    loadHeader()
    loadFooter()
  }

  let phoneRegex = /^1[34578]\d{9}$/,
    upwdRegex = /^[a-zA-Z\d_]{6,18}$/,
    state_phone = 0,
    state_upwd = 0,
    state_cpwd = 0,
    state_iden = 0

  function register() {
    let data = {
        phone: phone.value,
        upwd: upwd.value,
        cpwd: cpwd.value,
        iden: iden.value
      },
      url = "http://127.0.0.1:5555/user/register",
      method = "post"
    if (state_phone && state_upwd && state_iden && state_cpwd && agree.checked) {
      ajax(url, method, data).then(callback)
    } else {
      if (!agree.checked) {
        alert("请先阅读用户协议后再点击注册")
      }
      func_phone_blur()
      func_upwd_blur()
      func_cpwd_blur()
      func_iden_blur()
    }
  }

  function callback(res) {
    my_alert(res.msg)
  }

  function func_phone_blur() {
    // console.log("失去焦点")
    if (!phoneRegex.test(phone.value)) {
      phone_err.style.display = "block"
      phone_err.style.color = ""
      phone.className = "input_form input_form_error"
      state_phone = 0
      phone_err.innerHTML = "手机号格式错误"
    } else {
      let url = "http://127.0.0.1:5555/user/phone",
        data = {
          phone: phone.value
        },
        method = "get"
      ajax(url, method, data).then(func_phone_blur_yanzheng)
    }
  }

  function func_phone_blur_yanzheng(res) {
    // console.log(agree.value)

    // console.log("手机号非空，验证是否被注册")
    // console.log(res)
    if (res.code === 200) {
      phone_err.style.display = "block"
      phone_err.style.color = "#4ab71a"
      phone.className = "input_form"
      state_phone = 1
      phone_err.innerHTML = res.msg
    } else {
      phone_err.style.display = "block"
      phone.className = "input_form input_form_error"
      state_phone = 0
      phone_err.innerHTML = res.msg
    }
  }

  function func_upwd_blur() {
    if (!upwdRegex.test(upwd.value)) {
      upwd_err.style.display = "block"
      upwd.className = "input_form input_form_error"
      state_upwd = 0
    } else {
      upwd_err.style.display = "none"
      upwd.className = "input_form"
      state_upwd = 1
    }
  }

  function func_cpwd_blur() {
    if (cpwd.value !== upwd.value) {
      cpwd_err.style.color = ""
      cpwd_err.innerHTML = "两次输入密码不一致"
      cpwd_err.style.display = 'block'
      cpwd.className = "input_form input_form_error"
      state_cpwd = 0
    } else {
      // cpwd_err.style.display = "none"
      cpwd_err.style.display = 'block'
      cpwd_err.style.color = "#4ab71a"
      cpwd_err.innerHTML = "两次密码输入一致"
      cpwd.className = "input_form"
      state_cpwd = 1
    }
  }

  function func_iden_blur() {
    if (iden.value.toLowerCase() !== "kfax") {
      iden_err.style.display = "block"
      iden.className = "input_form iden_form input_form_error"
      state_iden = 0
    } else {
      iden_err.style.display = "none"
      iden.className = "input_form iden_form"
      state_iden = 1
    }
  }
}