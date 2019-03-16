import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';//接到server端传过来的token之后前段进行解码
import {SET_CURRENT_USER} from '../constants';

export const setCurrentUser = (user) => {//直接到reducer中的auth.js
    return {
        type:SET_CURRENT_USER,
        user
    }

}


export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');//清除浏览器的localStorage中的jwtToken;
        setAuthorizationToken(false);//这里是将头部的认证信息Authorization删除,以后不带上头部认证信息
        dispatch(setCurrentUser({}));//传入一个空对象;
    }
}



export const login = (data) => {
    return dispatch =>{
        return axios.post('/api/auth',data).then(res => {   //用异步的方法提交
            const token = res.data.token;

            localStorage.setItem('jwtToken',token);//将传过来的值放进localStorage中;localStorage是一个键值对的;前面的jwtToken这个可以自定义;localStorage这个对象是浏览器自带的不用导入
            setAuthorizationToken(token);//将res的传过来的token放进请求头
            //console.log(jwtDecode(token));//这样可以将payload中的内容解析出来;解析得到的欧式server当时传过来的token中的json数据内容
            dispatch(setCurrentUser(jwtDecode(token)));//调用上面的一个方法setCurrentUser
        });
    }
}


