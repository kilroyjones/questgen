<script>
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

<Navbar />
<slot />
