<script lang="ts">
  import { invalidate, goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;

  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (event, _session) => {
        console.log("HERE", _session);
        if (_session) console.log("monkey");
        if (await supabase.auth.getSession()) {
          console.log("what");
          goto("/app/collections");
        }
      }
    );
  });
</script>

LOADINGS!!!
