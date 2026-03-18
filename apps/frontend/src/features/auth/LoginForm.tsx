import { useState } from 'react'

type LoginState = {
	username: string
	password: string
}

type LoginFormProps = {
	onLoginSuccess: (token: string) => void
}

const API_BASE = '/api/v1'

function getLoginErrorMessage(error?: string) {
	return error ?? 'No se pudo iniciar sesión.'
}

function LoginForm({ onLoginSuccess }: LoginFormProps) {
	const [login, setLogin] = useState<LoginState>({ username: '', password: '' })
	const [loginMessage, setLoginMessage] = useState('')
	const [isLoggingIn, setIsLoggingIn] = useState(false)

	const handleLogin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoggingIn(true)
		setLoginMessage('')

		try {
			const response = await fetch(`${API_BASE}/users/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(login)
			})

			let payload: { token?: string; error?: string } = {}
			const contentType = response.headers.get('content-type') ?? ''
			if (contentType.includes('application/json')) {
				payload = (await response.json()) as { token?: string; error?: string }
			}

			if (!response.ok || !payload.token) {
				if (response.status >= 500) {
					setLoginMessage(
						'No se pudo conectar correctamente con el backend. Revisa que el servidor API esté activo en el puerto 3080.'
					)
					return
				}

				setLoginMessage(getLoginErrorMessage(payload.error))
				return
			}

			onLoginSuccess(payload.token)
			setLoginMessage('Sesión iniciada correctamente.')
		} catch {
			setLoginMessage(
				'Error de conexión al iniciar sesión. Comprueba que el frontend pueda acceder al backend en el puerto 3080.'
			)
		} finally {
			setIsLoggingIn(false)
		}
	}

	return (
		<>
			<form onSubmit={handleLogin} className="form-grid">
				<label>
					Username
					<input
						value={login.username}
						onChange={(event) =>
							setLogin((prev) => ({ ...prev, username: event.target.value }))
						}
						placeholder="username"
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={login.password}
						onChange={(event) =>
							setLogin((prev) => ({ ...prev, password: event.target.value }))
						}
						placeholder="••••••••"
						required
					/>
				</label>
				<button type="submit" className="primary" disabled={isLoggingIn}>
					{isLoggingIn ? 'Entrando...' : 'Acceder'}
				</button>
			</form>

			{loginMessage ? <p className="feedback">{loginMessage}</p> : null}
		</>
	)
}

export default LoginForm
