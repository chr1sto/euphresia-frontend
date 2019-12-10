import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { HeaderComponent } from './components/header/header.component';
import { TopBoxComponent } from './components/box-top/box-top.component';
import { QuickLinksComponent } from './components/quick-links/quick-links.component';
import { MediaContainerComponent } from './components/media-container/media-container.component';
import { DiscordContainerComponent } from './components/discord-container/discord-container.component';
import { VoteBoxComponent } from './components/vote-box/vote-box.component';
import { NewsBoxComponent } from './components/news-box/news-box.component';
import { ServerInfoComponent } from './components/server-info/server-info.component';
import { RankingSmallComponent } from './components/ranking-small/ranking-small.component';
import { HomeComponent } from './pages/home/home.component';
import { WikiComponent } from './pages/wiki/wiki.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ShopComponent } from './pages/shop/shop.component';
import { TeamComponent } from './pages/team/team.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { SeperatorComponent } from './components/seperator/seperator.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { VerifyMailComponent } from './pages/verify-mail/verify-mail.component';
import { PlayerRankingComponent } from './pages/ranking/player-ranking/player-ranking.component';
import { GuildRankingComponent } from './pages/ranking/guild-ranking/guild-ranking.component';
import { DungeonRankingComponent } from './pages/ranking/dungeon-ranking/dungeon-ranking.component';
import { DownloadComponent } from './pages/download/download.component';
import { TosComponent } from './pages/tos/tos.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './pages/register/register.component';
import { GuideComponent } from './pages/guide/guide.component';
import { VoteComponent } from './pages/vote/vote.component';
import { PageCaptionService } from './services/page-caption.service';
import { ToastService } from './services/toast.service';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountComponent } from './pages/account/account.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { TransactionHistoryComponent } from './pages/account/transaction-history/transaction-history.component';
import { AccountSettingsComponent } from './pages/account/account-settings/account-settings.component';
import { IngameAccountsComponent } from './pages/account/ingame-accounts/ingame-accounts.component';
import { WithdrawComponent } from './pages/account/withdraw/withdraw.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
    declarations: [
        /* Layouts */
        PublicComponent,

        /* Components */
        UserPanelComponent,
        HeaderComponent,
        TopBoxComponent,
        QuickLinksComponent,
        MediaContainerComponent,
        DiscordContainerComponent,
        VoteBoxComponent,
        NewsBoxComponent,
        ServerInfoComponent,
        RankingSmallComponent,
        SeperatorComponent,
        NewsItemComponent,
        VerifyMailComponent,
        FooterComponent,

        /* Pages */
        HomeComponent,
        WikiComponent,
        RankingComponent,
            PlayerRankingComponent,
            GuildRankingComponent,
            DungeonRankingComponent,
        ShopComponent,
        TeamComponent,
        ForgotPasswordComponent,
        NewsDetailComponent,
        DownloadComponent,
        TosComponent,
        PrivacyPolicyComponent,
        RegisterComponent,
        GuideComponent,
        VoteComponent,
        ImprintComponent,
        AccountComponent,
            TransactionHistoryComponent,
            AccountSettingsComponent,
            IngameAccountsComponent,
            WithdrawComponent,

        /* Error Pages */
        UnauthorizedComponent,

        /* Pipes */
        SafeHtmlPipe
    ],
    imports: [
        PublicRoutingModule,
        CommonModule,
        FormsModule,
        RecaptchaModule,
        SlideshowModule,
        ReactiveFormsModule,
        NgxPayPalModule
    ],
    bootstrap: [],
    providers: [PageCaptionService,FormBuilder,ToastService]
  })
export class PublicModule { }