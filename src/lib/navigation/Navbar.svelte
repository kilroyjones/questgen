<script lang="ts">
  import type { Session, SupabaseClient } from "@supabase/supabase-js";

  export let supabase: SupabaseClient;
  export let session: Session | null;
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">questionBuilder</a>
  </div>
  <div class="flex-none">
    {#if session}
      <ul class="menu menu-horizontal px-1">
        <li><a href="/create">Create</a></li>
        <li><a href="/check">Check</a></li>
        <li><a href="/collections">Collections</a></li>
        <li />
        <li><a href="/account/login">{session.user.email}</a></li>
        <li>
          <button on:click={() => supabase.auth.signOut()}>Sign out</button>
        </li>
      </ul>
    {/if}
  </div>
</div>
