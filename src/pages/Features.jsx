import { FEATURES } from '../features-data.js'

const paperSurface =
  'relative bg-[linear-gradient(rgba(0,0,0,0.08),rgba(0,0,0,0.08)),url("/paper.png")] bg-center [background-size:256px_256px] ' +
  'shadow-[0_16px_40px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(25,20,12,0.14),inset_0_-2px_4px_rgba(25,20,12,0.18)] ' +
  'border border-[rgba(25,20,12,0.2)] text-[#1c1b1a]'

export const PaperSurface = paperSurface

export default function Features() {
  return (
    <section className="relative h-auto px-[30px] pt-[120px] pb-[160px]">
      <div className="w-[min(860px,92vw)] h-[60vh] mx-auto">
        <div className="grid grid-cols-2 grid-rows-[1fr_1fr] gap-4 h-full">
          {FEATURES.map((f) => (
            <div
              key={f.name}
              className={`${paperSurface} flex flex-col justify-between p-6 text-left`}
            >
              <span className="font-bold uppercase text-[12px] tracking-[0.1em] text-[#1c1b1a]">{f.name}</span>
              <span className="text-[rgba(28,27,26,0.7)] leading-[1.6]">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
