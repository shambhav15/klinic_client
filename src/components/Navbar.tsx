"use client";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import SearchBar from "./SearchBar";
import { DropdownMenuDemo } from "./DropdownMenuDemo";

const Navbar = () => {


  return (
    <div className="p-4 shadow">
      <div className="max-w-7xl flex m-auto flex-wrap gap-3 items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-bold text-3xl">Klinic</span>
        </Link>
        <div className="w-3/5">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenuDemo />
        </div>

      </div>
    </div>
  );
};

export default Navbar;
