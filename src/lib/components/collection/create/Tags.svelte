<script lang="ts">
  import { tags } from "$lib/stores/create";

  // let $tags: Array<string> = [];
  let currentTag: string = "";
  let tagWarning: string = "";

  function addTag() {
    if (currentTag.length > 2) {
      if ($tags.length > 6) {
        tagWarning = "No more than 6 $tags allowed.";
      } else if (currentTag.length > 30) {
        tagWarning = "Tag length can be no more than 30 characters.";
      } else if ($tags.includes(currentTag)) {
        tagWarning = "Tag has already been included.";
      } else {
        $tags.push(currentTag);
        $tags = $tags;
        currentTag = "";
      }
    } else {
      tagWarning = "Tag must be more than two characaters long.";
    }
  }

  function removeTag(tagToRemove: string) {
    $tags = $tags.filter(tag => tag != tagToRemove);
  }

  // TODO: fix this shit because it can't detect backspace?
  function handleKeydown(event: KeyboardEvent) {
    if (event.key != "Enter") {
      tagWarning = "";
    }
  }
</script>

<div class="flex-1 mb-2">
  <div class="form-control">
    <form method="POST" on:submit|preventDefault={addTag}>
      <input
        type="text"
        placeholder="Add optional tags"
        class="input input-bordered w-full"
        on:keypress={handleKeydown}
        bind:value={currentTag}
      />
    </form>
  </div>

  <div class="text-error-content m-3">{tagWarning}</div>

  <div class="flex flex-wrap">
    {#each $tags as tag}
      <div class="flex bg-neutral text-neutral-content pt-1 pb-1 pl-2 pr-2 mr-2 rounded-md text-sm">
        <div class="flex-initial pr-4">{tag}</div>
        <div
          class="flex-end hover:text-error cursor-pointer"
          on:keydown={() => removeTag(tag)}
          on:click={() => removeTag(tag)}
        >
          [x]
        </div>
      </div>
    {/each}
  </div>
</div>
