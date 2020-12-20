import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from 'src/components/add/add.component';
import { ListComponent } from 'src/components/list/list.component';

const routes: Routes = [{
  path: '',
  component: ListComponent
}, {
  path: 'add',
  component: AddComponent
},
{
  path: '**',
  component: ListComponent
},
{
  path: '*',
  component: ListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
