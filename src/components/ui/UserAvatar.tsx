import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showOnlineIndicator?: boolean;
  isOnline?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-20 w-20",
};

const indicatorSizes = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-4 w-4",
};

export function UserAvatar({
  src,
  name = "User",
  size = "md",
  className,
  showOnlineIndicator = false,
  isOnline = false,
}: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      <Avatar
        className={cn(
          sizeClasses[size],
          "ring-2 ring-background transition-transform hover:scale-105",
          className
        )}
      >
        <AvatarImage src={src || undefined} alt={name} className="object-cover" />
        <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showOnlineIndicator && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
            indicatorSizes[size],
            isOnline ? "bg-success" : "bg-muted-foreground"
          )}
        />
      )}
    </div>
  );
}
