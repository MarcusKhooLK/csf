import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { SearchParams } from "../models";
import { firstValueFrom, map, Subject, tap } from "rxjs";

@Injectable()
export class GiphyService {

    onNewResult = new Subject<string[]>()

    constructor(private httpClient: HttpClient) {}

    searchGiphy(searchParams: SearchParams): Promise<string[]> {
        console.info("Giphy Service searching....", searchParams)

        // Construct the query params
        const httpParams:HttpParams = new HttpParams()
                                         .set("api_key", searchParams.api)
                                         .set("q", searchParams.search)
                                         .set("limit", searchParams.count)
                                         .set("rating", searchParams.rating)

            return firstValueFrom(
                this.httpClient.get<any>("https://api.giphy.com/v1/gifs/search", {params:httpParams})
                    .pipe(
                        map(result=> {
                            const data = result.data
                            console.info("Result: ", result)
                            console.info("Data: ", data)
                            return data.map((v: any) => {
                                return v.images.fixed_height.url as string
                            })
                        })
                    )
            )
    }
}