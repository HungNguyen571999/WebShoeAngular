import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './components/posts/post/post.component';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { HomeComponent } from './components/pages/home/home.component';


const routes: Routes = [
  {
    path: '', component: ContainerAppComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./components/pages/home/home.module').then(m =>
            m.HomeModule)
      },
      { path: 'post/:id', component: PostComponent },
      {
        path: 'posts',
        loadChildren: () =>
          import('./components/posts/list-posts/list-posts.module').then(m =>
            m.ListPostsModule)
      },
      { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
      { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
      { path: 'registered', loadChildren: () => import('./components/auth/registered/registered.module').then(m => m.RegisteredModule) },
      { path: 'pagelogin', loadChildren: () => import('./components/auth/pagelogin/pagelogin.module').then(m => m.PageloginModule) },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }

    ],

  },

  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'profile', loadChildren: () => import('./components/admin/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'pagelogin', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
