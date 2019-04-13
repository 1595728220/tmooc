const express = require("express")
const pool = require("../pool")
let router = express.Router()
//定义变量格式验证
let phoneRegex = /^1[34578]\d{9}$/,
 upwdRegex = /^[a-zA-Z\d_]{6,18}$/,
yanzhengma = "kfax"
router.post("/login",(req,res)=>{
  let {phone,upwd} = req.body
  console.log(phone,upwd)
  if(!phoneRegex.test(phone)) {
    res.send({code:401,msg:"手机号格式不正确"})
    return
  }
  if(!upwdRegex.test(upwd)) {
    res.send({code:402,msg:"密码格式不正确"})
    return
  }
  let sql = "select uid from user where phone = ? and upwd = ?"
  pool.query(sql,[phone,upwd],(err,result)=>{
    if(err) throw err
    console.log(result)
    if(result.length > 0) {
      res.send({code:200,msg:"登陆成功"})
    }else {
      res.send({code:301,msg:"用户名或密码不正确"})
    }
  })
})

router.post("/register",(req,res)=>{
  let {phone,upwd,cpwd,iden} = req.body
  console.log(req.body)
  if(!phoneRegex.test(phone)) {
    res.send({code:401,msg:"手机号格式不正确"})
    return
  }
  if(!upwdRegex.test(upwd)) {
    res.send({code:402,msg:"密码格式不正确"})
    return
  }
  if(upwd !== cpwd) {
    res.send({code:403,msg:"两次密码不一致"})
    return
  }
  if(iden.toLowerCase() !== yanzhengma.toLowerCase()) {
    res.send({code:404,msg:"验证码输入不正确"})
    return
  }
  let sql = "select uid from user where phone = ?"
  pool.query(sql,[phone],(err,result)=>{
    if(err) throw err
    if(result.length === 0) {
      sql = "insert into user values(null,?,?)"
  pool.query(sql,[phone,upwd],(err,result)=>{
    if(err) throw err
    if(result.affectedRows > 0) {
      res.send({code:200,msg:"注册成功"})
    }
  })
    }else{
      res.send({code:301,msg:"用户名已重复"})
    }
  })
})

router.get("/phone",(req,res)=>{
  let phone = req.query.phone
  if(!phoneRegex.test(phone)) {
    res.send({code:401,msg:"手机号格式不正确"})
    return
  }
  let sql = "select uid from user where phone = ?"
  pool.query(sql,[phone],(err,result)=>{
    if(err) throw err
    if(result.length === 0) {
      res.send({code:200,msg:"用户名可用"})
    }else{
      res.send({code:301,msg:"用户名已重复"})
    }
  })
})
module.exports = router