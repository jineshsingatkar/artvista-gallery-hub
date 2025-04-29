
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/types";

interface RoleSelectorProps {
  role: Role;
  onRoleChange: (value: Role) => void;
}

const RoleSelectorForGoogle: React.FC<RoleSelectorProps> = ({
  role,
  onRoleChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="role-google">I am a</Label>
      <Select value={role} onValueChange={onRoleChange}>
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
  );
};

export default RoleSelectorForGoogle;
