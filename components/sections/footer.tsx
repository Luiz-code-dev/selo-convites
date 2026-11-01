import Link from 'next/link'
import { Logo } from '@/components/brand/seal'
import { brand } from '@/content/site'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ivory/10 bg-ink text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-16 md:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <Logo tone="light" />
            <p className="font-serif text-lg text-ivory/70 italic">{brand.tagline}</p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/70">
              <li>
                <a href={brand.instagram} target="_blank" rel="noreferrer" className="hover:text-ivory">
                  Instagram
                </a>
              </li>
              {whatsapp ? (
                <li>
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-ivory">
                    WhatsApp
                  </a>
                </li>
              ) : null}
              <li>
                <a href={`mailto:${brand.contactEmail}`} className="hover:text-ivory">
                  E-mail
                </a>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-ivory">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-ivory">
                  Termos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-ivory/10 pt-8 text-xs leading-relaxed text-ivory/50 md:flex-row md:justify-between">
          <p>
            © {year} {brand.name} · Uma marca {brand.company.name} · CNPJ {brand.company.cnpj}
          </p>
          <a href={brand.company.url} target="_blank" rel="noreferrer" className="hover:text-ivory">
            {brand.company.urlLabel}
          </a>
        </div>
      </div>
    </footer>
  )
}
