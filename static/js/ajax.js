function ajax(url,method,data,dataType){
  return new Promise(function(resolve,reject){
    let res,
      xhr = new XMLHttpRequest(),
      formdata = null,
      str = "",
      ind
    for(var key in data) {
      str += key + "=" + data[key] + "&"
    }
    ind = str.lastIndexOf("&")
    str = str.slice(0,ind)
    // console.log(str)
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState === 4 && xhr.status === 200) {
        if(!dataType) {
          res = JSON.parse(xhr.responseText)
        }
        if(dataType === "text"){
          res = xhr.responseText
        }
        resolve(res)
      }
    }
    if(method === "get") {
      url += "?" + str
    }
    xhr.open(method,url,true)
    if(method === "post") {
      formdata = str
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    }
    xhr.send(formdata)
  })
}
// function ajax(method,url,callback,data){
//   let xhr = new XMLHttpRequest(),
//   formdata = null,
//   str = ""
//     for(var key in data) {
//       str += key+"="+data[key]+"&"
//     }
//     let ind = str.lastIndexOf("&")
//     str = str.slice(0,ind)
//     console.log(str)
  
//   xhr.onreadystatechange = function () {
//     if(xhr.readyState === 4 && xhr.status === 200) {
//       callback(xhr)
//     }
//   }
//   if(method === "get") {
//     url += "?"+str 
//   }
//   xhr.open(method,url,true)
//   if(method === "post") {
//     formdata = str
//     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
//   }
//   xhr.send(formdata)
// }