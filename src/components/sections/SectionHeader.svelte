<script lang="ts">
  import { auth } from '../../stores/auth'
  import { googleSignIn, googleSignOut } from "../../utils/auth";
</script>

{#if !$auth}
  <button class="px-2" on:click|preventDefault={googleSignIn}>Sign In</button>
{:else}
  <img class="w-10 h-10 rounded-full" src="{$auth.getImageUrl()}" alt="Avatar">
  <button class="px-2" on:click|preventDefault={googleSignOut}>Sign Out</button>
{/if}