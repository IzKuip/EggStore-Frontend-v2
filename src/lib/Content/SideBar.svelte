<script lang="ts">
  import { appDstName, appDstVers, egTokenKey, isLoggedIn } from "../../ts/env";
  import "../../css/content/sidebar.css";
  import logo from "../../assets/egg.png";
</script>

<div class="sidebar">
  {#if isLoggedIn}
  <!-- svelte-ignore missing-declaration -->
  <h3>Versie {appDstVers.join(".")}</h3>
  <p class="user"><span>Ingelogd als {atob(localStorage.getItem(egTokenKey)).split(":")[0]}</span></p>
  {/if}
</div>
