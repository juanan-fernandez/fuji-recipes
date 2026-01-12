import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@utils/auth'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const token = req.headers['authorization']?.replace('Bearer ', '')
	const payload = token ? verifyToken(token) : null

	if (!payload) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	;(req as any).userId = payload.userId
	next()
}
