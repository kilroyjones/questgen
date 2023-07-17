<script lang="ts">
  // Components
  import { onMount } from "svelte";
  import { collectionName, collectionID, isCollectionNew, resetCreate } from "$lib/stores/create";

  // Types
  import type { Collection } from "@prisma/client";

  export let data;

  let collections: Array<Collection> = [];

  function changeMode() {
    $isCollectionNew = !$isCollectionNew;
    resetCreate();
  }

  function handleCollectionChange(event: any) {
    const id = event.target.value;
    console.log("Here: ", collections);
    for (let i = 0; i < collections.length; i++) {
      if (collections[i].id == id) {
        console.log("2Here");
        $collectionID = collections[i].id;
        $collectionName = collections[i].name;
      }
    }
  }

  onMount(async () => {
    if (data.collections) {
      collections = data.collections;
    }
  });
</script>

<div class="flex justify-center mb-4">
  <div class="btn-group variant-filled">
    <button
      class="btn {$isCollectionNew ? 'bg-success border-0 hover:bg-error' : ''}"
      on:mousedown={() => changeMode()}>New collection</button
    >
    <button
      class="btn {!$isCollectionNew ? 'bg-success border-0 hover:bg-error' : ''}"
      on:mousedown={() => changeMode()}>Add to existing</button
    >
  </div>
</div>

<div class="flex justify-center mt-4">
  {#if $isCollectionNew}
    <input
      class="input border-gray-300 border-2 min-w-[75%]"
      placeholder="Enter collection name"
      bind:value={$collectionName}
    />
  {:else}
    <select class="select border-2 min-w-[75%] border-gray-400" on:change={handleCollectionChange}>
      <option class="" disabled selected>Select collection</option>
      {#each collections as collection}
        {#if $collectionName == collection.name}
          <option value={collection.id} selected>{collection.name}</option>
        {:else}
          <option value={collection.id}>{collection.name}</option>
        {/if}
      {/each}
    </select>
  {/if}
</div>

<div class="flex mt-5 justify-center">
  <a href="/app/create/add"><button class="btn"> Next </button></a>
</div>
