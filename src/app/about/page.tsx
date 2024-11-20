'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPinIcon, ClockIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline';

const stats = [
  { label: 'Years of Experience', value: '2+' },
  { label: 'Satisfied Customers', value: '1000+' },
  { label: 'Menu Items', value: '50+' },
  { label: 'Daily Orders', value: '100+' },
];

const values = [
  {
    name: 'Local Community',
    description: 'Supporting and growing with the Amadeo community through authentic Filipino cuisine.',
    icon: MapPinIcon,
  },
  {
    name: 'Quality Service',
    description: 'Committed to providing excellent service and maintaining high food quality standards.',
    icon: ClockIcon,
  },
  {
    name: 'Family-Oriented',
    description: 'Creating a warm, welcoming environment for families and friends to gather and enjoy meals.',
    icon: UserGroupIcon,
  },
  {
    name: 'Passion for Food',
    description: 'Putting love and dedication into every dish we prepare for our valued customers.',
    icon: HeartIcon,
  },
];

const timeline = [
  {
    year: 2022,
    title: "Our Beginning",
    description: "Kusina De Amadeo started its journey in the heart of Amadeo city near Savemore, with a mission to serve authentic Filipino cuisine to our community. We quickly became known for our affordable and delicious meals.",
    image: "/images/about/2022.jpg",
    achievements: [
      "Successfully opened near Savemore",
      "Established core menu items",
      "Built initial customer base"
    ]
  },
  {
    year: 2023,
    title: "Growing Together",
    description: "As our reputation grew, more customers discovered our authentic Filipino dishes. Our location near Savemore helped us reach a diverse customer base, from office workers to families looking for quality meals.",
    image: "/images/about/2023.jpg",
    achievements: [
      "Expanded menu selection",
      "Introduced new silog varieties",
      "Enhanced customer service"
    ]
  },
  {
    year: 2024,
    title: "A New Chapter",
    description: "We moved to our new location beside our house, creating a more intimate and family-oriented dining experience. This move allows us to serve our community with even more personal attention while maintaining our commitment to quality and affordability.",
    image: "/images/about/2024.jpg",
    achievements: [
      "Relocated to new location",
      "Enhanced dining experience",
      "Maintained affordable pricing"
    ]
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-theme-dark">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-theme-navy/80 to-theme-dark"></div>
          <Image
            src="/images/about-hero.jpg"
            alt="Kusina De Amadeo"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl"
          >
            <h2 className="text-base font-semibold leading-8 text-theme-peach">Our Story</h2>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A Journey of Flavors & Family
            </h1>
            <p className="mt-6 text-lg leading-8 text-theme-slate">
              Since 2021, Kusina De Amadeo has been serving authentic Filipino cuisine with love and dedication. 
              Our journey started with a simple dream: to bring delicious, affordable meals to our community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative isolate overflow-hidden bg-theme-navy/30 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                <dt className="text-base leading-7 text-theme-slate">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-bold tracking-tight text-theme-peach sm:text-4xl">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>

      {/* Values Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-theme-peach">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Drives Us Forward
            </p>
            <p className="mt-6 text-lg leading-8 text-theme-slate">
              At Kusina De Amadeo, our values shape everything we do, from preparing meals to serving our community.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {values.map((value) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-theme-peach">
                      <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {value.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-theme-slate">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-24 sm:py-32 bg-theme-navy/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-theme-peach">Our Journey</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Growing With Our Community
            </p>
          </div>

          <div className="space-y-24">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden group">
                    <Image
                      src={item.image}
                      alt={`${item.year} - ${item.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-dark/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center rounded-md bg-theme-peach/10 px-3 py-1 text-sm font-medium text-theme-peach ring-1 ring-inset ring-theme-peach/20">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    {item.title}
                  </h2>
                  <p className="text-theme-slate leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="space-y-3">
                    {item.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-center gap-3 text-theme-slate"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-theme-peach flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-40 sm:py-40 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-theme-dark via-theme-navy/30 to-theme-dark"></div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join Us on Our Journey
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-theme-slate">
            Experience authentic Filipino cuisine made with love and tradition. Visit us today and be part of our growing family.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/menu"
              className="rounded-md bg-theme-peach px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-theme-red transition-colors duration-300"
            >
              View Our Menu
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="text-sm font-semibold leading-6 text-white"
            >
              Contact Us <span aria-hidden="true">→</span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}