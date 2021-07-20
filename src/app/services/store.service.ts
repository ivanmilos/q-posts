import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommentDTO, ICommentsByPostId } from '../interfaces/comment.interface';
import { PostDTO } from '../interfaces/post.interface';
import { IUsersById, UserDTO } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    posts$ = this.getAllPosts();
    comments$ = this.getAllComments();
    users$ = this.getAllUsers();

    private currentPageSubject$ = new BehaviorSubject(1);
    currentPage$ = this.currentPageSubject$.asObservable();

    private filterStringSubject$ = new BehaviorSubject('');
    filterString$ = this.filterStringSubject$.asObservable();

    constructor(private http: HttpClient) {}

    updateCurrentPage(pageIndex: number): void {
        this.currentPageSubject$.next(pageIndex);
    }

    updateFilterString(filterString: string): void {
        this.updateCurrentPage(1);
        this.filterStringSubject$.next(filterString);
    }

    private getAllPosts(): Observable<PostDTO[]> {
        return this.http.get<PostDTO[]>('posts').pipe(shareReplay());
    }

    private getAllComments(): Observable<ICommentsByPostId> {
        return this.http.get<CommentDTO[]>('comments').pipe(
            map(comments => {
                const groupedByPosts = {};
                comments.forEach(comment => {
                    if (!groupedByPosts[comment.postId]) {
                        groupedByPosts[comment.postId] = [];
                    }
                    groupedByPosts[comment.postId].push(comment);
                });
                return groupedByPosts;
            }),
            shareReplay()
        );
    }

    private getAllUsers(): Observable<IUsersById> {
        return this.http.get<UserDTO[]>('users').pipe(
            map(users => {
                const usersById = {};
                users.forEach(user => (usersById[user.id] = user));
                return usersById;
            }),
            shareReplay()
        );
    }
}
