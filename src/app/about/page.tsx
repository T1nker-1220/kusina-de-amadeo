'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
export default function AboutPage() {
  return (
    <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white/90">
            Our Journey
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Since 2021, we&apos;ve been serving authentic Filipino cuisine with love and dedication
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-24">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.year} - ${item.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-block px-4 py-2 rounded-full 
                  bg-orange-500/20 text-orange-400 text-sm font-medium">
                  {item.year}
                </div>
                <h2 className="text-3xl font-bold text-white/90">
                  {item.title}
                </h2>
                <p className="text-white/70 leading-relaxed">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li 
                      key={i}
                      className="flex items-center gap-2 text-white/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 