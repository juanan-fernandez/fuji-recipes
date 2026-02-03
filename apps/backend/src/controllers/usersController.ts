import { Request, Response } from 'express'
import { login, register } from '@services/authService'

export async function loginUser(req: Request, res: Response) {
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({ error: 'Username and password required' })
	}

	try {
		const token = await login(username, password)
		if (!token) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })

		res.json({ token })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Internal server error' })
	}
}

export async function registerUser(req: Request, res: Response) {
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({ error: 'Username and password required' })
	}

	try {
		const success = await register(username, password)
		if (!success) {
			return res.status(409).json({ error: 'El usuario ya existe' })
		}

		res.status(201).json({ message: 'Usuario registrado exitosamente' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Internal server error' })
	}
}
