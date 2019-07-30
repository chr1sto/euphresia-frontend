import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardService } from './shared/guards/admin-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './public/public.module#PublicModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AdminGuardService],
    canActivate: [AdminGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
