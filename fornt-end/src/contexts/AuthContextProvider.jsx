import React, { createContext, useCallback, useContext, useState } from "react";

import AsyncOperationStatus from "../utils/AsyncOperationStatus";
import AuthService from "../services/authService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
  const [asyncStatus, setAsyncStatus] = useState(AsyncOperationStatus.default);

  const signin = useCallback(async (username, password) => {
    const authService = new AuthService();
    try {
      setAsyncStatus(AsyncOperationStatus.pending);
      const response = await authService.signin(username, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAsyncStatus(AsyncOperationStatus.success);
    } catch (e) {
      setTimeout(() => {
        setAsyncStatus(AsyncOperationStatus.default);
      }, 1000);
      setAsyncStatus(AsyncOperationStatus.failure);
    }
  }, []);

  const getAccessToken = useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  }, []);

  const contextValue = {
    signin,
    getAccessToken,
    asyncStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
