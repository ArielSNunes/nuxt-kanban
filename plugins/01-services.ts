import { BoardServiceHttp } from "~/services/BoardServiceHttp"

export default defineNuxtPlugin((nuxtApp) => {
    const boardService = new BoardServiceHttp();
    nuxtApp.vueApp.provide('boardService', boardService);
    return {
        provide: { boardService }
    }
});