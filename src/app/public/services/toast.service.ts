import { Injectable} from '@angular/core';


@Injectable()
export class ToastService
{
    
    errorMessages : string[] = [];

    enabled : boolean = false;
    posTop : number = -100;
    marginTop : string = "-180px";
    timeoutShow = null;
    timeoutDisable = null;

    enable() : void
    {
        clearTimeout(this.timeoutDisable);
        clearTimeout(this.timeoutShow);
        if(!this.enabled)
        {
            this.enabled = true;
            setTimeout(() => this.marginTop = "0px",200);
            this.timeoutShow = setTimeout(() => {
                this.disable(false);
            },8000)            
        }
        else
        {
            this.marginTop = "-180px";
            setTimeout(() => 
            {
                this.enabled = false;
                this.enable();
            },1000)
        }
    }

    disable(enableAfter : boolean)
    {
        this.marginTop = "-180px";
        clearTimeout(this.timeoutDisable);
        clearTimeout(this.timeoutShow);
        this.timeoutDisable = setTimeout(() => {
            this.enabled = false;
            if(enableAfter) this.enable();
        },2000)
    }
}