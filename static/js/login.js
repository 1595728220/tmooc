{
  window.onload = ()=>{
    loadHeader()
    loadFooter()
  }

let phoneRegex = /^1[34578]\d{9}$/,
    state = 0
// phone = document.getElementById("phone")

  function login(){
    let data = {
      phone:phone.value,
      upwd:upwd.value
    },
    url = "http://127.0.0.1:5555/user/login",
    method = "post"
    if(state) {
      ajax(url,method,data).then(callback)
    }else{
      func_blur()
    }
  }
  function callback(res){
    alert(res.msg)
  }
  function func_blur(){
    console.log("失去焦点")
    if(!phoneRegex.test(phone.value)){
      phone_err.style.display="block"
      phone.className = "input_form input_form_error"
      state = 0
    } else {
      phone_err.style.display="none"
      phone.className = "input_form"
      state = 1
    }
  }
  
}
