import type { Config } from 'drizzle-kit'

//load env variables
process.loadEnvFile()

export default {
	schema: './src/database/schema',
	out: './drizzle',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!
	}
} satisfies Config
