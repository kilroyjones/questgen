<script lang="ts">
  import type { MultipleChoiceAnswer } from "@prisma/client";
  import Answer from "./Answer.svelte";

  export let answers: Array<MultipleChoiceAnswer>;
  export let removedAnswers: Array<number>;
</script>

{#each answers as answer}
  {#if removedAnswers.includes(answer.id) == true}
    <Answer on:message {answer} disabled={true} />
  {:else}
    <Answer on:message {answer} disabled={false} />
  {/if}
{/each}
