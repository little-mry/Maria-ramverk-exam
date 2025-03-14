import { TenantResponse, IMenuItem } from "./interface";

const baseUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
let tenantId: string | null;
let orderId: string | null;


//FETCH KEY
export const fetchKey = async (): Promise<string> => {
  const response = await fetch(`${baseUrl}/keys`, { method: "POST" });
  if (!response.ok) throw new Error("Kunde inte hämta nyckeln");
  const data = await response.json();

  return data.key;
};

//CREATE TENANT
export const createTenant = async (
  apiKey: string,
  tenant: string
): Promise<TenantResponse> => {
  
  const response = await fetch(`${baseUrl}/tenants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": `${apiKey}`,
    },
    body: JSON.stringify({ name: tenant }),
  });

  if (!response.ok) throw new Error("Kunde inte skapa tenant");
  const data = await response.json();
  tenantId = data.id; 

  return data;
};

//FETCH MENU
export const fetchMenu = async (): Promise<IMenuItem[]> => {
  const apiKey = await fetchKey(); 
  if (!apiKey) throw new Error("API-nyckel saknas");
  
  const response = await fetch(`${baseUrl}/menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": `${apiKey}`,
    },
  });
  
  if (!response.ok) throw new Error("Kunde inte hämta meny");
  const data = await response.json();
  return data.items;
};

//SUBMIT ORDER
export const submitOrder = async (orderItems: number[]): Promise<any> => {
  const apiKey = await fetchKey();
  const response = await fetch(`${baseUrl}/${tenantId}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": apiKey || "",
    },
    body: JSON.stringify({ items: orderItems }),
  });

  if (!response.ok) throw new Error("Kunde inte skicka order");

  const data = await response.json();
  orderId = data.order.id

  return {
    order: data,
    orderId: data.order.id
  }
};

//FETCH ORDERINFO
export const fetchOrderInfo = async () => {
  const apiKey = await fetchKey();
  const response = await fetch(`${baseUrl}/${tenantId}/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": apiKey || "",
    },
  });

  if (!response.ok) throw new Error("Kunde inte hämta orderinfo");

  const data = await response.json();
  console.log('aktuell order data:', data);
  
  if (data.orders && Array.isArray(data.orders)) {
    return data.orders.map((order: any) => ({
      orderValue: order.orderValue,
      eta: order.eta,
      timestamp: order.timestamp,
      state: order.state
    }));
  }
  else if (data.order) {
    return [{
      orderValue: data.order.orderValue,
      eta: data.order.eta,
      timestamp: data.order.timestamp,
      state: data.order.state,
      id: data.order.id,
    }];
  }
  
  return [];

};

//FETCH RECEIPT
export const createReceipt = async ( orderIdNew: string) => {
  const apiKey = await fetchKey();
  const response = await fetch(`${baseUrl}/receipts/${orderIdNew}`, {
    method: 'GET',
    headers: {
      accept: "application/json",
      "x-zocom": apiKey || "",
    }
    })
  if (!response.ok) throw new Error("Kunde inte hämta kvitto");

  const data = await response.json();

  return data.receipt
}
