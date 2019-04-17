import { Injectable } from '@angular/core';

import { CanLoad, Router } from '@angular/router';

import { CanActivate } from '@angular/router/src/utils/preactivation';

import { AuthenticationService } from '../services/auth.service';

import { Route } from '@angular/compiler/src/core';

@Injectable()
export class AdminGuardService implements CanLoad, CanActivate
{
    path;
    route;
    constructor(private _auth: AuthenticationService, private _router: Router)
    {
        
    }
 
    canLoad(route: Route) : boolean
    {
        if(this._auth.isAdmin()) return true;
        this._router.navigate(['']);
        return false;
    } 

    canActivate() : boolean
    {
        if(this._auth.isAdmin()) return true;
        this._router.navigate(['']);
        return false;
    }
}