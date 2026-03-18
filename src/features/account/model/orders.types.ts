export type OrderFileWithUrl = { name: string; url: string };

export type OrderItem = {
  product: string;
  quantity: number;
  price: number;
  /** Файли позиції замовлення з посиланнями для завантаження */
  filesWithUrl?: OrderFileWithUrl[];
};

export type Order = {
  id: string;
  createdAt: string;
  orderNumber?: string;
  user: string | { id: string };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  /** Повне посилання на файл інвойсу з CMS (якщо є) */
  invoiceDownloadUrl?: string | null;
  paymentMethod: string;
  deliverables: string;
};

export type OrderStatus =
  | 'pending'
  | 'Pending'
  | 'cancelled'
  | 'Cancelled'
  | 'in progress'
  | 'In Progress'
  | 'completed'
  | 'Completed';

export function isOrderCompleted(status: string): boolean {
  return status?.toLowerCase() === 'completed';
}
