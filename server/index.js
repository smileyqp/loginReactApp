import express from 'express';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';

let app = express();

app.use(bodyParser.json());
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/events',events);

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.listen(6060,()=> console.log('running on localhost:6060'));