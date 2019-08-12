import { CanLoad, Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuardService implements CanActivate
{
    path;
    route;
    constructor(private _auth: AuthenticationService, private _router: Router)
    {
        
    }

    canActivate() : boolean
    {
        if(this._auth.isLoggedIn) return true;
        this._router.navigate(['/unauthorized']);
        return false;
    }
    
}