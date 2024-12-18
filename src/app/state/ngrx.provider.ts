import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideWorkspaceState } from './workspace';

export function provideNgRx(): EnvironmentProviders[] {
  return [
    importProvidersFrom([StoreModule.forRoot(), EffectsModule.forRoot()]),
    provideWorkspaceState(),
  ];
}
