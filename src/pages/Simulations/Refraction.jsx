import { useState, useMemo } from "react";
import { snell, deg2rad } from "../../utils/physics.js";

export default function Refraction() {
  const [iAngle, setIAngle] = useState(30);
  const [n1, setN1] = useState(1.00);
  const [n2, setN2] = useState(1.50);

  const { tir, rDeg } = useMemo(() => snell(n1, n2, iAngle), [n1, n2, iAngle]);

  const origin = { x: 400, y: 200 };
  const len = 180;

  // Incident ray (top medium -> boundary)
  const ix = origin.x - len * Math.sin(deg2rad(iAngle));
  const iy = origin.y - len * Math.cos(deg2rad(iAngle));

  // Refracted or reflected ray
  let rx, ry;
  if (!tir) {
    rx = origin.x + len * Math.sin(deg2rad(rDeg || 0));
    ry = origin.y + len * Math.cos(deg2rad(rDeg || 0)); // goes into lower medium
  } else {
    rx = origin.x + len * Math.sin(deg2rad(iAngle));
    ry = origin.y - len * Math.cos(deg2rad(iAngle)); // reflected back (TIR)
  }

  return (
    <section className="grid lg:grid-cols-2 gap-6">
      <div className="rounded-2xl border bg-white p-4">
        <h2 className="font-bold mb-3">Refraction Simulator (Snell’s Law)</h2>

        <svg width="100%" viewBox="0 0 800 400" className="rounded-xl border">
          {/* Media */}
          <rect x="0" y="0" width="800" height="200" fill="#e5e7eb" />
          <rect x="0" y="200" width="800" height="200" fill="#c7d2fe" />
          {/* Interface & normal */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="black" strokeDasharray="6 6" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="gray" strokeDasharray="4 4" />

          <defs>
            <marker id="arrow-refract" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>

          {/* Incident */}
          <g stroke="red">
            <line x1={ix} y1={iy} x2={origin.x} y2={origin.y} strokeWidth="3" markerEnd="url(#arrow-refract)" />
          </g>

          {/* Refracted or TIR reflected */}
          <g stroke={tir ? "purple" : "blue"}>
            <line x1={origin.x} y1={origin.y} x2={rx} y2={ry} strokeWidth="3" markerEnd="url(#arrow-refract)" />
          </g>

          {/* Labels */}
          <text x="20" y="28" fontSize="12">n₁ = {n1.toFixed(2)}</text>
          <text x="20" y="390" fontSize="12">n₂ = {n2.toFixed(2)}</text>
          <text x="420" y="170" fontSize="12">i = {iAngle.toFixed(0)}°</text>
          <text x="420" y="230" fontSize="12">
            {tir ? "Total Internal Reflection" : `r = ${rDeg?.toFixed(1)}°`}
          </text>
        </svg>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border bg-white p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Angle of Incidence: {iAngle}°</label>
            <input type="range" min="0" max="80" value={iAngle}
              onChange={(e)=>setIAngle(Number(e.target.value))}
              className="w-full accent-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">n₁ (top medium): {n1.toFixed(2)}</label>
            <input type="range" min="1.00" max="2.00" step="0.01" value={n1}
              onChange={(e)=>setN1(Number(e.target.value))}
              className="w-full accent-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">n₂ (bottom medium): {n2.toFixed(2)}</label>
            <input type="range" min="1.00" max="2.00" step="0.01" value={n2}
              onChange={(e)=>setN2(Number(e.target.value))}
              className="w-full accent-slate-900" />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <p className="text-slate-700">
            Snell’s Law: <b>n₁ sin i = n₂ sin r</b>. When light goes from denser (higher n) to rarer (lower n)
            and the incident angle exceeds the critical angle, refraction is not possible and you get
            <b> total internal reflection</b>.
          </p>
        </div>
      </div>
    </section>
  );
}
