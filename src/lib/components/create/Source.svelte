<script lang="ts">
  import type { ContentInfo } from "$lib/models";
  import { ContentType } from "$lib/models";

  export let contentInfo: ContentInfo;
</script>

<div class="card bg-base-200 mt-3 mb-3 p-3">
  <div class="flex">
    {#if contentInfo.type == ContentType.PDF}
      <div class="flex-1 mr-2 text-sm">
        <span class="font-bold">PDF:</span>
        {contentInfo.name}
      </div>
    {:else if contentInfo.type == ContentType.TEXT}
      <div class="flex-1 mr-2 text-sm">
        <span class="font-bold">TEXT:</span>
        {contentInfo.content.substring(0, 50)} ...
      </div>
    {/if}
    <div class="flex-4">
      <button class="btn btn-square btn-sm hover:text-accent-focus" on:click> x </button>
    </div>
  </div>
</div>
