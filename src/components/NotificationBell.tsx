'use client';

import { useState, useEffect, useRef } from 'react';
import { getStoredNotifications, markNotificationAsRead, clearNotifications, NotificationData } from '@/services/notifications';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNotifications = () => {
      const stored = getStoredNotifications();
      setNotifications(stored);
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, 60000);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = (orderId: string) => {
    markNotificationAsRead(orderId);
    setNotifications(prev => 
      prev.map(n => n.orderId === orderId ? { ...n, isRead: true } : n)
    );
  };

  const handleClearAll = () => {
    clearNotifications();
    setNotifications([]);
    setIsOpen(false);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      confirmed: "bg-emerald-100 text-emerald-800",
      preparing: "bg-cyan-100 text-cyan-800",
      ready: "bg-purple-100 text-purple-800",
      out_for_delivery: "bg-orange-100 text-orange-800",
      delivered: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const bellVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: [0, -15, 15, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    },
    unread: {
      rotate: [0, -10, 10, -8, 8, -5, 5, 0],
      transition: { 
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
      x: "25%"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
      x: "25%",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative p-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10
          hover:from-orange-500/20 hover:to-orange-600/20
          border border-orange-500/20 hover:border-orange-500/30
          transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          variants={bellVariants}
          initial="initial"
          animate={unreadCount > 0 ? "unread" : isHovered ? "hover" : "initial"}
        >
          {unreadCount > 0 ? (
            <BellAlertIcon className="w-6 h-6 text-orange-400 group-hover:text-orange-500 transition-colors" />
          ) : (
            <BellIcon className="w-6 h-6 text-orange-400 group-hover:text-orange-500 transition-colors" />
          )}
        </motion.div>
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                bg-gradient-to-r from-orange-500 to-orange-600
                text-white text-xs font-medium
                flex items-center justify-center
                shadow-lg shadow-orange-500/30"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mt-4 w-96 bg-theme-dark/95 backdrop-blur-xl rounded-2xl
              shadow-xl overflow-hidden z-50 border border-orange-500/20"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10
              border-b border-orange-500/20 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-orange-400">Notifications</h3>
              {notifications.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearAll}
                  className="text-sm text-orange-400 hover:text-orange-500 transition-colors"
                >
                  Clear All
                </motion.button>
              )}
            </div>

            {/* Notifications List */}
            <div className="divide-y divide-orange-500/10 max-h-[70vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-6 text-center text-orange-400/70"
                >
                  <BellIcon className="mx-auto h-12 w-12 text-orange-400/50" />
                  <p className="mt-4 text-sm">No notifications yet</p>
                </motion.div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={`${notification.orderId}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      backgroundColor: "rgba(251, 146, 60, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => handleNotificationClick(notification.orderId)}
                    className={`px-4 py-3 cursor-pointer transition-all duration-300 ${
                      !notification.isRead ? 'bg-orange-500/5' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-theme-slate group-hover:text-white">
                          {notification.message}
                        </p>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                          <span className="text-xs text-orange-400/70">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {!notification.isRead && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
                        />
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
