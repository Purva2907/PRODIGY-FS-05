import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface TrendingItem {
  tag: string;
  posts: number;
  category?: string;
}

const trendingItems: TrendingItem[] = [
  { tag: "#TechInnovation", posts: 12400, category: "Technology" },
  { tag: "#MondayMotivation", posts: 8200, category: "Lifestyle" },
  { tag: "#DesignTips", posts: 5600, category: "Design" },
  { tag: "#Photography", posts: 4300, category: "Art" },
  { tag: "#Startup", posts: 3100, category: "Business" },
];

export function TrendingWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card rounded-2xl shadow-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Trending Now</h3>
      </div>

      <div className="space-y-4">
        {trendingItems.map((item, index) => (
          <motion.div
            key={item.tag}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="cursor-pointer group"
          >
            <p className="text-xs text-muted-foreground">{item.category}</p>
            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
              {item.tag}
            </p>
            <p className="text-xs text-muted-foreground">
              {item.posts.toLocaleString()} posts
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
