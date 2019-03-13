注意：client中开启的命令为：npm start</br>
在server中开启的命令：npm start；这个是直接在整个项目下进行npm start命令便可</br>
因为配置了： "start": "nodemon --watch server --exec babel-node -- server/index.js"</br>
nodemon是为了前段刷新时候实时刷新不用重启的一个配置</br>
</br></br>

1、在整个项目目录下</br>
创建server和client两个包分别放置server和前端代码；</br>
整个项目根目录下执行下面两个创建json目录进行项目初始化以及安装express框架</br>
npm init -y</br>
npm install express --save</br>
</br>
</br>
2、如何解决ES6语法转化问题？</br>
安装babel;babel是用于ES6语法解析,babel网址：https://babel.bootcss.com/</br>
npm install --save-dev babel-cli babel-preset-env</br>
创建 .babelrc 文件</br>
{</br>
  "presets": ["env"]</br>
}</br>
之后在package.json中添加</br>
"start": "babel-node server/index.js"</br>
</br>
</br>
3、如何解决修改代码之后刷新不能立即生效问题？</br>
npm install nodemon --save-dev</br>
然后package.json中配置改为 "start": " nodemon --watch server --exec babel-node -- server/index.js"</br>
</br>
</br>
4、前端页面布局开始</br>
引入bootstrap，在index.html中
<link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"></br>
bootstrap用到的样式网址：https://getbootstrap.com/docs/4.3/examples/navbars/</br>
</br>
</br>
5、添加引入路由的库</br>
npm install react-router-dom --save</br>

</br>
</br>
6、安装axios用于post数据</br>
npm install axios</br>

</br>
7、在全局的安装body-parser</br>
npm install body-parser --save</br>
并在server中的index中引用body-parser</br>
import bodyParser from 'body-parser';</br>
app.use(bodyParser.json());</br>
</br>
</br>
8、在client的package.json中添加 "proxy": "http://localhost:6060"</br>


</br>
9.注意clone下来之后在整个项目目录下面添加.babelrc文件，里面加上</br>
{
    "presets": ["env"]
}
</br></br>

10、用于做表单前段过滤验证的js库</br>
https://github.com/chriso/validator.js</br>
整个项目安装validator库</br>
npm install validator --save</br>
</br>
</br>
11.整个项目下安装lodash库</br>
npm install lodash --save</br>

12.此点结合10和11；主要是怎样进行为空错误处理
后端接收前台传过来的请求；对应的URL定位到register的



13.缕清前后台数据交互方式
### 前台请求发送部分
*  在SignupForm中。用state对象存储username、email、password、passwordConfirm等信息
* 在其form表单中将value值设置成this.state.username等；让state中的对象实时与state保持一致（注意别忘记添加onchangeFunction;因为react中的是唯一数据源）
* 在SignupForm表单中的form中添加onSubmit={this.onSubmit}这个function；并且这个function是触发了action为userSignupRequest（这个function是带参数为当时表单穿进去的数据的state对象）的function;这个userSignupRequest的function是在SignupPage中的时直接引用进来之后通过SignupForm组件传给SignupForm的
* 在SignupActions中的userSignupRequest方法引入了axios用于dispatch数据；比如此处是进行post数据给后台；此时dispatch也是带了当时传进来的数据state；dispatch之后带的两个参数分别为请求路径以及请求数据axios.post('/api/users',userData)
* 到了次部前台基本流程结束；不过在json中添加一个响应代理服务器；当前是加上后台响应的localhost:6060
* 此时前台发送请求就基本结束

### 后台接收请求部分
* 后台在整个项目安装bodyParser(路径解析)；以及babel(ES6语法解析)；并进行引用，在index页面引用bodyParser；
* 在server的index中进行路径解析；判断前端传过来的是请求哪一个路径的；并进行匹配；例如此处进行请求的路由为/api/users；那么index中为app.use('/api/users',users);对应的users进入users.js中进行继续匹配
* 匹配到users.js中之后，查看请求类型；此案例中请求的类型为post；那么对应users.js中为(注意；users.js中的路由；虽然是'/'但是其实其根目录是相对于/api/users而言；并且users.js中还可以有其他的请求方法以及请求路径；详情见users.js中注释部分)
router.post('/',(req,res)=>{
    //console.log(req.body);
    const {errors,isValid} = validateInput(req.body);
    if(!isValid){
        res.status(400).json(errors);
    }
});

* 此案例中接下来进行的部分是前台传过来的表单state进行是否为空验证