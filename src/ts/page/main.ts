import { currentPage, sideBarOpened } from "../env";
import { log } from "../logs/main";
import type { Page } from "./interfaces";
import { PageStore } from "./store";

export function openPage(content:Page) {
    log("openPage","Pagina",`Pagina ${content.name} is geopend.`);
    currentPage.set(content);

    sideBarOpened.set(false);
}

export function loadFromStore(page:string) {
    if (PageStore.has(page)) {
        openPage(PageStore.get(page));
    } else openPage(PageStore.get("list"));
}