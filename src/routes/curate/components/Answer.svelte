<script lang="ts">
  import type { MultipleChoiceAnswer } from "@prisma/client";

  export let answer: MultipleChoiceAnswer;
  export let removeAnswer: Function;
  export let updateAnswer: Function;
  export let disabled: boolean;
</script>

<div class="flex text-md pb-3">
  <div class="flex-1">
    <div class="card bg-base-200 p-3">
      <div class="flex">
        <div class="flex-1 ml-2 mr-4 text-sm">
          {answer.isCorrect}
          {#if disabled}
            <textarea
              class="textarea w-full disabled:bg-gray-200 disabled:text-gray-400"
              rows="2"
              value={answer.answer}
              disabled
            />
          {:else}
            <textarea class="textarea w-full" rows="2" bind:value={answer.answer} />
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
                class="btn btn-xs text-xs mt-auto bg-error-content border-none hover:bg-error text-white"
                on:click={() => removeAnswer(answer.id)}
              >
                X</button
              >
            {:else}
              <input
                type="checkbox"
                class="w-full checkbox checkbox-primary"
                bind:checked={answer.isCorrect}
              />
              <button
                class="btn btn-xs text-xs mt-auto bg-error border-none hover:bg-error-content text-white"
                on:click={() => removeAnswer(answer.id)}
                on:keydown={() => updateAnswer(answer)}
              >
                X</button
              >
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
