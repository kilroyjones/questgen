<script lang="ts">
  // Components
  import AiOutlineDelete from "svelte-icons-pack/ai/AiOutlineDelete";
  import Icon from "svelte-icons-pack/Icon.svelte";

  // Types
  import type { MultipleChoiceAnswer, MultipleChoiceQuestion } from "@prisma/client";

  export let handleDeleteQuestion: Function;
  // export let handleConfirmDeleteQuestion: Function;
  export let question: MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] };

  let showEditModal: boolean = false;
  let confirmDelete: HTMLDialogElement;
</script>

<div class="flex justify-between">
  <div class="flex w-full flex-col font-bold ml-6 mt-2">
    {#each question.answers as answer}
      <div class="text-sm mb-2">
        {#if answer.isCorrect}
          <div class="text-green-800 font-bold">
            {answer.answer}
          </div>
        {:else}
          <div class="">
            {answer.answer}
          </div>
        {/if}
      </div>
    {/each}
  </div>
  <div class="flex-4 flex-col ml-4 min-w-[2rem]">
    <div class="flex h-full">
      <div class="flex mt-auto">
        <span
          on:click|stopPropagation={() => handleDeleteQuestion(question)}
          on:keydown={() => handleDeleteQuestion(question)}
          class="mr-2"
        >
          <Icon size="28" src={AiOutlineDelete} />
        </span>
      </div>
    </div>
  </div>
</div>
