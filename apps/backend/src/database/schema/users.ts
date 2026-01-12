import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('USERS', {
	id: integer('ID').primaryKey({ autoIncrement: true }),
	username: text('USERNAME').notNull().unique(), // email
	passwordHash: text('PASSWORD_HASH').notNull(),
	createdAt: text('created_at').notNull()
})
