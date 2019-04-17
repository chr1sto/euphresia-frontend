import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PublicComponent,
        UserPanelComponent
    ],
    imports: [
        PublicRoutingModule,
        CommonModule,
        FormsModule
    ],
    bootstrap: [],
    providers: []
  })
export class PublicModule { }