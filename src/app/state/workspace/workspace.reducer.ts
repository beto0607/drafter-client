import { createReducer, on } from '@ngrx/store';
import { WorkspaceAsyncActions, WorkspaceProjectActions } from './workspace.actions';
import { IProject } from '../../domain';

export interface IWorkspaceState {
  loaded: boolean;
  error: unknown | undefined;
  project: IProject | undefined;
  elements: any[];
}

const initialState: IWorkspaceState = {
  error: undefined,
  loaded: false,
  project: undefined,
  elements: [],
}
export const WORKSPACE_FEATURE_KEY = "workspace"

export const reducer = createReducer<IWorkspaceState>(
  initialState,
  on(
    WorkspaceAsyncActions.load, (state) => {
      return {
        ...state,
        loaded: false,
        error: undefined
      }
    }
  ),
  on(
    WorkspaceAsyncActions.loadSuccess, (state, { project }) => {
      return {
        ...state,
        loaded: true,
        error: undefined,
        project
      }
    }
  ),
  on(
    WorkspaceAsyncActions.loadFailure, (state, { error }) => {
      return {
        ...state,
        loaded: true,
        error,
        project: undefined
      }
    }
  ),

  on(WorkspaceProjectActions.setBackgroundColor, (state, { newColor }) => {
    return {
      ...state,
      project: state.project ? {
        ...state.project,
        backgroundColor: newColor
      } : undefined
    }
  }),
  on(WorkspaceProjectActions.setProjectName, (state, { newName }) => {
    return {
      ...state,
      project: state.project ? {
        ...state.project,
        name: newName
      } : undefined
    }
  })
);
