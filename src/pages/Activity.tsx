import { MainLayout } from "@/components/layout/MainLayout";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow";
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  content?: string;
  postImage?: string;
  createdAt: Date;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    postImage: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=100&h=100&fit=crop",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false,
  },
  {
    id: "2",
    type: "follow",
    user: {
      name: "Marcus Johnson",
      username: "marcusj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
  },
  {
    id: "3",
    type: "comment",
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    content: "This is amazing! Love the colors 😍",
    postImage: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&h=100&fit=crop",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: "4",
    type: "like",
    user: {
      name: "Alex Rivera",
      username: "alexr",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    postImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100&h=100&fit=crop",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: "5",
    type: "follow",
    user: {
      name: "Lisa Martinez",
      username: "lisam",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "like":
      return <Heart className="h-4 w-4 text-primary fill-primary" />;
    case "comment":
      return <MessageCircle className="h-4 w-4 text-info" />;
    case "follow":
      return <UserPlus className="h-4 w-4 text-success" />;
  }
};

const getNotificationText = (notification: Notification) => {
  switch (notification.type) {
    case "like":
      return "liked your post";
    case "comment":
      return `commented: "${notification.content}"`;
    case "follow":
      return "started following you";
  }
};

export default function Activity() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground"
        >
          Activity
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card divide-y divide-border overflow-hidden"
        >
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                !notification.isRead ? "bg-accent/30" : ""
              }`}
            >
              <div className="relative">
                <UserAvatar
                  src={notification.user.avatar}
                  name={notification.user.name}
                  size="md"
                />
                <div className="absolute -bottom-1 -right-1 p-1 bg-card rounded-full shadow-sm">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-foreground">
                  <span className="font-semibold">{notification.user.name}</span>{" "}
                  <span className="text-muted-foreground">
                    {getNotificationText(notification)}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                </p>
              </div>

              {notification.postImage && (
                <img
                  src={notification.postImage}
                  alt=""
                  className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                />
              )}

              {!notification.isRead && (
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
}
