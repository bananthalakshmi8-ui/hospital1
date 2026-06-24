import ScrollReveal from '../components/ui/ScrollReveal'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import { stats } from '../data/content'

const achievements = [
  { year: '2024', title: 'Best Digital Healthcare Platform', org: 'Healthcare Excellence Awards' },
  { year: '2023', title: 'ISO 9001:2015 Certified', org: 'International Standards Organization' },
  { year: '2023', title: 'NABL Accredited Labs', org: 'National Accreditation Board' },
  { year: '2022', title: 'Top 10 Health Tech Startup', org: 'Economic Times' },
  { year: '2021', title: '1 Million Patients Milestone', org: 'MediCare Plus' },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586773866496-3772d8139b8a?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508a1e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1631217868264-e5b1bb5e5a7a?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&h=400&fit=crop',
]

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">About MediCare Plus</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Transforming healthcare delivery through technology, compassion, and excellence since 2015.</p>
        </div>
      </div>

      {/* Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop" alt="Hospital" className="rounded-2xl shadow-medical w-full" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-title mb-6">Hospital Overview</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                MediCare Plus is India's leading digital healthcare platform, bridging the gap between patients and quality medical care. Founded in 2015, we have grown to serve over 5 lakh patients across 50+ partner hospitals.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Our platform offers end-to-end healthcare services including online pharmacy, doctor consultations, lab tests with home collection, health checkup packages, and emergency support — all accessible from a single trusted platform.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We are committed to making quality healthcare accessible, affordable, and convenient for every Indian family.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass-card p-8 md:p-10 h-full border-l-4 border-primary-500">
                <span className="text-4xl mb-4 block">🎯</span>
                <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To democratize healthcare by providing every Indian with access to quality medicines, expert medical consultations, and diagnostic services at their fingertips — ensuring no one is left behind in their health journey.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 md:p-10 h-full border-l-4 border-cyan-500">
                <span className="text-4xl mb-4 block">🔭</span>
                <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To become the most trusted digital healthcare ecosystem in India, where technology meets compassion to create a healthier nation — one patient, one family, one community at a time.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="section-title mb-4">Our Achievements</h2>
            <p className="section-subtitle mx-auto">Milestones that reflect our commitment to excellence</p>
          </ScrollReveal>
          <div className="space-y-4 max-w-3xl mx-auto">
            {achievements.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary-600">{item.year}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.org}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="section-title mb-4">Hospital Gallery</h2>
            <p className="section-subtitle mx-auto">A glimpse into our world-class facilities</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="relative overflow-hidden rounded-2xl group aspect-[3/2]">
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
