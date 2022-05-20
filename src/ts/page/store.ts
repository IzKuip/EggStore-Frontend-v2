import UserPanel from "../../lib/Page/UserPanel.svelte";
import Create from "../../lib/Page/Create.svelte";
import Details from "../../lib/Page/Details.svelte";
import Edit from "../../lib/Page/Edit.svelte";
import List from "../../lib/Page/List.svelte";
import type { Page } from "./interfaces";
import LogSvelte from "../../lib/Page/Log.svelte";
import StatisticsSvelte from "../../lib/Page/Statistics.svelte";

export const PageStore = new Map<string,Page>([
    ["list",{
        name:"Lijst",
        icon:"list",
        content:List
    }],
    ["edit",{
        name:"Bewerken",
        icon:"edit",
        content:Edit
    }],
    ["details",{
        name:"Details",
        icon:"fact_check",
        content:Details
    }],
    ["create",{
        name:"Nieuw",
        icon:"add",
        content:Create
    }],
    ["userman",{
        name:"Account",
        icon:"user",
        content:UserPanel
    }],
    ["logs",{
        name:"Logboek",
        icon:"list",
        content:LogSvelte
    }],
    ["stats",{
        name:"Statistieken",
        icon:"dashboard",
        content:StatisticsSvelte
    }]
]);