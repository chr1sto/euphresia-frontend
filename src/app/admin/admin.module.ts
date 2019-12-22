import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvatarModule } from 'ngx-avatar';
import { MatMenuModule } from '@angular/material/menu';
import { GeneralDashboardComponent } from './pages/general-dashboard/general-dashboard.component';
import { GeneralAccountsComponent } from './pages/general-accounts/general-accounts.component';
import { NewsManagmentComponent } from './pages/news-managment/news-managment.component';
import { GameDashboardComponent } from './pages/game-dashboard/game-dashboard.component';
import { DeveloperEventsComponent } from './pages/developer-events/developer-events.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ServiceStatusItemComponent } from './components/service-status-item/service-status-item.component';
import { MatTableModule } from '@angular/material/table';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AccountInfoItemComponent } from './components/account-info-item/account-info-item.component';
import { AccountDetailComponent } from './pages/account-detail/account-detail.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { GameAccountListComponent } from './components/game-account-list/game-account-list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ChangeRolesComponent } from './components/change-roles/change-roles.component';
import { GameCharactersComponent } from './pages/game-characters/game-characters.component';
import { GameCharacterListComponent } from './components/game-character-list/game-character-list.component';
import { GeneralSliderComponent } from './pages/general-slider/general-slider.component';
import { CreateImageObjectComponent } from './components/create-image-object/create-image-object.component';
import { GameDownloadsComponent } from './pages/game-downloads/game-downloads.component';
import { DownloadDetailComponent } from './components/download-detail/download-detail.component';
import { TransactionsComponent } from './pages/transactions/transactions.compontent';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { TransactionDetailComponent } from './pages/transaction-detail/transaction-detail.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TransactionInfoListComponent } from './components/transaction-info-list/transaction-info-list.component';
import { PlayerCountChartComponent } from './components/data/player-count-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AdminComponent,
    GeneralDashboardComponent,
    GeneralAccountsComponent,
    NewsManagmentComponent,
    GameDashboardComponent,
    DeveloperEventsComponent,
    ServiceStatusItemComponent,
    FileUploadComponent,
    NewsDetailComponent,
    AccountInfoItemComponent,
    AccountDetailComponent,
    GameAccountListComponent,
    ChangeRolesComponent,
    GameCharactersComponent,
    GameCharacterListComponent,
    GeneralSliderComponent,
    CreateImageObjectComponent,
    GameDownloadsComponent,
    DownloadDetailComponent,
    TransactionsComponent,
    TransactionDetailComponent,
    TransactionInfoListComponent,

    //CHARTS
    PlayerCountChartComponent
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
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    AngularEditorModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxJsonViewerModule,
    NgxChartsModule
  ],
  entryComponents: [
    ChangeRolesComponent,
    GameCharacterListComponent,
    CreateImageObjectComponent,
    DownloadDetailComponent
  ],
  bootstrap: [
    AdminComponent
  ]
})
export class AdminModule { }