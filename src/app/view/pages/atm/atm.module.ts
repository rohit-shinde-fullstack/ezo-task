import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtmRoutingModule } from './atm-routing.module';
import { AtmListComponent } from './atm-list/atm-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AtmListComponent
  ],
  imports: [
    CommonModule,
    AtmRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AtmModule { }
