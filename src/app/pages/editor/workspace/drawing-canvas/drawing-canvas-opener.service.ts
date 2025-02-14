import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawingCanvasOpenerService {
  private _openDialog$ = new Subject<void>();
  openDialog$ = this._openDialog$.asObservable();

  openDialog(): void {
    this._openDialog$.next();
  }
}
