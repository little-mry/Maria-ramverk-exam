import { ApiKeyResponse, TenantResponse, MenuItem } from "./interface";

const baseUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
/* let tenantId: string; */

///////FETCH KEY///////////
export const fetchKey = async (): Promise<ApiKeyResponse> => {
  const response = await fetch(`${baseUrl}/keys`, { method: "POST" });
  if (!response.ok) throw new Error("Kunde inte hämta nyckeln");
  return response.json();
};


///////FETCH MENU///////////
export const fetchMenu = async (apiKey: string): Promise<MenuItem[]> => {
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

///////CREATE TENANT///////////
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
    body: JSON.stringify({ name: `${tenant}` }),
  });
 
  
  if (!response.ok) throw new Error("Kunde inte skapa tenant");
  return response.json();
};