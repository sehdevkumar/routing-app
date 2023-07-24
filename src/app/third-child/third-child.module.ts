import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThirdChildRoutingModule } from './third-child-routing.module';
import { ThirdChildComponent } from './third-child/third-child.component';


@NgModule({
  declarations: [
    ThirdChildComponent
  ],
  imports: [
    CommonModule,
    ThirdChildRoutingModule
  ]
})
export class ThirdChildModule { }
