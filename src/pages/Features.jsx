import { FEATURES } from '../features-data.js'

export default function Features() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-[30px] py-[120px]">
      <div className="paper-surface relative w-[min(1000px,92vw)] p-[78px] pb-[72px] font-mono text-[15px] leading-[1.5]">
        <p className="font-bold uppercase tracking-[0.12em] text-[12px] text-[rgba(28,27,26,0.5)] mb-7">
          What Furnace does
        </p>
        <ul className="feature-list list-none p-0 m-0">
          {FEATURES.map((f) => (
            <li key={f.name}>
              <span className="feature-name">{f.name}</span>
              <span className="feature-desc">{f.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
