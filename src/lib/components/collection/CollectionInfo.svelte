<script lang="ts">
  import type { Collection, Tag } from "@prisma/client";
  import TiExport from "svelte-icons-pack/ti/TiExport";
  import Icon from "svelte-icons-pack/Icon.svelte";

  export let collection: Collection & { tags: Array<Tag> };
</script>

<div class="flex flex-row justify-between">
  <div class="flex w-full flex-col">
    <div class="text-3xl font-bold mb-0">
      {collection.name}
    </div>
    <div class="mb-2 text-sm font-bold">
      Questions: {collection.count}
    </div>
  </div>
  <a href="/app/collection/export/{collection.id}" title="Export">
    <div class="flex font-bold text-lg">
      <div>Export</div>
      <div><Icon size="28" src={TiExport} /></div>
    </div>
  </a>
</div>

<div class="flex flex-wrap">
  <div class="flex flex-row mb-3">
    {#each collection.tags as tag}
      <div class="flex bg-neutral text-neutral-content pt-1 pb-1 pl-2 pr-2 mr-2 rounded-md text-sm">
        <div class="flex-initial pr-4">{tag.tag}</div>
      </div>
    {/each}
  </div>
</div>
