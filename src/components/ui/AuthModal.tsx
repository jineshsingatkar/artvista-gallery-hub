
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Role } from "@/types";

// Import our new components
import AuthMethodSelector from "@/components/auth/AuthMethodSelector";
import EmailLoginForm from "@/components/auth/EmailLoginForm";
import EmailSignupForm from "@/components/auth/EmailSignupForm";
import PhoneLoginForm from "@/components/auth/PhoneLoginForm";
import PhoneSignupForm from "@/components/auth/PhoneSignupForm";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import OtpVerificationDialog from "@/components/auth/OtpVerificationDialog";
import RoleSelectorForGoogle from "@/components/auth/RoleSelectorForGoogle";

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
            
            <CardContent>
              <AuthMethodSelector 
                value={loginMethod} 
                onChange={setLoginMethod}
                id="login"
              />
              
              {loginMethod === "email" && (
                <EmailLoginForm 
                  email={loginEmail}
                  password={loginPassword}
                  onEmailChange={(e) => setLoginEmail(e.target.value)}
                  onPasswordChange={(e) => setLoginPassword(e.target.value)}
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                />
              )}
              
              {loginMethod === "phone" && (
                <PhoneLoginForm
                  phone={loginPhone}
                  onPhoneChange={(e) => setLoginPhone(e.target.value)}
                  onSendOtp={() => handleSendOtp(loginPhone, "login")}
                  isLoading={isLoading}
                />
              )}
              
              {loginMethod === "google" && (
                <GoogleAuthButton 
                  onGoogleAuth={handleGoogleAuth}
                  isLoading={isLoading}
                />
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
            
            <CardContent>
              <AuthMethodSelector 
                value={signupMethod} 
                onChange={setSignupMethod}
                id="signup"
              />
            
              {signupMethod === "email" && (
                <EmailSignupForm
                  name={signupName}
                  email={signupEmail}
                  password={signupPassword}
                  confirmPassword={signupConfirmPassword}
                  role={role}
                  onNameChange={(e) => setSignupName(e.target.value)}
                  onEmailChange={(e) => setSignupEmail(e.target.value)}
                  onPasswordChange={(e) => setSignupPassword(e.target.value)}
                  onConfirmPasswordChange={(e) => setSignupConfirmPassword(e.target.value)}
                  onRoleChange={setRole}
                  onSubmit={handleSignup}
                  isLoading={isLoading}
                  showRoleSelector={showRoleSelector}
                />
              )}
              
              {signupMethod === "phone" && (
                <PhoneSignupForm
                  name={signupName}
                  phone={signupPhone}
                  role={role}
                  onNameChange={(e) => setSignupName(e.target.value)}
                  onPhoneChange={(e) => setSignupPhone(e.target.value)}
                  onRoleChange={setRole}
                  onSendOtp={() => handleSendOtp(signupPhone, "signup")}
                  isLoading={isLoading}
                  showRoleSelector={showRoleSelector}
                />
              )}
              
              {signupMethod === "google" && (
                <div className="space-y-4">
                  {showRoleSelector && (
                    <RoleSelectorForGoogle
                      role={role}
                      onRoleChange={setRole}
                    />
                  )}
                  <GoogleAuthButton 
                    onGoogleAuth={handleGoogleAuth}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* OTP Verification Dialog */}
      <OtpVerificationDialog
        open={otpDialogOpen}
        onOpenChange={setOtpDialogOpen}
        phoneNumber={phoneForVerification}
        otp={otp}
        onOtpChange={setOtp}
        onVerify={handleVerifyOtp}
        onResend={() => handleSendOtp(phoneForVerification, verificationPurpose)}
        isLoading={isLoading}
      />
      
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
