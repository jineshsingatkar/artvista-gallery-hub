
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/types";

interface EmailSignupFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (value: Role) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  showRoleSelector: boolean;
}

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({
  name,
  email,
  password,
  confirmPassword,
  role,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onRoleChange,
  onSubmit,
  isLoading,
  showRoleSelector
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={onNameChange}
          required
        />
      </div>
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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          required
        />
      </div>
      {showRoleSelector && (
        <div className="space-y-2">
          <Label htmlFor="role">I am a</Label>
          <Select value={role} onValueChange={onRoleChange}>
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
  );
};

export default EmailSignupForm;
