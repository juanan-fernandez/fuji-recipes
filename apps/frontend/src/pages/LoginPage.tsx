import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '@/features/auth/LoginForm'
import { useAuth } from '@/hooks/useAuth'

type NavigationState = {
	from?: {
		pathname?: string
	}
}

export default function LoginPage() {
	const { login } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as NavigationState | null
	const redirectTo = state?.from?.pathname ?? '/recipes/new'

	const handleLoginSuccess = (token: string) => {
		login(token)
		navigate(redirectTo, { replace: true })
	}

	return (
		<section className="panel single-panel">
			<h2>Accede para publicar recetas</h2>
			<p className="section-copy">
				Inicia sesion para desbloquear el formulario privado y guardar nuevas recetas Fuji.
			</p>
			<LoginForm onLoginSuccess={handleLoginSuccess} />
		</section>
	)
}
