export interface OrderFormData {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  quantity: number;
  contactMethod: 'phone' | 'whatsapp' | 'email';
  notes: string;
  orderDate?: string; // ISO string timestamp of when the order was placed
}
