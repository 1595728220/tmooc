{
  function loadHeader(){
    ajax("http://127.0.0.1:5555/header.html","get",{},"text").then(res=>{
      header.innerHTML = res 
    })
  }
}