import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AvatarModule } from 'ngx-avatar';
import {MatMenuModule} from '@angular/material/menu';
import { GeneralDashboardComponent } from './pages/general-dashboard/general-dashboard.component';
import { GeneralAccountsComponent } from './pages/general-accounts/general-accounts.component';
import { NewsManagmentComponent } from './pages/news-managment/news-managment.component';
import { GameDashboardComponent } from './pages/game-dashboard/game-dashboard.component';
import { DeveloperEventsComponent } from './pages/developer-events/developer-events.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ServiceStatusItemComponent } from './components/service-status-item/service-status-item.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
    declarations: [
        AdminComponent,
        GeneralDashboardComponent,
        GeneralAccountsComponent,
        NewsManagmentComponent,
        GameDashboardComponent,
        DeveloperEventsComponent,
        ServiceStatusItemComponent
    ],
    imports: [
      CommonModule,
      AdminRoutingModule,
      AvatarModule,
      MatButtonModule,
      MatCheckboxModule,
      MatSidenavModule,
      MatToolbarModule,
      MatMenuModule,
      MatCardModule,
      MatGridListModule,
      MatTableModule
    ],
    bootstrap:[
        AdminComponent
    ]
  })
  export class AdminModule { }