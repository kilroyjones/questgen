<script lang="ts">
  import type { MultipleChoiceAnswer, Prisma } from "@prisma/client";
  import { approveQuestion, deleteQuestion, getQuestion } from "./api-calls/questions";
  import { getCollectionList } from "./api-calls/collections";
  import Answer from "./components/Answer.svelte";
  import { onMount } from "svelte";
  import type { MultipleChoiceQuestionWithAnswers } from "$lib/models";

  let question: MultipleChoiceQuestionWithAnswers | null = null;
  let removedAnswers: Array<number> = [];
  let questionStatusFilter: string;
  let collectionList: Array<any> | null = null;
  let collectionId: number;
  let collectionName: string;

  enum Action {
    ApproveQuestion,
    ChangeCollection,
    DeleteQuestion,
    GetCollectionList,
    GetQuestion,
    UpdateQuestion,
  }

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

  async function update(action: Action) {
    console.log(action);
    // TODO: Handle Errors
    switch (action) {
      case Action.ApproveQuestion:
        if (question) {
          let resp = await approveQuestion(question);
        }
        break;

      case Action.ChangeCollection:
        if (collectionList) {
          collectionId = collectionList.find(o => o.name === collectionName).id;
          update(Action.GetQuestion);
        }
        break;

      case Action.DeleteQuestion:
        if (question) {
          let resp = await deleteQuestion(question);
          update(Action.GetQuestion);
        }
        break;

      case Action.GetCollectionList:
        // TODO: Fix this ugly crap
        {
          let resp = await getCollectionList();
          collectionList = await resp.json();
          if (collectionList && collectionList.length > 1) {
            collectionId = collectionList[1].id;
            update(Action.GetQuestion);
          }
        }
        break;

      case Action.GetQuestion:
        let resp = await getQuestion(questionStatusFilter, collectionId);
        question = await resp.json();
        break;

      case Action.DeleteQuestion:
        if (question) {
          let resp = await deleteQuestion(question);
          update(Action.GetQuestion);
        }
        break;
    }
  }

  onMount(async () => {
    update(Action.GetCollectionList);
  });
</script>

{#if collectionList}
  <div class="flex mb-3 mt-10">
    <div class="w-full md:w-1/4" />
    <div class="w-full md:w-1/2 lg:w-5/12">
      <div class="flex flex-row mb-2">
        <select
          class="select max-w-xs w-full border-2 border-gray-400"
          bind:value={collectionName}
          on:change={() => update(Action.ChangeCollection)}
        >
          {#each collectionList as collection}
            <option id={collection.id}>{collection.name}</option>
          {/each}
        </select>
        <select
          class="select max-w-xs mx-auto border-2 border-gray-400"
          bind:value={questionStatusFilter}
          on:change={() => update(Action.GetQuestion)}
        >
          <option>Not approved</option>
          <option selected>Approved</option>
          <option>Deleted</option>
          <option>All</option>
        </select>
      </div>
      {#if question}
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
        <div class="flex mb-6 rounded-full bg-info p-2 w-36">
          {getStatus()}
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
      {/if}
    </div>
    <div class="w-full md:w-1/4" />
  </div>
  {#if question}
    <div class="flex">
      <div class="w-full md:w-1/4" />
      <div class="flex justify-between items-center w-full md:w-1/2 lg:w-5/12">
        <div>
          <button class="btn" on:click={() => update(Action.DeleteQuestion)}>DELETE</button>
        </div>
        <div class="ml-auto">
          <button class="btn align-right" on:click={() => update(Action.UpdateQuestion)}
            >UPDATE</button
          >
          <button class="btn" on:click={() => update(Action.ApproveQuestion)}>APPROVE</button>
        </div>
      </div>
      <div class="w-full md:w-1/4" />
    </div>
  {/if}
{/if}
