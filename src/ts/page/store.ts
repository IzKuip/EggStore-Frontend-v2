import Details from "../../lib/Page/Details.svelte";
import Edit from "../../lib/Page/Edit.svelte";
import List from "../../lib/Page/List.svelte";
import type { Page } from "./interfaces";

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
    }]
]);