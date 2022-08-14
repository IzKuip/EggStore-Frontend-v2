<script lang="ts">
  import "../../css/elements.css";
  import { onMount } from "svelte";
  import { loadFromStore } from "../../ts/page/main";
  import { systemLog } from "../../ts/logs/main";
  import Item from "./log/Item.svelte";

  let render = false;

  let element: HTMLDivElement;

  onMount(async () => {
    render = true;

    update();
  });

  function close() {
    loadFromStore("list");
  }

  function clear() {
    systemLog.set([]);
  }

  function update() {
    if (element) element.scrollTop = element.scrollHeight;

    return "";
  }
</script>

{#if render}
  <div class="list">
    <div class="header">
      <button class="suggested" on:click={close}>
        <span class="material-icons">cancel</span><span> Sluiten</span>
      </button>
      <button class="danger" on:click={clear}>
        <span class="material-icons">delete</span><span> Maak leeg</span>
      </button>
    </div>
    <div class="content" bind:this={element}>
      {#each $systemLog as entry}
        <Item data={entry} />
        {update()}
      {/each}
    </div>
  </div>
{/if}
