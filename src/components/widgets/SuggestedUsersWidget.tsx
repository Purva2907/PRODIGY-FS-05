import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  mutualFollowers?: number;
}

const suggestedUsers: SuggestedUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    mutualFollowers: 12,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    username: "marcusj",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    mutualFollowers: 8,
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    mutualFollowers: 5,
  },
];

export function SuggestedUsersWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl shadow-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Suggested for you</h3>
        <Button variant="link" className="text-primary p-0 h-auto text-sm">
          See All
        </Button>
      </div>

      <div className="space-y-4">
        {suggestedUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <UserAvatar src={user.avatar} name={user.name} size="md" />
              <div>
                <p className="font-medium text-foreground text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.mutualFollowers} mutual followers
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="gradient-primary text-primary-foreground text-xs px-4 shadow-soft hover:opacity-90 transition-opacity"
            >
              Follow
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
