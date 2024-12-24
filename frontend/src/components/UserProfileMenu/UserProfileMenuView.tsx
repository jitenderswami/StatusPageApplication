import React from "react";
import { User } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserProfileMenuViewProps {
  user?: User;
  onLogout: () => void;
  showUserName?: boolean;
}

const UserProfileMenuView: React.FC<UserProfileMenuViewProps> = ({
  user,
  onLogout,
  showUserName,
}) => {
  if (!user) return null;

  const getInitials = (name?: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
        <Avatar className="size-4 shrink-0">
          <AvatarImage src={user.picture} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        {showUserName && <span className="truncate">{user.name}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-80" side="right">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
          <hr className="border-gray-200" />
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            Log out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileMenuView;
