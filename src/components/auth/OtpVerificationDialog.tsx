
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OtpVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
  otp: string;
  onOtpChange: (value: string) => void;
  onVerify: () => void;
  onResend: () => void;
  isLoading: boolean;
}

const OtpVerificationDialog: React.FC<OtpVerificationDialogProps> = ({
  open,
  onOpenChange,
  phoneNumber,
  otp,
  onOtpChange,
  onVerify,
  onResend,
  isLoading
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your phone number</DialogTitle>
          <DialogDescription>
            Enter the verification code sent to {phoneNumber}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <InputOTP maxLength={6} value={otp} onChange={onOtpChange}>
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
              onClick={onResend}
              className="text-primary hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
        <DialogFooter>
          <Button 
            onClick={onVerify} 
            className="w-full" 
            disabled={otp.length !== 6 || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OtpVerificationDialog;
