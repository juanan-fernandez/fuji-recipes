import { users } from '@db/schema/users'
import { turso } from '@db/dbclient'
import { eq } from 'drizzle-orm'
import { verifyPassword, generateToken, hashPassword } from '@utils/auth'

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

async function register(username: string, password: string): Promise<boolean> {
	// Verificar si el usuario ya existe
	const existingUser = await turso.select().from(users).where(eq(users.username, username)).all()
	if (existingUser.length > 0) return false

	// Hashear password
	const passwordHash = await hashPassword(password)

	// Insertar nuevo usuario
	await turso.insert(users).values({ username, passwordHash })

	return true
}

export { login, register }
