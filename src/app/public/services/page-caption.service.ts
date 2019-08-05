import { Injectable} from '@angular/core';


@Injectable()
export class PageCaptionService
{
    public caption : string = "Error";
    public showSeperator : boolean = true;
    constructor(){}
}