import { Component, Optional, Inject, OnInit } from '@angular/core';
import { FileUploadService, API_BASE_URL } from 'src/app/shared/services/generated.services';
import { CustomFileUploadService } from 'src/app/shared/services/custom-file-upload.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
  })
export class FileUploadComponent implements OnInit{
    list : Array<string>;

    ngOnInit(): void {
        this.getAll();
        console.log(this.baseUrl);
    }
    constructor(private fileUploadService : FileUploadService, private customFileUploadService : CustomFileUploadService,@Optional() @Inject(API_BASE_URL) private baseUrl?: string){
    }

    getAll()
    {
        this.fileUploadService.fileUploadGet().pipe(
            map(
                x => {
                    this.list = x.data;
                }
            )
        ).subscribe();
    }

    public upload(file): void
    {
        var formData = new FormData();

        formData.append(file[0].name,file[0]);
        console.log(formData);
        this.customFileUploadService.uploadFile(formData).subscribe(
        e => this.getAll(),
        x => console.log(x)
        )
    }

  public delete(item: string): void
  {
    let id : string = item.split('.')[0];
    this.fileUploadService.fileUploadDeleteWithid(id).subscribe(
      e => this.getAll(),
      x => console.log(x)
    );
  }
}