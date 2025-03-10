interface Status {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null; 
}

export interface ApiKeyResponse {
    key: string;
}

export interface ApiKeyState extends Status, ApiKeyResponse{}

export interface TenantResponse {
    name: string;
    id: string;
}

export interface TenantState extends Status, TenantResponse{}



  