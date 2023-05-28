<script lang="ts">
  import Answers from "./components/Answers.svelte";
  import {
    approveQuestion,
    deleteQuestion,
    getQuestion,
    updateQuestion,
  } from "./modules/api";
  import { onMount } from "svelte";
  import type { MultipleChoiceQuestionWithAnswers } from "$lib/models";
  import Collections from "./components/Collections.svelte";
  import CollectionsFilter from "./components/CollectionsFilter.svelte";
  import Process from "./components/Process.svelte";
  import Question from "./components/Question.svelte";
  import type { MultipleChoiceAnswer } from "@prisma/client";

  let question: MultipleChoiceQuestionWithAnswers | null = null;
  let filter: string;
  let collectionId: number;
  let removedAnswers: Array<number> = [];

  async function handleChangeCollection(newId: number) {
    collectionId = newId;
    setupQuestion();
  }

  async function handleChangeFilter(newFilter: string) {
    filter = newFilter;
    setupQuestion();
  }

  async function handleUpdateAnswer(updatedAnswer: MultipleChoiceAnswer) {
    if (question) {
      question.answers.forEach(function (currentAnswer, index) {
        if (currentAnswer.id == updatedAnswer.id) {
          currentAnswer = updatedAnswer;
        }
      });
    }
  }

  async function handleChangeQuestion(newQuestion: string) {
    if (question) {
      question.question = newQuestion;
    }
  }

  async function handleApproveQuestion() {
    if (question) {
      await approveQuestion(question);
      setupQuestion();
    }
  }

  async function handleDeleteQuestion() {
    if (question) {
      await deleteQuestion(question);
      setupQuestion();
    }
  }

  async function handleRemoveAnswer(removedId: number) {
    if (!removedAnswers.includes(removedId)) {
      removedAnswers.push(removedId);
      removedAnswers = removedAnswers;
    } else {
      removedAnswers = removedAnswers.filter((id) => id != removedId);
    }
  }

  async function handleUpdateQuestion() {
    if (question) {
      await updateQuestion(question);
      setupQuestion();
    }
  }

  async function setupQuestion() {
    let resp = await getQuestion(filter, collectionId);
    if (resp) {
      question = await resp.json();
    } else {
      // TODO: Handle error
    }
  }

  onMount(async () => {
    await setupQuestion();
  });
</script>

{#if question}
  <div class="flex flex-row gap-2 mb-2">
    <div class="flex-1 mb-4">
      <Collections {handleChangeCollection} />
    </div>
    <div class="flex-4">
      <CollectionsFilter {handleChangeFilter} />
    </div>
  </div>
  <div class="mb-4">
    <Question {handleChangeQuestion} question={question.question} />
  </div>
  <div class="flex flex-col">
    <Answers
      {handleUpdateAnswer}
      {handleRemoveAnswer}
      answers={question.answers}
      {removedAnswers}
    />
  </div>
  <Process
    {handleApproveQuestion}
    {handleDeleteQuestion}
    {handleUpdateQuestion}
  />
{/if}
