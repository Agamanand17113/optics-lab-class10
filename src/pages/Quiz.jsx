import { useState } from "react";

const QUESTIONS = [
  {
    q: "In reflection at a plane mirror, the angle of reflection is:",
    options: ["Greater than angle of incidence", "Equal to angle of incidence", "Less than angle of incidence", "Zero"],
    answer: 1,
    explain: "Law of reflection: angle of incidence equals angle of reflection."
  },
  {
    q: "Snell’s Law is written as:",
    options: ["n1 + n2 = i + r", "n1 · sin(i) = n2 · sin(r)", "n1 · i = n2 · r", "n1 / n2 = r / i"],
    answer: 1,
    explain: "n₁ sin i = n₂ sin r relates angles and refractive indices."
  },
  {
    q: "Total internal reflection occurs when light travels from:",
    options: ["Rarer to denser medium at any angle", "Denser to rarer medium beyond critical angle", "Denser to rarer medium at small angles", "Rarer to denser medium beyond critical angle"],
    answer: 1,
    explain: "TIR requires denser→rarer and i > critical angle."
  },
  {
    q: "For a convex lens with object distance u = 2f, the image is formed:",
    options: ["At infinity", "At focus F", "At 2F, same size and inverted", "Between F and 2F, enlarged"],
    answer: 2,
    explain: "At u=2f, image forms at 2F, same size, inverted."
  },
  {
    q: "Magnification m = v/u. If m = -2, then image is:",
    options: ["Upright and magnified", "Inverted and magnified", "Upright and diminished", "Inverted and diminished"],
    answer: 1,
    explain: "Negative sign means inverted; |m|>1 means magnified."
  },
  {
    q: "Refractive index n is a measure of:",
    options: ["How fast light travels in a medium compared to vacuum", "The density of the medium", "The color of light", "The temperature of the medium"],
    answer: 0,
    explain: "n = c / v, higher n means slower light in that medium."
  },
  {
    q: "In a concave lens, the image is always:",
    options: ["Real and inverted", "Virtual and inverted", "Virtual and upright", "Real and upright"],
    answer: 2,
    explain: "Concave lens forms virtual, upright, diminished image."
  },
  {
    q: "The normal at the point of incidence is drawn:",
    options: ["Parallel to the surface", "Perpendicular to the surface", "At 45° to the surface", "Along the incident ray"],
    answer: 1,
    explain: "Normal is perpendicular to the surface at the point of incidence."
  },
  {
    q: "If n1 < n2, a ray entering the second medium bends:",
    options: ["Away from the normal", "Towards the normal", "Does not bend", "Back to the first medium"],
    answer: 1,
    explain: "Going from rarer to denser (n increases) bends towards the normal."
  },
  {
    q: "The thin lens formula is:",
    options: ["v = u + f", "1/f = 1/v + 1/u", "f = v/u", "m = u/v"],
    answer: 1,
    explain: "Standard thin lens relation used in Class 10."
  }
];

export default function Quiz() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const score = answers.reduce((acc, a, i) => acc + (a === QUESTIONS[i].answer ? 1 : 0), 0);

  const select = (qi, oi) => {
    if (submitted) return;
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Quick Quiz</h2>

      {QUESTIONS.map((q, qi) => {
        const chosen = answers[qi];
        return (
          <div key={qi} className="rounded-2xl border bg-white p-4">
            <div className="font-medium mb-3">Q{qi + 1}. {q.q}</div>
            <div className="grid md:grid-cols-2 gap-3">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = q.answer === oi;
                const correctStyle = submitted && isCorrect ? "bg-green-100 border-green-300" : "";
                const wrongStyle = submitted && isChosen && !isCorrect ? "bg-red-100 border-red-300" : "";
                return (
                  <button
                    key={oi}
                    className={`text-left p-3 rounded-xl border hover:bg-slate-50 ${isChosen ? "ring-2 ring-slate-900" : ""} ${correctStyle} ${wrongStyle}`}
                    onClick={() => select(qi, oi)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-3 text-sm text-slate-700">
                <b>Explanation:</b> {q.explain}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-xl border bg-white" onClick={() => setSubmitted(true)}>Submit</button>
        {submitted && <div className="font-semibold">Score: {score} / {QUESTIONS.length}</div>}
        <button className="px-4 py-2 rounded-xl border bg-white" onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false); }}>
          Reset
        </button>
      </div>
    </section>
  );
}
