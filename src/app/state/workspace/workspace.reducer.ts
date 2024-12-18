import { createReducer, on } from '@ngrx/store';
import { IElement, IProject } from '../../domain';
import {
  WorkspaceAsyncActions,
  WorkspaceElementActions,
  WorkspaceProjectActions,
} from './workspace.actions';

export interface IWorkspaceState {
  loaded: boolean;
  error: unknown | undefined;
  project: IProject | undefined;
}

const initialState: IWorkspaceState = {
  error: undefined,
  loaded: false,
  project: undefined,
};
export const WORKSPACE_FEATURE_KEY = 'workspace';

export const reducer = createReducer<IWorkspaceState>(
  initialState,
  on(WorkspaceAsyncActions.load, (state) => {
    return {
      ...state,
      loaded: false,
      error: undefined,
    };
  }),
  on(WorkspaceAsyncActions.loadSuccess, (state, { project }) => {
    return {
      ...state,
      loaded: true,
      error: undefined,
      project,
    };
  }),
  on(WorkspaceAsyncActions.loadFailure, (state, { error }) => {
    return {
      ...state,
      loaded: true,
      error,
      project: undefined,
    };
  }),

  on(WorkspaceProjectActions.setBackgroundColor, (state, { newColor }) => {
    return {
      ...state,
      project: state.project
        ? {
            ...state.project,
            backgroundColor: newColor,
          }
        : undefined,
    };
  }),
  on(WorkspaceProjectActions.setProjectName, (state, { newName }) => {
    return {
      ...state,
      project: state.project
        ? {
            ...state.project,
            name: newName,
          }
        : undefined,
    };
  }),
  on(WorkspaceElementActions.setElementsPosition, (state, { updates }) => {
    if (!state.project) {
      return state;
    }
    const updatedElements: IElement[] = state.project.elements.map(
      (element) => {
        const updateData = updates.find(
          (update) => update.elementId === element.id,
        );
        return updateData
          ? { ...element, position: updateData.newPosition }
          : element;
      },
    );
    return {
      ...state,
      project: {
        ...state.project,
        elements: updatedElements,
      },
    };
  }),
  on(
    WorkspaceElementActions.setElementSize,
    (state, { elementId, newSize }) => {
      if (!state.project) {
        return state;
      }
      const updatedElements: IElement[] = state.project.elements.map(
        (element) => {
          const updateData = element.id === elementId;
          return updateData ? { ...element, size: newSize } : element;
        },
      );
      return {
        ...state,
        project: {
          ...state.project,
          elements: updatedElements,
        },
      };
    },
  ),
);
