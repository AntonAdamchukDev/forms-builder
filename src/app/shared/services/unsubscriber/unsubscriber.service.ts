import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsubscriberService implements OnDestroy {
  public destroyer$ = new Subject();

  ngOnDestroy(): void {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }
}
