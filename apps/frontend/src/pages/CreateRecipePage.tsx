import RecipeForm from '@/features/recipes/RecipeForm'
import { useAuth } from '@/hooks/useAuth'

export default function CreateRecipePage() {
	const { token } = useAuth()

	return (
		<section className="panel single-panel">
			<h2>Crea una receta Fuji</h2>
			<p className="section-copy">
				Completa los parametros de camara y guarda una nueva simulacion en tu catalogo.
			</p>
			<RecipeForm token={token} />
		</section>
	)
}
