import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopingListComponent } from './shoping-list/shoping-list.component';

const ROUTES: Routes = [
  {path:'',component:ShopingListComponent},
  {
    path:'',
    redirectTo:'/shopping-list',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ShopingRoutingModule { }
