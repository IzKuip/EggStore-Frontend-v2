<script lang="ts">
  import { currentPage } from "../../ts/env";
  import "../../css/content/content.css";
  import { onMount } from "svelte";
  import { loadFromStore } from "../../ts/page/main";

  onMount(() => {
    loadFromStore("list");
  });
</script>

<div class="pagecontent">
  {#if $currentPage}
    <svelte:component this={$currentPage.content} />
  {:else}
    <h1>404</h1>
  {/if}
</div>
