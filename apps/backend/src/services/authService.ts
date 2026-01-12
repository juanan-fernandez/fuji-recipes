import { users } from '@db/schema/users'
import { turso } from '@db/dbclient'
import { eq } from 'drizzle-orm'
import { verifyPassword, generateToken } from '@utils/auth'

async function login(username: string, password: string): Promise<string | null> {
	// Buscar usuario en DB
	const result = await turso.select().from(users).where(eq(users.username, username)).all()

	if (result.length === 0) return null

	const user = result[0]

	// Verificar password
	const isValid = await verifyPassword(password, user.passwordHash)
	if (!isValid) return null

	// Generar JWT
	return generateToken(user.id)
}

export { login }
