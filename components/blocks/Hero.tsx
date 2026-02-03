import {ButtonItem} from '@/types'
import {ArrowRight} from 'lucide-react'
import {PortableText, PortableTextReactComponents} from 'next-sanity'
import Link from 'next/link'
import {PortableTextBlock} from 'sanity'

interface HeroSectionProps {
  titulo: PortableTextBlock
  butons: ButtonItem[]
}

export default function Hero({titulo, butons}: HeroSectionProps) {
  const myComponents: Partial<PortableTextReactComponents> = {
    block: {
      h1: ({children}) => (
        <h1 className="text-5xl tracking-tight font-bold text-foreground sm:text-6xl lg:text-6xl text-balance leading-[1.4] sm:leading-[1.3] lg:leading-[1.5] mb-4">
          {children}
        </h1>
      ),
      h2: ({children}) => <h2 className="text-3xl font-semibold">{children}</h2>,
      h3: ({children}) => <h3 className="text-3xl font-semibold">{children}</h3>,
      h4: ({children}) => <h4 className="text-3xl font-semibold">{children}</h4>,
      h5: ({children}) => <h5 className="text-3xl font-semibold">{children}</h5>,
      h6: ({children}) => <h6 className="text-3xl font-semibold">{children}</h6>,
      normal: ({children}) => (
        <p className="text-xl text-orange-700 mb-8 max-w-2xl mx-auto">{children}</p>
      ),
    },
    marks: {
      text_primary: ({children}) => (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
          {children}
        </span>
      ),
      text_secondary: ({children}) => (
        <span className="font-light mx-auto max-w-2xl text-md text-muted-foreground text-pretty text-orange-700 ">
          {children}
        </span>
      ),
    },
  }

  return (
    <section className="container mx-auto pt-4 pb-2 py-20 text-center">
      <PortableText value={titulo} components={myComponents} />
      <div className="flex gap-4 justify-center flex-wrap mt-6">
        {butons &&
          butons.map((button) => {
            const texto =
              button.linkType == 'external'
                ? button.linkExternal?.label
                : button.linkInternal?.label
            const href =
              button.linkType === 'external'
                ? button.linkExternal?.url || '#'
                : `${button.linkInternal?.reference?._ref || ''}`

            const classNames = button.is_primary
              ? 'group bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white px-6 py-3 rounded-[15px] font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-2 transition transform'
              : 'group border border-[var(--btn-primary)] hover:bg-[var(--btn-primary)] text-[var(--foreground)] hover:text-white px-6 py-3 rounded-[15px] font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-2 transition transform'

            if (button.linkType === 'external') {
              if (!button.linkExternal?.url?.startsWith('http'))
                return (
                  <Link
                    key={button._key}
                    href={button.linkExternal?.url || '#'}
                    className={classNames}
                  >
                    {texto}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                )

              return (
                <a
                  key={button._key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classNames}
                >
                  {texto}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              )
            }

            return (
              <Link key={button._key} href={href} className={classNames}>
                {texto}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )
          })}
      </div>
    </section>
  )
}
