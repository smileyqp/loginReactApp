import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addFlashMessage} from '../actions/flashMessages';

export default function (ComposedComponent){
    class Authenticate extends Component{
        componentWillMount(){
            if(!this.props.isAuthenticated){//没有登录情况
                this.props.addFlashMessage({
                    type:'danger',//这个type是flashMessage中定义的要用
                    text:'You need to login to access this page!'
                });
                this.context.router.history.push('/');//返回历史页面
            }
        }
        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){//没有登录的情况
                this.context.router.history.push('/');
            }
        }
        render(){
            return (
            <ComposedComponent {...this.props}/>
            )
        }
    }

    Authenticate.protoType = {
        isAuthenticated:PropTypes.bool.isRequired,
        addFlashMessage:PropTypes.func.isRequired
    }

    //那个push到history的那个路由要从上下文中传入过来
    Authenticate.contextTypes = {
        router:PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated:state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps,{addFlashMessage})(Authenticate);

}


