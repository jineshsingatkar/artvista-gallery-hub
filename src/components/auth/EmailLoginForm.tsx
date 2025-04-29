
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailLoginFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={onEmailChange}
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
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login with Email"}
      </Button>
    </form>
  );
};

export default EmailLoginForm;
