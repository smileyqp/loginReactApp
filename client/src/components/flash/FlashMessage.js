import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends Component {
    static propTypes = {
        message:PropTypes.array.isRequired//验证传过来父组件中传过来的message
    }
    render(){
        const {id,type,text} = this.props.message;
        return(
            <div className={classnames('alert',{
                'alert-success':type === 'success',
                'alert-danger':type === 'danger'
            })}>
            {text}

            </div>
        );
    }
}

export default FlashMessage; 