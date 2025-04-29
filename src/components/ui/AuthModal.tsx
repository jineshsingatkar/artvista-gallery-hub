
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { AuthMethodSelector } from "@/components/auth/AuthMethodSelector";
import EmailLoginForm from "@/components/auth/EmailLoginForm";
import EmailSignupForm from "@/components/auth/EmailSignupForm";
import PhoneLoginForm from "@/components/auth/PhoneLoginForm";
import PhoneSignupForm from "@/components/auth/PhoneSignupForm";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { OtpVerificationDialog } from "@/components/auth/OtpVerificationDialog";
import RoleSelectorForGoogle from "@/components/auth/RoleSelectorForGoogle";
import { Role } from "@/types";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";

interface AuthModalProps {
  defaultTab?: "login" | "signup";
  showRoleSelector?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  defaultTab = "login",
  showRoleSelector = false,
}) => {
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [method, setMethod] = useState<"email" | "phone" | "google">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [sentToContact, setSentToContact] = useState("");
  const { login, signup, googleAuth } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setPhone("");
    setRole("user");
    setMethod("email");
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
      toast({
        title: "Login successful!",
        description: "Welcome back to ArtVista.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signup({ email, password, name, role });
      toast({
        title: "Account created!",
        description: "Welcome to ArtVista.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would send an OTP to the user's phone
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSentToContact(phone);
      setIsOtpDialogOpen(true);
      toast({
        title: "OTP sent!",
        description: `We've sent a verification code to ${phone}.`,
      });
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "Please check your phone number and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would verify the OTP with a backend service
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate login or signup based on current tab
      if (tab === "login") {
        await login({ phone });
      } else {
        await signup({ phone, name, role });
      }

      setIsOtpDialogOpen(false);
      toast({
        title: tab === "login" ? "Login successful!" : "Account created!",
        description: tab === "login" ? "Welcome back to ArtVista." : "Welcome to ArtVista.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "The code you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleAuth(role);
      toast({
        title: "Authentication successful!",
        description: "Welcome to ArtVista.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (value: string) => {
    setTab(value as "login" | "signup");
    resetForm();
  };

  const footerLink = (
    <div className="text-center text-sm text-muted-foreground">
      {tab === "login" ? (
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            className="underline underline-offset-4 hover:text-primary"
            onClick={() => handleTabChange("signup")}
          >
            Sign up
          </button>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <button
            type="button"
            className="underline underline-offset-4 hover:text-primary"
            onClick={() => handleTabChange("login")}
          >
            Log in
          </button>
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{tab === "login" ? "Login" : "Create an account"}</CardTitle>
            <CardDescription className="text-center">
              {tab === "login"
                ? "Enter your credentials to login to your account"
                : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>

              <AuthMethodSelector value={method} onValueChange={(value) => setMethod(value as any)} />

              <TabsContent value="login">
                {method === "email" && (
                  <EmailLoginForm
                    email={email}
                    password={password}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onSubmit={handleEmailLogin}
                    isLoading={isLoading}
                  />
                )}

                {method === "phone" && (
                  <PhoneLoginForm
                    phone={phone}
                    onPhoneChange={(e) => setPhone(e.target.value)}
                    onSendOtp={handleSendOtp}
                    isLoading={isLoading}
                  />
                )}

                {method === "google" && (
                  <div className="space-y-4">
                    {showRoleSelector && <RoleSelectorForGoogle role={role} onRoleChange={setRole} />}
                    <GoogleAuthButton onClick={handleGoogleAuth} />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="signup">
                {method === "email" && (
                  <EmailSignupForm
                    name={name}
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    role={role}
                    onNameChange={(e) => setName(e.target.value)}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                    onRoleChange={setRole}
                    onSubmit={handleEmailSignup}
                    isLoading={isLoading}
                    showRoleSelector={showRoleSelector}
                  />
                )}

                {method === "phone" && (
                  <PhoneSignupForm
                    name={name}
                    phone={phone}
                    role={role}
                    onNameChange={(e) => setName(e.target.value)}
                    onPhoneChange={(e) => setPhone(e.target.value)}
                    onRoleChange={setRole}
                    onSendOtp={handleSendOtp}
                    isLoading={isLoading}
                    showRoleSelector={showRoleSelector}
                  />
                )}

                {method === "google" && (
                  <div className="space-y-4">
                    {showRoleSelector && <RoleSelectorForGoogle role={role} onRoleChange={setRole} />}
                    <GoogleAuthButton onClick={handleGoogleAuth} />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {footerLink}
            <div className="text-center text-xs text-muted-foreground">
              By continuing, you agree to ArtVista's{" "}
              <Link to="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
      </div>

      <OtpVerificationDialog
        open={isOtpDialogOpen}
        onClose={() => setIsOtpDialogOpen(false)}
        onVerify={handleVerifyOtp}
        isLoading={isLoading}
        sentTo={sentToContact}
      />
    </div>
  );
};

export default AuthModal;
