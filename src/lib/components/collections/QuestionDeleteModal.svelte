<script lang="ts">
  export let handleConfirmDeleteQuestion: Function;
  export let showConfirmDeleteQuestionModal: boolean;

  let confirmDeleteDialog: HTMLDialogElement;
</script>

<dialog
  class="max-w-full min-w-[16rem] rounded-lg pl-6 pr-6"
  bind:this={confirmDeleteDialog}
  on:click|self={() => confirmDeleteDialog.close()}
  on:keydown|self={() => confirmDeleteDialog.close()}
  on:close={() => (showEditModal = false)}
>
  <div class="flex justify-center">
    <h3 class="font-bold text-lg">Delete question?</h3>
  </div>

  <div class="flex justify-between">
    <button class="btn" on:click={() => handleConfirmDeleteQuestion()}>Yes</button>
    <button
      class="btn"
      on:click={() => {
        showEditModel = false;
      }}>No</button
    >
  </div>
</dialog>
