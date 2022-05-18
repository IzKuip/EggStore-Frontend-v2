import { currentPage, sideBarOpened } from "../env";
import type { Page } from "./interfaces";
import { PageStore } from "./store";

export function openPage(content:Page) {
    currentPage.set(content);

    sideBarOpened.set(false);
}

export function loadFromStore(page:string) {
    if (PageStore.has(page)) {
        openPage(PageStore.get(page));
    } else openPage(PageStore.get("list"));
}