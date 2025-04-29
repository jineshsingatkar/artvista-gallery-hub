
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, Menu, User, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    
    switch (user.role) {
      case "admin":
        return "/admin";
      case "artist":
        return "/artist";
      default:
        return "/profile";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-artvista-primary">
            ArtVista
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium ${
              isActive("/")
                ? "text-artvista-primary"
                : "text-foreground hover:text-artvista-primary"
            } transition-colors`}
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className={`text-sm font-medium ${
              isActive("/gallery")
                ? "text-artvista-primary"
                : "text-foreground hover:text-artvista-primary"
            } transition-colors`}
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium ${
              isActive("/about")
                ? "text-artvista-primary"
                : "text-foreground hover:text-artvista-primary"
            } transition-colors`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium ${
              isActive("/contact")
                ? "text-artvista-primary"
                : "text-foreground hover:text-artvista-primary"
            } transition-colors`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                  aria-label="User menu"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()} className="cursor-pointer w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>ArtVista</SheetTitle>
                <SheetDescription>
                  Discover unique artworks from talented artists
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium ${
                    isActive("/") ? "text-artvista-primary" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium ${
                    isActive("/gallery") ? "text-artvista-primary" : ""
                  }`}
                >
                  Gallery
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium ${
                    isActive("/about") ? "text-artvista-primary" : ""
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium ${
                    isActive("/contact") ? "text-artvista-primary" : ""
                  }`}
                >
                  Contact
                </Link>
                
                <div className="h-px bg-border my-2" />
                
                {isAuthenticated ? (
                  <>
                    <Link 
                      to={getDashboardLink()} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2"
                    >
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/profile" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button asChild variant="default">
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
