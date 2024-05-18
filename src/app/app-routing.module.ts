import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './views/components/user/users-list/users-list.component';
import { UserDetailsComponent } from './views/components/user/user-details/user-details.component';
import { HomeComponent } from './views/pages/home/home.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'userDetails/:id', component: UserDetailsComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
