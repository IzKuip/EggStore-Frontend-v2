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
  let element:HTMLDivElement;
  let reloading = false;
  onMount(async () => {
    reload()
  });

  function create() {
    loadFromStore("create");
  }

  async function reload() {
    reloading = true;
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

      setTimeout(() => {
        reloading = false;  
      }, 100);
      
    }, 1000);
  }

  function count(data: EggEntry) {
    eggCount.set(get(eggCount) + parseInt(data.amount as string));

    update()

    return "";
  }

  function update() {
    if (element)
      element.scrollTop = element.scrollHeight
  }
</script>

<div class="list">
  <div class="header">
    <button class="suggested" on:click={create} disabled={reloading}>
      <span class="material-icons">add</span><span> Toevoegen</span>
    </button>
    <button on:click={reload} disabled={reloading}>
      <span class="material-icons" class:reloading>sync</span><span> Herladen</span>
    </button>
  </div>
  <div class="row head">
    <span class="date">Datum</span>
    <span class="count">Aantal</span>
    <span class="person">Wie?</span>
  </div>
  <div class="content" bind:this={element}>
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
