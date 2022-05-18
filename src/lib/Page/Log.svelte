<script lang="ts">
  import "../../css/page/details.css";
  import { onMount } from "svelte";
  import { loadFromStore } from "../../ts/page/main";
  import { systemLog } from "../../ts/logs/main";

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
            {entry.timestamp}
            {entry.caller}
            {entry.title}
            {entry.message}
        {/each}
    </div>
  </div>
{/if}
