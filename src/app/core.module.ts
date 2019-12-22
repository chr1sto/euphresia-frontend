import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { API_BASE_URL, AccountService, ServiceStatusService, GameEventService, NewsService, RolesService, GameAccountService, GenericService, VoteService, RankingService, TransactionsService, DonateService, GameCharacterService, FileUploadService, AccountManagmentService, StatisticsService } from './shared/services/generated.services';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './shared/services/auth.service';
import { AdminGuardService } from './shared/guards/admin-guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AvatarModule } from "ngx-avatar";
import { CustomFileUploadService } from './shared/services/custom-file-upload.service';
import { RegisterGuardService } from './shared/guards/register-guard';
import { RankingHelperService } from './shared/services/ranking-helper.service';
import { SignalRService, SOCK_BASE_URL } from './shared/services/signal-r.service';
import { LoginGuardService } from './shared/guards/login-guard';

export class AppConsts
{
  //static apiUrl = "https://api.euphresia-flyff.com/api"
  //static sockUrl = "https://api.euphresia-flyff.com/sock"
  static apiUrl = "https://localhost:44345/api";
  static sockUrl = "https://localhost:44345/sock"
}

export function getBaseUrl() : string {
  return AppConsts.apiUrl;
}

export function getSockUrl() : string {
    return AppConsts.sockUrl;
}

@NgModule(
    {
        imports:[
            CommonModule,
            HttpClientModule,
            BrowserAnimationsModule,
            AvatarModule
        ],
        declarations:[],
        providers: []
    }
)
export class CoreModule
{
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
          throw new Error(
            'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: CoreModule,
            providers: [
                {provide: API_BASE_URL,useFactory: getBaseUrl},
                {provide: SOCK_BASE_URL,useFactory: getSockUrl},
                {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
                AccountService,
                AuthenticationService,
                AdminGuardService,
                RegisterGuardService,
                LoginGuardService,
                ServiceStatusService,
                GameEventService,
                CustomFileUploadService,
                NewsService,
                RolesService,
                GameAccountService,
                RankingHelperService,
                GenericService,
                SignalRService,
                VoteService,
                DonateService,
                RankingService,
                TransactionsService,
                DonateService,
                GameCharacterService,
                FileUploadService,
                AccountManagmentService,
                StatisticsService
            ]
        }
    }
}