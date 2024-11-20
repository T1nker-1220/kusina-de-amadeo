'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { 
  HiMenuAlt3, 
  HiOutlineClipboardList, 
  HiOutlineCash, 
  HiOutlineChartBar, 
  HiOutlineUsers,
  HiOutlineLogout,
  HiOutlineCog
} from 'react-icons/hi';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const menus = [
    { name: "Orders", link: "/admin/orders", icon: HiOutlineClipboardList },
    { name: "Payments", link: "/admin/payments", icon: HiOutlineCash },
    { name: "Analytics", link: "/admin/analytics", icon: HiOutlineChartBar },
    { name: "Customers", link: "/admin/customers", icon: HiOutlineUsers },
    { name: "Settings", link: "/admin/settings", icon: HiOutlineCog },
  ];

  useEffect(() => {
    // Redirect to sign in if not authenticated or not admin
    if (!authLoading && !adminLoading) {
      if (!user) {
        router.push('/admin/signin');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, router]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="flex bg-theme-dark min-h-screen">
      {/* Sidebar */}
      <div className={`bg-theme-navy min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-between items-center">
          <h2 className={`whitespace-pre duration-500 font-semibold ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
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
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-orange-500/10 rounded-md
                ${pathname === menu.link ? 'bg-orange-500/10 text-orange-500' : 'text-gray-300 hover:text-orange-500'}`}
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
