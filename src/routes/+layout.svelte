<script lang="ts">
  import { invalidate } from "$app/navigation";
  import Navbar from "$lib/components/navigation/Navbar.svelte";
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

<div class="h-screen ml-3 mr-3">
  <div class="flex flex-wrap mt-10">
    <div class="sm:w-1/8 md:w-1/6 lg:w-3/12 xl:w-4/12" />
    <div class="sm:w-6/8 md:w-4/6 lg:w-6/12 xl:w-4/12">
      <slot />
      <div class="sm:w-1/8 md:w-1/6 lg:w-3/12 xl:w-4/12" />
    </div>
  </div>
</div>
