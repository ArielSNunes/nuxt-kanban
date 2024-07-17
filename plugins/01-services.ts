import { BoardServiceHttp } from "~/services/BoardServiceHttp"

export default defineNuxtPlugin((nuxtApp) => {
    const boardService = new BoardServiceHttp();
    return {
        provide: {
            boardService
        }
    }
});