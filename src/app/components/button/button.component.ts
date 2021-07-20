import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
    @Input() styleType: 'outline' | 'full-color' = 'full-color';
    @Input() color: 'primary' | 'danger' | 'primary-dark' = 'primary';
    @Input() size: 'large' | 'regular' = 'regular';

    @Input() route: string;
    @Input() queryParams: object | null = null;
    @Input() type: 'submit' | 'button' = 'button';
    @Input() isDisabled = false;
    @Input() isLoading = false;
    @Input() title: string;

    cssClasses: string;

    ngOnInit(): void {
        this.cssClasses = `btn-${this.styleType} btn-${this.color} btn-${this.size}`;
    }
}
