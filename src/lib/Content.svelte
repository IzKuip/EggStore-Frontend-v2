<script lang="ts">
  import HeaderBar from "./Content/HeaderBar.svelte";
  import Content from "./Content/Content.svelte";
  import SideBar from "./Content/SideBar.svelte";
  import { onMount } from "svelte";
  import { LOCKED } from "../ts/env";
  import { showConfirmation } from "../ts/confirmation/main";

  onMount(() => {
    if (LOCKED) {
      showConfirmation({
        title: "Vergrendeld.",
        message:
          "De Reggistry is vergrendeld. Hierom is het niet mogelijk om database wijzigingen te maken, het is echter nog wel mogelijk om de gegevens in de Reggistry weer te geven. Het is niet bekend hoelang de vergrendeling van kracht zal zijn.",
        okButton: {
          capt: "Begrepen",
          event: () => {},
        },
      });
    }
  });
</script>

<SideBar />
<Content />
<HeaderBar />
