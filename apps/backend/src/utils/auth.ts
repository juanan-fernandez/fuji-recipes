import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'
const JWT_EXPIRES_IN = '1h' // tiempo de validez

// 🔹 Hash del password
export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, SALT_ROUNDS)
}

// 🔹 Comparar password plano con hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash)
}

// 🔹 Generar token JWT
export function generateToken(userId: number): string {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// 🔹 Verificar token JWT
export function verifyToken(token: string): { userId: number } | null {
	try {
		return jwt.verify(token, JWT_SECRET) as { userId: number }
	} catch {
		return null
	}
}
