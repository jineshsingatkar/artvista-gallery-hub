
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">About ArtVista</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Connecting art lovers with exceptional artists since 2020.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg mb-4">
                  At ArtVista, we believe that art should be accessible to everyone. Our mission is to create a platform where talented artists can showcase their work to a global audience, and art enthusiasts can discover unique pieces that speak to them.
                </p>
                <p className="text-lg mb-6">
                  We're dedicated to supporting artists by providing them with the tools they need to sell their art and connect with buyers who appreciate their talent and creativity.
                </p>
                <Button asChild>
                  <Link to="/gallery">Explore Our Gallery</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop" 
                    alt="Art gallery" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-artvista-primary/10 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="section bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Meet the passionate individuals behind ArtVista who work tirelessly to connect artists with art lovers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="mb-4 relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 bg-artvista-primary/10 rounded-full"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&auto=format&fit=crop" 
                    alt="Sarah Johnson" 
                    className="rounded-full w-44 h-44 object-cover border-4 border-white absolute left-2 top-2"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-artvista-primary mb-2">Founder & CEO</p>
                <p className="text-sm text-muted-foreground">
                  With 15 years in the art world, Sarah founded ArtVista to make art more accessible to everyone.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="mb-4 relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 bg-artvista-primary/10 rounded-full"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&auto=format&fit=crop" 
                    alt="Michael Chen" 
                    className="rounded-full w-44 h-44 object-cover border-4 border-white absolute left-2 top-2"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
                <p className="text-artvista-primary mb-2">Art Director</p>
                <p className="text-sm text-muted-foreground">
                  Michael curates our collections and works directly with artists to showcase their best work.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="mb-4 relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 bg-artvista-primary/10 rounded-full"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1553514029-1318c9127859?w=300&h=300&auto=format&fit=crop" 
                    alt="Elena Rodriguez" 
                    className="rounded-full w-44 h-44 object-cover border-4 border-white absolute left-2 top-2"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Elena Rodriguez</h3>
                <p className="text-artvista-primary mb-2">Artist Relations</p>
                <p className="text-sm text-muted-foreground">
                  Elena ensures our artists have everything they need to succeed on our platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="section">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The principles that guide everything we do at ArtVista.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-artvista-light rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-artvista-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Creativity</h3>
                <p className="text-muted-foreground">
                  We celebrate the creative spirit and provide a space where artistic expression can flourish.
                </p>
              </div>
              
              {/* Value 2 */}
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-artvista-light rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-artvista-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a supportive community where artists and art lovers can connect and grow together.
                </p>
              </div>
              
              {/* Value 3 */}
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-artvista-light rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-artvista-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust</h3>
                <p className="text-muted-foreground">
                  We're committed to creating a trustworthy platform with secure transactions and authentic artwork.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section bg-artvista-primary/10">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Whether you're an artist looking to showcase your work or an art enthusiast searching for the perfect piece, ArtVista welcomes you.
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
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
