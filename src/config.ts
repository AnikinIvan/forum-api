export function required(key: string): string {
	const value = process.env[key];

	if (!value || value.trim().length === 0) {
		throw new Error(`${key} required`);
	}

	return value.trim();
}

function isValueInteger(key: string): number {
	const value = required(key);
	const parsed = Number.parseInt(value, 10);

	if (Number.isNaN(parsed)){
		throw new Error(`"${value}" is incorrent`);
	}

	return parsed;
}

export const config = {
	jwtAccessSecret: required('JWT_ACCESS_SECRET'),
	jwtRefreshSecret: required('JWT_REFRESH_SECRET'),
	pepper: required('PEPPER'),
	databaseUrl: required('DATABASE_URL'),
	tokenAccessTime: isValueInteger('TOKEN_ACCESS_TIME'),
	tokenRefreshTime: isValueInteger('TOKEN_REFRESH_TIME'),
	port: isValueInteger('PORT'),
	origin: required('ORIGIN'),
} 


// Комментарий :
// Это конфиг.тс.
// Он выступает посредником между .env и другими файлами, обрабатывая value из .env.