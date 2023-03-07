<script lang="ts">
  import "../../css/content/confirmation.css";
  import { onMount } from "svelte";

  import { Confirmation, hideConfirmation } from "../../ts/confirmation/main";

  import { confirmationData } from "../../ts/env";

  let show = false;
  let data: Confirmation = null;

  confirmationData.subscribe((v) => {
    show = v[0];
    data = v[1];
  });

  function cancel() {
    if (data) data.cancelButton.event();
    hideConfirmation();
  }

  function ok() {
    if (data) data.okButton.event();
    hideConfirmation();
  }
</script>

<div class="confirmation" class:show>
  <div class="shade" />

  <div class="body" class:show>
    {#if show}
      <div class="context">
        <h3 class="title">{data.title}</h3>
        <p class="message">{data.message}</p>
      </div>
      <div class="actions">
        <div>
          {#if data.cancelButton}
            <button
              on:click={cancel}
              class="small {data.cancelButton.className}"
            >
              {#if data.cancelButton.icon}
                <span class="material-icons button">
                  {data.cancelButton.icon}
                </span>
              {/if}
              <span>{data.cancelButton.capt}</span>
            </button>
          {/if}
          <button on:click={ok} class="small {data.okButton.className}">
            {#if data.okButton.icon}
              <span class="material-icons button">
                {data.okButton.icon}
              </span>
            {/if}
            <span>{data.okButton.capt}</span>
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
