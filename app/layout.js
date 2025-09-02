import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AppContent from "./app-content";
import { checkUser } from "@/lib/checkUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Schedulrr",
  description: " ",
};

export default async function RootLayout({ children }) {
  await checkUser(); // Ensure user is created in DB on page load

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AppContent>{children}</AppContent>
        </body>
      </html>
    </ClerkProvider>
  );
}
