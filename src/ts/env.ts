import { writable } from "svelte/store";

export const isLoggedIn = writable<boolean>(false);
export const EggApiServ = `http://www.twihub.tk:9000/api`;
export const appDstName = "Reggistry";
export const appDstVers = [1,1,0];
export const egTokenKey = "eggToken";
export const sideBarOpened = writable<boolean>(false);
export const eggCount = writable<number>(0);
export const maxEggs = 6;