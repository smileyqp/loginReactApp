import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from './components/NavigationBar';
import FlashMessageList from './components/flash/FlashMessageList'
import * as serviceWorker from './serviceWorker';


import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//引入路由模块
import {BrowserRouter as Router} from 'react-router-dom';
import routes from './routes';

import {createStore,applyMiddleware} from 'redux';
import rootReducers from './reducers';

import {Provider} from 'react-redux';

import setAuthorizationToken from './utils/setAuthorizationToken';

import jwtDecode from 'jwt-decode';//接到server端传过来的token之后前段进行解码
import {setCurrentUser} from './actions/loginActions'



const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk,logger),
    )
);


if(localStorage.jwtToken){//如果localStorage中存在这个jwtToken
    setAuthorizationToken(localStorage.jwtToken);//将浏览器的localStorage中的jwtToken取出来;在开始页面加载的时候调用这个方法将jwtToken放置到请求头里面,防止刷新的时候没有
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));//见loginAction中;这里的作用是当页面刷新时候,如果本地存储有token即用户已经处于一个登录的状态的时候,保持reducer中的值即保持登录状态

}

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <div>
            <NavigationBar />
            <FlashMessageList />
            {routes}
            </div>
        </Router>
       
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
