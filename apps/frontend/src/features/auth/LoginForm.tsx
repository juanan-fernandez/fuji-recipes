import { useState } from 'react'

type LoginState = {
	username: string
	password: string
}

type LoginFormProps = {
	onLoginSuccess: (token: string) => void
}

const API_BASE = '/api/v1'

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

			const payload = (await response.json()) as { token?: string; error?: string }
			if (!response.ok || !payload.token) {
				setLoginMessage(payload.error ?? 'No se pudo iniciar sesión.')
				return
			}

			onLoginSuccess(payload.token)
			setLoginMessage('Sesión iniciada correctamente.')
		} catch {
			setLoginMessage('Error de red al iniciar sesión.')
		} finally {
			setIsLoggingIn(false)
		}
	}

	return (
		<>
			<h2>1) Acceso</h2>
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
