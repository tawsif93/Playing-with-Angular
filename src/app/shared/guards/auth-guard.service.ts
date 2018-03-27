import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { SharedService } from '../shared.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private sharedService: SharedService) { }

    canActivate() {
        console.log('i am checking to see if you are logged in');
        if (this.sharedService.authenticated) {
            console.log('User logged in');
        }
        return true;
    }

    canActivateChild() {
        console.log('checking child route access');
        return true;
    }

}
