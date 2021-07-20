import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Dictionary } from 'src/app/enums/dictionary.enum';

@Injectable({
    providedIn: 'root',
})
export class ErrorsService {
    constructor(private messageService: MessageService) {}

    handleError(error): void {
        const message = `${Dictionary.ERR_GENERAL}\nError ${error.status}: ${error.error.message}`;
        this.messageService.display(message, 'error');
    }
}
