"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
export default function PageTransition() {
 const pathname = usePathname();
 const previous = useRef(pathname);
 useEffect(() => {
  if (previous.current !== pathname) {
   previous.current = pathname;
   document.getElementById("main-content")?.focus({ preventScroll: true });
  }
 }, [pathname]);
 return null;
}
