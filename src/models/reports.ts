export interface FilePickerResponse {
  uri: string;
  name: string | null;
  copyError?: string;
  fileCopyUri?: string | null;
  type: string | null;
  size: number | null;
}

export interface ImageVideoCommon {
  data?: string | null;
  path: string;
  size: number;
  width: number;
  height: number;
  mime: string;
  exif?: null | object;
  localIdentifier?: string;
  sourceURL?: string;
  filename?: string;
  creationDate?: string;
  modificationDate?: string;
}
