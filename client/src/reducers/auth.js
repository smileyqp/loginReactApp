import {SET_CURRENT_USER} from '../constants';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated:false,//表示未登录过,用于判断登录
    user:{}//用于有用户登录时候取得里面的数据
}
const auth =(state = initialState,action ={}) => {
    switch(action.type){
        case SET_CURRENT_USER:
        return {
            isAuthenticated:!isEmpty(action.user),//表示是否为空
            user:action.user//将loginAction处解析的token中的数值即user对象传给现在这个user对象;即将token中的数值传给reducer中进行保存以便调用
        }
        default:return state;
    }
}
export default auth;