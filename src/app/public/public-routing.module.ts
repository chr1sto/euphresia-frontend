import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterGuardService } from '../shared/guards/register-guard';

const routes: Routes = [
    {
        path: 'web',
        component: PublicComponent,
        children: [
            
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