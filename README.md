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



