import { tokenType } from "@/types/authorization";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import storage from "../storage";

export const useAuthorization = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const retrievedToken = storage.getToken("user_data");
    setToken(retrievedToken);
  }, []);
  // debugger;
  console.log(token);

  let decodedToken: tokenType | undefined;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      // Handle token decoding error here
      console.error("Error decoding token:", error);
      decodedToken = undefined;
    }
  }

  const checkToken = React.useCallback(() => {
    if (token !== null) {
      console.log(token);
      if (decodedToken && Date.now() < (decodedToken.exp || 0) * 1000) {
        return true; // Default to true if no specific roles are required
      }
      console.log("clearing token");

      storage.clearCookies("user_data");
      return false; // Token is missing, expired
    }
  }, [decodedToken, token]);

  return { checkToken, role: decodedToken?.role };
};
