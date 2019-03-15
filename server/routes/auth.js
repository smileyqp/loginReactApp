import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';//用于密码加密的js库
import jwt from 'jsonwebtoken';
import config from '../config';//token加密的秘钥;对应server/config.js

let router = express.Router();

router.post('/',(req,res)=>{
    const {identifier,password} = req.body;

    //查询输入用户名和邮箱都是可以的;这里是先用用户名以及邮箱去查找;找到了再去匹配其password
    User.query({
        where : {username:identifier},
        orWhere : {email:identifier}
    }).fetch().then( user => {
        if(user){
            if(bcrypt.compareSync(password,user.get('password_digest'))){//判断密码是否和数据库中返回的加密的密码解析之后相等
                //这边是用户登录操作时候输入账号在数据库中查询成功之后给用户的响应;这个里面是user从数据库中取出来的,并且可以响应任何我们想得到的;这里如有有欧头像也可以响应头像地址等
                const token = jwt.sign({
                    id:user.get('id'),
                    username:user.get('username')
                },config.jwtSecret);//config.jwtSecret这个是一个秘钥,相当于密码是对其进行签名用的;这个知识一个字符串,但是这个字符串是保密的;这个config上面有导入;这个config在server目录下的config.js
            }else{
                res.status(401).json({errors:{form:'Invalid Credentials!Password is wrong!'}});//密码不匹配时候返回
            }
        }else{
            //这个form是传过去显示login失败后的提示框的
            res.status(401).json({errors:{form:'Invalid Credentials!Username or email is invalid!'}});//username或者password不存在时候返回
        }
    })
});

export default router;