import { eventsMarquee } from '@/content/site'

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {eventsMarquee.map((label) => (
        <li key={label} className="flex items-center font-serif text-2xl whitespace-nowrap text-ink italic md:text-3xl">
          <span className="px-6 md:px-8">{label}</span>
          <span aria-hidden className="size-1.5 rounded-full bg-teal" />
        </li>
      ))}
    </ul>
  )
}

export function EventsMarquee() {
  return (
    <section aria-label="Tipos de evento atendidos" className="overflow-hidden border-y border-line bg-sand py-7">
      <div className="flex w-max animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <Row />
        <div className="motion-reduce:hidden">
          <Row hidden />
        </div>
      </div>
    </section>
  )
}
