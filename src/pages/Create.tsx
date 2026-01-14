import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { Image, Video, Hash, Smile, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Post created!",
      description: "Your post has been shared with your followers.",
    });
    navigate("/");
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-card overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
          <h1 className="font-semibold text-foreground">New Post</h1>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Share
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex gap-4">
            <UserAvatar name="Guest" size="md" />
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[150px] border-0 bg-transparent resize-none text-lg text-foreground placeholder:text-muted-foreground focus-visible:ring-0 p-0"
                autoFocus
              />

              {imagePreview && (
                <div className="relative mt-4 rounded-xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-80 object-cover rounded-xl"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                    onClick={() => setImagePreview(null)}
                  >
                    <X className="h-4 w-4 text-white" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-primary hover:bg-accent"
              onClick={() =>
                setImagePreview(
                  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop"
                )
              }
            >
              <Image className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-primary hover:bg-accent"
            >
              <Video className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-primary hover:bg-accent"
            >
              <Hash className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-primary hover:bg-accent"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-primary hover:bg-accent"
            >
              <MapPin className="h-5 w-5" />
            </Button>
          </div>

          <span className="text-sm text-muted-foreground">
            {content.length}/500
          </span>
        </div>
      </motion.div>
    </MainLayout>
  );
}
