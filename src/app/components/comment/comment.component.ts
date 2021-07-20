import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentDTO } from 'src/app/interfaces/comment.interface';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
    @Input() comment: CommentDTO;
}
