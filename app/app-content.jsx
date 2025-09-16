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
      <main className={`min-h-screen ${isBookingPage ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
        {children}
      </main>
      {!isBookingPage && (
        <footer className="bg-blue-100 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Made with 💗 by Vaibhav</p>
          </div>
        </footer>
      )}
      {!isBookingPage && <CreateEventDrawer />}
    </>
  );
}
