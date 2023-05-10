<script lang="ts">
	export let filename: String;
</script>

<div class="card bg-base-200 mt-3 mb-3 p-3">
	<div class="flex">
		<div class="flex-1 mr-2 text-sm">{filename}</div>
		<div class="flex-4">
			<button class="btn btn-square btn-sm hover:text-accent-focus" on:click> x </button>
		</div>
	</div>
</div>
