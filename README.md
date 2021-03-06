
# React&Redux+node.js+postgreSQL实现登录认证系统

注意：client中开启的命令为：npm start</br>
在server中开启的命令：npm start；这个是直接在整个项目下进行npm start命令便可</br>
因为配置了：

```shell
"start": "nodemon --watch server --exec babel-node -- server/index.js"</br>
```

nodemon是为了前端刷新时候实时刷新不用重启的一个配置</br>
fork运行执行(立即执行) ...是ES6的展开运算符
</br>
![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/login.png)

#### 1、在整个项目目录下</br>
创建server和client两个包分别放置server和前端代码；</br>
整个项目根目录下执行下面两个创建json目录进行项目初始化以及安装express框架

```shell
npm init -y</br>
npm install express --save
```

#### 2、如何解决ES6语法转化问题？</br>
安装babel;babel是用于ES6语法解析,babel网址：https://babel.bootcss.com/</br>
npm install --save-dev babel-cli babel-preset-env</br>
创建 .babelrc 文件</br>

```shell
{
  "presets": ["env"]
}
```

之后在package.json中添加

```shell
"start": "babel-node server/index.js"
```

#### 3、如何解决修改代码之后刷新不能立即生效问题？</br>
npm install nodemon --save-dev</br>
然后package.json中配置改为 "start": " nodemon --watch server --exec babel-node -- server/index.js"</br>
</br>
</br>
#### 4、前端页面布局开始</br>
引入bootstrap，在index.html中

```shell
<link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"></br>
```

bootstrap用到的样式网址：https://getbootstrap.com/docs/4.3/examples/navbars/</br>

#### 5、添加引入路由的库</br>

```shell
npm install react-router-dom --save
```

#### 6、安装axios用于发送请求;post数据等</br>

```shell
npm install axios
```

#### 7、在全局的安装body-parser</br>

```shell
npm install body-parser --save
```

并在server中的index中引用body-parser</br>

```shell
import bodyParser from 'body-parser';
app.use(bodyParser.json());
```

#### 8、在client的package.json中添加 "proxy": "http://localhost:6060"</br>

#### 9.注意clone下来之后在整个项目目录下面添加.babelrc文件，里面加上</br>

```shell
{
    "presets": ["env"]
}
```

#### 10、用于做表单前段过滤验证的js库</br>
https://github.com/chriso/validator.js</br>
整个项目安装validator库

```shell
npm install validator --save
```

#### 11.整个项目下安装lodash库(安装lodash用其中的isEmpty方法(详情见users.js中))</br>

```shell
npm install lodash --save

import isEmpty from 'lodash/isEmpty';
```

#### 12.此点结合10和11；主要是怎样进行为空错误处理</br>
后端接收前台传过来的请求；对应的URL定位到register的</br>
</br>
#### 13.整个项目安装classnames库；来解决表单错误提示时候是否明显问题；即作用为，动态改变控制节点的className属性来改变其样式(见signupForm中实例)

```shell
npm install classnames
import classnames from 'classnames';
className={classnames('form-control',{'is-invalid':errors.username})}
```

解释：is-invalid这个className的值是errors.username;当errors.username存在时候为true这个clasName存在；当errors.username不存在，那么这个is-invalid也是为false不显示的</br>

#### 14、做注册跳转：</br>
方法一:是直接通过其父组件拿到其history的属性；然后push到上一个页面即:

```shell
//signupPage中
<SignupForm history={this.props.history} userSignupRequest={this.props.userSignupRequest}/>
//signupForm中,在form表单请求返回中，返回成功的话就push定位到上一个历史记录即login等界面
this.props.userSignupRequest(this.state).then(
    () => {
        this.props.history.push('/');
    },
    ({response}) => {
        this.setState({errors:response.data,isLoading:false})}
);
```

方法二:SignupForm中直接引入withRouter；然后再在导出的时候使用withRouter这个方法

