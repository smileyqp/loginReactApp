import axios from 'axios';

//这个方法是实现每次用axios请求的时候header带上这个token
const setAuthorizationToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;//注意Bearer是必须的;这里不能用单引号应该用``这个是1左边的那个符号;这样才可以读取到token的内容
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}
export default setAuthorizationToken;