import './globals.css'
import ConvexClientProvider from '@/components/ConvexClerkProvider'
import {SettingsInitializer} from '@/components/SettingsInitializer'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {ClerkProvider} from '@clerk/nextjs'
import {IBM_Plex_Mono, Inter, PT_Serif} from 'next/font/google'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {data: settings} = await sanityFetch({query: settingsQuery})

  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable}`}>
      <body>
        <SettingsInitializer
          dataClient={{
            limitMessage: settings?.limitMessage || null,
            successMessage: settings?.successMessage || null,
          }}
        />
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
