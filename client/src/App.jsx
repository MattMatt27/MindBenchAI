import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import TechnicalProfile from './components/TechnicalProfile'
import './styles/main.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'technical-profile' && <TechnicalProfile />}
    </>
  )
}