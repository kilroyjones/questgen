import * as pdfjs from "pdfjs-dist";
import { encoding_for_model } from "@dqbd/tiktoken";
import type { TextItem } from "pdfjs-dist/types/src/display/api";
import { FileData, FileType } from "$lib/models";

pdfjs.GlobalWorkerOptions.workerSrc = "../pdf.worker.min.js";
const enc = encoding_for_model("gpt-3.5-turbo");

export async function processFiles(
  id: number,
  files: Array<File>
): Promise<[Array<FileData>, Array<string>]> {
  let stagedFiles: Array<FileData> = [];
  let rejectFiles: Array<string> = [];
  await Promise.all(
    files.map(async (file: File) => {
      switch (file.type) {
        case "application/pdf":
          let content = await getPDFContent(file);
          let tokenCount = await getTokenCount(content);
          stagedFiles.push(
            new FileData(
              id + stagedFiles.length,
              file.name,
              content,
              FileType.PDF,
              tokenCount
            )
          );
          break;
        default:
          rejectFiles.push(file.name);
      }
    })
  );
  return [stagedFiles, rejectFiles];
}

export async function getTokenCount(document: string): Promise<number> {
  let result = new TextDecoder().decode(enc.decode(enc.encode(document)));
  return result.length;
}

// TODO: Create error type to handle when this fails
// error type should be used for all file types
export async function getPDFContent(file: File): Promise<string> {
  let content = "";
  try {
    const pdfData = new Uint8Array(await file.arrayBuffer());
    const loadingTask = pdfjs.getDocument(pdfData);
    let pdf = await loadingTask.promise;
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      content += textContent.items
        .map((item) => (item as TextItem).str)
        .join(" ");
    }
    return content;
  } catch (error) {
    // TODO: Handle erro
    return "";
  }
  return "ERROR";
}
