import 'temporal-polyfill/global';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { hashPassword, verifyPassword } from './lib/hashpassword.js';
import type { PasswordHash } from './services/auth.types.js';
import { config } from './config.js';
import { PostModules} from './modules/post.js';
import { UserModules} from './modules/auth.js';
import { createJwt } from './lib/jwt.js';

const app = express();
const PORT = 3000;
const tokenService = createJwt();


app.use(cookieParser());

const passwordHash: PasswordHash = {
	hash: hashPassword,
	verify: verifyPassword,
};

app.use(express.json());
app.use(cors({ origin: config.origin, credentials: true }));
app.use('/posts', PostModules());
app.use('/user', UserModules(tokenService));

app.listen(config.port, () => {
	console.log(`Сервер работает на порту ${config.port}.`);
});

function hashToken(token: string): string {
	throw new Error('Function not implemented.');
}

// Комментарий : 
// Тут я поубирал лишнее, прям выглядит сладко теперь.
// Добавил app.use с функциями из src/modules.