<script lang="ts">
  import Question from "$lib/components/question/Question.svelte";
  import AiOutlineCloseSquare from "svelte-icons-pack/ai/AiOutlineCloseSquare";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import type {
    MultipleChoiceAnswer,
    MultipleChoiceQuestion,
  } from "@prisma/client";

  export let question:
    | MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] };
  export let showEditModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showEditModal) dialog.showModal();
</script>

<dialog
  class="max-w-full min-w-[36rem] rounded-md pl-6 pr-6"
  bind:this={dialog}
  on:click|self={() => dialog.close()}
  on:keydown|self={() => dialog.close()}
  on:close={() => (showEditModal = false)}
>
  <div class="flex justify-end mb-4">
    <button on:click={() => dialog.close()}>
      <Icon color="#9CA38F" size="28" src={AiOutlineCloseSquare} />
    </button>
  </div>
  <Question {question} />
</dialog>
