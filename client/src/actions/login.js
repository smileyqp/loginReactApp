import axios from 'axios';


export const login = (data) => {
    return dispatch =>{
        return axios.post('/api/auth',data);//用异步的方法提交
    }
}