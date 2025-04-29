
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { env } from "@/lib/env";

interface ArtworkData {
  title: string;
  description: string;
  price: number | null;
  category: string;
  forSale: boolean;
  mainImage: File;
  additionalImages?: File[];
  medium?: string;
  dimensions?: string;
  year?: string;
}

export function useArtManagement() {
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const uploadArtwork = async (artworkData: ArtworkData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload artwork.",
        variant: "destructive",
      });
      return null;
    }

    if (user.role !== "artist") {
      toast({
        title: "Permission Denied",
        description: "Only artist accounts can upload artwork.",
        variant: "destructive",
      });
      return null;
    }

    setIsUploading(true);
    try {
      // In a real application, we would upload the image to Cloudinary or similar
      // and then send the artwork data to the backend
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock ID for the new artwork
      const newArtworkId = `art_${Date.now()}`;
      
      toast({
        title: "Artwork Uploaded",
        description: "Your artwork has been successfully added to your portfolio.",
      });
      
      return newArtworkId;
    } catch (error) {
      console.error("Error uploading artwork:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your artwork. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  const updateArtworkStatus = async (artworkId: string, forSale: boolean, price?: number) => {
    setIsUpdating(true);
    try {
      // In a real application, this would update the artwork's status in the database
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Artwork Updated",
        description: `The artwork is now ${forSale ? "available for sale" : "inquiry only"}.`,
      });
      
      return true;
    } catch (error) {
      console.error("Error updating artwork:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your artwork. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  const deleteArtwork = async (artworkId: string) => {
    try {
      // In a real application, this would delete the artwork from the database
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Artwork Deleted",
        description: "The artwork has been removed from your portfolio.",
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting artwork:", error);
      toast({
        title: "Deletion Failed",
        description: "There was an error deleting your artwork. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploadArtwork,
    updateArtworkStatus,
    deleteArtwork,
    isUploading,
    isUpdating,
  };
}
