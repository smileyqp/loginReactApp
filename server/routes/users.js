import express from 'express';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator'
import User from '../models/user';
import bcrypt from 'bcrypt';

let router = express.Router();


//判断请求信息是否为空的函数
//此处data为前段请求所带过来的一串的数据
const validateInput=(data)=>{
    console.log(data);
    let errors ={};//errors设置成空的对象
    if (validator.isEmpty(data.username)){
        errors.username = 'The field is required!';
    }
    if (!validator.isEmail(data.email)){//注意此处相反
        errors.email = 'Email is invalid!';
    }
    if (validator.isEmpty(data.password)){
        errors.password = 'The field is required!';
    }
    if (validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation = 'The field is required!';
    }
    if(!validator.equals(data.password,data.passwordConfirmation)){
        errors.passwordConfirmation = 'Password must match!';
    }
    return {
        errors,//存放一些错误信息；如果errors为空，那么验证通过
        isValid:isEmpty(errors)
    }
}


router.post('/',(req,res)=>{
    // setTimeout(()=>{},500);
    //console.log(req.body);
    const {errors,isValid} = validateInput(req.body);
    if(isValid){
        const {username,password,email} = req.body;
        const password_digest = bcrypt.hashSync(password,10);//用bcrypt加密,哈希加密并且长度为10

        //保存进数据库中
        User.forge({
            username,password_digest,email
        },{hasTimestamps:true}).save()//hasTimestamps为true是时间戳要存储起来
        .then(user => res.json({success:true}))//成功返回一个user
        .catch(err => res.status(500).json({errors:err}))//失败返回一个状态码500

        // res.json({success:true});
    }else{
        res.status(400).json(errors);//传给前台错误信息
    }
});


//1、其请求路由为api/users/articles
// router.post('/articles',()=>{
// });


//2、还可以有其他的方法例如get
// router.get('/',(req,res)=>{
// });
export default router;