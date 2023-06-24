<script lang="ts">
  export let handleDeleteQuestion: Function;
  export let handleUpdateQuestion: Function;
  export let handleApproveQuestion: Function;
</script>

<div class="flex">
  <div>
    <button class="btn btn-primary" on:click={() => handleDeleteQuestion()}
      >DELETE</button
    >
  </div>
  <div class="ml-auto">
    <button
      class="btn btn-primary align-right"
      on:click={() => handleUpdateQuestion()}>UPDATE</button
    >
    <button class="btn btn-primary" on:click={() => handleApproveQuestion()}
      >APPROVE</button
    >
  </div>
</div>
