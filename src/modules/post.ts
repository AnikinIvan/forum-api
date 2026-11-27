import { PostRepositories } from '../repositories/post.js';
import { PostServices } from '../services/post.js';
import { PostHandler } from '../transport/handlers/post.js';
import { PostRouter } from '../transport/routers/post.js';

export function PostModules() {
	const repository = PostRepositories();
	const service = PostServices(repository);
	const handlers = PostHandler(service);
	return PostRouter(handlers);
}


// Комментарий : 
// Этот файл нужен, чтобы не засорять server.ts. Сам по себе он делает тоже самое, что делал server.ts,
// но существует, дабы по разным файлам разделять вызов сервисов, хэндлеров и т.д., а не пихать все в один.
