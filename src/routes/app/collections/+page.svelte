<script lang="ts">
  import { onMount } from "svelte";

  let collections: Array<any> | null = null;

  async function getCollections() {
    let resp = await fetch("http://localhost:5173/api/collections/browse", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
      },
    });

    collections = await resp.json();
    console.log(collections);
  }

  onMount(async () => {
    getCollections();
  });
</script>

<div class="flex flex-wrap">
  <div class="w-full md:w-1/5" />
  <div class="w-full md:w-3/5 lg:w-5/12">
    {#if collections}
      {#each collections as collection}
        <div
          class="card bg-base-100 shadow-xl hover:bg-gray-100 cursor-pointer mb-3"
        >
          <div class="card-body p-4">
            <h2 class="card-title">
              <!-- TODO: Change this to work with account ID if need be -->
              <a href="/collections/{collection.id}">{collection.name}</a>
            </h2>
            <p class="text-sm mb-2">Questions: {collection.count}</p>
            <div class="card-actions">
              {#each collection.tags as tag}
                <div class="badge badge-primary">{tag.tag}</div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  <div class="w-full md:w-1/5" />
</div>
