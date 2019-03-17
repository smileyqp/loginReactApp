import jwt from 'jsonwebtoken';
import config from '../config';//这个config放入的是秘钥内容
import User from '../models/user';

export default (req,res,next) => {

    const authorizationHeader = req.headers['authorization'];//请求头部
    //console.dir(req.headers);
    // console.log(authorizationHeader);//取到的一般是这样的 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiMTEiLCJpYXQiOjE1NTI4MDA4NjJ9.Hg3B1ovPH-KoIyv58cpHVnJpWFMpesu2tjXLqxztdZI

    let token;

    if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];//注意这里是将头部用空格分开;取得Bearer之后的token部分
        
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


                //上面那种做法就是直接将数据库中该用户的数据全部给currentUser现在下面这种做法是只去除id,username以及email这三个放进currentUser对象中给用户
                User.query({
                    where: { id: decoded.id },
                    select: [ 'email', 'id', 'username' ]
                }).fetch().then(user => {
                  if (!user) {
                    res.status(404).json({ error: 'No such user' });
                  }
        
                  req.currentUser = user;//这里将数据库中user信息取出来赋值给currentUser,然后在event中返回给用户res
                  next();
                })
            }
        })
    }else{
        res.status(403).json({
            error:'No token provided'
        });
    }



}