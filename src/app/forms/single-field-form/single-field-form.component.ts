import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-single-field-form',
    templateUrl: './single-field-form.component.html',
    styleUrls: ['./single-field-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFieldFormComponent implements OnInit {
    @Input() placeholder: string;
    @Input() buttonLabel: string;

    @Input() inputControl: FormControl;
    @Output() formSubmit = new EventEmitter<string>();
    theForm: FormGroup;
    private lastSubmittedValue: string;

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.theForm = new FormGroup({ inputControl: this.inputControl });
        this.lastSubmittedValue = this.inputControl.value;
    }

    onSubmit(): void {
        if (!this.isSubmitDisabled(this.inputControl.value)) {
            this.lastSubmittedValue = this.inputControl.value;
            this.formSubmit.emit(this.inputControl.value);
        }
    }

    private isSubmitDisabled(value: string): boolean {
        return (
            this.theForm.invalid ||
            this.theForm.disabled ||
            this.lastSubmittedValue === value
        );
    }
}
