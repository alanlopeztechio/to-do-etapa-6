import {FeatureItem} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'
import Image from 'next/image'

export default function FeatureCard({icon, title, description}: FeatureItem) {
  const imageUrl = icon && urlForImage(icon.asset)?.fit('crop').url()

  return (
    <div
      className="group relative overflow-hidden rounded-[24px] backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
    >
      <div className="relative w-14 h-14 rounded-[16px] flex items-center justify-center mb-5 bg-[var(--btn-primary)] shadow-lg shadow-[var(--btn-primary)]/30">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title || 'icon'}
            width={28}
            height={28}
            className="brightness-0 invert"
          />
        ) : (
          <div className="w-7 h-7 rounded bg-white/30" />
        )}
      </div>

      <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-orange-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[var(--foreground)]/70 leading-relaxed">{description}</p>
      <div
        className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"
        style={{background: 'var(--card-glow)'}}
      />
    </div>
  )
}
