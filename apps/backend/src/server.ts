import express from 'express'
import recipesRouter from './routes/v1/recipesRouter'
import usersRouter from './routes/v1/usersRouter'

const app = express()

// Carga el archivo .env por defecto
process.loadEnvFile()

// middleware para parsear JSON
app.use(express.json())
// rutas
app.use('/api/v1/recipes', recipesRouter)
app.use('/api/v1/users', usersRouter) // Reutilizando recipesRouter para users por ahora
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`🚀 Backend running on port ${PORT}`)
})
