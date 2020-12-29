import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './components/Posts/add/add.component';
import { DetailsComponent } from './components/Posts/details/details.component';
import { PostComponent } from './components/Posts/post/post.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  { path: 'add', component: AddComponent,canActivate:[AuthGuard]},
  { path: 'details/:id', component: DetailsComponent},
  { path: 'login', component: LoginComponent},
  { path:'', component:PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
