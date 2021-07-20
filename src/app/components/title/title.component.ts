import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { TitleElement } from './title.type';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit {
    @Input() elementType: TitleElement = 'h1';
    @Input() overrideStyle: TitleElement;

    cssClasses = '';

    ngOnInit(): void {
        this.cssClasses = this.overrideStyle || this.elementType;
    }
}
