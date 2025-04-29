
export type Role = 'admin' | 'artist' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  address?: Address;
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
}

export interface Art {
  id: string;
  title: string;
  description: string;
  price: number | null;
  imageUrl: string;
  category: string;
  forSale: boolean;
  artistId: string;
  artistName: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  artId: string;
  artTitle: string;
  artistId: string;
  artistName: string;
  price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentId?: string;
  createdAt: Date;
  shippingAddress: Address;
}

export interface Inquiry {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  artId: string;
  artTitle: string;
  artistId: string;
  artistName: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
}
