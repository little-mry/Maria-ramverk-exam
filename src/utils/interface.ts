interface Status {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface ApiKeyResponse {
  key: string | null;
}

export interface ApiKeyState extends Status, ApiKeyResponse {}

export interface TenantResponse {
  name: string | null;
  id: string | null;
}

export interface TenantState extends Status, TenantResponse {}

export interface IMenuItem {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
}

export interface MenuState extends Status {
  menu: IMenuItem[];
  /*  order: OrderResponse[] | null */
}

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: string;
}

export interface CartState {
  items: ICartItem[];
}

export interface OrderResponse {
  orderValue: number;
  eta: string;
  timestamp: string;
  state: string;
  id: string;
}

export interface OrderState extends Status {
  order: OrderResponse[]
}

export interface ReceiptResponse {
  id: string | null;
  orderValue: number | null;
  timestamp: string | null;
  items: ICartItem[];
  price: number | null;
}

export interface ReceiptState extends Status, ReceiptResponse {}