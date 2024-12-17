import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { IProject } from "../../domain";
import { WorkspaceAsyncActions } from "./workspace.actions";
import { WorkspaceDataService } from "./workspace.data.service";

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
          const newProject: IProject = {
            id: '',
            elements: [],
            backgroundColor: "#fff",
            createdAt: new Date().toISOString(),
            deletedAt: undefined,
            modifiedAt: undefined
          }
          return of(WorkspaceAsyncActions.loadSuccess({ project: newProject }))
        }
        return this.workspaceDataService.getProject(id).pipe(
          map((project) => WorkspaceAsyncActions.loadSuccess({ project })),
          catchError((error) => of(WorkspaceAsyncActions.loadFailure({ error })))
        )
      })
    )
  })
}
