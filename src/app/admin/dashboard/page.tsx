'use client';

import { motion } from 'framer-motion';
import { HiOutlineClipboardList, HiOutlineCash, HiOutlineChartBar, HiOutlineUsers } from 'react-icons/hi';
import Link from 'next/link';

const cards = [
  {
    title: 'Orders',
    icon: HiOutlineClipboardList,
    link: '/admin/orders',
    color: 'from-orange-600 to-orange-400',
  },
  {
    title: 'Payments',
    icon: HiOutlineCash,
    link: '/admin/payments',
    color: 'from-green-600 to-green-400',
  },
  {
    title: 'Analytics',
    icon: HiOutlineChartBar,
    link: '/admin/analytics',
    color: 'from-blue-600 to-blue-400',
  },
  {
    title: 'Customers',
    icon: HiOutlineUsers,
    link: '/admin/customers',
    color: 'from-purple-600 to-purple-400',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={card.link}>
              <div className={`bg-gradient-to-r ${card.color} p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform`}>
                <card.icon className="w-8 h-8 text-white" />
                <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-theme-navy/50 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Placeholder for recent activity items */}
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <HiOutlineClipboardList className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-gray-200">New order received</p>
                <p className="text-sm text-gray-400">Order #123456</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">5 mins ago</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <HiOutlineCash className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-gray-200">Payment received</p>
                <p className="text-sm text-gray-400">₱1,234.56</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">15 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
