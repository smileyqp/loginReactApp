import axios from 'axios';

export const userSignupRequest = (userData) =>{
    return dispatch =>{
        return axios.post('/api/users',userData)//axios有then方法；用于获得请求的返回数据
    }
}