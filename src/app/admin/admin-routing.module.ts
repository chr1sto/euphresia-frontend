import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { NgModule } from '@angular/core';
import { GeneralDashboardComponent } from './pages/general-dashboard/general-dashboard.component';
import { NewsManagmentComponent } from './pages/news-managment/news-managment.component';
import { GeneralAccountsComponent } from './pages/general-accounts/general-accounts.component';
import { GameDashboardComponent } from './pages/game-dashboard/game-dashboard.component';
import { DeveloperEventsComponent } from './pages/developer-events/developer-events.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { AccountInfoItemComponent } from './components/account-info-item/account-info-item.component';
import { AccountDetailComponent } from './pages/account-detail/account-detail.component';
import { GameCharactersComponent } from './pages/game-characters/game-characters.component';
import { GeneralSliderComponent } from './pages/general-slider/general-slider.component';

const routes : Routes =
[
    {
        path: '',
        component: AdminComponent,
        children:[
            {
                path:'',
                pathMatch:'full',
                component: GeneralDashboardComponent
            },
            {
                path:'dashboard',
                redirectTo:'',
                pathMatch:'full'
            },
            {
                path:'news',
                component: NewsManagmentComponent
            },
            {
                path:'slider',
                component: GeneralSliderComponent
            },
            {
                path: 'accounts',
                component: GeneralAccountsComponent
            },
            {
                path: 'game-dashboard',
                component: GameDashboardComponent
            },
            {
                path: 'developer-events',
                component: DeveloperEventsComponent
            },
            {
                path: 'file-upload',
                component: FileUploadComponent
            },
            {
                path: 'news-detail/:id',
                component: NewsDetailComponent
            },
            {
                path: 'news-detail',
                component: NewsDetailComponent
            },
            {
                path: 'account-detail/:id',
                component: AccountDetailComponent
            },
            {
                path: 'game-characters',
                component: GameCharactersComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }