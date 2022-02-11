import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsubscriberService implements OnDestroy {
  public notifier = new Subject();
  constructor() {}
  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
