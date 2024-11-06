'use client';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface GlassDropdownProps {
  label: string;
  items: { label: string; onClick: () => void }[];
}

export default function GlassDropdown({ label, items }: GlassDropdownProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 px-4 py-2 rounded-lg backdrop-blur-glass bg-glass-card border border-white/10 text-white/90 hover:bg-glass-card-hover transition-all">
        <span>{label}</span>
        <ChevronDownIcon className="h-5 w-5" />
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-xl backdrop-blur-glass bg-glass-card border border-white/10 shadow-glass overflow-hidden">
          <div className="p-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={item.onClick}
                    className={`${
                      active ? 'bg-white/10' : ''
                    } group flex w-full items-center rounded-lg px-4 py-2 text-white/80 hover:text-white transition-all`}
                  >
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 