import { turso } from '@db/dbclient'
import { recipes } from '@db/schema'
import { eq } from 'drizzle-orm'
//import { RecipeDB, mapRowToRecipe } from '@db/mappers/recipeMapper'
import { RecipeDB, NewRecipeDB } from '@db/types'
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

async function getAllRecipes(): Promise<RecipeDB[]> {
	try {
		const result = await turso.select().from(recipes).all()

		console.log('Fetched rows:', result)
		return result
	} catch (error) {
		console.error('Error fetching all recipes:', error)
		return []
	}
}

async function getRecipeById(id: number): Promise<RecipeDB | null> {
	try {
		const result = await turso.select().from(recipes).where(eq(recipes.id, id)).all()
		if (!result) return null
		console.log('Fetched recipe by ID:', result)
		return result[0]
	} catch (error) {
		console.error('Error fetching recipe by ID:', error)
		throw new Error('Error interno al obtener la receta por ID.')
	}
}

async function createRecipe(newRecipe: NewRecipeDB): Promise<CreateRecipeResult> {
	try {
		const result = await turso
			.insert(recipes)
			.values(newRecipe)
			.returning({ lastInsertRowid: recipes.id })

		console.log('Insert result:', result)
		return {
			success: true,
			lastInsertRowid: result[0].lastInsertRowid?.toString()
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
		await turso.delete(recipes).where(eq(recipes.id, id))
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
