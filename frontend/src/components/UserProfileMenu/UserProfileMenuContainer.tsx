import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfileMenuView from "./UserProfileMenuView";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStroage";

interface UserProfileMenuContainerProps {
  showUserName?: boolean;
}

const UserProfileMenuContainer: React.FC<UserProfileMenuContainerProps> = ({
  showUserName,
}) => {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } }).then();
    Object.values(LOCAL_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  return (
    <UserProfileMenuView
      user={user}
      onLogout={handleLogout}
      showUserName={showUserName}
    />
  );
};

export default UserProfileMenuContainer;
