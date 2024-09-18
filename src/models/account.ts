export enum AccessTypes {
  admin = 'admin',
  external = 'external',
}

export interface Users {
  email?: string;
  password?: string;
  token?: string;
  org_projects?: Projects[];
  ext_projects?: Projects[];
}

export interface Projects {
  pk?: number;
  project_name?: string;
}

export interface ProjectResponse {
  access_type?: AccessTypes;
  project_data?: ProjectData;
  user_apps?: UserApps;
}

export interface ProjectData {
  object_details?: any;
  organization_id?: any;
  pk?: any;
  project_id?: any;
  project_name?: any;
}

export interface UserApps {
  directory?: boolean;
  drawings?: boolean;
  files?: boolean;
  reports?: boolean;
  rfis?: boolean;
  submittals?: boolean;
}

export type UserAppsKeys = keyof UserApps;

export interface FilesResponse {
  folders?: Folders[];
  files?: Files[];
  links?: Links[];
  path?: string;
}

export type FilesResponseKeys = keyof FilesResponse;

export interface Folders {
  folder_name?: string;
  pk?: any;
}

export interface Files {
  pk?: any;
  object_details?: FileObjectDetails;
  uploaded_on_local?: string;
}

export interface FileObjectDetails {
  file_path?: any;
  file_name?: any;
  size?: FileSize;
}

export interface FileSize {
  display?: any;
  amount?: number;
}

export interface Links {
  pk?: any;
  link_name?: string;
  link_url?: string;
  uploaded_on_local?: string;
}

export interface ReportsResponse {
  pk?: any;
  report_id?: any;
  is_final?: boolean;
  finalized_by?: any;
  finalized_on?: any;
  object_details?: ReportsObjectDetails;
}

export interface ReportsObjectDetails {
  date?: ReportsDateDetails;
  deliveries?: any[];
  equipment?: any[];
  inspections?: any[];
  manpower?: any[];
  other?: any[];
  photos?: PhotosDetails[];
  weather?: any;
}

export type ReportsObjectDetailsKeys = keyof ReportsObjectDetails;

export interface ReportsDateDetails {
  date?: any;
  display?: any;
}

export interface PhotosDetails {
  pk?: any;
  location?: any;
  notes?: any;
  object_details?: PhotosObjectDetails;
}

export interface PhotosObjectDetails {
  file_path?: any;
  filename?: any;
  time?: any;
}

export interface DrawingResponse{
  drawings: Drawing[];
  storage: boolean;
}

export interface drawingDetails {
  issues: any[];
  storage: boolean;
}

export interface Drawing {
  description: string;
  drawing: string;
  drawing_id: string;
  pk: number;
  tags: string;
  object_details: ObjectDetails;
}

export interface ObjectDetails {
  latest_issue: string;
  num_of_issues: number;
  drawing_size: DrawingSize;
}

export interface DrawingSize {
  amount: number;
  amount_kb: number;
  display: string;
}