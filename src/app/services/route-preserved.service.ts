import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, last, mergeMap, take, takeLast } from 'rxjs';
import { SubSink } from 'subsink';


export type PathList<T> = Array<T>
export type InputParams<K extends string | number | symbol, V> = {
  [key in K]: V;
};


@Injectable({
  providedIn: 'root'
})
export class RoutePreservedService {

  public onRoutesPreservedSubSink:SubSink = new SubSink()
  public onPageRefreshCompleted$:Subject<any> = new Subject<any>()

  changeParamsSubject$:Subject<InputParams<string,string>> = new Subject<InputParams<string,string>>();
  changeParams:any

  localPathList:PathList<string> = []
  paramskeys:string[] = []

  storeParams:InputParams<string,string>[] = []

  currentPath = ''

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.onSubscribeParams()
    this.onNavigationEnd()
    this.onChangeParamsSubscription()
  }


/**
   Wait Till the New Params Fires and then Update the Params
 *
 */
  private onChangeParamsSubscription() {
    let queryParams:any = {}
    const changeParams$ =    this.changeParamsSubject$
      .pipe(
        mergeMap((event:InputParams<string,string>) => {
          // Get the current query parameters
          queryParams[event['key']] = event['value'];
          this.paramskeys.forEach(p=> {
             if(this.localPathList.includes(this.currentPath)){
               queryParams[p] = null
             }
          })
          // Update the query parameters without changing the URL
          return this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // Use 'merge' to keep existing params
          });
        })
      )
      .subscribe(
         this.changeParams  = queryParams
        );

    this.onRoutesPreservedSubSink.add(changeParams$);
  }


  // On Page Refersh Get The Params
 private onSubscribeParams() {
   const queryParams$ =  this.activatedRoute.queryParamMap.pipe(filter(res=> (res as any)['keys']?.length> 0)).subscribe((res) => {
       this.onPageRefreshCompleted$.next(res)
    });

    this.onRoutesPreservedSubSink.add(queryParams$)
  }


  /**
   * On Navigation End Check the Path to Avoid and Replace the Params Based on the User Provied Constants Or Enums
   */
 private onNavigationEnd() {
   const navigationEndEvent$ = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {

      const navigationPath = event as NavigationEnd
      const spiltPath = navigationPath?.url?.split('?')[0].split('/')
      const finalPath = spiltPath[spiltPath?.length-1]

      this.currentPath = finalPath


      this.storeParams.filter(p=> !(this.localPathList?.includes(this.currentPath) && this.paramskeys?.includes(p['key']))).forEach(parms=> {
        this.changeParamsSubject$.next(parms)
      })

    });

    this.onRoutesPreservedSubSink.add(navigationEndEvent$);
  }


  /**
   * Append a new parameter to the query parameters and notify changeParamsSubject$.
   * @param paramKey The key of the new parameter.
   * @param paramsValue The value of the new parameter.
   */
  onAppendParams<K extends string | number | symbol, V>(paramKey: K, paramsValue: V) {
     let paramsPair: InputParams<any, any> = {}
     paramsPair['key'] = paramKey;
     paramsPair['value'] = paramsValue
     this.storeParams.push(paramsPair);
  }


  /**
   * On Remove the Params
   * @param paramsKey
   */
  onRemoveParams<K,L>(paramsKeys:K[], pathList:PathList<L>) {
     this.localPathList = pathList as []
     this.paramskeys = paramsKeys as []

  }



}
