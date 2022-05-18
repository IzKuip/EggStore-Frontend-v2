<script lang="ts">
import { loadFromStore } from "../../ts/page/main";
import "../../css/page/userman.css";

    function close() {
        loadFromStore("list");
    }
</script>

<div class="list">
    <div class="header">
      <button class="suggested" on:click={close}>
        <span class="material-icons">cancel</span><span> Sluiten</span>
      </button>
    </div>
    
    <div class="content">

    </div>
  </div>
  