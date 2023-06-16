<script lang="ts">
  import type {
    Collection,
    MultipleChoiceAnswer,
    MultipleChoiceQuestion,
    Tag,
  } from "@prisma/client";
  import QuestionWrapper from "./components/QuestionWrapper.svelte";
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

  async function deleteQuestion() {}
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
  <div class="flex flex-col mb-3 text-xl" />
  <hr />
  <div class="flex flex-col mt-3">
    {#each collection.questions as question}
      <QuestionWrapper {question} {deleteQuestion} />
    {/each}
  </div>
{/if}
