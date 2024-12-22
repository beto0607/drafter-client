import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWorkspaceState, WORKSPACE_FEATURE_KEY } from './workspace.reducer';

const selectState = createFeatureSelector<IWorkspaceState>(
  WORKSPACE_FEATURE_KEY,
);

export const selectLoaded = createSelector(selectState, ({ loaded }) => loaded);

export const selectError = createSelector(selectState, ({ error }) => error);

export const selectProject = createSelector(
  selectState,
  ({ project }) => project,
);

export const selectBackgroundColor = createSelector(
  selectProject,
  (project) => project?.backgroundColor ?? '#ffffff',
);

export const selectProjectName = createSelector(
  selectProject,
  (project) => project?.name ?? '',
);

export const selectElements = createSelector(
  selectProject,
  (project) => project?.elements,
);
