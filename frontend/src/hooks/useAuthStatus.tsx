import { useAuth0 } from "@auth0/auth0-react";
import { useState, useRef, useEffect } from "react";

export const useAuthStatus = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [cachedAuthStatus, setCachedAuthStatus] = useState<boolean | null>(
    null
  );
  const initialCheckComplete = useRef(false);
  useEffect(() => {
    if (!isLoading && !initialCheckComplete.current) {
      setCachedAuthStatus(isAuthenticated);
      initialCheckComplete.current = true;
    }
  }, [isLoading, isAuthenticated]);
  // Only show loading state on initial load
  const effectiveLoading = !initialCheckComplete.current && isLoading;
  return {
    isAuthenticated: cachedAuthStatus ?? isAuthenticated,
    isLoading: effectiveLoading,
  };
};
