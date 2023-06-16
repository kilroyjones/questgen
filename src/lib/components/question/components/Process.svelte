<script lang="ts">
  export let handleDeleteQuestion: Function;
  export let handleApproveQuestion: Function;
</script>

<div class="flex justify-between">
  <button class="btn btn-primary" on:click={() => handleDeleteQuestion()}
    >DELETE</button
  >
  <button class="btn btn-primary" on:click={() => handleApproveQuestion()}
    >APPROVE</button
  >
</div>
