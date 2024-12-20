import { createActionGroup, props } from '@ngrx/store';
import { HexColor, IElement, IProject, ISize } from '../../domain';
import { SetElementsPositionType } from './workspace.actions.types';

export const WorkspaceAsyncActions = createActionGroup({
  source: 'workspaceAsync',
  events: {
    load: props<{ id: string | undefined }>(),
    loadSuccess: props<{ project: IProject }>(),
    loadFailure: props<{ error: unknown }>(),
  },
});

export const WorkspaceProjectActions = createActionGroup({
  source: 'workspaceProject',
  events: {
    'set project name': props<{ newName: IProject['name'] }>(),
    'set background color': props<{ newColor: HexColor }>(),
  },
});

export const WorkspaceElementActions = createActionGroup({
  source: 'workspaceElements',
  events: {
    'set elements position': props<{ updates: SetElementsPositionType }>(),
    'set element size': props<{ elementId: IElement['id']; newSize: ISize }>(),
  },
});
