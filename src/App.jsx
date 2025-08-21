import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './pages/Home.jsx'
import Concepts from './pages/Concepts.jsx'
import Reflection from './pages/Simulations/Reflection.jsx'
import Refraction from './pages/Simulations/Refraction.jsx'
import LensLab from './pages/Simulations/LensLab.jsx'
import Quiz from './pages/Quiz.jsx'
import Summary from './pages/Summary.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

export default function App(){
  return(
    <div className="flex flex-col min-h-screen">
      <NavBar/>
      <motion.main initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/concepts" element={<Concepts/>}/>
          <Route path="/sim/reflection" element={<Reflection/>}/>
          <Route path="/sim/refraction" element={<Refraction/>}/>
          <Route path="/sim/lens" element={<LensLab/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/summary" element={<Summary/>}/>
        </Routes>
      </motion.main>
      <Footer/>
    </div>
  )
}