import { writable, get } from "svelte/store";
import type { Writable } from "svelte/store";
import type { ContentInfo } from "$lib/models";

// TODO: Remove sample data
export const collectionName = writable("TEST");
export const collectionID = writable(-1);
export const isCollectionNew = writable(true);
export const questionCount = writable(20);
export const stagedContentInfo = writable<Array<ContentInfo>>([
  {
    id: 1,
    name: "a",
    content:
      "The Transmission Control Protocol (TCP) is one of the main protocols of the Internet protocol suite. It originated in the initial network implementation in which it complemented the Internet Protocol (IP). Therefore, the entire suite is commonly referred to as TCP/IP. TCP provides reliable, ordered, and error-checked delivery of a stream of octets (bytes) between applications running on hosts communicating via an IP network. Major internet applications such as the World Wide Web, email, remote administration, and file transfer rely on TCP, which is part of the Transport Layer of the TCP/IP suite. SSL/TLS often runs on top of TCP.",
    type: 1,
    tokenCount: 100,
  },
  {
    id: 2,
    name: "",
    content:
      "In May 1974, Vint Cerf and Bob Kahn described an internetworking protocol for sharing resources using packet switching among network nodes.[1] The authors had been working with Gérard Le Lann to incorporate concepts from the French CYCLADES project into the new network.[2] The specification of the resulting protocol, RFC 675 (Specification of Internet Transmission Control Program), was written by Vint Cerf, Yogen Dalal, and Carl Sunshine, and published in December 1974. It contains the first attested use of the term internet, as a shorthand for internetwork.[3]",
    type: 1,
    tokenCount: 100,
  },
]);
export const tags: Writable<Array<string>> = writable([]);
export const tokenTotal = writable(0);
export const estimatedQueries = writable(0);

export async function resetCreate() {
  collectionName.set("");
  stagedContentInfo.set([]);
  tags.set([]);
  collectionID.set(-1);
}
