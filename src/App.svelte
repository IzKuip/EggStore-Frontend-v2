<script lang="ts">
  import "./css/global.css";
  import "./css/app.css";
  import Content from "./lib/Content.svelte";
  import Login from "./lib/Login.svelte";
  import { isLoggedIn, sideBarOpened } from "./ts/env";
import Confirmation from "./lib/Content/Confirmation.svelte";
</script>

<div class="app" class:nosidebar={!$sideBarOpened}>
  {#if $isLoggedIn}
    <Content />
  {:else}
    <Login />
  {/if}
  <Confirmation/>
</div>
