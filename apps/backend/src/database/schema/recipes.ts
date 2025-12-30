// db/schema/recipes.ts
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const recipes = sqliteTable('RECIPES', {
	id: integer('ID').primaryKey({ autoIncrement: true }),
	recipeName: text('RECIPE_NAME').notNull(),
	author: text('AUTHOR').notNull(),
	url: text('URL'),
	cameraSensor: text('CAMERA_SENSOR'),
	film: text('FILM'),
	grain: text('GRAIN'),
	colorChromeEffect: text('COLOR_CHROME_EFFECT'),
	colorChromeFxBlue: text('COLOR_CHROME_FX_BLUE'),
	whiteBalance: text('WHITE_BALANCE'),
	dynamicRange: integer('DYNAMIC_RANGE'),
	highlight: integer('HIGHLIGHT'),
	shadow: integer('SHADOW'),
	color: integer('COLOR'),
	sharpness: integer('SHARPNESS'),
	nr: integer('NR'),
	clarity: integer('CLARITY'),
	expCompensation: text('EXP_COMPENSATION'),
	iso: text('ISO'),
	notes: text('NOTES'),
	createdAt: text('created_at').notNull(),
	updatedAt: text('updated_at').notNull()
})
