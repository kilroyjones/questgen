<script lang="ts">
  import type { MultipleChoiceAnswer, MultipleChoiceQuestion } from "@prisma/client";
  import QuestionEditModal from "./QuestionEditModal.svelte";
  import Question from "./Question.svelte";
  import QuestionExpanded from "./QuestionExpanded.svelte";

  export let handleSelectQuestion: Function;
  export let handleDeleteQuestion: Function;
  export let questionExpanded = true;
  export let question: MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] };

  let showEditModal = false;

  function toggleShowModal() {
    showEditModal = !showEditModal;
  }

  function toggleExpandQuestion() {
    questionExpanded = !questionExpanded;
  }
</script>

{#if question}
  <QuestionEditModal {question} bind:showEditModal />
  <div class="flex flex-row mb-4">
    <div class="card w-full bg-base-100 shadow-xl hover:bg-gray-100 cursor-pointer">
      <div
        class="card-body p-4"
        on:click={() => toggleExpandQuestion()}
        on:keydown={() => toggleExpandQuestion()}
      >
        <Question {question} {handleSelectQuestion} {toggleShowModal} />
        {#if questionExpanded} <QuestionExpanded {question} {handleDeleteQuestion} />{/if}
      </div>
    </div>
  </div>
{/if}
