import { createReducer, on } from '@ngrx/store';
import { WorkspaceAsyncActions } from './workspace.actions';
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
    WorkspaceAsyncActions.loadSuccess, (state) => {
      return {
        ...state,
        loaded: true,
        error: undefined
      }
    }
  ),
  on(
    WorkspaceAsyncActions.loadFailure, (state, { error }) => {
      return {
        ...state,
        loaded: true,
        error
      }
    }
  ),
);
