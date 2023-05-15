<script lang="ts">
  export let handleChangeFilter: Function;

  let filter: string;
</script>

<select
  class="select w-full mx-auto border-2 border-gray-400"
  bind:value={filter}
  on:change={() => handleChangeFilter(filter)}
>
  <option>Not approved</option>
  <option selected>Approved</option>
  <option>Deleted</option>
  <option>All</option>
</select>
