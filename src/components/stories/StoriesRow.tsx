import { Plus } from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  username: string;
  avatar?: string;
  hasUnseenStory: boolean;
}

const stories: Story[] = [
  { id: "create", username: "Your story", hasUnseenStory: false },
  {
    id: "1",
    username: "sarah_c",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    hasUnseenStory: true,
  },
  {
    id: "2",
    username: "marcus_j",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    hasUnseenStory: true,
  },
  {
    id: "3",
    username: "emma_w",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    hasUnseenStory: true,
  },
  {
    id: "4",
    username: "alex_r",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    hasUnseenStory: false,
  },
  {
    id: "5",
    username: "lisa_m",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    hasUnseenStory: true,
  },
];

export function StoriesRow() {
  return (
    <div className="bg-card rounded-2xl shadow-card p-4 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto scrollbar-none py-1">
        {stories.map((story, index) => (
          <motion.button
            key={story.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center gap-2 flex-shrink-0"
          >
            <div
              className={cn(
                "relative p-0.5 rounded-full",
                story.hasUnseenStory && "gradient-primary"
              )}
            >
              {story.id === "create" ? (
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center ring-2 ring-background">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
              ) : (
                <div className="ring-2 ring-background rounded-full">
                  <UserAvatar
                    src={story.avatar}
                    name={story.username}
                    size="lg"
                    className="h-16 w-16"
                  />
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground truncate max-w-[70px]">
              {story.username}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
