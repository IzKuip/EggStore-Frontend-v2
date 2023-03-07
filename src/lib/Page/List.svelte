<script lang="ts">
  import { apiReq } from "../../ts/api/main";
  import {
    appDstName,
    eggCount,
    egTokenKey,
    itmCount,
    LOCKED,
    loginStatus,
  } from "../../ts/env";

  import { onMount } from "svelte";

  import "../../css/page/list.css";
  import Entry from "./list/Entry.svelte";
  import { loadFromStore } from "../../ts/page/main";
  import type { EggEntry } from "../../ts/api/egg";
  import { get } from "svelte/store";

  let eggList = [];
  let element: HTMLDivElement;
  let reloading = false;
  onMount(async () => {
    await reload();

    update();
  });

  function create() {
    loadFromStore("create");
  }

  async function reload() {
    eggCount.set(0);
    itmCount.set(0);
    reloading = true;
    eggList = [];

    const req = await apiReq("eggs/get", {}, localStorage.getItem(egTokenKey));

    if (!req.valid) {
      /* logout(); */
      loginStatus.set([true, "Incorrecte sessie!"]);
    }

    const data = req.data;

    for (let i = 0; i < Object.keys(data).length; i++) {
      eggList.push(data[Object.keys(data)[i]]);
    }

    eggList.sort(function (a, b) {
      return new Date(a.timestamp).getTime() + new Date(b.timestamp).getTime();
    });

    eggCount.set(0);

    setTimeout(() => {
      reloading = false;
    }, 100);
  }

  function count(data: EggEntry) {
    eggCount.set(get(eggCount) + parseInt(data.amount as string));
    itmCount.set(get(itmCount) + 1);

    update();

    return "";
  }

  function update() {
    if (element) element.scrollTop = element.scrollHeight;
  }
</script>

<div class="list">
  <div class="header">
    <button class="suggested" on:click={create} disabled={reloading || LOCKED}>
      <span class="material-icons">add</span><span> Toevoegen</span>
    </button>
    <button on:click={reload} disabled={reloading}>
      <span class="material-icons" class:reloading>sync</span><span>
        Herladen</span
      >
    </button>
    <button class="flat">{$itmCount} items</button>
  </div>
  <div class="row head">
    <span class="date">Datum</span>
    <span class="count">Aantal</span>
    <span class="person">Wie?</span>
  </div>
  <div class="content withrow" bind:this={element}>
    {#if eggList && !reloading}
      {#each eggList as entry}
        {count(entry)}
        <Entry data={entry} />
      {/each}
      {#if !eggList.length}
        <p class="loading">
          <span class="material-icons">cancel</span><span
            >De reggistry is leeg.
          </span>
        </p>{/if}
    {:else}
      <p class="loading">
        <span class="material-icons">hourglass_empty</span><span
          >Verbinden met {appDstName} server
        </span>
      </p>
    {/if}
  </div>
</div>
