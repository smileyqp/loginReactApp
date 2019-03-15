import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignupForm from './SignupForm';
import {userSignupRequest,isUserExists} from '../../actions/signupActions';
import {addFlashMessage} from '../../actions/flashMessages';

class SignupPage extends Component {
  static propTypes = {
    userSignupRequest:PropTypes.func.isRequired,
    addFlashMessage:PropTypes.func.isRequired,
    isUserExists:PropTypes.func.isRequired
  }
  render() {
    // console.dir(this.props);从这里可以看出可以取得history也就是历史页面值；然后传给signupForm即history={this.props.history}；使其能进行成功获得request返回信息时候跳转到历史上一个页面
    const {addFlashMessage,userSignupRequest,isUserExists} = this.props;//直接取出来就不用this.props.addFlashMessage等在取得的时候
    return (
      <div className="row">
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <SignupForm 
          isUserExists={isUserExists} 
          addFlashMessage ={addFlashMessage} 
          userSignupRequest={userSignupRequest}
          />
        </div>
        <div className='col-md-3'></div>
      </div>
    );
  }
}


export default connect(null,{userSignupRequest,addFlashMessage,isUserExists})(SignupPage);

