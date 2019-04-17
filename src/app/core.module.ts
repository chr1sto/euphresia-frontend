import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { API_BASE_URL, AccountService } from './shared/services/generated.services';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './shared/services/auth.service';
import { AdminGuardService } from './shared/guards/admin-guard';

export class AppConsts
{
  static baseUrl = "https://localhost:44345"
}

export function getBaseUrl() : string {
  return AppConsts.baseUrl
}

@NgModule(
    {
        imports:[
            CommonModule,
            HttpClientModule
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
                {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
                AccountService,
                AuthenticationService,
                AdminGuardService
            ]
        }
    }
}