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
  import { SideBarPageLinks } from "../../ts/page/pagelink";
  import PageLink from "./SideBar/PageLink.svelte";

  let username: string = "niemand";

  isLoggedIn.subscribe((v) => {
    if (v) {
      username = atob(localStorage.getItem(egTokenKey)).split(":")[0];
    }
  });

  function openBeta() {
    location.href = "/beta-v3";
  }
</script>

<div class="sidebar">
  {#if isLoggedIn}
    <div class="top">
      <img src={logo} alt="Egg" />
      <h2>{$eggCount} eieren</h2>
    </div>
    <div class="bottom">
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
      {#each SideBarPageLinks as link}
        <PageLink data={link} />
      {/each}
      <button
        class="small flat fullwidth pagelink upcoming"
        on:click={openBeta}
      >
        <span class="material-icons">star</span>
        <span>Binnenkort! Reggistry v3</span>
      </button>
    </div>
  {/if}
</div>

<style scoped>
  .upcoming span.material-icons {
    color: orange;
  }

  .upcoming {
    margin-top: 10px;
  }
</style>
