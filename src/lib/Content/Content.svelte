<script lang="ts">
  import { currentPage } from "../../ts/env";
  import "../../css/content/content.css";
  import { onMount } from "svelte";
  import { loadFromStore } from "../../ts/page/main";
import Confirmation from "./Confirmation.svelte";
import { showConfirmation } from "../../ts/confirmation/main";

  onMount(() => {
    loadFromStore("list");
  });
</script>

<div class="pagecontent">
  {#if $currentPage}
    <svelte:component this={$currentPage.content} />
  {/if}
</div>
