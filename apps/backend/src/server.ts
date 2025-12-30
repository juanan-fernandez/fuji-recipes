import express from 'express'
import recipesRouter from './routes/v1/recipesRouter'

const app = express()

// Carga el archivo .env por defecto
process.loadEnvFile()

// middleware para parsear JSON
app.use(express.json())
// rutas
app.use('/api/v1/recipes', recipesRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`🚀 Backend running on port ${PORT}`)
})
