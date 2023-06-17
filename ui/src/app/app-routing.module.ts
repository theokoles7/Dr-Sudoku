import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { LicenseComponent } from './pages/license/license.component';
import { PuzzleComponent } from './pages/puzzle/puzzle.component';
import { HelpComponent } from './pages/help/help.component';

const routes: Routes = [
  {path: 'puzzle', component: PuzzleComponent},
  {path: 'license', component: LicenseComponent},
  {path: 'help', component: HelpComponent},
  {path: '', redirectTo: 'puzzle', pathMatch: 'full'},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
