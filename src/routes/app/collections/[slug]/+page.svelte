<script lang="ts">
  import type {
    Collection,
    MultipleChoiceAnswer,
    MultipleChoiceQuestion,
    Tag,
  } from "@prisma/client";
  import QuestionWrapper from "./components/QuestionWrapper.svelte";
  import { deleteQuestions } from "./modules/api";
  import { invalidate } from "$app/navigation";

  export let data;

  //  TODO: USE THIS IN OTHER PLACES
  let collection:
    | (Collection & {
        questions: Array<
          MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }
        >;
        tags: Tag[];
      })
    | null = data.collection;
  let showAnswers: boolean = false;
  let selectedQuestions: Array<MultipleChoiceQuestion> = [];

  async function handleSelectQuestion(question: MultipleChoiceQuestion) {
    if (!selectedQuestions.includes(question)) {
      selectedQuestions.push(question);
    } else {
      selectedQuestions = selectedQuestions.filter((q) => q != question);
    }
  }

  async function handleDeleteQuestions() {
    if (selectedQuestions.length > 0) {
      let response: Response = await deleteQuestions(selectedQuestions);
      let result = await response.json();
      if (result.status == "success") {
        await invalidate("collections:refresh-on-delete");
      }
    }
  }

  async function handleDeleteQuestion(question: MultipleChoiceQuestion) {
    if (question) {
      let response: Response = await deleteQuestions([question]);
      let result = await response.json();
      if (result.status == "success") {
        await invalidate("collections:refresh-on-delete");
      }
    }
  }
  async function toggleShowAnswers() {
    showAnswers = !showAnswers;
  }

  $: collection = data.collection;
</script>

{#if collection}
  <div class="flex flex-col mb-3 text-xl">
    {collection.name}
  </div>
  <div class="flex flex-wrap">
    <div class="flex flex-row mb-3">
      {#each collection.tags as tag}
        <div
          class="flex bg-neutral text-neutral-content pt-1 pb-1 pl-2 pr-2 mr-2 rounded-md text-sm"
        >
          <div class="flex-initial pr-4">{tag.tag}</div>
        </div>
      {/each}
    </div>
  </div>
  <div class="flex justify-between mb-3">
    <div class="flex flex-row">
      <button
        class="btn bg-accent border-accent"
        on:click={handleDeleteQuestions}>Delete selected</button
      >
    </div>
    <div class="flex flex-row">
      {#if showAnswers}
        <button class="btn" on:click={toggleShowAnswers}>Collapse all</button>
      {:else}
        <button class="btn" on:click={toggleShowAnswers}>Expand all</button>
      {/if}
    </div>
  </div>
  <div class="flex flex-col mb-3 text-xl" />
  <hr />
  <div class="flex flex-col mt-3">
    {#each collection.questions as question}
      <QuestionWrapper
        {question}
        {handleSelectQuestion}
        {handleDeleteQuestion}
        {showAnswers}
      />
    {/each}
  </div>
{/if}