```shell
import {withRouter} from 'react-router-dom';

export default withRouter(SignupForm);

//push部分的代码不变
this.props.userSignupRequest(this.state).then(
    () => {
        this.props.history.push('/');
    },
    ({response}) => {
        this.setState({errors:response.data,isLoading:false})}
);
```

方法三：取出上下文

```shell
import PropTypes from 'prop-types';

static propTypes = {
    router:PropTypes.object
}
```

#### 15、添加flash
在client中安装shortid这个库,这个库是用来生成唯一的随机数，保证唯一性（详情使用见reducer中的flashMessage.js中）
![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/flashmessage.png)

```shell
npm install shortid --save

import shortid from 'shortid';

case ADD_FLASH_MEASSAGE:
    return [
        ...state,//原来的state
        {
            id:shortid.generate(),//shortid是查询随机数保证它唯一的
            type:action.message.type,
            text:action.message.text
        }
    ]
```

##### flash实现的具体流程：

```shell
//reducer中添加flashMessage;并在reducer中的index中引入；这样在state中便可以用flashMessage获得
import {ADD_FLASH_MEASSAGE} from '../constants';
import shortid from 'shortid';

const flashMessages = (state = [],action = {}) => {
    switch(action.type){
        case ADD_FLASH_MEASSAGE:
            return [
                ...state,//原来的state
                {
                    id:shortid.generate(),//shortid是查询随机数保证它唯一的
                    type:action.message.type,
                    text:action.message.text
                }
            ]
        default: return state;
    }
}

export default flashMessages;
```

```shell
//action中添加addFlashMessage这个function
import {ADD_FLASH_MEASSAGE} from '../constants';

export const addFlashMessage = (message) => {
    return {
        type:ADD_FLASH_MEASSAGE,
        message
    }
}
```

```shell
组件FlashMessageList中，用connect连接，并且用mapStateToProps取得flashMessage的state
//这个是返回reducer中的flashMessages;将state传过来；并在组件中用propTypes取得冰川个子组件flashMessage
class FlashMessageList extends Component {
    static propTypes = {
        messages:PropTypes.array.isRequired//从reducer中的flashMessages中得知传过来的messages是一个数组
    }
    render(){
        const messages = this.props.messages.map(message =>
            <FlashMessage key = {message.id} message = {message}/>
        );
        return(
            <div className='container'>
                {messages}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages:state.flashMessages
    }
}

export default connect(mapStateToProps)(FlashMessageList); 
```

```shell
//子组件获得值并用classnames进行判断显示
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

```

```shell
//并且在signupForm中数据成功返回时候，触发了addFlashMessage这个action反悔了type以及text
onSubmit = (e) =>{
    e.preventDefault();
    this.setState({errors:{},isLoading:true});
    this.props.userSignupRequest(this.state).then(
        () => {
            this.props.addFlashMessage({
                type:'success',
                text:'You signed up successfully.Welcome!'
            });
            this.props.history.push('/');
        },
        ({response}) => {this.setState({errors:response.data,isLoading:false})}
    );
}

```

##### 关于flash删除按钮
flashMessage中添加btn并且添加onClick事件；</br>
deleteFlashMessage在flashMessage的父组件中引入；</br>
onclick时间响应deleteFlashMessage这个action；</br>
action响应后reducer监听到了DELETE_FLASH_MESSAGE这个type；</br>
之后进行删除操作;</br>

![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/delete.png)

```shell
export const deleteFlashMessage = (id) => {
    return {
        type:DELETE_FLASH_MESSAGE,
        id
    }
}
```

```shell
 case DELETE_FLASH_MESSAGE:
    const index = findIndex(state,{id:action.id})//fliter方法，找出所在记录；找出它在数组state中的位置
    if(index >= 0){     //找不到是返回-1
        return[
            ...state.slice(0,index),
            ...state.slice(index+1)
        ]
    }
    return state;//没有找到返回原来的state
```

