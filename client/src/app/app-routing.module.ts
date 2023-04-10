import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';

//Rutas de navegacion
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: CreateUserComponent },
  { path: 'admin-order', component: AdminOrderComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
