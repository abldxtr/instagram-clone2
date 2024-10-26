"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function useScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = `${pathname}?${searchParams}`;

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const beforeUnloadHandler = () => sessionStorage.clear();

      window.addEventListener("beforeunload", beforeUnloadHandler);

      if ("history" in window && "scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      const scrollY = sessionStorage.getItem(url);

      window.scrollTo(0, +scrollY!);

      return () => {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      };
    }
  }, [url]);

  useEffect(() => {
    let scrollTimeout;
    let lastScrollTop = window.scrollY;

    const scrollHandler = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY !== lastScrollTop) {
          lastScrollTop = window.scrollY;
          sessionStorage.setItem(url, window.scrollY);
        }
      }, 0);
    };

    const scrollEndHandler = () => {
      sessionStorage.setItem(url, window.scrollY);
    };

    if ("onscrollend" in window) {
      // Browser supports scrollend
      document.addEventListener("scrollend", scrollEndHandler);
    } else {
      // Polyfill for browsers that don't support scrollend
      document.addEventListener("scroll", scrollHandler);
    }

    return () => {
      if ("onscrollend" in window) {
        document.removeEventListener("scrollend", scrollEndHandler);
      } else {
        document.removeEventListener("scroll", scrollHandler);
        clearTimeout(scrollTimeout);
      }
    };
  }, [url]);
}
