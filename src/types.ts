import { Timestamp } from "firebase/firestore";

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'successful' | 'failed';

export interface Service {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  iconName: string;
  active: boolean;
}

export interface Booking {
  id?: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  phone: string;
  email: string;
  message: string;
  status: BookingStatus;
  createdAt: Timestamp | Date;
}

export interface Payment {
  id?: string;
  bookingId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  transactionId: string;
  createdAt: Timestamp | Date;
}

export interface Feedback {
  id?: string;
  customerName: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: Timestamp | Date;
}

export interface NewsPost {
  id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Timestamp | Date;
}
