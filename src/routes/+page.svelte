<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(async () => {});
</script>

<div class="min-h-screen lg:mt-30 md:mt-20 sm:mt-10">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Question Builder</h1>
      <p class="py-6">
        A prototype of a question building app that can export question sets to sites like Kahoot,
        Quizizz, Blooket and others. It includes and account system via <a
          href="https://supabase.com/">Supabase</a
        >.
      </p>
      <button class="btn btn-primary" on:click={() => goto("/app/account/signin")}>Sign in</button>
    </div>
  </div>
</div>
