import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondChildRoutingModule } from './second-child-routing.module';
import { SecondChildComponent } from './second-child/second-child.component';
import { ThirdChildModule } from '../third-child/third-child.module';


@NgModule({
  declarations: [
    SecondChildComponent
  ],
  imports: [
    CommonModule,
    SecondChildRoutingModule,
    ThirdChildModule
  ]
})
export class SecondChildModule { }
