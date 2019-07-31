import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './pages/landing/landing.component';
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
import { LandingHomeComponent } from './pages/landing/landing-home/landing-home.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { RegisterComponent } from './pages/landing/register/register.component';
import { VerifyMailComponent } from './pages/verify-mail/verify-mail.component';

@NgModule({
    declarations: [
        /* Layouts */
        PublicComponent,
        LandingComponent,

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
        RegisterComponent,
        VerifyMailComponent,

        /* Pages */
        HomeComponent,
        WikiComponent,
        RankingComponent,
        ShopComponent,
        TeamComponent,
        ForgotPasswordComponent,
        LandingHomeComponent,
        NewsDetailComponent,

        /* Pipes */
        SafeHtmlPipe
    ],
    imports: [
        PublicRoutingModule,
        CommonModule,
        FormsModule,
        RecaptchaModule,
        SlideshowModule
    ],
    bootstrap: [],
    providers: []
  })
export class PublicModule { }