import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { WorkspaceStateService } from '../state/workspace/workspace.service';

export const resolveProjectFn: ResolveFn<void> = (route) => {
  const workspaceService = inject(WorkspaceStateService);
  const projectId = route.paramMap.get('id');
  workspaceService.loadProject(projectId?.toString());
};
