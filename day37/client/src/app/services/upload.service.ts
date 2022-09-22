import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable()
export class UploadService {
    constructor(private httpClient: HttpClient) {}

    upload(title: string, file: File | Blob) : Promise<any> {
        const data = new FormData()
        data.set('title', title)
        data.set('myFile', file)
        return firstValueFrom(
            this.httpClient.post<any>('/upload/spaces', data)
        )
    }
}