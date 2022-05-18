import type { SvelteComponent } from "svelte/internal";
import { writable } from "svelte/store";
import type { Page } from "./page/interfaces";

export const isLoggedIn = writable<boolean>(false);
export const EggApiServ = `http://www.twihub.tk:9000/api`;
export const appDstName = "Reggistry";
export const appDstVers = [1,1,0];
export const egTokenKey = "eggToken";
export const sideBarOpened = writable<boolean>(false);
export const eggCount = writable<number>(0);
export const maxEggs = 6;
export const currentPage = writable<Page>();