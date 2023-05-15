<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { MultipleChoiceAnswer } from "@prisma/client";
  import FiTrash from "svelte-icons-pack/fi/FiTrash";
  import Icon from "svelte-icons-pack/Icon.svelte";

  export let handleUpdateAnswer: Function;
  export let handleRemoveAnswer: Function;
  export let answer: MultipleChoiceAnswer;
  export let disabled: boolean;

  const dispatch = createEventDispatcher();

  async function updateAnswer() {
    dispatch("message", {
      op: "updateAnswer",
      data: {
        answer: answer,
      },
    });
  }

  async function removeAnswer() {
    dispatch("message", {
      op: "removeAnswer",
      data: {
        id: answer.id,
      },
    });
  }
</script>

<div class="card mb-4">
  <div class="flex">
    <div class="flex-1 mr-4 h-full text-sm">
      {#if disabled}
        <textarea
          class="textarea w-full h-full border-2 disabled:bg-gray-200 disabled:text-gray-300"
          value={answer.answer}
          disabled
        />
      {:else if answer.isCorrect}
        <textarea
          class="textarea w-full h-full border-primary-focus border-2"
          rows="2"
          bind:value={answer.answer}
        />
      {:else}
        <textarea
          class="textarea w-full h-full border-gray-300 border-2"
          rows="2"
          bind:value={answer.answer}
        />
      {/if}
    </div>
    <div class="flex-4">
      <div class="flex flex-col h-full">
        {#if disabled}
          <input
            type="checkbox"
            class="w-full checkbox checkbox-primary"
            bind:checked={answer.isCorrect}
            disabled
          />
          <button
            class="btn btn-xs text-xs mt-auto mb-1 bg-error border-none hover:bg-error text-white"
            on:click={removeAnswer}
          >
            <Icon src={FiTrash} />
          </button>
        {:else}
          <input
            type="checkbox"
            class="w-full checkbox checkbox-primary"
            bind:checked={answer.isCorrect}
          />
          <button
            class="btn btn-xs text-xs mt-auto bg-transparent border-1 border-gray-400 mb-1 hover:border-gray-400 hover:bg-gray-400 hover:text-white"
            on:click={removeAnswer}
            on:keydown={updateAnswer}
          >
            <Icon src={FiTrash} />
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  textarea {
    height: 100%;
  }
</style>
