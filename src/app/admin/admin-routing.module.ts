import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { NgModule } from '@angular/core';
import { GeneralDashboardComponent } from './pages/general-dashboard/general-dashboard.component';
import { NewsManagmentComponent } from './pages/news-managment/news-managment.component';
import { GeneralAccountsComponent } from './pages/general-accounts/general-accounts.component';
import { GameDashboardComponent } from './pages/game-dashboard/game-dashboard.component';
import { DeveloperEventsComponent } from './pages/developer-events/developer-events.component';

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
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }