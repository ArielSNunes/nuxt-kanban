import type { HttpClient } from "~/infra/http/HttpClient";

export class FetchAdapter implements HttpClient {
    async get<T>(url: string): Promise<T> {
        const data = await $fetch(url, { method: 'get' });
        return data as T;
    }

    async post<T>(url: string, data: any): Promise<any> {
        const responseData = await $fetch<number>(
            url,
            { method: 'post', body: data }
        );
        return responseData as T;
    }
}