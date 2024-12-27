import React, { useEffect, useRef } from "react";
import AuthenticatedLayoutView from "./AuthenticatedLayoutView";
import { useAuth0 } from "@auth0/auth0-react";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStroage";

const AuthenticatedLayoutContainer: React.FC = () => {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAuth0();
  const isTokenFetchingRef = useRef(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (isTokenFetchingRef.current) return;

      try {
        isTokenFetchingRef.current = true;
        const token = await getAccessTokenSilently();
        if (token) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
        // Clear token on error
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      } finally {
        isTokenFetchingRef.current = false;
      }
    };

    // If authenticated but no token, fetch it
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (isAuthenticated && !isAuthLoading && !token) {
      fetchToken();
    }

    // If not authenticated, remove token
    if (!isAuthenticated && !isAuthLoading) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    }
  }, [isAuthenticated, getAccessTokenSilently, isAuthLoading]);

  return <AuthenticatedLayoutView />;
};

export default AuthenticatedLayoutContainer;
