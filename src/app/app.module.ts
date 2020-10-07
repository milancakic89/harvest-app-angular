import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupComponent } from './signup/signup.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { MessageComponent } from './message/message.component';
import { AddComponent } from './add/add.component';
import { HarvestComponent } from './harvest/harvest.component';
import { AnalysesComponent } from './analyses/analyses.component';
import { BaseComponent } from './base/base.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { HeaderComponent } from './header/header.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupComponent,
    MeasurementComponent,
    MessageComponent,
    AddComponent,
    HarvestComponent,
    AnalysesComponent,
    BaseComponent,
    EmployeesComponent,
    EmployeeComponent,
    HeaderComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
