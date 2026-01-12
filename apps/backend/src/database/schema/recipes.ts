// database/schema/recipes.ts
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const recipes = sqliteTable('RECIPES', {
	id: integer('Id').primaryKey({ autoIncrement: true }),
	recipeName: text('RECIPE_NAME').notNull(),
	author: text('AUTHOR').notNull(),
	url: text('URL'),
	cameraSensor: text('CAMERA_SENSOR'),
	film: text('FILM').notNull(),
	grain: text('GRAIN').default('Off'),
	colorChromeEffect: text('COLOR_CHROME_EFFECT').default('Off'),
	colorChromeFxBlue: text('COLOR_CHROME_FX_BLUE'),
	whiteBalance: text('WHITE_BALANCE'),
	dynamicRange: text('DYNAMIC_RANGE').default('Auto'),
	highlight: integer('HIGHLIGHT').default(0),
	shadow: integer('SHADOW').default(0),
	color: integer('COLOR').default(0),
	sharpness: integer('SHARPNESS').default(0),
	nr: integer('NR').default(0),
	clarity: integer('CLARITY').default(0),
	expCompensation: text('EXP_COMPENSATION'),
	iso: text('ISO').default('Auto'),
	notes: text('NOTES'),
	createdAt: text('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),

	updatedAt: text('updated_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
})
