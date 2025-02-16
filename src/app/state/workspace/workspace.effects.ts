import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { getChecksum } from '../../utils';
import {
  WorkspaceAsyncActions,
  WorkspaceProjectActions,
} from './workspace.actions';
import { WorkspaceDataService } from './workspace.data.service';
import { mockedProject } from './workspace.mock';
import { WorkspaceStateService } from './workspace.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceEffectsService {
  private actions$ = inject(Actions);
  private workspaceStateService = inject(WorkspaceStateService);
  private workspaceDataService = inject(WorkspaceDataService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  loadProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkspaceAsyncActions.load),
      switchMap(({ id }) => {
        if (!id) {
          return of(
            WorkspaceAsyncActions.loadSuccess({ project: mockedProject }),
          );
        }
        return this.workspaceDataService.getProject(id).pipe(
          map((project) => WorkspaceAsyncActions.loadSuccess({ project })),
          catchError((error) =>
            of(WorkspaceAsyncActions.loadFailure({ error })),
          ),
        );
      }),
    );
  });

  saveProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkspaceAsyncActions.save),
      switchMap(() => {
        const project = this.workspaceStateService.project();
        if (!project) {
          return of(
            WorkspaceAsyncActions.saveFailure({
              error: new Error('No project in state'),
            }),
          );
        }

        if (project.id) {
          return this.workspaceDataService
            .saveProject(project.id, project)
            .pipe(
              map((project) => WorkspaceAsyncActions.saveSuccess({ project })),
              catchError((error) =>
                of(WorkspaceAsyncActions.saveFailure({ error })),
              ),
            );
        }
        return this.workspaceDataService.createProject(project).pipe(
          map((project) => WorkspaceAsyncActions.saveSuccess({ project })),
          catchError((error) =>
            of(WorkspaceAsyncActions.saveFailure({ error })),
          ),
        );
      }),
    );
  });

  setChecksum$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        WorkspaceAsyncActions.loadSuccess,
        WorkspaceAsyncActions.saveSuccess,
      ),
      switchMap(({ project }) => {
        const newChecksum = getChecksum(project);
        return of(WorkspaceProjectActions.setChecksum({ newChecksum }));
      }),
    );
  });

  updateUrl$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WorkspaceAsyncActions.saveSuccess),
        tap(({ project }) => {
          const currentRouteId =
            this.activatedRoute.firstChild?.snapshot.paramMap.get('id');
          if (!currentRouteId) {
            this.router.navigate(['editor', project.id], {});
          }
        }),
      );
    },
    { dispatch: false },
  );
}
