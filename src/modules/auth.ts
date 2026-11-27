import { hashPassword, verifyPassword } from '../lib/hashpassword.js';
import type { TokenService } from '../services/auth.types.js';
import { db } from '../prisma/db.js';
import { createRefreshSessionRepository } from '../repositories/refreshSession.js';
import { UserRepositories } from '../repositories/auth.js';
import { UserServices } from '../services/auth.js';
import { createUserHandler } from '../transport/handlers/auth.js';
import { UserRouter } from '../transport/routers/auth.js';

export function UserModules(tokenService: TokenService) {
	const passwordHash = {
		hash: hashPassword,
		verify: verifyPassword,
	};

	const userRepository = UserRepositories(db);
	const refreshSessionRepository = createRefreshSessionRepository(db);

	const userService = UserServices(
		userRepository,
		passwordHash,
		tokenService,
		refreshSessionRepository,
	);

	const userHandler = createUserHandler(userService);
	return UserRouter(userHandler);
}


// Комментарий : 
// Этот файл нужен, чтобы не засорять server.ts. Сам по себе он делает тоже самое, что делал server.ts,
// но существует, дабы по разным файлам разделять вызов сервисов, хэндлеров и т.д., а не пихать все в один.

