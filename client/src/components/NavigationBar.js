import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';//类型检查库
import {logout} from '../actions/authActions';


class NavigationBar extends Component {
    static propTypes = {
        auth:PropTypes.object.isRequired,
        logout:PropTypes.func.isRequired
    }
   
    //做用户logout实际上就是将reducer中的state即auth的isAuthenticated改为false以及user改为{}
    logout = (e) => {
        e.preventDefault();//默认行为;保证其不会跳转
        this.props.logout();//这个是从外面传过来的函数
    }

    render() {
        const {isAuthenticated,user} = this.props.auth;//取出isAuthenticated和user这两个,一个用于判断用户是否已经登录;另外一个可以用于显示用户名

        const userLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" onClick = {this.logout}>{user.username}  Logout</a>
                </li>
            </ul>
        );
    
        const guestLinks =(
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
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

export default connect(mapStateToProps,{logout})(NavigationBar);













