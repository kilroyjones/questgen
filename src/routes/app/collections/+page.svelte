<script lang="ts">
  import type { Collection, Tag } from "@prisma/client";
  import CollectionComponent from "$lib/components/collections/Collection.svelte";
  import { onMount } from "svelte";

  export let data;

  let collections: Array<Collection & { tags: Tag[] }> | null = data.collections;

  // export let question: MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] };
</script>

{#if collections}
  {#each collections as collection}
    <CollectionComponent {collection} />
  {/each}
{:else}
  <!-- TODO HANDLE ERROR BETTER -->
  <p>Error getting collections</p>
{/if}
