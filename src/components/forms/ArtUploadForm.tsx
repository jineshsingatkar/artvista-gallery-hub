
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { categories } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

interface ArtUploadFormProps {
  onArtworkAdded: () => void;
}

const ArtUploadForm: React.FC<ArtUploadFormProps> = ({ onArtworkAdded }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [forSale, setForSale] = useState(true);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [dimensions, setDimensions] = useState("");
  const [medium, setMedium] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setAdditionalImages([...additionalImages, ...filesArray]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !mainImage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload a main image.",
        variant: "destructive"
      });
      return;
    }

    if (forSale && !price) {
      toast({
        title: "Price Required",
        description: "Please enter a price for your artwork.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate upload with delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Artwork Added Successfully",
        description: `"${title}" has been added to your portfolio.`
      });
      
      // Reset the form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setForSale(true);
      setMainImage(null);
      setAdditionalImages([]);
      setDimensions("");
      setMedium("");
      setYear("");
      setPreviewUrl(null);
      
      // Close the dialog
      onArtworkAdded();
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your artwork. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Add New Artwork</DialogTitle>
        <DialogDescription>
          Fill in the details below to add a new artwork to your portfolio.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="art-title" className="font-medium">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="art-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter artwork title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="art-description" className="font-medium">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="art-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your artwork"
            className="min-h-[100px]"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="art-category" className="font-medium">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
              required
            >
              <SelectTrigger id="art-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="art-year" className="font-medium">Year Created</Label>
            <Input
              id="art-year"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g., 2023"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="art-medium" className="font-medium">Medium/Materials</Label>
            <Input
              id="art-medium"
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="e.g., Oil on canvas"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="art-dimensions" className="font-medium">Dimensions</Label>
            <Input
              id="art-dimensions"
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="e.g., 24 x 36 inches"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="art-for-sale" className="font-medium">
              Available For Sale
            </Label>
            <Switch 
              id="art-for-sale"
              checked={forSale}
              onCheckedChange={setForSale}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {forSale 
              ? "Your artwork will be listed with a price and available for purchase." 
              : "Your artwork will be displayed for viewing only, with an inquiry option."}
          </p>
        </div>
        
        {forSale && (
          <div className="space-y-2">
            <Label htmlFor="art-price" className="font-medium">
              Price ($) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="art-price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in USD"
              required={forSale}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="art-main-image" className="font-medium">
            Main Image <span className="text-red-500">*</span>
          </Label>
          <Input
            id="art-main-image"
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="cursor-pointer"
            required
          />
          {previewUrl && (
            <div className="mt-2 relative aspect-[4/3] max-h-[200px] overflow-hidden rounded-md border">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="art-additional-images" className="font-medium">
            Additional Images (Optional)
          </Label>
          <Input
            id="art-additional-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
            className="cursor-pointer"
          />
          {additionalImages.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {additionalImages.length} additional image(s) selected
            </p>
          )}
        </div>
      </div>
      
      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Add Artwork"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ArtUploadForm;
