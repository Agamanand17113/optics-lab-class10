export default function Concepts(){
  return(<div className="space-y-6">
    <h2 className="text-3xl font-bold text-slate-800">Key Concepts</h2>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card"><h3 className="font-semibold text-indigo-600">Reflection</h3><p>Angle of incidence equals angle of reflection.</p></div>
      <div className="card"><h3 className="font-semibold text-indigo-600">Refraction</h3><p>Bending of light, Snell's law n1 sin i = n2 sin r.</p></div>
      <div className="card"><h3 className="font-semibold text-indigo-600">Lenses</h3><p>Lens formula: 1/f = 1/v + 1/u with convex/concave.</p></div>
    </div>
  </div>)
}