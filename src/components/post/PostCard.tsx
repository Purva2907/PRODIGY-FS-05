import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: Date;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export function PostCard({
  id,
  author,
  content,
  image,
  likes,
  comments,
  createdAt,
  isLiked = false,
  isBookmarked = false,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    if (!liked) {
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 600);
    }
  };

  const handleDoubleClick = () => {
    if (!liked) {
      handleLike();
    } else {
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 600);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-3xl shadow-card overflow-hidden border-2 border-border/50 hover:border-primary/20 hover:shadow-elevated transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-sm" />
            <UserAvatar src={author.avatar} name={author.name} size="md" className="relative ring-2 ring-background" />
          </div>
          <div>
            <p className="font-bold text-foreground">{author.name}</p>
            <p className="text-sm text-muted-foreground font-medium">@{author.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full font-medium">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-accent/50 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {content && (
        <div className="px-5 pb-4">
          <p className="text-foreground leading-relaxed text-[15px]">{content}</p>
        </div>
      )}

      {/* Image */}
      {image && (
        <div
          className="relative cursor-pointer mx-4 mb-4 rounded-2xl overflow-hidden"
          onDoubleClick={handleDoubleClick}
        >
          <img
            src={image}
            alt="Post content"
            className="w-full object-cover max-h-[400px] transition-transform duration-300 hover:scale-[1.02]"
          />
          <AnimatePresence>
            {showHeartAnimation && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/10"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  <Heart className="h-20 w-20 text-white fill-primary drop-shadow-xl" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-5 pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="font-semibold">
            {likeCount > 0 && `${likeCount.toLocaleString()} likes`}
          </span>
          <span className="font-medium">
            {comments > 0 && `${comments.toLocaleString()} comments`}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-3 py-3 border-t border-border/50 mx-2 mb-2">
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-4 rounded-full hover:bg-primary/10 gap-2 group"
            onClick={handleLike}
          >
            <motion.div
              animate={liked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-all",
                  liked ? "text-pink-500 fill-pink-500" : "text-muted-foreground group-hover:text-pink-500"
                )}
              />
            </motion.div>
            <span className={cn(
              "text-sm font-medium transition-colors",
              liked ? "text-pink-500" : "text-muted-foreground"
            )}>
              Like
            </span>
          </Button>

          <Button variant="ghost" size="sm" className="h-10 px-4 rounded-full hover:bg-primary/10 gap-2 group">
            <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground">Comment</span>
          </Button>

          <Button variant="ghost" size="sm" className="h-10 px-4 rounded-full hover:bg-primary/10 gap-2 group">
            <Send className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground">Share</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-accent/50"
          onClick={() => setBookmarked(!bookmarked)}
        >
          <motion.div
            animate={bookmarked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            <Bookmark
              className={cn(
                "h-5 w-5 transition-all",
                bookmarked ? "text-primary fill-primary" : "text-muted-foreground hover:text-primary"
              )}
            />
          </motion.div>
        </Button>
      </div>

      {/* Quick Comment */}
      <div className="flex items-center gap-3 px-5 pb-4 pt-1">
        <UserAvatar size="sm" />
        <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2.5">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
            <Smile className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
