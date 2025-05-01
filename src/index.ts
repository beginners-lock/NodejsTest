import express from 'express';
import { configDotenv } from 'dotenv';
import { errorEmitter, emitError, onError } from './emitters/errorEmitter';
import { requestLogger } from './middleware/requestLogger';
import { employeeRouter } from './routes/employee';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth';
import { verifyJwt } from './middleware/verifyJwt';
import { renewToken } from './controllers/renewToken';
import { signout } from './controllers/signout';

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

app.use('/auth', authRouter);

app.use('/employee', verifyJwt, employeeRouter);

app.get('/renewtoken', renewToken);

app.get('/signout', signout);

app.get('/checker', (req, res)=>{
    res.status(200).send('I see you 👀');
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT} 🚀`);
});

errorEmitter.on("error", (message, route, method, origin)=>{
    onError(message, route, method, origin);
});