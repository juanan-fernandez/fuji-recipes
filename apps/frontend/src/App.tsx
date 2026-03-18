import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '@/app/ProtectedRoute'
import MainNav from '@/components/navigation/MainNav'
import CreateRecipePage from '@/pages/CreateRecipePage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import './App.css'

function App() {
	return (
		<main className="page">
			<MainNav />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/recipes/new"
					element={
						<ProtectedRoute>
							<CreateRecipePage />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</main>
	)
}

export default App
