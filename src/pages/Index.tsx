
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArtGrid from "@/components/art/ArtGrid";
import { artworks } from "@/data/mockData";

const Index: React.FC = () => {
  // Featured artworks - just take a few from the mock data
  const featuredArtworks = artworks.slice(0, 4);
  const newArrivals = [...artworks].sort(() => 0.5 - Math.random()).slice(0, 4); // Shuffle for demo

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="absolute inset-0 bg-gradient-to-br from-artvista-light/50 to-transparent -z-10"></div>
          <div className="absolute inset-0 -z-20">
            <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1577083552431-367465fb14b7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          </div>
          <div className="container text-center max-w-3xl animate-fade-in">
            <h1 className="mb-6">Discover Unique Art from Talented Artists</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              ArtVista connects art lovers with extraordinary pieces from around the world. 
              Browse our curated collection and find the perfect artwork for your space.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/gallery">Explore Gallery</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup?role=artist">Join as Artist</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Artworks Section */}
        <section className="section bg-muted/30">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="mb-2">Featured Artworks</h2>
                <p className="text-muted-foreground">
                  Handpicked selections from our gallery
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/gallery">View All</Link>
              </Button>
            </div>
            <ArtGrid artworks={featuredArtworks} />
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="section">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">How ArtVista Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We make buying and selling art simple and secure
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-artvista-light flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-artvista-primary">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Browse Art</h3>
                <p className="text-muted-foreground">
                  Explore our diverse collection of artworks from talented artists around the world.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-artvista-light flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-artvista-primary">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Purchase or Inquire</h3>
                <p className="text-muted-foreground">
                  Buy artwork directly or reach out to artists for inquiries about pieces that interest you.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-artvista-light flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-artvista-primary">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Receive Your Art</h3>
                <p className="text-muted-foreground">
                  We ensure secure payments and safe delivery of your artwork to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* New Arrivals Section */}
        <section className="section bg-muted/30">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="mb-2">New Arrivals</h2>
                <p className="text-muted-foreground">
                  Latest additions to our collection
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/gallery">View All</Link>
              </Button>
            </div>
            <ArtGrid artworks={newArrivals} />
          </div>
        </section>
        
        {/* Artist CTA Section */}
        <section className="section bg-artvista-primary/10">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:max-w-2xl">
                <h2 className="mb-4">Are You an Artist?</h2>
                <p className="text-lg mb-6">
                  Join ArtVista to showcase your artwork to art enthusiasts around the world. 
                  Our platform provides the tools you need to sell your art and connect with buyers.
                </p>
                <Button size="lg" className="bg-artvista-primary hover:bg-artvista-secondary" asChild>
                  <Link to="/signup?role=artist">Join as an Artist</Link>
                </Button>
              </div>
              <div className="lg:w-1/3">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop"
                    alt="Artist painting"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
