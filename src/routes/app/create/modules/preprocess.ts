import * as pdfjs from "pdfjs-dist";
import { encoding_for_model } from "@dqbd/tiktoken";
import type { TextItem } from "pdfjs-dist/types/src/display/api";
import { FileData, FileType } from "$lib/models";

pdfjs.GlobalWorkerOptions.workerSrc = "../pdf.worker.min.js";
const enc = encoding_for_model("gpt-3.5-turbo");

/**
 * Extracts text and counts tokens from a list of PDFs
 *
 * This function takes in an id which is equal to the length of the currently
 * staged files and a list of files. It attempts to read text content from the
 * PDFs, spliting the files between staged and rejected depending on whether it
 * can read the files or not.
 */
export async function processFiles(
  id: number,
  files: Array<File>
): Promise<[Array<FileData>, Array<string>]> {
  let stagedFiles: Array<FileData> = [];
  let rejectedFiles: Array<string> = [];
  let fileData: FileData | null;

  await Promise.all(
    files.map(async (file: File) => {
      switch (file.type) {
        case "application/pdf":
          fileData = await processPDF(id + stagedFiles.length, file);
          break;
        default:
          fileData = null;
      }
      if (fileData) {
        stagedFiles.push(fileData);
      } else {
        rejectedFiles.push(file.name);
      }
    })
  );

  return [stagedFiles, rejectedFiles];
}

/**
 * Extracts PDF text and creates FileData object
 */
async function processPDF(id: number, file: File): Promise<FileData | null> {
  try {
    let content = await getPDFContent(file);

    if (content == null) {
      return null;
    }

    let tokenCount = await getTokenCount(content);
    return new FileData(id, file.name, content, FileType.PDF, tokenCount);
  } catch (error) {
    return null;
  }
}

/**
 * Counts token based on encoder defined at top of this source file
 */
export async function getTokenCount(document: string): Promise<number> {
  let result = new TextDecoder().decode(enc.decode(enc.encode(document)));
  return result.length;
}

/**
 * Converts PDF text content into a string
 */
export async function getPDFContent(file: File): Promise<string | null> {
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
    return null;
  }
}
