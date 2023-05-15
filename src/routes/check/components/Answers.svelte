<script lang="ts">
  import type { MultipleChoiceAnswer } from "@prisma/client";
  import Answer from "./Answer.svelte";

  export let handleUpdateAnswer: Function;
  export let handleRemoveAnswer: Function;
  export let answers: Array<MultipleChoiceAnswer>;
  export let removedAnswers: Array<number>;
</script>

{#each answers as answer}
  {#if removedAnswers.includes(answer.id) == true}
    <Answer
      {handleUpdateAnswer}
      {handleRemoveAnswer}
      {answer}
      disabled={true}
    />
  {:else}
    <Answer
      {handleUpdateAnswer}
      {handleRemoveAnswer}
      {answer}
      disabled={false}
    />
  {/if}
{/each}
