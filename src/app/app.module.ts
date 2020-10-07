import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { Service } from './app.service';
import { HarvestComponent } from './harvest/harvest.component';
import { SignupComponent } from './signup/signup.component';
import { BaseComponent } from './base/base.component';
import { ReportComponent } from './report/report.component';
import { AnalysesComponent } from './analyses/analyses.component';
import { EmployeesComponent } from './employees/employees.component';
import { HelpComponent } from './help/help.component';
import { AddComponent } from './add/add.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { FormsModule } from '@angular/forms';
import { HarvestGuard } from './harvest-guard';
import { MeasurementGuard } from './measurement-guard';
import { MeasurementComponent } from './measurement/measurement.component';
import { BarcodeComponent } from './measurement/barcode/barcode.component';
import { TotalComponent } from './measurement/total/total.component';
import { SubHeaderComponent } from './measurement/sub-header/sub-header.component';
import { BarcodeItemComponent } from './measurement/barcode/barcode-item/barcode-item.component';
import { BarcodeManualComponent } from './measurement/barcode-manual/barcode-manual.component';
import { MessageComponent } from './message/message.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetingComponent } from './submit-reset/submit-reset.component';



const routes: Routes = [
  { path: 'add', canActivate: [HarvestGuard], component: AddComponent },
  { path: 'analyses', canActivate: [HarvestGuard], component: AnalysesComponent },
  { path: 'base', canActivate: [HarvestGuard], component: BaseComponent },
  { path: 'employees/:id', canActivate: [HarvestGuard], component: EmployeeComponent },
  { path: 'employees', canActivate: [HarvestGuard], component: EmployeesComponent },
  { path: 'harvest', canActivate: [HarvestGuard], component: HarvestComponent },
  { path: 'help', canActivate: [HarvestGuard], component: HelpComponent },
  { path: 'report', canActivate: [HarvestGuard], component: ReportComponent },
  { path: 'measure', canActivate: [MeasurementGuard], component: MeasurementComponent },
  { path: 'measure/total', canActivate: [MeasurementGuard], component: TotalComponent },
  { path: 'measure/:barcode', canActivate: [MeasurementGuard], component: BarcodeManualComponent },
  { path: 'reset', component: ResetingComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: 'barcode', canActivate: [MeasurementGuard], component: BarcodeComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: LoginFormComponent },
  { path: ':404', component: NotFoundComponent },

]
//
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    HarvestComponent,
    SignupComponent,
    BaseComponent,
    ReportComponent,
    AnalysesComponent,
    EmployeesComponent,
    HelpComponent,
    AddComponent,
    NotFoundComponent,
    EmployeeComponent,
    MeasurementComponent,
    BarcodeComponent,
    TotalComponent,
    SubHeaderComponent,
    BarcodeItemComponent,
    BarcodeManualComponent,
    MessageComponent,
    ResetPasswordComponent,
    ResetingComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [Service, HarvestGuard, MeasurementGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
