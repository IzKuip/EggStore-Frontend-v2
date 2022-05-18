<script lang="ts">
  import { apiReq } from "../../ts/api/main";
  import { detailsData, editData, egTokenKey } from "../../ts/env";

  import { onMount } from "svelte";

  import "../../css/page/details.css";
  import { loadFromStore } from "../../ts/page/main";

  import logo from "../../assets/egg.png";
  import type { EggEntry } from "src/ts/api/egg";
  import { get } from "svelte/store";
  import dayjs from "dayjs";

  let data: EggEntry;

  let eggCount: number = 0;
  let disableDecr: boolean = false;
  let disableIncr: boolean = false;
  let registrar: string;
  let dateInput: any;

  let render = false;

  onMount(async () => {
    data = get(detailsData);
    
    registrar = data.registrar;
    eggCount = parseInt(data.amount as string);
    dateInput = data.timestamp;

    render = true;
  });

  function close() {
    loadFromStore("list");
  }

  function edit() {
    editData.set(data);
    loadFromStore("edit");
  }
</script>

{#if render}
<div class="list">
  <div class="header">
    <button class="suggested" on:click={edit}>
      <span class="material-icons">edit</span><span> Bewerken</span>
    </button>
    <button on:click={close}>
      <span class="material-icons">cancel</span><span> Sluiten</span>
    </button>
  </div>
  <div class="content fullheight">
    {#if $detailsData}
      <p>Klik op bewerken als je incorrecte informatie moet bewerken.</p>
      <table>
        <tr>
          <td>Datum: </td>
          <td>{dayjs(data.timestamp).format("DD-MM-YYYY")}</td>
        </tr>
        <tr
          ><td> Aantal: &nbsp;&nbsp;</td><td>
            <span class="counter">{eggCount}</span>
            <span>
              {#each Array(eggCount) as _}<img src={logo} alt="Logo" />{/each}
            </span>
          </td>
        </tr>
        <tr>
          <td>Wie?</td>
          <td>{registrar}</td>
        </tr>
      </table>
    {/if}
  </div>
</div>
{/if}