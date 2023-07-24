import { SecondChildModule } from './../second-child/second-child.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstChildRoutingModule } from './first-child-routing.module';
import { FirstChildComponent } from './first-child/first-child.component';


@NgModule({
  declarations: [
    FirstChildComponent
  ],
  exports: [FirstChildComponent],
  imports: [
    CommonModule,
    FirstChildRoutingModule,
    SecondChildModule
  ]
})
export class FirstChildModule { }
