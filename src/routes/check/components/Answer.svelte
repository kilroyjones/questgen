<script lang="ts">
  import type { MultipleChoiceAnswer } from "@prisma/client";
  import FiTrash from "svelte-icons-pack/fi/FiTrash";
  import Icon from "svelte-icons-pack/Icon.svelte";

  export let answer: MultipleChoiceAnswer;
  export let removeAnswer: Function;
  export let updateAnswer: Function;
  export let disabled: boolean;
</script>

<div class="flex text-md">
  <div class="flex-1">
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
                on:click={() => removeAnswer(answer.id)}
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
                on:click={() => removeAnswer(answer.id)}
                on:keydown={() => updateAnswer(answer)}
              >
                <Icon src={FiTrash} />
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  textarea {
    height: 100%;
  }
</style>
