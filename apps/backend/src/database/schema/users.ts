import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('USERS', {
	id: integer('ID').primaryKey({ autoIncrement: true }),
	username: text('USERNAME').notNull().unique(), // email
	passwordHash: text('PASSWORD_HASH').notNull(),
	createdAt: text('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
})
