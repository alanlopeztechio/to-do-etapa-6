import '@/styles/index.css'
import {Footer} from '@/components/blocks/Footer'
import {Navbar} from '@/components/blocks/Navbar'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {homePageQuery, settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {Toaster} from 'sonner'
import {handleError} from './client-functions'
import {DraftModeToast} from './DraftModeToast'

export async function generateMetadata(): Promise<Metadata> {
  const [{data: settings}, {data: homePage}] = await Promise.all([
    sanityFetch({query: settingsQuery, stega: false}),
    sanityFetch({query: homePageQuery, stega: false}),
  ])

  const ogImage = urlForOpenGraphImage(
    // @ts-expect-error - @TODO update @sanity/image-url types so it's compatible
    settings?.ogImage,
  )
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Personal website',
        }
      : undefined,
    description: homePage?.overview ? toPlainText(homePage.overview) : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({children}: {children: React.ReactNode}) {
  const {data} = await sanityFetch({query: settingsQuery})

  return (
    <>
      <div
        className="min-h-screen"
        style={{
          background:
            'linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))',
        }}
      >
        <Navbar data={data} />
        <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">{children}</div>
        {/* <footer className="bottom-0 w-full py-12 text-center md:py-20">
          {data?.footer && (
            <CustomPortableText
              id={data._id}
              type={data._type}
              path={['footer']}
              paragraphClasses="text-md md:text-xl"
              value={data.footer as unknown as PortableTextBlock[]}
            />
          )}
        </footer> */}
        <Footer columns={data?.footer?.columns} />
      </div>
      <Toaster />
      <SanityLive onError={handleError} />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeToast />
          <VisualEditing />
        </>
      )}
      <SpeedInsights />
    </>
  )
}
