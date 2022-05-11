import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseComponent } from './license/license.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'license', component: LicenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
