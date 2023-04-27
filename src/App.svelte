<script lang="ts">
  import { onMount } from "svelte";
  import "./css/app.css";
  import "./css/global.css";
  import Confirmation from "./lib/Content/Confirmation.svelte";
  import { showConfirmation } from "./ts/confirmation/main";
  import { sideBarOpened } from "./ts/env";

  onMount(() => {
    showConfirmation({
      title: "v2 Onbereikbaar",
      message:
        "De Reggistry is gemigreerd naar het CPB. Het is om die reden niet langer mogelijk om gebruik te maken van Reggistry v2. Gelieve Reggistry v3 of hoger te gebruiken.",
      okButton: {
        capt: "Herladen",
        event() {
          location.reload();
        },
      },
      cancelButton: {
        capt: "Reggistry v3",
        event() {
          location.href = "https://reggistry.twiserver.nl/";
        },
      },
    });
  });
</script>

<div class="app" class:nosidebar={!$sideBarOpened}>
  <!-- {#if $isLoggedIn}
    <Content />
  {:else}
    <Login />
  {/if} -->
  <Confirmation />
</div>
