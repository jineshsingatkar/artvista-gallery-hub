
import React, { createContext, useContext, useState, useEffect } from "react";
import { Role, User } from "@/types";
import { users } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, passwordOrOtp: string) => Promise<void>;
  loginWithPhone: (phone: string, otp: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, emailOrPhone: string, passwordOrOtp: string, role?: Role) => Promise<void>;
  signupWithPhone: (name: string, phone: string, role?: Role) => Promise<void>;
  logout: () => void;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistence)
    const storedUser = localStorage.getItem("artvista_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("artvista_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (emailOrPhone: string, passwordOrOtp: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email (mock auth)
      // In a real app, this would be a backend API call
      const foundUser = users.find(u => u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone);
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      // In a real app, we would verify the password here
      
      // Set user state and store in localStorage
      setUser(foundUser);
      localStorage.setItem("artvista_user", JSON.stringify(foundUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string, otp: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would verify the OTP with the backend
      // For mock purposes, find a user with matching phone
      const foundUser = users.find(u => u.phone === phone);
      
      if (!foundUser) {
        // Create a new user if not found
        const newUser: User = {
          id: `user_${Date.now()}`,
          name: "Phone User",
          email: `${phone}@placeholder.com`,
          phone: phone,
          role: "user",
          createdAt: new Date(),
        };
        setUser(newUser);
        localStorage.setItem("artvista_user", JSON.stringify(newUser));
        
        toast({
          title: "Account created",
          description: "New account created with phone number",
        });
      } else {
        // Login with existing user
        setUser(foundUser);
        localStorage.setItem("artvista_user", JSON.stringify(foundUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would use the Google OAuth flow
      // For demonstration, we'll create a mock Google user
      const mockGoogleUser: User = {
        id: `google_${Date.now()}`,
        name: "Google User",
        email: "google.user@gmail.com",
        role: "user",
        createdAt: new Date(),
        avatar: "https://lh3.googleusercontent.com/a/default-user",
      };
      
      setUser(mockGoogleUser);
      localStorage.setItem("artvista_user", JSON.stringify(mockGoogleUser));
      
      toast({
        title: "Google login successful",
        description: `Welcome, ${mockGoogleUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Google login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, emailOrPhone: string, passwordOrOtp: string, role: Role = "user") => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists (mock validation)
      if (users.some(u => u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone)) {
        throw new Error("Email or phone already in use");
      }
      
      // Create new user (mock user creation)
      // In a real app, this would be a backend API call
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@placeholder.com`,
        phone: emailOrPhone.includes('@') ? undefined : emailOrPhone,
        role,
        createdAt: new Date(),
      };
      
      // Set user state and store in localStorage
      setUser(newUser);
      localStorage.setItem("artvista_user", JSON.stringify(newUser));
      
      toast({
        title: "Sign up successful",
        description: `Welcome to ArtVista, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithPhone = async (name: string, phone: string, role: Role = "user") => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if phone already exists (mock validation)
      if (users.some(u => u.phone === phone)) {
        throw new Error("Phone number already in use");
      }
      
      // Create new user with phone (mock user creation)
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email: `${phone}@placeholder.com`, // Placeholder email
        phone,
        role,
        createdAt: new Date(),
      };
      
      // Set user state and store in localStorage
      setUser(newUser);
      localStorage.setItem("artvista_user", JSON.stringify(newUser));
      
      toast({
        title: "Sign up successful",
        description: `Welcome to ArtVista, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendOtp = async (phone: string) => {
    try {
      // Simulate sending OTP
      // In a real app, this would call a backend API to send an SMS
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the "sent OTP" in localStorage for demo purposes
      // In a real app, this would be handled securely on the backend
      const mockOtp = "123456"; // Demo OTP, always 123456
      localStorage.setItem(`otp_${phone}`, mockOtp);
      
      toast({
        title: "OTP sent",
        description: `A verification code has been sent to ${phone}`,
      });
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const verifyOtp = async (phone: string, otp: string) => {
    try {
      // Simulate OTP verification
      // In a real app, this would call a backend API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check against the stored "mock OTP" for demo purposes
      const mockOtp = localStorage.getItem(`otp_${phone}`) || "123456";
      
      if (otp !== mockOtp) {
        throw new Error("Invalid OTP");
      }
      
      // Clear the stored OTP
      localStorage.removeItem(`otp_${phone}`);
      
      return true;
    } catch (error) {
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("artvista_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      loginWithPhone,
      loginWithGoogle,
      signup,
      signupWithPhone,
      logout,
      sendOtp,
      verifyOtp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
