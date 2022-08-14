<script lang="ts">
  import { apiReq } from "../../ts/api/main";
  import { egTokenKey, maxEggs } from "../../ts/env";

  import { onMount } from "svelte";

  import { loadFromStore } from "../../ts/page/main";

  import logo from "../../assets/egg.png";
  import { log } from "../../ts/logs/main";
  import { showConfirmation } from "../../ts/confirmation/main";

  let eggCount: number = 0;
  let disableDecr: boolean = false;
  let disableIncr: boolean = false;
  let registrar: string;
  let dateInput: any;
  let processing = false;

  onMount(async () => {
    checkDisabledState();
  });

  function close() {
    loadFromStore("list");
  }

  function incr() {
    log("Create.svelte", "Aantal", "Incrementatie geselecteerd...");
    if (eggCount < maxEggs) eggCount++;

    checkDisabledState();
  }

  async function s() {
    processing = true;
    log("Create.svelte", "Opslaan", "Wijzigingen worden opgeslagen...");
    if (registrar && dateInput && eggCount >= 0) {
      const req = await apiReq(
        `eggs/register`,
        {
          data: btoa(
            JSON.stringify({
              registrar,
              timestamp: dateInput,
              amount: eggCount,
            })
          ),
        },
        localStorage.getItem(egTokenKey)
      );

      if (!req.valid) {
        showConfirmation({
          title: "Fout",
          message:
            "Er is een fout opgetreden tijdens het opslaan van de gegevens!",
          okButton: {
            capt: "Sluiten",
            icon: "cancel",
            event: () => {},
          },
          cancelButton: {
            capt: "Probeer opnieuw",
            icon: "sync",
            event: s,
          },
        });

        return;
      }

      setTimeout(() => {
        processing = false;
        close();
      }, 100);
    }
  }

  function decr() {
    log("Create.svelte", "Aantal", "decrementatie geselecteerd...");
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
    <button class="suggested" on:click={s} disabled={processing || (!dateInput || !registrar)}>
      <span class="material-icons">save</span><span> Opslaan</span>
    </button>
    <button class="danger" on:click={close} disabled={processing}>
      <span class="material-icons">cancel</span><span> Annuleren</span>
    </button>
  </div>
  <div class="content fullheight">
    <p class="title">
      Vul de benodigde informatie in en klik op Opslaan om te bevestigen.
    </p>
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
