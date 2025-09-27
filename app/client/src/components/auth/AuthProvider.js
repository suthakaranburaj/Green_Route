// components/auth/AuthProvider.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "@/helper/commonHelper";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuthStatus = async () => {
      try {
        const storedToken = localStorage.getItem("paisabuddy_token");
        const storedUser = localStorage.getItem("paisabuddy_user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Verify token validity with backend
          await apiClient.get("/auth/verify", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('fwei')
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      console.log(response,"weuhowei")
      const { user: userData, token: authToken } = response.data.data;

      // Store token and user data
      localStorage.setItem("paisabuddy_token", authToken);
      localStorage.setItem("paisabuddy_user", JSON.stringify(userData));

      setToken(authToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await apiClient.post("/auth/verify-otp", {
        email,
        otp,
      });

      const { user: userData, token: authToken } = response.data;

      // Store token and user data
      localStorage.setItem("paisabuddy_token", authToken);
      localStorage.setItem("paisabuddy_user", JSON.stringify(userData));

      setToken(authToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("paisabuddy_token");
    localStorage.removeItem("paisabuddy_user");
    setToken(null);
    setUser(null);
  };

  const resendOTP = async (email) => {
    try {
      await apiClient.post("/auth/resend-otp", { email });
      return { success: true };
    } catch (error) {
      console.error("Resend OTP error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to resend OTP. Please try again.",
      };
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    verifyOTP,
    logout,
    resendOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
