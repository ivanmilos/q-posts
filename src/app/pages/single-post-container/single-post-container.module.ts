import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePostContainerComponent } from './single-post-container.component';
import { Routes, RouterModule } from '@angular/router';
import { PostModule } from 'src/app/components/post/post.module';
import { ButtonModule } from 'src/app/components/button/button.module';

const routes: Routes = [{ path: '', component: SinglePostContainerComponent }];

@NgModule({
    declarations: [SinglePostContainerComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PostModule,
        ButtonModule,
    ],
})
export class SinglePostContainerModule {}
