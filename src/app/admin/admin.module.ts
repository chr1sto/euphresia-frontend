import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
      CommonModule,
      AdminRoutingModule,
    ]
  })
  export class AdminModule { }