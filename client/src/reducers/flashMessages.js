import {ADD_FLASH_MEASSAGE,DELETE_FLASH_MESSAGE} from '../constants';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

const flashMessages = (state = [],action = {}) => {
    switch(action.type){
        case ADD_FLASH_MEASSAGE:
            return [
                ...state,//原来的state
                {
                    id:shortid.generate(),//shortid是查询随机数保证它唯一的
                    type:action.message.type,
                    text:action.message.text
                }
            ]
        case DELETE_FLASH_MESSAGE:
            const index = findIndex(state,{id:action.id})//fliter方法，找出所在记录；找出它在数组state中的位置;这个是找出要删除元素的一个索引位置
            if(index >= 0){     //找不到是返回-1
                return[
                    ...state.slice(0,index),//0到index，但是不包括这个index
                    ...state.slice(index+1)//index+1包括index+1以及后面的所有部分；slice方法slice(start,end),其结果是返回一个新的数组；这个中的做法就是在state中返回一个新的数组中，新的数组删除了index这个元素
                ]
            }
            return state;//没有找到返回原来的state
        default: return state;
    }
}

export default flashMessages;