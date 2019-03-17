import express from 'express';

let router = express.Router();

router.post('/',(req,res)=>{
    res.status(201).json({success:true});
});

export default router;