import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { WorkspaceAsyncActions } from "./workspace.actions";
import { WorkspaceDataService } from "./workspace.data.service";
import { mockedProject } from "./workspace.mock";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceEffectsService {
  private actions$ = inject(Actions)
  private workspaceDataService = inject(WorkspaceDataService);

  loadProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkspaceAsyncActions.load),
      switchMap(({ id }) => {
        if (!id) {
          return of(WorkspaceAsyncActions.loadSuccess({ project: mockedProject }))
        }
        return this.workspaceDataService.getProject(id).pipe(
          map((project) => WorkspaceAsyncActions.loadSuccess({ project })),
          catchError((error) => of(WorkspaceAsyncActions.loadFailure({ error })))
        )
      })
    )
  })
}
