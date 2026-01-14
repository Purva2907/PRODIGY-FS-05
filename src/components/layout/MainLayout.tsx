import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:ml-64 pt-14 lg:pt-0 pb-20 lg:pb-0"
      >
        <div className="max-w-2xl mx-auto px-4 py-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
