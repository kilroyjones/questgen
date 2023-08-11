<script lang="ts">
  import type { Collection, Tag } from "@prisma/client";
  import CollectionComponent from "$lib/components/collection/Collection.svelte";

  export let data;

  let collections: Array<Collection & { tags: Tag[] }> | null = data.collections;
</script>

{#if collections}
  {#each collections as collection}
    <CollectionComponent {collection} />
  {/each}
{:else}
  <!-- TODO HANDLE ERROR BETTER -->
  <p>Error getting collections</p>
{/if}
