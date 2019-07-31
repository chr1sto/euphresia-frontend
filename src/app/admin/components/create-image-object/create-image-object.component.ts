import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GenericObjectViewModel, GenericService } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'create-image-object',
    templateUrl: './create-image-object.component.html',
    styleUrls: ['./create-image-object.component.scss']
  })
export class CreateImageObjectComponent {
    url : string;

    constructor(    
        public dialogRef: MatDialogRef<CreateImageObjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data:string,
        private genericService : GenericService)
        {
            
        }

    submit()
    {
        if(this.url)
        {
            let model : GenericObjectViewModel = new GenericObjectViewModel();
            model.type = this.data;
            model.valueType = 'img-url';
            model.value = this.url;
            model.id = "00000000-0000-0000-0000-000000000000";
            model.createdOn = new Date();
            this.genericService.generalPost(model).pipe(
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