import { useState } from 'react'
import LoginForm from './features/auth/LoginForm'
import RecipeForm from './features/recipes/RecipeForm'
import './App.css'

function App() {
  const [token, setToken] = useState('')

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Fuji Recipes</p>
        <h1>Publica simulaciones de película con sus parámetros exactos</h1>
        <p className="lead">
          Completa los ajustes de cámara y envíalos al backend para construir tu catálogo de recetas Fuji.
        </p>
      </header>

      <section className="panel-grid">
        <section className="panel">
          <LoginForm onLoginSuccess={setToken} />
        </section>

        <section className="panel">
          <RecipeForm token={token} />
        </section>
      </section>
    </main>
  )
}

export default App
