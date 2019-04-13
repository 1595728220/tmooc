{
    // console.log(1)
    function my_alert(msg){
        alert_area.innerHTML = msg
        let high = content.children[0].clientHeight,
        wid = content.children[0].clientWidth,
        eWid = alert_area.clientWidth
        console.log(high,wid)
        alert_area.style.left= (wid-eWid)/2+"px"
        
        alert_area.style.top = high/2-30+"px"
        // alert_area.style.display = "block"
        alert_area.style.opacity = 1
        alert_area.style.height = "60px"
        setTimeout(()=>{
            // alert_area.style.display = "none"
            alert_area.style.opacity = 0
            alert_area.style.height = "0"
        },3000)
    }
}