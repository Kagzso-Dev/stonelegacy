export interface Order {
  _id?: string;
  orderNumber?: string;
  customerName: string;
  mobile: string;
  email: string;
  address: string;
  productType: string;
  graniteType: string;
  size: string;
  engravingMethod: string;
  message?: string;
  quantity: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Delivered';
  paymentStatus: 'Unpaid' | 'Partial' | 'Paid';
  totalAmount?: number;
  createdAt?: string;
  imageUrl?: string;
}

export interface Product {
  _id?: string;
  name: string;
  category: 'granite' | 'size' | 'quality' | 'engraving';
  description?: string;
  price?: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface GalleryItem {
  _id?: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  createdAt?: string;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt?: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
}

export interface AnalyticsData {
  month: string;
  orders: number;
  revenue: number;
}
