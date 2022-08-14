<script lang="ts">
  import { loadFromStore, openPage } from "../../ts/page/main";
  import "../../css/page/userman.css";
  import { appDstName, egTokenKey, isLoggedIn, loginStatus } from "../../ts/env";
  import { onMount } from "svelte";
  import { apiReq } from "../../ts/api/main";
  import { logout } from "../../ts/api/auth";
  import type { EggEntry } from "../../ts/api/egg";
import { log } from "../../ts/logs/main";
import { hideConfirmation, showConfirmation } from "../../ts/confirmation/main";

  function close() {
    loadFromStore("list");
  }

  function confirmAccDel() {
    showConfirmation({
      title:"Account Verwijderen",
      message:"Weet je zeker dat je je account wil verwijderen? Er is geen terugweg mogelijk.",
      okButton: {
        capt:"Verwijder",
        event:async () => {
          await delAcc()
        },
        icon:"delete",
        className:"danger"
      },
      cancelButton: {
        capt:"Ga terug",
        event:() => {
          hideConfirmation();
        },
        icon:"arrow_back_ios_new",
        className:"suggested"
      }
    })
  }

  async function delAcc() {
    log("UserPanel.svelte","GEVARENZONE",`${username} wordt verwijderd!`);

    const req = await apiReq("api/user/delete",{},localStorage.getItem(egTokenKey));

    if (req.valid) logout();
  }

  let username: string = "niemand";
  let eggCount = 0;
  let eggRegistrarList: EggEntry[] = [];

  isLoggedIn.subscribe((v) => {
    if (v) {
      username = atob(localStorage.getItem(egTokenKey)).split(":")[0];
    }
  });

  onMount(async () => {
    const eggs = await apiReq("eggs/get", {}, localStorage.getItem(egTokenKey));

    if (!eggs.valid) {
      /* logout(); */

      loginStatus.set([true, "Incorrecte sessie!"]);
    }

    let list = [];

    const data = eggs.data;

    for (let i = 0; i < Object.keys(data).length; i++) {
      list.push(data[Object.keys(data)[i]]);
    }

    for (let i = 0; i < list.length; i++) {
      const registrars = list[i].registrar.toLowerCase().split(",");
      const uname = username.toLowerCase().split(" ")[0].split(",")[0];

      for (let j = 0; j < registrars.length; j++) {
        const registrar = registrars[j].replace(" ", "");

        if (registrar == uname) {
          eggCount += parseInt(list[i].amount as string);

          eggRegistrarList.push(list[i]);
        }
      }
    }
  });
</script>

<div class="list">
  <div class="header">
    <button class="suggested" on:click={close}>
      <span class="material-icons">cancel</span><span> Sluiten</span>
    </button>
  </div>

  <div class="content fullheight">
    <h2>Account Beheer</h2>
    <p>
      Vanuit hier kan je de instellingen van je account wijzigen. Let op:
      wijzigingen die je maakt kunnen niet ongedaan worden gemaakt.
    </p><br>
    <p>Ingelogd als {username}.</p>
    <p>{username} heeft {eggCount} eieren geraapt.</p><br>
    <h3>
      Gevarenzone
    </h3>
    <p>Hier kan je kiezen om je account te verwijderen.
      Dit zal geen wijzigingen maken aan de {appDstName} lijst zelf, maar wel aan je account data. Onder anderen betekent dit dat je niet meer kan inloggen met dit account, ook zal je niet langer bij de lijst kunnen zonder een nieuw account aan te maken.
    </p>
    <button class="danger" on:click={confirmAccDel}>
      <span class="material-icons button">warning</span>
      <span>Account verwijderen</span>
    </button>
  </div>
</div>
