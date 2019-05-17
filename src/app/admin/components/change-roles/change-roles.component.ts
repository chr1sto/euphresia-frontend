import { Component, Inject } from '@angular/core';
import { RolesService, UpdateRolesViewModel } from 'src/app/shared/services/generated.services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
    selector: 'change-roles',
    templateUrl: './change-roles.component.html',
    styleUrls: ['./change-roles.component.scss']
  })
export class ChangeRolesComponent {

    roles : Array<string> = ["User","Gamemaster","Developer", "Administrator", "GameService"];
    selectedRole : string;

    constructor(    
        public dialogRef: MatDialogRef<ChangeRolesComponent>,
        @Inject(MAT_DIALOG_DATA) public data:string,
        private rolesService : RolesService)
    {
    }

    submit()
    {
        console.log(this.selectedRole);
        if(this.selectedRole)
        {
            let model : UpdateRolesViewModel = new UpdateRolesViewModel();
            model.roles = [this.selectedRole];
            model.userId = this.data;
            this.rolesService.roles(model).pipe(
                map(
                    result => {
                        console.log(result);
                        this.dialogRef.close();
                    }
                )
            ).subscribe();
        }
        this.dialogRef.close();
    }
}