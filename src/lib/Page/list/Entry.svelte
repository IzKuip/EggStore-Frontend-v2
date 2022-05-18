<script lang="ts">
  import logo from "../../../assets/egg.png";
  import type { EggEntry } from "../../../ts/api/egg";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { detailsData, editData } from "../../../ts/env";
  import { loadFromStore } from "../../../ts/page/main";

  export let data: EggEntry;

  let eggCount: number = 0;

  onMount(() => {
    eggCount = JSON.parse(data.amount as string);
  });

  function editEntry() {
    editData.set(data);
    loadFromStore("edit");
  }

  function details() {
    detailsData.set(data);
    loadFromStore("details");
  }
</script>

<div class="row" on:click={details}>
  <span class="date">{dayjs(data.timestamp).format("DD-MM-YYYY")}</span>
  <span class="count">
    {#each Array(eggCount) as _}
      <img src={logo} alt="Egg" class="egg" />
    {/each}
  </span>
  <span class="person">{data.registrar}</span>
</div>
