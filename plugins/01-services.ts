import { FetchAdapter } from "~/infra/http/FetchAdapter";
import { BoardServiceHttp } from "~/services/BoardServiceHttp"

export default defineNuxtPlugin((nuxtApp) => {
    const httpClient = new FetchAdapter()
    const boardService = new BoardServiceHttp(httpClient, 'http://localhost');
    return {
        provide: {
            boardService
        }
    }
});