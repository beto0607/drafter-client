import { createActionGroup, props } from '@ngrx/store';
import { HexColor, IAsset, IElement, IProject, ISize } from '../../domain';
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
    'delete element': props<{ elementId: IElement['id'] }>(),
    'duplicate element': props<{ elementId: IElement['id'] }>(),
  },
});

export const WorkspaceElementActions = createActionGroup({
  source: 'workspaceElements',
  events: {
    'set elements position': props<{ updates: SetElementsPositionType }>(),
    'set element size': props<{ elementId: IElement['id']; newSize: ISize }>(),
    'set element caption': props<{
      elementId: IElement['id'];
      newCaption: IElement['caption'];
    }>(),
    'set element title': props<{
      elementId: IElement['id'];
      newTitle: IElement['title'];
    }>(),
  },
});
export const WorkspaceAssetActions = createActionGroup({
  source: 'workspaceAssets',
  events: {
    'delete asset': props<{
      elementId: IElement['id'];
      assetId: IAsset['id'];
    }>(),
    'duplicate asset': props<{
      elementId: IElement['id'];
      assetId: IAsset['id'];
    }>(),
  },
});
