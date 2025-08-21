import { useState } from "react";
import { reflectionAngle, deg2rad } from "../../utils/physics.js";

export default function Reflection() {
  const [iAngle, setIAngle] = useState(30);

  const rAngle = reflectionAngle(iAngle);
  const origin = { x: 400, y: 200 };
  const len = 180;

  // Incident ray (measured from the normal; boundary is horizontal line)
  const ix = origin.x - len * Math.sin(deg2rad(iAngle));
  const iy = origin.y - len * Math.cos(deg2rad(iAngle));

  // Reflected ray (symmetric about the normal)
  const rx = origin.x + len * Math.sin(deg2rad(iAngle));
  const ry = origin.y - len * Math.cos(deg2rad(iAngle));

  return (
    <section className="grid lg:grid-cols-2 gap-6">
      <div className="rounded-2xl border bg-white p-4">
        <h2 className="font-bold mb-3">Reflection Simulator</h2>

        <svg width="100%" viewBox="0 0 800 400" className="rounded-xl border">
          {/* Boundary (mirror surface) */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="black" strokeDasharray="6 6" />
          {/* Normal */}
          <line x1="400" y1="0" x2="400" y2="400" stroke="gray" strokeDasharray="4 4" />

          <defs>
            <marker id="arrow-reflect" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>

          {/* Incident ray */}
          <g stroke="red">
            <line x1={ix} y1={iy} x2={origin.x} y2={origin.y} strokeWidth="3" markerEnd="url(#arrow-reflect)" />
          </g>
          {/* Reflected ray */}
          <g stroke="blue">
            <line x1={origin.x} y1={origin.y} x2={rx} y2={ry} strokeWidth="3" markerEnd="url(#arrow-reflect)" />
          </g>

          {/* Labels */}
          <text x="420" y="170" fontSize="12">i = {iAngle.toFixed(0)}°</text>
          <text x="420" y="230" fontSize="12">r = {rAngle.toFixed(0)}°</text>
        </svg>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border bg-white p-4">
          <label className="block text-sm font-medium mb-2">
            Angle of Incidence: <span className="font-bold">{iAngle}°</span>
          </label>
          <input
            type="range"
            min="0"
            max="80"
            value={iAngle}
            onChange={(e) => setIAngle(Number(e.target.value))}
            className="w-full accent-slate-900"
          />
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <p className="text-slate-700">
            Law of reflection: <b>i = r</b>, measured from the normal (dashed vertical line).
          </p>
        </div>
      </div>
    </section>
  );
}
