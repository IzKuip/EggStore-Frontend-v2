<script lang="ts">
  import { apiReq } from "../../ts/api/main";
  import { appDstName, eggCount, egTokenKey, loginStatus } from "../../ts/env";

  import { onMount } from "svelte";

  import "../../css/page/list.css";
  import Entry from "./list/Entry.svelte";
  import { loadFromStore, openPage } from "../../ts/page/main";
  import type { EggEntry } from "../../ts/api/egg";
  import { get } from "svelte/store";
import { logout } from "../../ts/api/auth";

  let eggList = [];
  onMount(async () => {
    reload()
  });

  function create() {
    loadFromStore("create");
  }

  async function reload() {
    eggList = [];
    setTimeout(async () => {
      const req = await apiReq(
        "eggs/get",
        {},
        localStorage.getItem(egTokenKey)
      );

      if (!req.valid) {
        logout();
        loginStatus.set([true,"Incorrecte sessie!"]);
      }

      eggList = req.data as [];

      eggCount.set(0);
    }, 1000);
  }

  function count(data: EggEntry) {
    eggCount.set(get(eggCount) + parseInt(data.amount as string));

    return "";
  }
</script>

<div class="list">
  <div class="header">
    <button class="suggested" on:click={create}>
      <span class="material-icons">add</span><span> Toevoegen</span>
    </button>
    <button on:click={reload}>
      <span class="material-icons">sync</span><span> Herladen</span>
    </button>
  </div>
  <div class="row head">
    <span class="date">Datum</span>
    <span class="count">Aantal</span>
    <span class="person">Wie?</span>
  </div>
  <div class="content">
    {#each eggList as entry}
      {count(entry)}
      <Entry data={entry} />
    {/each}
    {#if !eggList.length}
    <p class="loading">
      <span class="material-icons">hourglass_empty</span><span>Verbinden met {appDstName} server
      </span>
    </p>{/if}
  </div>
</div>
