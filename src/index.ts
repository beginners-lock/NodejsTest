import express from 'express';
import { configDotenv } from 'dotenv';
import { errorEmitter, emitError, onError } from './emitters/errorEmitter';
import { requestLogger } from './middleware/requestLogger';
import { employeeRouter } from './routes/employee';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/user';

const app = express();

configDotenv();

const PORT = process.env.PORT;

/*
    MIDDLEWARE
*/
//For the request logging
app.use(requestLogger);

//Parse cookies
app.use(cookieParser());

//Parse body to json
app.use(bodyParser.json());


app.use('/user', userRouter);

app.use('/employee', employeeRouter);


app.get('/checker', (req, res)=>{
    res.status(200).send('I see you 👀');
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT} 🚀`);
});

errorEmitter.on("error", (message, route, method, origin)=>{
    onError(message, route, method, origin);
});