<script lang="ts">
  export let handleChangeQuestion: Function;
  export let question: string;
</script>

<div class="card">
  <div class="flex">
    <div class="flex-1 w-full h-full text-sm">
      <textarea
        class="textarea h-full w-full border-2 border-gray-400"
        bind:value={question}
        on:keydown={() => handleChangeQuestion(question)}
      />
    </div>
  </div>
</div>
