import { MainLayout } from "@/components/layout/MainLayout";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const categories = [
  { name: "For You", icon: Sparkles },
  { name: "Trending", icon: TrendingUp },
  { name: "Art", icon: null },
  { name: "Tech", icon: null },
  { name: "Travel", icon: null },
  { name: "Food", icon: null },
  { name: "Fashion", icon: null },
];

const exploreImages = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1682687221038-404670f01d03?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=300&h=300&fit=crop",
];

export default function Explore() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search posts, people, and tags..."
            className="pl-12 h-12 bg-card border-0 shadow-card focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto scrollbar-none pb-2"
        >
          {categories.map((category, index) => (
            <Button
              key={category.name}
              variant={index === 0 ? "default" : "secondary"}
              className={
                index === 0
                  ? "gradient-primary text-primary-foreground shadow-glow flex-shrink-0"
                  : "bg-card shadow-soft flex-shrink-0"
              }
            >
              {category.icon && <category.icon className="h-4 w-4 mr-2" />}
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-1 sm:gap-2"
        >
          {exploreImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
}
