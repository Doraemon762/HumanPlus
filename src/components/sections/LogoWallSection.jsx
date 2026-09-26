/* Partner logos — kept in original form (no edits to the source files),
   shown in their true colours with no greyscale / hover effects.
   The source folder currently holds 17 logos (no 15.png); if 15.png is
   added later, just append it to FILES below.
   Each row duplicates its list so the CSS translateX(-50%) loop is seamless. */
const FILES = [
  '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png',
  '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '16.png',
  '17.png', '18.png',
]

const LOGOS = FILES.map((f) => ({
  src: `/images/logo/${f}`,
  alt: `Partner ${f.replace('.png', '')}`,
}))

// Split the 17 logos into two rows (9 + 8). Opposite scroll directions.
const ROW_1 = LOGOS.slice(0, 9)
const ROW_2 = LOGOS.slice(9)

function MarqueeRow({ items, direction }) {
  // Duplicate the list — the second copy lets the -50% keyframe wrap invisibly.
  const doubled = [...items, ...items]
  return (
    <div className="relative flex w-full overflow-hidden" aria-hidden="true">
      <div
        className={`flex w-max ${
          direction === 'left' ? 'animate-row-left' : 'animate-row-right'
        }`}
      >
        {doubled.map((logo, idx) => (
          <div key={idx} className="flex shrink-0 items-center px-7 md:px-10">
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-9 w-auto object-contain md:h-12"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoWallSection() {
  return (
    <section id="logos" className="w-full bg-white py-16 md:py-24">
      {/* keyframes are local to this module; safe to inline once */}
      <style>{`
        @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .animate-row-left { animation: marquee-left 48s linear infinite; }
        .animate-row-right { animation: marquee-right 48s linear infinite; }
      `}</style>

      <div className="flex flex-col gap-10 md:gap-14">
        <MarqueeRow items={ROW_1} direction="right" />
        <MarqueeRow items={ROW_2} direction="left" />
      </div>
    </section>
  )
}
