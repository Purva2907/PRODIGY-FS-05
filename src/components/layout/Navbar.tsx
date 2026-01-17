import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: PlusSquare, label: "Create", path: "/create" },
  { icon: Heart, label: "Activity", path: "/activity" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-border bg-card p-6 z-50">
        <Link to="/" className="mb-10">
          <h1 className="text-2xl font-bold text-gradient">Pulse</h1>
        </Link>

        <div className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-4 h-12 text-base font-medium transition-all",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-6 w-6 transition-all",
                      isActive && "text-primary"
                    )}
                    fill={isActive ? "currentColor" : "none"}
                  />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-8 rounded-r-full bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          {user ? (
            <>
              <Button className="w-full gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity">
                New Post
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="w-full gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 glass border-b border-border flex items-center justify-between px-4 z-50">
        <Link to="/">
          <h1 className="text-xl font-bold text-gradient">Pulse</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 glass border-t border-border flex items-center justify-around px-2 z-50 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-12 w-12 transition-all",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  className="h-6 w-6"
                  fill={isActive ? "currentColor" : "none"}
                />
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute -bottom-1 w-6 h-1 rounded-full bg-primary"
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
