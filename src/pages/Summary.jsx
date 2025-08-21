export default function Summary() {
  return (
    <section className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-bold">Summary & Next Steps</h2>
      <p className="text-slate-700">
        You explored reflection, refraction, and lenses using interactive simulations.
        Predict outcomes before moving sliders, then verify with the diagrams — that builds intuition.
      </p>
      <ul className="list-disc pl-5 text-slate-700 space-y-1">
        <li><b>Reflection:</b> i = r; plane mirrors give virtual, upright images.</li>
        <li><b>Refraction:</b> Snell’s Law; denser → rarer beyond the critical angle gives TIR.</li>
        <li><b>Lenses:</b> 1/f = 1/v + 1/u; convex can give real/virtual images; concave gives virtual, upright images.</li>
      </ul>
      <p className="text-slate-700">
        Try extending this: add prisms (dispersion), numericals with hints, and adaptive quizzes.
      </p>
    </section>
  );
}
