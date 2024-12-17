import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { WorkspaceAsyncActions } from "./workspace.actions";
import { selectError, selectLoaded, selectProject } from "./workspace.selectors";

@Injectable({ providedIn: 'root' })
export class WorkspaceStateService {
  private store = inject(Store)

  loaded = this.store.selectSignal(selectLoaded)
  error = this.store.selectSignal(selectError)

  project = this.store.selectSignal(selectProject)

  loadProject(id: string | undefined): void {
    this.store.dispatch(WorkspaceAsyncActions.load({ id }))
  }
}
