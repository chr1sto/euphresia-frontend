import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterGuardService } from '../shared/guards/register-guard';
import { HomeComponent } from './pages/home/home.component';
import { WikiComponent } from './pages/wiki/wiki.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ShopComponent } from './pages/shop/shop.component';
import { TeamComponent } from './pages/team/team.component';

const routes: Routes = [
    {
        path: 'web',
        component: PublicComponent,
        children: [
            {
                path: '',
                redirectTo: 'home'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'wiki',
                component: WikiComponent
            },
            {
                path: 'ranking',
                component: RankingComponent
            },
            {
                path: 'shop',
                component: ShopComponent
            },
            {
                path: 'team',
                component: TeamComponent
            }
        ]
    },
    {
        path: '',
        component: LandingComponent,
        children: [
        ]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [RegisterGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PublicRoutingModule { }