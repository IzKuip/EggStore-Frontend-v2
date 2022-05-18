<script lang="ts">
  import "../../css/page/details.css";
  import { onMount } from "svelte";
  import { loadFromStore } from "../../ts/page/main";
  import { systemLog } from "../../ts/logs/main";
import Item from "./log/Item.svelte";

  let render = false;

  onMount(async () => {
      render = true;
  });

  function close() {
    loadFromStore("list");
  }

  function clear() {
    systemLog.set([]);
  }
</script>

{#if render}
  <div class="list">
    <div class="header">
      <button class="suggested" on:click={close}>
        <span class="material-icons">cancel</span><span> Sluiten</span>
      </button>
      <button on:click={clear}>
        <span class="material-icons">delete</span><span> Maak leeg</span>
      </button>
    </div>
    <div class="content fullheight">
        {#each $systemLog as entry}
        <Item data={entry}/>
        {/each}
    </div>
  </div>
{/if}
