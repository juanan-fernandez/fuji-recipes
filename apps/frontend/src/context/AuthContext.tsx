import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type AuthContextValue = {
	token: string
	isAuthenticated: boolean
	login: (token: string) => void
	logout: () => void
}

const AUTH_TOKEN_KEY = 'fuji-recipes-token'

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [token, setToken] = useState('')

	useEffect(() => {
		const storedToken = window.localStorage.getItem(AUTH_TOKEN_KEY) ?? ''
		if (storedToken) {
			setToken(storedToken)
		}
	}, [])

	const value = useMemo<AuthContextValue>(
		() => ({
			token,
			isAuthenticated: token.trim().length > 0,
			login: (nextToken: string) => {
				const cleanToken = nextToken.trim()
				setToken(cleanToken)
				window.localStorage.setItem(AUTH_TOKEN_KEY, cleanToken)
			},
			logout: () => {
				setToken('')
				window.localStorage.removeItem(AUTH_TOKEN_KEY)
			}
		}),
		[token]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
