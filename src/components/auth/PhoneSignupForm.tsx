
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/types";

interface PhoneSignupFormProps {
  name: string;
  phone: string;
  role: Role;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (value: Role) => void;
  onSendOtp: () => void;
  isLoading: boolean;
  showRoleSelector: boolean;
}

const PhoneSignupForm: React.FC<PhoneSignupFormProps> = ({
  name,
  phone,
  role,
  onNameChange,
  onPhoneChange,
  onRoleChange,
  onSendOtp,
  isLoading,
  showRoleSelector
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name-phone">Full Name</Label>
        <Input
          id="signup-name-phone"
          placeholder="John Doe"
          value={name}
          onChange={onNameChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-phone">Phone Number</Label>
        <Input
          id="signup-phone"
          type="tel"
          placeholder="+1234567890"
          value={phone}
          onChange={onPhoneChange}
          required
        />
      </div>
      {showRoleSelector && (
        <div className="space-y-2">
          <Label htmlFor="role-phone">I am a</Label>
          <Select value={role} onValueChange={onRoleChange}>
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
        onClick={onSendOtp} 
        className="w-full"
        disabled={isLoading || !phone}
      >
        {isLoading ? "Sending..." : "Continue with Phone"}
      </Button>
    </div>
  );
};

export default PhoneSignupForm;
