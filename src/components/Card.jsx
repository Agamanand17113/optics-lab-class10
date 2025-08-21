export default function Card({ title, children, footer }) {
  return (
    <div className="card p-5">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <div>{children}</div>
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  )
}
