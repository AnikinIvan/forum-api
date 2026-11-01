import "dotenv/config";
import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET;	
if (!accessSecret) throw new Error("JWT_ACCESS_SECRET required");

const refreshSecret = process.env.JWT_REFRESH_SECRET;
if (!refreshSecret) throw new Error("JWT_REFRESH_SECRET required");

export function signAccessToken(userId: number): string {
	return jwt.sign({}, accessSecret!, {
		algorithm: "HS256",
		subject: String(userId),
		expiresIn: Number(process.env.TOKEN_ACCESS_TIME),
	});
}

export function signRefreshToken(userId: number): string{
	return jwt.sign({type: 'refresh'}, refreshSecret!, {
		algorithm: "HS256",
		subject: String(userId),
		expiresIn: Number(process.env.TOKEN_REFRESH_TIME),
	});
}

export function verifyRefreshToken(token: string): number {
	const payload = jwt.verify(token, refreshSecret!, {algorithms: ["HS256"]})
    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
		throw new Error()
	}
    const userId = Number(payload.sub);
    if (!Number.isSafeInteger(userId) || userId <= 0) throw new Error()

    return userId 
}