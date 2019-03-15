import axios from 'axios';
import setAuthorization from '../utils/setAuthorizationToken'

export const login = (data) => {
    return dispatch =>{
        return axios.post('/api/auth',data).then(res => {   //用异步的方法提交
            const token = res.data.token;

            localStorage.setItem('jwtToken',token);//将传过来的值放进localStorage中;localStorage是一个键值对的;前面的jwtToken这个可以自定义;localStorage这个对象是浏览器自带的不用导入
            setAuthorization(token);
        });
    }
}