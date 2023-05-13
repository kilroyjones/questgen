<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  async function deleteQuestion() {
    dispatch("message", {
      op: "deleteQuestion",
      data: {},
    });
  }

  async function updateQuestion() {
    dispatch("message", {
      op: "updateQuestion",
      data: {},
    });
  }

  async function approveQuestion() {
    dispatch("message", {
      op: "approveQuestion",
      data: {},
    });
  }
</script>

<div class="flex">
  <div class="w-full md:w-1/4" />
  <div class="flex justify-between items-center w-full md:w-1/2 lg:w-5/12">
    <div>
      <button class="btn" on:click={deleteQuestion}>DELETE</button>
    </div>
    <div class="ml-auto">
      <button class="btn align-right" on:click={updateQuestion}>UPDATE</button>
      <button class="btn" on:click={approveQuestion}>APPROVE</button>
    </div>
  </div>
  <div class="w-full md:w-1/4" />
</div>
