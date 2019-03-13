import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


import SignupForm from './SignupForm';
import {userSignupRequest} from '../../actions/signupActions';

class SignupPage extends Component {
  static propTypes = {
    userSignupRequest:propTypes.func.isRequired
  }
  render() {
    // console.dir(this.props);从这里可以看出可以取得history也就是历史页面值；然后传给signupForm即history={this.props.history}；使其能进行成功获得request返回信息时候跳转到历史上一个页面
    return (
      <div className="row">
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <SignupForm history={this.props.history} userSignupRequest={this.props.userSignupRequest}/>
        </div>
        <div className='col-md-3'></div>
      </div>
    );
  }
}


export default connect(null,{userSignupRequest})(SignupPage);

