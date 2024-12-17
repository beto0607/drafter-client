import { createActionGroup, props } from "@ngrx/store";
import { HexColor, IProject } from "../../domain";

export const WorkspaceAsyncActions = createActionGroup({
  source: 'workspaceAsync',
  events: {
    'load': props<{ id: string | undefined }>(),
    'loadSuccess': props<{ project: IProject }>(),
    'loadFailure': props<{ error: unknown }>(),
  }
})

export const WorkspaceProjectActions = createActionGroup(({
  source: 'workspaceProject',
  events: {
    'set project name': props<{ newName: string }>(),
    'set background color': props<{ newColor: HexColor }>()
  }
}))
