import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { recipes } from '../schema/recipes'

export type RecipeDB = InferSelectModel<typeof recipes>
export type NewRecipeDB = InferInsertModel<typeof recipes>
