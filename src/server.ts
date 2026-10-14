import express from 'express';
import { PostRepositories } from './repositories/post.js';
import { PostServices } from './services/post.js';
import { PostHandler } from './transport/handlers/post.js';
import { PostRouter } from './transport/routers/post.js';

const app = express()
const PORT = 3000

const repository = PostRepositories()
const service = PostServices(repository)
const handlers = PostHandler(service)
const router = PostRouter(handlers)

app.use(express.json())
app.use('/posts', router)


app.listen(PORT, () => {
    console.log(`Сервер работает.`);
});