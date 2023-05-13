<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let question: string;

  const dispatch = createEventDispatcher();

  async function changeQuestion() {
    console.log("asdf");
    dispatch("message", {
      op: "changeQuestion",
      data: {
        question: question,
      },
    });
  }
</script>

<div class="card">
  <div class="flex">
    <div class="flex-1 w-full h-full text-sm">
      <textarea
        class="textarea h-full w-full border-2 border-gray-400"
        bind:value={question}
        on:keydown={changeQuestion}
      />
    </div>
  </div>
</div>
