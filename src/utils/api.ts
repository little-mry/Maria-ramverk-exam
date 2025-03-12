import {TenantResponse, IMenuItem} from "./interface";

const baseUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
let apiKey: string | null;
let tenantId: string | null;

//FETCH KEY
export const fetchKey = async (): Promise<string> => {
  const response = await fetch(`${baseUrl}/keys`, { method: "POST" });
  if (!response.ok) throw new Error("Kunde inte hämta nyckeln");
  const data = await response.json()
  
  return data.key;
};

//CREATE TENANT
export const createTenant = async (
  apiKey: string,
  tenant: string
): Promise<TenantResponse> => {
  console.log(tenant);
  
    const response = await fetch(`${baseUrl}/tenants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": `${apiKey}`,
    },
    body: JSON.stringify({ name: `${tenant}` }),
  });
 
  if (!response.ok) throw new Error("Kunde inte skapa tenant");
  const data = await response.json();  
  tenantId = data.id

  return  data;
};

//FETCH MENU
export const fetchMenu = async (): Promise<IMenuItem[]> => {
  apiKey = await fetchKey();
  if (!apiKey) throw new Error("API-nyckel saknas");

  const response = await fetch(`${baseUrl}/menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": `${apiKey}`,
    },
  });
  
  if (!response.ok) throw new Error("Kunde inte hämta meny");
  const data = await response.json()
  return data.items;
};


//SUBMIT ORDER
export const submitOrder = async (orderItems: number[]): Promise<any> => {
  const response = await fetch(`${baseUrl}/${tenantId}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": apiKey || ''
    },
    body: JSON.stringify({ 'items': orderItems }),
  });

  if (!response.ok) throw new Error("Kunde inte skicka order");

  
  const data = await response.json()
  console.log('ordersvar:', data);
  
  return data

}