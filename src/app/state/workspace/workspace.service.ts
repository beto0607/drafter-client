import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IElement, IProject } from '../../domain';
import {
  WorkspaceAsyncActions,
  WorkspaceElementActions,
  WorkspaceProjectActions,
} from './workspace.actions';
import { SetElementsPositionType } from './workspace.actions.types';
import {
  selectBackgroundColor,
  selectError,
  selectLoaded,
  selectProject,
  selectProjectName,
} from './workspace.selectors';

@Injectable({ providedIn: 'root' })
export class WorkspaceStateService {
  private store = inject(Store);

  loaded = this.store.selectSignal(selectLoaded);
  error = this.store.selectSignal(selectError);

  project = this.store.selectSignal(selectProject);

  backgroundColor = this.store.selectSignal(selectBackgroundColor);
  projectName = this.store.selectSignal(selectProjectName);

  loadProject(id: IProject['id'] | undefined): void {
    this.store.dispatch(WorkspaceAsyncActions.load({ id }));
  }

  setBackgroundColor(newColor: IProject['backgroundColor']): void {
    this.store.dispatch(
      WorkspaceProjectActions.setBackgroundColor({ newColor }),
    );
  }

  setProjectName(newName: IProject['name']): void {
    this.store.dispatch(WorkspaceProjectActions.setProjectName({ newName }));
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
}
