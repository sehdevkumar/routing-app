import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstChildComponent } from './first-child/first-child.component';

const routes: Routes = [
  {
    path: '',
    component: FirstChildComponent,
    children: [
      {
        path: 'first-child/second-child',
        loadChildren: () => import('../second-child/second-child.module').then(m => m.SecondChildModule),
      },
    ],
  },
  {
    path:'', pathMatch:'full', redirectTo: 'first-child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstChildRoutingModule { }
