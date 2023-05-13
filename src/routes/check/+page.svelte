<script lang="ts">
  import type { MultipleChoiceAnswer } from "@prisma/client";
  import {
    approveQuestion,
    deleteQuestion,
    getQuestion,
    updateQuestion,
  } from "./api-calls/questions";
  import Answers from "./components/Answers.svelte";
  import { onMount } from "svelte";
  import type { MultipleChoiceQuestionWithAnswers } from "$lib/models";
  import Collections from "./components/Collections.svelte";
  import CollectionsFilter from "./components/CollectionsFilter.svelte";
  import Actions from "./components/Actions.svelte";
  import Question from "./components/Question.svelte";

  let question: MultipleChoiceQuestionWithAnswers | null = null;
  let filter: string;
  let collectionId: number;
  let removedAnswers: Array<number> = [];

  async function handleMessage(
    message: CustomEvent<{ op: string; data: any }>
  ) {
    let op = message.detail.op;
    let data = message.detail.data;

    switch (op) {
      case "changeCollection":
        collectionId = data.collectionId;
        setupQuestion();
        break;

      case "changeFilter":
        filter = data.filter;
        setupQuestion();
        break;

      // TODO: on each of these I need to handle errors
      case "changeQuestion":
        if (question) {
          question.question = data.question;
        }
        break;

      case "updateAnswer":
        if (question) {
          question.answers.forEach(function (currentAnswer, index) {
            if (currentAnswer.id == data.answer.id) {
              currentAnswer = data.answer;
            }
          });
        }
        break;

      case "removeAnswer":
        if (!removedAnswers.includes(data.id)) {
          removedAnswers.push(data.id);
          removedAnswers = removedAnswers;
        } else {
          removedAnswers = removedAnswers.filter((id) => id != data.id);
        }
        break;

      case "deleteQuestion":
        if (question) {
          await deleteQuestion(question);
          setupQuestion();
        }
        break;

      case "updateQuestion":
        if (question) {
          await updateQuestion(question);
          setupQuestion();
        }
        break;

      case "approveQuestion":
        if (question) {
          await approveQuestion(question);
          setupQuestion();
        }
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
  <div class="flex mb-3 mt-10">
    <div class="w-full md:w-1/4" />
    <div class="w-full md:w-1/2 lg:w-5/12">
      <div class="flex flex-row gap-2 mb-2">
        <div class="flex-1">
          <Collections on:message={handleMessage} />
        </div>
        <div class="flex-4">
          <CollectionsFilter on:message={handleMessage} />
        </div>
      </div>
      <Question on:message={handleMessage} question={question.question} />
      <div class="flex flex-col">
        <Answers
          on:message={handleMessage}
          answers={question.answers}
          {removedAnswers}
        />
      </div>
    </div>
    <div class="w-full md:w-1/4" />
  </div>
  <Actions on:message={handleMessage} />
{/if}
