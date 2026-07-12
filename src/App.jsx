import { Routes, Route, useLocation } from 'react-router-dom'
import Background from './components/Background.jsx'
import Chrome from './components/Chrome.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Features from './pages/Features.jsx'
import Docs from './pages/Docs.jsx'

export default function App() {
  const location = useLocation()
  const isDocs = location.pathname.startsWith('/docs')

  return (
    <>
      <Background />
      <Chrome />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/:section" element={<Docs />} />
        </Routes>
      </main>
      {!isDocs && <Footer />}
    </>
  )
}
