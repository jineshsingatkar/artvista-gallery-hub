
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Art } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface ArtCardProps {
  art: Art;
}

const ArtCard: React.FC<ArtCardProps> = ({ art }) => {
  return (
    <Card className="overflow-hidden group transition-all hover:-translate-y-1 hover:shadow-md">
      <Link to={`/art/${art.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={art.imageUrl} 
            alt={art.title} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={art.forSale ? "default" : "secondary"} className="capitalize">
              {art.forSale ? "For Sale" : "Inquiry Only"}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg line-clamp-1">{art.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {art.description}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            By {art.artistName}
          </p>
        </CardContent>
        <CardFooter className="px-4 py-3 flex justify-between items-center border-t">
          {art.price ? (
            <span className="font-semibold">{formatCurrency(art.price)}</span>
          ) : (
            <span className="text-muted-foreground">Contact for price</span>
          )}
          <Badge variant="outline" className="capitalize">
            {art.category}
          </Badge>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ArtCard;
