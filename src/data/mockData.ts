
import { Art, Category, Inquiry, Order, User } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Paintings" },
  { id: "2", name: "Sculptures" },
  { id: "3", name: "Digital Art" },
  { id: "4", name: "Photography" },
  { id: "5", name: "Mixed Media" },
  { id: "6", name: "Illustrations" },
  { id: "7", name: "Abstract" },
  { id: "8", name: "Portrait" }
];

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@artvista.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&auto=format&fit=crop",
    phone: "+1234567890",
    createdAt: new Date(2023, 1, 1)
  },
  {
    id: "2",
    name: "Jane Artist",
    email: "jane@artvista.com",
    role: "artist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&auto=format&fit=crop",
    phone: "+1234567891",
    createdAt: new Date(2023, 2, 15)
  },
  {
    id: "3",
    name: "John Artist",
    email: "john@artvista.com",
    role: "artist",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&auto=format&fit=crop",
    phone: "+1234567892",
    createdAt: new Date(2023, 3, 10)
  },
  {
    id: "4",
    name: "Alice User",
    email: "alice@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&auto=format&fit=crop",
    phone: "+1234567893",
    createdAt: new Date(2023, 4, 5)
  },
  {
    id: "5",
    name: "Bob User",
    email: "bob@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=200&h=200&auto=format&fit=crop",
    phone: "+1234567894",
    createdAt: new Date(2023, 5, 20)
  }
];

export const artworks: Art[] = [
  {
    id: "1",
    title: "Ethereal Dreams",
    description: "A vibrant abstract painting with swirling colors representing the ephemeral nature of dreams.",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop",
    category: "Paintings",
    forSale: true,
    artistId: "2",
    artistName: "Jane Artist",
    createdAt: new Date(2023, 6, 15)
  },
  {
    id: "2",
    title: "Urban Perspective",
    description: "A black and white photograph capturing the geometric patterns of modern city architecture.",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop",
    category: "Photography",
    forSale: true,
    artistId: "3",
    artistName: "John Artist",
    createdAt: new Date(2023, 7, 10)
  },
  {
    id: "3",
    title: "Digital Landscape",
    description: "A futuristic digital artwork depicting an imaginary landscape with neon elements.",
    price: 750,
    imageUrl: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=500&auto=format&fit=crop",
    category: "Digital Art",
    forSale: true,
    artistId: "2",
    artistName: "Jane Artist",
    createdAt: new Date(2023, 8, 5)
  },
  {
    id: "4",
    title: "Bronze Figurine",
    description: "A small bronze sculpture depicting a human figure in motion.",
    price: 2200,
    imageUrl: "https://images.unsplash.com/photo-1544413164-5f1b361f5bfa?w=500&auto=format&fit=crop",
    category: "Sculptures",
    forSale: true,
    artistId: "3",
    artistName: "John Artist",
    createdAt: new Date(2023, 9, 20)
  },
  {
    id: "5",
    title: "Abstract Composition #5",
    description: "A large-scale abstract painting with geometric shapes and bold colors.",
    price: 1800,
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&auto=format&fit=crop",
    category: "Paintings",
    forSale: true,
    artistId: "2",
    artistName: "Jane Artist",
    createdAt: new Date(2023, 10, 12)
  },
  {
    id: "6",
    title: "Serenity",
    description: "A peaceful nature landscape capturing the tranquility of a mountain lake.",
    price: null,
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500&auto=format&fit=crop",
    category: "Photography",
    forSale: false,
    artistId: "3",
    artistName: "John Artist",
    createdAt: new Date(2023, 11, 8)
  },
  {
    id: "7",
    title: "Modern Portrait",
    description: "A contemporary portrait painting with an experimental color palette.",
    price: 950,
    imageUrl: "https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=500&auto=format&fit=crop",
    category: "Paintings",
    forSale: true,
    artistId: "2",
    artistName: "Jane Artist",
    createdAt: new Date(2024, 0, 15)
  },
  {
    id: "8",
    title: "Geometric Abstraction",
    description: "A digital artwork exploring the relationship between shapes and colors in a minimal composition.",
    price: 600,
    imageUrl: "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=500&auto=format&fit=crop",
    category: "Digital Art",
    forSale: true,
    artistId: "3",
    artistName: "John Artist",
    createdAt: new Date(2024, 1, 5)
  }
];

export const orders: Order[] = [
  {
    id: "1",
    userId: "4",
    userName: "Alice User",
    artId: "1",
    artTitle: "Ethereal Dreams",
    artistId: "2",
    artistName: "Jane Artist",
    price: 1200,
    status: "delivered",
    paymentStatus: "paid",
    paymentId: "pay_123456",
    createdAt: new Date(2023, 7, 20),
    shippingAddress: {
      street: "123 Main St",
      city: "Artville",
      state: "AR",
      postalCode: "12345",
      country: "USA"
    }
  },
  {
    id: "2",
    userId: "5",
    userName: "Bob User",
    artId: "3",
    artTitle: "Digital Landscape",
    artistId: "2",
    artistName: "Jane Artist",
    price: 750,
    status: "shipped",
    paymentStatus: "paid",
    paymentId: "pay_123457",
    createdAt: new Date(2023, 9, 15),
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Creativetown",
      state: "CT",
      postalCode: "67890",
      country: "USA"
    }
  },
  {
    id: "3",
    userId: "4",
    userName: "Alice User",
    artId: "5",
    artTitle: "Abstract Composition #5",
    artistId: "2",
    artistName: "Jane Artist",
    price: 1800,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date(2024, 0, 10),
    shippingAddress: {
      street: "789 Pine Blvd",
      city: "Artville",
      state: "AR",
      postalCode: "12345",
      country: "USA"
    }
  }
];

export const inquiries: Inquiry[] = [
  {
    id: "1",
    userId: "4",
    userName: "Alice User",
    userEmail: "alice@example.com",
    artId: "6",
    artTitle: "Serenity",
    artistId: "3",
    artistName: "John Artist",
    message: "I'm interested in this piece. Could you tell me more about the inspiration behind it?",
    status: "responded",
    createdAt: new Date(2023, 11, 10)
  },
  {
    id: "2",
    userId: "5",
    userName: "Bob User",
    userEmail: "bob@example.com",
    artId: "2",
    artTitle: "Urban Perspective",
    artistId: "3",
    artistName: "John Artist",
    message: "Is this available for international shipping? I'm based in Europe.",
    status: "pending",
    createdAt: new Date(2024, 0, 5)
  }
];
