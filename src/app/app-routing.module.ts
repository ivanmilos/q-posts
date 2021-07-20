import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavRoutes } from './app-routing.constants';

const routes: Routes = [
    {
        path: NavRoutes.HOME,
        redirectTo: NavRoutes.POSTS,
        pathMatch: 'full',
    },
    {
        path: NavRoutes.POSTS,
        loadChildren: () =>
            import('./pages/posts-container/posts-container.module').then(
                m => m.PostsContainerModule
            ),
    },
    {
        path: NavRoutes.SINGLE_POST + '/:id',
        loadChildren: () =>
            import(
                './pages/single-post-container/single-post-container.module'
            ).then(m => m.SinglePostContainerModule),
    },
    { path: '**', redirectTo: NavRoutes.POSTS, pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            useHash: true,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
