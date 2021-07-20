import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { TitleModule } from '../title/title.module';
import { CommentModule } from '../comment/comment.module';

@NgModule({
    declarations: [CommentsComponent],
    imports: [CommonModule, TitleModule, CommentModule],
    exports: [CommentsComponent],
})
export class CommentsModule {}
