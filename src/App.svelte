<script lang="ts">
  import { onMount } from "svelte";

  import "./css/global.css";
  import Content from "./lib/Content.svelte";
  import Login from "./lib/Login.svelte";
  import { apiReq } from "./ts/api/main";
  import { isLoggedIn } from "./ts/env";

  onMount(async () => {
    console.log(await apiReq("help", {}));
  });
</script>

<div>
  {#if $isLoggedIn}
    <Content />
  {:else}
    <Login />
  {/if}
</div>