#### 16、安装postgresql

```shell
//安装postgresql
sudo npm install postgresql
//重启postgresql
sudo service postgresql restart
//进入postgresql数据库之中
sudo su postgres -c psql postgresql
//开启服务
service postgresql start
//关闭服务
service postgresql stop
//设置开机自启动
chkconfig --add postgresql
//进入数据库密码yqp1314520
sudo su postgres
//数据库操作
createdb redux      //创建数据库
psql -l             //罗列出所有的数据库

psql postgres       //连接到数据库中su postgres -c psql postgresql
create database reduxtest//另外一种方法创建数据库


----------------------------
sudo su - postgres
//创建数据库
createdb reduxlogin
//进入数据库
postgres@yq-System-Product-Name:~$ psql reduxlogin


-------------------------------
基本常用操作
su - postgres
psql
默认用户postgres的密码为yqp1314520
创建了新用户的用户名:smileyqp,密码：yqp1314520(CREATE USER smileyqp WITH PASSWORD 'yqp1314520';)创建新用户yq密码123456数据库yq(psql -U yq -d yq -W进入)
创建新用户所有权限的数据库smileyqpDb(CREATE DATABASE smileyqpDb OWNER smileyqp;)


常用的控制台命令
\password           设置密码
\q                  退出
\h                  查看SQL命令的解释，比如\h select
\?                  查看psql命令列表
\l                  列出所有数据库
\c [database_name]  连接其他数据库
\d                  列出当前数据库的所有表格
\d [table_name]     列出某一张表格的结构
\x                  对数据做展开操作
\du                 列出所有用户
```

#### 17、knex.js
为数据库提供统一个接口以及提供强大的查询功能
https://github.com/tgriesser/knex

```shell
//在整个项目中安装knex
npm install knex --save
//安装knex的命令
sudo npm install -g knex
//初始化,会生成knexfile.js整个初始化配置文件
knex init
//整个项目中安装
npm install pg --save(如果是mysql数据库的话：npm install mysql --save)

//创建migrations中的一个文件；这里面的是进行创建表的操作
knex migrate:make users
//执行最近的migrations，即创建表；knex --help可以查看knex的一些操作命令
knex migrate:latest
//这里面实在yq用户有的yq数据库下面创建了users表；查看users表方法
psql yq//进入数据库
\d     //查看数据库中的表
\d users //查看users表中的列值
```

![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/yqDb.png)

![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/yqdb_knex_table.png)

![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/yqdb_table.png)

##### 18.bookshelf(A simple Node.js ORM for PostgreSQL, MySQL and SQLite3 built on top of Knex.js )
bookshelf是一个基于knex的一个简单的node.js对象关系映射;ORM(object relational mapping)用于实现面向对象编程语言里的不同类型数据之间的转换;实际上就是将数据库里面的内容映射到代码中来
https://github.com/bookshelf/bookshelf

```shell
npm install bookshelf --save
```


#### 19、node.bcrypt.js广泛使用的一个加密的库
https://github.com/kelektiv/node.bcrypt.js

```shell
//安装bcrypt
npm install bcrypt --save
//具体使用见server/routes/users.js
import bcrypt from 'bcrypt';

const password_digest = bcrypt.hashSync(password,10);
```

```shell
//数据库中查看用户注册信息
psql yq                 //进入yq数据库
select * from users;    //查看users中的所有数据
```

![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/registed_data.png)



#### 20.服务器端唯一性验证:重复用户名邮件的时候返回给用户提示(详情见server/routes/users.js;以及可以对照dev分支上的修改前的源码)

![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/repeated.png)

```shell
//引入Promise的库;注意项目最终使用的方法中没有使用Promise而是改用另外一种方法,详情见server/routes/users.js中
npm install bluebird --save
//导入Promise
import Promise from 'bluebird';

```

