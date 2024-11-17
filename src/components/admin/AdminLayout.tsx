import React, { useState } from 'react';
import { HiMenuAlt3, HiOutlineClipboardList, HiOutlineCash, HiOutlineChartBar, HiOutlineUsers } from 'react-icons/hi';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const menus = [
    { name: "Orders", link: "/admin/orders", icon: HiOutlineClipboardList },
    { name: "Payments", link: "/admin/payments", icon: HiOutlineCash },
    { name: "Analytics", link: "/admin/analytics", icon: HiOutlineChartBar },
    { name: "Customers", link: "/admin/customers", icon: HiOutlineUsers },
  ];

  return (
    <div className="flex">
      <div className={`bg-gray-800 min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-between items-center">
          <h2 className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
            Admin Panel
          </h2>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-700 rounded-md"
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
        </div>
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
