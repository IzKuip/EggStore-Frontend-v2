<script lang="ts">
  import {
    appDstName,
    appDstVers,
    eggCount,
    egTokenKey,
    isLoggedIn,
  } from "../../ts/env";
  import "../../css/content/sidebar.css";
  import logo from "../../assets/egg.png";
  import { loadFromStore } from "../../ts/page/main";

  let username: string = "niemand";

  isLoggedIn.subscribe((v) => {
    if (v) {
      username = atob(localStorage.getItem(egTokenKey)).split(":")[0];
    }
  });

  function account() {
    loadFromStore("userman");
  }
</script>

<div class="sidebar">
  {#if isLoggedIn}
    <div class="top">
      <img src={logo} alt="Egg" />
      <h2>{appDstName}</h2>
    </div>
    <div class="bottom">
      <h3>Eieren totaal: {$eggCount}</h3>
      <br />
      <p>
        Versie {appDstVers.join(".")}
        <br />
        Ontwikkeld vanaf 16 mei 2022.
        <br /><br />
      </p>
      <p class="user">
        <span>Ingelogd als {username}.</span>
      </p>
      <br />
      <p>
        Incorrecte paginaweergave, werkt de registratie niet of algemene {appDstName}
        storing? Meld het zo snel als mogelijk en het word verholpen.
      </p>
      <br />
      <button class="small fullwidth" on:click={account}>
        <span class="material-icons button">person</span>
        <span>Account</span>
      </button>
    </div>
  {/if}
</div>
