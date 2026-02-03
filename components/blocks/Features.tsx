import {FeatureItem} from '@/sanity.types'
import FeatureCard from './FeatureCard'

interface FeaturesProps {
  title: string
  features: FeatureItem[]
}

export default function Features({title, features}: FeaturesProps) {
  return (
    <section className="container mx-auto pt-4 pb-2 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  )
}
