import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../../domain';

@Injectable({ providedIn: 'root' })
export class WorkspaceDataService {
  private readonly httpClient = inject(HttpClient);

  private readonly API_URL = 'http://api.drafter.local';

  getProject(id: string): Observable<IProject> {
    const url = `${this.API_URL}/projects/${id}`;
    return this.httpClient.get<IProject>(url);
  }

  saveProject(id: IProject['id'], project: IProject): Observable<IProject> {
    const url = `${this.API_URL}/projects/${id}`;
    return this.httpClient.put<IProject>(url, { data: project });
  }

  createProject(project: IProject): Observable<IProject> {
    const url = `${this.API_URL}/projects`;
    return this.httpClient.post<IProject>(url, { data: project });
  }
}
