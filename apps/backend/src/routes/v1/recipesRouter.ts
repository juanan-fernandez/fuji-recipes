import express from 'express'
import {
	getAllRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe
} from '@controllers/recipesController'

import { authMiddleware } from '@middleware/authMiddleware'

const router = express.Router()

//list of all recipes
router.get('/', getAllRecipes)

//get recipe by id
router.get('/:id', getRecipeById)

router.post('/', authMiddleware, createRecipe)

router.put('/:id', authMiddleware, updateRecipe)

router.delete('/:id', authMiddleware, deleteRecipe)

export default router
