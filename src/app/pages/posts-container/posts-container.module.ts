import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './posts-container.component';
import { RouterModule, Routes } from '@angular/router';
import { PostModule } from 'src/app/components/post/post.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { SingleFieldFormModule } from 'src/app/forms/single-field-form/single-field-form.module';
import { ButtonModule } from 'src/app/components/button/button.module';

const routes: Routes = [{ path: '', component: PostsContainerComponent }];

@NgModule({
    declarations: [PostsContainerComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TitleModule,
        ButtonModule,
        PostModule,
        SingleFieldFormModule,
        PaginationModule,
    ],
})
export class PostsContainerModule {}
