import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from './components/NavigationBar';
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


const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk,logger),
    )
);

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <div>
            <NavigationBar />
            {routes}
            </div>
        </Router>
       
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
