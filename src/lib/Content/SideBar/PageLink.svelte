<script lang="ts">
import { PageStore } from "../../../ts/page/store";

import { currentPageId } from "../../../ts/env";

  import { loadFromStore } from "../../../ts/page/main";
  import type { PageLinkData } from "../../../ts/page/pagelink";

  export let data: PageLinkData;
  
  let activated = false;

  function open() {
    loadFromStore(data.pageName);
  }

  currentPageId.subscribe((v) => {
      activated = data.pageName == v;
  })
</script>

<button class="small flat fullwidth pagelink" on:click={open} class:activated>
  <span class="material-icons button">{PageStore.get(data.pageName)?.icon}</span>
  <span>{data.caption}</span>
</button>
