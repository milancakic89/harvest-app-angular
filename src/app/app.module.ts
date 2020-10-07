import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupComponent } from './signup/signup.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { MessageComponent } from './message/message.component';
import { AddComponent } from './add/add.component';
import { HarvestComponent } from './harvest/harvest.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupComponent,
    MeasurementComponent,
    MessageComponent,
    AddComponent,
    HarvestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
