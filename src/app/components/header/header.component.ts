import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
    private stickyHeaderPxHeight = 56;
    isSticky$: Observable<boolean>;

    constructor(private evService: EventsService) {}

    ngAfterViewInit(): void {
        this.isSticky$ = this.evService.windowScroll$.pipe(
            throttleTime(10),
            map(() => window.pageYOffset >= this.stickyHeaderPxHeight)
        );
    }
}
