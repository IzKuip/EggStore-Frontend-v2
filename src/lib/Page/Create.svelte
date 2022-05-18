<script lang="ts">
  import { apiReq } from "../../ts/api/main";
  import { egTokenKey } from "../../ts/env";

  import { onMount } from "svelte";

  import "../../css/page/create.css";
  import { loadFromStore } from "../../ts/page/main";

  import logo from "../../assets/egg.png";
import { log } from "../../ts/logs/main";

  let eggCount: number = 0;
  let disableDecr: boolean = false;
  let disableIncr: boolean = false;
  let registrar: string;
  let dateInput: any;

  onMount(async () => {
    checkDisabledState();
  });

  function close() {
    loadFromStore("list");
  }

  function incr() {
    log("Create.svelte","Aantal verandering","Incrementatie geselecteerd...");
    if (eggCount < 6) eggCount++;

    checkDisabledState();
  }

  async function s() {
    log("Create.svelte","Opslaan","Wijzigingen worden opgeslagen...");
    if (registrar && dateInput && eggCount >= 0) {

      await apiReq(
        `eggs/register`,
        {
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
    log("Create.svelte","Aantal verandering","decrementatie geselecteerd...");
    if (eggCount > 0) eggCount--;

    checkDisabledState();
  }

  function checkDisabledState() {
    disableIncr = !!(eggCount == 6);
    disableDecr = !!(eggCount == 0);
  }
</script>

<div class="list">
  <div class="header">
    <button class="suggested" on:click={s}>
      <span class="material-icons">save</span><span> Opslaan</span>
    </button>
    <button on:click={close}>
      <span class="material-icons">cancel</span><span> Annuleren</span>
    </button>
  </div>
  <div class="content fullheight">
    <p>Vul de benodigde informatie in en klik op Opslaan om te bevestigen.</p>
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