#### 21.客户端唯一性验证:即输入框失焦时候触发onBlur时间,触发action给后台request查询数据库中是否已经存在username以及email如果存在返回user以及给用户提示

![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/onBlur.png)

![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/onBlur_new.png)

```shell
//1.给输入框添加onBlur事件以及写其触发的checkUserExists方法
checkUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    if(val !== ''){
        this.props.isUserExists(val).then(res =>{
            let errors = this.state.errors;
            if(res.data.user){
                errors[field] = 'There is user with such '+ field;
            }else{
                errors[field] = '';
            }
            this.setState({errors});
        })
    }
}

//2.action(signupAction)添加isUserExists方法用于异步分发;注意在checkUserExists中触发isUserExists方法注意isUserExists方法的引入
export const isUserExists = (identifier) =>{
    return dispatch =>{
        return axios.get(`/api/users/${identifier}`,identifier)
    }
}

//3.在server处匹配路由在server/routes/users.js中;注意这边dispatch过去是get方法;那边接收也是get方法;然后对其进行数据库查询等处理
router.get('/:identifier',(req,res)=>{
    User.query({
        select:['username','email'],
        where:{email:req.params.identifier},
        orWhere:{username:req.params.identifier}
    }).fetch().then(user => {
        res.json({user});
    })
})

```


#### 22.session,cookie,jwt(json web token)
* http协议是一种无状态协议
cookie是保存在浏览器端的;
session是保存在服务器端的(注意session也是可以用cookie来存储的;session还是依赖于浏览器端的数据库的,比如cookie以及local storage)(每次请求带上用户的id)
第一次登陆时候,服务器就响应一些信息比如说cookies;
cookies是有长度限制的以及在分布式应用中有局限性的;
简单理解就是cookies是浏览器的数据库;
本地数据库有很多种,比如说本地存储Local Storage(local Storage是与网址相对应的,每个网址都有相对应的localstorage)
jwt可以用cookie存储也可以用local storage来存储

* 一般而言就是cookies和session相互配合:
cookie可以村部分的数据也是可以存储全部的数据;
如果存储部分的数据,那么session可以在服务器端存到内存中也可以存到数据库中比如mysql,redis等;
如果cookie存储的是全部的数据那么session充当的知知识一个计算的角色,知识将加密的cookies解密出来得到里面的数据内容


* jwt(json web token)
token就是一个串,是在服务器中加密的,根据秘钥进行对称加密;服务器端将信息根据秘钥进行对称加密之后再将这个串返回给浏览器;浏览器再将这个串记录起来保存到数据库中;之后每次浏览器发送请求的时候都要将这个串带过来;带到服务器中服务器再将这个串进行解密,得到其中的数据



![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/local_database.png)


#### 23.jwt(json web token;具体使用见server/rouites/auth.js)
jwt详细介绍https://www.cnblogs.com/java-jun-world2099/p/9146143.html
jwt由三部分组成header,payload,signature(头部,载荷和签名)

```shell
//安装
 npm install jsonwebtoken --save
//引用
import jwt from 'jsonwebtoken';
```

#### 24.将token存到localstorage并保存到header中

* 浏览器端点击登录按钮,触发loginaction事件,dispatch往server端发送request请求
* server端接收到请求,匹配路由auth;之后进入数据库中进行查询,看是否数据库中华存在该用户;
不存在,返回一个401错误给客户端并且带上form信息用于返回给用户提示哪里错误;
如果该用户存在,那么引入jwt库,返回给用户一个进行加密之后的token(具体见server/routes/auth.js);
* 用户请求的loginAction.js中返回server端的数据取得这个server端传过来的token值;此时客户端首先将这个token存入localstorage(用键值对存储;此处取得名字叫做jwtToken)中,之后由于每次客户端向服务器请求都要带上这个token,因此要将这个toen放进请求头中,于是在返回这个token之后将其放入请求头,并且为了放置每次刷新失效于是在整个项目的index.js中调用utils中的setAuthorization方法,讲话token在页面刷新的时候就将其从localstoeage中取出来然后放进请求头中,这样只要localstorage中存在这个token那么其就会在这个用户每次进行请求的时候得到

