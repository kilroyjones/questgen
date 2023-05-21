<script lang="ts">
  export let isLoggedIn: boolean = false;
  export let username: string = "";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">questionBuilder</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/app/create">Create</a></li>
      <li><a href="/app/check">Check</a></li>
      <li><a href="/app/collections">Collections</a></li>
      <li />
      {#if isLoggedIn}
        <li><a href="/app/account/signout">{username}</a></li>
        <li>
          <form action="/app/account/signout" method="POST">
            <button type="submit">Sign out</button>
          </form>
        </li>
      {:else}
        <li>
          <a href="/app/account/signin">Sign in</a>
        </li>
      {/if}
    </ul>
  </div>
</div>
