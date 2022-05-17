<script lang="ts">
  import { apiReq } from "../../ts/api/main";
  import { egTokenKey } from "../../ts/env";

  import { onMount } from "svelte";

  import "../../css/page/list.css";
import Entry from "./list/Entry.svelte";

  let eggList = [];
  onMount(async () => {
    const req = await apiReq("eggs/get", {}, localStorage.getItem(egTokenKey));

    eggList = req.data as [];
  });
</script>

<div class="list">
  <div class="header">
    <button class="suggested">
      <span class="material-icons">add</span> Toevoegen
    </button>
  </div>
  <div class="content">
    {#each eggList as entry}
      <Entry data={entry}/>
    {/each}
  </div>
</div>
