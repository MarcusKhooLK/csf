import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { Contact, Response } from "../models";

//const URL_BASE = "http://localhost:8080/api/address"
const URL_BASE = "https://csf-miniproject-one.herokuapp.com/api/address"
const URL_POST_CONTACTS = URL_BASE + "/contact"
const URL_GET_CONTACTS = URL_BASE + "/contacts"
const URL_DELETE_CONTACT = URL_BASE + "/contact"

@Injectable()
export class AddressBookService {

    constructor(private httpClient: HttpClient) {}

    addNewContact(data: Contact) : Promise<Response> {
        const httpHeaders = new HttpHeaders()
                                .set("Content-Type", "application/json")
                                .set("Accept", "application/json")

        return firstValueFrom(
            this.httpClient.post<Response>(URL_POST_CONTACTS, data, {headers:httpHeaders})
            )
    }

    getContacts() : Promise<Contact[]> {

        return firstValueFrom(
            this.httpClient.get<any>(URL_GET_CONTACTS)
                .pipe(
                    map(result => {
                        const data = result.data.contacts
                        return data.map((v: any) => {
                            let c: Contact = {
                                email: "",
                                mobile: "",
                                name: ""
                            }
                            c.email = v.email
                            c.mobile = v.mobile
                            c.name = v.name
                            return c
                        })
                    })
                )
        )
    }

    removeContact(c: Contact) : Promise<Response> {
        const httpHeaders = new HttpHeaders()
                                .set("Content-Type", "application/json")
                                .set("Accept", "application/json")
        return firstValueFrom( 
            this.httpClient.delete<Response>(URL_DELETE_CONTACT, {headers:httpHeaders, body: c})
        )
    }
}