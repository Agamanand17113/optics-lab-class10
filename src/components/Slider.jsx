export default function Slider({ label, min=0, max=100, step=1, value, onChange, suffix='' }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-sm text-slate-700">{label}</label>
        <span className="text-sm font-medium">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-slate-900"
      />
    </div>
  )
}
