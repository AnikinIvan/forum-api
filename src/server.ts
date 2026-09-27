import express from 'express';
import router from './transport/routers/post.js';

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/posts', router)

app.listen(PORT, () => {
    console.log(`Сервер работает.`);
});