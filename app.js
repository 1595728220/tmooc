const express = require("express")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user")
const cors = require("cors")
let app = express()
// 监听5555端口
app.listen(5555)
//解决跨域问题
app.use(cors({
  origin: 'http://127.0.0.1:5555',    //控制响应头Access-Control-Allow-Origin
  credentials: true, //控制响应头Access-Control-Allow-Credentials
}))
//托管静态资源到static文件夹
app.use(express.static("static"))
//使用bodyParse中间件
app.use(bodyParser.urlencoded({
  extended:false
}))

//挂载用户模块
app.use("/user",userRouter)
