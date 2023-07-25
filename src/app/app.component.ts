import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, mergeAll, mergeMap } from 'rxjs/operators';
import { RoutePreservedService } from './services/route-preserved.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {



  constructor(private rps:RoutePreservedService) {

  }
  ngOnDestroy(): void {
    this.rps?.onRoutesPreservedSubSink?.unsubscribe()
  }

  appRoutes = ['first-child', 'first-child/second-child', 'first-child/second-child/third-child'];

  ngOnInit(): void {
    this.rps.onRemoveParams<string,string>(['flow-type','warehouse-id'],['first-child','third-child'])
    this.rps.onAppendParams('flow-type',1)
    this.rps.onAppendParams('warehouse-id','2')


    this.rps.onPageRefreshCompleted$.subscribe(res=> {
        console.log(res)
    })
  }



}
