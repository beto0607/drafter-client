import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { WorkspaceEffectsService } from "./workspace.effects";
import { reducer, WORKSPACE_FEATURE_KEY } from "./workspace.reducer";

export function provideWorkspaceState(): EnvironmentProviders {
  return importProvidersFrom([
    StoreModule.forFeature(WORKSPACE_FEATURE_KEY, reducer),
    EffectsModule.forFeature(WorkspaceEffectsService),
  ])
}
