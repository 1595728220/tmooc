set names utf8;
drop database if exists lianxi;
create database lianxi charset=utf8;
use lianxi;
create table user(
  uid int primary key auto_increment comment "用户编号",
  phone varchar(11) comment "手机",
  upwd varchar(16) comment "密码"
);
insert into user values(null,15122222222,"123456");