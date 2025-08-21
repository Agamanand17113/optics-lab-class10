import { Link } from 'react-router-dom'
export default function Home(){
  return(<div className="text-center space-y-6 py-12">
    <h1 className="text-4xl font-extrabold text-indigo-700">Interactive Optics Learning</h1>
    <p className="text-slate-600">Explore Reflection, Refraction and Lenses with simulations designed for Class 10.</p>
    <div className="flex justify-center gap-4">
      <Link to="/concepts" className="btn">📘 Start Learning</Link>
      <Link to="/quiz" className="btn">📝 Take Quiz</Link>
    </div>
  </div>)
}