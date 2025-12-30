import { turso } from '../database/dbclient'
import { Recipe } from '@fujirecipes/shared/dist/types/recipeTypes'

type CreateRecipeBody = Omit<Recipe, 'id'>
type UpdateRecipeBody = Partial<CreateRecipeBody>
type CreateRecipeResult = {
	success: boolean
	lastInsertRowid?: string
}
type UpdateRecipeResult = {
	success: boolean
	rowsAffected?: number
}

// types/RecipeDB.ts
export interface RecipeDB {
	Id: number
	RECIPE_NAME: string
	AUTHOR: string | null
	URL: string | null
	CAMERA_SENSOR: string | null
	FILM: string
	GRAIN: string | null
	COLOR_CHROME_EFFECT: string | null
	COLOR_CHROME_FX_BLUE: string | null
	WHITE_BALANCE: string | null
	DYNAMIC_RANGE: number | null
	HIGHLIGHT: number | null
	SHADOW: number | null
	COLOR: number | null
	SHARPNESS: number | null
	NR: number | null
	CLARITY: number | null
	EXP_COMPENSATION: string | null
	ISO: string | null
	NOTES: string | null
	created_at: string
	updated_at: string
}

function mapRowToRecipe(row: Partial<RecipeDB>): Recipe {
	return {
		id: row.Id || 0,
		recipeName: row.RECIPE_NAME || '',
		author: row.AUTHOR ?? 'unknown',
		url: row.URL || '',
		cameraSensor: row.CAMERA_SENSOR || '',
		film: row.FILM || '',
		grain: row.GRAIN ?? '',
		colorChromeEffect: row.COLOR_CHROME_EFFECT ?? '',
		colorChromeFxBlue: row.COLOR_CHROME_FX_BLUE ?? '',
		whiteBalance: row.WHITE_BALANCE ?? '',
		dynamicRange: row.DYNAMIC_RANGE ?? 0,
		highlight: row.HIGHLIGHT ?? 0,
		shadow: row.SHADOW ?? 0,
		color: row.COLOR ?? 0,
		sharpness: row.SHARPNESS ?? 0,
		nr: row.NR ?? 0,
		clarity: row.CLARITY ?? 0,
		expCompensation: row.EXP_COMPENSATION ?? '0',
		iso: row.ISO ?? 'auto',
		notes: row.NOTES ?? '',
		createdAt: row.created_at ?? '',
		updatedAt: row.updated_at ?? ''
	}
}

function mapRowsToRecipes(rows: RecipeDB[]): Recipe[] {
	return rows.map(mapRowToRecipe)
}

async function getAllRecipes(): Promise<Recipe[]> {
	try {
		const result = await turso.execute('SELECT * FROM RECIPES')
		console.log('Fetched rows:', result.rows)
		return mapRowsToRecipes(result.rows as unknown as RecipeDB[])
	} catch (error) {
		console.error('Error fetching all recipes:', error)
		return []
	}
}

async function getRecipeById(id: number): Promise<Recipe | null> {
	try {
		const result = await turso.execute('SELECT * FROM RECIPES WHERE id = ?', [id])
		if (!result) return null
		if (result.rows.length > 0) {
			const row = result.rows[0]
			console.log('Row data:', row)
			const recipe: Recipe = mapRowToRecipe(row as unknown as RecipeDB)
			return recipe
		}
		return null
	} catch (error) {
		console.error('Error fetching recipe by ID:', error)
	}
	return null
}

async function createRecipe(recipe: CreateRecipeBody): Promise<CreateRecipeResult> {
	try {
		const query = `
        INSERT INTO recipes (
          RECIPE_NAME, AUTHOR, URL, CAMERA_SENSOR, FILM, GRAIN, 
          COLOR_CHROME_EFFECT, COLOR_CHROME_FX_BLUE, WHITE_BALANCE, 
          DYNAMIC_RANGE, HIGHLIGHT, SHADOW, COLOR, SHARPNESS, NR, 
          CLARITY, EXP_COMPENSATION, ISO, NOTES
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

		const values = [
			recipe.recipeName,
			recipe.author,
			recipe.url,
			recipe.cameraSensor,
			recipe.film,
			recipe.grain,
			recipe.colorChromeEffect,
			recipe.colorChromeFxBlue,
			recipe.whiteBalance,
			recipe.dynamicRange,
			recipe.highlight,
			recipe.shadow,
			recipe.color,
			recipe.sharpness,
			recipe.nr,
			recipe.clarity,
			recipe.expCompensation,
			recipe.iso,
			recipe.notes
		]

		const result = await turso.execute({ sql: query, args: values })

		return {
			success: true,
			lastInsertRowid: result.lastInsertRowid?.toString()
		}
	} catch (error) {
		console.error('Error al insertar en Turso:', error)
		throw new Error('No se pudo guardar la receta en la base de datos.')
	}
}

async function updateRecipe(id: number, updateData: UpdateRecipeBody): Promise<UpdateRecipeResult> {
	try {
		// 1. Construimos la consulta dinámicamente según los campos presentes
		const fields = Object.keys(updateData)
		if (fields.length === 0) return { success: false }

		// Mapeamos las claves de JS a las columnas de la DB (Uppercase)
		const setClause = fields
			.map((key) => `${key.replace(/([A-Z])/g, '_$1').toUpperCase()} = ?`)
			.join(', ')

		const query = `UPDATE recipes SET ${setClause} WHERE id = ?`

		// 2. Preparamos los valores (añadiendo el ID al final para el WHERE)
		const values = [...Object.values(updateData), id]

		const result = await turso.execute({ sql: query, args: values })

		return {
			success: true,
			rowsAffected: result.rowsAffected
		}
	} catch (error) {
		console.error('Error al actualizar en Turso:', error)
		throw new Error('Error interno al actualizar la receta.')
	}
}

async function deleteRecipe(id: number): Promise<UpdateRecipeResult> {
	try {
		await turso.execute('DELETE FROM RECIPES WHERE id = ?', [id])
		return {
			success: true,
			rowsAffected: 1
		}
	} catch (error) {
		console.error('Error al eliminar en Turso:', error)
		throw new Error('Error interno al eliminar la receta.')
	}
}

export { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
