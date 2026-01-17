import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { motion } from "framer-motion";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

function MainContent({ children }: MainLayoutProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        min-h-screen pt-14 lg:pt-0 pb-20 lg:pb-0 
        transition-all duration-300
        ${collapsed ? "lg:pl-[72px]" : "lg:pl-64"}
      `}
    >
      <div className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </div>
    </motion.main>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Main Content */}
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
