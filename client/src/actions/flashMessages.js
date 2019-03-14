import {ADD_FLASH_MEASSAGE,DELETE_FLASH_MESSAGE} from '../constants';


export const addFlashMessage = (message) => {
    return {
        type:ADD_FLASH_MEASSAGE,
        message
    }
}


export const deleteFlashMessage = (id) => {
    return {
        type:DELETE_FLASH_MESSAGE,
        id
    }
}
