import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { CashRegisterComponent} from './cashregister.component';
import { AnnualReporteDialog } from './annual-report/annual-report.component';
import { MonthlyReporteDialog } from './monthly-report/monthly-report.component';
const routes: Routes = [
  { path: '',
    component: CashRegisterComponent,
    children: [
      {path: '', component: ManagePostComponent},
      {path: 'annualreport', component: AnnualReporteDialog},
      {path: 'monthlyreport', component: MonthlyReporteDialog},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRegisterRoutingModule { }
