<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;

  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, _session) => {
      if (await supabase.auth.getSession()) {
        goto("/app/collection");
      }
    });
  });
</script>
