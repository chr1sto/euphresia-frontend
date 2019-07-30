import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/landing/register/register.component';
import { RegisterGuardService } from '../shared/guards/register-guard';
import { HomeComponent } from './pages/home/home.component';
import { WikiComponent } from './pages/wiki/wiki.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ShopComponent } from './pages/shop/shop.component';
import { TeamComponent } from './pages/team/team.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LandingHomeComponent } from './pages/landing/landing-home/landing-home.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';

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
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
                canActivate: [RegisterGuardService]
            },
            {
                path: 'news/:id',
                component: NewsDetailComponent
            }
        ]
    },
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: '',
                component: LandingHomeComponent
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [RegisterGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PublicRoutingModule { }