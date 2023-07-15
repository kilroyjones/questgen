<script lang="ts">
  import type { Collection } from "@prisma/client";
  export let collection: Collection;
</script>

<div class="card bg-base-100 shadow-xl hover:bg-gray-100 cursor-pointer mb-3">
  <a href="/app/collections/{collection.id}">
    <div class="card-body p-4">
      <h2 class="card-title">
        <!-- TODO: Change this to work with account ID if need be -->
        {collection.name}
      </h2>
      <p class="text-sm mb-2">Questions: {collection.count}</p>
      <div class="card-actions">
        {#each collection.tags as tag}
          <div class="badge badge-primary">{tag.tag}</div>
        {/each}
      </div>
    </div>
  </a>
</div>
