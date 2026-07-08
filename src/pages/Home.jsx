export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-[75px] pb-[170px] pt-[4vh]">
      <div className="flex flex-col items-center gap-8">
        <p className="m-0 font-serif text-[clamp(20px,2.2vw,34px)] leading-[1.3] font-normal max-w-[820px] text-white/95">
          We studied what users love about every agent harness and built it all into{' '}
          <a
            className="text-inherit no-underline underline [text-decoration-thickness:0.03em] [text-underline-offset:0.08em] cursor-pointer hover:text-accent hover:[text-shadow:0_0_12px_rgba(249,126,114,0.8)]"
            href="https://github.com/amoreX/furnace"
            target="_blank"
            rel="noopener noreferrer"
          >
            Furnace
          </a>
          .
          <span className="block mt-7 whitespace-nowrap">
            Built in the{' '}
            <a
              className="text-inherit no-underline underline [text-decoration-thickness:0.03em] [text-underline-offset:0.08em] cursor-pointer hover:text-accent hover:[text-shadow:0_0_12px_rgba(249,126,114,0.8)]"
              href="https://github.com/amoreX/furnace"
              target="_blank"
              rel="noopener noreferrer"
            >
              open
            </a>
            ,{' '}
          </span>
          <span className="inline-block max-w-full align-baseline">
            shaped by the people who use it.
          </span>
        </p>

        <div className="bg-black/30 border border-white/10 px-5 py-3 font-mono text-[14px] text-white/80 backdrop-blur-sm">
          <code>npm install -g cook-furnace</code>
        </div>
      </div>
    </section>
  )
}
