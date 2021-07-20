import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Dictionary } from 'src/app/enums/dictionary.enum';
import { IPost } from 'src/app/interfaces/post.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-single-post-container',
    templateUrl: './single-post-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostContainerComponent implements OnInit {
    data$: Observable<IPost>;
    readonly dictionary = Dictionary;

    constructor(
        private store: StoreService,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        const id$ = this.activatedRoute.paramMap.pipe(
            map(params => +params.get('id')),
            shareReplay()
        );

        this.data$ = combineLatest([
            this.store.posts$,
            this.store.comments$,
            this.store.users$,
            id$,
        ]).pipe(
            map(([posts, allComments, users, id]) => {
                const currentPost = posts.find(post => id === post.id);
                const comments = allComments[id];
                const user = users[currentPost.userId];

                return { post: currentPost, comments, user };
            })
        );
    }

    onBackClick(): void {
        this.location.back();
    }
}
