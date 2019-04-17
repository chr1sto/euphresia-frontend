import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from './generated.services';

@Injectable()
export class CustomFileUploadService
{
    constructor(@Inject(HttpClient) private http: HttpClient,@Optional() @Inject(API_BASE_URL) private baseUrl?: string)
    {
        
    }

    public uploadFile(formData: FormData)
    {
        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            }),
        };
        
        return this.http.post(this.baseUrl+"/api/v1/file-upload",formData,options_);
    }
}