import { MainLayout } from "@/components/layout/MainLayout";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Grid3X3, Bookmark, Heart } from "lucide-react";
import { motion } from "framer-motion";

const userPosts = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1682687221038-404670f01d03?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop",
];

export default function Profile() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-card p-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <UserAvatar
              name="Guest User"
              size="xl"
              className="h-24 w-24 sm:h-28 sm:w-28"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <h1 className="text-2xl font-bold text-foreground">Guest User</h1>
                <div className="flex gap-2 justify-center sm:justify-start">
                  <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity">
                    Edit Profile
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 max-w-md">
                Welcome to Pulse! This is your profile page. Sign in to customize it.
              </p>

              <div className="flex justify-center sm:justify-start gap-6">
                <div className="text-center">
                  <p className="font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                  <p className="font-bold text-foreground">847</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                  <p className="font-bold text-foreground">234</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full bg-card shadow-card rounded-xl h-12 p-1">
              <TabsTrigger value="posts" className="flex-1 gap-2 data-[state=active]:bg-accent">
                <Grid3X3 className="h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex-1 gap-2 data-[state=active]:bg-accent">
                <Bookmark className="h-4 w-4" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="liked" className="flex-1 gap-2 data-[state=active]:bg-accent">
                <Heart className="h-4 w-4" />
                Liked
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {userPosts.map((image, index) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-4 text-white">
                        <span className="flex items-center gap-1">
                          <Heart className="h-5 w-5 fill-current" /> 124
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <div className="text-center py-12 text-muted-foreground">
                <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No saved posts yet</p>
              </div>
            </TabsContent>

            <TabsContent value="liked" className="mt-6">
              <div className="text-center py-12 text-muted-foreground">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No liked posts yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </MainLayout>
  );
}
