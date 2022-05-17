<script lang="ts">
  import {
    appDstName,
    appDstVers,
    currentPage,
    eggCount,
    egTokenKey,
    isLoggedIn,
  } from "../../ts/env";
  import "../../css/content/sidebar.css";
  import logo from "../../assets/egg.png";

  let username: string = "niemand";

  isLoggedIn.subscribe((v) => {
    if (v) {
      username = atob(localStorage.getItem(egTokenKey)).split(":")[0];
    }
  });
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
      <p>Versie {appDstVers.join(".")}</p>
      <!-- svelte-ignore missing-declaration -->
      <p class="user">
        <span>Ingelogd als {username}</span>
      </p>
      <br />
      <p class="page">
        {#if $currentPage}
          <span class="material-icons">{$currentPage.icon}</span>
          <span>{$currentPage.name}</span>
        {:else}
          <span class="material-icons">web_asset_off</span>
          <span>404</span>
        {/if}
      </p>
    </div>
  {/if}
</div>
