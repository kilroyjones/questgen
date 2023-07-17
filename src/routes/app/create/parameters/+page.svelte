<script lang="ts">
  import SourceDetails from "$lib/components/create/SourceDetails.svelte";
  import Tags from "$lib/components/create/Tags.svelte";
  import { collectionName } from "$lib/stores/create";
</script>

<div class="card bg-base-200 mt-3 mb-3 p-3">
  <div class="flex-row">
    <div class="flex font-bold text-xl mb-1 text-primary">{$collectionName}</div>
    <div class="flex">
      <SourceDetails />
    </div>
  </div>
</div>

<Tags />
