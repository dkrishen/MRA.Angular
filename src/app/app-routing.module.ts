import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,// canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
