import type { PublicUser } from '../modules/user/user.types.js'; 

declare global {
	namespace Express {
		interface Locals {
			userId: number;
		}
	}
}

// КОммнетарий : 
// Это типизация рес.локалс. 
