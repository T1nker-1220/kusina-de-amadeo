'use client';

import React, { useState } from 'react';
import AdminRoute from '@/components/admin/AdminRoute';
import { motion } from 'framer-motion';
import { 
  HiMenuAlt3, 
  HiOutlineClipboardList, 
  HiOutlineCash, 
  HiOutlineChartBar, 
  HiOutlineUsers,
  HiOutlineLogout
} from 'react-icons/hi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const menus = [
  { name: "Orders", link: "/admin/orders", icon: HiOutlineClipboardList },
  { name: "Payments", link: "/admin/payments", icon: HiOutlineCash },
  { name: "Analytics", link: "/admin/analytics", icon: HiOutlineChartBar },
  { name: "Customers", link: "/admin/customers", icon: HiOutlineUsers },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const { signOut } = useAuth();

  // Exclude sign-in page from admin layout
  if (pathname === '/admin/signin') {
    return <>{children}</>;
  }

  return (
    <AdminRoute>
      <div className="flex bg-theme-dark min-h-screen">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className={`bg-theme-navy min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-between items-center">
            <h2
              className={`whitespace-pre duration-500 font-semibold ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Admin Dashboard
            </h2>
            <HiMenuAlt3
              size={26}
              className="cursor-pointer text-orange-400 hover:text-orange-500 transition-colors"
              onClick={() => setOpen(!open)}
            />
          </div>

          <div className="mt-8 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                href={menu?.link}
                key={i}
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-orange-500/10 rounded-md ${
                  pathname === menu.link
                    ? "bg-orange-500/10 text-orange-500"
                    : "text-gray-300 hover:text-orange-500"
                }`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}

            <button
              onClick={() => signOut()}
              className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-orange-500/10 rounded-md text-gray-300 hover:text-orange-500 mt-auto"
            >
              <div>
                <HiOutlineLogout size="20" />
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Sign Out
              </h2>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </AdminRoute>
  );
}
