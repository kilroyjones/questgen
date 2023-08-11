<script lang="ts">
  import type { Collection, Tag } from "@prisma/client";

  export let collection: Collection & { tags: Tag[] };
</script>

<div class="card bg-base-100 shadow-xl hover:bg-gray-100 cursor-pointer mb-3">
  <a href="/app/collection/{collection.id}">
    <div class="card-body p-4">
      <h2 class="card-title">
        <!-- TODO: Change this to work with account ID if need be -->
        {collection.name}
      </h2>
      {#if collection.processing}
        <div class="text-sm text-accent font-bold processing-animation mb-2" />
        <div class="card-actions">
          {#each collection.tags as tag}
            <div class="badge badge-primary">{tag.tag}</div>
          {/each}
        </div>
      {:else}
        <div class="text-sm font-bold mb-2">Questions: {collection.count}</div>
        <div class="card-actions">
          {#each collection.tags as tag}
            <div class="badge badge-primary">{tag.tag}</div>
          {/each}
        </div>
      {/if}
    </div>
  </a>
</div>

<style>
  @keyframes processing {
    0%,
    100% {
      content: "Processing";
    }
    20% {
      content: "Processing.";
    }
    40% {
      content: "Processing..";
    }
    60% {
      content: "Processing..";
    }
    80% {
      content: "Processing...";
    }
  }

  .processing-animation::before {
    content: "Processing .....";
    animation: processing 2s infinite; /* 2s is the duration; adjust as needed */
  }
</style>
