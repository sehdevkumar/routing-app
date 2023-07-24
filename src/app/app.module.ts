import { FirstChildModule } from './first-child/first-child.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecondChildModule } from './second-child/second-child.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirstChildModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
