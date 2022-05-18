<script lang="ts">
  import { apiReq } from "../../ts/api/main";
  import { editData, egTokenKey } from "../../ts/env";

  import { onMount } from "svelte";

  import "../../css/page/create.css";
  import { loadFromStore } from "../../ts/page/main";

  import logo from "../../assets/egg.png";
  import type { EggEntry } from "../../ts/api/egg";
  import { get } from "svelte/store";
  import { log } from "../../ts/logs/main";

  let data: EggEntry;

  let eggCount: number = 0;
  let disableDecr: boolean = false;
  let disableIncr: boolean = false;
  let registrar: string;
  let dateInput: any;

  let processing = false;

  onMount(async () => {
    data = get(editData);
    registrar = data.registrar;
    eggCount = parseInt(data.amount as string);
    dateInput = data.timestamp;
    checkDisabledState();
  });

  function close() {
    loadFromStore("list");
  }

  function incr() {
    log("Edit.svelte","Aantal","Incrementatie geselecteerd...");

    if (eggCount < 6) eggCount++;

    checkDisabledState();
  }

  async function s() {
    log("Edit.svelte","Opslaan","Wijzigingen worden opgeslagen...");

    if (registrar && dateInput && eggCount >= 0) {
      await apiReq(
        `eggs/change`,
        {
          id: data.id,
          registrar,
          timestamp: dateInput,
          amount: eggCount,
        },
        localStorage.getItem(egTokenKey)
      );

      setTimeout(() => {
        close();
      }, 100);
    }
  }

  function decr() {
    log("Edit.svelte","Aantal","Decrementatie geselecteerd...");

    if (eggCount > 0) eggCount--;

    checkDisabledState();
  }

  function checkDisabledState() {
    disableIncr = !!(eggCount == 6);
    disableDecr = !!(eggCount == 0);
  }

  function back() {
    loadFromStore("details");
  }

  async function del() {
    processing = true;
    log("Edit.svelte","Verwijdering",`#${data.id} wordt verwijderd.`);
    await apiReq(
      `eggs/delete`,
      {
        id: data.id,
      },
      localStorage.getItem(egTokenKey)
    );

    setTimeout(() => {
      close();
      processing = false;
    }, 100);
  }
</script>

<div class="list">
  <div class="header">
    <button class="suggested" on:click={s} disabled={processing}>
      <span class="material-icons">save</span><span> Opslaan</span>
    </button>
    <button on:click={back} disabled={processing}>
      <span class="material-icons">arrow_back_ios_new</span><span> Terug</span>
    </button>
    <button class="danger" on:click={del} disabled={processing}>
      <span class="material-icons">delete</span><span> Verwijderen</span>
    </button>
  </div>
  <div class="content fullheight">
    <p class="title">Vul de benodigde informatie in en klik op Opslaan om te bevestigen.</p>
    <table>
      <tr>
        <td>Datum: </td>
        <td><input type="date" bind:value={dateInput} /></td>
      </tr>
      <tr
        ><td> Aantal: &nbsp;&nbsp;</td><td>
          <button
            class="material-icons suggested"
            disabled={disableDecr}
            on:click={decr}
          >
            remove
          </button>

          <button
            class="material-icons suggested"
            disabled={disableIncr}
            on:click={incr}
          >
            add
          </button>

          <span class="counter">{eggCount}</span>
          <span>
            {#each Array(eggCount) as _}<img src={logo} alt="Logo" />{/each}
          </span>
        </td>
      </tr>
      <tr>
        <td>Wie?</td>
        <td><input bind:value={registrar} /></td>
      </tr>
    </table>
  </div>
</div>
