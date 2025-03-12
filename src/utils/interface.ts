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
  id: string;
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
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: ICartItem[];
}

export interface OrderResponse {
  orderValue: number;
  eta: number;
  timestamp: string;
  state: string;
}

export interface OrderState extends Status {
  order: OrderResponse[]
}
