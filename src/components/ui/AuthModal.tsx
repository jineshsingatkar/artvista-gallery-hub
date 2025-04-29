
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Role } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, Phone, LogIn } from "lucide-react"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  defaultTab?: "login" | "signup";
  redirectTo?: string;
  showRoleSelector?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  defaultTab = "login",
  redirectTo = "/",
  showRoleSelector = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone" | "google">("email");
  const [signupMethod, setSignupMethod] = useState<"email" | "phone" | "google">("email");
  
  // Email login/signup states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  
  // Phone login/signup states
  const [loginPhone, setLoginPhone] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  // Role state
  const [role, setRole] = useState<Role>("user");
  
  // OTP Dialog state
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [phoneForVerification, setPhoneForVerification] = useState("");
  const [verificationPurpose, setVerificationPurpose] = useState<"login" | "signup">("login");

  const { login, signup, loginWithPhone, signupWithPhone, loginWithGoogle, sendOtp, verifyOtp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get("redirect");
  const roleParam = searchParams.get("role") as Role | null;
  
  React.useEffect(() => {
    if (roleParam && (roleParam === "artist" || roleParam === "user" || roleParam === "admin")) {
      setRole(roleParam);
    }
  }, [roleParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      navigate(redirectParam || redirectTo);
    } catch (error) {
      // Error is handled in the AuthContext
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both password fields match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      await signup(signupName, signupEmail, signupPassword, role);
      navigate(redirectParam || redirectTo);
    } catch (error) {
      // Error is handled in the AuthContext
      setIsLoading(false);
    }
  };
  
  const handleSendOtp = async (phone: string, purpose: "login" | "signup") => {
    setIsLoading(true);
    try {
      await sendOtp(phone);
      setPhoneForVerification(phone);
      setVerificationPurpose(purpose);
      setOtpDialogOpen(true);
      setIsOtpSent(true);
    } catch (error) {
      // Error is handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const isValid = await verifyOtp(phoneForVerification, otp);
      
      if (isValid) {
        if (verificationPurpose === "login") {
          await loginWithPhone(phoneForVerification, otp);
        } else {
          await signupWithPhone(signupName || "User", phoneForVerification, role);
        }
        setOtpDialogOpen(false);
        navigate(redirectParam || redirectTo);
      }
    } catch (error) {
      // Error is handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate(redirectParam || redirectTo);
    } catch (error) {
      // Error is handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        {/* Login Tab */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            {/* Login Method Selector */}
            <CardContent>
              <RadioGroup
                className="flex flex-wrap gap-4 mb-4"
                defaultValue="email"
                value={loginMethod}
                onValueChange={(value) => setLoginMethod(value as "email" | "phone" | "google")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="login-email" />
                  <Label htmlFor="login-email" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="login-phone" />
                  <Label htmlFor="login-phone" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Phone
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="google" id="login-google" />
                  <Label htmlFor="login-google" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg> Google
                  </Label>
                </div>
              </RadioGroup>
              
              {/* Email Login Form */}
              {loginMethod === "email" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="/forgot-password"
                        className="text-xs text-artvista-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login with Email"}
                  </Button>
                </form>
              )}
              
              {/* Phone Login Form */}
              {loginMethod === "phone" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    onClick={() => handleSendOtp(loginPhone, "login")} 
                    className="w-full"
                    disabled={isLoading || !loginPhone}
                  >
                    {isLoading ? "Sending..." : "Continue with Phone"}
                  </Button>
                </div>
              )}
              
              {/* Google Login Button */}
              {loginMethod === "google" && (
                <Button 
                  onClick={handleGoogleAuth} 
                  className="w-full"
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? "Authenticating..." : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Sign Up Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Sign up to start exploring and purchasing art
              </CardDescription>
            </CardHeader>
            
            {/* Signup Method Selector */}
            <CardContent>
              <RadioGroup
                className="flex flex-wrap gap-4 mb-4"
                defaultValue="email"
                value={signupMethod}
                onValueChange={(value) => setSignupMethod(value as "email" | "phone" | "google")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="signup-email" />
                  <Label htmlFor="signup-email" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="signup-phone" />
                  <Label htmlFor="signup-phone" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Phone
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="google" id="signup-google" />
                  <Label htmlFor="signup-google" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg> Google
                  </Label>
                </div>
              </RadioGroup>
            
              {/* Email Signup Form */}
              {signupMethod === "email" && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {showRoleSelector && (
                    <div className="space-y-2">
                      <Label htmlFor="role">I am a</Label>
                      <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Art Buyer</SelectItem>
                          <SelectItem value="artist">Artist</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign up with Email"}
                  </Button>
                </form>
              )}
              
              {/* Phone Signup Form */}
              {signupMethod === "phone" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name-phone">Full Name</Label>
                    <Input
                      id="signup-name-phone"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      required
                    />
                  </div>
                  {showRoleSelector && (
                    <div className="space-y-2">
                      <Label htmlFor="role-phone">I am a</Label>
                      <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                        <SelectTrigger id="role-phone">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Art Buyer</SelectItem>
                          <SelectItem value="artist">Artist</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Button 
                    onClick={() => handleSendOtp(signupPhone, "signup")} 
                    className="w-full"
                    disabled={isLoading || !signupPhone}
                  >
                    {isLoading ? "Sending..." : "Continue with Phone"}
                  </Button>
                </div>
              )}
              
              {/* Google Signup Button */}
              {signupMethod === "google" && (
                <div className="space-y-4">
                  {showRoleSelector && (
                    <div className="space-y-2">
                      <Label htmlFor="role-google">I am a</Label>
                      <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                        <SelectTrigger id="role-google">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Art Buyer</SelectItem>
                          <SelectItem value="artist">Artist</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Button 
                    onClick={handleGoogleAuth} 
                    className="w-full"
                    disabled={isLoading}
                    variant="outline"
                  >
                    {isLoading ? "Authenticating..." : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify your phone number</DialogTitle>
            <DialogDescription>
              Enter the verification code sent to {phoneForVerification}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="mt-4 text-sm text-muted-foreground">
              Didn't receive a code? <button 
                onClick={() => handleSendOtp(phoneForVerification, verificationPurpose)}
                className="text-primary hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleVerifyOtp} 
              className="w-full" 
              disabled={otp.length !== 6 || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          By continuing, you agree to ArtVista's{" "}
          <a href="/terms" className="text-artvista-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-artvista-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
