"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../../../shared/i18n/LanguageContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navigation = [
    { name: t("dashboard.nav.dashboard"), href: "/dashboard", icon: "📊" },
    { name: t("dashboard.nav.upload"), href: "/dashboard/upload", icon: "📤" },
    {
      name: t("dashboard.nav.exhibits"),
      href: "/dashboard/exhibits",
      icon: "🖼️",
    },
    {
      name: t("dashboard.nav.workshops"),
      href: "/dashboard/workshops",
      icon: "🎓",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-900 min-h-screen fixed left-0 top-16 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
