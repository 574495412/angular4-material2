import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {
  MatButtonModule, MatCardModule,MatMenuModule, MatIconModule, MatCheckboxModule, MatTabsModule, MatTableModule, MatNativeDateModule, MatSortModule, MatFormFieldModule, MatInputModule, MatDatepickerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CashRegisterRoutingModule } from './cashregister-routing.module';
import { CashRegisterComponent } from './cashregister.component';
import { CashRegisterService } from './cashregister.server';
import { DialogContent } from './manage-post/manage-post.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { AnnualReporteDialog } from './annual-report/annual-report.component';
import { MonthlyReporteDialog } from './monthly-report/monthly-report.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    HttpModule,
    JsonpModule,
    CashRegisterRoutingModule,
    MatCardModule,
  ],
  declarations: [
    CashRegisterComponent,
    DialogContent,
    ManagePostComponent,
    AnnualReporteDialog,
    MonthlyReporteDialog
  ],
   entryComponents: [
    DialogContent,
    AnnualReporteDialog,
    MonthlyReporteDialog
  ],
  providers: [
    CashRegisterService
  ],
})
export class CashRegisterModule { }
