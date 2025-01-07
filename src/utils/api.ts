export type FetchOptions<T> = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    endpoint: string;
    headers?: Record<string, string>;
    body?: T;
};

export const fetchApi = async <T, R>(options: FetchOptions<T>): Promise<R> => {
    const { method, endpoint, headers, body } = options;

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://staging-shop.fado.vn/api";
    const apiKey = import.meta.env.VITE_API_KEY || "default-api-key";
    const authorizationToken = import.meta.env.VITE_AUTHORIZATION_TOKEN || "Bearer default-token";
    const cookie = import.meta.env.VITE_COOKIE || "default-cookie";

    const url = `${baseUrl}/${endpoint}`;

    const defaultHeaders: Record<string, string> = { 
        "accept": "application/json",
        "Content-Type": "application/json",
        "apikey": apiKey,
        "apiconnection": "appmobile",
        "Authorization": authorizationToken,
        "Cookie": cookie
    };

    const combinedHeaders = { ...defaultHeaders, ...headers };

    try {
        const response = await fetch(url, {
            method,
            headers: combinedHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch API Error:", error);
        throw error;
    }
};
