import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

//load env variables
process.loadEnvFile()

export const client = createClient({
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN
})

export const turso = drizzle(client)
