<script lang="ts">
  import type { Question } from "$lib/models";
  import type { MultipleChoiceAnswer, MultipleChoiceQuestion } from "@prisma/client";
  import Answer from "./components/Answer.svelte";
  import { onMount } from "svelte";

  let question: MultipleChoiceQuestion | null = null;
  let removedAnswers: Array<number> = [];
  let filterOn: string;
  let collections: Array<any> | null = null;
  let selectedCollection: number;
  let collectionBind: string;

  async function getQuestion() {
    console.log(filterOn, selectedCollection);
    let resp = await fetch("http://localhost:5173/api/question/get", {
      method: "POST",
      body: JSON.stringify({
        filterOn: filterOn,
        collectionId: selectedCollection,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    console.log(resp);
    question = await resp.json();
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

  async function removeQuestion() {
    if (question) {
      let resp = await fetch("http://localhost:5173/api/question/delete", {
        method: "DELETE",
        body: JSON.stringify({ id: question.id }),
        headers: {
          "content-type": "application/json",
        },
      });
      let result = await resp.json();
      if (result.status == "success") {
        getQuestion();
      } else {
        // TODO: Display error
        console.log(result.status);
      }
    } else {
      // TODO: Handle error here
    }
  }

  async function updateQuestion() {
    if (question) {
      let resp = await fetch("http://localhost:5173/api/question/update", {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "content-type": "application/json",
        },
      });
      let result = await resp.json();
      if (result.status == "success") {
        // TODO: Add confirmation
        console.log("updated");
      } else {
        // TODO: Display error
        console.log(result.status);
      }
    } else {
      // TODO: Handle error here
    }
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

  async function approveQuestion() {
    if (question) {
      let resp = await fetch("http://localhost:5173/api/question/approve", {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "content-type": "application/json",
        },
      });
      let result = await resp.json();
      if (result.status == "success") {
        // TODO: Add confirmation
        console.log("approved");
        getQuestion();
      } else {
        // TODO: Display error
        console.log(result.status);
      }
    } else {
      // TODO: Handle error here
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

  async function getCollections() {
    let resp = await fetch("http://localhost:5173/api/collections/browse", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
      },
    });

    // TODO: Error handling
    return await resp.json();
  }

  onMount(async () => {
    collections = await getCollections();
    console.log(collections);

    if (collections) {
      if (collections.length > 1) {
        selectedCollection = collections[1].id;
        console.log(selectedCollection);
        getQuestion();
      }
    }
  });

  async function changeCollection(e: Event) {
    console.log("EVENT", e);
    if (collections) {
      selectedCollection = collections.find(o => o.name === collectionBind).id;
      getQuestion();
    }
  }
</script>

{#if collections}
  <div class="flex mb-3 mt-10">
    <div class="w-full md:w-1/4" />
    <div class="w-full md:w-1/2 lg:w-5/12">
      <div class="flex flex-col mb-2">
        <select
          class="select w-full max-w-xs border-2 border-gray-400"
          bind:value={collectionBind}
          on:change={changeCollection}
        >
          {#each collections as collection}
            <option id={collection.id}>{collection.name}</option>
          {/each}
        </select>
        <select
          class="select w-full max-w-xs border-2 border-gray-400"
          bind:value={filterOn}
          on:change={getQuestion}
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
          <button class="btn" on:click={removeQuestion}>DELETE</button>
        </div>
        <div class="ml-auto">
          <button class="btn align-right" on:click={updateQuestion}>UPDATE</button>
          <button class="btn" on:click={approveQuestion}>APPROVE</button>
        </div>
      </div>
      <div class="w-full md:w-1/4" />
    </div>
  {/if}
{/if}
