"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import CreateEventDrawer from "@/components/create-event";

export default function AppContent({ children }) {
  const pathname = usePathname();
  const isBookingPage = pathname.split('/').filter(Boolean).length === 2;

  return (
    <>
      {!isBookingPage && <Header />}
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {children}
      </main>
      
      {!isBookingPage && <CreateEventDrawer />}
    </>
  );
}
