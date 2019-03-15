import validator from 'validator';//用于表单验证的js库
import isEmpty from 'lodash/isEmpty';


//登陆时候进行客户端验证
const validateInput = (data) =>{
    let errors = {};
    if(validator.isEmpty(data.identifier)){
        errors.identifier = 'This field is required';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateInput;