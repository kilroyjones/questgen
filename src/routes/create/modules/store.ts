import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const tags: Writable<Array<string>> = writable([]);
export const collectionName = writable("");