#### 25.客户端解析token,并将用户信息保存到reducer中;并且在index页面做处理,让用户及时刷新页面也不丢失登录状态 (详情见loginActions.js)

步骤:

* client客户端接收到server端传过来的成功用户验证后,用dispatch分发给reducer
dispatch(setCurrentUser(jwtDecode(token)));
* 在reducer中的auth.js收到这个消息之后,改变state中的值isAuthenticated改为true即用户登录状态,将初始化的user状态改为token中传过去的user对象
* 为了保证刷新的时候登录状态不丢失,在index.js中,进行判断是否localstorage中有jwtToken,如果有这个token再dispatch给reducer

```shell
npm install jwt-token

import jwtDecode from 'jwt-decode';

jwtDecode(token)//这一句是进行token的jwt解析的,即系出来的数据就是server传给客户端的


if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}
```

#### 26.实现用户登录,登录状态控制显示(登录状态显示注销按钮)

```shell
//在NavigationBar.js这个页面引入connnect并且取得state中的auth
const mapStateToProps = (state) => {
    //console.log(state);//可以先打印出来再看怎么取得
    return {
        auth:state.auth//这个是在reducer中的index中定义的

    }
}
//PropTypes进行验证数据,然后render中取得数据
static propTypes = {
    auth:PropTypes.object.isRequired
}
//render中取得isAuthenticated标示用户登录的一个状态;user是当时从token中解析的一个用户数据对象;
const {isAuthenticated,user} = this.props.auth;
```

#### 27.实现用户登出

给logout这个button添加logout这个时间;这个事件中的logout调用引用的actions/authActions.js中的logout事件;并进行一些列操作:

* 清除浏览器中的localStorage中的jwtToken
* 清楚请求时候头部headers中的认证;这个在前面几点中有设置的
* 调用方法将当前用户设置成空并且将登录状态设置成空

```shell
//给log out添加事件
 logout = (e) => {
    e.preventDefault();
    this.props.logout();
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');//清除浏览器的localStorage中的jwtToken;
        setAuthorizationToken(false);//这里是将头部的认证信息Authorization删除,以后不带上头部认证信息
        dispatch(setCurrentUser({}));//传入一个空对象;
    }
}

```

#### 28.实现用户登录才有权限操作

