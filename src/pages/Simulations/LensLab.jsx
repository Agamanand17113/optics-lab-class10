import { useMemo, useState } from "react";
import { lensImage } from "../../utils/physics.js";

export default function LensLab() {
  // u measured positive to the left of lens; f>0 convex, f<0 concave
  const [u, setU] = useState(150);
  const [fMag, setFMag] = useState(60);
  const [isConvex, setIsConvex] = useState(true);

  const f = isConvex ? fMag : -fMag;
  const { v, m } = useMemo(() => lensImage(u, f), [u, f]);

  // Geometry for drawing
  const axisY = 200;
  const lensX = 400;
  const objectX = lensX - u;
  const Fleft = lensX - Math.abs(fMag);
  const Fright = lensX + Math.abs(fMag);
  const objHeight = 80;
  const objTop = { x: objectX, y: axisY - objHeight };

  const imgHeight = Number.isFinite(m) ? objHeight * m : 0;

  // Rays (simple principal rays)
  const ray1 = [
    objTop,
    { x: lensX, y: objTop.y }, // reaches lens parallel to axis
    isConvex
      ? { x: Fright, y: axisY } // through far focus
      : { x: lensX + 200, y: axisY - (objTop.y - axisY) * (200 / (Math.abs(fMag))) } // diverging look
  ];

  // Ray 2: through center (approx undeviated)
  const ray2 = [
    objTop,
    { x: lensX + 200, y: axisY - ((axisY - objTop.y) * (200 / (lensX - objectX))) }
  ];

  return (
    <section className="grid lg:grid-cols-2 gap-6">
      <div className="rounded-2xl border bg-white p-4">
        <h2 className="font-bold mb-3">Lens Lab</h2>

        <svg width="100%" viewBox="0 0 800 400" className="rounded-xl border bg-white">
          {/* Principal axis */}
          <line x1="0" y1={axisY} x2="800" y2={axisY} stroke="black" strokeDasharray="6 6" />

          {/* Lens */}
          <path
            d={`M ${lensX},40 C ${lensX-20},120 ${lensX-20},280 ${lensX},360 C ${lensX+20},280 ${lensX+20},120 ${lensX},40 Z`}
            fill="#a5b4fc" opacity="0.6"
          />
          <line x1={lensX} y1="40" x2={lensX} y2="360" stroke="#4338ca" />

          {/* Focal points */}
          <circle cx={Fleft} cy={axisY} r="3" fill="black" />
          <text x={Fleft - 12} y={axisY - 8} fontSize="12">F</text>
          <circle cx={Fright} cy={axisY} r="3" fill="black" />
          <text x={Fright + 6} y={axisY - 8} fontSize="12">F'</text>

          {/* Object (arrow) */}
          <line x1={objectX} y1={axisY} x2={objectX} y2={axisY - objHeight} stroke="black" strokeWidth="3" />
          <polygon points={`${objectX},${axisY - objHeight - 20} ${objectX - 7},${axisY - objHeight} ${objectX + 7},${axisY - objHeight}`} fill="black" />

          {/* Rays */}
          <polyline fill="none" stroke="red" strokeWidth="2" points={ray1.map(p => `${p.x},${p.y}`).join(" ")} />
          <polyline fill="none" stroke="orange" strokeWidth="2" points={ray2.map(p => `${p.x},${p.y}`).join(" ")} />

          {/* Image (if finite) */}
          {Number.isFinite(v) && (
            <g>
              <line x1={lensX + v} y1={axisY} x2={lensX + v} y2={axisY - imgHeight} stroke="#0284c7" strokeWidth="3" />
              <polygon
                points={`${lensX + v},${axisY - imgHeight - 20} ${lensX + v - 7},${axisY - imgHeight} ${lensX + v + 7},${axisY - imgHeight}`}
                fill="#0284c7"
              />
            </g>
          )}
        </svg>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border bg-white p-4 grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Object Distance u (cm): {u}</label>
            <input type="range" min="20" max="300" step="5" value={u}
              onChange={(e)=>setU(Number(e.target.value))} className="w-full accent-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Focal Length |f| (cm): {fMag}</label>
            <input type="range" min="20" max="150" step="5" value={fMag}
              onChange={(e)=>setFMag(Number(e.target.value))} className="w-full accent-slate-900" />
          </div>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isConvex} onChange={(e)=>setIsConvex(e.target.checked)} />
            <span>{isConvex ? "Convex lens (f>0)" : "Concave lens (f<0)"}</span>
          </label>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <ul className="space-y-1 text-slate-700">
            <li>Signed focal length f: <b>{(isConvex ? fMag : -fMag).toFixed(1)} cm</b></li>
            <li>Image distance v: <b>{Number.isFinite(v) ? v.toFixed(1) + " cm" : "∞"}</b></li>
            <li>Magnification m: <b>{Number.isFinite(m) ? m.toFixed(2) : "∞"}</b> {Number.isFinite(m) && (m < 0 ? "(inverted)" : "(upright)")}</li>
            <li>Nature: <b>{Number.isFinite(v) ? (v > 0 ? "Real" : "Virtual") : "Not formed"}</b></li>
          </ul>
          <div className="mt-2 text-sm text-slate-600">
            Tip: For a convex lens, when u &gt; 2f image is reduced; at u = 2f same size; between f and 2f enlarged.
            Concave lens always forms a virtual, upright, diminished image.
          </div>
        </div>
      </div>
    </section>
  );
}
