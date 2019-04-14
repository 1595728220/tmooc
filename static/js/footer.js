{
  /**
   * 加载footer.html文件中的页尾代码片段，并加载到#footer上
   */
  function loadFooter() {
    //调用ajax，使用get方法向http://127.0.0.1:5555/footer.html请求静态文件
    ajax("http://127.0.0.1:5555/footer.html", "get", {}, "text").then(res => {
      footer.innerHTML = res
    })
  }
}