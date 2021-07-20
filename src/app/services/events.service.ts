import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    windowScroll$: Observable<Event>;
    windowResize$: Observable<Event>;
    documentClick$: Observable<Event>;
    escKey$: Observable<Event>;

    constructor(@Inject(PLATFORM_ID) private platformID: object) {
        if (isPlatformBrowser(this.platformID)) {
            this.windowScroll$ = fromEvent(window, 'scroll');

            this.windowResize$ = fromEvent(window, 'resize').pipe(
                debounceTime(200),
                distinctUntilChanged()
            );

            this.documentClick$ = fromEvent(document, 'click');

            this.escKey$ = fromEvent(window, 'keydown').pipe(
                filter(
                    (ev: KeyboardEvent) =>
                        ev.key === 'Escape' || ev.keyCode === 27
                )
            );
        }
    }
}
