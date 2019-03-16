import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';//类型检查库

class NavigationBar extends Component {
    static propTypes = {
        auth:PropTypes.object.isRequired
    }
   
    render() {
        const {isAuthenticated,user} = this.props.auth;//取出isAuthenticated和user这两个,一个用于判断用户是否已经登录;另外一个可以用于显示用户名

        const userLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">{user.username}  Logout</Link>
                </li>
            </ul>
        );
    
        const guestLinks =(
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className ='container'>
                <Link className="navbar-brand" to="/">SmileyqpLogin</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
        
                <div className="collapse navbar-collapse" id="navbarsExample03">
                   {isAuthenticated ? userLinks:guestLinks}
                </div>
            </div>
            </nav>
        );
  }
}


const mapStateToProps = (state) => {
    //console.log(state);//可以先打印出来再看怎么取得
    return {
        auth:state.auth//这个是在reducer中的index中定义的

    }
}

export default connect(mapStateToProps)(NavigationBar);













