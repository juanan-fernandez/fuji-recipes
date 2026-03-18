import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function MainNav() {
	const { isAuthenticated, logout } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	return (
		<nav className="main-nav" aria-label="Navegacion principal">
			<Link to="/" className="nav-brand">
				Fuji Recipes
			</Link>
			<div className="nav-links">
				<Link to="/" className="nav-link">
					Inicio
				</Link>
				{!isAuthenticated ? (
					<Link to="/login" className="nav-link">
						Login
					</Link>
				) : null}
				{isAuthenticated ? (
					<Link to="/recipes/new" className="nav-link nav-link-accent">
						Nueva receta
					</Link>
				) : null}
				{isAuthenticated ? (
					<button type="button" className="nav-button" onClick={handleLogout}>
						Cerrar sesion
					</button>
				) : null}
			</div>
		</nav>
	)
}
