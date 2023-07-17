<script lang="ts">
  import { tokenTotal, estimatedQueries } from "$lib/stores/create";
</script>

<div class="flex w-full justify-between">
  <div class="flex font-bold">
    <span class="mr-1">Tokens: </span>
    <span class="text-primary">{$tokenTotal}</span>
  </div>
  <div class="flex font-bold">
    <span class="mr-1">Estimated queries:</span>
    <span class="text-primary">{$estimatedQueries}</span>
  </div>
</div>
