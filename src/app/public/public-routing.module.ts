import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { RegisterGuardService } from '../shared/guards/register-guard';
import { HomeComponent } from './pages/home/home.component';
import { WikiComponent } from './pages/wiki/wiki.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ShopComponent } from './pages/shop/shop.component';
import { TeamComponent } from './pages/team/team.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { VerifyMailComponent } from './pages/verify-mail/verify-mail.component';
import { PlayerRankingComponent } from './pages/ranking/player-ranking/player-ranking.component';
import { GuildRankingComponent } from './pages/ranking/guild-ranking/guild-ranking.component';
import { DungeonRankingComponent } from './pages/ranking/dungeon-ranking/dungeon-ranking.component';
import { RegisterComponent } from './pages/register/register.component';
import { DownloadComponent } from './pages/download/download.component';
import { TosComponent } from './pages/tos/tos.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { GuideComponent } from './pages/guide/guide.component';
import { VoteComponent } from './pages/vote/vote.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginGuardService } from '../shared/guards/login-guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { TransactionHistoryComponent } from './pages/account/transaction-history/transaction-history.component';
import { IngameAccountsComponent } from './pages/account/ingame-accounts/ingame-accounts.component';
import { AccountSettingsComponent } from './pages/account/account-settings/account-settings.component';

const routes: Routes = [
    {
        path: '',
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
                component: RankingComponent,
                children:
                [
                    {
                        path: '',
                        redirectTo: 'player'
                    },
                    {
                        path: 'player',
                        component: PlayerRankingComponent
                    },
                    {
                        path: 'guild',
                        component: GuildRankingComponent
                    },
                    {
                        path: 'dungeon',
                        component: DungeonRankingComponent
                    }
                ]
            },
            {
                path: 'shop',
                component: ShopComponent,
                canActivate: [LoginGuardService]
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
            },
            {
                path: 'verify-email',
                component: VerifyMailComponent
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [RegisterGuardService]
            },
            {
                path: 'download',
                component: DownloadComponent
            },
            {
                path: 'tos',
                component: TosComponent
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent
            },
            {
                path: 'guide',
                component: GuideComponent
            },
            {
                path: 'vote',
                component: VoteComponent,
                canActivate: [LoginGuardService]
            },
            {
                path: 'imprint',
                component: ImprintComponent
            },
            {
                path: 'account',
                component: AccountComponent,
                canActivate: [LoginGuardService],
                children:  
                [
                    {
                        path: '',
                        redirectTo: 'transaction-history'
                    },
                    {
                        path: 'transaction-history',
                        component: TransactionHistoryComponent
                    },
                    {
                        path: 'ingame-accounts',
                        component: IngameAccountsComponent
                    },
                    {
                        path: 'settings',
                        component: AccountSettingsComponent
                    }
                ]
            },
            {
                path: 'unauthorized',
                component: UnauthorizedComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PublicRoutingModule { }