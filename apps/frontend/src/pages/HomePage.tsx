import { useEffect, useState } from 'react'

type Recipe = {
	id: number
	recipeName: string
	author: string
	film: string
	cameraSensor: string
	notes: string
}

type RecipesResponse = {
	data?: Recipe[]
	message?: string
}

const API_BASE = '/api/v1'

export default function HomePage() {
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const [message, setMessage] = useState('Cargando recetas...')

	useEffect(() => {
		async function loadRecipes() {
			try {
				const response = await fetch(`${API_BASE}/recipes`)
				const payload = (await response.json()) as RecipesResponse

				if (!response.ok) {
					setMessage('No se pudo cargar el listado de recetas.')
					return
				}

				const nextRecipes = payload.data ?? []
				setRecipes(nextRecipes)
				setMessage(nextRecipes.length === 0 ? 'Todavia no hay recetas publicadas.' : '')
			} catch {
				setMessage('Error de conexion al cargar las recetas.')
			}
		}

		void loadRecipes()
	}, [])

	return (
		<section className="content-stack">
			<section className="hero">
				<p className="eyebrow">Fuji Recipes</p>
				<h1>Cataloga, consulta y publica simulaciones de pelicula Fuji</h1>
				<p className="lead">
					Explora las recetas guardadas en el backend y accede con tu usuario para crear
					nuevas.
				</p>
			</section>

			<section className="panel">
				<div className="section-heading">
					<div>
						<h2>Listado de recetas</h2>
						<p className="section-copy">
							La pagina principal muestra el catalogo disponible en la API.
						</p>
					</div>
					<span className="pill">{recipes.length} recetas</span>
				</div>

				{message ? <p className="feedback">{message}</p> : null}

				{recipes.length > 0 ? (
					<div className="recipe-list">
						{recipes.map((recipe) => (
							<article key={recipe.id} className="recipe-card">
								<div className="recipe-card-header">
									<div>
										<h3>{recipe.recipeName}</h3>
										<p className="recipe-meta">Por {recipe.author}</p>
									</div>
									<span className="pill pill-soft">{recipe.film}</span>
								</div>
								<p className="recipe-meta">Sensor: {recipe.cameraSensor}</p>
								<p className="recipe-notes">{recipe.notes || 'Sin notas adicionales.'}</p>
							</article>
						))}
					</div>
				) : null}
			</section>
		</section>
	)
}
