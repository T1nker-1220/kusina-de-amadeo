'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const timeline = [
  {
    year: 2021,
    title: "Our Beginning",
    description: "Kusina De Amadeo opened its doors in the heart of the community, starting with a simple dream of serving authentic Filipino cuisine. Despite the challenges of the pandemic, we persevered with takeout and delivery services.",
    image: "/images/about/2021-opening.jpg",
    achievements: [
      "Successfully launched during pandemic",
      "Established core menu items",
      "Built loyal customer base"
    ]
  },
  {
    year: 2022,
    title: "Growing Together",
    description: "As restrictions eased, we expanded our services and menu offerings. Our commitment to quality and value helped us grow, becoming a favorite spot for both breakfast and lunch crowds.",
    image: "/images/about/2022-growth.jpg",
    achievements: [
      "Expanded menu selection",
      "Introduced new silog varieties",
      "Enhanced customer service"
    ]
  },
  {
    year: 2023,
    title: "Community Focus",
    description: "We strengthened our roots in the community, participating in local events and introducing budget-friendly meals to help during challenging economic times.",
    image: "/images/about/2023-community.jpg",
    achievements: [
      "Launched budget meal options",
      "Participated in community events",
      "Improved ordering system"
    ]
  },
  {
    year: 2024,
    title: "Innovation & Tradition",
    description: "Today, we continue to innovate while staying true to our roots. Our focus remains on providing delicious, affordable Filipino cuisine while embracing modern conveniences for our customers.",
    image: "/images/about/2024-current.jpg",
    achievements: [
      "Introduced online ordering",
      "Enhanced menu presentation",
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
            Since 2021, we've been serving authentic Filipino cuisine with love and dedication
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