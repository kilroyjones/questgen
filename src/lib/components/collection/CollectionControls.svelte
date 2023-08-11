<script lang="ts">
  // Functions
  import { invalidate } from "$app/navigation";
  import { deleteQuestions } from "$lib/client/collection-api";

  // Types
  import type { MultipleChoiceQuestion, MultipleChoiceAnswer } from "@prisma/client";

  export let selectedQuestions: Array<
    MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }
  > = [];
  export let toggleExpandQuestion: Function;
  export let questionExpanded: boolean;

  async function handleDeleteQuestions() {
    if (selectedQuestions.length > 0) {
      let response: Response = await deleteQuestions(selectedQuestions);
      let result = await response.json();
      if (result.status == "success") {
        await invalidate("collection:refresh-on-delete");
      }
    }
  }
</script>

<div class="flex justify-between mb-3">
  <div class="flex flex-row">
    <button class="btn bg-accent border-accent" on:click={handleDeleteQuestions}
      >Delete selected</button
    >
  </div>
  <div class="flex flex-row">
    {#if questionExpanded}
      <button class="btn" on:click={() => toggleExpandQuestion()}>Collapse all</button>
    {:else}
      <button class="btn" on:click={() => toggleExpandQuestion()}>Expand all</button>
    {/if}
  </div>
</div>
<div class="flex flex-col mb-3 text-xl" />
