import { useState } from "react";
import { Image, Video, Smile, MapPin } from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface CreatePostCardProps {
  userAvatar?: string;
  userName?: string;
  onSubmit?: (content: string) => void;
}

export function CreatePostCard({
  userAvatar,
  userName = "User",
  onSubmit,
}: CreatePostCardProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (content.trim() && onSubmit) {
      onSubmit(content);
      setContent("");
      setIsFocused(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-card p-4"
    >
      <div className="flex gap-3">
        <UserAvatar src={userAvatar} name={userName} size="md" />
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="min-h-[60px] border-0 bg-transparent resize-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 p-0"
          />

          {isFocused && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-border mt-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-primary hover:bg-accent"
                  >
                    <Image className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-primary hover:bg-accent"
                  >
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-primary hover:bg-accent"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-primary hover:bg-accent"
                  >
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {content.length}/500
                  </span>
                  <Button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="gradient-primary text-primary-foreground px-6 shadow-glow hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
