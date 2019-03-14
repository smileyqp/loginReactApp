import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends Component {
    static propTypes = {
        message:PropTypes.object.isRequired,//验证传过来父组件中传过来的message;注意从福组件中传过来的message是一个object不是array
        deleteFlashMessage:PropTypes.func.isRequired
    }
    onclick = () => {
        this.props.deleteFlashMessage(this.props.message.id);
    }
    render(){
        const {type,text} = this.props.message;
        return(
            <div className={classnames('alert',{
                'alert-success':type === 'success',
                'alert-danger':type === 'danger'
            })}>
            <button onClick = {this.onclick} className='close'><span>&times;</span></button>
            {text}

            </div>
        );
    }
}

export default FlashMessage; 