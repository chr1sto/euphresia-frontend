import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
    declarations: [
        PublicComponent,
        UserPanelComponent,
        LandingComponent,
        RegisterComponent
    ],
    imports: [
        PublicRoutingModule,
        CommonModule,
        FormsModule,
        RecaptchaModule
    ],
    bootstrap: [],
    providers: []
  })
export class PublicModule { }