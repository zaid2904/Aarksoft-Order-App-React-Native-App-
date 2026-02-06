export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SelectArea: undefined;
  SelectCustomer: { area: string };
};

export type MainTabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: { customer?: string; area?: string } | undefined;
  Cart: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
};

export type OrdersStackParamList = {
  OrderHistory: undefined;
  OrderDetails: { orderId: string };
};

export type Product = {
  id: string;
  name: string;
  unit: string;
  packs: number;
  price: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  lastOrderDate?: string;
  totalOrders?: number;
};

export type Area = {
  id: string;
  name: string;
  customerCount: number;
};

export type Order = {
  id: string;
  date: string;
  customer: string;
  phone: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Delivered' | 'Cancelled';
};
