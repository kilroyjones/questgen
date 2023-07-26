<script lang="ts">
  // Components
  import QuestionWrapper from "$lib/components/collections/QuestionWrapper.svelte";
  import CollectionInfo from "$lib/components/collections/CollectionInfo.svelte";
  import CollectionControls from "$lib/components/collections/CollectionControls.svelte";

  // Types
  import type {
    Collection,
    MultipleChoiceAnswer,
    MultipleChoiceQuestion,
    Tag,
  } from "@prisma/client";

  export let data;

  let collection:
    | (Collection & {
        questions: Array<MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }>;
        tags: Tag[];
      })
    | null = data.collection;
  let questionExpanded: boolean = false;
  let selectedQuestions: Array<MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }> = [];

  /**
   *
   */
  async function handleSelectQuestion(
    question: MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }
  ) {
    if (!selectedQuestions.includes(question)) {
      selectedQuestions.push(question);
    } else {
      selectedQuestions = selectedQuestions.filter(q => q != question);
    }
  }

  /**
   *
   */

  /**
   *
   */
  async function handleDeleteQuestion(
    question: MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }
  ) {
    // if (question) {
    //   confirmDelete.showModal();
    // }
  }

  // async function handleConfirmDeleteQuestion(
  //   question: MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }
  // ) {
  //   // showEditModal = false;
  //   let response: Response = await deleteQuestions([question]);
  //   let result = await response.json();
  //   if (result.status == "success") {
  //     await invalidate("collections:refresh-on-delete");
  //   }
  // }

  async function toggleExpandQuestion() {
    questionExpanded = !questionExpanded;
  }

  $: collection = data.collection;
</script>

{#if collection}
  <div class="mb-3">
    <CollectionInfo {collection} />
  </div>
  <CollectionControls {selectedQuestions} {toggleExpandQuestion} {questionExpanded} />
  <hr />
  <div class="flex flex-col mt-3">
    {#each collection.questions as question}
      <QuestionWrapper
        {question}
        {handleSelectQuestion}
        {handleDeleteQuestion}
        {questionExpanded}
      />
    {/each}
  </div>
{/if}
