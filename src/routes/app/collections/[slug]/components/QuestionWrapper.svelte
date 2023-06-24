<script lang="ts">
  import type {
    MultipleChoiceAnswer,
    MultipleChoiceQuestion,
  } from "@prisma/client";
  import QuestionEditModal from "./QuestionEditModal.svelte";
  import Question from "./Question.svelte";
  import Answers from "./Answers.svelte";

  export let handleSelectQuestion: Function;
  export let handleDeleteQuestion: Function;
  export let showAnswers = true;
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
        <Question {question} {handleSelectQuestion} {toggleShowModal} />
        {#if showAnswers} <Answers {question} {handleDeleteQuestion} />{/if}
      </div>
    </div>
  </div>
{/if}
