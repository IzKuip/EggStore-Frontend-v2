<script lang="ts">
  import { appDstName, egTokenKey, isLoggedIn, loginStatus } from "../ts/env";
  import egg from "../assets/egg.png";
  import "../css/login.css";
  import "../css/elements.css";
  import { onMount } from "svelte";
  import { login } from "../ts/api/auth";
  import { get } from "svelte/store";
  import { apiReq } from "../ts/api/main";
  import { log } from "../ts/logs/main";
  import { showConfirmation } from "../ts/confirmation/main";

  let username: string;
  let password: string;
  let status = "Voer je gegevens in";
  let isReset = false;
  let resetFase2 = false;

  let resetCode:string;
  let newPswd: string;
  let newPswdConfirm: string;

  onMount(async () => {
    if (localStorage.getItem(egTokenKey)) {
      isLoggedIn.set(true);
    }
  });

  async function l() {
    if (username && password) {
      setStatus("Even geduld...");
      await login({ username, password });

      if (!get(isLoggedIn)) {
        setStatus("Inloggen mislukt.");
      }
    } else {
      setStatus("er zijn lege velden!");
    }
  }

  async function r() {
    setStatus(`Account ${username} aanmaken...`);

    if (username && password) {
      const token = btoa(`${username}:${password}`);
      const request = await apiReq("api/user/create", {}, token);

      if (request.valid) localStorage.setItem("eggToken", token);
      else setStatus("Account bestaat al!");

      isLoggedIn.set(request.valid || false);
    } else {
      setStatus("Inloggegevens incorrect.");
    }
  }

  async function p() {
    isReset = true;

    
  }

  async function dP (){
    const req = await apiReq("user/pswdreset/codegen", {
      user: btoa(username),
    });

    if (!req.valid) {
      showConfirmation({
        title: "Fout",
        message: "De gebruiker bestaat niet.",
        okButton: {
          capt: "Sluiten",
          event: () => {},
        },
      });

      return;
    }

    resetFase2 = true;
  }

  function nP() {
    isReset = false;
  }

  function fE(e) {
    e.preventDefault();
  }

  export function setStatus(txt: string) {
    log("Login.svelte", "Status", txt);

    status = txt;
  }

  loginStatus.subscribe((v) => {
    if (v[0]) {
      setStatus(v[1]);
    }
  });

  export async function reset() {
    const req = await apiReq("user/pswdreset/reset",{user:btoa(username), code: btoa(resetCode), new: btoa(newPswd)});

    if (req.valid) {
      password = newPswd;
      username = username;

      l();
    }
  }
</script>

<div class="login">
  <div class="center">
    <div class="status">{status}</div>
    <img src={egg} class="logo" alt="Egg" />

    <div class="holder">
      <h1>{appDstName}</h1>
      {#if !isReset}
        <form on:submit={fE}>
          <input placeholder="Gebruikersnaam" bind:value={username} />
          <input
            placeholder="Wachtwoord"
            type="password"
            bind:value={password}
          />
          <button
            on:click={l}
            class="suggested"
            disabled={!username || !password}
          >
            Inloggen
          </button>
          <button on:click={r} disabled={!username || !password}>
            Registreren
          </button>
          <button class="flat" on:click={p}>Wachtwoord vergeten?</button>
        </form>
      {:else}
      {#if !resetFase2}
        <input placeholder="Gebruikersnaam" bind:value={username} />
        <button class="suggested" on:click={dP}>Code aanvragen</button>
        <button class="flat" on:click={nP}>Inloggen met gebruikersnaam</button>
        {:else}
        <p>Vraag je code aan Izaak:</p>
        <input placeholder="Code" bind:value={resetCode} />
        <input placeholder="Wachtwoord" type="password" bind:value={newPswd} />
        <input placeholder="Wachtwoord Bevestigen" type="password" bind:value={newPswdConfirm} />
        <button on:click={reset}>Wachtwoord herstellen</button>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style scoped>
   * {
    color: var(--general-fg);
   }
</style>