import { NavLink, Link } from 'react-router-dom'
export default function NavBar(){
  const link=({isActive})=>`px-3 py-2 rounded-lg ${isActive?'bg-indigo-600 text-white':'hover:bg-indigo-100'}`
  return(<header className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto flex justify-between items-center h-14 px-4">
      <Link to="/" className="font-bold text-lg text-indigo-700">Optics Lab</Link>
      <nav className="flex gap-2">
        <NavLink to="/concepts" className={link}>Concepts</NavLink>
        <NavLink to="/sim/reflection" className={link}>Reflection</NavLink>
        <NavLink to="/sim/refraction" className={link}>Refraction</NavLink>
        <NavLink to="/sim/lens" className={link}>Lens Lab</NavLink>
        <NavLink to="/quiz" className={link}>Quiz</NavLink>
      </nav>
    </div>
  </header>)
}