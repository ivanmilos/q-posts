import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { TitleModule } from '../title/title.module';
import { ButtonModule } from '../button/button.module';
import { CommentsModule } from '../comments/comments.module';

@NgModule({
    declarations: [PostComponent],
    imports: [CommonModule, TitleModule, ButtonModule, CommentsModule],
    exports: [PostComponent],
})
export class PostModule {}
