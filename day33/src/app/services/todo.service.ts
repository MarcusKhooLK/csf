import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Subject, tap } from "rxjs";
import { Todo } from "../models";

//@Injectable({providedIn: 'root'})
@Injectable()
export class TodoService {

    onNewData = new Subject<Todo[]>()

    constructor(private httpClient: HttpClient) {}

    getTodo(userId: number) : Promise<Todo[]> {
        let params:HttpParams = new HttpParams()
        .set("userId", 1)
        .set("name", "fred")
        return firstValueFrom(
            this.httpClient.get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {params})
                //rxjs
                .pipe(
                    tap(data => {
                        console.info("tap: ", data)
                        this.onNewData.next(data)
                    })
                )
            )/*.then(data=>{
                this.onNewData.next(data)
                return data
            })*/
    }

}