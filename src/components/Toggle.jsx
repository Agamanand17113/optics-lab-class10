export default function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <span className="text-sm text-slate-700">{label}</span>
      <span className="relative inline-block w-12 h-7">
        <input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} className="sr-only" />
        <span className={"absolute inset-0 rounded-full transition "
          + (checked ? "bg-slate-900" : "bg-slate-300")}></span>
        <span className={"absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition "
          + (checked ? "translate-x-5" : "")}></span>
      </span>
    </label>
  )
}
