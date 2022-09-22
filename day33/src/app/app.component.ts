import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Todo } from './models';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private todoSvc: TodoService) {
  }
  
  getData() {
    // take the last value from the observable and
    // return the result in a promise
    console.info("======= before call ==========")
    this.todoSvc.getTodo(1)
      .then(this.take10)
      .then(this.completedTasks)
      .then(this.processTodo)
      .catch((error: HttpErrorResponse) => {
        console.error("Error: ", error)
      })
    console.info("======= after call ==========")
  }

  completedTasks(todo: Todo[]) {
    return todo.filter(v => v.completed)
  }

  take10(todo: Todo[]) {
    return todo.slice(0, 10)
  }

  processTodo(todo: Todo[]) {
    console.info(">>>>>>> processing todos: ", todo)
  }
}
