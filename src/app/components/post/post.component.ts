import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavRoutes } from 'src/app/app-routing.constants';
import { Dictionary } from 'src/app/enums/dictionary.enum';
import { CommentDTO } from 'src/app/interfaces/comment.interface';
import { PostDTO } from 'src/app/interfaces/post.interface';
import { UserDTO } from 'src/app/interfaces/user.interface';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
    @Input() post: PostDTO;
    @Input() user: UserDTO;
    @Input() comments: CommentDTO[];
    @Input() isSingle = false;
    areCommentsVisible = false;
    readonly navRoutes = NavRoutes;
    readonly dictionary = Dictionary;

    toggleComments(): void {
        this.areCommentsVisible = !this.areCommentsVisible;
    }
}
