import { Routes } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';
import { resolveProjectFn } from './resolvers/project.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'editor/new',
  },
  {
    path: 'editor',
    pathMatch: 'full',
    redirectTo: 'editor/new',
  },
  {
    component: EditorComponent,
    path: 'editor/new',
    resolve: { project: resolveProjectFn },
  },
  {
    component: EditorComponent,
    path: 'editor/:id',
    resolve: { project: resolveProjectFn },
  },
];
