<script lang="ts">
  import type { EggEntry } from "../../ts/api/egg";

  import { apiReq } from "../../ts/api/main";
  import { egTokenKey } from "../../ts/env";

  import "../../css/page/list.css";
  import { loadFromStore } from "../../ts/page/main";
  import { onMount } from "svelte";

  let reloading = false;
  let leaderboardData: { registrar: string; eggs: number }[] = [];
  let counter = 0;

  function close() {
    loadFromStore("list");
  }

  async function reload() {
    reloading = true;
    leaderboardData = [];

    const req = await apiReq("eggs/get", {}, localStorage.getItem(egTokenKey));
    const eggList = req.data as EggEntry[];

    for (let i = 0; i < eggList.length; i++) {
      const registrars = eggList[i].registrar.split(",").join("").split(" ");

      for (let j = 0; j < registrars.length; j++) {
        if (registrars[j]) {
          if (!inLeaderBoard(registrars[j])) {
            leaderboardData.push({
              registrar: registrars[j],
              eggs: parseInt(eggList[i].amount as string),
            });
          } else {
            for (let k = 0; k < leaderboardData.length; k++) {
              if (leaderboardData[k].registrar == registrars[j]) {
                leaderboardData[k].eggs += parseInt(
                  eggList[i].amount as string
                );
              }
            }
          }
        }
      }
    }

    leaderboardData = leaderboardData.sort((a, b) => b.eggs - a.eggs);

    console.log(leaderboardData);

    setTimeout(() => {
      reloading = false;
    }, 1000);
  }

  function inLeaderBoard(registrar: string): boolean {
    for (let i = 0; i < leaderboardData.length; i++) {
      if (leaderboardData[i].registrar == registrar) return true;
    }
    return false;
  }

  function resetCounter() {
    counter = 0;
    return "";
  }

  function incCounter() {
    counter++;
    return "";
  }

  function decCounter() {
    counter--;
    return "";
  }

  onMount(() => {
    reload();
  });
</script>

<div class="list">
  <div class="header">
    <button on:click={close} class="suggested" disabled={reloading}>
      <span class="material-icons">cancel</span>
      <span>Sluiten</span>
    </button>
    <button on:click={reload} disabled={reloading}>
      <span class="material-icons" class:reloading>sync</span>
      <span>Herladen</span>
    </button>
  </div>
  <div class="content">
    {#if leaderboardData.length && !reloading}
      <table class="compact stats">
        <tr class="header">
          <td>Prijs</td>
          <td>Naam</td>
          <td>Aantal Eieren</td>
        </tr>
        {#each leaderboardData as participant}
          <tr>
            <td>
              <span
                class="material-icons prize{leaderboardData.indexOf(
                  participant
                ) + 1}">emoji_events</span
              >
            </td>
            <td>{participant.registrar}</td>
            <td>{participant.eggs}</td>
          </tr>
        {/each}
      </table>
      <h4>
        {leaderboardData[0].registrar} is aan de leiding met {leaderboardData[1]
          .registrar} als tweede en {leaderboardData[2].registrar} als derde.
      </h4>
    {/if}
  </div>
</div>
