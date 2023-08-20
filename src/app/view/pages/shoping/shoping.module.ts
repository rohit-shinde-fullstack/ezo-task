import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopingRoutingModule } from './shoping-routing.module';
import { ShopingListComponent } from './shoping-list/shoping-list.component';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import { PartialModule } from '../../partial/partial.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShopingListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PartialModule,
    ShopingRoutingModule,

  ],
  providers:[]
})
export class ShopingModule { }
