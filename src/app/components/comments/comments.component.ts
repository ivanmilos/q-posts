import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dictionary } from 'src/app/enums/dictionary.enum';
import { CommentDTO } from 'src/app/interfaces/comment.interface';
import { TitleElement } from '../title/title.type';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
    @Input() comments: CommentDTO[];
    @Input() titleElementType: TitleElement = 'h3';
    readonly dictionary = Dictionary;
}
