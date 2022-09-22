import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Book } from "../models/book";
import { BookDetails } from "../models/book-details";

//const BASE_URL: string = "http://localhost:8080"
const BASE_URL: string = "/api"
const GET_BOOKS: string = BASE_URL + "/books"
const GET_BOOK:string = BASE_URL + "/book"

@Injectable()
export class BookService {

    constructor(private httpClient: HttpClient) {}

    getBooks(limit = 20, offset = 0) : Promise<Book[]> {
        const params = new HttpParams().append("limit", limit).append("offset", offset);

        return firstValueFrom(
            this.httpClient.get<Book[]>(GET_BOOKS, {params})
        )
    }

    getBook(bookId: string) : Promise<BookDetails> {
        return firstValueFrom(
        this.httpClient.get<BookDetails>(GET_BOOK + `/${bookId}`)
        )
    }
}