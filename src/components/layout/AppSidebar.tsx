import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User, LogIn, LogOut, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: PlusSquare, label: "Create", path: "/create" },
  { icon: Heart, label: "Activity", path: "/activity" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
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
    <Sidebar
      className={cn(
        "border-r border-border/50 bg-card/80 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="p-4">
        <div className={cn(
          "flex items-center gap-3 transition-all duration-300",
          collapsed && "justify-center"
        )}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 to-accent/40 rounded-xl blur-sm" />
            <div className="relative h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/">
                  <h1 className="text-xl font-bold text-gradient">Pulse</h1>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.path}
                            className={cn(
                              "relative flex items-center gap-4 px-4 py-3 rounded-2xl font-medium transition-all duration-200",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                              collapsed && "justify-center px-3"
                            )}
                          >
                            <motion.div
                              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.2 }}
                            >
                              <item.icon
                                className={cn(
                                  "h-5 w-5 transition-all",
                                  isActive && "text-primary"
                                )}
                                fill={isActive ? "currentColor" : "none"}
                              />
                            </motion.div>
                            <AnimatePresence>
                              {!collapsed && (
                                <motion.span
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.15 }}
                                  className="text-sm"
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </AnimatePresence>
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 w-1 h-6 rounded-r-full bg-primary"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right" className="rounded-xl">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 space-y-3">
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={cn(
            "w-full rounded-xl hover:bg-muted/50 transition-all",
            collapsed ? "justify-center px-0" : "justify-start gap-3"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Collapse</span>
            </>
          )}
        </Button>

        {/* Auth Actions */}
        <div className="pt-3 border-t border-border/50">
          {user ? (
            <div className="space-y-2">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button 
                    className={cn(
                      "w-full gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-all rounded-xl",
                      collapsed ? "px-0" : ""
                    )}
                  >
                    <PlusSquare className="h-4 w-4" />
                    {!collapsed && <span className="ml-2">New Post</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="rounded-xl">
                    New Post
                  </TooltipContent>
                )}
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className={cn(
                      "w-full text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl",
                      collapsed ? "px-0 justify-center" : "justify-start gap-3"
                    )}
                  >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span className="text-sm">Sign Out</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="rounded-xl">
                    Sign Out
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link to="/auth">
                  <Button 
                    className={cn(
                      "w-full gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-all rounded-xl",
                      collapsed ? "px-0" : ""
                    )}
                  >
                    <LogIn className="h-4 w-4" />
                    {!collapsed && <span className="ml-2">Sign In</span>}
                  </Button>
                </Link>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="rounded-xl">
                  Sign In
                </TooltipContent>
              )}
            </Tooltip>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
