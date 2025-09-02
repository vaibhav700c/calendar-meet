import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AppContent from "./app-content";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Schedulrr",
  description: " ",
};

export default function RootLayout({ children }) {
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
