import { appDstName } from "../env";

export interface PageLinkData {
  caption: string;
  pageName: string;
  icon: string;
}

export const SideBarPageLinks: PageLinkData[] = [
  { caption: "Lijst", pageName: "list", icon: "list" },
  { caption: "Account", pageName: "userman", icon: "person" },
  { caption: `${appDstName} Logboek`, pageName: "logs", icon: "report" },
  { caption: `${appDstName} Statistieken`, pageName: "stats", icon: "dashboard" },
];