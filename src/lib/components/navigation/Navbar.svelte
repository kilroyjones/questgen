<script lang="ts">
  export let isLoggedIn: boolean = false;
  export let username: string = "";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">Question Builder</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a class="font-bold" href="/app/collection/create/select">Create</a></li>
      <li><a class="font-bold" href="/app/collection">Collections</a></li>
      <li />
      {#if isLoggedIn}
        <li><a class="font-bold" href="/app/collection">{username}</a></li>
        <li>
          <form action="/app/account/signout" method="POST">
            <button class="font-bold text-primary" type="submit">Sign out</button>
          </form>
        </li>
      {:else}
        <li>
          <a class="font-bold text-primary" href="/app/account/signin">Sign in</a>
        </li>
      {/if}
    </ul>
  </div>
</div>
