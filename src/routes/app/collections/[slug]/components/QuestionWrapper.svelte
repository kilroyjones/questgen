<script lang="ts">
  import type {
    MultipleChoiceAnswer,
    MultipleChoiceQuestion,
  } from "@prisma/client";
  import AiOutlineEdit from "svelte-icons-pack/ai/AiOutlineEdit";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import QuestionEditModal from "./QuestionEditModal.svelte";

  export let deleteQuestion: Function;
  export let showAnswers = false;
  export let question:
    | MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] };

  let showEditModal = false;

  function toggleShowModal() {
    showEditModal = !showEditModal;
  }

  function toggleShowAnswer() {
    showAnswers = !showAnswers;
  }
</script>

{#if question}
  <QuestionEditModal {question} bind:showEditModal />
  <div class="flex flex-row mb-4">
    <div
      class="card w-full bg-base-100 shadow-xl hover:bg-gray-100 cursor-pointer"
    >
      <div
        class="card-body p-4"
        on:click={() => toggleShowAnswer()}
        on:keydown={() => toggleShowAnswer()}
      >
        <div class="flex justify-between">
          <div class="flex font-bold">
            <div class="flex mr-3">
              <input type="checkbox" checked={false} on:click|stopPropagation />
            </div>
            <div class="flex">{question.question}</div>
          </div>
          <div class="flex-4 flex-row ml-4 min-w-[2rem]">
            <div class="flex">
              <span
                on:click|stopPropagation={toggleShowModal}
                on:keydown={toggleShowModal}
                class="mr-2"
              >
                <Icon size="28" src={AiOutlineEdit} />
              </span>
            </div>
          </div>
        </div>
        {#if showAnswers}
          <div class="flex flex-col">
            {#each question.answers as answer}
              <div class="text-sm mb-2">
                {#if answer.isCorrect}
                  <div class="text-green-800 font-bold">
                    {answer.answer}
                  </div>
                {:else}
                  <div class="">
                    {answer.answer}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
