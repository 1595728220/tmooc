{
  /**
   * 加载header.html中的页头代码片段到#header中
   */
  function loadHeader(){
    //调用ajax使用get方法向http://127.0.0.1:5555/header.html请求静态文件
    ajax("http://127.0.0.1:5555/header.html","get",{},"text").then(res=>{
      header.innerHTML = res 
    })
  }
}