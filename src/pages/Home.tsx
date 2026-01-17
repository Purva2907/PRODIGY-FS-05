import { MainLayout } from "@/components/layout/MainLayout";
import { StoriesRow } from "@/components/stories/StoriesRow";
import { CreatePostCard } from "@/components/post/CreatePostCard";
import { PostCard } from "@/components/post/PostCard";
import { TrendingWidget } from "@/components/widgets/TrendingWidget";
import { SuggestedUsersWidget } from "@/components/widgets/SuggestedUsersWidget";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

// Sample posts data
const samplePosts = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    content: "Just finished this beautiful sunset shot from my balcony! Nature never fails to amaze me 🌅",
    image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&h=400&fit=crop",
    likes: 1243,
    comments: 89,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    author: {
      name: "Marcus Johnson",
      username: "marcusj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    content: "Working on some exciting new features for our app! Can't wait to share more soon. The journey of building something meaningful is incredible. #startup #tech #innovation",
    likes: 567,
    comments: 42,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    author: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    content: "Coffee and creativity go hand in hand ☕✨",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    likes: 892,
    comments: 56,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: "4",
    author: {
      name: "Alex Rivera",
      username: "alexr",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    content: "Mountain adventures this weekend 🏔️ The view from the top is always worth the climb!",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
    likes: 2341,
    comments: 178,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <MainLayout>
      <div className="flex gap-6">
        {/* Main Feed */}
        <div className="flex-1 space-y-6">
          {!user && !loading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Welcome to Pulse!</h2>
                  <p className="text-muted-foreground">Sign in to create posts and interact with the community.</p>
                </div>
                <Link to="/auth">
                  <Button className="gradient-primary text-primary-foreground shadow-glow">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
          
          <StoriesRow />
          <CreatePostCard userName={user?.email?.split('@')[0] || "Guest"} />
          
          <motion.div className="space-y-6">
            {samplePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Sidebar - Desktop Only */}
        <aside className="hidden xl:block w-80 flex-shrink-0 space-y-6 sticky top-6 h-fit">
          <TrendingWidget />
          <SuggestedUsersWidget />
        </aside>
      </div>
    </MainLayout>
  );
}
