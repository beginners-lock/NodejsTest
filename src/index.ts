import express from 'express';
import { configDotenv } from 'dotenv';

const app = express();

configDotenv();

const PORT = process.env.PORT;

app.get('/checker', (req, res)=>{
    res.status(200).send('I see you 👀');
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT} 🚀`);
})