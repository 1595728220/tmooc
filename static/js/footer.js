{
  function loadFooter() {
    ajax("http://127.0.0.1:5555/footer.html", "get", {}, "text").then(res => {
      footer.innerHTML = res
    })
  }
}