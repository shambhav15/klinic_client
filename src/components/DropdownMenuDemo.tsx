"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function DropdownMenuDemo() {
  const router = useRouter();
  const { logoutUser, user } = useAuthStore();

  console.log("User state from store:", user);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  // Check if user is loaded
  if (!user) {
    console.log("No user data available");
    return null;
  }

  const { name, phone } = user as User;

  // Debug output to ensure user data is available
  console.log("Rendering DropdownMenu with user:", { name, phone });

  return (
    <>
      <div onClick={handleLogout} >logout</div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {name ? (
            <Button className="rounded-full h-10 w-10">
              {name[0]}
            </Button>
          ) : (
            <Button className="rounded-full h-10 w-10">
              User
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-stone-800">
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{phone}</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <div className="flex justify-between w-full">
              Logout
              <LogOut size={20} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
