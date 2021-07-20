import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PaginationEvent } from 'src/app/components/pagination/pagination.interface';
import { Dictionary } from 'src/app/enums/dictionary.enum';
import { ICommentsByPostId } from 'src/app/interfaces/comment.interface';
import { PostDTO } from 'src/app/interfaces/post.interface';
import { IUsersById, UserDTO } from 'src/app/interfaces/user.interface';
import { StoreService } from 'src/app/services/store.service';
import { stringfyObjectValues } from 'src/app/utils/stringify-object-values.util';

interface IPageData {
    posts: PostDTO[];
    comments: ICommentsByPostId;
    users: IUsersById;
}

@Component({
    selector: 'app-posts-container',
    templateUrl: './posts-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsContainerComponent implements OnInit {
    pageData$: Observable<IPageData>;
    paginatedPosts$: Observable<PostDTO[]>;
    currentPage$ = this.store.currentPage$;
    readonly pageSize = 6;
    readonly dictionary = Dictionary;

    filterControl = new FormControl('');

    constructor(private store: StoreService) {}

    ngOnInit(): void {
        this.pageData$ = combineLatest([
            this.store.posts$,
            this.store.comments$,
            this.store.users$,
            this.store.filterString$,
        ]).pipe(
            map(([posts, comments, users, filterString]) => {
                const filteredUserIds = this.filterUsers(
                    filterString,
                    Object.values(users)
                );
                const filteredPosts = posts.filter(post =>
                    filteredUserIds.includes(post.userId)
                );

                this.filterControl.patchValue(filterString);

                return { posts: filteredPosts, comments, users };
            }),
            shareReplay()
        );

        this.paginatedPosts$ = combineLatest([
            this.pageData$,
            this.currentPage$,
        ]).pipe(
            map(([pageData, currentPage]) => {
                const startIndex = (currentPage - 1) * this.pageSize;
                const endIndex = startIndex + this.pageSize;

                return pageData.posts.slice(startIndex, endIndex);
            })
        );
    }

    onPaginationClick(event: PaginationEvent): void {
        this.store.updateCurrentPage(event.pageIndex);
        window.scroll(0, 0);
    }

    onFilterFormSubmit(event: string): void {
        const filterString = event.toLowerCase();
        this.store.updateFilterString(filterString);
    }

    onResetClick(): void {
        this.store.updateFilterString('');
    }

    private filterUsers(filterString: string, users: UserDTO[]): number[] {
        const filterStringsArray = filterString.split(' ');
        const filteredUserIds: number[] = [];
        users.forEach(user => {
            const userData = stringfyObjectValues(user);

            if (
                filterStringsArray.every(filterSegment =>
                    userData.includes(filterSegment)
                )
            ) {
                filteredUserIds.push(user.id);
            }
        });
        return filteredUserIds;
    }
}
