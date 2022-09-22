import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Subject } from "rxjs";
import { RegistrationData, RegistrationResponse } from "../models";

// const URL = "https://localhost:8080"
const URL = "https://still-ravine-12648.herokuapp.com/api/registration"

@Injectable()
export class RegistrationService {

    constructor(private httpClient: HttpClient) {}

    newRegistration(data: RegistrationData): Promise<RegistrationResponse> {
        const httpHeaders = new HttpHeaders()
                            .set("Content-Type", "application/json")
                            .set("Accept", "application/json")
        return firstValueFrom(
            this.httpClient.post<RegistrationResponse>(URL, data, {headers:httpHeaders})
                //.pipe()
        )
    }
}