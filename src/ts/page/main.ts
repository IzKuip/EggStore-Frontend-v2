import { hideConfirmation } from "../confirmation/main";
import { currentPage, currentPageId, sideBarOpened } from "../env";
import { log } from "../logs/main";
import type { Page } from "./interfaces";
import { PageStore } from "./store";

export function openPage(content:Page) {
    log("openPage","Pagina",`Pagina ${content.name} is geopend.`);
    currentPage.set(content);

    sideBarOpened.set(false);
    hideConfirmation();
}

export function loadFromStore(page:string) {
    if (PageStore.has(page)) {
        openPage(PageStore.get(page));

        currentPageId.set(page);
    } else openPage(PageStore.get("list"));
}