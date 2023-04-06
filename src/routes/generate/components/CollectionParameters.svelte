<script lang="ts">
  import { collectionName } from "../modules/store";
</script>

<div class="flex-1">
  <div class="form-control">
    <input
      type="text"
      placeholder="Collection name"
      class="input input-bordered w-full"
      bind:value={$collectionName}
    />
  </div>
</div>
