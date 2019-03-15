import axios from 'axios';

export const userSignupRequest = (userData) =>{
    return dispatch =>{
        return axios.post('/api/users',userData)//axios有then方法；用于获得请求的返回数据
    }
}

export const isUserExists = (identifier) =>{
    return dispatch =>{
        return axios.get(`/api/users/${identifier}`,identifier)//axios有then方法；用于获得请求的返回数据;发送异步请求;注意此处符号不是单引号而是``(1左边的符号)
    }
}