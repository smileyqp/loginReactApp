import express from 'express';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator'
let router = express.Router();


//判断请求信息是否为空的函数
//此处data为前段请求所带过来的一串的数据
const validateInput=(data)=>{
    console.log(data);
    let errors ={};//errors设置成空的对象
    if (validator.isEmpty(data.username)){
        errors.username = 'The field is required!';
    }
    if (!validator.isEmail(data.email)){//为啥相反啊；不知道emmm
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
    if(!isValid){
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