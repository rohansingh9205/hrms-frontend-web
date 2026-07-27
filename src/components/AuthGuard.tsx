"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const publicRoutes = ["/login", "/forgot-password"];

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}