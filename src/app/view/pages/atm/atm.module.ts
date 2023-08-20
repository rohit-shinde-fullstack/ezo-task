import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtmRoutingModule } from './atm-routing.module';
import { AtmListComponent } from './atm-list/atm-list.component';
import { partition } from 'rxjs';
import { PartialModule } from '../../partial/partial.module';


@NgModule({
  declarations: [
    AtmListComponent
  ],
  imports: [
    CommonModule,
    AtmRoutingModule,
    PartialModule
  ]
})
export class AtmModule { }
