import { get, getBaseRoute, post, put, remove } from './axios.service';
import * as Constants from '../constants/constants';
import { DrawingResponse, Files, FilesResponse, PhotosDetails, ProjectData, ProjectResponse, ReportsResponse, Users } from '../models/account';
import { FilePickerResponse } from '../models/reports';

export class ApiService {
  constructor() {}

  async login(email: string, password: string): Promise<Users> {
    var data = new FormData();
    data.append('email', email);
    data.append('password', password);

    return new Promise((resolve, reject) => {
      post(getBaseRoute(Constants.kReferenceLogin), data)
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          const result = error?.response;
          reject(result);
        });
    });
  }

  async getProjectsDetails(project_pk: number): Promise<ProjectResponse> {
    return new Promise((resolve, reject) => {
      get(getBaseRoute(`${Constants.kReferenceProjectsDetails}/${project_pk}`))
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          const result = error?.response;
          reject(result);
        });
    });
  }

  async getFiles(folder_pk: number, project_data: ProjectData): Promise<FilesResponse> {
    const data: ProjectData = { organization_id: project_data.organization_id, pk: project_data.pk };

    return new Promise((resolve, reject) => {
      get(getBaseRoute(`${Constants.kReferenceFolders}/${folder_pk}`), {
        project_data: JSON.stringify(data),
      })
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          const result = error?.response;
          reject(result);
        });
    });
  }

  async uploadFiles(folder_pk: number, project_data: ProjectData, file_path: any, document: any): Promise<Files[]> {
    var data = new FormData();
    data.append('project_data', JSON.stringify(project_data));
    data.append('folder_id', folder_pk);
    data.append('file_path', file_path);
    data.append('filename', document);

    return new Promise((resolve, reject) => {
      post(getBaseRoute(Constants.kReferenceFiles), data)
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          const result = error?.response;
          reject(result);
        });
    });
  }

  async getReports(project_data: ProjectData): Promise<ReportsResponse[]> {
    const data: ProjectData = { organization_id: project_data.organization_id, pk: project_data.pk };

    return new Promise((resolve, reject) => {
      get(getBaseRoute(Constants.kReferenceReports), {
        project_data: JSON.stringify(data),
      })
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          const result = error?.response;
          reject(result);
        });
    });
  }

  async addReport(report_date: string, project_data: ProjectData): Promise<ReportsResponse> {
    var data = new FormData();
    data.append('report_date', report_date);
    data.append('project_data', JSON.stringify(project_data));

    return new Promise((resolve, reject) => {
      post(getBaseRoute(Constants.kReferenceReports), data)
        .then((response) => {
          console.log("Response", response)
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          console.log("Response error", error?.response)
          const result = error?.response;
          reject(result);
        });
    });
  }

  async getReportDetails(report_id: any): Promise<ReportsResponse> {
    return new Promise((resolve, reject) => {
      get(getBaseRoute(`${Constants.kReferenceReportsDetails}/${report_id}`))
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          const result = error?.response;
          reject(result);
        });
    });
  }

  async getDrawings(project_data: ProjectData): Promise<ReportsResponse[]> {
    const data: ProjectData = { organization_id: project_data.organization_id, pk: project_data.pk };

    return new Promise((resolve, reject) => {
      get(getBaseRoute(Constants.kReferenceDrawings), {
        project_data: JSON.stringify(data),
      })
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          
          const result = error?.response;
          reject(result);
        });
    });
  }

  async getDrawingDetails(project_data: ProjectData, drawing_id: number | string): Promise<ReportsResponse> {
    const data: ProjectData = { organization_id: project_data.organization_id, pk: project_data.pk };
    return new Promise((resolve, reject) => {
      get(getBaseRoute(`${Constants.kReferenceDrawingDetails}/${drawing_id}`), {
        project_data: JSON.stringify(data),
      })
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          const result = error?.response;
          reject(result);
        });
    });
  }

  async uploadPhotos(
    project_data: ProjectData,
    report_pk: number,
    files: FilePickerResponse[],
    photo_time: string = '',
    location: string = '',
    notes: any = ''
  ): Promise<PhotosDetails[]> {
    var data = new FormData();
    data.append('project_data', JSON.stringify(project_data));
    data.append('report_pk', report_pk);
    data.append('photo_time', photo_time);
    data.append('location', location);
    data.append('notes', notes);

    files.forEach((file) => {
      data.append('filename', file);
    });

    return new Promise((resolve, reject) => {
      post(getBaseRoute(`${Constants.kReferenceReportsPhotos}`), data)
        .then((response) => {
          const result = response.data;
          resolve(result);
        })
        .catch((error) => {
          const result = error?.response;
          reject(result);
        });
    });
  }
}

export const apiService = new ApiService();
