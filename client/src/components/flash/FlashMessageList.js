import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FlashMessage from './FlashMessage';
import {deleteFlashMessage} from '../../actions/flashMessages';

class FlashMessageList extends Component {
    static propTypes = {
        messages:PropTypes.array.isRequired,//从reducer中的flashMessages中得知传过来的messages是一个数组
        deleteFlashMessage:PropTypes.func.isRequired
    }
    render(){
        const messages = this.props.messages.map(message =>//这里的messages是一个数组(纠正是一个object)，用map方法取出 
            <FlashMessage key = {message.id} deleteFlashMessage = {this.props.deleteFlashMessage} message = {message}/>//里面的message={message}是将这个参数传给子组件中所用
        );
        
        return(
            <div className='container'>
                {messages}
            </div>
        );
    }
}

//这个是返回reducer中的flashMessages;将state传过来
const mapStateToProps = (state) => {
    return {
        messages:state.flashMessages
    }
}

export default connect(mapStateToProps,{deleteFlashMessage})(FlashMessageList); 