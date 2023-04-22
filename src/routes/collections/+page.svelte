<script lang="ts">
  import type { MultipleChoiceAnswer, MultipleChoiceQuestion } from "@prisma/client";
  import { onMount } from "svelte";

  let collections: Array<any> | null = null;

  async function getCollections() {
    let resp = await fetch("http://localhost:5173/api/collections/get", {
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

<div class="flex">
  <div class="w-full md:w-1/5" />
  <div class="w-full md:w-3/5 lg:w-5/12 p-8">
    Collections
    {#if collections}
      {#each collections as collection}
        <div class="card w-52 bg-base-100 shadow-xl">
          <figure>
            <img src="https://placehold.co/600x400" class="object-cover" alt={collection.name} />
          </figure>
          <div class="card-body p-4">
            <h2 class="card-title">
              {collection.name}
            </h2>
            <p class="text-sm mb-2">Questions: {collection.count}</p>
            <div class="card-actions">
              <div class="badge badge-primary">Tag 1</div>
              <div class="badge badge-primary">Tag 2</div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  <div class="w-full md:w-1/5" />
</div>
