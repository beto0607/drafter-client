import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { WorkspaceAsyncActions } from "./workspace.actions";

@Injectable({ providedIn: 'root' })
export class WorkspaceStateService {
  private store = inject(Store)

  loadProject(id: string | undefined): void {
    this.store.dispatch(WorkspaceAsyncActions.load({ id }))
  }

}
