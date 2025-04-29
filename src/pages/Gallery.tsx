
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArtGrid from "@/components/art/ArtGrid";
import { artworks, categories } from "@/data/mockData";
import { Art } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Gallery: React.FC = () => {
  const [filteredArtworks, setFilteredArtworks] = useState<Art[]>(artworks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  
  const maxPrice = Math.max(...artworks.map(art => art.price || 0));
  
  useEffect(() => {
    let result = [...artworks];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        art => 
          art.title.toLowerCase().includes(term) || 
          art.description.toLowerCase().includes(term) ||
          art.artistName.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(art => art.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(art => {
      if (art.price === null) return true;
      return art.price >= priceRange[0] && art.price <= priceRange[1];
    });
    
    // Filter by for sale only
    if (forSaleOnly) {
      result = result.filter(art => art.forSale);
    }
    
    setFilteredArtworks(result);
  }, [searchTerm, selectedCategory, priceRange, forSaleOnly]);
  
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange([0, maxPrice]);
    setForSaleOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Gallery Header */}
        <section className="bg-muted/30 py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">Art Gallery</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore our curated collection of unique artworks from talented artists. 
              Find the perfect piece for your home or office.
            </p>
          </div>
        </section>
        
        {/* Gallery Content */}
        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              {/* Filters Sidebar */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  <Input 
                    placeholder="Search artworks..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="mb-4"
                  />
                  
                  <div className="mb-6">
                    <Label htmlFor="category" className="block mb-2">Category</Label>
                    <Select 
                      value={selectedCategory} 
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <Label>Price Range</Label>
                      <span className="text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, maxPrice]}
                      min={0}
                      max={maxPrice}
                      step={100}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mt-6"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-6">
                    <Checkbox 
                      id="forSale" 
                      checked={forSaleOnly}
                      onCheckedChange={(checked) => setForSaleOnly(checked as boolean)}
                    />
                    <Label htmlFor="forSale">For sale only</Label>
                  </div>
                  
                  <Button 
                    onClick={handleResetFilters}
                    variant="outline" 
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
                
                {/* Featured Artists Section could go here */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our art consultants can help you find the perfect piece for your space.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-artvista-primary">
                    Contact Us
                  </Button>
                </div>
              </div>
              
              {/* Gallery Grid */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-muted-foreground">
                      Showing {filteredArtworks.length} of {artworks.length} artworks
                    </p>
                  </div>
                  
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <ArtGrid artworks={filteredArtworks} />
                
                {filteredArtworks.length === 0 && (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium mb-2">No artworks found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms.
                    </p>
                    <Button onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
