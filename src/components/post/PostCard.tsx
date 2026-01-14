import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
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
      className="bg-card rounded-2xl shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <UserAvatar src={author.avatar} name={author.name} size="md" />
          <div>
            <p className="font-semibold text-foreground">{author.name}</p>
            <p className="text-sm text-muted-foreground">@{author.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {content && (
        <div className="px-4 pb-3">
          <p className="text-foreground leading-relaxed">{content}</p>
        </div>
      )}

      {/* Image */}
      {image && (
        <div
          className="relative cursor-pointer"
          onDoubleClick={handleDoubleClick}
        >
          <img
            src={image}
            alt="Post content"
            className="w-full object-cover max-h-[500px]"
          />
          <AnimatePresence>
            {showHeartAnimation && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Heart className="h-24 w-24 text-primary-foreground fill-primary drop-shadow-lg animate-heart-beat" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={handleLike}
          >
            <motion.div
              animate={liked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.2 }}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  liked ? "text-primary fill-primary" : "text-muted-foreground"
                )}
              />
            </motion.div>
          </Button>
          <span className="text-sm font-medium text-muted-foreground min-w-[2rem]">
            {likeCount > 0 ? likeCount.toLocaleString() : ""}
          </span>

          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground min-w-[2rem]">
            {comments > 0 ? comments.toLocaleString() : ""}
          </span>

          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setBookmarked(!bookmarked)}
        >
          <Bookmark
            className={cn(
              "h-5 w-5 transition-colors",
              bookmarked ? "text-primary fill-primary" : "text-muted-foreground"
            )}
          />
        </Button>
      </div>
    </motion.article>
  );
}
