import express from 'express';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator'
let router = express.Router();



const validateInput=(data)=>{
    let errors ={};
    if (validator.isEmpty(data.username)){
        errors.username = 'The field is required!';
    }
    if (validator.isEmpty(data.email)){
        errors.username = 'The field is required!';
    }
    if (validator.isEmpty(data.password)){
        errors.username = 'The field is required!';
    }
    if (validator.isEmpty(data.passwordConfirmation)){
        errors.username = 'The field is required!';
    }
    return {
        errors,//存放一些错误信息；如果errors为空，那么验证通过
        isValid:isEmpty(errors)
    }
}


router.post('/',(req,res)=>{
    //console.log(req.body);
    const {error,isValid} = validateInput(req.body);
    if(!isValid){
        res.status(400).json(errors);
    }
});


//1、其请求路由为api/users/articles
// router.post('/articles',()=>{
// });


//2、还可以有其他的方法例如get
// router.get('/',(req,res)=>{
// });
export default router;