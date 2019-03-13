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