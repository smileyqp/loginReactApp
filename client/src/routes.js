import React from 'react';

import {Route} from 'react-router-dom';
import App from './components/App';
import SignupPage from './components/signup/SignupPage';


//exact是'/'的路由包含了下面的其他路由因此要只是让一个显示要加上这个
export default(
    <div className='container'>
        <Route exact path='/' component={ App }/>
        <Route path='/signup' component={ SignupPage }/>
    </div>
);