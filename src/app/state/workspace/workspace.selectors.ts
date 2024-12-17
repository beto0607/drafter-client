import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IWorkspaceState, WORKSPACE_FEATURE_KEY } from "./workspace.reducer";

const selectState = createFeatureSelector<IWorkspaceState>(WORKSPACE_FEATURE_KEY,)

export const selectLoaded = createSelector(
  selectState,
  ({ loaded }) => loaded
)

export const selectError = createSelector(
  selectState,
  ({ error }) => error
)

export const selectProject = createSelector(
  selectState,
  ({ project }) => project
);
