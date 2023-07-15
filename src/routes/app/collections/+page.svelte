<script lang="ts">
  import { onMount } from "svelte";

  export let data;

  let collections: Array<any> | null = null;

  async function getCollections() {
    if (data) {
      let resp = await fetch("http://localhost:5173/api/collections/browse", {
        method: "POST",
        body: JSON.stringify({
          userId: data.session?.user.id,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      collections = await resp.json();
    }
  }

  onMount(async () => {
    getCollections();
  });
</script>

{#if collections}
  {#each collections as collection}
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
  {/each}
{/if}
