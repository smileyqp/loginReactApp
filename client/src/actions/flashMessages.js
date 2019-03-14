import {ADD_FLASH_MEASSAGE} from '../constants';

export const addFlashMessage = (message) => {
    return {
        type:ADD_FLASH_MEASSAGE,
        message
    }
}