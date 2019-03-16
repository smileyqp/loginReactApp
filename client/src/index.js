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


const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk,logger),
    )
);

setAuthorizationToken(localStorage.jwtToken);//将浏览器的localStorage中的jwtToken取出来;在开始页面加载的饿时候调用这个方法将jwtToken放置到请求头里面,防止刷新的时候没有

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
