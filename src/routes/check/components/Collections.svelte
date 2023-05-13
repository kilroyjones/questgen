<script lang="ts">
  import type { CollectionsWithTags } from "$lib/models";
  import { getCollections } from "../api-calls/collections";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let collections: Array<CollectionsWithTags>;
  let collectionName: string;

  async function changeCollection() {
    if (collections) {
      let collection = collections.find((o) => o.name === collectionName);
      if (collection) {
        dispatch("message", {
          op: "changeCollection",
          data: {
            collectionId: collection.id,
          },
        });
      }
    }
  }

  onMount(async () => {
    let resp = await getCollections();
    console.log(resp);
    if (resp) {
      collections = await resp.json();
    } else {
      // TODO: Handle error
    }
  });
</script>

{#if collections}
  <select
    class="select w-full border-2 border-gray-400"
    bind:value={collectionName}
    on:change={() => changeCollection()}
  >
    {#each collections as collection}
      <option>{collection.name}</option>
    {/each}
  </select>
{/if}
