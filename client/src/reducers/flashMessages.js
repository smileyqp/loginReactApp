import {ADD_FLASH_MEASSAGE} from '../constants';
import shortid from 'shortid';

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
        default: return state;
    }
}

export default flashMessages;