import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { authenticatedClient } from "../../../lib/client";
import { UserProfile } from "../../../types/UserProfileType";
import { URLS } from "@/constants/Urls";

interface DashboardViewProps {
  // Add your props here
}

const DashboardView: React.FC<DashboardViewProps> = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // const profile = await authenticatedClient.get(URLS.USER_PROFILE);
        // setUserProfile(profile as unknown as UserProfile);
      } catch (error) {
        console.error("Error loading user profile:", error);
        setError("Failed to load user profile");
      }
    };

    loadUserProfile();

    // if (user) {
    // 	setUserProfile(user?. as UserProfile);
    // }
  }, [getAccessTokenSilently, user]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userProfile.name}</h1>
      <div>
        <img src={userProfile.picture} alt="Profile" />
        <p>Email: {userProfile.email}</p>
        {/* Add more profile information as needed */}
      </div>
    </div>
  );
};

export default DashboardView;
