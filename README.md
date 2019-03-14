
# React&Redux+node.js+postgreSQL实现登录认证系统

注意：client中开启的命令为：npm start</br>
在server中开启的命令：npm start；这个是直接在整个项目下进行npm start命令便可</br>
因为配置了：

```shell
"start": "nodemon --watch server --exec babel-node -- server/index.js"</br>
```

nodemon是为了前端刷新时候实时刷新不用重启的一个配置</br>
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

#### 6、安装axios用于post数据</br>

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
