import express from 'express';

let router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body);

});


//1、其请求路由为api/users/articles
// router.post('/articles',()=>{
// });


//2、还可以有其他的方法例如get
// router.get('/',(req,res)=>{
// });
export default router;