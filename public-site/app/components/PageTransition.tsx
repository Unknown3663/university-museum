"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Scroll to top on every route change, bypassing CSS scroll-behavior:smooth
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      const html = document.documentElement;
      html.style.scrollBehavior = "auto";
      html.scrollTop = 0;
      document.body.scrollTop = 0; // Safari fallback
      requestAnimationFrame(() => {
        html.style.scrollBehavior = "";
      });
    }
  }, [pathname]);

  // key={pathname} forces React to remount the div on route change,
  // which re-triggers the CSS animation without any framer-motion SSR issues.
  return (
    <div key={pathname} style={{ animation: "pageEntry 0.28s ease-out" }}>
      {children}
    </div>
  );
}
