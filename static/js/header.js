{
  /**
   * 加载header.html中的页头代码片段到#header中
   */
  function loadHeader(){
    //调用ajax使用get方法向http://127.0.0.1:5555/header.html请求静态文件
    ajax("http://127.0.0.1:5555/header.html","get",{},"text").then(res=>{
      header.innerHTML = res 
      //为搜索按钮绑定鼠标移入移出事件
      showhide()
    })
  }
  /**
   * 鼠标进入/离开，显示/隐藏搜索输入框
   */
  let showhide = function (){
    showhide_search.onmouseover = e=>{
      e.preventDefault()
      search_input.style.width = "135px"
    }
    showhide_search.onmouseout = e=>{
      e.preventDefault()
      search_input.style.width = ""
    }
  }

}