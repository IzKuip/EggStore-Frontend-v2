import { appDstName } from "../env";

export interface PageLinkData {
  caption: string;
  pageName: string;
  icon: string;
}

export const SideBarPageLinks: PageLinkData[] = [
  { caption: "Lijst", pageName: "list", icon: "list" },
  { caption: "Account", pageName: "userman", icon: "person" },
  { caption: `Logboek`, pageName: "logs", icon: "report" },
  { caption: `Statistieken`, pageName: "stats", icon: "analytics" },
  { caption: `Scorebord`, pageName: "leaderboard", icon: "leaderboard" },
];