步骤(http://localhost:3000/new-event页面):
* 用户进入new-event页面;点击create这个按钮触发事件即eventAction中的createEvent,这个function将state带去请求'/api/events'这个url
* 后台server端接收到了请求,在匹配到路由'/api/events';在进行返回res之前进行中间件authenticate中的操作

```shell
router.post('/',authenticate,(req,res)=>{
    res.status(201).json({user:req.currentUser});
});
```

* 中间件中,取得请求头部并且取出里面的token;并且对token进行解析,对其解析出来的进行分支判断返回给用户信息;如果数据库中成功查询到了这个人,就返回该用户的信息;执行完中间件之后在进入events,将请求res传给用户

```shell
    const authorizationHeader = req.headers['authorization'];//请求头部
    let token;
    if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];
    }


     if(token){//如果取到token
        jwt.verify(token,config.jwtSecret,(err,decoded) => {    //解析token进行判断
            if(err){
                res.status(401).json({error:'Fali to authenticate'});
            }else{
                //console.log(decoded);
                // new User({id:decoded.id}).fetch().then(user => {    //如果config中秘钥验证通过;从数据库中去找数据
                //     if(!user){
                //         res.status(404).json({error:'No such user'});
                //     }
                //     req.currentUser = user;
                //     next();
                // })

 
                User.query({
                    where: { id: decoded.id },
                    select: [ 'email', 'id', 'username' ]
                }).fetch().then(user => {
                  if (!user) {
                    res.status(404).json({ error: 'No such user' });
                  }      
                  req.currentUser = user;
                  next();
                })
            }
        })
    }else{
        res.status(403).json({
            error:'No token provided'
        });
    }

```
![Image text](https://github.com/smileyqp/loginReactApp/blob/master/README_PIC/limit_operation.png)



#### 29.实现用户登录才能进入某个页面

```shell
//在client的routes.js中引入requireAuth;并给要登录才能访问的页面加上
<Route path='/new-event' component={ requireAuth(NewEventPage) }/>



//这个是requireAuth.js中定义一个高阶组件的操作

export default function (ComposedComponent){
    class Authenticate extends Component{
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.props.addFlashMessage({
                    type:'danger',
                    text:'You need to login to access this page!'
                });
                this.context.router.history.push('/');
            }
        }
        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
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



```





## 缕清整个项目前后台数据交互方式
### 前台请求发送部分
*  在SignupForm中。用state对象存储username、email、password、passwordConfirm等信息</br>
* 在其form表单中将value值设置成this.state.username等；让state中的对象实时与state保持一致（注意别忘记添加onchangeFunction;因为react中的是唯一数据源）</br>
* 在SignupForm表单中的form中添加onSubmit={this.onSubmit}这个function；并且这个function是触发了action为userSignupRequest（这个function是带参数为当时表单穿进去的数据的state对象）的function;这个userSignupRequest的function是在SignupPage中的时直接引用进来之后通过SignupForm组件传给SignupForm的</br>
* 在SignupActions中的userSignupRequest方法引入了axios用于dispatch数据；比如此处是进行post数据给后台；此时dispatch也是带了当时传进来的数据state；dispatch之后带的两个参数分别为请求路径以及请求数据axios.post('/api/users',userData)</br>
* 到了次部前台基本流程结束；不过在json中添加一个响应代理服务器；当前是加上后台响应的localhost:6060</br>
* 此时前台发送请求就基本结束</br>

### 后台接收请求部分
* 后台在整个项目安装bodyParser(路径解析)；以及babel(ES6语法解析)；并进行引用，在index页面引用bodyParser；</br>
* 在server的index中进行路径解析；判断前端传过来的是请求哪一个路径的；并进行匹配；例如此处进行请求的路由为/api/users；那么index中为app.use('/api/users',users);对应的users进入users.js中进行继续匹配</br>
* 匹配到users.js中之后，查看请求类型；此案例中请求的类型为post；那么对应users.js中为(注意；users.js中的路由；虽然是'/'但是其实其根目录是相对于/api/users而言；并且users.js中还可以有其他的请求方法以及请求路径；详情见users.js中注释部分)</br>

```shell
router.post('/',(req,res)=>{
    //console.log(req.body);
    const {errors,isValid} = validateInput(req.body);
    if(!isValid){
        res.status(400).json(errors);
    }
});
```

* 此案例中接下来进行的部分是前台传过来的表单state进行是否为空验证;安装validator，validator是一个用于表单验证的第三方库；安装lodash用其中的isEmpty方法(详情见users.js中)；此时整个后台就可以对传过来的表单数据进行验证，如果为空就可以将错误信息传给前台</br>
* 前台signupForm.js中的submit中的一个dispath的axio方法有then方法；then方法是一个request成功之后获得返回数据的一个方法：

```shell
this.props.userSignupRequest(this.state).then(
    () => {},
    ({response}) => {this.setState({errors:response.data,isLoading:false})}
);
```

* 然后在获得数据中将这个返回的errors放进state中；然后在render中获得errors渲染在页面上(isLoading是放置重复提交；前一个errors.username用于判断是否显示后面的，有显示没有不显示)</br>

```shell
const {errors} = this.state;//提取错误信息
{errors.username && <span className='form-text form-muted'>{errors.username}</span>} 
```
