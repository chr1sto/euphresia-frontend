import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
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

@NgModule({
    declarations: [
        PublicComponent,
        UserPanelComponent,
        LandingComponent,
        RegisterComponent,
        HeaderComponent,
        TopBoxComponent,
        QuickLinksComponent,
        MediaContainerComponent,
        DiscordContainerComponent,
        VoteBoxComponent,
        NewsBoxComponent,
        ServerInfoComponent,
        RankingSmallComponent
    ],
    imports: [
        PublicRoutingModule,
        CommonModule,
        FormsModule,
        RecaptchaModule
    ],
    bootstrap: [],
    providers: []
  })
export class PublicModule { }