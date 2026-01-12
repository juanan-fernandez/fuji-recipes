/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'

export interface AuthenticatedRequest<B = object, P = Record<string, any>> extends Request<P> {
	userId?: number // Añadido por el middleware
	params: P // Tus rutas con parámetros tipados
	body: B // Tu payload tipado
}
