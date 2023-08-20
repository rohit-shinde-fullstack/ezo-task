import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:() => import('../app/view/pages/home/home.module').then(m => m.HomeModule)},
  {path:'shopping-list',loadChildren:() => import('../app/view/pages/shoping/shoping.module').then(m => m.ShopingModule)},
  {path:'atm',loadChildren:() => import('../app/view/pages/atm/atm.module').then(m => m.AtmModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
