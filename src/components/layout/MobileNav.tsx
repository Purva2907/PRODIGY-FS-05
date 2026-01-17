import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: PlusSquare, label: "Create", path: "/create" },
  { icon: Heart, label: "Activity", path: "/activity" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-card/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 z-50">
        <Link to="/">
          <h1 className="text-xl font-bold text-gradient">Pulse</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full hover:bg-muted/50">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-t border-border/50 flex items-center justify-around px-2 z-50 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-12 w-12 rounded-2xl transition-all",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon
                    className="h-5 w-5"
                    fill={isActive ? "currentColor" : "none"}
                  />
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute -bottom-0.5 w-5 h-1 rounded-full bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Button>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
