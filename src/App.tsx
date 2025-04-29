
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { validateEnv } from "@/lib/env";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ArtDetail from "./pages/ArtDetail";
import UserDashboard from "./pages/dashboard/UserDashboard";
import ArtistDashboard from "./pages/dashboard/ArtistDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AuthModal from "./components/ui/AuthModal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Validate environment variables on startup
    validateEnv();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/art/:id" element={<ArtDetail />} />
              <Route path="/profile" element={<UserDashboard />} />
              <Route path="/artist" element={<ArtistDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<div className="p-8"><AuthModal defaultTab="login" /></div>} />
              <Route path="/signup" element={<div className="p-8"><AuthModal defaultTab="signup" showRoleSelector /></div>} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
