import { writable, get } from "svelte/store";
import type { Writable } from "svelte/store";
import type { ContentInfo } from "$lib/models";

// TODO: Remove sample data
export const collectionName = writable("TEST");
export const collectionID = writable(-1);
export const isCollectionNew = writable(true);
export const questionCount = writable(20);
export const stagedContentInfo = writable<Array<ContentInfo>>([]);
export const tags: Writable<Array<string>> = writable([]);
export const tokenTotal = writable(0);
export const estimatedQueries = writable(0);

export async function resetCreate() {
  collectionName.set("");
  stagedContentInfo.set([]);
  tags.set([]);
  collectionID.set(-1);
}
