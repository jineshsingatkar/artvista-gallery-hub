
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { artworks } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ArtDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [inquiryMessage, setInquiryMessage] = useState("");
  
  const art = artworks.find(artwork => artwork.id === id);
  
  if (!art) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Artwork Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The artwork you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/gallery')}>Return to Gallery</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/art/${art.id}`);
      return;
    }
    
    // In a real app, this would navigate to a checkout page
    // For now, we'll just show a toast message
    toast({
      title: "Added to Cart",
      description: `"${art.title}" has been added to your cart.`,
    });
  };
  
  const handleInquiry = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/art/${art.id}`);
      return;
    }
    
    if (!inquiryMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message for your inquiry.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send an inquiry to the artist
    // For now, we'll just show a toast message
    toast({
      title: "Inquiry Sent",
      description: `Your inquiry about "${art.title}" has been sent to the artist.`,
    });
    
    setInquiryMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Artwork Image */}
            <div>
              <div className="rounded-lg overflow-hidden border">
                <img 
                  src={art.imageUrl} 
                  alt={art.title} 
                  className="w-full h-auto"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {/* Thumbnails would go here in a real app with multiple images */}
              </div>
            </div>
            
            {/* Artwork Details */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant={art.forSale ? "default" : "secondary"} className="capitalize">
                  {art.forSale ? "For Sale" : "Inquiry Only"}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {art.category}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{art.title}</h1>
              
              <div className="mb-4">
                <span className="text-muted-foreground">Artist: </span>
                <span className="font-medium">{art.artistName}</span>
              </div>
              
              {art.price ? (
                <div className="text-2xl font-bold mb-6">
                  {formatCurrency(art.price)}
                </div>
              ) : (
                <div className="text-xl text-muted-foreground mb-6">
                  Contact for price
                </div>
              )}
              
              <div className="prose dark:prose-invert mb-6">
                <p className="text-lg">{art.description}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Added on {formatDate(art.createdAt)}</span>
                </div>
              </div>
              
              {art.forSale && art.price ? (
                <Button size="lg" className="w-full mb-4" onClick={handleBuy}>
                  Add to Cart
                </Button>
              ) : null}
              
              <Button 
                variant={art.forSale && art.price ? "outline" : "default"} 
                size="lg" 
                className="w-full"
                onClick={() => {
                  document.getElementById('inquiry-section')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                Inquire About This Artwork
              </Button>
            </div>
          </div>
          
          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-3 max-w-md">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="artist">Artist</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Artwork Details</h3>
                  <p>
                    This {art.category.toLowerCase()} was created by {art.artistName} and added to our collection on {formatDate(art.createdAt)}.
                  </p>
                  <p>
                    {art.description}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Shipping Information</h3>
                  <p>
                    We take great care in packaging and shipping artwork to ensure it arrives in perfect condition. Here's what you can expect:
                  </p>
                  <ul>
                    <li>Professional packaging with protective materials</li>
                    <li>Shipping insurance included with all purchases</li>
                    <li>Domestic shipping: 3-5 business days</li>
                    <li>International shipping: 7-14 business days</li>
                    <li>Tracking information provided via email</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="artist" className="mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>About the Artist</h3>
                  <p>
                    {art.artistName} is a talented artist specializing in {art.category.toLowerCase()} art. Their unique style and attention to detail have made them a valuable member of the ArtVista community.
                  </p>
                  <p>
                    To see more works by this artist, visit their profile or browse our gallery filtering by artist name.
                  </p>
                  <Button variant="link" className="p-0 h-auto">
                    View Artist Profile
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Inquiry Section */}
          <div id="inquiry-section" className="mt-16 max-w-2xl mx-auto pt-4">
            <h2 className="text-2xl font-bold mb-6">
              Inquire About This Artwork
            </h2>
            
            <div className="bg-muted/30 rounded-lg p-6">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Interested in this artwork? Send a message to the artist to learn more or discuss details.
                  </p>
                  <Textarea
                    placeholder="Your message to the artist..."
                    className="min-h-[150px]"
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                  <Button onClick={handleInquiry}>Send Inquiry</Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    Please log in or create an account to inquire about this artwork.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => navigate(`/login?redirect=/art/${art.id}`)}>
                      Log In
                    </Button>
                    <Button onClick={() => navigate(`/signup?redirect=/art/${art.id}`)}>
                      Sign Up
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArtDetail;
