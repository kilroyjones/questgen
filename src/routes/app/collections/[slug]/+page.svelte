<script lang="ts">
  import type { Collection, MultipleChoiceQuestion, Tag } from "@prisma/client";
  import { QuestionStatus } from "$lib/models.js";

  export let data;

  let isExpanded: boolean = false;

  //  TODO: USE THIS IN OTHER PLACES
  let collection:
    | (Collection & { questions: MultipleChoiceQuestion[]; tags: Tag[] })
    | null = data.collection;
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
  <hr />
  <div class="flex flex-col mt-3">
    {#each collection.questions as question}
      {#if question.status != QuestionStatus.DELETED}
        <div
          class="card bg-base-100 shadow-xl hover:bg-gray-100 cursor-pointer mb-3"
        >
          <div class="card-body">
            {question.question}
            <div class="">
              <div class="flex text-sm justify-between">
                <div class="flex items-end">
                  {#if question.status == QuestionStatus.APPROVED}
                    Approved
                  {:else}
                    Not approved
                  {/if}
                </div>
                <div>
                  <button class="btn h-[2rem] min-h-[2rem]">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
{/if}
