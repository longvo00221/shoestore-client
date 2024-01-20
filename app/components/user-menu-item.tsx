import React from "react";
import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser,UserButton } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
const UserItem = () => {
  const { user } = useUser();
  return (
    <UserButton></UserButton>
  );
};
export default UserItem;
