<script lang="ts">
  import { appDstName, egTokenKey, isLoggedIn } from "../ts/env";
  import egg from "../assets/egg.png";
  import "../css/login.css";
  import "../css/elements.css";
  import { onMount } from "svelte";
  import { login } from "../ts/api/auth";
  import { get } from "svelte/store";

  let username: string;
  let password: string;
  let status = "Voer je gegevens in";

  onMount(async () => {
    if (localStorage.getItem(egTokenKey)) {
      isLoggedIn.set(true);
    }
  });

  async function l() {
    if (username && password){
    setStatus("Even geduld...");
    await login({ username, password });

    if (!get(isLoggedIn)) {
      setStatus("Inloggegevens incorrect!");
    }} else {
        setStatus("er zijn lege velden!");
    }
  }

  async function r() {
    // Register
    //await register({username,password});
  }

  async function p() {
    // Password Reset
  }

  function setStatus(txt: string) {
    status = txt;
  }
</script>

<div class="login">
  <div class="center">
    <div class="status">{status}</div>
    <img src={egg} class="logo" alt="Egg" />

    <div class="holder">
      <h1>{appDstName}</h1>
      <form
        on:submit={(e) => {
          e.preventDefault();
        }}
      >
        <input placeholder="Gebruikersnaam" bind:value={username} />
        <input placeholder="Wachtwoord" type="password" bind:value={password} />
        <button on:click={l} class="suggested">Inloggen</button>
        <button>Registreren</button>
        <button class="flat">Wachtwoord vergeten?</button>
      </form>
    </div>
  </div>
</div>
