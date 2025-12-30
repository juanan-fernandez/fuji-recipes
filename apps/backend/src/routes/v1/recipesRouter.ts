import express from 'express'
import {
	getAllRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe
} from '../../controllers/recipesController'

const router = express.Router()

//list of all recipes
router.get('/', getAllRecipes)

//get recipe by id
router.get('/:id', getRecipeById)

router.post('/', createRecipe)

router.put('/:id', updateRecipe)

router.delete('/:id', deleteRecipe)

export default router
