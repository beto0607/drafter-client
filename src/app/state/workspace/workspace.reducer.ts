import { createReducer, on } from '@ngrx/store';
import { IElement, IProject } from '../../domain';
import {
  WorkspaceAssetActions,
  WorkspaceAsyncActions,
  WorkspaceElementActions,
  WorkspaceProjectActions,
} from './workspace.actions';
import {
  duplicateAsset,
  duplicateElement,
  removeAsset,
  updateElement,
} from './workspace.reducer.utils';

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
    if (!state.project) {
      return state;
    }
    return {
      ...state,
      project: {
        ...state.project,
        backgroundColor: newColor,
      },
    };
  }),

  on(WorkspaceProjectActions.setProjectName, (state, { newName }) => {
    if (!state.project) {
      return state;
    }
    return {
      ...state,
      project: {
        ...state.project,
        name: newName,
      },
    };
  }),

  on(WorkspaceProjectActions.deleteElement, (state, { elementId }) => {
    if (!state.project) {
      return state;
    }
    return {
      ...state,
      project: {
        ...state.project,
        elements: state.project.elements.filter(({ id }) => id !== elementId),
      },
    };
  }),

  on(WorkspaceProjectActions.duplicateElement, (state, { elementId }) => {
    if (!state.project) {
      return state;
    }
    const element = state.project.elements.find(({ id }) => elementId === id);
    if (!element) {
      return state;
    }
    const duplicatedElement = duplicateElement(element);
    return {
      ...state,
      project: {
        ...state.project,
        elements: [...state.project.elements, duplicatedElement],
      },
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

      const updatedElements = updateElement(
        state.project.elements,
        elementId,
        'size',
        newSize,
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

  on(
    WorkspaceElementActions.setElementCaption,
    (state, { elementId, newCaption }) => {
      if (!state.project) {
        return state;
      }

      const updatedElements = updateElement(
        state.project.elements,
        elementId,
        'caption',
        newCaption,
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

  on(
    WorkspaceElementActions.setElementTitle,
    (state, { elementId, newTitle }) => {
      if (!state.project) {
        return state;
      }

      const updatedElements = updateElement(
        state.project.elements,
        elementId,
        'title',
        newTitle,
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

  on(WorkspaceAssetActions.deleteAsset, (state, { elementId, assetId }) => {
    if (!state.project) {
      return state;
    }
    const updatedElements = removeAsset(
      state.project.elements,
      elementId,
      assetId,
    );
    return {
      ...state,
      project: {
        ...state.project,
        elements: updatedElements,
      },
    };
  }),
  on(WorkspaceAssetActions.duplicateAsset, (state, { elementId, assetId }) => {
    if (!state.project) {
      return state;
    }
    const updatedElements = state.project.elements.map((element) =>
      element.id !== elementId ? element : duplicateAsset(element, assetId),
    );
    return {
      ...state,
      project: {
        ...state.project,
        elements: updatedElements,
      },
    };
  }),
);
