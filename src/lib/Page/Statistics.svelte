<script lang="ts">
  import "../../css/page/list.css";

  import { loadFromStore } from "../../ts/page/main";
  import { onMount } from "svelte";
  import {
    appDstName,
    eggCount,
    egTokenKey,
    itmCount,
    loginStatus,
    maxEggs,
  } from "../../ts/env";
  import { apiReq } from "../../ts/api/main";
  import { logout } from "../../ts/api/auth";
  import type { EggEntry } from "../../ts/api/egg";
  import { get } from "svelte/store";
  import dayjs from "dayjs";
  import logo from "../../assets/egg.png";
  import { roundDecimals } from "../../ts/util";

  let firstDate: string | number = "";
  let eggList = [];
  let reloading = false;
  let username: string = "niemand";
  let usrEggCount = 0;
  let eggRegistrarList: EggEntry[] = [];
  let percentage: string = "0";
  let levelCounts: number[] = [];
  let entryCount = 0;
  let perRegistrarEggs = {};
  let perRegistrarEntries = {};
  let dataSize = 0;

  onMount(async () => {
    await reload();
  });

  async function reload() {
    eggCount.set(0);
    itmCount.set(0);
    reloading = true;
    eggList = [];
    entryCount = 0;

    setTimeout(async () => {
      const req = await apiReq(
        "eggs/get",
        {},
        localStorage.getItem(egTokenKey)
      );

      if (!req.valid) {
        /* logout(); */
        loginStatus.set([true, "Incorrecte sessie!"]);
      }

      const eggs = req.data as EggEntry[];

      dataSize = JSON.stringify(req.data).length;

      eggList = req.data as [];

      entryCount = eggList.length;

      firstDate = (eggs[0] as EggEntry).timestamp;

      for (let i = 0; i < eggs.length; i++) {
        eggCount.set(get(eggCount) + parseInt(eggs[i].amount as string));
      }

      await updateUserEggs();

      setTimeout(() => {
        reloading = false;
      }, 100);

      percentage = roundDecimals((100 / $eggCount) * usrEggCount, 2);
    }, 1000);
  }

  function close() {
    loadFromStore("list");
  }

  async function updateUserEggs() {
    levelCounts = Array.from(Array(maxEggs).keys());
    usrEggCount = 0;
    username = atob(localStorage.getItem(egTokenKey)).split(":")[0];

    for (let i = 0; i < levelCounts.length; i++) {
      levelCounts[i] = 0;
    }

    const eggs = await apiReq("eggs/get", {}, localStorage.getItem(egTokenKey));

    if (!eggs.valid) {
      /* logout(); */

      loginStatus.set([true, "Incorrecte sessie!"]);
    }

    const list = eggs.data as EggEntry[];

    for (let i = 0; i < list.length; i++) {
      const registrars = list[i].registrar.toLowerCase().split(",");
      const uname = username.toLowerCase().split(" ")[0].split(",")[0];

      for (let j = 0; j < registrars.length; j++) {
        const registrar = registrars[j].split(" ").join("");

        if (registrar == uname) {
          usrEggCount += parseInt(list[i].amount as string);

          eggRegistrarList.push(list[i]);
        }

        if (!perRegistrarEggs[registrar]) {
          perRegistrarEggs[registrar] = parseInt(list[i].amount as string);
        } else {
          perRegistrarEggs[registrar] += parseInt(list[i].amount as string);
        }

        if (!perRegistrarEntries[registrar]) {
          perRegistrarEntries[registrar] = 1;
        } else {
          perRegistrarEntries[registrar] += 1;
        }
      }

      levelCounts[parseInt(list[i].amount as string) - 1] += 1;
    }

    console.log(usrEggCount);
  }
</script>

<div class="list">
  <div class="header">
    <button class="suggested" on:click={close} disabled={reloading}>
      <span class="material-icons">cancel</span><span> Sluiten</span>
    </button>
    <button on:click={reload} disabled={reloading}>
      <span class="material-icons" class:reloading>sync</span><span>Herladen</span>
    </button>
  </div>
  <div class="content fullheight">
    {#if $eggCount}
      <br />
      <p>
        Eerste registratie: <b>{dayjs(firstDate).format("DD MMM YYYY")}</b>.
      </p>
      <p>
        <b>{usrEggCount} / {$eggCount}</b> eieren geraapt door {username} ({percentage}%)
      </p>
      <h4>Aantal registraties per niveau:</h4>
      <table class="compact stats">
        {#each Array.from(Array(maxEggs).keys()) as x}
          <tr>
            <td
              >{#each Array(x + 1) as _}
                <img src={logo} alt="Egg" />
              {/each}&nbsp;&nbsp;</td
            >
            <td>{levelCounts[x]}</td>
            <td class="dynamic"
              >{roundDecimals((100 / entryCount) * levelCounts[x], 2)}%</td
            >
          </tr>
        {/each}
        <tr>
          <td><b>Totaal</b></td>
          <td>{entryCount} registraties</td>
          <td class="dynamic">100.00%</td>
        </tr>
      </table>
      <h4>Aantal eieren per persoon:</h4>
      <table class="compact stats">
        {#each Object.keys(perRegistrarEggs).sort() as registrar}
          <tr>
            <td>{registrar}&nbsp;&nbsp;</td>
            <td>{perRegistrarEggs[registrar]}&nbsp;&nbsp;</td>
            <td class="dynamic"
              >{roundDecimals(
                (100 / $eggCount) * perRegistrarEggs[registrar],
                2
              )}%</td
            >
          </tr>
        {/each}
        <tr>
          <td><b>Totaal</b></td>
          <td>{$eggCount} eieren</td>
          <td class="dynamic">100.00%</td>
        </tr>
      </table>
      <h4>Aantal registraties per persoon:</h4>
      <table class="compact stats">
        {#each Object.keys(perRegistrarEntries).sort() as registrar}
          <tr>
            <td>{registrar}&nbsp;&nbsp;</td>
            <td>{perRegistrarEntries[registrar]}&nbsp;&nbsp;</td>
            <td class="dynamic">
              {roundDecimals(
                (100 / entryCount) * perRegistrarEntries[registrar],
                2
              )}%
            </td>
          </tr>
        {/each}
        <tr>
          <td><b>Totaal</b></td>
          <td>{entryCount} registraties</td>
          <td class="dynamic">100.00%</td>
        </tr>
      </table>
      <br />
      <p>
        Totale bestandsgrootte lijst database:<br />{roundDecimals(
          dataSize / 1024,
          2
        )}KB ({dataSize} bytes)
      </p>
    {:else}
      <p class="loading">
        <span class="material-icons">hourglass_empty</span><span
          >Verbinden met {appDstName} server
        </span>
      </p>
    {/if}
  </div>
</div>
