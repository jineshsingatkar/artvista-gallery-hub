
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneLoginFormProps {
  phone: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendOtp: () => void;
  isLoading: boolean;
}

const PhoneLoginForm: React.FC<PhoneLoginFormProps> = ({
  phone,
  onPhoneChange,
  onSendOtp,
  isLoading
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1234567890"
          value={phone}
          onChange={onPhoneChange}
          required
          className="text-base"
        />
        <p className="text-xs text-muted-foreground">
          Enter your phone number with country code
        </p>
      </div>
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

export default PhoneLoginForm;
