<script lang="ts">
  import type { MultipleChoiceAnswer, Prisma } from "@prisma/client";
  import {
    approveQuestion,
    deleteQuestion,
    getQuestion,
    updateQuestion,
  } from "./api-calls/questions";
  import Answer from "./components/Answer.svelte";
  import { onMount } from "svelte";
  import type { MultipleChoiceQuestionWithAnswers } from "$lib/models";
  import Collections from "./components/Collections.svelte";
  import CollectionsFilter from "./components/CollectionsFilter.svelte";
  import Actions from "./components/Actions.svelte";

  let question: MultipleChoiceQuestionWithAnswers | null = null;
  let removedAnswers: Array<number> = [];
  let filter: string;
  let collectionId: number;

  async function updateAnswer(answer: MultipleChoiceAnswer) {
    if (question) {
      question.answers.forEach(function (currentAnswer, index) {
        if (currentAnswer.id == answer.id) {
          currentAnswer = answer;
        }
      });
    }
  }

  function getStatus() {
    if (question) {
      console.log(question.isApproved, question.isDeleted);
      if (question.isApproved) {
        return "Approved";
      } else if (question.isDeleted) {
        return "Deleted";
      } else {
        return "Not approved";
      }
    }
  }

  async function handleMessage(
    message: CustomEvent<{ op: string; data: any }>
  ) {
    let op = message.detail.op;
    let data = message.detail.data;
    console.log(message, op, data);

    switch (op) {
      case "changeCollection":
        collectionId = data.collectionId;
        setupQuestion();
        break;

      case "changeFilter":
        filter = data.filter;
        console.log(filter);
        setupQuestion();
        break;

      // TODO: on each of these I need to handle errors
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

  async function removeAnswer(id: number) {
    let idx = removedAnswers.indexOf(id);
    console.log(idx, removedAnswers);
    if (idx > -1) {
      removedAnswers.splice(idx, 1);
    } else {
      removedAnswers.push(id);
    }
    removedAnswers = removedAnswers;
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
      <div class="card">
        <div class="flex">
          <div class="flex-1 w-full h-full text-sm">
            <textarea
              class="textarea h-full w-full border-2 border-gray-400"
              bind:value={question.question}
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        {#each question.answers as answer}
          {#if removedAnswers.includes(answer.id) == true}
            <Answer {answer} {removeAnswer} {updateAnswer} disabled={true} />
          {:else}
            <Answer {answer} {removeAnswer} {updateAnswer} disabled={false} />
          {/if}
        {/each}
      </div>
    </div>
    <div class="w-full md:w-1/4" />
  </div>
  <Actions on:message={handleMessage} />
{/if}
