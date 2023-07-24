import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'first-child',
    loadChildren: () => import('./first-child/first-child.module').then(m => m.FirstChildModule),
  },
  {
    path:'',redirectTo:'first-child',pathMatch:'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
