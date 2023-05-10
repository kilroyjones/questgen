<script lang="ts">
  import { Action } from "$lib/models";
  export let collectionName: string;
  export let collectionList: Array<any>;
  export let questionStatusFilter: string;
  export let update: Function;
</script>

<div class="flex flex-row mb-2">
  <select
    class="select max-w-xs w-full border-2 border-gray-400"
    bind:value={collectionName}
    on:change={() => update(Action.ChangeCollection)}
  >
    {#each collectionList as collection}
      <option id={collection.id}>{collection.name}</option>
    {/each}
  </select>
  <select
    class="select max-w-xs mx-auto border-2 border-gray-400"
    bind:value={questionStatusFilter}
    on:change={() => update(Action.GetQuestion)}
  >
    <option>Not approved</option>
    <option selected>Approved</option>
    <option>Deleted</option>
    <option>All</option>
  </select>
</div>
