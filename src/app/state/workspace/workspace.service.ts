import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAsset, IElement, IProject, ITag } from '../../domain';
import {
  WorkspaceAssetActions,
  WorkspaceAsyncActions,
  WorkspaceElementActions,
  WorkspaceProjectActions,
  WorkspaceTagsActions,
} from './workspace.actions';
import { SetElementsPositionType } from './workspace.actions.types';
import {
  selectBackgroundColor,
  selectCurrentChecksum,
  selectElements,
  selectError,
  selectLoaded,
  selectOriginalChecksum,
  selectProject,
  selectProjectName,
} from './workspace.selectors';

@Injectable({ providedIn: 'root' })
export class WorkspaceStateService {
  private store = inject(Store);

  loaded = this.store.selectSignal(selectLoaded);
  error = this.store.selectSignal(selectError);

  originalChecksum = this.store.selectSignal(selectOriginalChecksum);
  currentChecksum = this.store.selectSignal(selectCurrentChecksum);

  project = this.store.selectSignal(selectProject);
  elements = this.store.selectSignal(selectElements);

  backgroundColor = this.store.selectSignal(selectBackgroundColor);
  projectName = this.store.selectSignal(selectProjectName);

  loadProject(id: IProject['id'] | undefined): void {
    this.store.dispatch(WorkspaceAsyncActions.load({ id }));
  }

  saveProject(): void {
    this.store.dispatch(WorkspaceAsyncActions.save());
  }

  setBackgroundColor(newColor: IProject['backgroundColor']): void {
    this.store.dispatch(
      WorkspaceProjectActions.setBackgroundColor({ newColor }),
    );
  }

  setProjectName(newName: IProject['name']): void {
    this.store.dispatch(WorkspaceProjectActions.setProjectName({ newName }));
  }

  deleteElement(elementId: IElement['id']): void {
    this.store.dispatch(WorkspaceProjectActions.deleteElement({ elementId }));
  }

  duplicateElement(elementId: IElement['id']): void {
    this.store.dispatch(
      WorkspaceProjectActions.duplicateElement({ elementId }),
    );
  }

  updateElementsPosition(updates: SetElementsPositionType): void {
    this.store.dispatch(
      WorkspaceElementActions.setElementsPosition({ updates }),
    );
  }

  updateElementSize(
    elementId: IElement['id'],
    newSize: IElement['size'],
  ): void {
    this.store.dispatch(
      WorkspaceElementActions.setElementSize({ elementId, newSize }),
    );
  }

  updateElementCaption(
    elementId: IElement['id'],
    newCaption: IElement['caption'],
  ): void {
    this.store.dispatch(
      WorkspaceElementActions.setElementCaption({ elementId, newCaption }),
    );
  }

  updateElementTitle(
    elementId: IElement['id'],
    newTitle: IElement['title'],
  ): void {
    this.store.dispatch(
      WorkspaceElementActions.setElementTitle({ elementId, newTitle }),
    );
  }

  deleteAssetFromElement(
    elementId: IElement['id'],
    assetId: IAsset['id'],
  ): void {
    this.store.dispatch(
      WorkspaceAssetActions.deleteAsset({ elementId, assetId }),
    );
  }

  duplicateAssetInElement(
    elementId: IElement['id'],
    assetId: IAsset['id'],
  ): void {
    this.store.dispatch(
      WorkspaceAssetActions.duplicateAsset({ elementId, assetId }),
    );
  }

  addTagFromElement(elementId: IElement['id'], tag: ITag): void {
    this.store.dispatch(WorkspaceTagsActions.addTag({ elementId, tag }));
  }

  deleteTagFromElement(elementId: IElement['id'], tag: ITag): void {
    this.store.dispatch(WorkspaceTagsActions.deleteTag({ elementId, tag }));
  }
}
