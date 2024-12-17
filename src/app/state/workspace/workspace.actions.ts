import { createActionGroup, props } from "@ngrx/store";
import { IProject } from "../../domain";

export const WorkspaceAsyncActions = createActionGroup({
  source: 'workspaceAsync',
  events: {
    'load': props<{ id: string | undefined }>(),
    'loadSuccess': props<{ project: IProject }>(),
    'loadFailure': props<{ error: unknown }>(),
  }
})
