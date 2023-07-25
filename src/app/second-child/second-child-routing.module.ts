import { SecondChildComponent } from './second-child/second-child.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SecondChildComponent,
    children: [
      {
        path: 'second-child',
        loadChildren: () => import('../third-child/third-child.module').then(m => m.ThirdChildModule),
      },
    ],
  },
  {
    path:'',pathMatch:'full',redirectTo:'first-child/second-child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondChildRoutingModule { }
