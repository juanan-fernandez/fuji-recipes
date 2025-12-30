import { Request, Response } from 'express'
//import { Recipe } from '@fujirecipes/shared/dist/types/recipeTypes'
import { RecipeDB, NewRecipeDB, UpdateRecipeDB } from '@backend/database'
import * as recipeSrv from '../services/recipesService'

interface RecipeParams {
	id: number
}

async function getAllRecipes(req: Request, res: Response): Promise<void> {
	const recipes: RecipeDB[] = await recipeSrv.getAllRecipes()
	res.json({ message: 'List of all recipes', data: recipes })
}

async function getRecipeById(req: Request<RecipeParams>, res: Response): Promise<void> {
	try {
		const { id } = req.params
		const recipe: RecipeDB | null = await recipeSrv.getRecipeById(id)
		if (!recipe) {
			res.status(404).json({ message: `Recipe con ID: ${id} no encontrada` })
			return
		}
		res.json({ message: `Recipe con ID: ${id} encontrada`, data: recipe })
	} catch (error) {
		res.status(500).json({ error: (error as Error).message })
		return
	}
}

async function createRecipe(req: Request<NewRecipeDB>, res: Response): Promise<void> {
	try {
		const body: NewRecipeDB = req.body
		const result = await recipeSrv.createRecipe(body)

		res.status(201).json({
			message: 'Receta creada con éxito',
			id: result.lastInsertRowid
		})
	} catch (error) {
		res.status(500).json({ error: (error as Error).message })
	}
}

async function updateRecipe(
	req: Request<RecipeParams, UpdateRecipeDB>,
	res: Response
): Promise<void> {
	try {
		const { id } = req.params
		const data: UpdateRecipeDB = req.body
		const result = await recipeSrv.updateRecipe(id, data)
		if (!result || result.rowsAffected === 0) {
			res.status(404).json({
				message: `Recipe con ID: ${id} no encontrada o no existen datos para actualizar`
			})
			return
		}

		res.json({ message: `Datos actualizados correctamente Recipe ID: ${id}`, data })
	} catch (error) {
		res.status(500).json({ error: (error as Error).message })
	}
}

async function deleteRecipe(req: Request<RecipeParams>, res: Response): Promise<void> {
	try {
		const { id } = req.params
		const result = await recipeSrv.deleteRecipe(id)
		if (!result || result.rowsAffected === 0) {
			res.status(404).json({ message: `Recipe con ID: ${id} no encontrada` })
			return
		}
		res.json({ message: `Deleted recipe with ID: ${id}` })
	} catch (error) {
		res.status(500).json({ error: (error as Error).message })
	}
}

export { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
