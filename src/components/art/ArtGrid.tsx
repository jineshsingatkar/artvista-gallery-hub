
import React from "react";
import ArtCard from "./ArtCard";
import { Art } from "@/types";

interface ArtGridProps {
  artworks: Art[];
  className?: string;
}

const ArtGrid: React.FC<ArtGridProps> = ({ artworks, className = "" }) => {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">No artworks found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or check back later for new additions.
        </p>
      </div>
    );
  }

  return (
    <div className={`art-grid ${className}`}>
      {artworks.map((artwork) => (
        <ArtCard key={artwork.id} art={artwork} />
      ))}
    </div>
  );
};

export default ArtGrid;
