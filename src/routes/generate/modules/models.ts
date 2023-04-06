export enum FileType {
  PDF,
}

export class FileData {
  id: number;
  name: string;
  content: string;
  fileType: FileType;
  tokenCount: number;

  constructor(id: number, name: string, content: string, fileType: FileType, tokenCount: number) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.tokenCount = tokenCount;
    this.fileType = fileType;
  }
}
