import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';//用于密码加密的js库

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