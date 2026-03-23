import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
	return (
		<section className="panel single-panel not-found-panel">
			<p className="eyebrow">Error 404</p>
			<h1>No encontramos esa pagina</h1>
			<p className="lead">
				La ruta que has abierto no existe o ya no esta disponible. Puedes volver al inicio para
				seguir navegando por el catalogo de recetas.
			</p>
			<Link to="/" className="primary">
				Volver al inicio
			</Link>
		</section>
	)
}
