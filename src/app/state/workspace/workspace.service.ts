import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HexColor, ISize } from '../../domain';
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

  loadProject(id: string | undefined): void {
    this.store.dispatch(WorkspaceAsyncActions.load({ id }));
  }

  setBackgroundColor(newColor: HexColor): void {
    this.store.dispatch(
      WorkspaceProjectActions.setBackgroundColor({ newColor }),
    );
  }

  setProjectName(newName: string): void {
    this.store.dispatch(WorkspaceProjectActions.setProjectName({ newName }));
  }

  updateElementsPosition(updates: SetElementsPositionType): void {
    this.store.dispatch(
      WorkspaceElementActions.setElementsPosition({ updates }),
    );
  }

  updateElementSize(elementId: string, newSize: ISize): void {
    this.store.dispatch(
      WorkspaceElementActions.setElementSize({ elementId, newSize }),
    );
  }
}
