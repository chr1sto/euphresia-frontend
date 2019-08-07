import { OnInit, Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GenericObjectViewModel, UpdateRolesViewModel } from 'src/app/shared/services/generated.services';
import { EventEmitter } from 'events';

@Component({
    selector: 'download-detail',
    templateUrl: './download-detail.component.html',
    styleUrls: ['./download-detail.component.scss']
  })
export class DownloadDetailComponent implements OnInit{        
    
    save : boolean = false;
    deleted : boolean = false;

    ngOnInit(): void 
    {

    }

    constructor(public dialogRef: MatDialogRef<DownloadDetailComponent>,@Inject(MAT_DIALOG_DATA) public data:GenericObjectViewModel)
    {

    }

    submit()
    {
        this.save = true;
        this.dialogRef.close();
    }

    delete()
    {
        this.deleted = true;
        this.dialogRef.close();
    }
}