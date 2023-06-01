<script lang="ts">
  import { invalidate } from "$app/navigation";
  import Navbar from "$lib/navigation/Navbar.svelte";
  import { onMount } from "svelte";
  import "../app.css";

  export let data;

  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

{#if session}
  <Navbar isLoggedIn={true} username={session.user.user_metadata.name} />
{:else}
  <Navbar />
{/if}
<div class="h-screen"><slot /></div>
