//引入express模块
const express = require("express")
//引入连接池模块
const pool = require("../pool")
//创建路由器
let router = express.Router()
//定义变量格式验证
let phoneRegex = /^1[34578]\d{9}$/,
  upwdRegex = /^[a-zA-Z\d_]{6,18}$/,
  yanzhengma = "kfax"
//登录路由：/user/login post 
router.post("/login", (req, res) => {
  // 取出请求对象中的数据
  let { phone, upwd } = req.body
  console.log(phone, upwd)
  if (!phoneRegex.test(phone)) { //手机号格式不正确
    res.send({ code: 401, msg: "手机号格式不正确" })
    return
  }
  if (!upwdRegex.test(upwd)) { //密码格式不正确
    res.send({ code: 402, msg: "密码格式不正确" })
    return
  }
  //查询数据库，验证手机号和密码是否正确
  let sql = "select uid from user where phone = ? and upwd = ?"
  pool.query(sql, [phone, upwd], (err, result) => {
    if (err) throw err
    console.log(result)
    if (result.length > 0) { //正确
      res.send({ code: 200, msg: "登陆成功" })
    } else { //不正确
      res.send({ code: 301, msg: "用户名或密码不正确" })
    }
  })
})
//注册路由：/user/register post
router.post("/register", (req, res) => {
  //获取请求对象中的数据
  let { phone, upwd, cpwd, iden } = req.body
  console.log(req.body)
  if (!phoneRegex.test(phone)) { //手机号格式不正确
    res.send({ code: 401, msg: "手机号格式不正确" })
    return
  }
  if (!upwdRegex.test(upwd)) { //密码格式不正确
    res.send({ code: 402, msg: "密码格式不正确" })
    return
  }
  if (upwd !== cpwd) { //两次密码不一致
    res.send({ code: 403, msg: "两次密码不一致" })
    return
  }
  if (iden.toLowerCase() !== yanzhengma.toLowerCase()) { //验证码不正确
    res.send({ code: 404, msg: "验证码输入不正确" })
    return
  }
  //查询数据库，验证手机号是否存在
  let sql = "select uid from user where phone = ?"
  pool.query(sql, [phone], (err, result) => {
    if (err) throw err
    if (result.length === 0) { //手机号不存在
      //插入数据到数据库
      sql = "insert into user values(null,?,?)"
      pool.query(sql, [phone, upwd], (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0) { //完成注册
          res.send({ code: 200, msg: "注册成功" })
        }
      })
    } else { //手机号存在
      res.send({ code: 301, msg: "手机号已注册" })
    }
  })
})
//手机号验证路由：/user/phone get
router.get("/phone", (req, res) => {
  //获取请求对象中的数据
  let phone = req.query.phone
  if (!phoneRegex.test(phone)) { //手机号格式不正确
    res.send({ code: 401, msg: "手机号格式不正确" })
    return
  }
  //查询数据库是否存在该手机号
  let sql = "select uid from user where phone = ?"
  pool.query(sql, [phone], (err, result) => {
    if (err) throw err
    if (result.length === 0) { //不存在
      res.send({ code: 200, msg: "手机号可用" })
    } else { //存在
      res.send({ code: 301, msg: "手机号已注册" })
    }
  })
})
//导出路由器对象
module.exports = router