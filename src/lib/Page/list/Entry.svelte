<script lang="ts">
    import logo from "../../../assets/egg.png";
    //import "../../css/content/entry.css";
    import type { EggEntry } from "../../../ts/api/egg";
    import dayjs from "dayjs";
    import { onMount } from "svelte";
  
    export let data: EggEntry;
  
    let eggCount: number = 0;
  
    onMount(() => {
      eggCount = JSON.parse(data.amount as string);
    });
  
    function editEntry() {}
  
   /*  function details() {
      detailsData.set(data);
      showDetails.set(true);
    } */
  </script>

<div class="row">
    <span class="date">{dayjs(data.timestamp).format("DD-MM-YYYY")}</span>
    <span class="count">
      {#each Array(eggCount) as _}
        <img src={logo} alt="Egg" class="egg" />
      {/each}
    </span>
    <span class="person">{data.registrar}</span>
  
  </div>