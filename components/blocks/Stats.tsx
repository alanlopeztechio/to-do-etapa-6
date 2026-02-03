interface Stat {
  number: string
  label: string
}

interface StatsProps {
  title: string
  subtitle?: string
  stats: Stat[]
}

export default function Stats({title, subtitle, stats}: StatsProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div
        className="rounded-[24px] p-12 text-white shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, var(--btn-primary), var(--btn-primary-hover))',
          border: '1px solid var(--card-border)',
          boxShadow: '0 20px 50px var(--card-shadow-hover)',
        }}
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
