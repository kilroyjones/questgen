<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let filter: string;

  async function changeFilter() {
    dispatch("message", {
      op: "changeFilter",
      data: {
        filter: filter,
      },
    });
  }
</script>

<select
  class="select w-full mx-auto border-2 border-gray-400"
  bind:value={filter}
  on:change={changeFilter}
>
  <option>Not approved</option>
  <option selected>Approved</option>
  <option>Deleted</option>
  <option>All</option>
</select>
